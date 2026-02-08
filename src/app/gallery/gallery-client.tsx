"use client";

import { useEffect, useState } from "react";
import { GalleryGrid } from "@/components/gallery-grid";
import { getGalleryImages } from "@/services/galleryImage.service";
import { Skeleton } from "@/components/ui/skeleton";

function GallerySkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="aspect-square">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export default function GalleryClient() {
  const [images, setImages] = useState<any[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getGalleryImages();
        setImages(data);
      } catch {
        setImages([]);
      }
    })();
  }, []);

  if (images === null) {
    return <GallerySkeleton />;
  }

  return <GalleryGrid images={images} />;
}
