'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PageHeader } from '@/components/admin/page-header'
import { ConfirmDialog } from '@/components/admin/confirm-dialog'
import { FormSection, FormField, FormGrid, FormActions } from '@/components/admin/form-layout'
import { ImageUploader } from '@/components/admin/image-uploader'
import { useToast } from '@/components/admin/toast-provider'
import {
  getGalleryImages,
  getGalleryCategories,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  getGalleryCategoryById,
} from '@/lib/adminStore'
import type { GalleryImage, GalleryCategory } from '@/lib/types'

const initialFormData = {
  title: '',
  categoryId: '',
  image: '',
  caption: '',
  order: 1,
}

export default function GalleryImagesPage() {
  const { showToast } = useToast()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [categories, setCategories] = useState<GalleryCategory[]>([])
  const [formOpen, setFormOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [formData, setFormData] = useState(initialFormData)
  const [filterCategory, setFilterCategory] = useState<string>('all')

  useEffect(() => {
    setImages(getGalleryImages())
    setCategories(getGalleryCategories())
  }, [])

  useEffect(() => {
    if (editingImage) {
      setFormData({
        title: editingImage.title || '',
        categoryId: editingImage.categoryId,
        image: editingImage.image,
        caption: editingImage.caption || '',
        order: editingImage.order,
      })
    } else {
      setFormData({
        ...initialFormData,
        order: images.length + 1,
        categoryId: categories[0]?.id || '',
      })
    }
  }, [editingImage, images.length, categories])

  const refreshImages = () => {
    setImages(getGalleryImages())
  }

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image)
    setFormOpen(true)
  }

  const handleDelete = () => {
    if (deleteId) {
      deleteGalleryImage(deleteId)
      refreshImages()
      showToast('Image deleted successfully', 'success')
      setDeleteId(null)
    }
  }

  const handleFormClose = () => {
    setFormOpen(false)
    setEditingImage(null)
    setFormData(initialFormData)
  }

  const handleSubmit = () => {
    if (!formData.categoryId || !formData.image) {
      showToast('Please select a category and upload an image', 'error')
      return
    }

    const imageData = {
      ...formData,
      title: formData.title || undefined,
      caption: formData.caption || undefined,
    }

    if (editingImage) {
      updateGalleryImage(editingImage.id, imageData)
      showToast('Image updated successfully', 'success')
    } else {
      createGalleryImage(imageData)
      showToast('Image uploaded successfully', 'success')
    }

    refreshImages()
    handleFormClose()
  }

  const filteredImages =
    filterCategory === 'all'
      ? images
      : images.filter((img) => img.categoryId === filterCategory)

  const getCategoryName = (categoryId: string) => {
    const category = getGalleryCategoryById(categoryId)
    return category?.name || 'Unknown'
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gallery Images"
        description="Manage your photo gallery images."
        actions={
          <Button
            onClick={() => setFormOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Image
          </Button>
        }
      />

      {/* Filter */}
      <div className="flex items-center gap-4">
        <label className="text-sm text-muted-foreground">Filter by category:</label>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48 bg-input border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Image Grid */}
      {filteredImages.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
          <ImageIcon className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">No images found. Upload your first image!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg border border-border bg-card"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={image.image || '/placeholder.svg'}
                  alt={image.title || 'Gallery image'}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                {image.title && (
                  <p className="truncate font-medium text-foreground">{image.title}</p>
                )}
                <Badge variant="secondary" className="mt-1 text-xs">
                  {getCategoryName(image.categoryId)}
                </Badge>
                {image.caption && (
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{image.caption}</p>
                )}
              </div>
              <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleEdit(image)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setDeleteId(image.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Dialog */}
      <Dialog open={formOpen} onOpenChange={handleFormClose}>
        <DialogContent className="max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingImage ? 'Edit Image' : 'Upload Image'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <FormSection>
              <FormField label="Image" required>
                <ImageUploader
                  value={formData.image}
                  onChange={(value) => setFormData({ ...formData, image: value as string })}
                />
              </FormField>

              <FormField label="Category" htmlFor="categoryId" required>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                >
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormGrid columns={2}>
                <FormField label="Title" htmlFor="title">
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Sunset View"
                    className="bg-input border-border"
                  />
                </FormField>

                <FormField label="Order" htmlFor="order">
                  <Input
                    id="order"
                    type="number"
                    min={1}
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: parseInt(e.target.value) || 1 })
                    }
                    className="bg-input border-border"
                  />
                </FormField>
              </FormGrid>

              <FormField label="Caption" htmlFor="caption">
                <Input
                  id="caption"
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  placeholder="Beautiful sunset at the beach..."
                  className="bg-input border-border"
                />
              </FormField>
            </FormSection>

            <FormActions>
              <Button variant="outline" onClick={handleFormClose} className="border-border bg-transparent">
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {editingImage ? 'Update Image' : 'Upload Image'}
              </Button>
            </FormActions>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Image"
        description="Are you sure you want to delete this image? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  )
}
