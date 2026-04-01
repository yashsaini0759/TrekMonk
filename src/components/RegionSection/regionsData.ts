export interface Place {
  id: string;
  name: string;
  slug: string;
  image: string;
  tag: string;
}

export interface RegionProps {
  id: string;
  title: string;
  slug: string;
  places: Place[];
}

const VALID_IMAGES = [
  '1506905925346-21bda4d32df4',
  '1586348943529-beaae6c28db9',
  '1470770841072-f978cf4d019e',
  '1564507592333-c60657eea523',
  '1622308644420-b20142dc993c',
  '1477587458883-47145ed94245',
  '1598091383021-15ddea10925d',
  '1602216056096-3b40cc0c9944',
  '1558618666-fcd25c85cd64',
  '1507525428034-b723cf961d3e',
  '1507003211169-0a1dd7228f2d',
  '1533107862482-0e6974b06ec4'
];

const getUnsplashImage = (index: number) => {
  const id = VALID_IMAGES[index % VALID_IMAGES.length];
  return `https://images.unsplash.com/photo-${id}?w=600&h=800&fit=crop&q=80&auto=format`;
};

export const regionData: RegionProps[] = [
  {
    id: 'north-india',
    title: 'Majestic North India',
    slug: '/region/north-india',
    places: [
      { id: 'n1', name: 'Manali', slug: 'manali', tag: 'Group Trip', image: getUnsplashImage(0) },
      { id: 'n2', name: 'Kasol', slug: 'kasol', tag: 'Backpacking', image: getUnsplashImage(1) },
      { id: 'n3', name: 'Kheerganga', slug: 'kheerganga', tag: 'Weekend', image: getUnsplashImage(2) },
      { id: 'n4', name: 'Spiti Valley', slug: 'spiti-valley', tag: 'Group Trip', image: getUnsplashImage(3) },
      { id: 'n5', name: 'Kedarnath', slug: 'kedarnath', tag: 'Spiritual', image: getUnsplashImage(4) },
      { id: 'n6', name: 'Badrinath', slug: 'badrinath', tag: 'Spiritual', image: getUnsplashImage(5) },
      { id: 'n7', name: 'Chopta', slug: 'chopta', tag: 'Group Trip', image: getUnsplashImage(6) },
      { id: 'n8', name: 'Auli', slug: 'auli', tag: 'Weekend', image: getUnsplashImage(7) },
      { id: 'n9', name: 'Nainital', slug: 'nainital', tag: 'Group Trip', image: getUnsplashImage(8) },
      { id: 'n10', name: 'Mussoorie', slug: 'mussoorie', tag: 'Weekend', image: getUnsplashImage(9) },
    ],
  },
  {
    id: 'south-india',
    title: 'Incredible South India',
    slug: '/region/south-india',
    places: [
      { id: 's1', name: 'Kerala Backwaters', slug: 'kerala-backwaters', tag: 'Group Trip', image: getUnsplashImage(10) },
      { id: 's2', name: 'Munnar', slug: 'munnar', tag: 'Weekend', image: getUnsplashImage(11) },
      { id: 's3', name: 'Wayanad', slug: 'wayanad', tag: 'Group Trip', image: getUnsplashImage(0) },
      { id: 's4', name: 'Coorg', slug: 'coorg', tag: 'Weekend', image: getUnsplashImage(1) },
      { id: 's5', name: 'Chikmagalur', slug: 'chikmagalur', tag: 'Backpacking', image: getUnsplashImage(2) },
      { id: 's6', name: 'Ooty', slug: 'ooty', tag: 'Group Trip', image: getUnsplashImage(3) },
      { id: 's7', name: 'Kodaikanal', slug: 'kodaikanal', tag: 'Weekend', image: getUnsplashImage(4) },
      { id: 's8', name: 'Hampi', slug: 'hampi', tag: 'Backpacking', image: getUnsplashImage(5) },
      { id: 's9', name: 'Gokarna', slug: 'gokarna', tag: 'Weekend', image: getUnsplashImage(6) },
      { id: 's10', name: 'Pondicherry', slug: 'pondicherry', tag: 'Group Trip', image: getUnsplashImage(7) },
    ],
  },
  {
    id: 'north-east',
    title: 'Mystic North East',
    slug: '/region/north-east',
    places: [
      { id: 'ne1', name: 'Meghalaya (Root Bridges)', slug: 'meghalaya-root-bridges', tag: 'Backpacking', image: getUnsplashImage(8) },
      { id: 'ne2', name: 'Shillong', slug: 'shillong', tag: 'Group Trip', image: getUnsplashImage(9) },
      { id: 'ne3', name: 'Cherrapunji', slug: 'cherrapunji', tag: 'Weekend', image: getUnsplashImage(10) },
      { id: 'ne4', name: 'Dawki River', slug: 'dawki-river', tag: 'Group Trip', image: getUnsplashImage(11) },
      { id: 'ne5', name: 'Kaziranga', slug: 'kaziranga', tag: 'Weekend', image: getUnsplashImage(0) },
      { id: 'ne6', name: 'Tawang', slug: 'tawang', tag: 'Spiritual', image: getUnsplashImage(1) },
      { id: 'ne7', name: 'Ziro Valley', slug: 'ziro-valley', tag: 'Backpacking', image: getUnsplashImage(2) },
      { id: 'ne8', name: 'Gangtok', slug: 'gangtok', tag: 'Group Trip', image: getUnsplashImage(3) },
      { id: 'ne9', name: 'Pelling', slug: 'pelling', tag: 'Weekend', image: getUnsplashImage(4) },
      { id: 'ne10', name: 'Majuli Island', slug: 'majuli-island', tag: 'Backpacking', image: getUnsplashImage(5) },
    ],
  },
  {
    id: 'rajasthan',
    title: 'Royal Rajasthan',
    slug: '/region/rajasthan',
    places: [
      { id: 'r1', name: 'Jaipur', slug: 'jaipur', tag: 'Group Trip', image: getUnsplashImage(6) },
      { id: 'r2', name: 'Udaipur', slug: 'udaipur', tag: 'Weekend', image: getUnsplashImage(7) },
      { id: 'r3', name: 'Jaisalmer', slug: 'jaisalmer', tag: 'Backpacking', image: getUnsplashImage(8) },
      { id: 'r4', name: 'Jodhpur', slug: 'jodhpur', tag: 'Group Trip', image: getUnsplashImage(9) },
      { id: 'r5', name: 'Pushkar', slug: 'pushkar', tag: 'Spiritual', image: getUnsplashImage(10) },
      { id: 'r6', name: 'Mount Abu', slug: 'mount-abu', tag: 'Weekend', image: getUnsplashImage(11) },
      { id: 'r7', name: 'Bikaner', slug: 'bikaner', tag: 'Group Trip', image: getUnsplashImage(0) },
      { id: 'r8', name: 'Ranthambore', slug: 'ranthambore', tag: 'Weekend', image: getUnsplashImage(1) },
      { id: 'r9', name: 'Chittorgarh', slug: 'chittorgarh', tag: 'Backpacking', image: getUnsplashImage(2) },
      { id: 'r10', name: 'Bundi', slug: 'bundi', tag: 'Weekend', image: getUnsplashImage(3) },
    ],
  },
];

