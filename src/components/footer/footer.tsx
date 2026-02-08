"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig, operatingHours } from "@/lib/site-config";
import { useSiteSettings } from "@/context/site-settings-context";
import { Facebook, Instagram, Music2 } from "lucide-react";

export function Footer() {
  const { settings, loading } = useSiteSettings();

  const phone = settings?.phoneNumber || "";
  const email = settings?.email || "";
  const address = settings?.address || "";
  const facebook = settings?.socialLinks.facebook || "";
  const instagram = settings?.socialLinks.instagram || "";
  const tiktok = settings?.socialLinks.tiktok || "";

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Mirissa Kayak Safari</h3>
            <p className="text-background/70 text-sm leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="flex items-center gap-4 pt-2">
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}

              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}

              {tiktok && (
                <a
                  href={tiktok}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  <Music2 className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-1">
              <ul className="space-y-2">
                {siteConfig.navigation.slice(0, 4).map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {siteConfig.navigation.slice(4).map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                {loading || !phone ? (
                  <span className="flex items-center gap-2 text-sm text-background/70">
                    <Phone className="h-4 w-4" />
                    Phone
                  </span>
                ) : (
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {phone}
                  </a>
                )}
              </li>
              <li>
                {loading || !email ? (
                  <span className="flex items-center gap-2 text-sm text-background/70">
                    <Mail className="h-4 w-4" />
                    Email
                  </span>
                ) : (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {email}
                  </a>
                )}
              </li>
              <li className="flex items-start gap-2 text-sm text-background/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                {loading || !address ? "Address" : address}
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Operating Hours
            </h4>

            <ul className="space-y-2 text-sm text-background/70">
              <li>
                Daily: {operatingHours.dailyTours.start} –{" "}
                {operatingHours.dailyTours.end}
              </li>
              <li>Sunrise Tours: {operatingHours.sunriseTours.start}</li>
              <li>Sunset Tours: {operatingHours.sunsetTours.start}</li>
            </ul>

            <p className="text-xs text-background/50">
              Tours available year-round. Best conditions{" "}
              {operatingHours.bestSeason.from} – {operatingHours.bestSeason.to}.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-background/50 md:flex-row">
            <div className="flex flex-col items-center text-center">
              <p>
                &copy; {new Date().getFullYear()} Mirissa Kayak Safari Tours.
                All rights reserved.
              </p>
              <span className="text-xs text-background/50">
                Powered by{" "}
                <a
                  href="https://github.com/dinukaprab"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  dinukaprab&lt;/&gt;
                </a>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy-policy"
                className="text-xs text-background/50 hover:text-background transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-xs text-background/50 hover:text-background transition-colors"
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
