import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PLANNER_DESTINATIONS, ROUTE_GRAPH } from '../../data/routeData';
import './AIChatbot.css';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Msg {
  id: string;
  from: 'ai' | 'user';
  text: string;
  cards?: DestCard[];
}

interface DestCard {
  id: string;
  name: string;
  state: string;
  image: string;
  why: string;
  estimatedCost: string;
  days: number;
  tags: string[];
  highlights: string[];
  stops: { name: string; hotel: string; topActivity: string }[];
}

interface GeminiResponse {
  reply: string;
  showDestinations: boolean;
  budget: 'budget' | 'comfort' | 'luxury';
  days: number;
}

// ─── Build Destination Cards ──────────────────────────────────────────────────

function buildDestCards(budget: 'budget' | 'comfort' | 'luxury', days: number): DestCard[] {
  const budgetMin = { budget: 3000, comfort: 6000, luxury: 15000 }[budget] ?? 5000;
  return PLANNER_DESTINATIONS.map(dest => {
    const route = Object.values(ROUTE_GRAPH).find(r => r.destinationId === dest.id);
    if (!route) return null;
    const stops = route.stops.map(stop => {
      const hotel = stop.hotels.find(h => h.tier === budget) || stop.hotels[0];
      const act = stop.activities[0];
      return {
        name: stop.name,
        hotel: `${hotel.name} • ₹${hotel.pricePerNight.toLocaleString()}/night`,
        topActivity: act ? `${act.icon} ${act.name} (₹${act.price})` : 'Sightseeing',
      };
    });
    return {
      id: dest.id,
      name: dest.name,
      state: dest.state,
      image: dest.image,
      why: dest.id === 'dest_kedarkantha' ? "🏔️ India's most popular winter snow trek" : '🏞️ Stunning high-altitude glacial lake trek',
      estimatedCost: `₹${budgetMin.toLocaleString()} – ₹${(budgetMin + 5000).toLocaleString()}`,
      days,
      tags: dest.tags,
      highlights: route.highlights,
      stops,
    };
  }).filter(Boolean) as DestCard[];
}

// ─── Build TrekMonk Context for AI ───────────────────────────────────────────

function buildContext(): string {
  return PLANNER_DESTINATIONS.map(dest => {
    const route = Object.values(ROUTE_GRAPH).find(r => r.destinationId === dest.id);
    if (!route) return '';
    const stopsInfo = route.stops.map(stop => {
      const prices = stop.hotels.map(h => `${h.tier}:₹${h.pricePerNight}/night`).join(', ');
      const acts = stop.activities.map(a => `${a.name}(₹${a.price})`).join(', ');
      return `  ${stop.name}: Hotels[${prices}] Acts[${acts}]`;
    }).join('\n');
    return `${dest.name}(${dest.state}) tags:${dest.tags.join(',')} route:${route.highlights.join('→')}\n${stopsInfo}`;
  }).join('\n\n');
}

// ─── Gemini API Call (auto-discovers working model) ───────────────────────────

const conversationHistory: { role: string; parts: { text: string }[] }[] = [];

const MODELS_TO_TRY = [
  'gemini-2.5-flash-preview-05-20', // Gemini 2.5 Flash
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite-preview-06-17', // Gemini 2.5 Flash Lite
  'gemini-2.0-flash-lite',              // Gemini 2 Flash Lite
  'gemini-2.0-flash',                   // Gemini 2 Flash
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
];

const SYSTEM_PROMPT = `You are TrekMonk AI. Only discuss TrekMonk treks.
TrekMonk Data:\n${buildContext()}

Rules:
- Only answer about TrekMonk destinations, hotels, activities, pricing.
- If asked about anything else say "I only help with TrekMonk treks!"
- Be friendly and concise (2-3 sentences max).
- Collect mood, days, budget naturally in conversation.
- When you have enough info, set showDestinations:true.

ALWAYS respond in this exact JSON (no extra text):
{"reply":"...","showDestinations":false,"budget":"comfort","days":5}`;

