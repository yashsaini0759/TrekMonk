import type {
  PlannerDestination,
  DepartureCity,
  DestinationData,
  Activity,
  Hotel,
  MealPackageOption,
} from '../types/planner';

export const DEPARTURE_CITIES: DepartureCity[] = [
  { id: 'del', name: 'New Delhi', state: 'Delhi', regionType: 'north' },
  { id: 'bom', name: 'Mumbai', state: 'Maharashtra', regionType: 'west' },
  { id: 'blr', name: 'Bangalore', state: 'Karnataka', regionType: 'south' },
  { id: 'pnq', name: 'Pune', state: 'Maharashtra', regionType: 'west' },
  { id: 'maa', name: 'Chennai', state: 'Tamil Nadu', regionType: 'south' },
  { id: 'ccu', name: 'Kolkata', state: 'West Bengal', regionType: 'east' },
  { id: 'hyd', name: 'Hyderabad', state: 'Telangana', regionType: 'south' },
  { id: 'amd', name: 'Ahmedabad', state: 'Gujarat', regionType: 'west' },
];

export const PLANNER_DESTINATIONS: PlannerDestination[] = [
  { id: 'dest_kedarkantha', name: 'Kedarkantha Base', state: 'Uttarakhand', region: 'north', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop', tags: ['snow', 'trek'] },
  { id: 'dest_bhrigu', name: 'Bhrigu Lake', state: 'Himachal Pradesh', region: 'north', image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&h=400&fit=crop', tags: ['lake', 'trek'] },
  { id: 'dest_roopkund', name: 'Roopkund', state: 'Uttarakhand', region: 'north', image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&h=400&fit=crop', tags: ['mystery', 'lake'] },
  { id: 'dest_valley', name: 'Valley of Flowers', state: 'Uttarakhand', region: 'north', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop', tags: ['flowers', 'valley'] },
  { id: 'dest_kerala', name: 'Munnar', state: 'Kerala', region: 'south', image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=600&h=400&fit=crop', tags: ['tea', 'hills'] },
  { id: 'dest_meghalaya', name: 'Cherrapunji', state: 'Meghalaya', region: 'north-east', image: 'https://images.unsplash.com/photo-1622308644420-b20142dc993c?w=600&h=400&fit=crop', tags: ['rain', 'waterfalls'] },
  { id: 'dest_rajasthan', name: 'Jaisalmer', state: 'Rajasthan', region: 'rajasthan', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&h=400&fit=crop', tags: ['desert', 'fort'] },
  { id: 'dest_sankri', name: 'Sankri Village', state: 'Uttarakhand', region: 'north', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop', tags: ['basecamp', 'village'] },
];

const sharedMeals: MealPackageOption[] = [
  { plan: 'none', label: 'No Meals', pricePerDay: 0, includes: [], emoji: '🍽️' },
  { plan: 'basic', label: 'Basic (Breakfast)', pricePerDay: 300, includes: ['Breakfast buffet'], emoji: '🥐' },
  { plan: 'fullboard', label: 'Full Board (All Meals)', pricePerDay: 900, includes: ['Breakfast', 'Lunch', 'Dinner'], emoji: '🍲' },
];

export const DESTINATION_DETAILS: Record<string, DestinationData> = {
  'dest_kedarkantha': {
    destinationId: 'dest_kedarkantha',
    suggestedStops: ['dest_sankri'],
    highlights: ['Juda Ka Talab', 'Summit Sunrise'],
    hotels: [
      { id: 'h_kk_1', name: 'Basecamp Tents', tier: 'budget', pricePerNight: 800, rating: 4.2, amenities: ['Sleeping Bag', 'Shared Washroom'], image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=300&h=200&fit=crop' },
      { id: 'h_kk_2', name: 'Comfort Homestay (Sankri)', tier: 'standard', pricePerNight: 1500, rating: 4.5, amenities: ['Heater', 'Attached Bath', 'Home cooked food'], image: 'https://images.unsplash.com/photo-1518182170546-076616fdfaaf?w=300&h=200&fit=crop' },
      { id: 'h_kk_3', name: 'Luxury Glamping', tier: 'premium', pricePerNight: 4500, rating: 4.8, amenities: ['Kingsize Bed', 'En-suite Bathroom', 'Bonfire'], image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=300&h=200&fit=crop' },
    ],
    activities: [
      { id: 'a_kk_1', name: 'Snow Trekking Guide', price: 1500, duration: '1 Day', category: 'adventure', icon: '🥾', description: 'Experienced local guide for the summit push.' },
      { id: 'a_kk_2', name: 'Bonfire & Stargazing', price: 500, duration: '2 Hours', category: 'relaxation', icon: '🔥', description: 'Cozy bonfire setup with hot soup.' },
      { id: 'a_kk_3', name: 'Snowboarding Intro', price: 2500, duration: 'Half Day', category: 'adventure', icon: '🏂', description: 'Basic snowboarding lesson on gentle slopes.' },
    ],
    mealPackages: sharedMeals,
    restaurants: [
      { name: 'Sankri Local Dhaba', cuisine: 'Garhwali', priceRange: '₹', rating: 4.1 },
      { name: 'Mountain View Cafe', cuisine: 'Cafe', priceRange: '₹₹', rating: 4.4 },
    ],
  },
  'dest_sankri': {
    destinationId: 'dest_sankri',
    suggestedStops: [],
    highlights: ['Local Culture', 'Tons River'],
    hotels: [
      { id: 'h_sk_1', name: 'Backpacker Hostel', tier: 'budget', pricePerNight: 600, rating: 4.0, amenities: ['Bunk Beds', 'Wi-Fi'], image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&h=200&fit=crop' },
      { id: 'h_sk_2', name: 'Sankri Wooden Cottages', tier: 'standard', pricePerNight: 1800, rating: 4.6, amenities: ['Balcony', 'Hot Water'], image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=300&h=200&fit=crop' },
      { id: 'h_sk_3', name: 'The Sankri Retreat', tier: 'premium', pricePerNight: 3500, rating: 4.7, amenities: ['Restaurant', 'Room Service', 'Views'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop' },
    ],
    activities: [
      { id: 'a_sk_1', name: 'Village Heritage Walk', price: 800, duration: '3 Hours', category: 'cultural', icon: '🏘️', description: 'Explore the traditional wooden architecture of Sankri.' },
      { id: 'a_sk_2', name: 'Zip-lining over Tons', price: 1200, duration: '1 Hour', category: 'adventure', icon: '🧗', description: 'Thrilling zip-line across the river valley.' },
    ],
    mealPackages: sharedMeals,
    restaurants: [
      { name: 'Sankri Local Dhaba', cuisine: 'Garhwali', priceRange: '₹', rating: 4.1 },
    ],
  },
  'dest_kerala': {
      destinationId: 'dest_kerala',
      suggestedStops: [],
      highlights: ['Tea Gardens', 'Spice Plantations'],
      hotels: [
          { id: 'h_kl_1', name: 'Munnar Backpacker', tier: 'budget', pricePerNight: 700, rating: 4.1, amenities: ['Dormitory', 'Shared Lounge'], image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&h=200&fit=crop' },
          { id: 'h_kl_2', name: 'Tea Estate Bungalow', tier: 'standard', pricePerNight: 2500, rating: 4.5, amenities: ['Garden View', 'Breakfast Included'], image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=300&h=200&fit=crop' },
          { id: 'h_kl_3', name: 'Munnar Luxury Resort', tier: 'premium', pricePerNight: 8000, rating: 4.9, amenities: ['Spa', 'Infinity Pool', 'Fine Dining'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop' },
      ],
      activities: [
          { id: 'a_kl_1', name: 'Tea Plantation Tour', price: 600, duration: 'Half Day', category: 'sightseeing', icon: '🍃', description: 'Guided tour of lush tea estates and factory.' },
          { id: 'a_kl_2', name: 'Kathakali Show', price: 400, duration: '2 Hours', category: 'cultural', icon: '🎭', description: 'Traditional Kerala dance performance.' },
          { id: 'a_kl_3', name: 'Ayurvedic Massage', price: 2000, duration: '90 Mins', category: 'relaxation', icon: '💆', description: 'Rejuvenating traditional massage.' },
      ],
      mealPackages: sharedMeals,
      restaurants: [
          { name: 'Saravana Bhavan', cuisine: 'South Indian', priceRange: '₹', rating: 4.3 },
          { name: 'Rapsy Restaurant', cuisine: 'Multi-cuisine', priceRange: '₹₹', rating: 4.2 },
      ]
  }
};

// Fallback data for destinations not explicitly detailed above
export const FALLBACK_DESTINATION_DATA = (destId: string): DestinationData => ({
  destinationId: destId,
  suggestedStops: [],
  highlights: ['Scenic Views', 'Local Exploration'],
  hotels: [
    { id: `h_${destId}_1`, name: 'Budget Inn', tier: 'budget', pricePerNight: 800, rating: 3.8, amenities: ['Wi-Fi', 'Clean Rooms'], image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&h=200&fit=crop' },
    { id: `h_${destId}_2`, name: 'Comfort Stay', tier: 'standard', pricePerNight: 2000, rating: 4.2, amenities: ['AC', 'Breakfast', 'TV'], image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=300&h=200&fit=crop' },
    { id: `h_${destId}_3`, name: 'Luxury Resort', tier: 'premium', pricePerNight: 6000, rating: 4.7, amenities: ['Pool', 'Spa', 'Fine Dining'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop' },
  ],
  activities: [
    { id: `a_${destId}_1`, name: 'Local Sightseeing Tour', price: 1000, duration: 'Half Day', category: 'sightseeing', icon: '📸', description: 'Guided tour of the main attractions.' },
    { id: `a_${destId}_2`, name: 'Adventure Activity', price: 1500, duration: '2 Hours', category: 'adventure', icon: '🧗', description: 'Thrilling local adventure experience.' },
  ],
  mealPackages: sharedMeals,
  restaurants: [],
});

export const getDestinationData = (destId: string): DestinationData => {
  return DESTINATION_DETAILS[destId] || FALLBACK_DESTINATION_DATA(destId);
};

export const TRANSPORT_PRICES = {
  bus: 800,
  train: 1200,
  cab: 4000,
  flight: 6500,
};
