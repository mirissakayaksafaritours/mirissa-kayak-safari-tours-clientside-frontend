"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGalleryCategories } from "@/services/galleryCategory.service";
import { GalleryImage } from "@/services/galleryImage.service";

interface GalleryGridProps {
  images: GalleryImage[];
}

type CategoryBtn = { id: string; label: string };

export function GalleryGrid({ images }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [categories, setCategories] = useState<CategoryBtn[]>([
    { id: "all", label: "All" },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const cats = await getGalleryCategories();
        setCategories([
          { id: "all", label: "All" },
          ...cats.map((c) => ({ id: c.slug, label: c.name })),
        ]);
      } catch {
        // keep only "All" if API fails
      }
    })();
  }, []);

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.categorySlug === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToPrevious = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1,
      );
    }
  };

  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1,
      );
    }
  };

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
            onClick={() => openLightbox(index)}
            aria-label={`View ${image.title}`}
          >
            <Image
              src={image.imageUrl}
              alt={image.title || "Gallery image"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center">
          <button
            type="button"
            className="absolute top-4 right-4 p-2 text-background hover:text-background/80 transition-colors"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-background hover:text-background/80 transition-colors"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-background hover:text-background/80 transition-colors"
            onClick={goToNext}
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="relative w-full max-w-4xl h-[80vh] mx-4">
            <Image
              src={filteredImages[lightboxIndex].imageUrl}
              alt={filteredImages[lightboxIndex].title || "Gallery image"}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-background text-sm">
            {filteredImages[lightboxIndex].title}
          </p>
        </div>
      )}
    </>
  );
}
