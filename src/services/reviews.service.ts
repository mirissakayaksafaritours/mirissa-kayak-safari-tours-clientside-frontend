import { api } from "@/lib/api";

export interface Review {
  id: string;
  name: string;
  country?: string;
  stars: 1 | 2 | 3 | 4 | 5;
  content: string;
  date?: string;
  featured: boolean;
}

function mapReview(r: any): Review {
  return { ...r, id: r._id ?? r.id };
}

export async function getReviewsAdmin(): Promise<Review[]> {
  const { data } = await api.get("/api/reviews/admin");
  const items = Array.isArray(data) ? data : data?.reviews || [];
  return items.map(mapReview);
}

export async function createReview(payload: {
  name: string;
  country?: string;
  stars: 1 | 2 | 3 | 4 | 5;
  content: string;
  date?: string;
  featured: boolean;
}) {
  const { data } = await api.post("/api/reviews/admin", payload);
  return data;
}

export async function updateReview(
  id: string,
  payload: Partial<{
    name: string;
    country?: string;
    stars: 1 | 2 | 3 | 4 | 5;
    content: string;
    date?: string;
    featured: boolean;
  }>,
) {
  const { data } = await api.put(`/api/reviews/admin/${id}`, payload);
  return data;
}

export async function deleteReview(id: string) {
  const { data } = await api.delete(`/api/reviews/admin/${id}`);
  return data;
}
