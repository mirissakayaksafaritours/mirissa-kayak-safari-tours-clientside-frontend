import { api } from "@/lib/api";

export type TourPackage = {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  duration: string;
  priceLKR: number;
  includes: string[];
  isFeatured: boolean;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
};

const mapTour = (t: any): TourPackage => ({
  id: t._id,
  title: t.title,
  slug: t.slug,
  shortDescription: t.shortDescription ?? "",
  duration: t.duration,
  priceLKR: Number(t.priceLKR ?? 0),
  includes: t.includes ?? [],
  isFeatured: !!t.isFeatured,
  images: t.images ?? [],
  createdAt: t.createdAt,
  updatedAt: t.updatedAt,
});

export const getTourPackages = async (): Promise<TourPackage[]> => {
  const { data } = await api.get("/api/tour-packages");
  return (data.tours ?? []).map(mapTour);
};

export const getFeaturedTours = async () => {
  const tours = await getTourPackages();
  return tours.filter((t) => t.isFeatured).slice(0, 3);
};
