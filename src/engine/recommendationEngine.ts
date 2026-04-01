import { unifiedTrekData as trekData } from '../data/unifiedTrekData';
import type { Trek } from '../data/trekData';
import mlRecommendations from '../data/ml_recommendations.json';
import type { UserPreferences } from '../context/UserPreferencesContext';

export function getRecommendations(
  prefs: UserPreferences,
  limit = 8,
  shuffleSeed = 0,
): Trek[] {
  const hasHistory = prefs.clickedTreks.length > 0;

  if (!hasHistory) {
    return [...trekData]
      .sort((a, b) => (b.popularityScore + shuffleSeed % 5) - (a.popularityScore + shuffleSeed % 3))
      .slice(0, limit);
  }

  const suggestedIdCounts: Record<string, number> = {};
  
  // clicks[0] is the NEWEST click.
  const totalClicks = prefs.clickedTreks.length;
  prefs.clickedTreks.forEach((trekId, index) => {
    // Newest click (index 0) gets highest weight (totalClicks)
    const weight = totalClicks - index; 
    const similarIds = (mlRecommendations as Record<string, string[]>)[trekId] || [];
    
    similarIds.forEach((simId, simIndex) => {
      const mlRankWeight = 8 - simIndex; 
      suggestedIdCounts[simId] = (suggestedIdCounts[simId] || 0) + (weight * mlRankWeight);
    });
  });

  // Determine the region of the strictly most recently clicked trek for 1st priority boosting
  // In UserPreferencesContext, [trek.id, ...prev] means index 0 is newest.
  const newestClickedId = prefs.clickedTreks[0];
  const newestClickedTrek = trekData.find(t => t.id === newestClickedId);
  const targetRegion = newestClickedTrek?.region;

  // We want to sort ALL unseen treks
  const allUnseen = trekData.filter(t => !prefs.clickedTreks.includes(t.id));

  const scoredUnseen = allUnseen.map(trek => {
    let score = suggestedIdCounts[trek.id] || 0;
    
    score += (trek.popularityScore * 0.01);
    return { trek, score };
  });

  scoredUnseen.sort((a, b) => b.score - a.score);
  
  let recommendedUnseen: Trek[] = [];
  
  if (targetRegion) {
      // Segregate into same region and other regions
      const sameRegionTreks = scoredUnseen.filter(s => s.trek.region === targetRegion).map(s => s.trek);
      const otherRegionTreks = scoredUnseen.filter(s => s.trek.region !== targetRegion).map(s => s.trek);
      
      // We want max 3 items from the same region (plus the injected clicked trek = 4 total from same region)
      const maxSameRegion = 3;
      const topSameRegion = sameRegionTreks.slice(0, maxSameRegion);
      
      const neededOther = (limit - 1) - topSameRegion.length; 
      const topOtherRegion = otherRegionTreks.slice(0, neededOther);
      
      // If we don't have enough other regions, pad with more same region
      const missingOther = neededOther - topOtherRegion.length;
      if (missingOther > 0) {
          topSameRegion.push(...sameRegionTreks.slice(maxSameRegion, maxSameRegion + missingOther));
      }
      
      recommendedUnseen = [...topSameRegion, ...topOtherRegion];
  } else {
      recommendedUnseen = scoredUnseen.map(s => s.trek);
  }
  
  // Inject the literally last viewed trek at index 0, as requested
  const result = newestClickedTrek ? [newestClickedTrek, ...recommendedUnseen] : recommendedUnseen;
  
  return result.slice(0, limit);
}
