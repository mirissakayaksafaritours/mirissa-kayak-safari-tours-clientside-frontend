import { api } from "@/lib/api";

export type Reviews = {
  id: string;
  name: string;
  country: string;
  rating: number;
  text: string;
  date: string;
  featured: boolean;
};

function mapReview(r: any): Reviews {
  return {
    id: r._id ?? r.id,
    name: r.name,
    country: r.country || "N/A",
    rating: Number(r.stars ?? 0),
    text: r.content ?? "",
    date: r.date || r.createdAt || new Date().toISOString(),
    featured: !!r.featured,
  };
}

export async function getReviews(limit = 200): Promise<Reviews[]> {
  const { data } = await api.get(`/reviews?limit=${limit}`);

  const items = Array.isArray(data) ? data : data?.reviews || [];
  return items.map(mapReview);
}

export async function getTopReviews(limit = 3): Promise<Reviews[]> {
  const { data } = await api.get(`/reviews?limit=200`);
  const items = Array.isArray(data) ? data : data?.reviews || [];

  return items
    .map(mapReview)
    .filter((r: Reviews) => r.rating === 5)
    .sort(
      (a: Reviews, b: Reviews) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    )

    .slice(0, limit);
}
