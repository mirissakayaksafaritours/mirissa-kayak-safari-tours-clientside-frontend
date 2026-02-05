'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { FormSection, FormField, FormGrid, FormActions } from '@/components/admin/form-layout'
import { ImageUploader } from '@/components/admin/image-uploader'
import { useToast } from '@/components/admin/toast-provider'
import { createTourPackage, updateTourPackage } from '@/lib/adminStore'
import type { TourPackage } from '@/lib/types'
import { X, Plus } from 'lucide-react'

interface TourFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tour: TourPackage | null
  onSuccess: () => void
}

const initialFormData = {
  title: '',
  slug: '',
  shortDescription: '',
  duration: '',
  priceLKR: 0,
  priceUSD: undefined as number | undefined,
  includes: [] as string[],
  maxPeople: 1,
  images: [] as string[],
  isFeatured: false,
}

export function TourFormDialog({ open, onOpenChange, tour, onSuccess }: TourFormDialogProps) {
  const { showToast } = useToast()
  const [formData, setFormData] = useState(initialFormData)
  const [newInclude, setNewInclude] = useState('')

  useEffect(() => {
    if (tour) {
      setFormData({
        title: tour.title,
        slug: tour.slug,
        shortDescription: tour.shortDescription,
        duration: tour.duration,
        priceLKR: tour.priceLKR,
        priceUSD: tour.priceUSD,
        includes: tour.includes,
        maxPeople: tour.maxPeople,
        images: tour.images,
        isFeatured: tour.isFeatured,
      })
    } else {
      setFormData(initialFormData)
    }
  }, [tour, open])

  const handleChange = (field: keyof typeof formData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    handleChange('title', title)
    if (!tour) {
      handleChange('slug', generateSlug(title))
    }
  }

  const addInclude = () => {
    if (newInclude.trim()) {
      handleChange('includes', [...formData.includes, newInclude.trim()])
      setNewInclude('')
    }
  }

  const removeInclude = (index: number) => {
    handleChange(
      'includes',
      formData.includes.filter((_, i) => i !== index)
    )
  }

  const handleSubmit = () => {
    if (!formData.title || !formData.slug || !formData.priceLKR) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    if (tour) {
      updateTourPackage(tour.id, formData)
      showToast('Tour package updated successfully', 'success')
    } else {
      createTourPackage(formData)
      showToast('Tour package created successfully', 'success')
    }

    onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {tour ? 'Edit Tour Package' : 'Create Tour Package'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <FormSection title="Basic Information">
            <FormGrid columns={2}>
              <FormField label="Title" htmlFor="title" required>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Sunset Beach Tour"
                  className="bg-input border-border"
                />
              </FormField>

              <FormField label="Slug" htmlFor="slug" required>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  placeholder="sunset-beach-tour"
                  className="bg-input border-border"
                />
              </FormField>
            </FormGrid>

            <FormField label="Short Description" htmlFor="shortDescription">
              <Textarea
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) => handleChange('shortDescription', e.target.value)}
                placeholder="Experience the most beautiful sunset views..."
                className="bg-input border-border min-h-[80px]"
              />
            </FormField>

            <FormGrid columns={2}>
              <FormField label="Duration" htmlFor="duration" required>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => handleChange('duration', e.target.value)}
                  placeholder="2 hours"
                  className="bg-input border-border"
                />
              </FormField>

              <FormField label="Max People" htmlFor="maxPeople" required>
                <Input
                  id="maxPeople"
                  type="number"
                  min={1}
                  value={formData.maxPeople}
                  onChange={(e) => handleChange('maxPeople', parseInt(e.target.value) || 1)}
                  className="bg-input border-border"
                />
              </FormField>
            </FormGrid>
          </FormSection>

          <FormSection title="Pricing">
            <FormGrid columns={2}>
              <FormField label="Price (LKR)" htmlFor="priceLKR" required>
                <Input
                  id="priceLKR"
                  type="number"
                  min={0}
                  value={formData.priceLKR}
                  onChange={(e) => handleChange('priceLKR', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </FormField>

              <FormField label="Price (USD)" htmlFor="priceUSD">
                <Input
                  id="priceUSD"
                  type="number"
                  min={0}
                  value={formData.priceUSD || ''}
                  onChange={(e) =>
                    handleChange('priceUSD', e.target.value ? parseInt(e.target.value) : undefined)
                  }
                  placeholder="Optional"
                  className="bg-input border-border"
                />
              </FormField>
            </FormGrid>
          </FormSection>

          <FormSection title="What's Included">
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newInclude}
                  onChange={(e) => setNewInclude(e.target.value)}
                  placeholder="Add an item (e.g., Guide, Refreshments)"
                  className="bg-input border-border"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addInclude())}
                />
                <Button type="button" onClick={addInclude} variant="secondary">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.includes.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.includes.map((item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeInclude(index)}
                        className="ml-1 rounded-full p-0.5 hover:bg-foreground/10"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </FormSection>

          <FormSection title="Images">
            <ImageUploader
              value={formData.images}
              onChange={(images) => handleChange('images', images)}
              multiple
            />
          </FormSection>

          <FormSection>
            <div className="flex items-center gap-3">
              <Switch
                id="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) => handleChange('isFeatured', checked)}
              />
              <Label htmlFor="isFeatured" className="text-foreground">
                Featured tour (shown prominently on the website)
              </Label>
            </div>
          </FormSection>

          <FormActions>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {tour ? 'Update Tour' : 'Create Tour'}
            </Button>
          </FormActions>
        </div>
      </DialogContent>
    </Dialog>
  )
}
