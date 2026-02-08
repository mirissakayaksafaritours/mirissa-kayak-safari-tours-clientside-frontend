import { api } from "@/lib/api";

export interface Guide {
  id: string;
  name: string;
  role: string;
  languages: string[];
  yearsExperience: number;
  profilePhoto: string;
}

export type CreateGuidePayload = {
  name: string;
  role: string;
  languages: string[];
  yearsExperience: number;
  profilePhoto: string;
};

export type UpdateGuidePayload = CreateGuidePayload;

const mapGuide = (g: any): Guide => ({
  id: g.id ?? g._id,
  name: g.name,
  role: g.role,
  languages: Array.isArray(g.languages) ? g.languages : [],
  yearsExperience: Number(g.yearsExperience ?? 0),
  profilePhoto: g.profilePhoto ?? "",
});

export async function getGuidesAdmin(): Promise<Guide[]> {
  const { data } = await api.get("/guides/admin");
  const list = data.guides ?? data ?? [];
  return list.map(mapGuide);
}

export async function createGuide(payload: CreateGuidePayload): Promise<Guide> {
  const { data } = await api.post("/guides", payload);
  return mapGuide(data.guide ?? data);
}

export async function updateGuide(
  id: string,
  payload: UpdateGuidePayload,
): Promise<Guide> {
  const { data } = await api.put(`/guides/${id}`, payload);
  return mapGuide(data.guide ?? data);
}

export async function deleteGuide(id: string): Promise<{ ok: true }> {
  const { data } = await api.delete(`/guides/${id}`);
  return data;
}
