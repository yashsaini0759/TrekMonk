import type { TrekFullDetails, Review } from './trekData';

const img = (i: number) => {
  const VALID = ['1506905925346-21bda4d32df4','1586348943529-beaae6c28db9','1470770841072-f978cf4d019e','1564507592333-c60657eea523','1622308644420-b20142dc993c','1477587458883-47145ed94245','1598091383021-15ddea10925d','1602216056096-3b40cc0c9944','1558618666-fcd25c85cd64','1507525428034-b723cf961d3e','1507003211169-0a1dd7228f2d','1533107862482-0e6974b06ec4'];
  return `https://images.unsplash.com/photo-${VALID[i % VALID.length]}?w=600&h=800&fit=crop&q=80&auto=format`;
};

interface TrekMeta {
  name: string;
  location: string;
  region: string;
  difficulty: string;
  duration: number;
  altitude: number;
  price: number;
  tags: string[];
}

// Curated about texts per trek
const ABOUT_MAP: Record<string, string> = {
  manali: `Manali is a stunning Himalayan hill station in Himachal Pradesh. Surrounded by snow-capped peaks, lush green valleys, and the roaring Beas river, it offers adventure and tranquility in equal measure.\n\nFrom paragliding at Solang Valley to exploring old Manali's cafes, there's something for every traveler. The Hadimba Temple and Jogini Waterfall are must-visits.\n\nPerfect for families, couples, and adventure seekers looking for a refreshing mountain escape.`,
  kasol: `Kasol, nestled along the Parvati River in Himachal Pradesh, is a backpacker's paradise known for its hippie culture and stunning natural beauty.\n\nThe village offers a unique blend of Israeli cuisine, riverside camping, and trails leading to hidden waterfalls and hot springs. Tosh and Malana are popular side trips.\n\nIdeal for solo travelers and groups seeking offbeat mountain vibes with a laid-back atmosphere.`,
  kheerganga: `Kheerganga is a rewarding trek through the mystical Parvati Valley in Himachal Pradesh. The trail passes through dense forests, cascading waterfalls, and ends at natural hot springs.\n\nAt 2,960m, the campsite offers panoramic views of snow-covered peaks and star-filled skies. The hot water spring at the summit is a rejuvenating reward.\n\nA perfect weekend getaway for beginners and nature lovers seeking a short but memorable Himalayan trek.`,
  'spiti-valley': `Spiti Valley is a cold desert paradise in Himachal Pradesh, known for its dramatic landscapes, ancient monasteries, and clear starry skies.\n\nThe journey through Kunzum Pass, Chandratal Lake, and Key Monastery feels like entering another world. The barren yet beautiful terrain is unlike anywhere else in India.\n\nBest suited for adventurous souls who love road trips, high-altitude experiences, and Buddhist culture.`,
  kedarnath: `Kedarnath is one of India's most sacred pilgrimage sites, nestled at 3,583m in the Garhwal Himalayas of Uttarakhand.\n\nThe trek to the ancient Shiva temple is both spiritually uplifting and physically rewarding. Surrounded by snow-capped peaks and the Mandakini river, the journey is breathtaking.\n\nSuitable for devotees and trekkers with moderate fitness seeking a blend of spirituality and Himalayan adventure.`,
  badrinath: `Badrinath, situated along the banks of the Alaknanda River in Uttarakhand, is one of the four sacred Char Dham pilgrimage sites.\n\nThe Badrinath Temple, dedicated to Lord Vishnu, is set against the backdrop of the Neelkanth Peak. Nearby Mana Village, India's last village before Tibet, is a cultural gem.\n\nIdeal for spiritual travelers and those seeking the grandeur of the high Himalayas combined with deep cultural heritage.`,
  chopta: `Chopta, often called the "Mini Switzerland of India," is a pristine hill station in Uttarakhand's Garhwal region at 2,680m.\n\nThe Chopta-Tungnath-Chandrashila trek offers stunning views of Himalayan peaks including Nanda Devi and Trishul. Tungnath, the highest Shiva temple in the world, sits along the trail.\n\nPerfect for beginners and weekend trekkers looking for a short yet rewarding Himalayan experience.`,
  auli: `Auli is India's premier skiing destination, set at 2,500m in the Garhwal Himalayas of Uttarakhand with panoramic views of Nanda Devi.\n\nBeyond winter skiing, Auli offers cable car rides, meadow walks, and access to ancient temples. The snow-covered slopes and oak forests create a magical winter wonderland.\n\nIdeal for families and adventure enthusiasts looking for a luxurious yet thrilling mountain getaway.`,
  nainital: `Nainital, the "Lake District of India," is a charming hill station in Uttarakhand centered around the beautiful Naini Lake.\n\nFrom boating on the lake to exploring Naina Devi Temple, Snow View Point, and the bustling Mall Road, there's no shortage of activities. The surrounding Kumaon hills offer peaceful nature walks.\n\nPerfect for families, couples, and anyone seeking a classic Indian hill station experience with all modern comforts.`,
  mussoorie: `Mussoorie, the "Queen of Hills," is a beloved colonial-era hill station perched in Uttarakhand's foothills with stunning Doon Valley views.\n\nKempty Falls, Camel's Back Road, and Gun Hill offer scenic beauty, while the charming Mall Road is perfect for evening strolls. Landour adds old-world literary charm.\n\nIdeal for romantic getaways, family vacations, and anyone looking for a relaxing weekend escape from the city.`,
  'kerala-backwaters': `Kerala's Backwaters are a mesmerizing network of lagoons, canals, and lakes stretching along the Malabar Coast in God's Own Country.\n\nA houseboat cruise through Alleppey offers a unique experience — floating past coconut palms, rice paddies, and serene villages. The sunset views over the water are unforgettable.\n\nPerfect for couples on honeymoon, families, and anyone seeking a peaceful, tropical escape with authentic Kerala cuisine.`,
  munnar: `Munnar is a breathtaking hill station in Kerala, famous for its endless tea plantations, misty hills, and cool climate at 1,600m.\n\nEravikulam National Park houses the endangered Nilgiri Tahr, while Mattupetty Dam and Top Station offer panoramic valley views. The tea museum tells the story of Munnar's colonial-era origins.\n\nIdeal for nature lovers, photographers, and couples seeking a romantic green getaway in South India.`,
  wayanad: `Wayanad is a lush green paradise in Kerala's Western Ghats, known for its wildlife, waterfalls, and spice plantations.\n\nChembra Peak's heart-shaped lake, Edakkal Caves' ancient petroglyphs, and Banasura Sagar Dam are must-visit attractions. The region's coffee and pepper plantations add aromatic charm.\n\nPerfect for adventure seekers, wildlife enthusiasts, and families looking for an immersive nature experience.`,
  coorg: `Coorg (Kodagu) is Karnataka's coffee country — a misty, green hill district known for its plantations, waterfalls, and Kodava culture.\n\nAbbey Falls, Raja's Seat viewpoint, and Namdroling Monastery offer diverse experiences. The aroma of fresh coffee and spices fills the air throughout the region.\n\nIdeal for weekend getaways, couples, and anyone craving a peaceful retreat amidst nature's finest offerings.`,
  chikmagalur: `Chikmagalur, the birthplace of Indian coffee, is nestled in Karnataka's Western Ghats with mist-covered peaks and dense forests.\n\nMullayanagiri (Karnataka's highest peak), Baba Budangiri, and Hebbe Falls offer challenging treks and stunning views. The coffee estate stays provide a unique rustic experience.\n\nBest suited for trekkers, coffee lovers, and those seeking offbeat adventures away from tourist crowds.`,
  ooty: `Ooty, the "Queen of the Nilgiris," is Tamil Nadu's beloved hill station set at 2,240m amidst rolling hills and eucalyptus forests.\n\nThe UNESCO heritage Nilgiri Mountain Railway, Botanical Gardens, and Ooty Lake are iconic attractions. The Doddabetta Peak offers panoramic views of the entire Nilgiri range.\n\nPerfect for families, couples, and anyone seeking nostalgic charm with pleasant weather year-round.`,
  kodaikanal: `Kodaikanal, the "Princess of Hill Stations," is a serene retreat in Tamil Nadu's Palani Hills at 2,133m above sea level.\n\nThe star-shaped Kodai Lake, Coaker's Walk, and Pillar Rocks offer mesmerizing views. Bryant Park's manicured gardens and Silver Cascade Falls add to the romantic atmosphere.\n\nIdeal for couples, honeymooners, and nature enthusiasts seeking misty mornings and peaceful forest walks.`,
  hampi: `Hampi is a UNESCO World Heritage Site in Karnataka — the ruins of the magnificent Vijayanagara Empire spread across a surreal boulder-strewn landscape.\n\nThe Vittala Temple's stone chariot, Virupaksha Temple, and the royal enclosures tell tales of a glorious past. The hippie island across the Tungabhadra river offers a laid-back vibe.\n\nPerfect for history buffs, photographers, and backpackers seeking an otherworldly experience in South India.`,
  gokarna: `Gokarna is a serene coastal town in Karnataka, offering pristine beaches, spiritual temples, and a laid-back atmosphere far from Goa's crowds.\n\nThe beach trek from Paradise Beach to Om Beach is legendary. Mahabaleshwar Temple adds a spiritual touch, while cliff-side sunsets are simply magical.\n\nIdeal for solo travelers, couples, and beach lovers looking for an authentic, peaceful coastal experience.`,
  pondicherry: `Pondicherry (Puducherry) is a unique fusion of French colonial charm and Tamil culture on India's southeastern coast.\n\nThe French Quarter's colorful streets, Auroville's spiritual commune, and Rock Beach's promenade offer diverse experiences. The cuisine blends French and South Indian flavors beautifully.\n\nPerfect for couples, food enthusiasts, and culture seekers looking for a distinctive coastal getaway.`,
  'meghalaya-root-bridges': `Meghalaya's Living Root Bridges are natural wonders created over centuries by the Khasi and Jaintia tribes, using the roots of rubber fig trees.\n\nThe double-decker root bridge at Nongriat is the crown jewel, requiring a trek down 3,500 steps through lush jungle. The crystal-clear pools below are perfect for a refreshing swim.\n\nA must-do for adventure trekkers and nature enthusiasts seeking one of India's most unique and Instagram-worthy experiences.`,
  shillong: `Shillong, the "Scotland of the East," is Meghalaya's charming capital set amidst pine-covered hills, waterfalls, and a vibrant music scene.\n\nWard's Lake, Shillong Peak, and the Don Bosco Museum offer diverse attractions. The city's cafe culture and live music scene make it one of India's coolest hill towns.\n\nIdeal for music lovers, couples, and travelers seeking a blend of nature, culture, and urban coolness.`,
  cherrapunji: `Cherrapunji (Sohra), one of the wettest places on Earth, is a paradise of waterfalls, living root bridges, and dramatic limestone caves.\n\nNohkalikai Falls (India's tallest plunge waterfall), Seven Sisters Falls, and Mawsmai Cave are breathtaking attractions. The monsoon transforms the landscape into a magical green wonderland.\n\nPerfect for monsoon chasers, waterfall lovers, and photographers seeking nature at its most dramatic.`,
  'dawki-river': `Dawki River (Umngot) in Meghalaya is famous for its crystal-clear waters where boats appear to float in mid-air over the transparent riverbed.\n\nBoating on this pristine river near the India-Bangladesh border is a surreal experience. The surrounding Jaintia Hills and local Khasi villages add cultural depth to the visit.\n\nIdeal for photographers, peace seekers, and anyone looking for one of India's most stunning natural wonders.`,
  kaziranga: `Kaziranga National Park in Assam is a UNESCO World Heritage Site and the last stronghold of the one-horned Indian rhinoceros.\n\nElephant and jeep safaris offer close encounters with rhinos, tigers, elephants, and over 480 bird species. The park's landscape of tall grasslands and wetlands is uniquely beautiful.\n\nPerfect for wildlife enthusiasts, families, and photographers seeking an authentic Indian safari experience.`,
  tawang: `Tawang in Arunachal Pradesh is a high-altitude Buddhist town perched at 3,048m, home to India's largest monastery and rich Monpa tribal culture.\n\nThe 400-year-old Tawang Monastery, Sela Pass (4,170m), and Madhuri Lake offer spiritual and scenic grandeur. The region's connection to the Dalai Lama adds historical significance.\n\nIdeal for spiritual travelers, history buffs, and adventurers seeking remote Himalayan beauty off the beaten path.`,
  'ziro-valley': `Ziro Valley in Arunachal Pradesh is a UNESCO World Heritage tentative site, known for its rice fields, pine forests, and the Apatani tribal culture.\n\nThe annual Ziro Festival of Music draws artists and travelers from worldwide. The valley's gentle landscapes and warm tribal hospitality make it incredibly special.\n\nPerfect for music lovers, cultural travelers, and those seeking a peaceful, offbeat destination in India's northeast.`,
  gangtok: `Gangtok, the capital of Sikkim, is a vibrant Himalayan city offering stunning views of Kanchenjunga, Buddhist monasteries, and modern comforts.\n\nTsomgo Lake, Rumtek Monastery, and MG Marg's pedestrian mall are top attractions. The Nathula Pass excursion to the India-China border is an unforgettable experience.\n\nIdeal for families, couples, and anyone seeking a well-rounded Himalayan city experience with culture, food, and views.`,
  pelling: `Pelling is a quiet hill town in West Sikkim offering some of the most spectacular views of the Kanchenjunga range in the entire northeast.\n\nRabdentse Ruins, Pemayangtse Monastery, and the Skywalk offer historical and panoramic experiences. The Singalila Ridge trek nearby is a hidden gem for adventurous souls.\n\nPerfect for peace seekers, monastery explorers, and Himalayan view chasers looking for serenity away from crowds.`,
  'majuli-island': `Majuli Island in Assam is the world's largest river island, set in the mighty Brahmaputra. It's a living museum of Assamese culture and Vaishnavite heritage.\n\nThe island's Satras (monasteries) preserve traditional dance, music, and mask-making. Cycling through its lush green landscapes and interacting with local artisans is pure magic.\n\nIdeal for culture enthusiasts, slow travelers, and anyone seeking an authentic, unhurried experience in India's northeast.`,
  jaipur: `Jaipur, the "Pink City," is Rajasthan's vibrant capital where royal heritage meets bustling bazaars in a colorful whirlwind.\n\nAmber Fort, Hawa Mahal, City Palace, and Jantar Mantar showcase Rajput grandeur. The Old City's markets overflow with textiles, jewelry, and street food.\n\nPerfect for history lovers, shoppers, and families seeking a rich cultural immersion in royal Rajasthan.`,
  udaipur: `Udaipur, the "City of Lakes," is Rajasthan's most romantic destination, set amidst the Aravalli Hills with shimmering lakes and grand palaces.\n\nLake Pichola, City Palace, and Jag Mandir offer regal experiences, while the old town's art galleries and rooftop cafes add bohemian charm. Sunset boat rides are magical.\n\nIdeal for couples, honeymooners, and luxury travelers seeking royal Rajasthani elegance and lakeside romance.`,
  jaisalmer: `Jaisalmer, the "Golden City," rises from the Thar Desert like a sandcastle mirage. Its living fort, camel safaris, and dune camps create an unforgettable desert experience.\n\nThe Jaisalmer Fort, Patwon Ki Haveli, and Sam Sand Dunes sunset safaris are iconic. Sleeping under desert stars at a luxury camp is truly magical.\n\nPerfect for adventure seekers, photographers, and anyone dreaming of an authentic Rajasthani desert experience.`,
  jodhpur: `Jodhpur, the "Blue City," is dominated by the magnificent Mehrangarh Fort, one of India's largest and most impressive fortresses.\n\nThe blue-painted houses of the old city, Umaid Bhawan Palace, and Mandore Gardens tell tales of Marwar's warrior heritage. The city's spicy cuisine is legendary.\n\nIdeal for history enthusiasts, architecture lovers, and travelers seeking the raw, untouched spirit of Rajasthan.`,
  pushkar: `Pushkar is one of the oldest cities in India, centered around the sacred Pushkar Lake and the only Brahma Temple in the world.\n\nThe annual Camel Fair transforms this sleepy town into a vibrant carnival. The ghats, colorful bazaars, and rooftop cafes create a unique spiritual-hippie atmosphere.\n\nPerfect for spiritual seekers, backpackers, and culture lovers looking for an authentic, offbeat Rajasthani experience.`,
  'mount-abu': `Mount Abu is Rajasthan's only hill station, set at 1,220m in the Aravalli Range, offering a cool escape from the desert heat.\n\nThe Dilwara Jain Temples, with their exquisite marble carvings, are among India's finest. Nakki Lake, Guru Shikhar, and the Sunset Point add to the charm.\n\nIdeal for families, temple enthusiasts, and anyone seeking a refreshing hill station experience within Rajasthan.`,
  bikaner: `Bikaner is an underrated desert city in Rajasthan, known for its ornate palaces, delicious snacks, and the unique Karni Mata Rat Temple.\n\nJunagarh Fort (never conquered), Lalgarh Palace, and the old city's intricate havelis showcase remarkable craftsmanship. Bikaner's bhujia and sweets are legendary.\n\nPerfect for heritage lovers, food enthusiasts, and travelers seeking authentic Rajasthan without the tourist crowds.`,
  ranthambore: `Ranthambore National Park in Rajasthan is one of India's best places to spot wild tigers in their natural habitat within ancient fort ruins.\n\nJeep and canter safaris through the park's deciduous forests and lakeshores offer thrilling wildlife encounters. The Ranthambore Fort within the park adds historical grandeur.\n\nIdeal for wildlife photographers, families, and nature enthusiasts seeking a world-class tiger safari experience.`,
  chittorgarh: `Chittorgarh Fort is India's largest fort and a symbol of Rajput valor, sacrifice, and undying spirit across centuries of heroic history.\n\nThe Vijay Stambh, Padmini Palace, and Rana Kumbha Palace within the fort tell epic tales. The fort's sheer scale — spread over 700 acres — is overwhelming.\n\nPerfect for history buffs, architecture lovers, and anyone seeking to experience the most dramatic chapter of Rajput history.`,
  bundi: `Bundi is Rajasthan's hidden gem — a quiet town of stepwells, blue houses, and magnificent murals untouched by mass tourism.\n\nTaragarh Fort, the stunning Rani Ji Ki Baori stepwell, and the Garh Palace's miniature paintings are exceptional. Rudyard Kipling once called Bundi's palace the work of goblins.\n\nIdeal for offbeat travelers, artists, and photographers seeking undiscovered Rajasthani beauty and authentic small-town charm.`,
};

