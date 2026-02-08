"use client";

import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/context/site-settings-context";

export function AboutCTAWhatsApp() {
  const { settings, loading } = useSiteSettings();
  const wa = (settings?.whatsappNumber || "").replace(/[^0-9]/g, "");

  return (
    <Button size="lg" variant="secondary" asChild disabled={loading || !wa}>
      {wa ? (
        <a
          href={`https://wa.me/${wa}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book on WhatsApp
        </a>
      ) : (
        <span>Book on WhatsApp</span>
      )}
    </Button>
  );
}
