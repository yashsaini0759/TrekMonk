/**
 * TrekMonk — Content-Based Recommendation Engine v2
 *
 * Scoring weights per signal:
 *   Tags overlap (Jaccard)     → ×35
 *   Same region                → ×20
 *   Same difficulty            → ×15
 *   Duration proximity         → ×10
 *   Popularity (0–1)           → ×5
 *   Altitude proximity         → ×8  (new)
 *   Season overlap             → ×7  (new)
 *   ML JSON rank bonus         → ×15
 */

import { unifiedTrekData } from '../data/unifiedTrekData';
import type { Trek } from '../data/trekData';
import mlRecommendations from '../data/ml_recommendations.json';
import type { UserPreferences } from '../context/UserPreferencesContext';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const MAX_POP = 100;
const MAX_ALT = 5500; // rough max altitude in dataset

/** Jaccard similarity between two string arrays */
function jaccardSim(a: string[], b: string[]): number {
  if (!a.length || !b.length) return 0;
  const setA = new Set(a.map(t => t.toLowerCase().trim()));
  const setB = new Set(b.map(t => t.toLowerCase().trim()));
  let intersection = 0;
  setA.forEach(t => { if (setB.has(t)) intersection++; });
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

/** Duration proximity score: 1 at 0 diff, drops linearly to 0 at 7+ days diff */
function durationScore(a: number, b: number): number {
  return Math.max(0, 1 - Math.abs(a - b) / 7);
}

/** Altitude proximity score: 1 at same altitude, drops to 0 at 3000m difference */
function altitudeScore(a: number, b: number): number {
  return Math.max(0, 1 - Math.abs(a - b) / MAX_ALT);
}

/**
 * Content-based similarity score between a source trek and a candidate.
 * Returns a number roughly 0–115.
 */
function contentScore(source: Trek, candidate: Trek): number {
  const tagSim  = jaccardSim(source.tags, candidate.tags) * 35;
  const region  = source.region === candidate.region ? 20 : 0;
  const diff    = source.difficulty === candidate.difficulty ? 15 : 0;
  const dur     = durationScore(source.duration, candidate.duration) * 10;
  const pop     = (candidate.popularityScore / MAX_POP) * 5;
  const alt     = altitudeScore(source.altitude, candidate.altitude) * 8;
  const season  = jaccardSim(source.season, candidate.season) * 7;

  // ML JSON rank bonus (pre-computed collaborative signal)
  const mlList  = (mlRecommendations as Record<string, string[]>)[source.id] ?? [];
  const mlRank  = mlList.indexOf(candidate.id);
  const mlBonus = mlRank >= 0 ? (8 - Math.min(mlRank, 7)) / 8 * 15 : 0;

  return tagSim + region + diff + dur + pop + alt + season + mlBonus;
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Recommendations for the Home page, based on full user history.
 * Auto-refreshes whenever preferences or refreshKey changes (both used in useMemo deps).
 */
export function getRecommendations(
  prefs: UserPreferences,
  limit = 8,
  shuffleSeed = 0,
): Trek[] {
  const hasHistory = prefs.clickedTreks.length > 0;

  if (!hasHistory) {
    // No history — show top by popularity with tiny shuffle variance
    return [...unifiedTrekData]
      .sort((a, b) =>
        (b.popularityScore + (shuffleSeed % 5)) -
        (a.popularityScore + (shuffleSeed % 3))
      )
      .slice(0, limit);
  }

  // Aggregate content scores weighted by recency of click
  const totalClicks = prefs.clickedTreks.length;
  const scoreMap: Record<string, number> = {};

  prefs.clickedTreks.forEach((clickedId, index) => {
    const recencyWeight = totalClicks - index; // newest = highest weight
    const sourceTrek = unifiedTrekData.find(t => t.id === clickedId);
    if (!sourceTrek) return;

    unifiedTrekData.forEach(candidate => {
      if (candidate.id === clickedId) return; // skip self
      const cs = contentScore(sourceTrek, candidate) * recencyWeight;
      scoreMap[candidate.id] = (scoreMap[candidate.id] ?? 0) + cs;
    });
  });

  // Exclude already-clicked treks
  const candidates = unifiedTrekData
    .filter(t => !prefs.clickedTreks.includes(t.id))
    .map(t => ({ trek: t, score: scoreMap[t.id] ?? 0 }))
    .sort((a, b) => b.score - a.score);

  // Inject the most-recently clicked trek at slot 0 (the "currently viewed" card)
  const newestId   = prefs.clickedTreks[0];
  const newestTrek = unifiedTrekData.find(t => t.id === newestId);

  const result = newestTrek
    ? [newestTrek, ...candidates.map(c => c.trek)]
    : candidates.map(c => c.trek);

  return result.slice(0, limit);
}

/**
 * Recommendations for a single Trek Details page.
 * Does NOT include the source trek itself.
 * Limit defaults to 8 but caller can request up to 10.
 */
export function getCardRecommendations(source: Trek, limit = 8): Trek[] {
  return unifiedTrekData
    .filter(t => t.id !== source.id)
    .map(t => ({ trek: t, score: contentScore(source, t) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(limit, 10))
    .map(x => x.trek);
}

/**
 * Full-text search across all treks.
 * Returns treks sorted by relevance to the query.
 */
export function searchTreks(query: string): Trek[] {
  if (!query.trim()) return [];

  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/);

  const scored = unifiedTrekData.map(trek => {
    let score = 0;

    // Exact/partial name match (highest weight)
    if (trek.name.toLowerCase() === q) score += 100;
    else if (trek.name.toLowerCase().includes(q)) score += 50;

    // Location match
    if (trek.location.toLowerCase().includes(q)) score += 30;

    // Token-level matching across all fields
    tokens.forEach(token => {
      const haystack = [
        trek.name,
        trek.location,
        trek.region,
        trek.difficulty,
        ...trek.tags,
        ...(trek.season ?? []),
      ].join(' ').toLowerCase();
      if (haystack.includes(token)) score += 8;
    });

    // Tag exact match bonus
    trek.tags.forEach(tag => {
      if (tag.toLowerCase().includes(q)) score += 15;
    });

    score += trek.popularityScore * 0.02;
    return { trek, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(x => x.trek);
}

/**
 * Content-based recommendations driven by a search query.
 *
 * Strategy:
 * 1. Find treks that match the query (same as searchTreks but top-3 seeds)
 * 2. Compute a weighted aggregate content-score against all other treks
 * 3. Exclude the search results themselves to avoid duplicates
 * 4. Return top `limit` by score
 */
export function getSearchRecommendations(
  query: string,
  limit = 6,
  excludeIds: string[] = [],
): Trek[] {
  if (!query.trim()) return [];

  // Find up to 3 "seed" treks from the query
  const seeds = searchTreks(query).slice(0, 3);
  if (!seeds.length) return [];

  const excluded = new Set([...excludeIds, ...seeds.map(s => s.id)]);
  const scoreMap: Record<string, number> = {};

  seeds.forEach((seed, idx) => {
    const seedWeight = seeds.length - idx; // first result weights highest
    unifiedTrekData.forEach(candidate => {
      if (excluded.has(candidate.id)) return;
      const cs = contentScore(seed, candidate) * seedWeight;
      scoreMap[candidate.id] = (scoreMap[candidate.id] ?? 0) + cs;
    });
  });

  return unifiedTrekData
    .filter(t => !excluded.has(t.id) && (scoreMap[t.id] ?? 0) > 0)
    .sort((a, b) => (scoreMap[b.id] ?? 0) - (scoreMap[a.id] ?? 0))
    .slice(0, limit);
}

/**
 * Get treks similar to a given list of trek IDs.
 * Used for "recently viewed" driven recommendations.
 */
export function getRelatedByIds(
  trekIds: string[],
  limit = 6,
  excludeIds: string[] = [],
): Trek[] {
  if (!trekIds.length) return [];

  const excluded = new Set([...trekIds, ...excludeIds]);
  const scoreMap: Record<string, number> = {};

  trekIds.slice(0, 5).forEach((id, index) => {
    const recencyWeight = trekIds.length - index;
    const source = unifiedTrekData.find(t => t.id === id);
    if (!source) return;

    unifiedTrekData.forEach(candidate => {
      if (excluded.has(candidate.id)) return;
      const cs = contentScore(source, candidate) * recencyWeight;
      scoreMap[candidate.id] = (scoreMap[candidate.id] ?? 0) + cs;
    });
  });

  return unifiedTrekData
    .filter(t => !excluded.has(t.id) && (scoreMap[t.id] ?? 0) > 0)
    .sort((a, b) => (scoreMap[b.id] ?? 0) - (scoreMap[a.id] ?? 0))
    .slice(0, limit);
}
