"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig, operatingHours } from "@/lib/site-config";
import { useSiteSettings } from "@/context/site-settings-context";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContactPage() {
  const { settings, loading } = useSiteSettings();
  const [mapLoaded, setMapLoaded] = useState(false);

  const waNumber = (settings?.whatsappNumber || "").replace(/[^0-9]/g, "");
  const phone = settings?.phoneNumber || "";
  const email = settings?.email || "";
  const address = settings?.address || "";

  const mapEmbed = siteConfig.mapEmbed;

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-16 px-4 bg-muted">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We&apos;re here to help. Reach out to us via your
              preferred method below.
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-16 px-4 bg-background">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* WhatsApp - Primary */}
              <Card className="md:col-span-2 border-primary border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <MessageCircle className="w-6 h-6 text-primary" />
                    WhatsApp (Recommended)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    The fastest way to reach us! Send us a message on WhatsApp
                    for quick responses, booking inquiries, or any questions
                    about our tours.
                  </p>
                  <Button size="lg" asChild>
                    {waNumber ? (
                      <a
                        href={`https://wa.me/${waNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Chat on WhatsApp
                      </a>
                    ) : (
                      <span>
                        <MessageCircle className="w-5 h-5" />
                        Chat on WhatsApp
                      </span>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Phone */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Prefer to call? We&apos;re available during operating hours.
                  </p>
                  <Button variant="outline" asChild>
                    {phone ? (
                      <a
                        href={`tel:${phone}`}
                        className="inline-flex items-center gap-2"
                      >
                        <Phone className="w-4 h-4" />
                        {phone}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        +94 7X XXX XXXX
                      </span>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Email */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    For detailed inquiries or group bookings, send us an email.
                  </p>
                  <Button variant="outline" asChild>
                    {email ? (
                      <a
                        href={`mailto:${email}`}
                        className="inline-flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        {email}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        info@mirissakayak.com
                      </span>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Address & Map */}
            <div className="mt-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{address}</p>
                  <div className="aspect-video w-full rounded-lg overflow-hidden relative">
                    {(!mapLoaded || loading || !mapEmbed) && (
                      <Skeleton className="absolute inset-0 h-[400px] w-full" />
                    )}
                    {mapEmbed && (
                      <iframe
                        src={mapEmbed}
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mirissa Kayak Safari Tours Location"
                        className={`w-full ${mapLoaded ? "opacity-100" : "opacity-0"}`}
                        onLoad={() => setMapLoaded(true)}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Operating Hours */}
        <section className="py-16 px-4 bg-muted">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Operating Hours
            </h2>

            <div className="bg-card rounded-lg p-6 space-y-3">
              {Object.entries(operatingHours).map(([key, value], i, arr) => {
                const label = key.charAt(0).toUpperCase() + key.slice(1);

                return (
                  <div
                    key={key}
                    className={`flex justify-between items-center py-2 ${
                      i !== arr.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <span className="text-card-foreground font-medium">
                      {label} Tour
                    </span>
                    <span className="text-muted-foreground">
                      {value.start} – {value.end}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Tours run year-round, weather permitting. We&apos;ll confirm
              conditions when you book.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
