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
  image?: string;
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
  image?: string;
  isFeatured?: boolean;
};

const normaliseImage = (raw: unknown): string => {
  if (typeof raw === "string") return raw;
  if (Array.isArray(raw) && raw.length > 0) return raw[0];
  return "";
};

const mapTour = (t: any): TourPackage => ({
  id: t._id,
  title: t.title,
  slug: t.slug,
  shortDescription: t.shortDescription ?? "",
  duration: t.duration,
  priceLKR: Number(t.priceLKR ?? 0),
  includes: Array.isArray(t.includes) ? t.includes : [],
  isFeatured: !!t.isFeatured,
  image: normaliseImage(t.image),
  createdAt: t.createdAt,
  updatedAt: t.updatedAt,
});

export async function getTourPackagesAdmin(): Promise<TourPackage[]> {
  const { data } = await api.get("/api/tour-packages/admin/all");
  return (data.tours ?? []).map(mapTour);
}

export async function presignTourImageUpload(payload: {
  fileName: string;
  contentType: string;
}): Promise<{ uploadUrl: string; key: string; publicUrl: string }> {
  const { data } = await api.post(
    "/api/tour-packages/admin/upload-url",
    payload,
  );
  return data;
}

export async function createTourPackage(
  payload: TourPackagePayload,
): Promise<TourPackage> {
  const { data } = await api.post("/api/tour-packages/admin", payload);
  return mapTour(data.tour);
}

export async function updateTourPackage(
  id: string,
  payload: Partial<TourPackagePayload>,
): Promise<TourPackage> {
  const { data } = await api.put(`/api/tour-packages/admin/${id}`, payload);
  return mapTour(data.tour);
}

export async function deleteTourPackage(id: string): Promise<void> {
  await api.delete(`/api/tour-packages/admin/${id}`);
}