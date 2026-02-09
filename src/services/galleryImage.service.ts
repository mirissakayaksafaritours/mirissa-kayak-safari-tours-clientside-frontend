import { api } from "@/lib/api";

export type GalleryImage = {
  id: string;
  title?: string;
  categoryId: string;
  imageUrl: string;
  s3Key: string;
  caption?: string;
  order: number;
};

export type CreateGalleryImagePayload = {
  title?: string;
  categoryId: string;
  imageUrl: string;
  s3Key: string;
  caption?: string;
  order: number;
};

export type UpdateGalleryImagePayload = {
  title?: string;
  categoryId?: string;
  caption?: string;
  order?: number;
};

const mapImage = (img: any): GalleryImage => ({
  id: img._id,
  title: img.title || undefined,
  categoryId: String(img.categoryId),
  imageUrl: img.imageUrl,
  s3Key: img.s3Key,
  caption: img.caption || undefined,
  order: img.order,
});

export async function getGalleryImagesAdmin(): Promise<GalleryImage[]> {
  const { data } = await api.get("/api/gallery-images/admin");
  return (data.images ?? []).map(mapImage);
}

export async function presignGalleryImageUpload(payload: {
  fileName: string;
  contentType: string;
}): Promise<{ uploadUrl: string; key: string; publicUrl: string }> {
  const { data } = await api.post("/api/gallery-images/presign", payload);
  return data;
}

export async function createGalleryImage(
  payload: CreateGalleryImagePayload,
): Promise<GalleryImage> {
  const { data } = await api.post("/api/gallery-images", payload);
  return mapImage(data.image);
}

export async function updateGalleryImage(
  id: string,
  payload: UpdateGalleryImagePayload,
): Promise<GalleryImage> {
  const { data } = await api.put(`/api/gallery-images/${id}`, payload);
  return mapImage(data.image);
}

export async function deleteGalleryImage(id: string): Promise<{ ok: true }> {
  const { data } = await api.delete(`/api/gallery-images/${id}`);
  return data;
}
