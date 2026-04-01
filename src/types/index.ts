// Core TypeScript interfaces for TrekMonk

export type DifficultyLevel = 'Easy' | 'Moderate' | 'Difficult' | 'Challenging' | 'Extreme';
export type TripType = 'Group' | 'Solo Friendly' | 'Family' | 'Beginners' | 'Adventure' | 'Spiritual' | 'Wildlife';
export type Season = 'Summer' | 'Monsoon' | 'Winter' | 'All Year';

export interface Trip {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  region: string;
  regionSlug: string;
  difficulty: DifficultyLevel;
  duration: number; // in days
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  coverImage: string;
  altitude?: number; // in meters
  groupSize: {
    min: number;
    max: number;
  };
  fitnessLevel: string;
  category: string[];
  tripTypes: TripType[];
  bestSeasons: Season[];
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  safetyInfo: SafetyInfo;
  adventureFacts: AdventureFacts;
  weatherGuide: WeatherGuide;
  packingList: PackingList;
  pickupCities: string[];
  availableDates: AvailableDate[];
  videos?: string[];
  importantNotes: string[];
  terms: string[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
  trending?: boolean;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  highlights: string[];
  meals: ('Breakfast' | 'Lunch' | 'Dinner')[];
  accommodation?: string;
  distance?: string;
  duration?: string;
}

export interface SafetyInfo {
  guides: string;
  emergencySupport: string;
  safetyStandards: string[];
  medicalSupport: string;
}

export interface AdventureFacts {
  distance?: string;
  natureHighlights: string[];
  viewpoints: string[];
  difficultyExplanation: string;
}

export interface WeatherGuide {
  idealMonths: string[];
  temperatureRange: {
    min: number;
    max: number;
  };
  conditions: string;
}

export interface PackingList {
  mandatory: string[];
  optional: string[];
  footwear: string;
}

export interface AvailableDate {
  id: string;
  month: string;
  dates: string[];
  availability: 'Available' | 'Filling Fast' | 'Last Few Seats' | 'Sold Out';
}

export interface Region {
  id: string;
  name: string;
  slug: string;
  description: string;
  banner: string;
  culture: string;
  travelInfo: string;
  popularTrips: string[]; // Trip IDs
  highlights: string[];
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readingTime: number; // in minutes
  category: string;
  tags: string[];
  relatedBlogs?: string[]; // Blog IDs
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  tripName: string;
  rating: number;
  comment: string;
  images?: string[];
  video?: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  tripCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  wishlist: string[]; // Trip IDs
  bookings: Booking[];
  badges: Badge[];
  joinedDate: string;
}

export interface Booking {
  id: string;
  tripId: string;
  tripName: string;
  date: string;
  groupSize: number;
  pickupCity: string;
  totalPrice: number;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  bookingDate: string;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
}

export interface FilterState {
  search: string;
  regions: string[];
  difficulty: DifficultyLevel[];
  duration: number[];
  priceRange: [number, number];
  seasons: Season[];
  tripTypes: TripType[];
  sortBy: 'price-low' | 'price-high' | 'popularity' | 'duration' | 'latest';
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}
