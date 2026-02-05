// Site Settings
export interface SiteSettings {
  id: string
  phoneNumber: string
  whatsappNumber: string
  email: string
  address: string
  googleMapsLink: string
  socialLinks: {
    facebook?: string
    instagram?: string
    tiktok?: string
  }
}

// Tour Package
export interface TourPackage {
  id: string
  title: string
  slug: string
  shortDescription: string
  duration: string
  priceLKR: number
  priceUSD?: number
  includes: string[]
  maxPeople: number
  images: string[]
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

// FAQ
export interface FAQ {
  id: string
  question: string
  answer: string
  order: number
  active: boolean
}

// Weekly Schedule
export interface WeeklySchedule {
  id: string
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
  openTime: string
  closeTime: string
  closed: boolean
  note?: string
}

export interface ScheduleSettings {
  globalNote: string
  schedule: WeeklySchedule[]
}

// Review
export interface Review {
  id: string
  name: string
  country?: string
  stars: 1 | 2 | 3 | 4 | 5
  content: string
  date?: string
  featured: boolean
}

// Gallery Category
export interface GalleryCategory {
  id: string
  name: string
  slug: string
  order: number
}

// Gallery Image
export interface GalleryImage {
  id: string
  title?: string
  categoryId: string
  image: string
  caption?: string
  order: number
}

// Guide
export interface Guide {
  id: string
  name: string
  role: string
  bio: string
  languages: string[]
  yearsExperience: number
  profilePhoto: string
  contact?: string
}

// Dashboard Stats
export interface DashboardStats {
  totalTours: number
  totalGalleryImages: number
  totalReviews: number
  faqCount: number
  totalGuides: number
  totalCategories: number
}
