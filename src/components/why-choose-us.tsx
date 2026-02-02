import { Shield, Users, MapPin, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "All equipment is regularly maintained and inspected. Life jackets, safety briefings, and trained guides on every tour.",
  },
  {
    icon: Users,
    title: "Local Expert Guides",
    description:
      "Our guides are born and raised in Mirissa. They know every secret spot, wildlife pattern, and safe passage.",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    description:
      "Mirissa offers the perfect combination of calm mangrove lagoons and exciting ocean waters for kayaking.",
  },
  {
    icon: Award,
    title: "10+ Years Experience",
    description:
      "Thousands of happy adventurers have explored with us. We're committed to unforgettable, responsible tours.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 px-4 bg-muted">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;re passionate about providing safe, authentic, and memorable
            kayaking experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
