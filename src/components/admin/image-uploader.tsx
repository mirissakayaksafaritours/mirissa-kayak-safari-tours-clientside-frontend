"use client";

import React, { useState, useCallback } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { presignGalleryImageUpload } from "@/services/galleryImage.service";

export type PresignFn = (payload: {
  fileName: string;
  contentType: string;
}) => Promise<{ uploadUrl: string; key: string; publicUrl: string }>;

export type UploadedImage = { url: string; key: string };

interface ImageUploaderProps {
  value?: UploadedImage | UploadedImage[];
  onChange: (value?: UploadedImage | UploadedImage[]) => void;
  multiple?: boolean;
  className?: string;
  /** Optional custom presign function. Defaults to the gallery presign endpoint. */
  presignFn?: PresignFn;
}

async function uploadToS3(
  file: File,
  presignFn: PresignFn,
): Promise<UploadedImage> {
  const presign = await presignFn({
    fileName: file.name,
    contentType: file.type || "image/jpeg",
  });

  const res = await fetch(presign.uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type || "image/jpeg" },
    body: file,
  });

  if (!res.ok) throw new Error("S3 upload failed");

  return { url: presign.publicUrl, key: presign.key };
}

export function ImageUploader({
  value,
  onChange,
  multiple = false,
  className,
  presignFn = presignGalleryImageUpload,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const images: UploadedImage[] = multiple
    ? Array.isArray(value)
      ? value
      : value
        ? [value]
        : []
    : value
      ? [value as UploadedImage]
      : [];

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const valid = Array.from(files).filter((f) =>
        f.type.startsWith("image/"),
      );
      if (valid.length === 0) return;

      setIsUploading(true);
      try {
        const uploaded = await Promise.all(
          valid.map((file) => uploadToS3(file, presignFn)),
        );

        if (multiple) {
          onChange([...(images ?? []), ...uploaded]);
        } else {
          onChange(uploaded[0]);
        }
      } finally {
        setIsUploading(false);
      }
    },
    [images, multiple, onChange],
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const removeImage = useCallback(
    (index: number) => {
      if (multiple) {
        const next = images.filter((_, i) => i !== index);
        onChange(next.length ? next : []);
      } else {
        onChange(undefined);
      }
    },
    [images, multiple, onChange],
  );

  const hasImages = images.length > 0;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Zone (PREVIEW INSIDE) */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative rounded-lg border-2 border-dashed transition-colors",
          dragActive
            ? "border-accent bg-accent/5"
            : "border-border bg-input hover:border-muted-foreground/50",
          isUploading && "pointer-events-none opacity-50",
        )}
      >
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="absolute inset-0 z-10 cursor-pointer opacity-0"
          disabled={isUploading}
        />

        {/* If NO images → classic center UI */}
        {!hasImages ? (
          <div className="flex flex-col items-center justify-center p-6">
            <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {isUploading ? "Uploading..." : "Drag & drop or click to upload"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              {multiple
                ? "PNG, JPG, GIF up to 10MB each"
                : "PNG, JPG, GIF up to 10MB"}
            </p>
          </div>
        ) : (
          /* If HAS images → show preview grid inside the zone */
          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {isUploading
                  ? "Uploading..."
                  : "Drop more images or click to add"}
              </p>
              {!multiple ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onChange(undefined);
                  }}
                >
                  Remove
                </Button>
              ) : null}
            </div>

            <div
              className={cn(
                "grid gap-3",
                multiple
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  : "grid-cols-1",
              )}
            >
              {images.map((img, index) => (
                <div
                  key={img.key || index}
                  className="group relative aspect-video overflow-hidden rounded-lg border border-border bg-secondary"
                >
                  {img.url ? (
                    <img
                      src={img.url}
                      alt={`Uploaded ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 z-20 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeImage(index);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
