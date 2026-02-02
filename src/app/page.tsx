import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero";
import { FeaturedTours } from "@/components/featured-tours";
import { WhyChooseUs } from "@/components/why-choose-us";
import { FAQAccordion } from "@/components/faq-accordion";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedTours />
        <WhyChooseUs />
        <FAQAccordion />
        {/* 
          <OperatingHours />
          <HomeMapSection />
          <Reviews /> 
          */}
      </main>
      <Footer />
    </>
  );
}
