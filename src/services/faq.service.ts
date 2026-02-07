import { api } from "@/lib/api";

export type FAQ = {
  _id: string;
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export async function getFaqsAdmin(): Promise<FAQ[]> {
  const { data } = await api.get("/faqs/admin");
  return (data.faqs || []).map((f: any) => ({ ...f, id: f._id }));
}

export async function createFaq(payload: {
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}) {
  const { data } = await api.post("/faqs", payload);
  return data;
}

export async function updateFaq(
  id: string,
  payload: Partial<{
    question: string;
    answer: string;
    order: number;
    isActive: boolean;
  }>,
) {
  const { data } = await api.put(`/faqs/${id}`, payload);
  return data;
}

export async function deleteFaq(id: string) {
  const { data } = await api.delete(`/faqs/${id}`);
  return data;
}
