import { api } from "@/lib/api";

export type FAQ = {
  _id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export const getFaqs = async (): Promise<FAQ[]> => {
  const res = await api.get("/faqs");
  return res.data.faqs;
};
