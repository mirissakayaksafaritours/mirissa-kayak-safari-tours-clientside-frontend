export const siteConfig = {
  name: "Mirissa Kayak Safari Tours",
  description:
    "Experience the beauty of Sri Lanka's southern coast with our expert-guided kayak tours through mangroves and ocean waters.",
  phone: "+94 77 123 4567",
  email: "info@mirissakayak.com",
  whatsapp: "94771234567",
  address: "Mirissa Beach, Matara District, Sri Lanka",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15898.132132132!2d80.4524!3d5.9481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae139c5c6b4f3c1%3A0x7e8e8e8e8e8e8e8e!2sMirissa%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1234567890",
  social: {
    facebook: "https://facebook.com/mirissakayak",
    instagram: "https://instagram.com/mirissakayak",
    tikTok: "https://tiktok.com/@mirissakayak",
  },
  navigation: [
    { name: "Home", href: "/" },
    { name: "Tours", href: "/tours" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
  ],
};

export const operatingHours = {
  dailyTours: { start: "5:30 AM", end: "6:30 PM" },
  sunriseTours: { start: "5:30 AM", end: "7:00 AM" },
  sunsetTours: { start: "4:30 PM", end: "6:30 PM" },
  bestSeason: { from: "November", to: "April" },
};

export const guides = [
  {
    name: "Kasun",
    role: "Head Guide",
    years: "10+ years",
    image: "/images/about/guide-1.png",
  },
  {
    name: "Priya",
    role: "Senior Guide",
    years: "8 years",
    image: "/images/about/guide-2.png",
  },
  {
    name: "Sampath",
    role: "Guide & Photographer",
    years: "5 years",
    image: "/images/about/guide-3.png",
  },
];

export const tours = [
  {
    id: "mangrove-explorer",
    name: "Mangrove Explorer",
    duration: "2 hours",
    price: "$35",
    description:
      "Paddle through serene mangrove forests and discover exotic bird species, monitor lizards, and local wildlife in their natural habitat.",
    highlights: [
      "Bird watching",
      "Wildlife spotting",
      "Calm waters",
      "Photo opportunities",
    ],
  },
  {
    id: "sunrise-paddle",
    name: "Sunrise Paddle",
    duration: "1.5 hours",
    price: "$30",
    description:
      "Start your day with a magical sunrise kayaking experience. Watch the sky transform as you glide across calm morning waters.",
    highlights: [
      "Stunning sunrise",
      "Peaceful atmosphere",
      "Light breakfast included",
      "Perfect for beginners",
    ],
  },
  {
    id: "ocean-adventure",
    name: "Ocean Adventure",
    duration: "3 hours",
    price: "$50",
    description:
      "Experience the thrill of ocean kayaking along Mirissa's beautiful coastline. Spot dolphins, sea turtles, and explore hidden coves.",
    highlights: [
      "Dolphin spotting",
      "Sea turtle encounters",
      "Hidden beaches",
      "Snorkeling stop",
    ],
  },
  {
    id: "sunset-cruise",
    name: "Sunset Cruise",
    duration: "2 hours",
    price: "$40",
    description:
      "End your day in paradise with our popular sunset tour. Paddle along the coast as the sun paints the sky in brilliant colors.",
    highlights: [
      "Golden hour views",
      "Refreshments included",
      "Romantic experience",
      "Expert guides",
    ],
  },
  {
    id: "full-day-expedition",
    name: "Full Day Expedition",
    duration: "6 hours",
    price: "$85",
    description:
      "The ultimate kayaking adventure combining mangroves, ocean, and coastal exploration. Includes lunch and multiple stops.",
    highlights: [
      "Complete experience",
      "Lunch included",
      "Multiple ecosystems",
      "Small groups only",
    ],
  },
  {
    id: "private-tour",
    name: "Private Tour",
    duration: "Custom",
    price: "From $75",
    description:
      "Design your perfect kayaking experience with our customizable private tours. Ideal for couples, families, or small groups.",
    highlights: [
      "Personalized itinerary",
      "Flexible timing",
      "Private guide",
      "Special occasions",
    ],
  },
];

export const galleryImages = [
  {
    id: 1,
    src: "/images/gallery/istockphoto-2253279340-612x612.png",
    alt: "Kayaking through mangroves",
    category: "mangroves",
  },
  {
    id: 2,
    src: "/images/gallery/photo-1657946857561-f42916b66712.png",
    alt: "Sunset over Mirissa beach",
    category: "sunset",
  },
  {
    id: 3,
    src: "/images/gallery/photo-1543946207-39bd91e70ca7.png",
    alt: "Dolphin spotting from kayak",
    category: "wildlife",
  },
  {
    id: 4,
    src: "/images/gallery/photo-1707236606614-fbee3070f156.png",
    alt: "Group kayaking adventure",
    category: "tours",
  },
  {
    id: 5,
    src: "/images/gallery/photo-1545063914-a1a6ec821c88.png",
    alt: "Sea turtle encounter",
    category: "wildlife",
  },
  {
    id: 6,
    src: "/images/gallery/photo-1552055569-af8d19430d55.png",
    alt: "Sunrise paddle session",
    category: "sunrise",
  },
  {
    id: 7,
    src: "/images/gallery/photo-1654561773591-57b9413c45c0.png",
    alt: "Coastal exploration",
    category: "tours",
  },
  {
    id: 8,
    src: "/images/gallery/istockphoto-2253500222-612x612.png",
    alt: "Mangrove wildlife",
    category: "mangroves",
  },
  {
    id: 9,
    src: "/images/gallery/photo-1534353739409-c61daeb03f61.png",
    alt: "Beach landing spot",
    category: "tours",
  },
  {
    id: 10,
    src: "/images/gallery/istockphoto-825319778-612x612.png",
    alt: "Golden hour kayaking",
    category: "sunset",
  },
  {
    id: 11,
    src: "/images/gallery/photo-1456926631375-92c8ce872def.png",
    alt: "Bird watching",
    category: "wildlife",
  },
  {
    id: 12,
    src: "/images/gallery/istockphoto-1181382649-612x612.png",
    alt: "Crystal clear waters",
    category: "tours",
  },
];

export const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    country: "Australia",
    rating: 5,
    text: "Absolutely incredible experience! The guides were knowledgeable and made us feel completely safe. Saw dolphins up close and the mangrove ecosystem was fascinating. We learned so much about local wildlife. Highly recommend for anyone visiting Sri Lanka!",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "James T.",
    location: "United Kingdom",
    country: "United Kingdom",
    rating: 5,
    text: "Best activity we did in Sri Lanka. The sunrise tour was magical and the mangroves were stunning. The guides were patient with beginners and the whole experience was well-organized. Worth every penny!",
    date: "2024-01-10",
  },
  {
    id: 3,
    name: "Emma L.",
    country: "Germany",
    rating: 5,
    text: "Professional, friendly, and such beautiful scenery. They provided all equipment and great instruction. The sunset views were unforgettable. Will definitely return on our next trip to Sri Lanka!",
    date: "2024-01-08",
  },
  {
    id: 4,
    name: "Michael R.",
    country: "Canada",
    rating: 4,
    text: "Really great experience overall. The guides knew the area well and spotting wildlife was amazing. Only minor issue was the boats could have been slightly more comfortable, but nothing major.",
    date: "2024-01-05",
  },
  {
    id: 5,
    name: "Sophia P.",
    country: "Italy",
    rating: 5,
    text: "One of the best tours we've done anywhere in the world. The staff was incredibly helpful and made us feel welcome. Beautiful sunset over the ocean. Absolutely perfect!",
    date: "2024-01-02",
  },
  {
    id: 6,
    name: "David K.",
    country: "United States",
    rating: 4,
    text: "Had a wonderful time kayaking through the mangroves. Saw lots of birds and fish. The guide was knowledgeable. Would have appreciated more information about specific species, but overall excellent.",
    date: "2023-12-28",
  },
  {
    id: 7,
    name: "Lisa V.",
    country: "Netherlands",
    rating: 5,
    text: "Perfect for families! Our kids had an amazing time. The guides were patient and made sure everyone felt safe. Great value for money and unforgettable memories!",
    date: "2023-12-25",
  },
  {
    id: 8,
    name: "Marco G.",
    country: "Spain",
    rating: 3,
    text: "Good experience but we didn't see as much wildlife as expected. The guides were friendly though. Depends on timing and luck I suppose. Still a nice paddling experience.",
    date: "2023-12-20",
  },
  {
    id: 9,
    name: "Jennifer W.",
    country: "United States",
    rating: 5,
    text: "Absolutely stunning views and excellent service. The guides went above and beyond to make our honeymoon special. Will recommend to all our friends!",
    date: "2023-12-18",
  },
  {
    id: 10,
    name: "Robert H.",
    country: "United Kingdom",
    rating: 4,
    text: "Very good tour. Professional guides and beautiful scenery. The only thing is it gets quite busy during peak season, but the team handles it well.",
    date: "2023-12-15",
  },
  {
    id: 11,
    name: "Anna S.",
    country: "France",
    rating: 5,
    text: "Magnifique! The experience was beyond expectations. Peaceful waters, expert guides, and such incredible views. Would definitely do it again!",
    date: "2023-12-12",
  },
  {
    id: 12,
    name: "Chris B.",
    country: "Australia",
    rating: 4,
    text: "Great afternoon tour. Good guides, nice equipment, and good value. The beach we stopped at was beautiful. Only reason not 5 stars is we had hoped for more dolphin sightings.",
    date: "2023-12-10",
  },
];

