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
    { name: "Contact", href: "/contact" },
    { name: "Reviews", href: "/reviews" },
  ],
};

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
