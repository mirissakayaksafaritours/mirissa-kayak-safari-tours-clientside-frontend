import { api } from "@/lib/api";

export type DashboardStats = {
  totalTours: number;
  totalGalleryImages: number;
  totalReviews: number;
  faqCount: number;
  totalGuides: number;
  totalCategories: number;
};

export type DashboardActivity = {
  action: string;
  item: string;
  time: string;
};

const mapStats = (d: any): DashboardStats => ({
  totalTours: Number(d.totalTours ?? 0),
  totalGalleryImages: Number(d.totalGalleryImages ?? 0),
  totalReviews: Number(d.totalReviews ?? 0),
  faqCount: Number(d.faqCount ?? 0),
  totalGuides: Number(d.totalGuides ?? 0),
  totalCategories: Number(d.totalCategories ?? 0),
});

export async function getDashboardStats(): Promise<DashboardStats> {
  const { data } = await api.get("/dashboard/stats");
  return mapStats(data.stats ?? data);
}

export async function getDashboardActivity(): Promise<DashboardActivity[]> {
  const { data } = await api.get("/dashboard/activity");
  return data.activity ?? [];
}
