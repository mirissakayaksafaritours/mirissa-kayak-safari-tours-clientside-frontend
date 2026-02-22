"use client";
import Image from "next/image";
import { Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/context/site-settings-context";

interface TourCardProps {
  name: string;
  duration: string;
  price: string;
  description: string;
  highlights: string[];
  image?: string;
}

export function TourCard({
  name,
  duration,
  price,
  description,
  highlights,
  image,
}: TourCardProps) {
  const { settings } = useSiteSettings();

  const waNumber = (settings?.whatsappNumber || "").replace(/[^0-9]/g, "");

  // Split highlights into two columns
  const half = Math.ceil(highlights.length / 2);
  const col1 = highlights.slice(0, half);
  const col2 = highlights.slice(half);

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-border bg-card shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      {image && (
        <div className="relative w-full h-56 shrink-0">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Title */}
        <h3 className="text-2xl font-bold text-card-foreground leading-tight">
          {name}
        </h3>

        {/* Duration */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 shrink-0" />
          <span>{duration}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Features — 2-column grid */}
        {highlights.length > 0 && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {col1.map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-card-foreground">
                <Check className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
            {col2.map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-card-foreground">
                <Check className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* Spacer pushes button to bottom */}
        <div className="flex-1" />

        {/* Full-width Book button */}
        <Button asChild className="w-full mt-2">
          {waNumber ? (
            <a
              href={`https://wa.me/${waNumber}?text=Hi! I'm interested in the ${name} tour.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book on WhatsApp
            </a>
          ) : (
            <span>Book on WhatsApp</span>
          )}
        </Button>
      </div>
    </div>
  );
}
