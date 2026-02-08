"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/admin/page-header";
import { DataTable, type Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import {
  FormSection,
  FormField,
  FormGrid,
  FormActions,
} from "@/components/admin/form-layout";
import { useToast } from "@/components/admin/toast-provider";
import { getGalleryImagesByCategory } from "@/lib/adminStore";
import {
  getGalleryCategories,
  createGalleryCategory,
  updateGalleryCategory,
  deleteGalleryCategory,
} from "@/services/galleryCategory.service";
import type { GalleryCategory } from "@/lib/types";

const initialFormData = {
  name: "",
  slug: "",
  order: 1,
};

export default function GalleryCategoriesPage() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<GalleryCategory | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    (async () => {
      try {
        const data = await getGalleryCategories();
        setCategories(data);
      } catch (e) {
        showToast("Failed to load categories", "error");
      }
    })();
  }, []);

  const refreshCategories = async () => {
    try {
      const data = await getGalleryCategories();
      setCategories(data);
    } catch (e) {
      showToast("Failed to refresh categories", "error");
    }
  };

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name,
        slug: editingCategory.slug,
        order: editingCategory.order,
      });
    } else {
      setFormData({ ...initialFormData, order: categories.length + 1 });
    }
  }, [editingCategory, categories.length]);

  const handleEdit = (category: GalleryCategory) => {
    setEditingCategory(category);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const images = getGalleryImagesByCategory(deleteId);
    if (images.length > 0) {
      showToast(
        `This category has ${images.length} images that will also be deleted`,
        "info",
      );
    }

    try {
      await deleteGalleryCategory(deleteId);
      await refreshCategories();
      showToast("Category deleted successfully", "success");
    } catch (e) {
      showToast("Failed to delete category", "error");
    } finally {
      setDeleteId(null);
    }
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingCategory(null);
    setFormData(initialFormData);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: editingCategory ? formData.slug : generateSlug(name),
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.slug) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    try {
      if (editingCategory) {
        await updateGalleryCategory(editingCategory.id, formData);
        showToast("Category updated successfully", "success");
      } else {
        await createGalleryCategory(formData);
        showToast("Category created successfully", "success");
      }

      await refreshCategories();
      handleFormClose();
    } catch (e: any) {
      const msg =
        e?.response?.data?.error || "Something went wrong. Please try again.";
      showToast(msg, "error");
    }
  };

  const columns: Column<GalleryCategory>[] = [
    {
      key: "order",
      header: "#",
      sortable: true,
      className: "w-16",
    },
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (category) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
            <FolderOpen className="h-5 w-5 text-muted-foreground" />
          </div>
          <span className="font-medium text-foreground">{category.name}</span>
        </div>
      ),
    },
    {
      key: "slug",
      header: "Slug",
      render: (category) => (
        <code className="rounded bg-secondary px-2 py-1 text-sm text-muted-foreground">
          {category.slug}
        </code>
      ),
    },
    {
      key: "images",
      header: "Images",
      render: (category) => {
        const count = getGalleryImagesByCategory(category.id).length;
        return <span className="text-muted-foreground">{count} images</span>;
      },
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (category) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(category);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteId(category.id);
            }}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gallery Categories"
        description="Organize your gallery images into categories."
        actions={
          <Button
            onClick={() => setFormOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        }
      />

      <DataTable
        data={categories}
        columns={columns}
        searchable
        searchKeys={["name", "slug"]}
        emptyMessage="No categories found. Create your first category!"
      />

      {/* Form Dialog */}
      <Dialog
        open={formOpen}
        onOpenChange={(open) => {
          if (!open) handleFormClose();
        }}
      >
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingCategory ? "Edit Category" : "Create Category"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <FormSection>
              <FormField label="Category Name" htmlFor="name" required>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Beach Tours"
                  className="bg-input border-border"
                />
              </FormField>

              <FormGrid columns={2}>
                <FormField label="Slug" htmlFor="slug" required>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="beach-tours"
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
            </FormSection>

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
                {editingCategory ? "Update Category" : "Create Category"}
              </Button>
            </FormActions>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Category"
        description="Are you sure you want to delete this category? All images in this category will also be deleted. This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
