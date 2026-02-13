"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/context/site-settings-context";

export function Hero() {
  const { settings } = useSiteSettings();

  const waNumber = (settings?.whatsappNumber || "").replace(/[^0-9]/g, "");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero/image.png')",
        }}
      >
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-background sm:text-5xl lg:text-6xl text-balance">
          Mirissa Kayak Safari Tours
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-background/90 sm:text-xl max-w-2xl mx-auto text-pretty">
          Explore the calm beauty of our mangrove waterways with guided kayaking
          tours through lush, untouched nature. Paddle alongside wildlife,
          discover hidden lagoons, and experience serenity like never before.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild>
            {waNumber ? (
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book on WhatsApp
              </a>
            ) : (
              <span>Book on WhatsApp</span>
            )}
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="bg-transparent text-background border-background hover:bg-background/10"
          >
            <Link href="/tours">View Packages</Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-background/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-background/70 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
