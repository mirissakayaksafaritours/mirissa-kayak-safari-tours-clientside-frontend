"use client";

import { useEffect, useState, useMemo } from "react";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { TourCard } from "@/components/tour-card";
import { getTourPackages, type TourPackage } from "@/services/tours.service";
import { Skeleton } from "@/components/ui/skeleton";

export default function ToursPage() {
  const [tours, setTours] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getTourPackages();
        setTours(data);
      } catch (error) {
        setTours([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toTourCardProps = useMemo(
    () => (t: TourPackage) => ({
      name: t.title,
      duration: t.duration,
      price: `Rs. ${t.priceLKR.toLocaleString()}`,
      description: t.shortDescription ?? "",
      highlights: t.includes ?? [],
    }),
    [],
  );

  const total = tours.length;
  const remainder = total % 3;

  const lastRowStart =
    remainder === 0 ? total : remainder === 1 ? total - 1 : total - 2;

  const mainTours = tours.slice(0, lastRowStart);
  const lastRowTours = tours.slice(lastRowStart);

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-16 px-4 bg-muted">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Tour Packages
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From peaceful mangrove explorations to thrilling ocean adventures,
              we have the perfect kayaking experience for you.
            </p>
          </div>
        </section>

        {/* Tours Grid */}
        {loading ? (
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
        ) : (
          <section className="py-16 px-4 bg-background">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mainTours.map((tour) => (
                  <div key={tour.id} className="flex justify-center">
                    <div className="w-full max-w-md">
                      <TourCard {...toTourCardProps(tour)} />
                    </div>
                  </div>
                ))}

                {remainder === 1 && lastRowTours[0] && (
                  <div className="lg:col-span-3 flex justify-center">
                    <div className="w-full max-w-md">
                      <TourCard {...toTourCardProps(lastRowTours[0])} />
                    </div>
                  </div>
                )}

                {remainder === 2 && lastRowTours.length === 2 && (
                  <div className="lg:col-span-3 flex justify-center gap-6">
                    {lastRowTours.map((tour) => (
                      <div key={tour.id} className="w-full max-w-md">
                        <TourCard {...toTourCardProps(tour)} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Booking Info */}
        <section className="py-16 px-4 bg-muted">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              How to Book
            </h2>
            <p className="text-muted-foreground mb-6">
              Booking is easy! Simply click the &quot;Book via WhatsApp&quot;
              button on any tour and send us a message. We&apos;ll confirm your
              booking and answer any questions you have.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1</div>
                <p className="text-sm text-muted-foreground">
                  Choose your tour
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <p className="text-sm text-muted-foreground">
                  Contact us on WhatsApp
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <p className="text-sm text-muted-foreground">
                  Get ready for adventure!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
