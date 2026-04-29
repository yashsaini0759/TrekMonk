// ✅ Zero-dependency Gemini service using fetch() only — no SDK import
// This avoids any module-level crashes.

export interface AIFilters {
  mood: string | null;
  days: number | null;
  budget: 'budget' | 'comfort' | 'luxury' | null;
  month: string | null;
}

export interface AIResponse {
  message: string;
  intent: 'ask_question' | 'update_filters' | 'ready_to_suggest';
  data: Partial<AIFilters>;
  quickReplies: string[];
}

const SYSTEM_PROMPT = `You are TrekMonk AI, a minimalist trip planning assistant.
Collect 4 filters: mood, days, budget (budget/comfort/luxury), month.
RULES: Respond ONLY in valid JSON. "message" max 15 words. Ask ONE question at a time.
"intent": "ask_question" | "update_filters" | "ready_to_suggest" (when mood+days collected).
"data": filters collected. "quickReplies": 2-3 short options.
Example: {"message":"How many days?","intent":"update_filters","data":{"budget":"budget"},"quickReplies":["3 days","5 days","1 week"]}`;

// Conversation history stored in memory (per session)
const conversationHistory: Array<{ role: string; parts: Array<{ text: string }> }> = [];

export const sendMessageToAI = async (userMessage: string): Promise<AIResponse> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // If no key, return a smart LOCAL fallback (no crash, no API call)
  if (!apiKey) {
    return getLocalFallback(userMessage);
  }

  // Add user message to history
  conversationHistory.push({ role: 'user', parts: [{ text: userMessage }] });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: conversationHistory,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2,
          maxOutputTokens: 200,
        },
      }),
    });

    const json = await res.json();
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const parsed: AIResponse = JSON.parse(text);

    // Add AI reply to history
    conversationHistory.push({ role: 'model', parts: [{ text }] });

    return parsed;
  } catch (err) {
    console.error('Gemini API error:', err);
    return {
      message: "Hmm, couldn't reach AI. Let me try a quick suggestion!",
      intent: 'ready_to_suggest',
      data: {},
      quickReplies: [],
    };
  }
};

// --- Smart local fallback when no API key ---
let fallbackStep = 0;
const fallbackFlow: AIResponse[] = [
  { message: "What's your travel mood?", intent: 'ask_question', data: {}, quickReplies: ['Adventure', 'Peaceful', 'Luxury'] },
  { message: "How many days do you have?", intent: 'update_filters', data: { mood: 'adventure' }, quickReplies: ['3 days', '5 days', '1 week'] },
  { message: "What's your budget range?", intent: 'update_filters', data: { days: 5 }, quickReplies: ['Budget', 'Comfort', 'Luxury'] },
  { message: "Great! Here are your perfect treks.", intent: 'ready_to_suggest', data: { budget: 'comfort' }, quickReplies: [] },
];

function getLocalFallback(msg: string): AIResponse {
  const lower = msg.toLowerCase();

  // Detect quick replies to advance flow
  if (lower.includes('adventure') || lower.includes('peaceful') || lower.includes('luxury') ||
      lower.includes('budget') || lower.includes('comfort') ||
      lower.match(/\d+\s*day/)) {
    fallbackStep = Math.min(fallbackStep + 1, fallbackFlow.length - 1);
  }

  const response = fallbackFlow[fallbackStep];

  // Inject detected data from user message
  const data: Partial<AIFilters> = { ...response.data };
  if (lower.includes('adventure')) data.mood = 'adventure';
  if (lower.includes('peaceful') || lower.includes('peace')) data.mood = 'peaceful';
  if (lower.includes('luxury')) { data.mood = 'luxury'; data.budget = 'luxury'; }
  if (lower.includes('budget') || lower.includes('cheap')) data.budget = 'budget';
  if (lower.includes('comfort')) data.budget = 'comfort';
  const dayMatch = lower.match(/(\d+)\s*day/);
  if (dayMatch) data.days = parseInt(dayMatch[1]);

  return { ...response, data };
}

export const resetChat = () => {
  conversationHistory.length = 0;
  fallbackStep = 0;
};
