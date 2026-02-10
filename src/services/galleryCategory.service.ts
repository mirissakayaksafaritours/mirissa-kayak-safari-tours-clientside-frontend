import { api } from "@/lib/api";

export type GalleryCategory = {
  id: string;
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
  const { data } = await api.get("/api/gallery-categories");
  return (data.categories ?? []).map(mapCategory);
}
