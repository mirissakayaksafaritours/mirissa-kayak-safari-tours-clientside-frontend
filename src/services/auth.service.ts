import { api } from "../lib/api";

type LoginPayload = { email: string; password: string };
type LoginResponse = {
  ok: true;
  token: string;
  admin: { id: string; email: string; name: string; role: string };
};

export async function loginAdmin(payload: LoginPayload) {
  const { data } = await api.post<LoginResponse>("/admin/login", payload);
  return data;
}

export async function logoutAdmin() {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_me");
}