async function callGemini(userMessage: string): Promise<GeminiResponse> {
  const key = import.meta.env.VITE_GEMINI_API_KEY;

  if (!key) {
    return { reply: "Please add VITE_GEMINI_API_KEY to your .env to enable AI.", showDestinations: false, budget: 'comfort', days: 5 };
  }

  conversationHistory.push({ role: 'user', parts: [{ text: userMessage }] });

  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: conversationHistory.slice(-12),
    generationConfig: { temperature: 0.4, maxOutputTokens: 600 },
  };

  for (const model of MODELS_TO_TRY) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
      );
      const data = await res.json();

      // Skip if model not found
      if (data?.error?.message?.includes('not found') || data?.error?.message?.includes('not supported')) continue;

      // Quota error — tell user
      if (data?.error?.message?.includes('quota') || data?.error?.message?.includes('RESOURCE_EXHAUSTED')) {
        return { reply: '⏳ Rate limit hit. Please wait a few seconds and try again!', showDestinations: false, budget: 'comfort', days: 5 };
      }

      // Other error
      if (data?.error) {
        return { reply: `⚠️ ${data.error.message}`, showDestinations: false, budget: 'comfort', days: 5 };
      }

      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

      // Try full JSON parse first
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          const parsed = JSON.parse(match[0]) as GeminiResponse;
          conversationHistory.push({ role: 'model', parts: [{ text: parsed.reply }] });
          return { reply: parsed.reply, showDestinations: !!parsed.showDestinations, budget: parsed.budget || 'comfort', days: parsed.days || 5 };
        } catch {
          // JSON truncated — extract reply field with regex
          const replyMatch = raw.match(/"reply"\s*:\s*"([^"]*?)"/);
          if (replyMatch) {
            const replyText = replyMatch[1];
            conversationHistory.push({ role: 'model', parts: [{ text: replyText }] });
            return { reply: replyText, showDestinations: false, budget: 'comfort', days: 5 };
          }
        }
      }

      // Plain text fallback
      conversationHistory.push({ role: 'model', parts: [{ text: raw }] });
      return { reply: raw || "Tell me more about what you're looking for!", showDestinations: false, budget: 'comfort', days: 5 };

    } catch (e) {
      continue; // try next model
    }
  }

  return { reply: '⚠️ Could not connect to Gemini. Get a free key at aistudio.google.com', showDestinations: false, budget: 'comfort', days: 5 };
}

// ─── Component ────────────────────────────────────────────────────────────────

const AIChatbot: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 'init', from: 'ai', text: "Hi! I'm TrekMonk AI 🏔️ Tell me what kind of trip you're dreaming about — I'll find the perfect trek for you!" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;
    setMsgs(prev => [...prev, { id: Date.now() + 'u', from: 'user', text }]);
    setInput('');
    setLoading(true);

    const result = await callGemini(text);
    const aiMsg: Msg = { id: Date.now() + 'a', from: 'ai', text: result.reply };
    if (result.showDestinations) aiMsg.cards = buildDestCards(result.budget, result.days);

    setMsgs(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const resetChat = () => {
    conversationHistory.length = 0;
    setMsgs([{ id: 'init', from: 'ai', text: "Hi! I'm TrekMonk AI 🏔️ Tell me what kind of trip you're dreaming about!" }]);
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button className="ai-fab" onClick={() => setOpen(true)}
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            title="Chat with TrekMonk AI">
            <span className="ai-fab-icon">✨</span>
            <span className="ai-fab-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div className="ai-window"
            initial={{ opacity: 0, y: 30, scale: 0.93 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.93 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }}>

            <div className="ai-header">
              <div className="ai-header-left">
                <span className="ai-avatar">🤖</span>
                <div>
                  <p className="ai-header-name">TrekMonk AI</p>
                  <p className="ai-header-status">Powered by Gemini</p>
                </div>
              </div>
              <div className="ai-header-actions">
                <button className="ai-reset-btn" onClick={resetChat} title="New chat">↺</button>
                <button className="ai-close-btn" onClick={() => setOpen(false)}>✕</button>
              </div>
            </div>

            <div className="ai-body">
              {msgs.map(msg => (
                <div key={msg.id} className={`ai-row ${msg.from}`}>
                  <div className={`ai-bubble ${msg.from}`}>{msg.text}</div>
                  {msg.cards && (
                    <div className="ai-cards">
                      {msg.cards.map(card => (
                        <div key={card.id} className="ai-card">
                          <img src={card.image} alt={card.name} />
                          <div className="ai-card-body">
                            <div className="ai-card-title-row">
                              <h4>{card.name}</h4>
                              <span className="ai-card-state">{card.state}</span>
                            </div>
                            <p className="ai-card-why">{card.why}</p>
                            <div className="ai-card-tags">
                              {card.tags.map(t => <span key={t} className="ai-tag">#{t}</span>)}
                            </div>
                            <div className="ai-card-section">
                              <span className="ai-section-label">🗺️ Route</span>
                              <p className="ai-card-highlights">{card.highlights.join(' → ')}</p>
                            </div>
                            <div className="ai-card-section">
                              <span className="ai-section-label">📍 Stops</span>
                              {card.stops.map(stop => (
                                <div key={stop.name} className="ai-stop-row">
                                  <strong>{stop.name}</strong>
                                  <span>{stop.hotel}</span>
                                  <span>{stop.topActivity}</span>
                                </div>
                              ))}
                            </div>
                            <div className="ai-card-meta">
                              <span>⏱ {card.days} days</span>
                              <span>💰 {card.estimatedCost}</span>
                            </div>
                            <button className="ai-card-cta" onClick={() => { navigate('/plan-trip'); setOpen(false); }}>
                              Book It 🎒
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="ai-row ai">
                  <div className="ai-bubble ai ai-typing"><span /><span /><span /></div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="ai-footer">
              <input type="text" className="ai-input"
                placeholder="Ask me anything about TrekMonk treks..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend(input)}
              />
              <button className="ai-send" onClick={() => handleSend(input)} disabled={!input.trim() || loading}>➤</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