function getSeasonText(tags: string[], region: string): string {
  if (tags.some(t => ['snow','skiing','winter'].includes(t))) return 'October to March';
  if (region === 'south') return 'September to March';
  if (region === 'north-east') return 'October to April';
  if (region === 'rajasthan') return 'October to March';
  return 'March to June, September to November';
}

function getAgeGroup(difficulty: string): string {
  if (difficulty === 'easy') return '8–60 years';
  if (difficulty === 'hard') return '18–50 years';
  return '12–55 years';
}

function getIncludes(_region: string, tags: string[]) {
  const base = [
    { icon: 'meals', label: 'All Meals' },
    { icon: 'guide', label: 'Certified Guide' },
    { icon: 'firstaid', label: 'First Aid Support' },
  ];
  if (tags.some(t => ['trek','snow','mountains','forest'].includes(t))) {
    base.push({ icon: 'camping', label: 'Camping Gear' }, { icon: 'tents', label: 'Trek Equipment' });
  } else {
    base.push({ icon: 'camping', label: 'Hotel Stay' });
  }
  base.push({ icon: 'transport', label: 'Transportation' }, { icon: 'camping', label: 'Permits & Fees' }, { icon: 'firstaid', label: 'Safety Equipment' });
  return base;
}

function getCities(price: number, duration: number, region: string) {
  const d = `${duration}D/${duration - 1}N`;
  if (region === 'south') {
    return [
      { id: 'c1', city: 'Bangalore', price, duration: d, image: img(0) },
      { id: 'c2', city: 'Chennai', price: price + 1500, duration: d, image: img(1) },
      { id: 'c3', city: 'Mumbai', price: price + 3500, duration: `${duration + 1}D/${duration}N`, image: img(2) },
      { id: 'c4', city: 'Delhi', price: price + 4500, duration: `${duration + 1}D/${duration}N`, image: img(3) },
    ];
  }
  if (region === 'north-east') {
    return [
      { id: 'c1', city: 'Guwahati', price, duration: d, image: img(0) },
      { id: 'c2', city: 'Kolkata', price: price + 2000, duration: `${duration + 1}D/${duration}N`, image: img(1) },
      { id: 'c3', city: 'Delhi', price: price + 4000, duration: `${duration + 1}D/${duration}N`, image: img(2) },
      { id: 'c4', city: 'Mumbai', price: price + 5500, duration: `${duration + 2}D/${duration + 1}N`, image: img(3) },
    ];
  }
  if (region === 'rajasthan') {
    return [
      { id: 'c1', city: 'Jaipur', price, duration: d, image: img(0) },
      { id: 'c2', city: 'Delhi', price: price + 1500, duration: d, image: img(1) },
      { id: 'c3', city: 'Mumbai', price: price + 3000, duration: `${duration + 1}D/${duration}N`, image: img(2) },
      { id: 'c4', city: 'Ahmedabad', price: price + 2000, duration: d, image: img(3) },
    ];
  }
  return [
    { id: 'c1', city: 'Dehradun', price, duration: d, image: img(0) },
    { id: 'c2', city: 'Delhi', price: price + 1500, duration: `${duration + 1}D/${duration}N`, image: img(1) },
    { id: 'c3', city: 'Mumbai', price: price + 4500, duration: `${duration + 1}D/${duration}N`, image: img(2) },
    { id: 'c4', city: 'Pune', price: price + 5000, duration: `${duration + 1}D/${duration}N`, image: img(3) },
  ];
}

