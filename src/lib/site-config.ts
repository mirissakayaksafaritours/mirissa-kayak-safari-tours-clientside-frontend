export const siteConfig = {
  name: "Mirissa Kayak Safari Tours",
  description:
    "Explore calm lagoons and hidden waterways with Mirissa Kayak Safari Tours. Easy, scenic kayak adventures for nature lovers of all levels.",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7936.723776546046!2d80.48120721293247!3d5.944764355428863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae13f0064261fc3%3A0x42ff83db203e95c6!2sMirissa%20Kayak%20Safari%20Tours!5e0!3m2!1sen!2slk!4v1770487681448!5m2!1sen!2slk",
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
  sunrise: { start: "6:00 AM", end: "8:00 AM" },
  morning: { start: "8:30 AM", end: "10:00 AM" },
  afternoon: { start: "2:30 PM", end: "4:00 PM" },
  sunset: { start: "4:30 PM", end: "6:30 PM" },
};

export const weeklySchedule = [
  { day: "Monday", hours: "6:00 AM – 6:30 PM" },
  { day: "Tuesday", hours: "6:00 AM – 6:30 PM" },
  { day: "Wednesday", hours: "6:00 AM – 6:30 PM" },
  { day: "Thursday", hours: "6:00 AM – 6:30 PM" },
  { day: "Friday", hours: "6:00 AM – 6:30 PM" },
  { day: "Saturday", hours: "6:00 AM – 6:30 PM" },
  { day: "Sunday", hours: "6:00 AM – 6:30 PM" },
];

export const garadulagoonAnimals = [
  {
    name: "Indian Flying Fox (Giant Fruit Bat)",
    image: "/images/animals/indian-flying-fox.png",
    description:
      "One of the largest bats in the world, with wingspans up to 1.5–1.7 meters.",
    bestTimeToSee: "5:30 PM – 6:30 PM (around sunset)",
    feedOn: ["Fruits", "Nectar", "Flowers", "Mango", "Banana", "Fig"],
    highlight:
      "Hundreds fly together over Garadu lagoon at dusk — a magical view.",
  },
  {
    name: "Water Monitors (Kabaragoya)",
    image: "/images/animals/water-monitor.png",
    description:
      "Large semi-aquatic lizards, up to 1.5 meters long. Excellent swimmers.",
    temperament: "Shy — swim away if approached.",
    bestTimeToSee: "Morning (sunny riverbanks)",
    highlight:
      "Often seen gliding quietly in the lagoon or warming up on sunny banks.",
  },
  {
    name: "Kingfishers",
    image: "/images/animals/kingfisher.png",
    description:
      "Bright blue, orange, and white birds perched near lagoon waters.",
    behavior:
      "Dive sharply into water to catch small fish. Spook easily — move quietly.",
    bestTimeToSee: "Morning and late afternoon",
  },
  {
    name: "Small Fish & Crabs",
    image: "/images/animals/small-fish-crabs.png",
    description:
      "Tiny silver fish and mangrove crabs active in shallow lagoon waters.",
    behavior:
      "Hide when disturbed, return once water settles. Ideal for nature photography.",
    bestTimeToSee: "Low tide (for crabs)",
  },
  {
    name: "Tree Snakes (Non-venomous)",
    image: "/images/animals/tree-snake.png",
    description:
      "Beautiful green snakes like Green Whip Snake or Vine Snake in mangroves.",
    behavior:
      "Stay motionless while hunting frogs and lizards; excellent camouflage.",
    rarity: "Rarely seen",
  },
  {
    name: "Parrots & Tropical Birds",
    image: "/images/animals/parrots.png",
    species: [
      "Rose-ringed Parakeet",
      "Mynah",
      "Bulbul",
      "Crows",
    ],
    feedOn: ["Fruits", "Seeds", "Insects"],
    bestTimeToSee: "Early morning or late afternoon",
    tip: "Bring binoculars for colorful canopy sightings.",
  },
];