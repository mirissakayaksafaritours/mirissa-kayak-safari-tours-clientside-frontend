import type {
  SiteSettings,
  TourPackage,
  FAQ,
  WeeklySchedule,
  ScheduleSettings,
  Review,
  GalleryCategory,
  GalleryImage,
  Guide,
  DashboardStats,
} from './types'

// Generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 11)

// ==================== MOCK DATA ====================

// Site Settings
let siteSettings: SiteSettings = {
  id: '1',
  phoneNumber: '+94 77 123 4567',
  whatsappNumber: '+94 77 123 4567',
  email: 'info@toursite.com',
  address: '123 Beach Road, Colombo, Sri Lanka',
  googleMapsLink: 'https://maps.google.com/?q=colombo',
  socialLinks: {
    facebook: 'https://facebook.com/toursite',
    instagram: 'https://instagram.com/toursite',
    tiktok: '',
  },
}

// Tour Packages
let tourPackages: TourPackage[] = [
  {
    id: '1',
    title: 'Sunset Beach Tour',
    slug: 'sunset-beach-tour',
    shortDescription: 'Experience the most beautiful sunset views along the coast.',
    duration: '2 hours',
    priceLKR: 5000,
    priceUSD: 15,
    includes: ['Guide', 'Refreshments', 'Transport'],
    maxPeople: 10,
    images: ['/placeholder.svg?height=300&width=400'],
    isFeatured: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Jungle Safari Adventure',
    slug: 'jungle-safari-adventure',
    shortDescription: 'Explore the wild side of Sri Lanka with our expert guides.',
    duration: '4 hours',
    priceLKR: 12000,
    priceUSD: 40,
    includes: ['Safari Jeep', 'Guide', 'Lunch', 'Water'],
    maxPeople: 6,
    images: ['/placeholder.svg?height=300&width=400'],
    isFeatured: true,
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16',
  },
  {
    id: '3',
    title: 'City Heritage Walk',
    slug: 'city-heritage-walk',
    shortDescription: 'Discover the rich history and culture of the ancient city.',
    duration: '3 hours',
    priceLKR: 3500,
    priceUSD: 12,
    includes: ['Guide', 'Entry Tickets', 'Map'],
    maxPeople: 15,
    images: ['/placeholder.svg?height=300&width=400'],
    isFeatured: false,
    createdAt: '2024-01-17',
    updatedAt: '2024-01-17',
  },
]

// FAQs
let faqs: FAQ[] = [
  {
    id: '1',
    question: 'What should I bring for the tour?',
    answer: 'We recommend bringing comfortable shoes, sunscreen, a hat, and a camera.',
    order: 1,
    active: true,
  },
  {
    id: '2',
    question: 'Are tours available in multiple languages?',
    answer: 'Yes, our guides speak English, German, French, and Sinhala.',
    order: 2,
    active: true,
  },
  {
    id: '3',
    question: 'Can I cancel my booking?',
    answer: 'Free cancellation up to 24 hours before the tour start time.',
    order: 3,
    active: true,
  },
]

// Schedule
let scheduleSettings: ScheduleSettings = {
  globalNote: 'Hours may change due to weather conditions or public holidays.',
  schedule: [
    { id: '1', dayOfWeek: 'Monday', openTime: '08:00', closeTime: '18:00', closed: false },
    { id: '2', dayOfWeek: 'Tuesday', openTime: '08:00', closeTime: '18:00', closed: false },
    { id: '3', dayOfWeek: 'Wednesday', openTime: '08:00', closeTime: '18:00', closed: false },
    { id: '4', dayOfWeek: 'Thursday', openTime: '08:00', closeTime: '18:00', closed: false },
    { id: '5', dayOfWeek: 'Friday', openTime: '08:00', closeTime: '18:00', closed: false },
    { id: '6', dayOfWeek: 'Saturday', openTime: '09:00', closeTime: '17:00', closed: false },
    { id: '7', dayOfWeek: 'Sunday', openTime: '09:00', closeTime: '17:00', closed: false },
  ],
}

// Reviews
let reviews: Review[] = [
  {
    id: '1',
    name: 'John Smith',
    country: 'United Kingdom',
    stars: 5,
    content: 'Amazing experience! The guides were knowledgeable and friendly.',
    date: '2024-01-10',
    featured: true,
  },
  {
    id: '2',
    name: 'Maria Garcia',
    country: 'Spain',
    stars: 4,
    content: 'Beautiful tour, well organized. Would recommend to everyone.',
    date: '2024-01-08',
    featured: true,
  },
  {
    id: '3',
    name: 'Hans Mueller',
    country: 'Germany',
    stars: 5,
    content: 'Best tour experience in Sri Lanka. Professional service.',
    date: '2024-01-05',
    featured: false,
  },
]

