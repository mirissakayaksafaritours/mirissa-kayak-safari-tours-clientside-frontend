"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, User, X } from "lucide-react";
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
import {
  ImageUploader,
  UploadedImage,
} from "@/components/admin/image-uploader";
import { useToast } from "@/components/admin/toast-provider";
import {
  getGuidesAdmin,
  createGuide,
  updateGuide,
  deleteGuide,
  Guide,
} from "@/services/guides.service";

const initialFormData = {
  name: "",
  role: "",
  languages: [] as string[],
  yearsExperience: 1,
  profilePhoto: "",
};

export default function GuidesPage() {
  const { showToast } = useToast();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [newLanguage, setNewLanguage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getGuidesAdmin();

        setGuides(data);
      } catch (e) {
        showToast("Failed to load guides", "error");
      }
    })();
  }, [showToast]);

  const refreshGuides = async () => {
    const data = await getGuidesAdmin();
    setGuides(data);
  };

  useEffect(() => {
    if (editingGuide) {
      setFormData({
        name: editingGuide.name,
        role: editingGuide.role,
        languages: editingGuide.languages,
        yearsExperience: editingGuide.yearsExperience,
        profilePhoto: editingGuide.profilePhoto,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editingGuide]);

  const handleEdit = (guide: Guide) => {
    setEditingGuide(guide);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteGuide(deleteId);
      await refreshGuides();
      showToast("Guide deleted successfully", "success");
    } catch (e) {
      showToast("Delete failed", "error");
    } finally {
      setDeleteId(null);
    }
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingGuide(null);
    setFormData(initialFormData);
    setNewLanguage("");
  };

  const addLanguage = () => {
    if (
      newLanguage.trim() &&
      !formData.languages.includes(newLanguage.trim())
    ) {
      setFormData({
        ...formData,
        languages: [...formData.languages, newLanguage.trim()],
      });
      setNewLanguage("");
    }
  };

  const removeLanguage = (index: number) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.role || !formData.profilePhoto) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    try {
      const guideData = { ...formData };

      if (editingGuide) {
        await updateGuide(editingGuide.id, guideData);
        showToast("Guide updated successfully", "success");
      } else {
        await createGuide(guideData as any);
        showToast("Guide created successfully", "success");
      }

      await refreshGuides();
      handleFormClose();
    } catch (e) {
      showToast("Save failed (check admin login)", "error");
    }
  };

  const uploaderValue: UploadedImage | undefined = formData.profilePhoto
    ? {
        url: formData.profilePhoto,
        key: "existing-image",
      }
    : undefined;

  const columns: Column<Guide>[] = [
    {
      key: "name",
      header: "Guide",
      sortable: true,
      render: (guide) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-secondary">
            {guide.profilePhoto ? (
              <img
                src={guide.profilePhoto || "/placeholder.svg"}
                alt={guide.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </div>
          <div>
            <span className="font-medium text-foreground">{guide.name}</span>
            <span className="block text-xs text-muted-foreground">
              {guide.role}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "languages",
      header: "Languages",
      render: (guide) => (
        <div className="flex flex-wrap gap-1">
          {guide.languages.slice(0, 3).map((lang) => (
            <span
              key={lang}
              className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
            >
              {lang}
            </span>
          ))}
          {guide.languages.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{guide.languages.length - 3} more
            </span>
          )}
        </div>
      ),
    },
    {
      key: "yearsExperience",
      header: "Experience",
      sortable: true,
      render: (guide) => (
        <span className="text-muted-foreground">
          {guide.yearsExperience} years
        </span>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (guide) => (
        <span className="text-muted-foreground">{guide.role}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (guide) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(guide);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteId(guide.id);
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
        title="Tour Guides"
        description="Manage your team of tour guides."
        actions={
          <Button
            onClick={() => setFormOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Guide
          </Button>
        }
      />

      <DataTable
        data={guides}
        columns={columns}
        searchable
        searchKeys={["name", "role"]}
        emptyMessage="No guides found. Add your first guide!"
      />

      {/* Form Dialog */}
      <Dialog open={formOpen} onOpenChange={handleFormClose}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingGuide ? "Edit Guide" : "Add Guide"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <FormSection title="Profile Photo">
              <ImageUploader
                value={uploaderValue}
                onChange={(value) => {
                  if (!value) {
                    setFormData({ ...formData, profilePhoto: "" });
                    return;
                  }

                  const url = Array.isArray(value) ? value[0]?.url : value.url;
                  setFormData({ ...formData, profilePhoto: url || "" });
                }}
              />
            </FormSection>

            <FormSection title="Basic Information">
              <FormGrid columns={2}>
                <FormField label="Full Name" htmlFor="name" required>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Kasun Perera"
                    className="bg-input border-border"
                  />
                </FormField>

                <FormField label="Role / Title" htmlFor="role" required>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    placeholder="Lead Guide"
                    className="bg-input border-border"
                  />
                </FormField>
              </FormGrid>

              <FormGrid columns={2}>
                <FormField
                  label="Years of Experience"
                  htmlFor="yearsExperience"
                  required
                >
                  <Input
                    id="yearsExperience"
                    type="number"
                    min={0}
                    value={formData.yearsExperience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        yearsExperience: parseInt(e.target.value) || 0,
                      })
                    }
                    className="bg-input border-border"
                  />
                </FormField>
              </FormGrid>
            </FormSection>

            <FormSection title="Languages Spoken">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="Add a language (e.g., English, German)"
                    className="bg-input border-border"
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addLanguage())
                    }
                  />
                  <Button
                    type="button"
                    onClick={addLanguage}
                    variant="secondary"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.languages.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                      >
                        {lang}
                        <button
                          type="button"
                          onClick={() => removeLanguage(index)}
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
                {editingGuide ? "Update Guide" : "Add Guide"}
              </Button>
            </FormActions>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Guide"
        description="Are you sure you want to delete this guide? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
