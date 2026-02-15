"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TourCard } from "@/components/tour-card";
import { Button } from "@/components/ui/button";
import { getFeaturedTours, type TourPackage } from "@/services/tours.service";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedTours() {
  const [featuredTours, setFeaturedTours] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getFeaturedTours();
        setFeaturedTours(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12 space-y-4">
            <Skeleton className="h-9 w-72 mx-auto" />
            <Skeleton className="h-5 w-[520px] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-lg border p-4 space-y-3">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-5 w-[70%]" />
                <Skeleton className="h-4 w-[50%]" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[60%]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!featuredTours.length) return null;

  return (
    <section className="py-20 px-4 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Popular Tour Packages
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our carefully curated kayaking experiences, designed for
            adventurers of all skill levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTours.map((tour) => (
            <TourCard
              key={tour.id}
              name={tour.title}
              duration={tour.duration}
              price={`Rs. ${tour.priceLKR.toLocaleString()}`}
              description={tour.shortDescription ?? ""}
              highlights={tour.includes ?? []}
              image={tour.images?.[0]}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/tours">View All Tours</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
