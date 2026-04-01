import { Trip } from '../types';

/**
 * Smart recommendation engine for TrekMonk
 * Provides personalized trip recommendations based on user behavior
 */

export interface RecommendationFactors {
    wishlist: string[];
    viewedTrips: string[];
    selectedFilters: {
        regions?: string[];
        difficulty?: string[];
        categories?: string[];
    };
}

/**
 * Get recommended trips based on user's wishlist
 */
export const getWishlistBasedRecommendations = (
    allTrips: Trip[],
    wishlist: string[]
): Trip[] => {
    if (wishlist.length === 0) return [];

    const wishlistTrips = allTrips.filter(trip => wishlist.includes(trip.id));

    // Extract common attributes from wishlist
    const commonRegions = new Set(wishlistTrips.map(t => t.regionSlug));
    const commonDifficulties = new Set(wishlistTrips.map(t => t.difficulty));
    const commonCategories = new Set(wishlistTrips.flatMap(t => t.category));

    // Find similar trips not in wishlist
    return allTrips
        .filter(trip => !wishlist.includes(trip.id))
        .map(trip => {
            let score = 0;
            if (commonRegions.has(trip.regionSlug)) score += 3;
            if (commonDifficulties.has(trip.difficulty)) score += 2;
            trip.category.forEach(cat => {
                if (commonCategories.has(cat)) score += 1;
            });
            return { trip, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6)
        .map(item => item.trip);
};

/**
 * Get recommended trips based on viewed trips
 */
export const getViewHistoryRecommendations = (
    allTrips: Trip[],
    viewedTripIds: string[]
): Trip[] => {
    if (viewedTripIds.length === 0) return [];

    const viewedTrips = allTrips.filter(trip => viewedTripIds.includes(trip.id));

    // Get most recent viewed trip's attributes
    const recentTrip = viewedTrips[viewedTrips.length - 1];

    return allTrips
        .filter(trip => !viewedTripIds.includes(trip.id))
        .filter(trip =>
            trip.regionSlug === recentTrip.regionSlug ||
            trip.difficulty === recentTrip.difficulty ||
            trip.category.some(cat => recentTrip.category.includes(cat))
        )
        .slice(0, 4);
};

/**
 * Get recommended trips based on selected filters
 */
export const getFilterBasedRecommendations = (
    allTrips: Trip[],
    filters: RecommendationFactors['selectedFilters']
): Trip[] => {
    return allTrips
        .filter(trip => {
            if (filters.regions && filters.regions.length > 0) {
                if (!filters.regions.includes(trip.regionSlug)) return false;
            }
            if (filters.difficulty && filters.difficulty.length > 0) {
                if (!filters.difficulty.includes(trip.difficulty)) return false;
            }
            if (filters.categories && filters.categories.length > 0) {
                if (!trip.category.some(cat => filters.categories?.includes(cat))) return false;
            }
            return true;
        })
        .slice(0, 8);
};

/**
 * Get comprehensive personalized recommendations
 */
export const getPersonalizedRecommendations = (
    allTrips: Trip[],
    factors: RecommendationFactors
): Trip[] => {
    const recommendations = new Map<string, { trip: Trip; score: number }>();

    // Wishlist-based (highest weight)
    const wishlistRecs = getWishlistBasedRecommendations(allTrips, factors.wishlist);
    wishlistRecs.forEach((trip, index) => {
        recommendations.set(trip.id, { trip, score: 100 - index * 5 });
    });

    // View history-based (medium weight)
    const viewRecs = getViewHistoryRecommendations(allTrips, factors.viewedTrips);
    viewRecs.forEach((trip, index) => {
        const existing = recommendations.get(trip.id);
        const score = 50 - index * 5;
        if (existing) {
            existing.score += score;
        } else {
            recommendations.set(trip.id, { trip, score });
        }
    });

    // Filter-based (lower weight)
    const filterRecs = getFilterBasedRecommendations(allTrips, factors.selectedFilters);
    filterRecs.forEach((trip, index) => {
        const existing = recommendations.get(trip.id);
        const score = 30 - index * 2;
        if (existing) {
            existing.score += score;
        } else {
            recommendations.set(trip.id, { trip, score });
        }
    });

    // Sort by score and return top recommendations
    return Array.from(recommendations.values())
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
        .map(item => item.trip);
};

/**
 * Get related trips for a specific trip (for trip detail page)
 */
export const getRelatedTrips = (
    allTrips: Trip[],
    currentTrip: Trip,
    limit: number = 4
): Trip[] => {
    return allTrips
        .filter(trip => trip.id !== currentTrip.id)
        .map(trip => {
            let score = 0;
            // Same region gets highest score
            if (trip.regionSlug === currentTrip.regionSlug) score += 5;
            // Same difficulty
            if (trip.difficulty === currentTrip.difficulty) score += 3;
            // Overlapping categories
            const commonCategories = trip.category.filter(cat =>
                currentTrip.category.includes(cat)
            );
            score += commonCategories.length * 2;
            // Similar price range (within 30%)
            const priceDiff = Math.abs(trip.price - currentTrip.price) / currentTrip.price;
            if (priceDiff < 0.3) score += 2;

            return { trip, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.trip);
};
