import { PLANNER_DESTINATIONS, getRouteConfig } from '../data/routeData';
import type { AIFilters } from '../services/aiChatService';

export interface Suggestion {
  id: string;
  name: string;
  image: string;
  why: string;
  estimated_budget: string;
  days_required: number;
  routeKey: string;
}

export const suggestDestinations = (filters: AIFilters): Suggestion[] => {
  // We use local data entirely. In a real scenario, this would have a complex scoring system.
  // For the lightweight demo, we'll map current destinations.
  
  const suggestions: Suggestion[] = [];

  // Default pickup is Delhi for these demo routes
  const pickupId = 'del';

  PLANNER_DESTINATIONS.forEach(dest => {
    const route = getRouteConfig(pickupId, dest.id);
    if (!route) return;

    let score = 0;
    
    // Budget logic (approximate estimation)
    let minCost = 3000;
    if (filters.budget === 'luxury') minCost += 15000;
    else if (filters.budget === 'comfort') minCost += 5000;

    // Mood matching (very basic heuristic)
    const moodStr = (filters.mood || '').toLowerCase();
    if (dest.tags.some(t => moodStr.includes(t))) score += 2;
    if (dest.id === 'dest_kedarkantha' && moodStr.includes('snow')) score += 3;
    if (dest.id === 'dest_bhrigu' && moodStr.includes('lake')) score += 3;
    
    if (moodStr.includes('adventure')) score += 2; // All treks are adventures
    
    // Construct reason
    let why = "A perfect match for your criteria.";
    if (score >= 3) why = "Highly recommended for your mood!";
    if (dest.id === 'dest_kedarkantha') why = "Best winter snow trek.";
    if (dest.id === 'dest_bhrigu') why = "Stunning high altitude glacial lake.";

    // Estimated Days (Travel + Trek)
    const days = Math.ceil(route.totalEstimatedHours / 24) + 3; // Basic estimate

    suggestions.push({
      id: dest.id,
      name: dest.name,
      image: dest.image,
      why,
      estimated_budget: `₹${minCost.toLocaleString()} - ₹${(minCost + 5000).toLocaleString()}`,
      days_required: days,
      routeKey: route.routeKey
    });
  });

  // Sort by score if we had many, but we just return top 2 for now
  return suggestions.slice(0, 2);
};
