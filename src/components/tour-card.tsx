"use client";
import { Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useSiteSettings } from "@/context/site-settings-context";

interface TourCardProps {
  name: string;
  duration: string;
  price: string;
  description: string;
  highlights: string[];
  featured?: boolean;
}

export function TourCard({
  name,
  duration,
  price,
  description,
  highlights,
  featured,
}: TourCardProps) {
  const { settings } = useSiteSettings();

  const waNumber = (settings?.whatsappNumber || "").replace(/[^0-9]/g, "");

  return (
    <Card
      className={`flex flex-col h-full ${featured ? "border-primary border-2" : ""}`}
    >
      {featured && (
        <div className="bg-primary text-primary-foreground text-xs font-medium text-center py-1">
          Most Popular
        </div>
      )}
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">{name}</h3>
          <span className="text-xl font-bold text-primary">{price}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {duration}
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        <ul className="space-y-2">
          {highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-center gap-2 text-sm text-card-foreground"
            >
              <Check className="h-4 w-4 text-secondary shrink-0" />
              {highlight}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
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
      </CardFooter>
    </Card>
  );
}
