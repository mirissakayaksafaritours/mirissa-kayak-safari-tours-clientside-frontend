import Link from "next/link";
import { tours } from "@/lib/site-config";
import { TourCard } from "@/components/tour-card";
import { Button } from "@/components/ui/button";

export function FeaturedTours() {
  const featuredTours = tours.slice(0, 3);

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
          {featuredTours.map((tour, index) => (
            <TourCard key={tour.id} {...tour} featured={index === 1} />
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
