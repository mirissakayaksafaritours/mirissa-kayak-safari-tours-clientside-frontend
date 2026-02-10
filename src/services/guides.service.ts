import { api } from "@/lib/api";

export type Guide = {
  id: string;
  name: string;
  role: string;
  languages: string[];
  yearsExperience: number;
  profilePhoto: string;
};

const mapGuide = (g: any): Guide => ({
  id: g.id ?? g._id,
  name: g.name,
  role: g.role,
  languages: Array.isArray(g.languages) ? g.languages : [],
  yearsExperience: Number(g.yearsExperience ?? 0),
  profilePhoto: g.profilePhoto ?? "",
});

export async function getGuides(): Promise<Guide[]> {
  const { data } = await api.get("/api/guides");
  const list = data.guides ?? data ?? [];
  return list.map(mapGuide);
}
