"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { getGuides, Guide } from "@/services/guides.service";
import { AboutCTAWhatsApp } from "./about-cta";

export default function AboutPage() {
  const [guides, setGuides] = useState<Guide[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getGuides();
        setGuides(data);
      } catch {
        setGuides([]);
      }
    })();
  }, []);

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-16 px-4 bg-muted">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About Us
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate locals sharing the beauty of Mirissa with adventurers
              from around the world.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 px-4 bg-background">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/images/about/boat.png"
                  alt="Our team preparing kayaks"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">
                  Our Story
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Mirissa Kayak Safari Tours was started by local fishermen who
                  grew up navigating the calm lagoon waters of Mirissa. Long
                  before tourism arrived, these waterways were part of daily
                  life — used for fishing, travel, and observing the rich
                  wildlife of the mangroves.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  What began as simple kayak trips for curious visitors slowly
                  evolved into guided lagoon safaris focused on nature, safety,
                  and local knowledge. The goal was never mass tourism, but
                  sharing an authentic experience of Mirissa as locals know it.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, Mirissa Kayak Safari Tours remains a locally operated
                  business. Our guides are from the surrounding area, trained
                  through years of hands-on experience on these waters. We focus
                  on calm, non-motorized kayaking, respecting wildlife and
                  preserving the fragile mangrove ecosystem.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Every tour is shaped by the same values we started with —
                  safety, simplicity, and genuine connection to nature.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 bg-muted">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              What We Stand For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Safety First</h3>
                <p className="text-muted-foreground">
                  Every tour is led by experienced local guides who understand
                  the lagoon conditions, tides, and weather patterns. Life
                  jackets are provided for all guests, and tours are conducted
                  only during safe water conditions.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Local Knowledge</h3>
                <p className="text-muted-foreground">
                  Our guides are lifelong residents of Mirissa who grew up on
                  these waters. They know the mangroves, bird nesting areas, and
                  seasonal wildlife patterns, ensuring an authentic and
                  educational experience.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Eco-Friendly</h3>
                <p className="text-muted-foreground">
                  We operate exclusively in calm lagoon waters using
                  non-motorized kayaks. Tours are designed to minimize
                  disturbance to wildlife while educating guests on protecting
                  mangroves and aquatic ecosystems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 bg-background">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">
                Meet Our Guides
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Experienced, friendly, and passionate about sharing the beauty
                of Mirissa.
              </p>
            </div>

            <div
              className={`grid gap-8 max-w-4xl mx-auto ${
                guides.length === 1
                  ? "grid-cols-1 place-items-center"
                  : guides.length === 2
                    ? "grid-cols-1 sm:grid-cols-2 justify-center"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {guides.map((guide) => (
                <div key={guide.name} className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={guide.profilePhoto}
                      alt={guide.name}
                      fill
                      sizes="128px"
                      className="object-cover"
                      priority
                    />
                  </div>

                  <h3 className="text-lg font-semibold">{guide.name}</h3>
                  <p className="text-sm text-muted-foreground">{guide.role}</p>
                  <p className="text-xs text-muted-foreground">
                    {guide.yearsExperience} years experience
                  </p>

                  {guide.languages.length > 0 && (
                    <div className="mt-2 flex flex-wrap justify-center gap-1">
                      {guide.languages.map((lang) => (
                        <span
                          key={lang}
                          className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready for Your Adventure?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Join us for an unforgettable kayaking experience. We can&apos;t
              wait to show you the beauty of Mirissa!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <AboutCTAWhatsApp />
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/tours">View Tours</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
