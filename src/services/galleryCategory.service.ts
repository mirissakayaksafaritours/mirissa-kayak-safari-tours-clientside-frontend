import { api } from "@/lib/api";

export type GalleryCategory = {
  id: string;
  name: string;
  slug: string;
  order: number;
};

export type CreateGalleryCategoryPayload = {
  name: string;
  slug: string;
  order: number;
};

export type UpdateGalleryCategoryPayload = {
  name: string;
  slug: string;
  order: number;
};

const mapCategory = (c: any): GalleryCategory => ({
  id: c._id,
  name: c.name,
  slug: c.slug,
  order: c.order,
});

export async function getGalleryCategories(): Promise<GalleryCategory[]> {
  const { data } = await api.get("/gallery-categories/admin");
  return (data.categories ?? []).map(mapCategory);
}

export async function createGalleryCategory(
  payload: CreateGalleryCategoryPayload,
): Promise<GalleryCategory> {
  const { data } = await api.post("/gallery-categories", payload);
  return mapCategory(data.category);
}

export async function updateGalleryCategory(
  id: string,
  payload: UpdateGalleryCategoryPayload,
): Promise<GalleryCategory> {
  const { data } = await api.put(`/gallery-categories/${id}`, payload);
  return mapCategory(data.category);
}

export async function deleteGalleryCategory(id: string): Promise<{ ok: true }> {
  const { data } = await api.delete(`/gallery-categories/${id}`);
  return data;
}
