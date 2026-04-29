// TrekMonk — Smart Trip Planner Type Definitions v2

export type TransportMode = 'bus' | 'train' | 'cab' | 'flight';
export type HotelTier = 'budget' | 'comfort' | 'luxury';
export type MealPlan = 'none' | 'breakfast' | 'fullboard';
export type PlannerPhase = 'setup' | 'customize' | 'review';

// ─────────────────────────────────────────────
// CORE ENTITIES
// ─────────────────────────────────────────────

export interface DepartureCity {
  id: string;
  name: string;
  state: string;
  region: 'north' | 'west' | 'south' | 'east' | 'north-east';
}

export interface Hotel {
  id: string;
  name: string;
  tier: HotelTier;
  pricePerNight: number;
  rating: number;
  amenities: string[];
  image: string;
  description: string;
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

// ─────────────────────────────────────────────
// ROUTE GRAPH & STOP NODES
// ─────────────────────────────────────────────

/** A geographic stop on a route (intermediate or final) */
export interface StopNode {
  id: string;
  name: string;
  state: string;
  region: string;
  lat: number;
  lng: number;
  image: string;
  travelNote: string;           // e.g. "Gateway to Garhwal Himalayas"
  aiReason: string;             // "Why this stop?" explanation
  travelTimeFromPrevHours: number; // hours from previous node
  hotels: Hotel[];
  activities: Activity[];
  mealPackages: MealPackageOption[];
  isOptional: boolean;          // can the user skip this stop?
}

/** Route graph entry: pickup_id→destination_id */
export interface RouteConfig {
  routeKey: string;             // e.g. "del→dest_kedarkantha"
  pickupId: string;
  destinationId: string;
  destinationName: string;
  stops: StopNode[];            // IN TRAVEL ORDER, pickup excluded, destination last
  totalEstimatedHours: number;
  highlights: string[];
}

/** Per-leg transport pricing */
export interface LegPricing {
  fromId: string;
  toId: string;
  bus?: number;
  train?: number;
  cab: number;
  flight?: number;
}

// ─────────────────────────────────────────────
// USER'S TRIP STATE
// ─────────────────────────────────────────────

/** User's customisations for a single stop */
export interface StopSelection {
  stopId: string;
  name: string;
  isIncluded: boolean;          // user can toggle optional stops
  isCollapsed: boolean;         // accordion state
  days: number;                 // 1–7
  hotelId: string | null;
  mealPlan: MealPlan;
  selectedActivityIds: string[];
}

/** The entire trip plan */
export interface TripPlan {
  pickupId: string;
  pickupName: string;
  destinationId: string;
  destinationName: string;
  transport: TransportMode | null;
  travellers: number;
  stopSelections: StopSelection[]; // in travel order
}

// ─────────────────────────────────────────────
// PRICING
// ─────────────────────────────────────────────

export interface StopCost {
  stopId: string;
  stopName: string;
  stay: number;
  food: number;
  activities: number;
  subtotal: number;
}

export interface PriceSummary {
  transport: number;
  stopCosts: StopCost[];
  totalStay: number;
  totalFood: number;
  totalActivities: number;
  subtotal: number;
  convenienceFee: number;   // 8%
  taxes: number;            // 5% GST
  total: number;
  perPerson: number;
}

// ─────────────────────────────────────────────
// BOOKING
// ─────────────────────────────────────────────

export interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

export interface BookingRecord {
  id: string;
  tripPlan: TripPlan;
  priceSummary: PriceSummary;
  bookingDetails: BookingDetails;
  createdAt: string;
  status: 'confirmed';
}
