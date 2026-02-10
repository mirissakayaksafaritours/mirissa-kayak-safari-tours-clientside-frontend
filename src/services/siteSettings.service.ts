import { api } from "../lib/api";

export type SiteSettings = {
  phoneNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  googleMapsLink: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    tiktok: string;
  };
};

type Res = { ok: boolean; settings: SiteSettings | null };

export async function getSiteSettings() {
  const { data } = await api.get<Res>("/api/site-settings");
  return data.settings;
}
