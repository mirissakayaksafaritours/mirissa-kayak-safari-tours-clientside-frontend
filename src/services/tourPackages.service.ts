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
  createdAt?: string;
  updatedAt?: string;
};

export type TourPackagePayload = {
  title: string;
  slug: string;
  shortDescription?: string;
  duration: string;
  priceLKR: number;
  includes?: string[];
  isFeatured?: boolean;
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
  createdAt: t.createdAt,
  updatedAt: t.updatedAt,
});

export async function getTourPackagesAdmin(): Promise<TourPackage[]> {
  const { data } = await api.get("/tour-packages/admin/all");
  return (data.tours ?? []).map(mapTour);
}

export async function createTourPackage(
  payload: TourPackagePayload,
): Promise<TourPackage> {
  const { data } = await api.post("/tour-packages/admin", payload);
  return mapTour(data.tour);
}

export async function updateTourPackage(
  id: string,
  payload: Partial<TourPackagePayload>,
): Promise<TourPackage> {
  const { data } = await api.put(`/tour-packages/admin/${id}`, payload);
  return mapTour(data.tour);
}

export async function deleteTourPackage(id: string): Promise<void> {
  await api.delete(`/tour-packages/admin/${id}`);
}
