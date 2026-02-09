import { api } from "@/lib/api";

export type SiteSettings = {
  id: string;
  key: string;
  phoneNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  googleMapsLink: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
  };
  updatedAt: string;
};

export type UpdateSiteSettingsPayload = {
  phoneNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  googleMapsLink: string;
  socialLinks: SiteSettings["socialLinks"];
};

const mapSettings = (s: any): SiteSettings => ({
  id: s._id,
  key: s.key,
  phoneNumber: s.phoneNumber,
  whatsappNumber: s.whatsappNumber,
  email: s.email,
  address: s.address,
  googleMapsLink: s.googleMapsLink,
  socialLinks: s.socialLinks ?? {},
  updatedAt: s.updatedAt,
});

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data } = await api.get("/api/site-settings/admin");
  return mapSettings(data.settings);
}

export async function updateSiteSettings(
  payload: UpdateSiteSettingsPayload,
): Promise<SiteSettings> {
  const { data } = await api.put("/api/site-settings", payload);
  return mapSettings(data.settings);
}
