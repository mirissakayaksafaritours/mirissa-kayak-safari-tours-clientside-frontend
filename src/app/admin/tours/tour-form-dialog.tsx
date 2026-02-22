"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  FormSection,
  FormField,
  FormGrid,
  FormActions,
} from "@/components/admin/form-layout";
import { useToast } from "@/components/admin/toast-provider";
import {
  createTourPackage,
  presignTourImageUpload,
  updateTourPackage,
  type TourPackage,
  type TourPackagePayload,
} from "@/services/tourPackages.service";
import { X, Plus } from "lucide-react";
import {
  ImageUploader,
  type UploadedImage,
} from "@/components/admin/image-uploader";

interface TourFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tour: TourPackage | null;
  onSuccess: () => void;
}

const initialFormData = {
  title: "",
  slug: "",
  shortDescription: "",
  duration: "",
  priceLKR: 0,
  includes: [] as string[],
  image: "",
  isFeatured: false,
};

export function TourFormDialog({
  open,
  onOpenChange,
  tour,
  onSuccess,
}: TourFormDialogProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState(initialFormData);
  const [newInclude, setNewInclude] = useState("");

  useEffect(() => {
    if (tour) {
      setFormData({
        title: tour.title ?? "",
        slug: tour.slug ?? "",
        shortDescription: tour.shortDescription ?? "",
        duration: tour.duration ?? "",
        priceLKR: Number(tour.priceLKR ?? 0),
        includes: Array.isArray(tour.includes) ? tour.includes : [],
        image: tour.image ?? "",
        isFeatured: !!tour.isFeatured,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [tour, open]);

  const handleChange = (field: keyof typeof formData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    handleChange("title", title);
    if (!tour) {
      handleChange("slug", generateSlug(title));
    }
  };

  const addInclude = () => {
    if (newInclude.trim()) {
      handleChange("includes", [...formData.includes, newInclude.trim()]);
      setNewInclude("");
    }
  };

  const removeInclude = (index: number) => {
    handleChange(
      "includes",
      formData.includes.filter((_, i) => i !== index),
    );
  };

  const handleUploaderChange = (
    files?: UploadedImage | UploadedImage[],
  ) => {
    if (!files) {
      handleChange("image", "");
      return;
    }

    const arr = Array.isArray(files) ? files : [files];
    handleChange("image", arr.map((item) => item.url));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.slug || !formData.image) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    const payload: TourPackagePayload = {
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title),
      shortDescription: formData.shortDescription || "",
      duration: formData.duration,
      priceLKR: 0,
      includes: formData.includes ?? [],
      image: formData.image,
      isFeatured: !!formData.isFeatured,
    };

    try {
      if (tour) {
        await updateTourPackage(tour.id, payload);
        showToast("Tour package updated successfully", "success");
      } else {
        await createTourPackage(payload);
        showToast("Tour package created successfully", "success");
      }
      onSuccess();
    } catch (e: any) {
      showToast(e?.response?.data?.message || "Save failed", "error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {tour ? "Edit Tour Package" : "Create Tour Package"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <FormSection title="Basic Information">
            <FormField label="Image" required>
              <ImageUploader
                value={
                  formData.image
                    ? { url: formData.image, key: "" }
                    : undefined
                }
                onChange={(file) =>
                  handleChange("image", (file as UploadedImage)?.url || "")
                }
                presignFn={presignTourImageUpload}
              />
            </FormField>

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
                  onChange={(e) => handleChange("slug", e.target.value)}
                  placeholder="sunset-beach-tour"
                  className="bg-input border-border"
                />
              </FormField>
            </FormGrid>

            <FormField label="Short Description" htmlFor="shortDescription">
              <Textarea
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) =>
                  handleChange("shortDescription", e.target.value)
                }
                placeholder="Experience the most beautiful sunset views..."
                className="bg-input border-border min-h-[80px]"
              />
            </FormField>

            <FormGrid columns={2}>
              <FormField label="Duration" htmlFor="duration" required>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  placeholder="2 hours"
                  className="bg-input border-border"
                />
              </FormField>
              {/* <FormField label="Price (LKR)" htmlFor="priceLKR" required>
                <Input
                  id="priceLKR"
                  min={0}
                  value={formData.priceLKR}
                  onChange={(e) =>
                    handleChange("priceLKR", parseInt(e.target.value) || 0)
                  }
                  className="bg-input border-border"
                />
              </FormField> */}
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
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addInclude())
                  }
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

          <FormSection>
            <div className="flex items-center gap-3">
              <Switch
                id="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) =>
                  handleChange("isFeatured", checked)
                }
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
              {tour ? "Update Tour" : "Create Tour"}
            </Button>
          </FormActions>
        </div>
      </DialogContent>
    </Dialog>
  );
}
