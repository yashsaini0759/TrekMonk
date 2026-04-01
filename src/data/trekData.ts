// Extend trekData.ts with detailed info for each trek

export interface ItineraryDay {
  day: number;
  title: string;
  description: string[];
  highlights: string[];
  meals: string;
}

export interface CityOption {
  id: string;
  city: string;
  price: number;
  duration: string;
  image: string;
}

export interface Attraction {
  name: string;
  image: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Review {
  name: string;
  city: string;
  rating: number;
  content: string;
  avatar?: string;
}

export interface TrekFullDetails {
  bestTime: string;
  seatsLeft: number;
  ageGroup: string;
  about: string;
  includes: { icon: string; label: string }[];
  itinerary: ItineraryDay[];
  attractions: Attraction[];
  startingCities: CityOption[];
  faqs: FAQ[];
  reviews?: Review[];
}

export type Region = 'north' | 'south' | 'north-east' | 'rajasthan';
export type Difficulty = 'easy' | 'moderate' | 'hard';
export type Season = 'summer' | 'winter' | 'monsoon' | 'spring';

export interface Trek {
  id: string;
  name: string;
  slug: string;
  location: string;
  region: Region;
  difficulty: Difficulty;
  duration: number;
  altitude: number;
  season: Season[];
  tags: string[];
  price: number;
  rating: number;
  popularityScore: number;
  image: string;
  details?: TrekFullDetails;
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
  '1533107862482-0e6974b06ec4',
];
const img = (i: number) =>
  `https://images.unsplash.com/photo-${VALID_IMAGES[i % VALID_IMAGES.length]}?w=600&h=800&fit=crop&q=80&auto=format`;

const KEDARKANTHA_DETAILS: TrekFullDetails = {
  bestTime: 'December to April',
  seatsLeft: 6,
  ageGroup: '12â€“55 years',
  about: `The Kedarkantha Trek is one of the most popular winter treks in India, renowned for its breathtaking summit views, enchanting pine forests, and pristine snow-covered meadows. Located in the Govind Wildlife Sanctuary in Uttarakhand, this trek offers a perfect balance of adventure and accessibility.

The trail winds through scenic villages, dense forests of oak and pine, and open meadows blanketed with snow. The summit at 3,810 metres offers a 360-degree panoramic view of the Himalayan peaks including Swargarohini, Bandarpoonch, Kala Nag, and Ranglana.

This is an ideal trek for both beginners and experienced trekkers who want to experience the magic of a winter Himalayan adventure without extreme technical difficulty.`,
  includes: [
    { icon: 'meals', label: 'All Meals' },
    { icon: 'camping', label: 'Camping' },
    { icon: 'guide', label: 'Expert Guide' },
    { icon: 'firstaid', label: 'First Aid' },
    { icon: 'transport', label: 'Transport' },
    { icon: 'tents', label: 'Tents' },
  ],
  itinerary: [
    { day: 1, title: 'Arrival in Dehradun / Drive to Sankri', description: ['Drive from Dehradun to Sankri (approx. 8â€“9 hours)', 'Pass through scenic valleys and river gorges', 'Arrive at Sankri base camp and acclimatize'], highlights: ['River Tons Drive', 'Himalayan Villages'], meals: 'Dinner' },
    { day: 2, title: 'Sankri to Juda ka Talab', description: ['Trek begins through dense pine and oak forests', 'Gain altitude gradually through beautiful switchbacks', 'Arrive at Juda ka Talab â€” a frozen lake campsite'], highlights: ['Juda ka Talab', 'Pine Forest', 'Mountain Views'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 3, title: 'Juda ka Talab to Kedarkantha Base', description: ['Trek across open meadows covered in snow', 'Watch the Himalayan peaks emerge on the horizon', 'Set up camp at the summit base'], highlights: ['Kedarkantha Meadows', 'Sunset from Base', 'Snow Walk'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 4, title: 'Summit Day â€” Kedarkantha Peak', description: ['Early morning push to the summit (3 AM)', 'Reach the 3,810m summit just before sunrise', '360-degree panoramic view of 13 Himalayan peaks', 'Descend back to Sankri by evening'], highlights: ['Kedarkantha Summit', 'Sunrise', 'Swargarohini Peak View', '13 Peaks Panorama'], meals: 'Breakfast, Packed Lunch, Dinner' },
    { day: 5, title: 'Sankri to Dehradun â€” Departure', description: ['Morning drive back to Dehradun', 'Trek certificate and memories to carry home', 'Arrive Dehradun by evening'], highlights: ['Trek Certificate', 'Farewell'], meals: 'Breakfast' },
  ],
  attractions: [
    { name: 'Kedarkantha Summit', image: img(0) }, { name: 'Juda ka Talab', image: img(1) }, { name: 'Sankri Village', image: img(2) }, { name: 'Pine Forests', image: img(3) }, { name: 'Snow Meadows', image: img(4) }, { name: 'Swargarohini Peak', image: img(5) },
  ],
  startingCities: [
    { id: 'c1', city: 'Dehradun', price: 7999, duration: '6D/5N', image: img(6) }, { id: 'c2', city: 'Delhi', price: 8999, duration: '7D/6N', image: img(7) }, { id: 'c3', city: 'Mumbai', price: 10499, duration: '7D/6N', image: img(8) }, { id: 'c4', city: 'Pune', price: 10999, duration: '7D/6N', image: img(9) },
  ],
  faqs: [
    { q: 'Is Kedarkantha suitable for beginners?', a: 'Yes! It is one of the best beginner treks in India with well-marked trails and gradual altitude gain.' },
    { q: 'What is the best time to do Kedarkantha Trek?', a: 'December to April offers the best snow experience with magical winter months from Janâ€“Mar.' },
    { q: 'What fitness level is required?', a: 'Moderate fitness is sufficient. 3â€“4 weeks of light jogging recommended beforehand.' },
    { q: 'How do I reach Sankri?', a: 'Sankri is connected by road from Dehradun. TrekMonk provides transport from Dehradun.' },
    { q: 'What should I pack for the trek?', a: 'Layered clothing, waterproof trekking shoes, warm sleeping bag, sunglasses, sunscreen, and a light backpack.' },
  ],
};

const KASOL_DETAILS: TrekFullDetails = {
  bestTime: 'March to June & September to November',
  seatsLeft: 10,
  ageGroup: '15â€“45 years',
  about: `Kasol and Kheerganga is one of the most beloved backpacking routes in Himachal Pradesh, nestled in the breathtaking Parvati Valley. Known for its hippie culture, lush pine forests, and the legendary hot spring at Kheerganga, this route offers an unforgettable experience.

The trek takes you through charming villages like Chalal, Nakthan, and Rudranag, each offering stunning views of the Parvati River and surrounding snow peaks. The trail is bathed in greenery during summer and turns magical during the post-monsoon season.

The highlight is the natural hot water spring at Kheerganga â€” a reward like no other after the trek. Soak in the hot spring while gazing at the snow-capped peaks above.`,
  includes: [
    { icon: 'meals', label: 'All Meals' }, { icon: 'camping', label: 'Camping' }, { icon: 'guide', label: 'Expert Guide' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: 'Transport' }, { icon: 'tents', label: 'Tents' },
  ],
  itinerary: [
    { day: 1, title: 'Delhi to Kasol', description: ['Overnight bus journey from Delhi to Kasol', 'Arrive Kasol in the morning, check into camp', 'Evening stroll along the Parvati River'], highlights: ['Parvati Valley', 'Kasol Village'], meals: 'Dinner' },
    { day: 2, title: 'Kasol to Kheerganga Trek', description: ['Trek begins from Barshaini (15 mins drive from Kasol)', 'Trek through dense forests of pine and rhododendron', 'Pass through Nakthan village, a scenic rest point', 'Arrive at Kheerganga meadows â€” soak in the hot spring!'], highlights: ['Barshaini Start', 'Nakthan Village', 'Kheerganga Hot Spring', 'Himalayan Meadows'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 3, title: 'Kheerganga to Kasol â€” Return', description: ['Morning yoga with mountain views', 'Descend back to Barshaini', 'Spend the afternoon exploring Kasol market', 'Evening bonfire'], highlights: ['Mountain Sunrise', 'Kasol Market', 'Bonfire Night'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 4, title: 'Kasol to Delhi â€” Departure', description: ['Free morning to explore Chalal village', 'Board return bus to Delhi', 'Arrive Delhi by late night'], highlights: ['Chalal Walk', 'Safe Return'], meals: 'Breakfast' },
  ],
  attractions: [
    { name: 'Kheerganga Hot Spring', image: img(1) }, { name: 'Parvati River', image: img(2) }, { name: 'Kasol Village', image: img(3) }, { name: 'Pine Forests', image: img(4) }, { name: 'Chalal Trek', image: img(5) }, { name: 'Nakthan Village', image: img(6) },
  ],
  startingCities: [
    { id: 'c1', city: 'Delhi', price: 5499, duration: '4D/3N', image: img(7) }, { id: 'c2', city: 'Chandigarh', price: 4499, duration: '3D/2N', image: img(8) }, { id: 'c3', city: 'Mumbai', price: 7999, duration: '5D/4N', image: img(9) },
  ],
  faqs: [
    { q: 'Is Kheerganga trek suitable for beginners?', a: 'Yes! It is an easy to moderate trail ideal for first-time trekkers. The path is well-marked and guides are available.' },
    { q: 'What is a hot spring?', a: 'The Kheerganga hot spring is a natural geothermal pool fed by underground volcanic activity. The water is warm year-round and believed to have medicinal properties.' },
    { q: 'Is Kasol safe for solo travelers?', a: 'Yes, Kasol is considered very safe. It is a popular backpacker destination with a friendly community atmosphere.' },
    { q: 'What is the distance of Kheerganga trek?', a: 'The trek is approximately 14 km one way from Barshaini, returning via the same path for a total of 28 km.' },
  ],
};

const SPITI_DETAILS: TrekFullDetails = {
  bestTime: 'June to September',
  seatsLeft: 8,
  ageGroup: '18â€“50 years',
  about: `The Spiti Valley Circuit is one of the most dramatic and remote journeys in all of India. Nestled between the Greater Himalayas and the Tibetan plateau at altitudes exceeding 4,500 metres, Spiti is a cold desert mountain valley that feels like another planet.

This 9-day circuit takes you through monasteries perched on impossible cliffsides, ancient villages frozen in time, sky-blue rivers, and lunar landscapes that defy imagination. Key stops include the Key Monastery, Dhankar, Tabo, and the famed Chandratal Lake.

Spiti is not for the faint-hearted â€” roads are rough, altitude is high, and connectivity is minimal. But for those who make the journey, it offers a profound, soul-changing experience unlike anything else in India.`,
  includes: [
    { icon: 'meals', label: 'All Meals' }, { icon: 'camping', label: 'Camping' }, { icon: 'guide', label: 'Expert Guide' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: '4WD Transport' }, { icon: 'tents', label: 'Tents & Stays' },
  ],
  itinerary: [
    { day: 1, title: 'Shimla to Narkanda to Sarahan', description: ['Depart Shimla early morning by road', 'Drive through apple orchards to Narkanda (2,708m)', 'Reach Sarahan â€” home to the famous Bhimakali Temple', 'Check into guesthouse'], highlights: ['Bhimakali Temple', 'Apple Orchards', 'Himalayan Vistas'], meals: 'Dinner' },
    { day: 2, title: 'Sarahan to Kalpa', description: ['Drive along the Sutlej River gorge', 'Arrive Kalpa â€” panoramic views of Kinnaur Kailash peak (6,050m)', 'Explore Roghi village', 'Overnight at Kalpa'], highlights: ['Kinnaur Kailash View', 'Roghi Village', 'Apple Valley'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 3, title: 'Kalpa to Tabo via Nako', description: ['Cross into Spiti Valley via Khab', 'Visit Nako Lake â€” a sacred high-altitude lake', 'Reach Tabo Monastery â€” 1,000 years old', 'Overnight at Tabo'], highlights: ['Nako Lake', 'Khab Confluence', 'Tabo Monastery'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 4, title: 'Tabo to Dhankar to Kaza', description: ['Visit Dhankar Monastery perched on a sheer cliff', 'Drive to Kaza â€” the district headquarters of Spiti', 'Acclimatize and rest'], highlights: ['Dhankar Monastery', 'Dhankar Lake', 'Kaza Town'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 5, title: 'Kaza Day Trips â€” Key & Kibber', description: ['Visit Key Monastery â€” most iconic in Spiti', 'Drive to Kibber village (4,270m)', 'Spot Himalayan wildlife â€” fox, ibex, snow leopard (luck permitting!)'], highlights: ['Key Monastery', 'Kibber Village', 'Wildlife Spotting'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 6, title: 'Kaza to Chandratal Lake', description: ['Drive to Batal â€” the gateway to Chandratal', 'Trek to the magical Chandratal Lake (4,300m)', 'Camp beside the crescent-shaped lake'], highlights: ['Chandratal Lake', 'Milky Way Camping', 'Batal Bridge'], meals: 'Breakfast, Packed Lunch, Dinner' },
    { day: 7, title: 'Chandratal to Manali â€” Departure', description: ['Morning views of Chandratal at sunrise', 'Drive over Rohtang Pass to Manali', 'Arrive Manali by evening'], highlights: ['Rohtang Pass', 'Manali Arrival'], meals: 'Breakfast, Lunch' },
  ],
  attractions: [
    { name: 'Key Monastery', image: img(2) }, { name: 'Chandratal Lake', image: img(3) }, { name: 'Dhankar Monastery', image: img(4) }, { name: 'Tabo Cave Monastery', image: img(5) }, { name: 'Kibber Village', image: img(6) }, { name: 'Kinnaur Kailash', image: img(7) },
  ],
  startingCities: [
    { id: 'c1', city: 'Shimla', price: 18999, duration: '9D/8N', image: img(8) }, { id: 'c2', city: 'Delhi', price: 21999, duration: '10D/9N', image: img(9) }, { id: 'c3', city: 'Chandigarh', price: 19999, duration: '9D/8N', image: img(10) },
  ],
  faqs: [
    { q: 'Is Spiti Valley suitable for beginners?', a: 'Spiti is best suited for experienced travelers who are physically fit and comfortable with high altitude. The roads are rough and altitude sickness is a real risk.' },
    { q: 'What is the altitude of Spiti Valley?', a: 'Most of Spiti ranges between 3,800m and 4,550m. Chandratal Lake sits at 4,300m. Acclimatization is essential.' },
    { q: 'Is road connectivity reliable?', a: 'Spiti roads can be blocked by snowfall or landslides. The circuit is only accessible from June to September. Always have buffer days.' },
    { q: 'What is the best way to reach Shimla?', a: 'By train (Kalka-Shimla rail) or bus from Delhi. TrekMonk arranges pickup from Shimla directly.' },
    { q: 'Do I need any permits for Spiti?', a: 'Indian nationals do not need special permits for most of Spiti. Some areas near the China border may require Inner Line Permits, which TrekMonk arranges.' },
  ],
};

const KEDARNATH_DETAILS: TrekFullDetails = {
  bestTime: 'May to June & September to October',
  seatsLeft: 12,
  ageGroup: '10â€“60 years',
  about: `The Kedarnath Yatra is one of the most sacred and awe-inspiring pilgrimages in the world. Located at 3,583 metres in the Rudraprayag district of Uttarakhand, Kedarnath is one of the 12 Jyotirlingas and part of the Char Dham circuit.

The trek begins from Gaurikund, weaving through rhododendron forests, scenic valleys, and the roaring Mandakini River. The path is well-defined and used by lakhs of pilgrims each year, yet remains breathtakingly beautiful with snow peaks as a constant backdrop.

Whether you come for spiritual seeking or sheer Himalayan beauty, Kedarnath delivers an experience that transcends the physical journey. The ancient temple, believed to be built by the Pandavas and restored by Adi Shankaracharya, stands proud against the mountain backdrop.`,
  includes: [
    { icon: 'meals', label: 'All Meals' }, { icon: 'camping', label: 'Accommodation' }, { icon: 'guide', label: 'Expert Guide' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: 'Transport' }, { icon: 'tents', label: 'Permits' },
  ],
  itinerary: [
    { day: 1, title: 'Haridwar / Rishikesh to Guptkashi', description: ['Drive from Haridwar through the Garhwal Himalayas', 'Pass through Rudraprayag confluence of Alaknanda and Mandakini', 'Reach Guptkashi â€” overnight stay', 'Evening aarti at Vishwanath Temple'], highlights: ['Rudraprayag Confluence', 'Guptkashi Temple', 'Mountain Drive'], meals: 'Dinner' },
    { day: 2, title: 'Guptkashi to Gaurikund to Kedarnath', description: ['Early morning drive to Gaurikund (1,982m)', 'Trek begins through Mandakini riverside trail', '16 km trek with gradual ascent through meadows and forests', 'Arrive Kedarnath Dham (3,583m) â€” check in'], highlights: ['Gaurikund Hot Springs', 'Mandakini River', 'First View of Kedarnath'], meals: 'Breakfast, Dinner' },
    { day: 3, title: 'Kedarnath Darshan & Gandhi Sarovar', description: ['Early morning darshan at Kedarnath Temple (4 AM â€“ 6 AM)', 'Trek to Gandhi Sarovar (a glacial lake) â€” 2 km from temple', 'Explore Bhairavnath Temple', 'Overnight at Kedarnath'], highlights: ['Kedarnath Temple Darshan', 'Gandhi Sarovar', 'Bhairavnath Temple', 'Himalayan Sunrise'], meals: 'Breakfast, Dinner' },
    { day: 4, title: 'Kedarnath to Gaurikund â€” Descent', description: ['Morning aarti at temple', 'Descend 16 km back to Gaurikund', 'Evening return drive to Guptkashi'], highlights: ['Final Temple Visit', 'Valley Views on Descent'], meals: 'Breakfast, Lunch' },
    { day: 5, title: 'Guptkashi to Haridwar â€” Departure', description: ['Morning drive back to Haridwar / Rishikesh', 'Ganga aarti at Haridwar (if time permits)', 'Depart for your onward destination'], highlights: ['Ganga Aarti Haridwar', 'Farewell'], meals: 'Breakfast' },
  ],
  attractions: [
    { name: 'Kedarnath Temple', image: img(3) }, { name: 'Gandhi Sarovar', image: img(4) }, { name: 'Mandakini River', image: img(5) }, { name: 'Gaurikund', image: img(6) }, { name: 'Vasuki Tal', image: img(7) }, { name: 'Rudraprayag', image: img(8) },
  ],
  startingCities: [
    { id: 'c1', city: 'Haridwar', price: 9499, duration: '5D/4N', image: img(9) }, { id: 'c2', city: 'Delhi', price: 11499, duration: '6D/5N', image: img(10) }, { id: 'c3', city: 'Mumbai', price: 13999, duration: '7D/6N', image: img(11) },
  ],
  faqs: [
    { q: 'When does Kedarnath temple open?', a: 'The temple opens on Akshaya Tritiya (April/May) and closes on Diwali (Oct/Nov) each year. Exact dates vary annually.' },
    { q: 'Can elderly people do this trek?', a: 'Yes! Pony and palki (palanquin) services are available for elderly and differently-abled pilgrims. Helicopter service from Phata/Sitapur is also available.' },
    { q: 'Is advance booking required?', a: 'Yes, online registration and biometric verification are mandatory for Kedarnath. TrekMonk handles all registrations.' },
    { q: 'What is the temple timings for darshan?', a: 'Morning darshan: 4 AM to 12 PM. Evening aarti: 5 PM to 7 PM. Early morning is most spiritual and less crowded.' },
  ],
};

const HAMPTA_DETAILS: TrekFullDetails = {
  bestTime: 'June to September',
  seatsLeft: 9,
  ageGroup: '14â€“50 years',
  about: `The Hampta Pass Trek is one of the most dramatic crossings in the Indian Himalayas, connecting the lush green Kullu Valley with the stark cold desert of the Lahaul-Spiti region. At 4,270 metres, the pass offers a spectacular contrast of landscapes within a single trek.

The trail winds through beautiful meadows filled with wildflowers, river crossings, and glaciated terrain before cresting the pass to reveal the dramatic Spiti landscape on the other side. The juxtaposition of the two valleys â€” one green and forested, the other barren and moon-like â€” is unique to this trek.

The optional extension to Chandratal Lake adds an extra day of camping beside one of the most beautiful high-altitude lakes in the Himalayas, making this a truly memorable adventure.`,
  includes: [
    { icon: 'meals', label: 'All Meals' }, { icon: 'camping', label: 'Camping' }, { icon: 'guide', label: 'Expert Guide' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: 'Transport' }, { icon: 'tents', label: 'Tents' },
  ],
  itinerary: [
    { day: 1, title: 'Manali to Jobra Base Camp', description: ['Drive from Manali to Jobra (1.5 hrs)', 'Short trek through apple orchards to base camp', 'Acclimatization walk along Rani Nallah'], highlights: ['Rani Nallah', 'Manali Views', 'Forest Walk'], meals: 'Lunch, Dinner' },
    { day: 2, title: 'Jobra to Chika', description: ['Trek through dense birch and oak forests', 'Cross several streams and waterfalls', 'Camp at Chika meadows â€” stunning valley views', 'Wildflower meadows in full bloom (July)'], highlights: ['Waterfall Crossings', 'Chika Meadows', 'Wildflowers'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 3, title: 'Chika to Balu Ka Ghera', description: ['Trek through expansive boulder-filled landscape', 'Camp at Balu Ka Ghera â€” "field of sand"', 'Views of Deo Tibba and Indrasan peaks', 'River crossing practice for the next day'], highlights: ['Deo Tibba Views', 'Sand Dunes Camp', 'River Crossing'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 4, title: 'Balu Ka Ghera to Shea Goru via Hampta Pass', description: ['Summit day â€” cross Hampta Pass (4,270m)', 'Dramatic view of snow peaks on both sides', 'Descend into the barren Lahaul landscape', 'Camp at Shea Goru â€” a completely different world'], highlights: ['Hampta Pass Summit', 'Snow Crossing', 'Spiti Landscape', 'Dramatic Contrast'], meals: 'Breakfast, Packed Lunch, Dinner' },
    { day: 5, title: 'Shea Goru to Chatru â€” Drive to Manali', description: ['Short trek to Chatru', 'Drive back to Manali via Rohtang Pass', 'Arrive Manali by evening'], highlights: ['Rohtang Pass', 'Lahaul Valley', 'Farewell'], meals: 'Breakfast, Lunch' },
  ],
  attractions: [
    { name: 'Hampta Pass', image: img(4) }, { name: 'Balu Ka Ghera Camp', image: img(5) }, { name: 'Chika Meadows', image: img(6) }, { name: 'Deo Tibba Peak', image: img(7) }, { name: 'Chandratal Lake', image: img(8) }, { name: 'Lahaul Valley', image: img(9) },
  ],
  startingCities: [
    { id: 'c1', city: 'Manali', price: 10999, duration: '5D/4N', image: img(10) }, { id: 'c2', city: 'Delhi', price: 13499, duration: '7D/6N', image: img(11) }, { id: 'c3', city: 'Chandigarh', price: 11999, duration: '6D/5N', image: img(0) },
  ],
  faqs: [
    { q: 'Is Hampta Pass suitable for beginners?', a: 'Hampta Pass is a moderate trek. Beginners with reasonable fitness can complete it, but prior trekking experience is recommended.' },
    { q: 'Are river crossings dangerous?', a: 'Crossings are cold but manageable with proper guidance. Our guides assist all trekkers. Crossings are done in the morning when water levels are lower.' },
    { q: 'Can we go to Chandratal Lake from Hampta Pass?', a: 'Yes! We offer an optional 1-day extension to Chandratal Lake. It is highly recommended and is the highlight for many trekkers.' },
    { q: 'What gear is essential?', a: 'Waterproof trekking boots, trekking poles, warm layers, rain jacket, and a good sleeping bag rated to -10Â°C are essential.' },
  ],
};

const AULI_DETAILS: TrekFullDetails = {
  bestTime: 'January to March',
  seatsLeft: 14,
  ageGroup: '10â€“55 years',
  about: `Auli is India's premier ski destination, perched at 2,519 metres in the Chamoli district of Uttarakhand. With Asia's longest gondola cable car, well-maintained ski slopes, and dramatic views of Nanda Devi and the Garhwal Himalayas, Auli offers a world-class winter sports experience.

Whether you are a seasoned skier or a complete beginner, Auli has slopes suited to all levels. The ski resort is maintained by GMVN (Garhwal Mandal Vikas Nigam) and offers equipment rentals, professional instructors, and well-groomed runs.

Beyond skiing, Auli is a stunning destination even for non-skiers â€” the snow-covered meadows, cable car rides with panoramic Himalayan views, and the serene forested landscapes make it a perfect winter getaway.`,
  includes: [
    { icon: 'meals', label: 'All Meals' }, { icon: 'camping', label: 'Hotel Stay' }, { icon: 'guide', label: 'Ski Instructor' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: 'Transport' }, { icon: 'tents', label: 'Ski Equipment' },
  ],
  itinerary: [
    { day: 1, title: 'Haridwar / Rishikesh to Joshimath', description: ['Drive from Haridwar through the scenic Garhwal hills', 'Pass Devprayag, Rudraprayag, and Pipalkoti', 'Arrive Joshimath â€” gateway to Auli', 'Rest and acclimatize'], highlights: ['Devprayag Confluence', 'Himalayan Drive', 'Joshimath Town'], meals: 'Dinner' },
    { day: 2, title: 'Joshimath to Auli â€” Begin Skiing', description: ['Take the cable car from Joshimath (4 km gondola ride)', 'Arrive Auli resort (2,519m)', 'Skiing beginner lessons with certified instructors', 'Evening bonfire and hot chocolate'], highlights: ['Gondola Cable Car', 'First Ski Experience', 'Nanda Devi View'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 3, title: 'Auli Skiing Day 2', description: ['Full day skiing on groomed slopes', 'Intermediate and advanced skiers can explore longer runs', 'Snow activities â€” sledging, snowball fights', 'Photography in the snow'], highlights: ['Advanced Ski Slopes', 'Snow Activities', 'Panoramic Views'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 4, title: 'Auli to Haridwar â€” Departure', description: ['Morning skiing session or scenic walk in the snow', 'Descend by cable car to Joshimath', 'Drive back to Haridwar'], highlights: ['Final Views of Himalayas', 'Safe Return'], meals: 'Breakfast, Lunch' },
  ],
  attractions: [
    { name: 'Auli Ski Slopes', image: img(5) }, { name: 'Gondola Cable Car', image: img(6) }, { name: 'Nanda Devi View', image: img(7) }, { name: 'Joshimath Town', image: img(8) }, { name: 'Auli Artificial Lake', image: img(9) }, { name: 'Gorson Bugyal', image: img(10) },
  ],
  startingCities: [
    { id: 'c1', city: 'Haridwar', price: 8999, duration: '4D/3N', image: img(11) }, { id: 'c2', city: 'Delhi', price: 10999, duration: '5D/4N', image: img(0) }, { id: 'c3', city: 'Dehradun', price: 8499, duration: '4D/3N', image: img(1) },
  ],
  faqs: [
    { q: 'Do I need prior skiing experience?', a: 'No! Auli welcomes beginners. Certified ski instructors provide lessons from day one. Equipment is provided.' },
    { q: 'What is the temperature like in Auli in January?', a: 'Temperatures range from -8Â°C to 2Â°C in January. Carry heavy woolens, thermals, ski gloves, and snow boots.' },
    { q: 'Is the cable car safe?', a: "Yes, the Auli Gondola (ropeway) is one of Asia's longest and is operated safely by GMVN with regular maintenance." },
    { q: 'Can non-skiers enjoy Auli?', a: 'Absolutely! Auli offers snow trekking, scenic walks, photography, and incredible Himalayan panoramas even without skiing.' },
  ],
};

const MEGHALAYA_DETAILS: TrekFullDetails = {
  bestTime: 'October to April',
  seatsLeft: 8,
  ageGroup: '12â€“55 years',
  about: `The Living Root Bridges of Meghalaya are one of the most extraordinary natural wonders in the world â€” bridges formed by training the aerial roots of Ficus elastica trees over generations, creating living, self-strengthening structures used by the Khasi tribes for centuries.

Located deep in the East Khasi Hills near Nongriat village, the famous Double Decker Root Bridge requires a trek of about 3,500 steps through dense subtropical rainforest, suspension bridges, and crystal-clear streams. The journey itself is as magical as the destination.

Meghalaya â€” the abode of clouds â€” is also home to some of the wettest and most lush landscapes on Earth. The combination of root bridges, turquoise natural pools, waterfalls, and the unique Khasi culture makes this an unforgettable experience.`,
  includes: [
    { icon: 'meals', label: 'All Meals' }, { icon: 'camping', label: 'Homestay' }, { icon: 'guide', label: 'Local Guide' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: 'Transport' }, { icon: 'tents', label: 'Entry Permits' },
  ],
  itinerary: [
    { day: 1, title: 'Arrive Shillong â€” City Exploration', description: ['Arrive at Guwahati and drive to Shillong (3 hrs)', 'Visit Ward\'s Lake, Police Bazar', 'Evening at Shillong\' buzzing local markets'], highlights: ['Ward\'s Lake', 'Shillong Peak', 'Local Market'], meals: 'Dinner' },
    { day: 2, title: 'Shillong to Cherrapunji', description: ['Drive to Cherrapunji (Sohra) â€” one of the wettest places on Earth', 'Visit Nohkalikai Falls â€” India\'s tallest plunge waterfall', 'Explore Mawsmai Caves', 'Visit Seven Sisters Falls'], highlights: ['Nohkalikai Falls', 'Mawsmai Caves', 'Bangladesh Plains View'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 3, title: 'Trek to Double Decker Root Bridge', description: ['Drive to Tyrna village', 'Trek down 3,500 steps through dense rainforest', 'Arrive at the iconic Double Decker Living Root Bridge', 'Swim in the crystal-clear Rainbow Falls pool', 'Overnight at Nongriat homestay'], highlights: ['Double Decker Root Bridge', 'Rainbow Falls Pool', 'Nongriat Village', 'Lightning Bug Forest Night'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 4, title: 'Return Trek & Dawki Visit', description: ['Trek back up to Tyrna (3,500 steps up)', 'Drive to Dawki â€” the India-Bangladesh border', 'Boat ride on the crystal-clear Umngot River', 'The river bottom is fully visible â€” the clearest river in Asia'], highlights: ['Umngot River Boat Ride', 'Crystal Clear Water', 'Bangladesh Border View'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 5, title: 'Mawlynnong â€” Asia\'s Cleanest Village', description: ['Visit Mawlynnong â€” awarded Asia\'s Cleanest Village', 'Natural balancing rock formations', 'Sky Walk â€” bamboo sky bridge with bird\'s eye view into Bangladesh', 'Drive back to Shillong / Guwahati'], highlights: ['Mawlynnong Village', 'Sky Walk', 'Balancing Rock'], meals: 'Breakfast, Lunch' },
    { day: 6, title: 'Departure from Guwahati', description: ['Transfer to Guwahati Airport or Railway Station', 'Carry back memories from the abode of clouds'], highlights: ['Safe Departure'], meals: 'Breakfast' },
  ],
  attractions: [
    { name: 'Double Decker Root Bridge', image: img(6) }, { name: 'Nohkalikai Falls', image: img(7) }, { name: 'Dawki River', image: img(8) }, { name: 'Rainbow Falls Pool', image: img(9) }, { name: 'Mawlynnong Village', image: img(10) }, { name: 'Mawsmai Caves', image: img(11) },
  ],
  startingCities: [
    { id: 'c1', city: 'Guwahati', price: 14999, duration: '6D/5N', image: img(0) }, { id: 'c2', city: 'Kolkata', price: 16499, duration: '7D/6N', image: img(1) }, { id: 'c3', city: 'Delhi', price: 18999, duration: '7D/6N', image: img(2) },
  ],
  faqs: [
    { q: 'Are Living Root Bridges accessible for all ages?', a: 'The trek involves 3,500 steps each way and can be challenging. Moderate fitness is required. Not suitable for very young children or elderly.' },
    { q: 'What is the best month to visit Meghalaya?', a: 'October to April is best. Avoid Juneâ€“September as Meghalaya receives among the highest rainfall in the world (Cherrapunji holds world records).' },
    { q: 'How are the root bridges formed?', a: 'The Khasi tribes guide the aerial roots of Ficus elastica trees across streams using bamboo scaffolding over decades. Some bridges are 500+ years old and get stronger every year.' },
    { q: 'Is there accommodation near the root bridges?', a: 'Yes, Nongriat village has basic but charming homestays. TrekMonk arranges stays that include home-cooked Khasi meals.' },
  ],
};

const DAWKI_DETAILS: TrekFullDetails = {
  bestTime: 'November to April',
  seatsLeft: 12,
  ageGroup: '10â€“60 years',
  about: `Dawki is a small riverside town on the India-Bangladesh border in Meghalaya, home to the legendary Umngot River â€” the clearest river in Asia. The water is so transparent that the river bottom is clearly visible, making boats appear to float in mid-air.

This 5-day circuit combines the mystical beauty of Dawki with the lush valleys of Cherrapunji, one of the wettest places on Earth. The contrast between the serene crystal river and the dramatic waterfalls and caves of Cherrapunji makes this one of the most varied scenic experiences in India.

Beyond the water, this journey explores the unique Khasi culture, the immaculately clean village of Mawlynnong, natural limestone caves, and panoramic views across the plains of Bangladesh.`,
  includes: [
    { icon: 'meals', label: 'All Meals' }, { icon: 'camping', label: 'Hotel & Homestay' }, { icon: 'guide', label: 'Local Guide' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: 'Transport' }, { icon: 'tents', label: 'Boat Rides' },
  ],
  itinerary: [
    { day: 1, title: 'Arrive Guwahati â€” Drive to Shillong', description: ['Fly or train to Guwahati', 'Drive to Shillong (3 hrs)', 'Check into hotel', 'Evening walk at Police Bazar'], highlights: ['Guwahati to Shillong Drive', 'Shillong Market'], meals: 'Dinner' },
    { day: 2, title: 'Shillong to Cherrapunji', description: ['Morning drive to Cherrapunji (Sohra)', 'Visit Nohkalikai Falls â€” 340m plunge waterfall', 'Explore limestone Mawsmai Caves', 'View Bangladesh plains from Thangkharang Park'], highlights: ['Nohkalikai Falls', 'Mawsmai Caves', 'Seven Sisters Falls', 'Bangladesh View'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 3, title: 'Dawki & Umngot River', description: ['Drive to Dawki â€” India-Bangladesh border', 'Boat ride on the crystal-clear Umngot River', 'Spot the river floor through the transparent water', 'Visit the border checkpoint'], highlights: ['Crystal Clear Umngot River', 'Floating Boat View', 'India-Bangladesh Border'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 4, title: 'Mawlynnong & Shnongpdeng', description: ['Visit Mawlynnong â€” Asia\'s Cleanest Village', 'Bamboo Sky Walk viewpoint', 'Afternoon at Shnongpdeng for cliff jumping and camping by river (optional)'], highlights: ['Mawlynnong Village', 'Sky Walk', 'Shnongpdeng Riverside'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 5, title: 'Return to Guwahati â€” Departure', description: ['Morning at leisure', 'Drive back to Guwahati', 'Depart for home'], highlights: ['Final Glimpses', 'Safe Departure'], meals: 'Breakfast' },
  ],
  attractions: [
    { name: 'Umngot River Dawki', image: img(7) }, { name: 'Nohkalikai Falls', image: img(8) }, { name: 'Mawlynnong Village', image: img(9) }, { name: 'Mawsmai Caves', image: img(10) }, { name: 'Shnongpdeng River', image: img(11) }, { name: 'Bangladesh Border View', image: img(0) },
  ],
  startingCities: [
    { id: 'c1', city: 'Guwahati', price: 11999, duration: '5D/4N', image: img(1) }, { id: 'c2', city: 'Kolkata', price: 13499, duration: '6D/5N', image: img(2) }, { id: 'c3', city: 'Delhi', price: 15999, duration: '6D/5N', image: img(3) },
  ],
  faqs: [
    { q: 'Is Dawki river always this clear?', a: 'The river is clearest from November to April before monsoons. During monsoon (June-September) it turns turbid with rainwater.' },
    { q: 'Can we swim in the Umngot River?', a: 'Swimming is not permitted near the popular boating area, but Shnongpdeng village downstream allows swimming and cliff jumping.' },
    { q: 'Is Dawki close to the Bangladesh border?', a: 'Yes, Dawki is at the international border. You can visit the border gate but will need your ID. No crossing without valid visa.' },
    { q: 'What is Mawlynnong famous for?', a: 'Mawlynnong was awarded Asia\'s Cleanest Village by Discover India Magazine. The villagers take immense pride in maintaining cleanliness with no plastic policy.' },
  ],
};


const TAWANG_DETAILS: TrekFullDetails = {
  bestTime: 'March to October',
  seatsLeft: 10,
  ageGroup: '14â€“55 years',
  about: `Tawang, nestled in the remote western tip of Arunachal Pradesh at 3,048 metres, is one of India's most breathtaking and least explored destinations. Home to the largest Buddhist monastery in India and the second largest in Asia, Tawang offers a rare window into Tibetan Buddhist culture.

The journey to Tawang is itself an adventure â€” crossing the legendary Sela Pass (4,170m), often blanketed in snow and mist, before descending into the peaceful Tawang Valley. The region is dotted with ancient gompas, serene lakes, picturesque waterfalls, and warm Monpa tribal villages.

With its crisp mountain air, dramatic landscapes, and deeply spiritual atmosphere, Tawang is a destination that stays with you long after you return.`,
  includes: [
    { icon: 'meals', label: 'All Meals' }, { icon: 'camping', label: 'Hotel Stay' }, { icon: 'guide', label: 'Local Guide' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: 'Transport' }, { icon: 'tents', label: 'ILP Permit' },
  ],
  itinerary: [
    { day: 1, title: 'Guwahati to Tezpur', description: ['Fly to Guwahati, drive to Tezpur (3 hrs)', 'Visit Nameri National Park enroute', 'Overnight at Tezpur'], highlights: ['Nameri National Park', 'Brahmaputra Views'], meals: 'Dinner' },
    { day: 2, title: 'Tezpur to Dirang', description: ['Drive through Bhalukpong wildlife corridor', 'Cross into Arunachal Pradesh (ILP checkpoint)', 'Arrive Dirang â€” a small hill town', 'Visit Dirang Dzong and hot springs'], highlights: ['Dirang Dzong', 'Dirang Hot Springs', 'Sangti Valley'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 3, title: 'Dirang to Tawang via Sela Pass', description: ['Drive over Sela Pass (4,170m) â€” often snow-covered', 'Visit Sela Lake â€” a sacred high-altitude lake', 'Jaswant Garh war memorial', 'Arrive Tawang â€” first view of the monastery'], highlights: ['Sela Pass', 'Sela Lake', 'Jaswant Garh Memorial', 'Tawang Monastery First View'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 4, title: 'Tawang Monastery & Town', description: ['Morning visit to Tawang Gompa (founded 1681)', 'Explore the monastery museum and prayer halls', 'Visit Tawang War Memorial', 'Afternoon at Tawang market â€” Monpa handicrafts'], highlights: ['Tawang Monastery', 'War Memorial', 'Monpa Culture', 'Tibetan Architecture'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 5, title: 'Day Trip â€” Bum La Pass & PT Tso Lake', description: ['Drive to the India-China border at Bum La Pass (4,700m) â€” permits required', 'Visit the stunning PT Tso Lake', 'Return to Tawang'], highlights: ['Bum La Border Pass', 'PT Tso Lake', 'India-China Border'], meals: 'Breakfast, Packed Lunch, Dinner' },
    { day: 6, title: 'Tawang to Guwahati â€” Departure', description: ['Drive back via Sela Pass', 'Reach Guwahati by evening / overnight', 'Depart for home'], highlights: ['Farewell Drive', 'Mountain Panorama'], meals: 'Breakfast' },
  ],
  attractions: [
    { name: 'Tawang Monastery', image: img(8) }, { name: 'Sela Pass', image: img(9) }, { name: 'PT Tso Lake', image: img(10) }, { name: 'Bum La Pass', image: img(11) }, { name: 'Dirang Dzong', image: img(0) }, { name: 'War Memorial Tawang', image: img(1) },
  ],
  startingCities: [
    { id: 'c1', city: 'Guwahati', price: 16999, duration: '7D/6N', image: img(2) }, { id: 'c2', city: 'Kolkata', price: 18999, duration: '8D/7N', image: img(3) }, { id: 'c3', city: 'Delhi', price: 21999, duration: '8D/7N', image: img(4) },
  ],
  faqs: [
    { q: 'What is an Inner Line Permit (ILP)?', a: 'ILP is a mandatory permit for Indian citizens visiting Arunachal Pradesh. TrekMonk arranges it on your behalf. Foreign nationals require a Protected Area Permit (PAP).' },
    { q: 'Can we visit Bum La Pass?', a: 'Yes, but only Indian nationals with prior approval from the Army. TrekMonk arranges this. The pass is at 4,700m on the China border and is open May to November only.' },
    { q: 'Is altitude sickness an issue in Tawang?', a: 'Tawang sits at 3,048m and Sela Pass crosses 4,170m. Ascend gradually, stay hydrated, and avoid exertion on arrival. Diamox is recommended.' },
    { q: 'What is the best time to see snow in Tawang?', a: 'October to February. Sela Pass remains snow-covered even in March and April. Avoid the monsoon (July-August) due to landslide risk.' },
  ],
};

const KERALA_DETAILS: TrekFullDetails = {
  bestTime: 'October to March',
  seatsLeft: 16,
  ageGroup: '8â€“65 years',
  about: `Kerala â€” God's Own Country â€” is one of the most diverse and visually stunning destinations in India. This 6-day journey combines the tranquil backwaters of Alleppey, the rolling tea gardens of Munnar, and the pristine beaches of Varkala into one unforgettable experience.

The backwaters of Kerala are a unique network of lagoons, lakes, and rivers that run parallel to the Arabian Sea coast. A night aboard a traditional rice-boat houseboat, drifting through palm-fringed canals, is one of India's most iconic travel experiences.

Munnar, perched at 1,600 metres in the Western Ghats, is a stunning hill station carpeted with emerald tea estates, mist-covered valleys, and cool climate. Together, these two contrasting landscapes make Kerala one of India's most complete travel destinations.`,
  includes: [
    { icon: 'meals', label: 'All Meals' }, { icon: 'camping', label: 'Houseboat & Hotel' }, { icon: 'guide', label: 'Local Guide' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: 'AC Transport' }, { icon: 'tents', label: 'Activities' },
  ],
  itinerary: [
    { day: 1, title: 'Arrive Kochi â€” City Tour', description: ['Arrive Kochi (Cochin) by flight or train', 'Visit Fort Kochi â€” Chinese fishing nets, Dutch Palace', 'Sunset cruise on the Kochi harbour', 'Overnight at Kochi'], highlights: ['Fort Kochi', 'Chinese Fishing Nets', 'St. Francis Church', 'Harbour Cruise'], meals: 'Dinner' },
    { day: 2, title: 'Kochi to Munnar', description: ['Drive to Munnar (4 hrs) through rubber and spice plantations', 'Visit Cheeyappara and Valara waterfalls enroute', 'Arrive Munnar â€” India\'s tea capital', 'Evening walk at Munnar town'], highlights: ['Cheeyappara Waterfalls', 'Tea Estate Drive', 'Munnar Town'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 3, title: 'Munnar â€” Tea Gardens & Wildlife', description: ['Morning visit to Tea Museum â€” learn how tea is processed', 'Drive to Eravikulam National Park (Nilgiri Tahr habitat)', 'Visit Mattupetty Lake and Indo-Swiss Dairy Farm', 'Top Station â€” highest point of Munnar with misty valley views'], highlights: ['Tea Museum', 'Eravikulam National Park', 'Mattupetty Lake', 'Top Station'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 4, title: 'Munnar to Alleppey â€” Houseboat Check-in', description: ['Drive to Alleppey (Alappuzha) â€” backwaters capital', 'Board traditional Kerala rice-boat houseboat', 'Drift through narrow canals, paddy fields, and fishing villages', 'Sunset from deck, overnight in the backwaters'], highlights: ['Kerala Houseboat', 'Backwater Canals', 'Village Life on Water', 'Paddy Field Views'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 5, title: 'Backwaters to Varkala Beach', description: ['Morning cruise through Vembanad Lake â€” Kerala\'s largest lake', 'Disembark and drive to Varkala (2 hrs)', 'Cliff beach at Varkala â€” dramatic red laterite cliffs', 'Sunset at Papanasam Beach'], highlights: ['Vembanad Lake', 'Varkala Cliff Beach', 'Papanasam Beach', 'Cliff Walk'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 6, title: 'Varkala to Kochi â€” Departure', description: ['Morning yoga on the beach (optional)', 'Drive back to Kochi airport / railway station', 'Depart with Kerala memories'], highlights: ['Beach Yoga', 'Safe Departure'], meals: 'Breakfast' },
  ],
  attractions: [
    { name: 'Kerala Houseboat', image: img(9) }, { name: 'Munnar Tea Gardens', image: img(10) }, { name: 'Fort Kochi', image: img(11) }, { name: 'Eravikulam Park', image: img(0) }, { name: 'Varkala Cliffs', image: img(1) }, { name: 'Backwaters Canals', image: img(2) },
  ],
  startingCities: [
    { id: 'c1', city: 'Kochi', price: 12999, duration: '6D/5N', image: img(3) }, { id: 'c2', city: 'Mumbai', price: 15999, duration: '7D/6N', image: img(4) }, { id: 'c3', city: 'Delhi', price: 16999, duration: '7D/6N', image: img(5) }, { id: 'c4', city: 'Bangalore', price: 13999, duration: '6D/5N', image: img(6) },
  ],
  faqs: [
    { q: 'What is a Kerala houseboat?', a: 'A Kettuvallam or Rice Boat is a traditional wooden barge converted into a luxury floating home, complete with bedroom, kitchen, and sit-out deck. Ours are fully air-conditioned.' },
    { q: 'When is the best time to visit Munnar?', a: 'October to March is ideal - weather is cool and clear. September/October brings the Neelakurinji bloom (once every 12 years â€” check for the next bloom year!).' },
    { q: 'Is Kerala suitable for family travel?', a: 'Absolutely! Kerala is one of India\'s most family-friendly destinations with calm waters, beautiful resorts, and child-friendly activities throughout.' },
    { q: 'What should I pack for Kerala?', a: 'Light cotton clothes for the coast and backwaters, plus one warm layer for Munnar evenings. Sunscreen, insect repellent, and comfortable walking sandals.' },
  ],
};

const COORG_DETAILS: TrekFullDetails = {
  bestTime: 'October to March',
  seatsLeft: 14,
  ageGroup: '8â€“60 years',
  about: `Coorg (Kodagu) and Wayanad together form one of South India's most enchanting natural escapes. Coorg â€” the Scotland of India â€” is a district in Karnataka's Western Ghats, draped in coffee and spice plantations, misty mountains, ancient temples, and cascading waterfalls.

Wayanad, just across the Kerala border, adds a wilder dimension to the journey â€” tribal villages, bamboo forests, ancient cave paintings, elephant corridors, and the breathtaking Edakkal Caves with neolithic carvings.

Together these two hill districts offer a perfect blend of nature, culture, adventure, and relaxation â€” all within a compact 5-day escape from the plains.`,
  includes: [
    { icon: 'meals', label: 'All Meals' }, { icon: 'camping', label: 'Plantation Stay' }, { icon: 'guide', label: 'Nature Guide' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: 'Transport' }, { icon: 'tents', label: 'Activities' },
  ],
  itinerary: [
    { day: 1, title: 'Arrive Coorg â€” Plantation Walk', description: ['Arrive Madikeri â€” the heart of Coorg', 'Check into a coffee estate stay', 'Evening plantation walk â€” see coffee, cardamom, and pepper vines', 'Sunset at Raja\'s Seat viewpoint'], highlights: ['Coffee Estate Stay', 'Plantation Walk', "Raja's Seat"], meals: 'Lunch, Dinner' },
    { day: 2, title: 'Coorg Sights â€” Abbey Falls & Namdroling', description: ['Visit Abbey Falls â€” a stunning 70-foot waterfall surrounded by coffee', 'Explore the Golden Temple (Namdroling Monastery) â€” Tibetan Buddhism in Coorg', 'Afternoon at Talacauvery â€” source of the Kaveri River', 'Bhagamandala â€” sacred temple confluence'], highlights: ['Abbey Falls', 'Namdroling Tibetan Monastery', 'Talacauvery', 'Bhagamandala'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 3, title: 'Rafting on the Barapole River (Optional)', description: ['White-water rafting on the Barapole River (Grade 2-3, suitable for beginners)', 'Afternoon visit to Dubare Elephant Camp', 'Elephant interaction, feeding, and bathing experience'], highlights: ['Barapole River Rafting', 'Dubare Elephant Camp', 'Elephant Bathing'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 4, title: 'Drive to Wayanad â€” Edakkal Caves', description: ['Scenic drive from Coorg to Wayanad via Tholpetty', 'Visit Edakkal Caves â€” neolithic petroglyphs dating back 6,000 years', 'Chembra Peak viewpoint â€” heart-shaped lake at summit', 'Overnight at Wayanad jungle resort'], highlights: ['Edakkal Cave Petroglyphs', 'Chembra Peak', 'Jungle Resort'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 5, title: 'Wayanad Wildlife & Departure', description: ['Early morning jeep safari in Wayanad Wildlife Sanctuary', 'Spot elephants, deer, and langurs', 'Drive back to Mysore or Bangalore for departure'], highlights: ['Wayanad Jeep Safari', 'Wildlife Encounter', 'Pookode Lake'], meals: 'Breakfast, Packed Lunch' },
  ],
  attractions: [
    { name: 'Abbey Falls Coorg', image: img(10) }, { name: 'Namdroling Monastery', image: img(11) }, { name: 'Edakkal Caves', image: img(0) }, { name: 'Dubare Elephant Camp', image: img(1) }, { name: 'Barapole River', image: img(2) }, { name: 'Wayanad Wildlife', image: img(3) },
  ],
  startingCities: [
    { id: 'c1', city: 'Bangalore', price: 9999, duration: '5D/4N', image: img(4) }, { id: 'c2', city: 'Mysore', price: 8999, duration: '5D/4N', image: img(5) }, { id: 'c3', city: 'Mumbai', price: 12999, duration: '6D/5N', image: img(6) },
  ],
  faqs: [
    { q: 'What is Coorg famous for?', a: 'Coorg is famous for its coffee â€” India\'s finest arabica and robusta coffee grows here. It is also known for the Kodava culture, beautiful waterfalls, and misty hill scenery.' },
    { q: 'Is the Barapole river rafting safe?', a: 'Yes! The Barapole is a Grade 2-3 river suitable for beginners. All safety equipment is provided and experienced guides accompany the raft at all times.' },
    { q: 'Can children do the Edakkal Caves trek?', a: 'The caves involve a 1.5 km moderately steep climb with some rocky sections. Children above 7 years are usually fine with parental assistance.' },
    { q: 'What is the temperature in Coorg?', a: 'Coorg remains pleasantly cool year-round: 15Â°C to 28Â°C. Carry a light jacket for evenings. Monsoon (June-August) brings heavy rain and leeches on forest trails.' },
  ],
};

const HAMPI_DETAILS: TrekFullDetails = {
  bestTime: 'October to February',
  seatsLeft: 18,
  ageGroup: '10â€“65 years',
  about: `Hampi is one of India's most extraordinary historical sites â€” a UNESCO World Heritage site and the former capital of the mighty Vijayanagara Empire, which was once one of the richest cities in the world. Today it stands as a vast open-air museum of ruined temples, royal pavilions, ancient market streets, and surreal boulder-strewn landscapes.

Spread across 4,100 hectares along the Tungabhadra River, Hampi's ruins are both magnificent and melancholy â€” frozen in time since the city's destruction in 1565. The granite boulders that form the landscape give Hampi a unique, otherworldly beauty.

Walking through Hampi is like time travel â€” past the magnificent Virupaksha Temple (still active after 7 centuries), the musical pillars of Vittala Temple, the iconic Stone Chariot, and the royal elephant stables.`,
  includes: [
    { icon: 'meals', label: 'Daily Breakfast' }, { icon: 'camping', label: 'Heritage Hotel' }, { icon: 'guide', label: 'History Guide' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: 'Transport' }, { icon: 'tents', label: 'Entry Tickets' },
  ],
  itinerary: [
    { day: 1, title: 'Arrive Hampi â€” Sacred Centre', description: ['Arrive Hospet (nearest railhead), drive to Hampi (13 km)', 'Check into heritage accommodation', 'Evening visit to Virupaksha Temple â€” sunrise temple on the Tungabhadra', 'Sunset view from Hemakuta Hill'], highlights: ['Virupaksha Temple', 'Tungabhadra River', 'Hemakuta Hill Sunset'], meals: 'Dinner' },
    { day: 2, title: 'Royal Enclosure & Vittala Temple', description: ['Morning visit to Vittala Temple â€” Stone Chariot and Musical Pillars', 'Explore the Royal Enclosure â€” Lotus Mahal, Elephant Stables, Queens Bath', 'Afternoon at Hampi Bazaar â€” ancient market ruins', 'Coracle boat ride on Tungabhadra River'], highlights: ['Stone Chariot', 'Musical Pillars', 'Elephant Stables', 'Coracle Boat Ride'], meals: 'Breakfast, Dinner' },
    { day: 3, title: 'Hippie Island & Sunset View', description: ['Morning bike ride or walk to Hippie Island (Virupapur Gadde) across the river', 'Explore the laid-back villages and paddy fields', 'Afternoon boulder-bouldering session', 'Sunset from Matanga Hill â€” the best view in Hampi'], highlights: ['Hippie Island', 'Matanga Hill Sunset', 'Boulder Landscape', 'Village Life'], meals: 'Breakfast' },
  ],
  attractions: [
    { name: 'Stone Chariot Hampi', image: img(11) }, { name: 'Virupaksha Temple', image: img(0) }, { name: 'Vittala Temple', image: img(1) }, { name: 'Matanga Hill', image: img(2) }, { name: 'Elephant Stables', image: img(3) }, { name: 'Tungabhadra River', image: img(4) },
  ],
  startingCities: [
    { id: 'c1', city: 'Bangalore', price: 6499, duration: '3D/2N', image: img(5) }, { id: 'c2', city: 'Hyderabad', price: 6999, duration: '3D/2N', image: img(6) }, { id: 'c3', city: 'Mumbai', price: 9499, duration: '4D/3N', image: img(7) },
  ],
  faqs: [
    { q: 'How do I get to Hampi?', a: 'The nearest railhead is Hospet (13 km). Overnight buses from Bangalore, Hyderabad, and Goa stop directly at Hampi. TrekMonk arranges all transfers.' },
    { q: 'Is Hampi suitable for photography?', a: 'Hampi is one of India\'s most photogenic destinations. The golden granite boulders, ancient ruins at sunrise and sunset, and the river create magical photo opportunities.' },
    { q: 'What is the significance of the Stone Chariot?', a: 'The Stone Chariot at Vittala Temple is one of India\'s most iconic monuments â€” a shrine carved as a chariot with rotating stone wheels, symbolizing the celestial vehicle of Vishnu.' },
    { q: 'Can I rent a bicycle in Hampi?', a: 'Yes! Cycling is one of the best ways to explore the vast site. Bicycles and mopeds are available for rent near the main bazaar for about â‚¹100â€“200/day.' },
  ],
};

const JAISALMER_DETAILS: TrekFullDetails = {
  bestTime: 'October to March',
  seatsLeft: 12,
  ageGroup: '6â€“70 years',
  about: `Jaisalmer â€” the Golden City â€” is one of the most magnificent desert destinations in the world. Built from golden-yellow sandstone, the city's towering fort, ornate havelis, and temples glow like burnished gold at sunset, creating views of extraordinary beauty.

The highlight of any Jaisalmer visit is the overnight camel safari into the Thar Desert's sand dunes â€” particularly the iconic Sam Sand Dunes. Riding at sunset into the dunes, camping under a sky ablaze with stars, and waking to sunrise over endless waves of sand is a deeply magical experience.

Beyond the desert, Jaisalmer's 12th-century fort (one of the largest living forts in the world â€” people still live inside!), its intricated carved Jain temples, and the nearby Gadisar Lake make this one of Rajasthan's crown jewels.`,
  includes: [
    { icon: 'meals', label: 'All Meals' }, { icon: 'camping', label: 'Desert Camp' }, { icon: 'guide', label: 'Local Guide' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: 'AC Transport' }, { icon: 'tents', label: 'Camel Safari' },
  ],
  itinerary: [
    { day: 1, title: 'Arrive Jaisalmer â€” Fort & Havelis', description: ['Arrive Jaisalmer by train or flight', 'Check into heritage hotel inside or near the fort', 'Explore Jaisalmer Fort â€” Rajmahal, Jain Temples', 'Evening at Gadisar Lake â€” sunset over the ancient stepwell'], highlights: ['Jaisalmer Fort', 'Jain Temples', 'Gadisar Lake Sunset'], meals: 'Dinner' },
    { day: 2, title: 'Havelis, Bazaars & Kuldhara', description: ['Morning visit to Patwon Ki Haveli â€” the grandest haveli in Jaisalmer', 'Salim Singh Ki Haveli â€” extraordinary peacock roof', 'Visit Kuldhara â€” a ghost village abandoned 200 years ago', 'Afternoon browsing the vibrant Jaisalmer market'], highlights: ['Patwon Ki Haveli', 'Kuldhara Ghost Village', 'Jaisalmer Bazaar', 'Local Handicrafts'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 3, title: 'Sam Sand Dunes â€” Camel Safari & Desert Camp', description: ['Drive to Sam Sand Dunes (40 km from Jaisalmer)', 'Sunset camel safari into the dunes', 'Arrive at premium desert camp â€” bonfire, folk music, Rajasthani dance', 'Overnight camping under the stars in the Thar Desert'], highlights: ['Sam Sand Dunes', 'Camel Safari', 'Rajasthani Folk Music', 'Stargazing in the Desert'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 4, title: 'Desert Sunrise & Departure', description: ['Wake before sunrise â€” golden dune landscape', 'Drive back to Jaisalmer', 'Depart for Jodhpur or onward destination'], highlights: ['Desert Sunrise', 'Thar Farewell'], meals: 'Breakfast' },
  ],
  attractions: [
    { name: 'Sam Sand Dunes', image: img(0) }, { name: 'Jaisalmer Fort', image: img(1) }, { name: 'Camel Safari', image: img(2) }, { name: 'Patwon Ki Haveli', image: img(3) }, { name: 'Gadisar Lake', image: img(4) }, { name: 'Kuldhara Village', image: img(5) },
  ],
  startingCities: [
    { id: 'c1', city: 'Jodhpur', price: 8499, duration: '4D/3N', image: img(6) }, { id: 'c2', city: 'Jaipur', price: 9499, duration: '4D/3N', image: img(7) }, { id: 'c3', city: 'Delhi', price: 10999, duration: '5D/4N', image: img(8) }, { id: 'c4', city: 'Mumbai', price: 12499, duration: '5D/4N', image: img(9) },
  ],
  faqs: [
    { q: 'Is the desert camp comfortable?', a: 'Our premium Swiss-tent camp includes proper beds, clean linens, attached toilets, electricity, and Rajasthani cuisine. It is glamping in the desert!' },
    { q: 'When is the best time to see the dunes?', a: 'October to March is perfect â€” cool days and cold nights. Avoid April-June when temperatures reach 50Â°C. The nights are magical year-round.' },
    { q: 'Is Jaisalmer safe for solo female travelers?', a: 'Yes, Jaisalmer is generally safe for solo female travelers. TrekMonk groups always have a mix of travelers and experienced guides accompany all outings.' },
    { q: 'Are there alternatives to camel rides?', a: 'Yes! Jeep safaris and quad bikes are available for those who prefer a different desert experience. Both are available at the Sam Dunes camp.' },
  ],
};

const UDAIPUR_DETAILS: TrekFullDetails = {
  bestTime: 'October to March',
  seatsLeft: 10,
  ageGroup: '8â€“70 years',
  about: `Udaipur â€” the City of Lakes â€” is widely regarded as one of the most romantic and beautiful cities in India, perhaps the world. Built around the shimmering Pichola Lake, with the majestic City Palace rising from its banks and the Aravalli hills forming a dramatic backdrop, Udaipur is a feast for the eyes.

This 5-day journey pairs Udaipur's Lake City charm with the epic warrior history of Chittorgarh â€” home to India's largest fort complex, a site of extraordinary courage, sacrifice, and architectural grandeur spanning 700 years of Rajput history.

From a sunset boat ride on Lake Pichola to the haunting battlements of Chittorgarh Fort, this itinerary delivers the very best of Rajasthan's royal heritage.`,
  includes: [
    { icon: 'meals', label: 'Breakfast Daily' }, { icon: 'camping', label: 'Heritage Hotel' }, { icon: 'guide', label: 'History Guide' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: 'AC Transport' }, { icon: 'tents', label: 'Boat Rides' },
  ],
  itinerary: [
    { day: 1, title: 'Arrive Udaipur â€” Lake City Exploration', description: ['Arrive Udaipur by train or flight', 'Check into heritage hotel near the old city', 'Evening visit to Bagore Ki Haveli â€” cultural show at 7 PM', 'Sunset stroll along the Lake Pichola ghats'], highlights: ['Pichola Lake', 'Bagore Ki Haveli', 'City Palace Views', 'Chandpole Market'], meals: 'Dinner' },
    { day: 2, title: 'City Palace & Lake Pichola Boat Ride', description: ['Morning visit to City Palace â€” the largest palace complex in Rajasthan', 'Explore the crystal gallery, peacock courtyard, and palace museums', 'Afternoon boat ride on Lake Pichola â€” views of Jag Mandir and Jag Niwas (Taj Lake Palace)', 'Sunset from Sajjangarh (Monsoon Palace) on the hilltop'], highlights: ['City Palace Museum', 'Lake Pichola Boat Ride', 'Jag Mandir Island', 'Sajjangarh Palace'], meals: 'Breakfast, Dinner' },
    { day: 3, title: 'Ranakpur Jain Temples', description: ['Drive to Ranakpur (90 km) â€” home to India\'s most magnificent Jain temple', '29 halls and 1,444 uniquely carved marble pillars â€” a masterpiece of Jain architecture', 'Visit the Shiva temple and surrounding hills', 'Return to Udaipur â€” evening at leisure'], highlights: ['Ranakpur Jain Temple', '1444 Carved Pillars', 'Marble Architecture', 'Aravalli Hills'], meals: 'Breakfast, Lunch' },
    { day: 4, title: 'Chittorgarh Fort Day Trip', description: ['Drive to Chittorgarh (115 km)', 'Explore the massive Chittorgarh Fort â€” spread over 700 acres', 'Visit Vijay Stambha (Tower of Victory), Rana Kumbha Palace, Padmini Palace', 'Return to Udaipur by evening'], highlights: ['Chittorgarh Fort', 'Vijay Stambha', 'Padmini Palace', 'Rana Kumbha Palace'], meals: 'Breakfast, Packed Lunch' },
    { day: 5, title: 'Old City Walk & Departure', description: ['Morning walk through Udaipur\'s old city â€” colourful havelis and bazaars', 'Visit Shilpgram craft village', 'Depart for Jaipur or home airport'], highlights: ['Old City Lanes', 'Shilpgram', 'Farewell'], meals: 'Breakfast' },
  ],
  attractions: [
    { name: 'Lake Pichola', image: img(1) }, { name: 'City Palace Udaipur', image: img(2) }, { name: 'Chittorgarh Fort', image: img(3) }, { name: 'Ranakpur Temple', image: img(4) }, { name: 'Jag Mandir Island', image: img(5) }, { name: 'Sajjangarh Palace', image: img(6) },
  ],
  startingCities: [
    { id: 'c1', city: 'Udaipur', price: 10499, duration: '5D/4N', image: img(7) }, { id: 'c2', city: 'Jaipur', price: 11499, duration: '5D/4N', image: img(8) }, { id: 'c3', city: 'Delhi', price: 13499, duration: '6D/5N', image: img(9) }, { id: 'c4', city: 'Mumbai', price: 14499, duration: '6D/5N', image: img(10) },
  ],
  faqs: [
    { q: 'Is Udaipur good for a honeymoon?', a: 'Udaipur is considered one of the most romantic cities in the world! Lake Palace hotels, candlelit dinners by the lake, and boat rides make it perfect for honeymooners.' },
    { q: 'What is special about Chittorgarh Fort?', a: 'Chittorgarh Fort is the largest fort in India and Asia by area. It witnessed three historic sieges (Jauhars) and is a symbol of Rajput pride, courage, and sacrifice.' },
    { q: 'Is the City Palace worth visiting?', a: 'Absolutely! The City Palace is one of the most impressive palaces in India. Allow 3-4 hours to explore its courtyards, museums, and rooftop views over Lake Pichola.' },
    { q: 'What is the best restaurant in Udaipur for a view?', a: 'Ambrai Restaurant and Upre by 1559 AD have unbeatable Lake Pichola and City Palace views. TrekMonk arranges a special dinner at one of these for group bookings.' },
  ],
};

export const trekData: Trek[] = [
  {
    id: 't1',
    name: 'Kedarkantha Trek',
    slug: 'kedarkantha-trek',
    location: 'Uttarakhand',
    region: 'north',
    difficulty: 'moderate',
    duration: 6,
    altitude: 3810,
    season: ['winter', 'spring'],
    tags: ['snow', 'summit', 'forest', 'himalayan', 'winter trek'],
    price: 7999,
    rating: 4.9,
    popularityScore: 95,
    image: img(0),
    details: KEDARKANTHA_DETAILS,
  },
  {
    id: 't2',
    name: 'Kasol & Kheerganga',
    slug: 'kasol-kheerganga',
    location: 'Himachal Pradesh',
    region: 'north',
    difficulty: 'easy',
    duration: 4,
    altitude: 2950,
    season: ['summer', 'spring'],
    tags: ['backpacking', 'hot spring', 'camping', 'forest', 'weekend'],
    price: 5499,
    rating: 4.7,
    popularityScore: 88,
    image: img(1),
    details: KASOL_DETAILS,
  },
  {
    id: 't3',
    name: 'Spiti Valley Circuit',
    slug: 'spiti-valley',
    location: 'Himachal Pradesh',
    region: 'north',
    difficulty: 'hard',
    duration: 9,
    altitude: 4551,
    season: ['summer'],
    tags: ['cold desert', 'adventure', 'offbeat', 'monasteries', 'high altitude'],
    price: 18999,
    rating: 4.8,
    popularityScore: 85,
    image: img(2),
    details: SPITI_DETAILS,
  },
  {
    id: 't4',
    name: 'Kedarnath Yatra',
    slug: 'kedarnath-yatra',
    location: 'Uttarakhand',
    region: 'north',
    difficulty: 'moderate',
    duration: 5,
    altitude: 3583,
    season: ['summer', 'spring'],
    tags: ['spiritual', 'temple', 'himalayan', 'pilgrimage'],
    price: 9499,
    rating: 4.8,
    popularityScore: 90,
    image: img(3),
    details: KEDARNATH_DETAILS,
  },
  {
    id: 't5',
    name: 'Hampta Pass',
    slug: 'hampta-pass',
    location: 'Himachal Pradesh',
    region: 'north',
    difficulty: 'moderate',
    duration: 5,
    altitude: 4270,
    season: ['summer', 'monsoon'],
    tags: ['pass', 'himalayan', 'adventure', 'snow', 'camping'],
    price: 10999,
    rating: 4.7,
    popularityScore: 83,
    image: img(4),
    details: HAMPTA_DETAILS,
  },
  {
    id: 't6',
    name: 'Auli Skiing & Trek',
    slug: 'auli',
    location: 'Uttarakhand',
    region: 'north',
    difficulty: 'easy',
    duration: 4,
    altitude: 2519,
    season: ['winter'],
    tags: ['skiing', 'snow', 'weekend', 'adventure', 'scenic'],
    price: 8999,
    rating: 4.6,
    popularityScore: 80,
    image: img(5),
    details: AULI_DETAILS,
  },
  {
    id: 't7',
    name: 'Living Root Bridges, Meghalaya',
    slug: 'meghalaya-root-bridges',
    location: 'Meghalaya',
    region: 'north-east',
    difficulty: 'moderate',
    duration: 6,
    altitude: 1484,
    season: ['winter', 'spring'],
    tags: ['unique', 'forest', 'waterfall', 'offbeat', 'nature'],
    price: 14999,
    rating: 4.9,
    popularityScore: 87,
    image: img(6),
    details: MEGHALAYA_DETAILS,
  },
  {
    id: 't8',
    name: 'Dawki River & Cherrapunji',
    slug: 'dawki-cherrapunji',
    location: 'Meghalaya',
    region: 'north-east',
    difficulty: 'easy',
    duration: 5,
    altitude: 1484,
    season: ['winter', 'spring'],
    tags: ['river', 'waterfall', 'scenic', 'photography', 'offbeat'],
    price: 11999,
    rating: 4.7,
    popularityScore: 78,
    image: img(7),
    details: DAWKI_DETAILS,
  },
  {
    id: 't9',
    name: 'Tawang Monastery Trek',
    slug: 'tawang',
    location: 'Arunachal Pradesh',
    region: 'north-east',
    difficulty: 'moderate',
    duration: 7,
    altitude: 3048,
    season: ['summer', 'spring'],
    tags: ['spiritual', 'monastery', 'offbeat', 'himalayan', 'culture'],
    price: 16999,
    rating: 4.8,
    popularityScore: 75,
    image: img(8),
    details: TAWANG_DETAILS,
  },
  {
    id: 't10',
    name: 'Kerala Backwaters & Munnar',
    slug: 'kerala-backwaters',
    location: 'Kerala',
    region: 'south',
    difficulty: 'easy',
    duration: 6,
    altitude: 1600,
    season: ['winter', 'spring'],
    tags: ['backwaters', 'houseboat', 'tea garden', 'family', 'scenic'],
    price: 12999,
    rating: 4.8,
    popularityScore: 91,
    image: img(9),
    details: KERALA_DETAILS,
  },
  {
    id: 't11',
    name: 'Coorg & Wayanad',
    slug: 'coorg-wayanad',
    location: 'Karnataka & Kerala',
    region: 'south',
    difficulty: 'easy',
    duration: 5,
    altitude: 930,
    season: ['winter', 'summer'],
    tags: ['forest', 'coffee estate', 'weekend', 'nature', 'scenic'],
    price: 9999,
    rating: 4.6,
    popularityScore: 82,
    image: img(10),
    details: COORG_DETAILS,
  },
  {
    id: 't12',
    name: 'Hampi Heritage Walk',
    slug: 'hampi',
    location: 'Karnataka',
    region: 'south',
    difficulty: 'easy',
    duration: 3,
    altitude: 467,
    season: ['winter', 'spring'],
    tags: ['heritage', 'ruins', 'history', 'backpacking', 'photography'],
    price: 6499,
    rating: 4.7,
    popularityScore: 79,
    image: img(11),
    details: HAMPI_DETAILS,
  },
  {
    id: 't13',
    name: 'Jaisalmer Desert Camp',
    slug: 'jaisalmer-desert',
    location: 'Rajasthan',
    region: 'rajasthan',
    difficulty: 'easy',
    duration: 4,
    altitude: 225,
    season: ['winter'],
    tags: ['desert', 'camping', 'camel safari', 'cultural', 'golden'],
    price: 8499,
    rating: 4.7,
    popularityScore: 86,
    image: img(0),
    details: JAISALMER_DETAILS,
  },
  {
    id: 't14',
    name: 'Udaipur & Chittorgarh',
    slug: 'udaipur-chittorgarh',
    location: 'Rajasthan',
    region: 'rajasthan',
    difficulty: 'easy',
    duration: 5,
    altitude: 598,
    season: ['winter', 'spring'],
    tags: ['palace', 'lake', 'heritage', 'cultural', 'romantic'],
    price: 10499,
    rating: 4.8,
    popularityScore: 84,
    image: img(1),
    details: UDAIPUR_DETAILS,
  },
];

// ─── INCREDIBLE INDIA DESTINATIONS ───────────────────────────────────────────

const LADAKH_DETAILS: TrekFullDetails = {
  bestTime: 'June to September',
  seatsLeft: 10,
  ageGroup: '16–55 years',
  about: `Ladakh — the Land of High Passes — is one of the most extraordinary destinations on the planet. Perched on the Tibetan plateau at altitudes between 3,000 and 5,600 metres, Ladakh is a cold desert of impossible beauty: azure lakes, barren mountains striped in ochre and rust, ancient Buddhist monasteries, and the warmest-hearted people you will ever meet.

This 8-day journey covers the iconic Leh-Manali highway, the world's highest motorable roads, the sacred Pangong Tso and Nubra Valley, and the monasteries of Thiksey, Hemis, and Diskit. The high-altitude landscape is unlike anywhere else in India — or the world.

Ladakh is equally magical in summer (July-August) when wildflowers bloom against the barren rock, and in winter (December-February) when the frozen Zanskar River becomes the legendary Chadar Trek route.`,
  includes: [
    { icon: 'meals', label: 'All Meals' }, { icon: 'camping', label: 'Hotel & Camp' }, { icon: 'guide', label: 'Local Guide' }, { icon: 'firstaid', label: 'First Aid & Oxygen' }, { icon: 'transport', label: '4WD Transport' }, { icon: 'tents', label: 'Inner Line Permit' },
  ],
  itinerary: [
    { day: 1, title: 'Arrive Leh — Rest & Acclimatize', description: ['Fly into Leh Airport (3,524m)', 'Rest is MANDATORY — no exertion on day 1', 'Evening stroll at Leh Market', 'Visit Shanti Stupa at sunset'], highlights: ['Shanti Stupa', 'Leh Market', 'Acclimatization'], meals: 'Dinner' },
    { day: 2, title: 'Leh Local Sightseeing', description: ['Visit Leh Palace — Namgyal dynasty fort-palace', 'Thiksey Monastery — resembles the Potala Palace in Lhasa', 'Shey Palace and Rancho School (3 Idiots school)', 'Hall of Fame war memorial'], highlights: ['Leh Palace', 'Thiksey Monastery', 'Shey Palace', 'Hall of Fame'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 3, title: 'Nubra Valley via Khardung La', description: ['Cross Khardung La Pass (5,359m) — one of the highest motorable roads', 'Descend into the stunning Nubra Valley', 'Visit Diskit Monastery — 32m Maitreya Buddha statue', 'Double-hump Bactrian camel ride at Hunder Sand Dunes'], highlights: ['Khardung La Pass', 'Diskit Monastery', 'Hunder Sand Dunes', 'Bactrian Camel Safari'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 4, title: 'Nubra Valley to Pangong Tso', description: ['Drive to Pangong Tso via Shyok River Valley', 'First glimpse of Pangong Lake — the colour is unreal', 'Colour changes from turquoise to blue to silver throughout the day', 'Overnight camping at Pangong Tso — stargazing'], highlights: ['Pangong Tso Lake', 'Shyok River Valley', 'Colour-Changing Lake', 'Stargazing Camp'], meals: 'Breakfast, Packed Lunch, Dinner' },
    { day: 5, title: 'Pangong Sunrise & Return to Leh', description: ['Wake before sunrise — the colours at dawn are magical', 'Drive back to Leh via Chang La Pass (5,360m)', 'Visit Hemis Monastery — largest and wealthiest in Ladakh', 'Evening in Leh'], highlights: ['Pangong Sunrise', 'Chang La Pass', 'Hemis Monastery'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 6, title: 'Leh to Magnetic Hill & Sangam', description: ['Magnetic Hill — cars appear to roll uphill due to optical illusion', 'Sangam — confluence of Indus and Zanskar rivers', 'Holy Gurudwara Pathar Sahib', 'Afternoon at leisure — explore cafes in Leh'], highlights: ['Magnetic Hill', 'Indus-Zanskar Sangam', 'Gurudwara Pathar Sahib'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 7, title: 'Leh to Manali — The Highway', description: ['Begin the legendary Leh-Manali Highway drive', 'Cross Baralacha La (4,890m)', 'Camp at Sarchu (4,290m) — halfway point on the highway', 'Milky Way camping under a billion stars'], highlights: ['Leh-Manali Highway', 'Baralacha La Pass', 'Sarchu Plains', 'Galaxy Stargazing'], meals: 'Breakfast, Packed Lunch, Dinner' },
    { day: 8, title: 'Sarchu to Manali — Arrival', description: ['Morning drive over Rohtang Pass (3,978m)', 'Arrive Manali by afternoon', 'Celebrate at Old Manali — cafes and reminiscing'], highlights: ['Rohtang Pass', 'Manali Celebration'], meals: 'Breakfast, Lunch' },
  ],
  attractions: [
    { name: 'Pangong Tso', image: img(0) }, { name: 'Khardung La Pass', image: img(1) }, { name: 'Nubra Valley', image: img(2) }, { name: 'Thiksey Monastery', image: img(3) }, { name: 'Hunder Dunes', image: img(4) }, { name: 'Leh Palace', image: img(5) },
  ],
  startingCities: [
    { id: 'c1', city: 'Leh', price: 24999, duration: '8D/7N', image: img(6) }, { id: 'c2', city: 'Delhi', price: 27999, duration: '9D/8N', image: img(7) }, { id: 'c3', city: 'Manali', price: 22999, duration: '8D/7N', image: img(8) },
  ],
  faqs: [
    { q: 'Is altitude sickness a risk in Ladakh?', a: 'Yes. Leh is at 3,524m. Day 1 is mandatory rest. Drink 4L water daily, avoid alcohol, and carry Diamox (consult your doctor). Oxygen cylinders are available at our camps.' },
    { q: 'Is Pangong Tso worth it?', a: 'Absolutely. It is one of the most beautiful lakes in the world — the colour changes from turquoise to blue to silver throughout the day. The overnight camp there is unmissable.' },
    { q: 'What is the best time to visit Ladakh?', a: 'June to September for roads and high-altitude passes. July-August for wildflowers. February for the Chadar (frozen river) Trek.' },
    { q: 'Do I need an Inner Line Permit?', a: 'Yes — for Nubra Valley, Pangong Tso, and other restricted areas. TrekMonk arranges all permits. Foreign nationals need additional Protected Area Permits.' },
    { q: 'Is the Leh-Manali highway safe?', a: 'The road is an adventure in itself — it is rough, high-altitude, and spectacular. Our experienced drivers navigate it frequently. Mechanical backup is on standby.' },
  ],
};

const VALLEY_OF_FLOWERS_DETAILS: TrekFullDetails = {
  bestTime: 'July to September',
  seatsLeft: 12,
  ageGroup: '12–55 years',
  about: `The Valley of Flowers National Park is a UNESCO World Heritage Site and one of the most extraordinarily beautiful places in India. Located in the Chamoli district of Uttarakhand at 3,658 metres, this high-altitude Himalayan valley is carpeted with hundreds of species of alpine wildflowers — a rolling sea of colour set against snow-capped peaks and glaciers.

The trek also extends to Hemkund Sahib, one of the holiest Sikh shrines in the world — a glacial lake at 4,329 metres, surrounded by seven peaks and a revered gurudwara where Guru Gobind Singh is said to have meditated in a previous life.

This is a trek of extraordinary beauty and spiritual power — the flowers bloom for only three months a year, turning the valley into a living impressionist painting.`,
  includes: [
    { icon: 'meals', label: 'All Meals' }, { icon: 'camping', label: 'Camping & Guesthouse' }, { icon: 'guide', label: 'Expert Guide' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: 'Transport' }, { icon: 'tents', label: 'Forest Permits' },
  ],
  itinerary: [
    { day: 1, title: 'Haridwar to Joshimath', description: ['Drive from Haridwar to Joshimath (10 hrs) via Devprayag and Rudraprayag', 'Pass through spectacular Alaknanda gorge', 'Overnight at Joshimath'], highlights: ['Alaknanda River Gorge', 'Joshimath Town'], meals: 'Dinner' },
    { day: 2, title: 'Joshimath to Govindghat — Trek to Ghangaria', description: ['Drive from Joshimath to Govindghat (25 km)', 'Trek 14 km through rhododendron forests alongside the Pushpawati River to Ghangaria', 'Arrive Ghangaria — base camp for both the valley and Hemkund Sahib'], highlights: ['Pushpawati River', 'Rhododendron Forest', 'Ghangaria Village'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 3, title: 'Valley of Flowers Full Day Trek', description: ['Enter the Valley of Flowers National Park', 'A sea of wildflowers — Brahma Kamal, Blue Poppy, Cobra Lily, Primula', 'Walk through the valley for 6 km — every step more beautiful than the last', 'Return to Ghangaria by evening'], highlights: ['Valley of Flowers Entry', 'Brahma Kamal & Blue Poppy', 'Glacier Views', 'Pushpawati Falls'], meals: 'Breakfast, Packed Lunch, Dinner' },
    { day: 4, title: 'Hemkund Sahib Pilgrimage', description: ['Trek 6 km steeply to Hemkund Sahib (4,329m)', 'Visit the Gurudwara at the sacred glacial lake', 'Seven peaks reflected in still waters', 'Return to Ghangaria — descend to Govindghat'], highlights: ['Hemkund Sahib Gurudwara', 'Glacial Lake', 'Seven Peaks', 'Spiritual Darshan'], meals: 'Breakfast, Packed Lunch, Dinner' },
    { day: 5, title: 'Govindghat to Haridwar — Departure', description: ['Drive back to Haridwar', 'Ganga Aarti at Haridwar in the evening', 'Depart for home'], highlights: ['Ganga Aarti', 'Safe Return'], meals: 'Breakfast' },
  ],
  attractions: [
    { name: 'Valley of Flowers', image: img(9) }, { name: 'Hemkund Sahib', image: img(10) }, { name: 'Blue Poppy Fields', image: img(11) }, { name: 'Pushpawati River', image: img(0) }, { name: 'Brahma Kamal', image: img(1) }, { name: 'Glacier Views', image: img(2) },
  ],
  startingCities: [
    { id: 'c1', city: 'Haridwar', price: 11999, duration: '5D/4N', image: img(3) }, { id: 'c2', city: 'Delhi', price: 13499, duration: '6D/5N', image: img(4) }, { id: 'c3', city: 'Dehradun', price: 11499, duration: '5D/4N', image: img(5) },
  ],
  faqs: [
    { q: 'When do the flowers bloom?', a: 'The valley is in full bloom from mid-July to mid-August. The variety is greatest in late July. By September the flowers fade but the trek is still beautiful.' },
    { q: 'Is the Valley of Flowers trek suitable for beginners?', a: 'Yes! The valley trail itself is gradual and wide. Hemkund Sahib involves a steep 6 km climb but is manageable with a slow pace and proper acclimatization.' },
    { q: 'Can I enter without a forest permit?', a: 'No. A mandatory entry fee and permit from the Forest Department is required. TrekMonk handles all permits.' },
    { q: 'What flowers will I see?', a: 'Over 300 species including Brahma Kamal, Himalayan Blue Poppy, Cobra Lily, Anemone, Marsh Marigold, Primula, Bergenia, and Saxifrage — all in bloom simultaneously.' },
  ],
};

const ANDAMAN_DETAILS: TrekFullDetails = {
  bestTime: 'October to May',
  seatsLeft: 16,
  ageGroup: '8–65 years',
  about: `The Andaman Islands are India's tropical paradise — a cluster of 572 islands in the Bay of Bengal, draped in dense rainforest and ringed by some of the most pristine beaches and coral reefs in Asia. The turquoise waters are crystal clear, the beaches are powdery white, and the marine life is breathtaking.

This 6-day journey covers the iconic Havelock Island (Radhanagar Beach — rated one of Asia's best beaches), the historic Cellular Jail in Port Blair, snorkelling in the living coral reefs of North Bay and Elephant Beach, and the magical bioluminescent plankton of Neil Island.

The Andamans feel like another world — untouched, raw, and profoundly beautiful. Half the archipelago is completely off-limits to protect its indigenous tribes, ensuring that what remains is truly wild.`,
  includes: [
    { icon: 'meals', label: 'All Meals' }, { icon: 'camping', label: 'Beach Resort' }, { icon: 'guide', label: 'Local Guide' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: 'Ferry & Transfer' }, { icon: 'tents', label: 'Snorkel Gear' },
  ],
  itinerary: [
    { day: 1, title: 'Arrive Port Blair — Cellular Jail', description: ['Fly to Port Blair (Veer Savarkar Airport)', 'Check into hotel', 'Visit Cellular Jail — the British colonial dark water prison', 'Sound & Light show at Cellular Jail in the evening'], highlights: ['Cellular Jail', 'Sound & Light Show', 'Port Blair Town'], meals: 'Dinner' },
    { day: 2, title: 'North Bay & Ross Island Snorkelling', description: ['Morning boat to North Bay Island — glass-bottom boat ride over living coral reefs', 'Snorkelling with parrotfish, angelfish, and sea turtles', 'Afternoon visit to Ross Island — British Raj ruins reclaimed by deer and tropical forest', 'Return to Port Blair'], highlights: ['North Bay Coral Reef', 'Glass-Bottom Boat', 'Ross Island Ruins', 'Tropical Marine Life'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 3, title: 'Ferry to Havelock Island', description: ['Morning ferry to Havelock Island (Neil Chand Pier)', 'Check into beach resort', 'Afternoon at Radhanagar Beach (Beach No. 7) — TIME Magazine Asia\'s Best Beach 2004', 'Sunset walk on the beach'], highlights: ['Radhanagar Beach', 'Elephanta Bay', 'Emerald Jungle Road'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 4, title: 'Havelock — Elephant Beach Snorkel', description: ['Morning trek to Elephant Beach (30 min jungle trail)', 'World-class snorkelling with technicolor coral gardens', 'Glass-bottom kayaking over the reef', 'Afternoon beach relaxation and sunset'], highlights: ['Elephant Beach Reef', 'Jungle Trail', 'Kayaking', 'Snorkel with Reef Fish'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 5, title: 'Neil Island — Bioluminescence Night', description: ['Day ferry to Neil Island', 'Visit Bharatpur Beach and Laxmanpur Beach', 'Evening at Natural Bridge rock formation', 'Midnight walk on Laxmanpur Beach — bioluminescent plankton glow blue in the waves'], highlights: ['Laxmanpur Beach', 'Natural Bridge', 'Bioluminescent Sea', 'Stargazing'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 6, title: 'Return to Port Blair — Departure', description: ['Morning ferry back to Port Blair', 'Visit Anthropological Museum', 'Depart from Veer Savarkar Airport'], highlights: ['Safe Return', 'Anthropological Museum'], meals: 'Breakfast' },
  ],
  attractions: [
    { name: 'Radhanagar Beach', image: img(6) }, { name: 'Cellular Jail', image: img(7) }, { name: 'Elephant Beach Reef', image: img(8) }, { name: 'Ross Island Ruins', image: img(9) }, { name: 'Bioluminescent Sea', image: img(10) }, { name: 'North Bay Coral', image: img(11) },
  ],
  startingCities: [
    { id: 'c1', city: 'Port Blair', price: 18999, duration: '6D/5N', image: img(0) }, { id: 'c2', city: 'Chennai', price: 21999, duration: '7D/6N', image: img(1) }, { id: 'c3', city: 'Delhi', price: 23999, duration: '7D/6N', image: img(2) }, { id: 'c4', city: 'Mumbai', price: 24999, duration: '7D/6N', image: img(3) },
  ],
  faqs: [
    { q: 'Is Radhanagar Beach really Asia\'s best?', a: 'TIME Magazine rated it Asia\'s Best Beach in 2004. It is a 2 km arc of soft white sand with crystal-clear shallow water and jungle-backed sunset views. It lives up to the hype.' },
    { q: 'How do I get to Andaman?', a: 'Only by flight (no passenger ships operate cost-effectively). Flights from Delhi, Mumbai, Chennai, and Kolkata to Port Blair. TrekMonk books all flights at best rates.' },
    { q: 'Is scuba diving available?', a: 'Yes! Havelock Island has world-class scuba diving. TrekMonk offers PADI-certified discover diving packages as an add-on for non-certified divers.' },
    { q: 'What is the best time to visit?', a: 'October to May. The monsoon (June-September) brings rough seas and most ferry services are suspended. December-February is peak season with best visibility.' },
  ],
};

const SIKKIM_DETAILS: TrekFullDetails = {
  bestTime: 'March to May & October to December',
  seatsLeft: 14,
  ageGroup: '10–60 years',
  about: `Sikkim — India's smallest and most beautiful state — is a Himalayan kingdom of extraordinary diversity. A 45-minute flight from Kolkata transports you to a world of snow-capped peaks, Buddhist monasteries, yak-grazed meadows, rhododendron forests, and the most stunning mountain views in India.

The state sits in the shadow of Kangchenjunga (8,586m) — the world's third-highest mountain — and on a clear day the peak dominates the skyline from Gangtok. The state's capital, Gangtok, is a charming hill city with clean streets, welcoming residents, and spectacular views.

Beyond Gangtok, Sikkim's treasures include the enchanting Gurudongmar Lake (5,430m) — one of the highest lakes in the world — the Tibetan-flavoured Lachung Valley, and the colourful Rumtek and Pemayangtse monasteries.`,
  includes: [
    { icon: 'meals', label: 'All Meals' }, { icon: 'camping', label: 'Hotel & Homestay' }, { icon: 'guide', label: 'Local Guide' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: '4WD Transport' }, { icon: 'tents', label: 'Permits' },
  ],
  itinerary: [
    { day: 1, title: 'Arrive Gangtok — Himalayan Views', description: ['Fly to Bagdogra, drive to Gangtok (4 hrs)', 'Check in and rest', 'Evening walk at MG Marg — Gangtok\'s pedestrian street', 'Views of Kangchenjunga at sunrise (if weather permits)'], highlights: ['MG Marg', 'Gangtok City', 'Kangchenjunga Views'], meals: 'Dinner' },
    { day: 2, title: 'Gangtok Local Sights', description: ['Visit Rumtek Monastery — largest in Sikkim, seat of the Karmapa Lama lineage', 'Enchey Monastery — 200-year-old monastery on a ridge', 'Tsomgo Lake (Chang Lake) — glacial lake at 3,753m', 'Baba Mandir — a shrine to a legendary soldier'], highlights: ['Rumtek Monastery', 'Tsomgo Lake', 'Baba Mandir', 'Nathula Pass View'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 3, title: 'Lachung Valley — North Sikkim', description: ['Drive to Lachung (4 hrs) through waterfalls and mountain scenery', 'Pass Seven Sisters Waterfall', 'Arrive the Tibetan-influenced Lachung village', 'Evening walk in the valley — yaks and prayer flags'], highlights: ['Seven Sisters Waterfalls', 'Lachung Village', 'Tibetan Culture', 'Lachen River'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 4, title: 'Gurudongmar Lake (5,430m)', description: ['Early morning drive to Gurudongmar Lake (5,430m)', 'One of the holiest lakes in Buddhism — sacred to Tibetan Buddhists and Sikhs', 'Crystal clear water, impossible altitude, total silence', 'Return to Lachung'], highlights: ['Gurudongmar Lake — 5,430m', 'Holiest High-Altitude Lake', 'Snow-Peaked Panorama'], meals: 'Breakfast, Packed Lunch, Dinner' },
    { day: 5, title: 'Lachung to Pelling via Gangtok', description: ['Drive back to Gangtok and westward to Pelling', 'En route stop at Pemayangtse Monastery — oldest monastery in Sikkim', 'Evening views of Kangchenjunga from Pelling skyline'], highlights: ['Pemayangtse Monastery', 'Kangchenjunga View from Pelling', 'Western Sikkim'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 6, title: 'Pelling to Bagdogra — Departure', description: ['Morning visit to Khecheopalri Lake — sacred wish-fulfilling lake', 'Drive to Bagdogra Airport', 'Depart for home'], highlights: ['Khecheopalri Lake', 'Safe Departure'], meals: 'Breakfast' },
  ],
  attractions: [
    { name: 'Gurudongmar Lake', image: img(4) }, { name: 'Tsomgo Lake', image: img(5) }, { name: 'Rumtek Monastery', image: img(6) }, { name: 'Lachung Valley', image: img(7) }, { name: 'Kangchenjunga Peak', image: img(8) }, { name: 'Pemayangtse Monastery', image: img(9) },
  ],
  startingCities: [
    { id: 'c1', city: 'Bagdogra', price: 15999, duration: '6D/5N', image: img(10) }, { id: 'c2', city: 'Kolkata', price: 17999, duration: '7D/6N', image: img(11) }, { id: 'c3', city: 'Delhi', price: 19999, duration: '7D/6N', image: img(0) },
  ],
  faqs: [
    { q: 'Do I need permits for Sikkim?', a: 'Yes — most of North Sikkim requires a Protected Area Permit (PAP). Indian nationals can get it within 24 hours. TrekMonk arranges all permits.' },
    { q: 'Is Gurudongmar Lake accessible for everyone?', a: 'The lake is at 5,430m. Acclimatization at Lachung the previous night is essential. Altitude tablets are recommended. Persons with heart or lung conditions should skip this.' },
    { q: 'When is Kangchenjunga view best?', a: 'October-November and March-April give the clearest mountain views. Mornings are always clearest — cloud builds up by noon.' },
    { q: 'Can I visit Nathula Pass?', a: 'Nathula Pass (India-China border at 4,310m) requires a special permit available for Indian nationals only. TrekMonk arranges these for eligible travelers.' },
  ],
};

const VARANASI_DETAILS: TrekFullDetails = {
  bestTime: 'October to March',
  seatsLeft: 20,
  ageGroup: '10–80 years',
  about: `Varanasi — the City of Light — is one of the oldest continuously inhabited cities in the world, and the spiritual heart of Hinduism. Sitting on the banks of the sacred Ganga in Uttar Pradesh, Varanasi has been a place of pilgrimage, learning, and liberation for more than 3,000 years.

The city's famous ghats — 88 stone steps descending to the Ganga — are where the sacred river meets the sacred life: pilgrims bathing at dawn, priests performing the Ganga Aarti at dusk with fire and bells and incense, and the ancient cremation ghats where Hindus believe that dying in Varanasi guarantees moksha (liberation from the cycle of rebirth).

Mark Twain called Varanasi "older than history, older than tradition, older even than legend". To walk its ancient alley-lanes is to step back 3,000 years — and to witness a way of life unchanged for millennia.`,
  includes: [
    { icon: 'meals', label: 'Breakfast Daily' }, { icon: 'camping', label: 'Heritage Hotel' }, { icon: 'guide', label: 'Spiritual Guide' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: 'Transport' }, { icon: 'tents', label: 'Boat Rides' },
  ],
  itinerary: [
    { day: 1, title: 'Arrive Varanasi — Evening Ganga Aarti', description: ['Arrive Varanasi by flight or train', 'Check into heritage ghat-side hotel', 'Evening boat ride on the Ganga to view the Dashashwamedh Ghat Aarti', 'The Aarti is a spectacle of fire, bells, incense, and chanting — 7 PM daily'], highlights: ['Dashashwamedh Ghat Aarti', 'Ganga Boat Ride', 'Ghat at Dusk'], meals: 'Dinner' },
    { day: 2, title: 'Dawn Boat Ride & Old City Lanes', description: ['5 AM boat ride at sunrise — watch pilgrims bathing, the silk of morning light on the Ganga', 'Visit Manikarnika Ghat — the main cremation ghat (photography restricted)', 'Walk through the ancient Vishwanath lanes to the Kashi Vishwanath Temple', 'Afternoon at Sarnath — where Buddha first preached after his enlightenment'], highlights: ['Sunrise on the Ganga', 'Kashi Vishwanath Temple', 'Manikarnika Ghat', 'Sarnath Dhamek Stupa'], meals: 'Breakfast, Dinner' },
    { day: 3, title: 'Silk Weaving, Cuisine & Classical Music', description: ['Visit a traditional silk weaving cooperative — Banarasi silk is world-famous', 'Cooking class — Banarasi chaat, kachori, and sweets', 'Evening classical music and dance program at a Varanasi music school', 'Final boat ride at dusk'], highlights: ['Banarasi Silk Weaving', 'Varanasi Street Food', 'Classical Music Evening', 'Final Ganga Dusk'], meals: 'Breakfast, Dinner' },
  ],
  attractions: [
    { name: 'Ganga Aarti', image: img(1) }, { name: 'Kashi Vishwanath', image: img(2) }, { name: 'Sarnath Stupa', image: img(3) }, { name: 'Dawn Boat Ride', image: img(4) }, { name: 'Old City Lanes', image: img(5) }, { name: 'Banarasi Silk', image: img(6) },
  ],
  startingCities: [
    { id: 'c1', city: 'Varanasi', price: 7999, duration: '3D/2N', image: img(7) }, { id: 'c2', city: 'Delhi', price: 9499, duration: '4D/3N', image: img(8) }, { id: 'c3', city: 'Mumbai', price: 11499, duration: '4D/3N', image: img(9) }, { id: 'c4', city: 'Kolkata', price: 9999, duration: '4D/3N', image: img(10) },
  ],
  faqs: [
    { q: 'Can non-Hindus visit Kashi Vishwanath Temple?', a: 'The main Kashi Vishwanath Temple is restricted to Hindus. However, the recently built Kashi Vishwanath Corridor allows everyone to experience the surroundings and architecture.' },
    { q: 'Is it safe to walk the old lanes at night?', a: 'Yes, Varanasi is generally safe. However, the lanes are narrow and labyrinthine — our guides are essential to navigate and provide context.' },
    { q: 'What is Ganga Aarti?', a: 'The Ganga Aarti is a daily ritual at 7 PM at Dashashwamedh Ghat — 7 priests simultaneously perform a fire ceremony with giant brass lamps, chanting, incense, and conch shells. It is overwhelmingly beautiful.' },
    { q: 'Is photography allowed at the cremation ghats?', a: 'Photography is strictly prohibited at Manikarnika and Harishchandra Ghats (cremation ghats) — this is a sacred, private time for Hindu families. Please respect this.' },
  ],
};

const CORBETT_DETAILS: TrekFullDetails = {
  bestTime: 'November to June',
  seatsLeft: 10,
  ageGroup: '8–65 years',
  about: `Jim Corbett National Park — India's oldest and most celebrated national park — is a vast wilderness in the Kumaon foothills of Uttarakhand. Established in 1936 (as Hailey National Park, India's first national park), Corbett is home to India's largest population of Bengal tigers and named after the legendary hunter-turned-conservationist Jim Corbett.

The park's diverse habitat — dense sal forests, grasslands, riverine belts, and hilly terrain — supports extraordinary wildlife: tigers, leopards, elephants (over 600!), sloth bears, gharials, mugger crocodiles, and over 600 species of birds.

The Ramganga River runs through the park, and its banks are prime wildlife habitat — elephant herds bathe here daily, and tigers have been spotted emerging from the grasslands at dusk. Corbett offers the quintessential Indian jungle safari experience.`,
  includes: [
    { icon: 'meals', label: 'All Meals' }, { icon: 'camping', label: 'Forest Lodge' }, { icon: 'guide', label: 'Naturalist Guide' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: 'Safari Jeep' }, { icon: 'tents', label: 'Park Permits' },
  ],
  itinerary: [
    { day: 1, title: 'Arrive Corbett — Afternoon Safari', description: ['Drive from Delhi or Moradabad to Corbett (5-6 hrs)', 'Check into forest lodge', 'Afternoon jeep safari in Bijrani Zone — prime tiger territory', 'Wild elephant sightings almost guaranteed'], highlights: ['Bijrani Zone Safari', 'Elephant Herd', 'Ramganga River'],  meals: 'Lunch, Dinner' },
    { day: 2, title: 'Dawn & Dusk Safaris — Dhikala Zone', description: ['Pre-dawn entry to Dhikala Zone — the heart of Corbett', 'Morning safari (6 AM - 9 AM) — best wildlife activity window', 'Elephant ride through the grasslands (optional)', 'Evening safari — tigers often emerge at dusk near Dhikala meadow'], highlights: ['Dhikala Meadow', 'Tiger Activity Window', 'Elephant Ride', 'Leopard Spotting'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 3, title: 'Crocodile Boat Ride & Bird Walk', description: ['Morning boat safari on Ramganga Reservoir — gharials and mugger crocodiles', 'Spot Pallas\'s fish eagle, osprey, and the great thick-knee', 'Afternoon birding walk with naturalist — 600+ species call Corbett home', 'Evening bonfire at lodge'], highlights: ['Gharial Boat Safari', 'Ramganga Reservoir', 'Bird Watching', 'Bonfire Night'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 4, title: 'Corbett Museum & Departure', description: ['Morning visit to Jim Corbett Museum at Kaladhungi — his restored home', 'Drive back to Delhi or Kathgodam', 'Carry home memories of the Indian jungle'], highlights: ['Jim Corbett Museum', 'Kaladhungi Village', 'Safe Return'], meals: 'Breakfast' },
  ],
  attractions: [
    { name: 'Tiger Safari Corbett', image: img(11) }, { name: 'Dhikala Grasslands', image: img(0) }, { name: 'Ramganga Reservoir', image: img(1) }, { name: 'Indian Elephant Herd', image: img(2) }, { name: 'Gharial Crocodile', image: img(3) }, { name: 'Corbett Forest', image: img(4) },
  ],
  startingCities: [
    { id: 'c1', city: 'Delhi', price: 12999, duration: '4D/3N', image: img(5) }, { id: 'c2', city: 'Dehradun', price: 11499, duration: '4D/3N', image: img(6) }, { id: 'c3', city: 'Lucknow', price: 12999, duration: '4D/3N', image: img(7) },
  ],
  faqs: [
    { q: 'Is a tiger sighting guaranteed?', a: 'No wildlife encounter is guaranteed. Corbett has over 250 tigers and sightings are frequent — but wild tigers are elusive. Our naturalist guides know the best spots. Average sighting rate: 60-70% of safaris.' },
    { q: 'What zones are best for tiger spotting?', a: 'Dhikala (the largest and richest zone) and Bijrani are the top zones for big cat sightings. Zone entry depends on advance permits — TrekMonk books these early.' },
    { q: 'Can children do jeep safaris?', a: 'Yes! Children aged 6 and above can do jeep safaris. The experience is exciting and educational for children. All vehicles have safety rails.' },
    { q: 'What should I wear on safari?', a: 'Wear earthy, muted colours — khaki, olive, beige, brown. Avoid bright clothing that may startle wildlife. Carry a light jacket for the early morning cold.' },
  ],
};

const RANTHAMBORE_DETAILS: TrekFullDetails = {
  bestTime: 'October to June',
  seatsLeft: 12,
  ageGroup: '8–70 years',
  about: `Ranthambore National Park in Rajasthan is arguably India's most famous tiger reserve — and for good reason. Its tigers are among the most habituated to human presence of any in India, making it the best place in the world to see wild Bengal tigers in the open.

Ranthambore's tigers are legendary — Machali (the Queen of Ranthambore) was the world's most photographed tigress, featured in BBC and National Geographic documentaries. Today, her descendants — T-19, T-84, and others — continue to make headlines.

The park's unique setting — the ancient Ranthambore Fort looming over the jungle, the shimmering lakes of Padam Talao and Malik Talao, and the dramatic rocky terrain — makes Ranthambore unlike any other wildlife reserve in India. History and wilderness intertwine magnificently.`,
  includes: [
    { icon: 'meals', label: 'All Meals' }, { icon: 'camping', label: 'Jungle Lodge' }, { icon: 'guide', label: 'Forest Guide' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: 'Canter & Jeep' }, { icon: 'tents', label: 'Park Permits' },
  ],
  itinerary: [
    { day: 1, title: 'Arrive Ranthambore', description: ['Arrive Sawai Madhopur by train or flight to Jaipur + drive', 'Check into jungle lodge', 'Afternoon canter safari in Zone 5 — lake zone (best for tigers near water)', 'Evening wildlife presentation by naturalist'], highlights: ['Padam Talao Lake', 'Canter Safari', 'Tiger Spotting Zone 5'], meals: 'Lunch, Dinner' },
    { day: 2, title: 'Full Day Safaris — Zones 1-5', description: ['Dawn jeep safari (6 AM) — cold morning, tigers active on roads', 'Visit Ranthambore Fort — 10th century fortified hilltop with wildlife inside!', 'Evening safari at Rajbagh Talao — tigers often drink here at dusk', 'Bonfire and jungle stories at lodge'], highlights: ['Ranthambore Fort', 'Tiger at Rajbagh Lake', 'Sloth Bear Sighting', 'Mugger Crocodile'], meals: 'Breakfast, Lunch, Dinner' },
    { day: 3, title: 'Photography Safari & Departure', description: ['Final morning safari — dedicated photography drive', 'Visit Ranthambore Tiger Task Force Museum', 'Drive to Sawai Madhopur for train/flight', 'Optional: visit Jaipur (2 hrs) before departure'], highlights: ['Photography Safari', 'Tiger Task Force Museum', 'Jaipur Visit Optional'], meals: 'Breakfast' },
  ],
  attractions: [
    { name: 'Bengal Tiger Sighting', image: img(8) }, { name: 'Ranthambore Fort', image: img(9) }, { name: 'Padam Talao Lake', image: img(10) }, { name: 'Leopard on Rock', image: img(11) }, { name: 'Rajbagh Ruins', image: img(0) }, { name: 'Indian Sloth Bear', image: img(1) },
  ],
  startingCities: [
    { id: 'c1', city: 'Jaipur', price: 10999, duration: '3D/2N', image: img(2) }, { id: 'c2', city: 'Delhi', price: 12499, duration: '3D/2N', image: img(3) }, { id: 'c3', city: 'Mumbai', price: 14999, duration: '4D/3N', image: img(4) },
  ],
  faqs: [
    { q: 'Is Ranthambore better than Corbett for tigers?', a: 'Ranthambore tigers are more habituated to safari vehicles — making for longer, closer sightings in the open. Many wildlife photographers prefer Ranthambore for this reason.' },
    { q: 'Which zones are best for tiger sightings?', a: 'Zones 1-5 (the core zone) have the highest tiger density. Zones 1-4 around the lakes (Padam Talao, Rajbagh) are the most productive. We book these zones exclusively.' },
    { q: 'What is the Ranthambore Fort?', a: 'A UNESCO World Heritage-listed 10th century fort that now sits inside the national park — with wildlife (tigers, leopards, monkeys) living around its ancient walls. It is an extraordinary combination of history and wilderness.' },
    { q: 'Jeep vs Canter — which is better?', a: 'Jeeps (6-person open vehicles) offer flexibility and intimate wildlife sightings. Canters (larger open buses) cover fixed routes. TrekMonk books jeeps for a more personal safari experience.' },
  ],
};

const GOA_DETAILS: TrekFullDetails = {
  bestTime: 'October to March',
  seatsLeft: 18,
  ageGroup: '8–70 years',
  about: `Goa — India's smallest state — is its most beloved holiday destination. A former Portuguese colony for 450 years, Goa has a unique soul unlike anywhere else in India: golden beaches, brilliant blue sea, whitewashed baroque churches, old Portuguese colonial mansions, vibrant nightlife, world-class seafood, and the eternally laid-back spirit of the susegad way of life.

This 5-day journey covers both sides of Goa — the tranquil north (Old Goa's UNESCO heritage churches, Panaji's Latin Quarter, Anjuna's flea market), and the quieter south (the serene beaches of Palolem, Agonda, and the Dudhsagar waterfall deep in the Western Ghats).

Whether you come for beach parties, colonial architecture, spice plantation tours, backwater kayaking, or simply to eat the world's best prawn curry rice on a shaded beach, Goa delivers with effortless grace.`,
  includes: [
    { icon: 'meals', label: 'Breakfast Daily' }, { icon: 'camping', label: 'Beach Resort' }, { icon: 'guide', label: 'Local Guide' }, { icon: 'firstaid', label: 'First Aid' }, { icon: 'transport', label: 'AC Transport' }, { icon: 'tents', label: 'Activities' },
  ],
  itinerary: [
    { day: 1, title: 'Arrive Goa — North Beaches', description: ['Arrive Goa (Dabolim Airport or Madgaon Station)', 'Check into beach resort in North Goa', 'Evening at Calangute or Baga Beach', 'Sundowners at a beachfront shack'], highlights: ['Baga Beach', 'Calangute Seafront', 'Beach Shack Dinner'], meals: 'Dinner' },
    { day: 2, title: 'Old Goa Heritage & Panaji Latin Quarter', description: ['Morning visit to Basilica of Bom Jesus — UNESCO Heritage — holds the incorrupt body of St. Francis Xavier', 'Se Cathedral — the largest church in Asia', 'Afternoon walk through Fontainhas (Panaji) — Goa\'s Latin Quarter, Portuguese-era houses in yellow and ochre', 'Evening boat cruise on the Mandovi River'], highlights: ['Basilica of Bom Jesus', 'Se Cathedral', 'Fontainhas Latin Quarter', 'Mandovi River Cruise'], meals: 'Breakfast, Dinner' },
    { day: 3, title: 'Anjuna Flea Market & Spice Farm', description: ['Anjuna Wednesday Flea Market — the iconic Goa market (if Wednesday)', 'Afternoon at a spice plantation — smell, taste, and see cardamom, pepper, vanilla, and turmeric growing', 'Visit Chapora Fort — legendary sunset point, from Dil Chahta Hai'], highlights: ['Anjuna Flea Market', 'Spice Plantation Tour', 'Chapora Fort', 'Vagator Beach'], meals: 'Breakfast, Dinner' },
    { day: 4, title: 'South Goa & Dudhsagar Waterfall', description: ['Morning drive to Dudhsagar Falls — one of India\'s tallest waterfalls, in the heart of the Western Ghats', 'Jeep safari through Mollem National Park to reach the falls', 'Afternoon at South Goa beaches — Palolem or Agonda — far more tranquil than the north'], highlights: ['Dudhsagar Falls', 'Jeep Safari', 'Palolem Beach', 'South Goa Serenity'], meals: 'Breakfast, Packed Lunch, Dinner' },
    { day: 5, title: 'Relaxation & Departure', description: ['Morning beach walk or water sports (option)', 'Visit the Saturday Night Market or Arpora Market (if Saturday)', 'Transfer to airport / station for departure'], highlights: ['Water Sports', 'Night Market', 'Final Beach Sunset'], meals: 'Breakfast' },
  ],
  attractions: [
    { name: 'Palolem Beach', image: img(5) }, { name: 'Basilica of Bom Jesus', image: img(6) }, { name: 'Dudhsagar Falls', image: img(7) }, { name: 'Fontainhas Quarter', image: img(8) }, { name: 'Chapora Fort', image: img(9) }, { name: 'Spice Plantation', image: img(10) },
  ],
  startingCities: [
    { id: 'c1', city: 'Goa (Dabolim)', price: 11999, duration: '5D/4N', image: img(11) }, { id: 'c2', city: 'Mumbai', price: 13499, duration: '5D/4N', image: img(0) }, { id: 'c3', city: 'Delhi', price: 14999, duration: '6D/5N', image: img(1) }, { id: 'c4', city: 'Bangalore', price: 12999, duration: '5D/4N', image: img(2) },
  ],
  faqs: [
    { q: 'Is Goa only for young people?', a: 'Not at all! Goa has something for everyone — heritage, beaches, cuisine, adventure sports, yoga retreats, and luxury resorts. It is equally beloved by honeymoon couples, families, and senior travelers.' },
    { q: 'North Goa vs South Goa — which is better?', a: 'North Goa is livelier with beach parties, restaurants, and markets. South Goa is quieter, cleaner, and more luxurious. TrekMonk covers the best of both in a single trip.' },
    { q: 'What is Goa famous for in terms of food?', a: 'Goa is famous for its seafood — prawn curry rice, fish thali, crab xec xec, and caldin. The beef chilli fry and chicken cafreal (Portuguese-influenced) are also must-tries.' },
    { q: 'When should I avoid Goa?', a: 'June to September is monsoon — beaches are rough, some shacks close. But the Western Ghats turn incredibly green and Dudhsagar Falls is at its most dramatic. Shoulder season (October, March) is great value.' },
  ],
};

// ─── INCREDIBLE INDIA trekData entries (t15–t22) ─────────────────────────────

export const incredibleIndiaData: Trek[] = [
  { id: 't15', name: 'Ladakh — Land of High Passes', slug: 'ladakh', location: 'Jammu & Kashmir', region: 'north', difficulty: 'hard', duration: 8, altitude: 5359, season: ['summer'], tags: ['high altitude', 'monastery', 'desert', 'adventure', 'scenic'], price: 24999, rating: 4.9, popularityScore: 97, image: img(0), details: LADAKH_DETAILS },
  { id: 't16', name: 'Valley of Flowers Trek', slug: 'valley-of-flowers', location: 'Uttarakhand', region: 'north', difficulty: 'moderate', duration: 5, altitude: 3658, season: ['monsoon', 'summer'], tags: ['flowers', 'himalayan', 'spiritual', 'scenic', 'UNESCO'], price: 11999, rating: 4.9, popularityScore: 92, image: img(9), details: VALLEY_OF_FLOWERS_DETAILS },
  { id: 't17', name: 'Andaman Islands', slug: 'andaman-islands', location: 'Andaman & Nicobar', region: 'south', difficulty: 'easy', duration: 6, altitude: 0, season: ['winter', 'spring'], tags: ['beach', 'snorkelling', 'coral', 'tropical', 'island'], price: 18999, rating: 4.8, popularityScore: 90, image: img(6), details: ANDAMAN_DETAILS },
  { id: 't18', name: 'Sikkim & Gangtok', slug: 'sikkim-gangtok', location: 'Sikkim', region: 'north-east', difficulty: 'moderate', duration: 6, altitude: 5430, season: ['spring', 'winter'], tags: ['monastery', 'himalayan', 'scenic', 'spiritual', 'wildlife'], price: 15999, rating: 4.8, popularityScore: 85, image: img(4), details: SIKKIM_DETAILS },
  { id: 't19', name: 'Varanasi Spiritual Tour', slug: 'varanasi', location: 'Uttar Pradesh', region: 'north', difficulty: 'easy', duration: 3, altitude: 80, season: ['winter', 'spring'], tags: ['spiritual', 'heritage', 'cultural', 'ganga', 'temple'], price: 7999, rating: 4.8, popularityScore: 88, image: img(1), details: VARANASI_DETAILS },
  { id: 't20', name: 'Jim Corbett Wildlife Safari', slug: 'jim-corbett', location: 'Uttarakhand', region: 'north', difficulty: 'easy', duration: 4, altitude: 400, season: ['winter', 'spring', 'summer'], tags: ['wildlife', 'tiger', 'safari', 'jungle', 'elephant'], price: 12999, rating: 4.7, popularityScore: 86, image: img(11), details: CORBETT_DETAILS },
  { id: 't21', name: 'Ranthambore Tiger Safari', slug: 'ranthambore', location: 'Rajasthan', region: 'rajasthan', difficulty: 'easy', duration: 3, altitude: 250, season: ['winter', 'spring', 'summer'], tags: ['tiger', 'wildlife', 'safari', 'fort', 'heritage'], price: 10999, rating: 4.8, popularityScore: 89, image: img(8), details: RANTHAMBORE_DETAILS },
  { id: 't22', name: 'Goa — Beach & Heritage', slug: 'goa', location: 'Goa', region: 'south', difficulty: 'easy', duration: 5, altitude: 0, season: ['winter', 'spring'], tags: ['beach', 'heritage', 'cultural', 'food', 'festival'], price: 11999, rating: 4.7, popularityScore: 93, image: img(5), details: GOA_DETAILS },
];

// All 22 destinations combined — use allTreks to get all destinations
export const allTreks: Trek[] = [...trekData, ...incredibleIndiaData];



