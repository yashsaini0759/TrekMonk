import type { DepartureCity, StopNode, RouteConfig, LegPricing } from '../types/planner';

export const DEPARTURE_CITIES: DepartureCity[] = [
  { id: 'del', name: 'New Delhi', state: 'Delhi', region: 'north' },
  { id: 'bom', name: 'Mumbai', state: 'Maharashtra', region: 'west' },
  { id: 'blr', name: 'Bangalore', state: 'Karnataka', region: 'south' },
  { id: 'ccu', name: 'Kolkata', state: 'West Bengal', region: 'east' },
  { id: 'maa', name: 'Chennai', state: 'Tamil Nadu', region: 'south' },
];

const STOPS_DB: Record<string, StopNode> = {
  'stop_dehradun': {
    id: 'stop_dehradun',
    name: 'Dehradun',
    state: 'Uttarakhand',
    region: 'north',
    lat: 30.3165,
    lng: 78.0322,
    image: 'https://images.unsplash.com/photo-1626702221611-d703112a52ce?w=600&h=400&fit=crop',
    travelNote: 'Gateway to Garhwal Himalayas',
    aiReason: 'Essential base city — most Uttarakhand treks begin here. Great for acclimatization.',
    travelTimeFromPrevHours: 5,
    isOptional: true,
    hotels: [
      { id: 'h_ddn_1', name: 'Backpacker Hub', tier: 'budget', pricePerNight: 800, rating: 4.1, amenities: ['Wi-Fi', 'Common Area'], image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&h=200&fit=crop', description: 'Cozy and social environment for budget travelers.' },
      { id: 'h_ddn_2', name: 'Comfort Inn Rajpur', tier: 'comfort', pricePerNight: 1800, rating: 4.4, amenities: ['AC', 'Restaurant', 'Free Breakfast'], image: 'https://images.unsplash.com/photo-1518182170546-076616fdfaaf?w=300&h=200&fit=crop', description: 'Comfortable stay with excellent city access.' },
      { id: 'h_ddn_3', name: 'Dehradun Grand', tier: 'luxury', pricePerNight: 4500, rating: 4.8, amenities: ['Pool', 'Spa', 'Fine Dining'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop', description: 'Premium luxury and top-class service.' }
    ],
    activities: [
      { id: 'a_ddn_1', name: 'Robbers Cave Tour', price: 600, duration: 'Half Day', category: 'sightseeing', icon: '⛰️', description: 'Explore the natural river cave formation.' },
      { id: 'a_ddn_2', name: 'Mindrolling Monastery', price: 400, duration: '2 Hours', category: 'cultural', icon: '🏯', description: 'Visit one of the largest Buddhist centers in India.' }
    ],
    mealPackages: [
      { plan: 'none', label: 'No Meals', pricePerDay: 0, includes: [], emoji: '🍽️' },
      { plan: 'breakfast', label: 'Breakfast Only', pricePerDay: 300, includes: ['Buffet Breakfast'], emoji: '🥐' },
      { plan: 'fullboard', label: 'Full Board', pricePerDay: 800, includes: ['Breakfast', 'Lunch', 'Dinner'], emoji: '🍲' }
    ]
  },
  'stop_mussoorie': {
    id: 'stop_mussoorie',
    name: 'Mussoorie',
    state: 'Uttarakhand',
    region: 'north',
    lat: 30.4598,
    lng: 78.0644,
    image: 'https://images.unsplash.com/photo-1605648916319-cf082f7524a1?w=600&h=400&fit=crop',
    travelNote: 'Queen of the Hills',
    aiReason: 'Popular hill station with beautiful views. Great for relaxing before a trek.',
    travelTimeFromPrevHours: 1.5,
    isOptional: true,
    hotels: [
      { id: 'h_mus_1', name: 'Mall Road Hostel', tier: 'budget', pricePerNight: 900, rating: 4.0, amenities: ['Wi-Fi', 'Lockers'], image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&h=200&fit=crop', description: 'Right in the center of the action.' },
      { id: 'h_mus_2', name: 'Himalayan View Retreat', tier: 'comfort', pricePerNight: 2200, rating: 4.5, amenities: ['Balcony', 'Room Heater'], image: 'https://images.unsplash.com/photo-1518182170546-076616fdfaaf?w=300&h=200&fit=crop', description: 'Stunning views of the Doon Valley.' },
      { id: 'h_mus_3', name: 'Mussoorie Palace', tier: 'luxury', pricePerNight: 6500, rating: 4.9, amenities: ['Heritage Property', 'Spa', 'Butler'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop', description: 'Experience royal luxury in the hills.' }
    ],
    activities: [
      { id: 'a_mus_1', name: 'Kempty Falls Trip', price: 800, duration: 'Half Day', category: 'sightseeing', icon: '🌊', description: 'Visit the famous cascading waterfalls.' },
      { id: 'a_mus_2', name: 'Gun Hill Cable Car', price: 300, duration: '2 Hours', category: 'adventure', icon: '🚠', description: 'Ride the ropeway for panoramic views.' }
    ],
    mealPackages: [
      { plan: 'none', label: 'No Meals', pricePerDay: 0, includes: [], emoji: '🍽️' },
      { plan: 'breakfast', label: 'Breakfast Only', pricePerDay: 350, includes: ['Buffet Breakfast'], emoji: '🥐' },
      { plan: 'fullboard', label: 'Full Board', pricePerDay: 900, includes: ['Breakfast', 'Lunch', 'Dinner'], emoji: '🍲' }
    ]
  },
  'stop_sankri': {
    id: 'stop_sankri',
    name: 'Sankri Basecamp',
    state: 'Uttarakhand',
    region: 'north',
    lat: 31.0805,
    lng: 78.1812,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
    travelNote: 'The ultimate trekking hub',
    aiReason: 'The mandatory starting point for Kedarkantha and Har Ki Dun treks.',
    travelTimeFromPrevHours: 4,
    isOptional: false, // Mandatory for certain treks
    hotels: [
      { id: 'h_sk_1', name: 'Sankri Dorms', tier: 'budget', pricePerNight: 500, rating: 4.2, amenities: ['Bunk Beds', 'Hot Water'], image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&h=200&fit=crop', description: 'Basic clean dorms for trekkers.' },
      { id: 'h_sk_2', name: 'Wooden Homestay', tier: 'comfort', pricePerNight: 1500, rating: 4.6, amenities: ['Home Food', 'Valley View'], image: 'https://images.unsplash.com/photo-1518182170546-076616fdfaaf?w=300&h=200&fit=crop', description: 'Authentic local wooden house experience.' },
      { id: 'h_sk_3', name: 'Sankri Boutique', tier: 'luxury', pricePerNight: 3500, rating: 4.8, amenities: ['Heated Rooms', 'Premium Meals'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop', description: 'The most comfortable stay in the village.' }
    ],
    activities: [
      { id: 'a_sk_1', name: 'Village Walk & Culture', price: 500, duration: '3 Hours', category: 'cultural', icon: '🏘️', description: 'Learn about the local architecture and way of life.' },
      { id: 'a_sk_2', name: 'Saur Village Hike', price: 800, duration: 'Half Day', category: 'nature', icon: '🥾', description: 'A short acclimatization hike nearby.' }
    ],
    mealPackages: [
      { plan: 'none', label: 'No Meals', pricePerDay: 0, includes: [], emoji: '🍽️' },
      { plan: 'breakfast', label: 'Breakfast Only', pricePerDay: 200, includes: ['Basic Breakfast'], emoji: '🥐' },
      { plan: 'fullboard', label: 'Full Board', pricePerDay: 800, includes: ['Breakfast', 'Lunch', 'Dinner'], emoji: '🍲' }
    ]
  },
  'dest_kedarkantha': {
    id: 'dest_kedarkantha',
    name: 'Kedarkantha Summit',
    state: 'Uttarakhand',
    region: 'north',
    lat: 31.0225,
    lng: 78.2325,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    travelNote: 'The summit push',
    aiReason: 'Your final destination. A classic winter trek.',
    travelTimeFromPrevHours: 12, // Trekking time
    isOptional: false,
    hotels: [
      { id: 'h_kk_1', name: 'Shared Trekking Tents', tier: 'budget', pricePerNight: 1200, rating: 4.5, amenities: ['Sleeping Bag', 'Mat'], image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=300&h=200&fit=crop', description: 'Standard alpine tents for the trek.' },
      { id: 'h_kk_2', name: 'Premium Trek Tents', tier: 'comfort', pricePerNight: 2500, rating: 4.7, amenities: ['Thick Mattress', 'Dining Tent'], image: 'https://images.unsplash.com/photo-1518182170546-076616fdfaaf?w=300&h=200&fit=crop', description: 'More spacious and comfortable camping.' },
      { id: 'h_kk_3', name: 'Glamping Dome', tier: 'luxury', pricePerNight: 6000, rating: 4.9, amenities: ['Bed', 'Heater', 'Private Toilet'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop', description: 'Luxury geodesic dome at base camp.' }
    ],
    activities: [
      { id: 'a_kk_1', name: 'Guided Summit Trek', price: 2500, duration: '2 Days', category: 'adventure', icon: '🏔️', description: 'Professional guide and equipment for the summit.' },
      { id: 'a_kk_2', name: 'Bonfire Experience', price: 400, duration: 'Evening', category: 'relaxation', icon: '🔥', description: 'Campfire with snacks at Juda Ka Talab.' }
    ],
    mealPackages: [
      { plan: 'none', label: 'No Meals', pricePerDay: 0, includes: [], emoji: '🍽️' },
      { plan: 'fullboard', label: 'Trekker Meals', pricePerDay: 900, includes: ['Hot Breakfast', 'Packed Lunch', 'Dinner', 'Soup'], emoji: '🍲' }
    ]
  },
  'stop_chandigarh': {
    id: 'stop_chandigarh',
    name: 'Chandigarh',
    state: 'Punjab/Haryana',
    region: 'north',
    lat: 30.7333,
    lng: 76.7794,
    image: 'https://images.unsplash.com/photo-1594895697746-5ef1df643c7b?w=600&h=400&fit=crop',
    travelNote: 'The City Beautiful',
    aiReason: 'A great halfway stop between Delhi and Manali to break the long journey.',
    travelTimeFromPrevHours: 4,
    isOptional: true,
    hotels: [
      { id: 'h_chd_1', name: 'Backpacker Stay', tier: 'budget', pricePerNight: 800, rating: 4.1, amenities: ['Wi-Fi', 'Common Room'], image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&h=200&fit=crop', description: 'Affordable stay for transit.' },
      { id: 'h_chd_2', name: 'City Center Hotel', tier: 'comfort', pricePerNight: 2000, rating: 4.4, amenities: ['AC', 'Restaurant'], image: 'https://images.unsplash.com/photo-1518182170546-076616fdfaaf?w=300&h=200&fit=crop', description: 'Comfortable hotel in Sector 17.' },
      { id: 'h_chd_3', name: 'Taj Chandigarh', tier: 'luxury', pricePerNight: 6000, rating: 4.8, amenities: ['Pool', 'Spa', 'Fine Dining'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop', description: 'Premium luxury and top-class service.' }
    ],
    activities: [
      { id: 'a_chd_1', name: 'Rock Garden Visit', price: 200, duration: '2 Hours', category: 'sightseeing', icon: '🗿', description: 'Explore the famous sculpture garden.' },
      { id: 'a_chd_2', name: 'Sukhna Lake Boating', price: 300, duration: '1 Hour', category: 'relaxation', icon: '⛵', description: 'Relaxing boat ride at sunset.' }
    ],
    mealPackages: [
      { plan: 'none', label: 'No Meals', pricePerDay: 0, includes: [], emoji: '🍽️' },
      { plan: 'breakfast', label: 'Breakfast Only', pricePerDay: 300, includes: ['Buffet Breakfast'], emoji: '🥐' },
      { plan: 'fullboard', label: 'Full Board', pricePerDay: 900, includes: ['Breakfast', 'Lunch', 'Dinner'], emoji: '🍲' }
    ]
  },
  'stop_manali': {
    id: 'stop_manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    region: 'north',
    lat: 32.2396,
    lng: 77.1887,
    image: 'https://images.unsplash.com/photo-1605640840469-89d81d2f82c4?w=600&h=400&fit=crop',
    travelNote: 'Valley of the Gods',
    aiReason: 'The mandatory basecamp for the Bhrigu Lake trek. Excellent for acclimatization.',
    travelTimeFromPrevHours: 8,
    isOptional: false,
    hotels: [
      { id: 'h_man_1', name: 'Old Manali Hostel', tier: 'budget', pricePerNight: 700, rating: 4.5, amenities: ['Cafe', 'Wi-Fi', 'Lockers'], image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&h=200&fit=crop', description: 'Vibrant backpacker hub in Old Manali.' },
      { id: 'h_man_2', name: 'Snow Valley Resorts', tier: 'comfort', pricePerNight: 2500, rating: 4.6, amenities: ['Balcony', 'Room Heater', 'Garden'], image: 'https://images.unsplash.com/photo-1518182170546-076616fdfaaf?w=300&h=200&fit=crop', description: 'Beautiful resort with mountain views.' },
      { id: 'h_man_3', name: 'The Himalayan', tier: 'luxury', pricePerNight: 7500, rating: 4.9, amenities: ['Castle Style', 'Pool', 'Spa'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop', description: 'Victorian gothic style luxury resort.' }
    ],
    activities: [
      { id: 'a_man_1', name: 'Solang Valley Visit', price: 800, duration: 'Half Day', category: 'adventure', icon: '🪂', description: 'Adventure sports hub (paragliding/ATV).' },
      { id: 'a_man_2', name: 'Hadimba Temple', price: 200, duration: '2 Hours', category: 'cultural', icon: '🛕', description: 'Ancient cave temple surrounded by cedar forests.' }
    ],
    mealPackages: [
      { plan: 'none', label: 'No Meals', pricePerDay: 0, includes: [], emoji: '🍽️' },
      { plan: 'breakfast', label: 'Breakfast Only', pricePerDay: 350, includes: ['Buffet Breakfast'], emoji: '🥐' },
      { plan: 'fullboard', label: 'Full Board', pricePerDay: 1000, includes: ['Breakfast', 'Lunch', 'Dinner'], emoji: '🍲' }
    ]
  },
  'dest_bhrigu': {
    id: 'dest_bhrigu',
    name: 'Bhrigu Lake',
    state: 'Himachal Pradesh',
    region: 'north',
    lat: 32.2936,
    lng: 77.2530,
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&h=400&fit=crop',
    travelNote: 'Alpine meadows and glacial lake',
    aiReason: 'Stunning high altitude glacial lake trek offering breathtaking views of Pir Panjal.',
    travelTimeFromPrevHours: 14,
    isOptional: false,
    hotels: [
      { id: 'h_bhr_1', name: 'Shared Alpine Tents', tier: 'budget', pricePerNight: 1200, rating: 4.6, amenities: ['Sleeping Bag', 'Mat'], image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=300&h=200&fit=crop', description: 'Standard camping at Rola Kholi.' },
      { id: 'h_bhr_2', name: 'Premium Camps', tier: 'comfort', pricePerNight: 2500, rating: 4.8, amenities: ['Thick Mattress', 'Dining Tent'], image: 'https://images.unsplash.com/photo-1518182170546-076616fdfaaf?w=300&h=200&fit=crop', description: 'Comfortable camping experience.' }
    ],
    activities: [
      { id: 'a_bhr_1', name: 'Guided Bhrigu Trek', price: 2800, duration: '3 Days', category: 'adventure', icon: '🏔️', description: 'Professional guide and equipment for the full trek.' }
    ],
    mealPackages: [
      { plan: 'none', label: 'No Meals', pricePerDay: 0, includes: [], emoji: '🍽️' },
      { plan: 'fullboard', label: 'Trekker Meals', pricePerDay: 1000, includes: ['Hot Breakfast', 'Packed Lunch', 'Dinner', 'Soup'], emoji: '🍲' }
    ]
  }
  // We can add more destinations/stops here later, keeping it short for brevity
};

// Route graph
export const ROUTE_GRAPH: Record<string, RouteConfig> = {
  'del_dest_kedarkantha': {
    routeKey: 'del_dest_kedarkantha',
    pickupId: 'del',
    destinationId: 'dest_kedarkantha',
    destinationName: 'Kedarkantha Base',
    totalEstimatedHours: 24,
    highlights: ['Doon Valley', 'Yamuna River', 'Govind National Park', 'Snow Summit'],
    stops: [
      STOPS_DB['stop_dehradun'],
      STOPS_DB['stop_mussoorie'],
      STOPS_DB['stop_sankri'],
      STOPS_DB['dest_kedarkantha']
    ]
  },
  'del_dest_bhrigu': {
    routeKey: 'del_dest_bhrigu',
    pickupId: 'del',
    destinationId: 'dest_bhrigu',
    destinationName: 'Bhrigu Lake',
    totalEstimatedHours: 26,
    highlights: ['Chandigarh Transit', 'Kullu Valley', 'Old Manali', 'Rohtang Pass Views', 'Bhrigu Lake'],
    stops: [
      STOPS_DB['stop_chandigarh'],
      STOPS_DB['stop_manali'],
      STOPS_DB['dest_bhrigu']
    ]
  }
  // Other routes can be added here
};

// Pricing matrix (Realistic estimates cumulative)
export const TRANSPORT_PRICING: LegPricing[] = [
  { fromId: 'del', toId: 'stop_dehradun', bus: 800, train: 1200, cab: 3500, flight: 5000 },
  { fromId: 'stop_dehradun', toId: 'stop_mussoorie', bus: 150, cab: 1000 },
  { fromId: 'stop_mussoorie', toId: 'stop_sankri', bus: 400, cab: 2500 },
  { fromId: 'stop_dehradun', toId: 'stop_sankri', bus: 500, cab: 3000 },
  { fromId: 'stop_sankri', toId: 'dest_kedarkantha', cab: 0 }, // trekking
  
  // Bhrigu Lake Route Legs
  { fromId: 'del', toId: 'stop_chandigarh', bus: 700, train: 1000, cab: 3000, flight: 3500 },
  { fromId: 'stop_chandigarh', toId: 'stop_manali', bus: 1000, cab: 4500 },
  { fromId: 'del', toId: 'stop_manali', bus: 1400, cab: 6500, flight: 8000 }, // Direct option
  { fromId: 'stop_manali', toId: 'dest_bhrigu', cab: 500 } // Short cab to Gulaba + Trekking
];

export const getRouteConfig = (pickupId: string, destinationId: string): RouteConfig | null => {
  const key = `${pickupId}_${destinationId}`;
  return ROUTE_GRAPH[key] || null;
};

export const getLegPrice = (fromId: string, toId: string, mode: 'bus' | 'train' | 'cab' | 'flight'): number => {
  const leg = TRANSPORT_PRICING.find(l => l.fromId === fromId && l.toId === toId);
  if (!leg) return 0;
  return leg[mode] || 0;
};

// Available destinations to pick from
export const PLANNER_DESTINATIONS = [
  { id: 'dest_kedarkantha', name: 'Kedarkantha Base', state: 'Uttarakhand', region: 'north', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop', tags: ['snow', 'trek'] },
  { id: 'dest_bhrigu', name: 'Bhrigu Lake', state: 'Himachal Pradesh', region: 'north', image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&h=400&fit=crop', tags: ['lake', 'trek'] },
];

// Export STOPS_DB for AI chatbot context
export const STOPS_DB_EXPORT = STOPS_DB;
