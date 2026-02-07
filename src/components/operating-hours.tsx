"use client";
import { Clock, Sun, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { weeklySchedule } from "@/lib/site-config";
import { useSiteSettings } from "@/context/site-settings-context";

export function OperatingHours() {
  const { settings, loading } = useSiteSettings();

  const wa = (settings?.whatsappNumber || "").replace(/[^0-9]/g, "");

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Operating Hours
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Plan your adventure with us. We operate daily to give you the best
            kayaking experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Hours List */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Weekly Schedule
                </h3>
              </div>
              <dl className="space-y-3">
                {weeklySchedule.map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between items-center py-2 border-b border-border/50 last:border-0"
                  >
                    <dt className="font-medium text-foreground">{item.day}</dt>
                    <dd className="text-muted-foreground">{item.hours}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          {/* Best Time to Visit */}
          <div className="flex flex-col gap-6">
            <Card className="border-border/50 flex-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <Sun className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Best Time to Visit
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4 text-pretty">
                  Early morning tours (5:30 AM – 9:00 AM) offer the calmest
                  waters and best wildlife sightings. Late afternoon tours
                  provide stunning sunset views over the ocean.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Peak season: November – April
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Whale watching: December – April
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Mangrove tours: Year-round
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Important Note
                    </h4>
                    <p className="text-sm text-muted-foreground text-pretty">
                      Hours may change due to weather conditions. Please confirm
                      your booking via WhatsApp at{" "}
                      {!loading && settings?.whatsappNumber ? (
                        <a
                          href={`https://wa.me/${wa}`}
                          className="text-primary hover:underline font-medium"
                          target="_blank"
                          rel="noreferrer"
                        >
                          +{settings.whatsappNumber}
                        </a>
                      ) : (
                        <span className="font-medium text-primary">
                          WhatsApp
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
