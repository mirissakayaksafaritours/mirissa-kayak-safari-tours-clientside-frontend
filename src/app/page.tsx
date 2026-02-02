import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* 
          <FeaturedTours />
          <WhyChooseUs />
          <FAQAccordion />
          <OperatingHours />
          <HomeMapSection />
          <Reviews /> 
          */}
      </main>
      <Footer />
    </>
  );
}
