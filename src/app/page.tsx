import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero";
import { FeaturedTours } from "@/components/featured-tours";
import { WhyChooseUs } from "@/components/why-choose-us";
import { FAQAccordion } from "@/components/faq-accordion";
import { OperatingHours } from "@/components/operating-hours";
import { HomeMapSection } from "@/components/home-map-section";
import { Reviews } from "@/components/reviews";
import { WildlifeSection } from "@/components/wildlife-section";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <OperatingHours />
        <WhyChooseUs />
        <FeaturedTours />
        <WildlifeSection />
        <HomeMapSection />
        <Reviews />
        <FAQAccordion />
      </main>
      <Footer />
    </>
  );
}