// Gallery Categories
let galleryCategories: GalleryCategory[] = [
  { id: '1', name: 'Beach Tours', slug: 'beach-tours', order: 1 },
  { id: '2', name: 'Safari Adventures', slug: 'safari-adventures', order: 2 },
  { id: '3', name: 'Cultural Sites', slug: 'cultural-sites', order: 3 },
]

// Gallery Images
let galleryImages: GalleryImage[] = [
  { id: '1', title: 'Sunset View', categoryId: '1', image: '/placeholder.svg?height=300&width=400', caption: 'Beautiful sunset at the beach', order: 1 },
  { id: '2', title: 'Palm Trees', categoryId: '1', image: '/placeholder.svg?height=300&width=400', caption: 'Tropical paradise', order: 2 },
  { id: '3', title: 'Elephant Safari', categoryId: '2', image: '/placeholder.svg?height=300&width=400', caption: 'Wild elephants in their habitat', order: 1 },
  { id: '4', title: 'Ancient Temple', categoryId: '3', image: '/placeholder.svg?height=300&width=400', caption: 'Historic temple ruins', order: 1 },
]

// Guides
let guides: Guide[] = [
  {
    id: '1',
    name: 'Kasun Perera',
    role: 'Lead Guide',
    bio: 'Kasun has been leading tours for over 10 years and knows every corner of Sri Lanka.',
    languages: ['English', 'Sinhala', 'German'],
    yearsExperience: 10,
    profilePhoto: '/placeholder.svg?height=200&width=200',
    contact: '+94 77 111 2222',
  },
  {
    id: '2',
    name: 'Amara Silva',
    role: 'Wildlife Specialist',
    bio: 'Amara specializes in wildlife tours and has a deep passion for conservation.',
    languages: ['English', 'Sinhala', 'French'],
    yearsExperience: 7,
    profilePhoto: '/placeholder.svg?height=200&width=200',
    contact: '+94 77 333 4444',
  },
]

// ==================== CRUD FUNCTIONS ====================

// Site Settings
export const getSiteSettings = (): SiteSettings => ({ ...siteSettings })

export const updateSiteSettings = (data: Partial<SiteSettings>): SiteSettings => {
  siteSettings = { ...siteSettings, ...data }
  return { ...siteSettings }
}

// Tour Packages
export const getTourPackages = (): TourPackage[] => [...tourPackages]

export const getTourPackageById = (id: string): TourPackage | undefined =>
  tourPackages.find((t) => t.id === id)

export const createTourPackage = (data: Omit<TourPackage, 'id' | 'createdAt' | 'updatedAt'>): TourPackage => {
  const newTour: TourPackage = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
  }
  tourPackages = [...tourPackages, newTour]
  return newTour
}

export const updateTourPackage = (id: string, data: Partial<TourPackage>): TourPackage | undefined => {
  const index = tourPackages.findIndex((t) => t.id === id)
  if (index === -1) return undefined
  tourPackages[index] = {
    ...tourPackages[index],
    ...data,
    updatedAt: new Date().toISOString().split('T')[0],
  }
  return { ...tourPackages[index] }
}

export const deleteTourPackage = (id: string): boolean => {
  const length = tourPackages.length
  tourPackages = tourPackages.filter((t) => t.id !== id)
  return tourPackages.length < length
}

// FAQs
export const getFAQs = (): FAQ[] => [...faqs].sort((a, b) => a.order - b.order)

export const getFAQById = (id: string): FAQ | undefined => faqs.find((f) => f.id === id)

export const createFAQ = (data: Omit<FAQ, 'id'>): FAQ => {
  const newFAQ: FAQ = { ...data, id: generateId() }
  faqs = [...faqs, newFAQ]
  return newFAQ
}

export const updateFAQ = (id: string, data: Partial<FAQ>): FAQ | undefined => {
  const index = faqs.findIndex((f) => f.id === id)
  if (index === -1) return undefined
  faqs[index] = { ...faqs[index], ...data }
  return { ...faqs[index] }
}

export const deleteFAQ = (id: string): boolean => {
  const length = faqs.length
  faqs = faqs.filter((f) => f.id !== id)
  return faqs.length < length
}

// Schedule
export const getScheduleSettings = (): ScheduleSettings => ({
  ...scheduleSettings,
  schedule: [...scheduleSettings.schedule],
})

export const updateScheduleSettings = (data: Partial<ScheduleSettings>): ScheduleSettings => {
  scheduleSettings = { ...scheduleSettings, ...data }
  return getScheduleSettings()
}

