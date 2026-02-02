import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function HomeMapSection() {
  const googleMapsUrl = siteConfig.googleMapsUrl;

  return (
    <section className="py-20 px-4 bg-muted">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Find Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Located at the beautiful Mirissa Beach on the southern coast of Sri
            Lanka.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 w-full overflow-hidden rounded-lg border border-border shadow-sm">
            <iframe
              src={siteConfig.mapEmbed}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mirissa Kayak Safari Tours Location"
              className="w-full"
            />
          </div>

          <div className="flex flex-col gap-6 bg-card p-6 rounded-lg border border-border shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg">
                  Mirissa Kayak Safari Tours
                </h3>
                <address className="not-italic text-muted-foreground mt-1 leading-relaxed">
                  Mirissa Beach Road
                  <br />
                  Mirissa, Southern Province
                  <br />
                  Sri Lanka 81740
                </address>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                We are located near the main beach entrance. Look for our blue
                kayak sign at the shore.
              </p>
              <Button asChild className="w-full">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Open in Google Maps
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
