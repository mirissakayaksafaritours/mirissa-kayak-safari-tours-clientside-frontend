import { api } from "@/lib/api";

export type GalleryImage = {
  id: string;
  imageUrl: string;
  title?: string;
  caption?: string;
  categorySlug: string;
  categoryName: string;
};

const mapImage = (i: any): GalleryImage => ({
  id: i._id,
  imageUrl: i.imageUrl,
  title: i.title || undefined,
  caption: i.caption || undefined,
  categorySlug: i.categoryId?.slug,
  categoryName: i.categoryId?.name,
});

export async function getGalleryImages(categoryId?: string) {
  const { data } = await api.get("/api/gallery-images", {
    params: categoryId ? { categoryId } : undefined,
  });
  return (data.images ?? []).map(mapImage);
}
