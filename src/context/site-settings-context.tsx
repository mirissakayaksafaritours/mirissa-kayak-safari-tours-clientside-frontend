"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getSiteSettings,
  type SiteSettings,
} from "@/services/siteSettings.service";

type Ctx = {
  settings: SiteSettings | null;
  loading: boolean;
};

const SiteSettingsContext = createContext<Ctx>({
  settings: null,
  loading: true,
});

export function SiteSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSiteSettings()
      .then(setSettings)
      .finally(() => setLoading(false));
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
