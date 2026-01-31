import type { Metadata } from "next"
import { Header } from "@/components/header/header"
import { Footer } from "@/components/footer/footer"
import { TourCard } from "@/components/tour-card"
import { tours } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Tour Packages | Mirissa Kayak Safari Tours",
  description: "Explore our range of kayaking tours - from sunrise paddles to full-day expeditions. Find the perfect adventure for your Sri Lanka trip.",
}

export default function ToursPage() {
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
              From peaceful mangrove explorations to thrilling ocean adventures, we have the perfect kayaking experience for you.
            </p>
          </div>
        </section>

        {/* Tours Grid */}
        <section className="py-16 px-4 bg-background">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <TourCard key={tour.id} {...tour} />
              ))}
            </div>
          </div>
        </section>

        {/* Booking Info */}
        <section className="py-16 px-4 bg-muted">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">How to Book</h2>
            <p className="text-muted-foreground mb-6">
              Booking is easy! Simply click the &quot;Book via WhatsApp&quot; button on any tour and send us a message. We&apos;ll confirm your booking and answer any questions you have.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1</div>
                <p className="text-sm text-muted-foreground">Choose your tour</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <p className="text-sm text-muted-foreground">Contact us on WhatsApp</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <p className="text-sm text-muted-foreground">Get ready for adventure!</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
