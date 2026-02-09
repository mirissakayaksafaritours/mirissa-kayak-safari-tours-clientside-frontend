import { api } from "@/lib/api";

export type AdminMeResponse = {
  ok: true;
  admin: {
    name: string;
    email: string;
    role: string;
  };
};

export async function getAdminMe() {
  const { data } = await api.get<AdminMeResponse>("/api/admin/me");
  return data.admin;
}