export const faqs = [
  {
    question: "Is kayaking safe for beginners?",
    answer:
      "Absolutely! Our tours are designed to be beginner-friendly. All participants receive a comprehensive safety briefing, proper paddling techniques, and are accompanied by experienced guides throughout the journey. We provide high-quality life jackets and stable, easy-to-handle kayaks.",
  },
  {
    question: "Do I need prior experience?",
    answer:
      "No prior kayaking experience is required. Our guides will teach you everything you need to know before setting off. We start with calm waters and basic techniques, allowing you to build confidence at your own pace.",
  },
  {
    question: "What should I bring with me?",
    answer:
      "We recommend bringing sunscreen, a hat, sunglasses with a strap, a waterproof bag for your phone and valuables, comfortable clothing that can get wet, and water shoes or sandals with straps. We provide all kayaking equipment, life jackets, and drinking water.",
  },
  {
    question: "Are children allowed?",
    answer:
      "Yes, children are welcome on most of our tours. We recommend a minimum age of 6 years for mangrove tours and 10 years for ocean adventures. Children under 16 must be accompanied by an adult and will be paired in a tandem kayak with their guardian.",
  },
  {
    question: "What happens if the weather is bad?",
    answer:
      "Safety is our top priority. If weather conditions are unfavorable, we will contact you to reschedule your tour at no additional cost. If you prefer, we can offer a full refund. Our guides monitor weather conditions daily and make decisions based on guest safety.",
  },
];
