"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PageHeader } from "@/components/admin/page-header";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import {
  FormSection,
  FormField,
  FormGrid,
  FormActions,
} from "@/components/admin/form-layout";
import {
  ImageUploader,
  type UploadedImage,
} from "@/components/admin/image-uploader";
import { useToast } from "@/components/admin/toast-provider";

import {
  getGalleryImagesAdmin,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  type GalleryImage,
} from "@/services/galleryImage.service";

import {
  getGalleryCategories,
  type GalleryCategory,
} from "@/services/galleryCategory.service";

const initialFormData = {
  title: "",
  categoryId: "",
  imageUrl: "",
  s3Key: "",
  caption: "",
  order: 1,
};

export default function GalleryImagesPage() {
  const { showToast } = useToast();

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  useEffect(() => {
    (async () => {
      try {
        const [imgs, cats] = await Promise.all([
          getGalleryImagesAdmin(),
          getGalleryCategories(),
        ]);

        setImages(imgs);
        setCategories(cats);
      } catch (e: any) {
        const msg = e?.response?.data?.error || "Failed to load gallery data";
        showToast(msg, "error");
      }
    })();
  }, [showToast]);

  useEffect(() => {
    if (editingImage) {
      setFormData({
        title: editingImage.title ?? "",
        categoryId: editingImage.categoryId,
        imageUrl: editingImage.imageUrl,
        s3Key: editingImage.s3Key,
        caption: editingImage.caption ?? "",
        order: editingImage.order,
      });
    } else {
      setFormData({
        ...initialFormData,
        order: images.length + 1,
        categoryId: categories[0]?.id || "",
      });
    }
  }, [editingImage, images.length, categories]);

  const refreshImages = async () => {
    try {
      const imgs = await getGalleryImagesAdmin();
      setImages(imgs);
    } catch (e: any) {
      const msg = e?.response?.data?.error || "Failed to refresh images";
      showToast(msg, "error");
    }
  };

  const handleEdit = (img: GalleryImage) => {
    setEditingImage(img);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteGalleryImage(deleteId);
      await refreshImages();
      showToast("Image deleted successfully", "success");
    } catch (e: any) {
      const msg = e?.response?.data?.error || "Failed to delete image";
      showToast(msg, "error");
    } finally {
      setDeleteId(null);
    }
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingImage(null);
    setFormData(initialFormData);
  };

  const handleSubmit = async () => {
    if (!formData.categoryId || !formData.imageUrl || !formData.s3Key) {
      showToast("Please select a category and upload an image", "error");
      return;
    }

    const payload = {
      title: formData.title || undefined,
      categoryId: formData.categoryId,
      imageUrl: formData.imageUrl,
      s3Key: formData.s3Key,
      caption: formData.caption || undefined,
      order: Number(formData.order) || 1,
    };

    try {
      if (editingImage) {
        await updateGalleryImage(editingImage.id, {
          title: payload.title,
          categoryId: payload.categoryId,
          caption: payload.caption,
          order: payload.order,
        });
        showToast("Image updated successfully", "success");
      } else {
        await createGalleryImage(payload);
        showToast("Image uploaded successfully", "success");
      }

      await refreshImages();
      handleFormClose();
    } catch (e: any) {
      const msg = e?.response?.data?.error || "Failed to save image";
      showToast(msg, "error");
    }
  };

  const filteredImages = useMemo(() => {
    return filterCategory === "all"
      ? images
      : images.filter((img) => img.categoryId === filterCategory);
  }, [images, filterCategory]);

  const getCategoryName = (categoryId: string) => {
    const c = categories.find((x) => x.id === categoryId);
    return c?.name || "Unknown";
  };

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
        <label className="text-sm text-muted-foreground">
          Filter by category:
        </label>
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
          <p className="text-muted-foreground">
            No images found. Upload your first image!
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="group relative overflow-hidden rounded-lg border border-border bg-card"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={img.imageUrl || "/placeholder.svg"}
                  alt={img.title || "Gallery image"}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>

              <div className="p-3">
                {img.title ? (
                  <p className="truncate font-medium text-foreground">
                    {img.title}
                  </p>
                ) : null}

                <Badge variant="secondary" className="mt-1 text-xs">
                  {getCategoryName(img.categoryId)}
                </Badge>

                {img.caption ? (
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {img.caption}
                  </p>
                ) : null}
              </div>

              <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleEdit(img)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setDeleteId(img.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Dialog */}
      <Dialog
        open={formOpen}
        onOpenChange={(open) => {
          if (!open) handleFormClose();
        }}
      >
        <DialogContent className="max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingImage ? "Edit Image" : "Upload Image"}
            </DialogTitle>
          </DialogHeader>

          <div className="max-h-[80vh] overflow-y-auto pr-2">
            <div className="space-y-6 py-4">
              <FormSection>
                <FormField label="Image" required>
                  <ImageUploader
                    value={
                      formData.imageUrl
                        ? ({
                            url: formData.imageUrl,
                            key: formData.s3Key,
                          } as UploadedImage)
                        : undefined
                    }
                    onChange={(v) => {
                      const img = Array.isArray(v) ? v?.[0] : v;
                      if (!img) {
                        setFormData({ ...formData, imageUrl: "", s3Key: "" });
                        return;
                      }
                      setFormData({
                        ...formData,
                        imageUrl: img.url,
                        s3Key: img.key,
                      });
                    }}
                  />
                  {editingImage ? (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Tip: replacing the image file isn’t enabled yet. Edit
                      fields only.
                    </p>
                  ) : null}
                </FormField>

                <FormField label="Category" htmlFor="categoryId" required>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, categoryId: value })
                    }
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
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
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
                        setFormData({
                          ...formData,
                          order: parseInt(e.target.value) || 1,
                        })
                      }
                      className="bg-input border-border"
                    />
                  </FormField>
                </FormGrid>

                <FormField label="Caption" htmlFor="caption">
                  <Input
                    id="caption"
                    value={formData.caption}
                    onChange={(e) =>
                      setFormData({ ...formData, caption: e.target.value })
                    }
                    placeholder="Beautiful sunset at the beach..."
                    className="bg-input border-border"
                  />
                </FormField>
              </FormSection>
            </div>
          </div>

          <FormActions>
            <Button
              variant="outline"
              onClick={handleFormClose}
              className="border-border bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {editingImage ? "Update Image" : "Upload Image"}
            </Button>
          </FormActions>
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
  );
}