export const updateWeeklySchedule = (id: string, data: Partial<WeeklySchedule>): WeeklySchedule | undefined => {
  const index = scheduleSettings.schedule.findIndex((s) => s.id === id)
  if (index === -1) return undefined
  scheduleSettings.schedule[index] = { ...scheduleSettings.schedule[index], ...data }
  return { ...scheduleSettings.schedule[index] }
}

// Reviews
export const getReviews = (): Review[] => [...reviews]

export const getReviewById = (id: string): Review | undefined => reviews.find((r) => r.id === id)

export const createReview = (data: Omit<Review, 'id'>): Review => {
  const newReview: Review = { ...data, id: generateId() }
  reviews = [...reviews, newReview]
  return newReview
}

export const updateReview = (id: string, data: Partial<Review>): Review | undefined => {
  const index = reviews.findIndex((r) => r.id === id)
  if (index === -1) return undefined
  reviews[index] = { ...reviews[index], ...data }
  return { ...reviews[index] }
}

export const deleteReview = (id: string): boolean => {
  const length = reviews.length
  reviews = reviews.filter((r) => r.id !== id)
  return reviews.length < length
}

// Gallery Categories
export const getGalleryCategories = (): GalleryCategory[] =>
  [...galleryCategories].sort((a, b) => a.order - b.order)

export const getGalleryCategoryById = (id: string): GalleryCategory | undefined =>
  galleryCategories.find((c) => c.id === id)

export const createGalleryCategory = (data: Omit<GalleryCategory, 'id'>): GalleryCategory => {
  const newCategory: GalleryCategory = { ...data, id: generateId() }
  galleryCategories = [...galleryCategories, newCategory]
  return newCategory
}

export const updateGalleryCategory = (id: string, data: Partial<GalleryCategory>): GalleryCategory | undefined => {
  const index = galleryCategories.findIndex((c) => c.id === id)
  if (index === -1) return undefined
  galleryCategories[index] = { ...galleryCategories[index], ...data }
  return { ...galleryCategories[index] }
}

export const deleteGalleryCategory = (id: string): boolean => {
  const length = galleryCategories.length
  galleryCategories = galleryCategories.filter((c) => c.id !== id)
  // Also delete images in this category
  galleryImages = galleryImages.filter((img) => img.categoryId !== id)
  return galleryCategories.length < length
}

// Gallery Images
export const getGalleryImages = (): GalleryImage[] => [...galleryImages].sort((a, b) => a.order - b.order)

export const getGalleryImageById = (id: string): GalleryImage | undefined =>
  galleryImages.find((img) => img.id === id)

export const getGalleryImagesByCategory = (categoryId: string): GalleryImage[] =>
  galleryImages.filter((img) => img.categoryId === categoryId).sort((a, b) => a.order - b.order)

export const createGalleryImage = (data: Omit<GalleryImage, 'id'>): GalleryImage => {
  const newImage: GalleryImage = { ...data, id: generateId() }
  galleryImages = [...galleryImages, newImage]
  return newImage
}

export const updateGalleryImage = (id: string, data: Partial<GalleryImage>): GalleryImage | undefined => {
  const index = galleryImages.findIndex((img) => img.id === id)
  if (index === -1) return undefined
  galleryImages[index] = { ...galleryImages[index], ...data }
  return { ...galleryImages[index] }
}

export const deleteGalleryImage = (id: string): boolean => {
  const length = galleryImages.length
  galleryImages = galleryImages.filter((img) => img.id !== id)
  return galleryImages.length < length
}

// Guides
export const getGuides = (): Guide[] => [...guides]

export const getGuideById = (id: string): Guide | undefined => guides.find((g) => g.id === id)

export const createGuide = (data: Omit<Guide, 'id'>): Guide => {
  const newGuide: Guide = { ...data, id: generateId() }
  guides = [...guides, newGuide]
  return newGuide
}

export const updateGuide = (id: string, data: Partial<Guide>): Guide | undefined => {
  const index = guides.findIndex((g) => g.id === id)
  if (index === -1) return undefined
  guides[index] = { ...guides[index], ...data }
  return { ...guides[index] }
}

export const deleteGuide = (id: string): boolean => {
  const length = guides.length
  guides = guides.filter((g) => g.id !== id)
  return guides.length < length
}

// Dashboard Stats
export const getDashboardStats = (): DashboardStats => ({
  totalTours: tourPackages.length,
  totalGalleryImages: galleryImages.length,
  totalReviews: reviews.length,
  faqCount: faqs.length,
  totalGuides: guides.length,
  totalCategories: galleryCategories.length,
})
