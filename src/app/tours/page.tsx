import type { Metadata } from "next";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { TourCard } from "@/components/tour-card";
import { getTourPackages, TourPackage } from "@/services/tours.service";

export const metadata: Metadata = {
  title: "Tour Packages | Mirissa Kayak Safari Tours",
  description:
    "Explore our range of kayaking tours - from sunrise paddles to full-day expeditions. Find the perfect adventure for your Sri Lanka trip.",
};

export default async function ToursPage() {
  const tours = await getTourPackages();

  const toTourCardProps = (t: TourPackage) => ({
    name: t.title,
    duration: t.duration,
    price: `Rs. ${t.priceLKR.toLocaleString()}`,
    description: t.shortDescription ?? "",
    highlights: t.includes ?? [],
  });

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
        <section className="py-16 px-4 bg-background">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((tour, index) => {
                const total = tours.length;
                const remainder = total % 3;

                // 🔹 case: last row has 1 card → center it
                if (remainder === 1 && index === total - 1) {
                  return (
                    <div
                      key={tour.id}
                      className="lg:col-span-3 flex justify-center"
                    >
                      <div className="w-full max-w-md">
                        <TourCard {...toTourCardProps(tour)} />
                      </div>
                    </div>
                  );
                }

                // 🔹 case: last row has 2 cards → center both together
                if (remainder === 2 && index === total - 2) {
                  return (
                    <div
                      key="last-two"
                      className="lg:col-span-3 flex justify-center gap-6"
                    >
                      <div className="w-full max-w-md">
                        <TourCard {...toTourCardProps(tours[total - 2])} />
                      </div>
                      <div className="w-full max-w-md">
                        <TourCard {...toTourCardProps(tours[total - 1])} />
                      </div>
                    </div>
                  );
                }

                // skip rendering last item (already rendered above)
                if (remainder === 2 && index === total - 1) {
                  return null;
                }

                // 🔹 normal grid items
                return (
                  <div key={tour.id} className="flex justify-center">
                    <div className="w-full max-w-md">
                      <TourCard {...toTourCardProps(tour)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

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
