import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
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
          Explore mangroves, ocean life, and calm waters with experienced local
          guides. Discover the beauty of Sri Lanka&apos;s southern coast.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book on WhatsApp
            </a>
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