function getItinerary(name: string, duration: number): { day: number; title: string; description: string[]; highlights: string[]; meals: string }[] {
  const days = [];
  days.push({ day: 1, title: `Arrival & Welcome to ${name}`, description: ['Arrive and meet the team', 'Check-in and orientation briefing', 'Explore nearby surroundings'], highlights: ['Arrival', 'Welcome'], meals: 'Dinner' });
  for (let i = 2; i < duration; i++) {
    days.push({ day: i, title: `Day ${i} — Explore ${name}`, description: ['Guided sightseeing and activities', 'Visit key attractions and landmarks', 'Local cuisine and cultural experience'], highlights: ['Explore', 'Culture'], meals: 'Breakfast, Lunch, Dinner' });
  }
  days.push({ day: duration, title: 'Departure Day', description: ['Morning breakfast and checkout', 'Transfer to departure point', 'Farewell and journey back'], highlights: ['Farewell'], meals: 'Breakfast' });
  return days;
}

function getAttractions(name: string, _tags: string[]) {
  const spots = [name + ' Viewpoint', name + ' Main Site', 'Local Market', 'Scenic Trail', 'Cultural Center', 'Sunset Point'];
  return spots.map((s, i) => ({ name: s, image: img(i) }));
}

function getReviews(name: string): Review[] {
  return [
    { name: 'Ananya Kapoor', city: 'Delhi', rating: 5, content: `${name} exceeded all expectations! The team was professional and the experience was absolutely unforgettable.` },
    { name: 'Rahul Nair', city: 'Mumbai', rating: 5, content: `One of the best trips I have taken. Everything was well-organized and the views were breathtaking.` },
    { name: 'Sneha Reddy', city: 'Bangalore', rating: 5, content: `Amazing experience from start to finish. The guides were knowledgeable and the food was surprisingly delicious.` },
    { name: 'Arjun Das', city: 'Kolkata', rating: 5, content: `Truly a life-changing experience. Would recommend ${name} to anyone looking for adventure and peace.` },
  ];
}

