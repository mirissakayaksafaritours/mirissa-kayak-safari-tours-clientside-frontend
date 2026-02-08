"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";
import {
  FormSection,
  FormField,
  FormGrid,
  FormActions,
} from "@/components/admin/form-layout";
import { useToast } from "@/components/admin/toast-provider";
import {
  getSiteSettings,
  SiteSettings,
  updateSiteSettings,
} from "@/services/settings.service";
import { Loader } from "@/components/ui/loader";

export default function SettingsPage() {
  const { showToast } = useToast();
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings().then(setSettings);
  }, []);

  if (!settings) {
    return <Loader />;
  }

  const handleChange = (field: keyof SiteSettings | string, value: string) => {
    setSettings((prev) => {
      if (!prev) return prev;

      if (field.startsWith("socialLinks.")) {
        const socialField = field.split(
          ".",
        )[1] as keyof SiteSettings["socialLinks"];
        return {
          ...prev,
          socialLinks: {
            ...(prev.socialLinks ?? {}),
            [socialField]: value,
          },
        };
      }

      return {
        ...prev,
        [field as keyof SiteSettings]: value,
      };
    });
  };

  const handleSave = async () => {
    if (!settings) return;

    const payload = {
      phoneNumber: settings.phoneNumber,
      whatsappNumber: settings.whatsappNumber,
      email: settings.email,
      address: settings.address,
      googleMapsLink: settings.googleMapsLink,
      socialLinks: settings.socialLinks ?? {},
    };

    try {
      const updated = await updateSiteSettings(payload);
      setSettings(updated);
      showToast("Settings saved successfully", "success");
    } catch (e: any) {
      showToast(e?.response?.data?.message || "Save failed", "error");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Site Settings"
        description="Manage your website's primary contact information and social links."
      />

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormSection>
            <FormGrid columns={2}>
              <FormField label="Phone Number" htmlFor="phoneNumber" required>
                <Input
                  id="phoneNumber"
                  value={settings.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  placeholder="+94 77 123 4567"
                  className="bg-input border-border"
                />
              </FormField>

              <FormField
                label="WhatsApp Number"
                htmlFor="whatsappNumber"
                required
              >
                <Input
                  id="whatsappNumber"
                  value={settings.whatsappNumber}
                  onChange={(e) =>
                    handleChange("whatsappNumber", e.target.value)
                  }
                  placeholder="+94 77 123 4567"
                  className="bg-input border-border"
                />
              </FormField>

              <FormField label="Email Address" htmlFor="email" required>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="info@example.com"
                  className="bg-input border-border"
                />
              </FormField>

              <FormField label="Google Maps Link" htmlFor="googleMapsLink">
                <Input
                  id="googleMapsLink"
                  value={settings.googleMapsLink}
                  onChange={(e) =>
                    handleChange("googleMapsLink", e.target.value)
                  }
                  placeholder="https://maps.google.com/?q=..."
                  className="bg-input border-border"
                />
              </FormField>
            </FormGrid>

            <FormField label="Address" htmlFor="address" required>
              <Input
                id="address"
                value={settings.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="123 Beach Road, Colombo, Sri Lanka"
                className="bg-input border-border"
              />
            </FormField>
          </FormSection>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Social Media Links</CardTitle>
        </CardHeader>
        <CardContent>
          <FormSection>
            <FormGrid columns={3}>
              <FormField label="Facebook" htmlFor="facebook">
                <Input
                  id="facebook"
                  value={settings.socialLinks.facebook || ""}
                  onChange={(e) =>
                    handleChange("socialLinks.facebook", e.target.value)
                  }
                  placeholder="https://facebook.com/yourpage"
                  className="bg-input border-border"
                />
              </FormField>

              <FormField label="Instagram" htmlFor="instagram">
                <Input
                  id="instagram"
                  value={settings.socialLinks.instagram || ""}
                  onChange={(e) =>
                    handleChange("socialLinks.instagram", e.target.value)
                  }
                  placeholder="https://instagram.com/yourpage"
                  className="bg-input border-border"
                />
              </FormField>

              <FormField label="TikTok" htmlFor="tiktok">
                <Input
                  id="tiktok"
                  value={settings.socialLinks.tiktok || ""}
                  onChange={(e) =>
                    handleChange("socialLinks.tiktok", e.target.value)
                  }
                  placeholder="https://tiktok.com/@yourpage"
                  className="bg-input border-border"
                />
              </FormField>
            </FormGrid>
          </FormSection>
        </CardContent>
      </Card>

      <FormActions>
        <Button
          onClick={handleSave}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Save Changes
        </Button>
      </FormActions>
    </div>
  );
}
