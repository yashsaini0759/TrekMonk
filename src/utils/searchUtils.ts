import { searchTreks as engineSearch, getSearchRecommendations } from '../engine/recommendationEngine';
import { unifiedTrekData as allTreks } from '../data/unifiedTrekData';
import type { Trek } from '../data/trekData';
import type { UserPreferences } from '../context/UserPreferencesContext';

export { getSearchRecommendations };

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

/**
 * Main search function — delegates to the recommendation engine for consistent scoring.
 * `prefs` is kept for API compatibility but scoring is done inside the engine.
 */
export function searchTreks(query: string, prefs: UserPreferences, limit = 5): Trek[] {
  if (!query.trim()) return [];
  // Prefer user-preferred regions/tags in ranking
  const results = engineSearch(query);
  // Boost treks that match user preferences
  const boosted = results.map(trek => {
    let boost = 0;
    if (prefs.preferredRegions.includes(trek.region)) boost += 10;
    if (trek.tags.some(t => prefs.preferredTags.includes(t))) boost += 8;
    if (prefs.preferredDifficulty.includes(trek.difficulty)) boost += 5;
    return { trek, boost };
  });
  return boosted
    .sort((a, b) => b.boost - a.boost)
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