function getFaqs(name: string, difficulty: string) {
  return [
    { q: `Is the ${name} trip suitable for beginners?`, a: difficulty === 'easy' ? 'Absolutely! This is one of the most beginner-friendly experiences we offer.' : difficulty === 'hard' ? 'This trip requires good fitness and some prior experience. We recommend preparing beforehand.' : 'Yes, with moderate fitness levels, beginners can comfortably enjoy this trip.' },
    { q: 'What is the best time to visit?', a: `The ideal season varies, but our team ensures the best experience during the scheduled departure dates.` },
    { q: 'What should I pack?', a: 'We provide a detailed packing list after booking. Essentials include comfortable clothes, sunscreen, and a good camera.' },
    { q: 'Is transportation included?', a: 'Yes, all transfers from the joining city to the destination and back are included in the package.' },
    { q: 'Can I customize the itinerary?', a: 'We offer some flexibility for group bookings. Contact us for custom requests and we will try to accommodate.' },
  ];
}

export function generateDetails(meta: TrekMeta): TrekFullDetails {
  const slug = meta.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return {
    bestTime: getSeasonText(meta.tags, meta.region),
    seatsLeft: Math.floor(Math.random() * 10) + 3,
    ageGroup: getAgeGroup(meta.difficulty),
    about: ABOUT_MAP[slug] || `Discover the magic of ${meta.name} in ${meta.location}. This carefully curated experience offers breathtaking landscapes, local culture, and unforgettable memories.\n\nWhether you are a seasoned traveler or a first-timer, ${meta.name} promises something special for everyone. Our expert guides ensure a safe, comfortable, and enriching journey.\n\nJoin us for an adventure that blends nature, culture, and authentic Indian hospitality.`,
    includes: getIncludes(meta.region, meta.tags),
    startingCities: getCities(meta.price, meta.duration, meta.region),
    itinerary: getItinerary(meta.name, meta.duration),
    attractions: getAttractions(meta.name, meta.tags),
    reviews: getReviews(meta.name),
    faqs: getFaqs(meta.name, meta.difficulty),
  };
}
