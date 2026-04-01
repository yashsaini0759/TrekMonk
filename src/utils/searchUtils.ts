import { unifiedTrekData as allTreks } from '../data/unifiedTrekData';
import type { Trek } from '../data/trekData';
import type { UserPreferences } from '../context/UserPreferencesContext';

const CATEGORIES: { label: string; tags: string[] }[] = [
  { label: 'Snow Treks', tags: ['snow', 'winter trek'] },
  { label: 'Weekend Getaways', tags: ['weekend'] },
  { label: 'Spiritual Journeys', tags: ['spiritual', 'temple', 'pilgrimage'] },
  { label: 'Adventure & Camping', tags: ['adventure', 'camping'] },
  { label: 'Offbeat Destinations', tags: ['offbeat'] },
  { label: 'Heritage & Culture', tags: ['heritage', 'history', 'culture'] },
  { label: 'Backpacking', tags: ['backpacking'] },
  { label: 'High Altitude', tags: ['high altitude', 'pass', 'himalayan'] },
  { label: 'Nature & Forests', tags: ['forest', 'nature', 'scenic'] },
  { label: 'Desert Escapes', tags: ['desert', 'camel safari'] },
];

/** Debounce using a closure — use with useEffect cleanup */
export function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}

/** Score a trek for relevance to query + preference boost */
function trekRelevance(trek: Trek, query: string, prefs: UserPreferences): number {
  const q = query.toLowerCase();
  let score = 0;
  const nameLower = trek.name.toLowerCase();
  const locationLower = trek.location.toLowerCase();

  if (nameLower === q) score += 100;                             // exact match
  else if (nameLower.startsWith(q)) score += 60;                // prefix match
  else if (nameLower.includes(q)) score += 40;                  // partial match
  else if (locationLower.includes(q)) score += 30;              // location match
  else if (trek.tags.some(t => t.includes(q))) score += 20;    // tag match

  // Preference boost
  if (prefs.preferredRegions.includes(trek.region)) score += 10;
  if (trek.tags.some(t => prefs.preferredTags.includes(t))) score += 8;

  return score;
}

export function searchTreks(query: string, prefs: UserPreferences, limit = 5): Trek[] {
  if (!query.trim()) return [];
  return allTreks
    .map(t => ({ trek: t, score: trekRelevance(t, query, prefs) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(x => x.trek);
}

export function getMatchedCategories(query: string, limit = 3): string[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return CATEGORIES
    .filter(c => c.label.toLowerCase().includes(q) || c.tags.some(t => t.includes(q)))
    .slice(0, limit)
    .map(c => c.label);
}

export function getMatchedLocations(query: string, limit = 4): string[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const seen = new Set<string>();
  const results: string[] = [];
  for (const trek of allTreks) {
    const parts = trek.location.split('&').map(s => s.trim());
    for (const loc of parts) {
      if (loc.toLowerCase().includes(q) && !seen.has(loc)) {
        seen.add(loc);
        results.push(loc);
        if (results.length >= limit) return results;
      }
    }
  }
  // Also include trek names if they match location-style searches
  if (results.length < limit) {
    for (const trek of allTreks) {
      if (trek.name.toLowerCase().includes(q) && !seen.has(trek.name)) {
        seen.add(trek.name);
        results.push(trek.name);
        if (results.length >= limit) break;
      }
    }
  }
  return results;
}
