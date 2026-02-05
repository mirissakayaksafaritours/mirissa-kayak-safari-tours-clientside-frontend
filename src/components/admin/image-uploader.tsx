'use client'

import React from "react"

import { useState, useCallback } from 'react'
import { Upload, X, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ImageUploaderProps {
  value?: string | string[]
  onChange: (value: string | string[]) => void
  multiple?: boolean
  className?: string
}

// Mock upload handler - simulates file upload and returns a placeholder URL
async function mockUploadHandler(file: File): Promise<string> {
  // Simulate upload delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  // Return a placeholder URL with file info
  return `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(file.name)}`
}

export function ImageUploader({
  value,
  onChange,
  multiple = false,
  className,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const images = multiple
    ? Array.isArray(value)
      ? value
      : value
        ? [value]
        : []
    : value
      ? [value as string]
      : []

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return

      setIsUploading(true)
      try {
        const uploadPromises = Array.from(files)
          .filter((file) => file.type.startsWith('image/'))
          .map((file) => mockUploadHandler(file))

        const uploadedUrls = await Promise.all(uploadPromises)

        if (multiple) {
          onChange([...images, ...uploadedUrls])
        } else {
          onChange(uploadedUrls[0])
        }
      } finally {
        setIsUploading(false)
      }
    },
    [images, multiple, onChange]
  )

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  const removeImage = useCallback(
    (index: number) => {
      if (multiple) {
        const newImages = images.filter((_, i) => i !== index)
        onChange(newImages)
      } else {
        onChange('')
      }
    },
    [images, multiple, onChange]
  )

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors',
          dragActive
            ? 'border-accent bg-accent/5'
            : 'border-border bg-input hover:border-muted-foreground/50',
          isUploading && 'pointer-events-none opacity-50'
        )}
      >
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="absolute inset-0 cursor-pointer opacity-0"
          disabled={isUploading}
        />
        <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          {isUploading ? 'Uploading...' : 'Drag & drop or click to upload'}
        </p>
        <p className="mt-1 text-xs text-muted-foreground/70">
          {multiple ? 'PNG, JPG, GIF up to 10MB each' : 'PNG, JPG, GIF up to 10MB'}
        </p>
      </div>

      {/* Image Preview */}
      {images.length > 0 && (
        <div className={cn('grid gap-4', multiple ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1')}>
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-video overflow-hidden rounded-lg border border-border bg-secondary"
            >
              {image ? (
                <img
                  src={image || "/placeholder.svg"}
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
                className="absolute right-2 top-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => removeImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
