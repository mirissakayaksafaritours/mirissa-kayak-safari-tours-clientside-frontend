import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";
import { operatingHours } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us | Mirissa Kayak Safari Tours",
  description:
    "Get in touch with us via WhatsApp, phone, or email. We're happy to answer your questions and help you book your kayaking adventure.",
};

export default function ContactPage() {
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
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Chat on WhatsApp
                    </a>
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
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="inline-flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      {siteConfig.phone}
                    </a>
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
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="inline-flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      {siteConfig.email}
                    </a>
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
                  <p className="text-muted-foreground">{siteConfig.address}</p>
                  <div className="aspect-video w-full rounded-lg overflow-hidden">
                    <iframe
                      src={siteConfig.mapEmbed}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mirissa Location Map"
                    />
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
              {[
                {
                  label: "Daily Tours",
                  value: `${operatingHours.dailyTours.start} - ${operatingHours.dailyTours.end}`,
                },
                {
                  label: "Sunrise Tours",
                  value: `${operatingHours.sunriseTours.start} - ${operatingHours.sunriseTours.end}`,
                },
                {
                  label: "Sunset Tours",
                  value: `${operatingHours.sunsetTours.start} - ${operatingHours.sunsetTours.end}`,
                },
                {
                  label: "Best Season",
                  value: `${operatingHours.bestSeason.from} - ${operatingHours.bestSeason.to}`,
                },
              ].map(({ label, value }, i) => (
                <div
                  key={label}
                  className={`flex justify-between items-center py-2 ${
                    i !== 3 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="text-card-foreground font-medium">
                    {label}
                  </span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
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
