import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { guides } from "@/lib/site-config";
import { AboutCTAWhatsApp } from "./about-cta";

export const metadata: Metadata = {
  title: "About Us | Mirissa Kayak Safari Tours",
  description:
    "Learn about our story, our experienced guides, and our commitment to safe, authentic kayaking experiences in Mirissa, Sri Lanka.",
};

export default function AboutPage() {
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
                  Mirissa Kayak Safari Tours was founded in 2014 by a group of
                  local fishermen who wanted to share the hidden beauty of our
                  coastline with visitors. What started as simple canoe trips
                  through the mangroves has grown into a professional operation
                  serving thousands of adventurers each year.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our founders grew up on these waters. They learned to navigate
                  the mangrove channels as children, watching for kingfishers
                  and monitor lizards. Today, they pass on this knowledge to
                  every guest, ensuring an authentic experience you won&apos;t
                  find anywhere else.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We remain a family-operated business, committed to responsible
                  tourism and preserving the ecosystems that make our tours so
                  special.
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
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  Safety First
                </h3>
                <p className="text-muted-foreground">
                  Every guide is trained in first aid and water safety. We
                  provide quality equipment, conduct thorough briefings, and
                  monitor weather conditions carefully. Your safety is our top
                  priority.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  Local Knowledge
                </h3>
                <p className="text-muted-foreground">
                  Our guides are born and raised in Mirissa. They know every
                  channel, every wildlife hotspot, and every tide pattern. This
                  local expertise makes your experience truly special.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  Eco-Friendly
                </h3>
                <p className="text-muted-foreground">
                  We practice leave-no-trace principles, use only human-powered
                  kayaks, and educate guests about protecting marine ecosystems.
                  The ocean gives us so much; we give back.
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {guides.map((guide) => (
                <div key={guide.name} className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={guide.image}
                      alt={guide.name}
                      fill
                      sizes="128px"
                      className="object-cover"
                      priority
                    />
                  </div>

                  <h3 className="text-lg font-semibold text-foreground">
                    {guide.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{guide.role}</p>
                  <p className="text-xs text-muted-foreground">
                    {guide.years} experience
                  </p>
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
