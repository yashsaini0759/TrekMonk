export interface Review {
  id: string;
  name: string;
  avatar: string;
  location?: string;
  trekName?: string;
  rating: number;
  content: string;
}

const VALID_IMAGES = [
  '1506905925346-21bda4d32df4',
  '1586348943529-beaae6c28db9',
  '1470770841072-f978cf4d019e',
  '1564507592333-c60657eea523',
  '1622308644420-b20142dc993c',
  '1477587458883-47145ed94245'
];

const getAvatar = (index: number) => {
  const id = VALID_IMAGES[index % VALID_IMAGES.length];
  return `https://images.unsplash.com/photo-${id}?w=150&h=150&fit=crop&q=80&auto=format`;
};

export const reviewsData: Review[] = [
  {
    id: 'r1',
    name: 'Aisha Sharma',
    avatar: getAvatar(0),
    location: 'Mumbai, IN',
    trekName: 'Kedarkantha Trek',
    rating: 5,
    content: 'One of the best experiences of my life. Everything was perfectly organized and the guides were amazing.',
  },
  {
    id: 'r2',
    name: 'Rohan Mehta',
    avatar: getAvatar(1),
    location: 'Delhi, IN',
    trekName: 'Spiti Valley Expedition',
    rating: 5,
    content: 'The landscapes were surreal. TrekMonk made sure we were safe and comfortable throughout the demanding journey.',
  },
  {
    id: 'r3',
    name: 'Priya Patel',
    avatar: getAvatar(2),
    location: 'Bangalore, IN',
    trekName: 'Kerala Backwaters',
    rating: 4.5,
    content: 'A perfectly curated relaxing trip! The houseboat stay and the local food recommendations were top-notch.',
  },
  {
    id: 'r4',
    name: 'Vikram Singh',
    avatar: getAvatar(3),
    location: 'Pune, IN',
    trekName: 'Kashmir Great Lakes',
    rating: 5,
    content: 'Breathtaking views every single day. The trek leaders were extremely knowledgeable and supportive.',
  },
  {
    id: 'r5',
    name: 'Neha Gupta',
    avatar: getAvatar(4),
    location: 'Hyderabad, IN',
    trekName: 'Meghalaya Root Bridges',
    rating: 5,
    content: 'A magical experience walking through the living root bridges. Everything was flawless and deeply immersive.',
  },
  {
    id: 'r6',
    name: 'Arjun Das',
    avatar: getAvatar(5),
    location: 'Kolkata, IN',
    trekName: 'Hampta Pass',
    rating: 4.5,
    content: 'Challenging but entirely worth it. The transition from lush greens to the stark Spiti landscapes was incredible.',
  }
];
