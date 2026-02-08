import type { Metadata } from "next";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import GalleryClient from "./gallery-client";

export const metadata: Metadata = {
  title: "Photo Gallery | Mirissa Kayak Safari Tours",
  description:
    "Browse photos from our kayaking adventures - mangroves, wildlife, sunsets, and happy adventurers exploring Mirissa, Sri Lanka.",
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-16 px-4 bg-muted">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Photo Gallery
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A glimpse into the adventures that await you. These are real
              moments from our kayaking tours.
            </p>
          </div>
        </section>

        {/* Client Gallery */}
        <section className="py-16 px-4 bg-background">
          <div className="mx-auto max-w-7xl">
            <GalleryClient />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
