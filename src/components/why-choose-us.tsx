import { Shield, Users, MapPin, Leaf } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Safety Comes First",
    description:
      "Certified life jackets for everyone, experienced guides, calm lagoon routes, and well-maintained equipment ensure a safe and relaxed kayaking experience.",
  },
  {
    icon: Users,
    title: "Experienced Local Guides",
    description:
      "Our friendly local guides know the lagoons inside out and provide clear safety briefings while helping you enjoy nature at your own pace.",
  },
  {
    icon: MapPin,
    title: "Peaceful Lagoon Location",
    description:
      "Located in Mirissa, our tours focus on calm lagoons and scenic waterways—perfect for beginners, families, and nature lovers.",
  },
  {
    icon: Leaf,
    title: "Nature-Focused Experience",
    description:
      "We offer quiet, eco-friendly kayaking that lets you enjoy wildlife, mangroves, and beautiful surroundings without fighting waves or crowds.",
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
            We focus on safe, peaceful, and nature-filled kayaking experiences
            designed for all skill levels.
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
