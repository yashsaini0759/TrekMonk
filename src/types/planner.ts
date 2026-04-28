// TrekMonk — Trip Planner Type Definitions

export type TransportMode = 'bus' | 'train' | 'cab' | 'flight';
export type HotelTier = 'budget' | 'standard' | 'premium';
export type MealPlan = 'none' | 'basic' | 'fullboard';
export type PlanTier = 'budget' | 'balanced' | 'premium';

export interface PlannerDestination {
  id: string;
  name: string;
  state: string;
  region: 'north' | 'south' | 'north-east' | 'rajasthan';
  image: string;
  tags: string[];
}

export interface DepartureCity {
  id: string;
  name: string;
  state: string;
  regionType: 'north' | 'west' | 'south' | 'east';
}

export interface Hotel {
  id: string;
  name: string;
  tier: HotelTier;
  pricePerNight: number;
  rating: number;
  amenities: string[];
  image: string;
}

export interface Activity {
  id: string;
  name: string;
  price: number;
  duration: string;
  category: 'adventure' | 'sightseeing' | 'cultural' | 'nature' | 'relaxation';
  icon: string;
  description: string;
}

export interface MealPackageOption {
  plan: MealPlan;
  label: string;
  pricePerDay: number;
  includes: string[];
  emoji: string;
}

export interface Restaurant {
  name: string;
  cuisine: string;
  priceRange: string;
  rating: number;
}

export interface DestinationData {
  destinationId: string;
  hotels: Hotel[];
  activities: Activity[];
  mealPackages: MealPackageOption[];
  restaurants: Restaurant[];
  suggestedStops: string[];
  highlights: string[];
}

export interface PlanStop {
  destinationId: string;
  name: string;
  days: number;
  hotelId: string | null;
  selectedActivities: string[];
  mealPlan: MealPlan;
}

export interface TripPlan {
  pickup: string;
  destinationId: string;
  transport: TransportMode | null;
  stops: PlanStop[];
  selectedTier: PlanTier;
  budget: number;
}

export interface PriceSummary {
  transport: number;
  stay: number;
  food: number;
  activities: number;
  convenienceFee: number;
  personalization: number;
  total: number;
}

export interface PlanVariant {
  tier: PlanTier;
  label: string;
  tagline: string;
  emoji: string;
  totalPrice: number;
  duration: number;
  highlights: string[];
  transport: TransportMode;
  stops: PlanStop[];
  color: string;
}

export interface BookingRecord {
  id: string;
  plan: TripPlan;
  summary: PriceSummary;
  createdAt: string;
  status: 'confirmed';
}
