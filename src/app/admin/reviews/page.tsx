"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  getReviewsAdmin,
  createReview,
  updateReview,
  deleteReview,
  Review,
} from "@/services/reviews.service";

const initialFormData = {
  name: "",
  country: "",
  stars: 5 as 1 | 2 | 3 | 4 | 5,
  content: "",
  date: "",
  featured: false,
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "fill-accent text-accent" : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    (async () => {
      try {
        const items = await getReviewsAdmin();
        setReviews(items);
      } catch (e: any) {
        showToast(e.message || "Failed to load reviews", "error");
      }
    })();
  }, [showToast]);

  useEffect(() => {
    if (editingReview) {
      setFormData({
        name: editingReview.name,
        country: editingReview.country || "",
        stars: editingReview.stars,
        content: editingReview.content,
        date: editingReview.date || "",
        featured: editingReview.featured,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editingReview]);

  const refreshReviews = async () => {
    const items = await getReviewsAdmin();
    setReviews(items);
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteReview(deleteId);
      await refreshReviews();
      showToast("Review deleted successfully", "success");
    } catch (e: any) {
      showToast(e.message || "Delete failed", "error");
    } finally {
      setDeleteId(null);
    }
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingReview(null);
    setFormData(initialFormData);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.content) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    const reviewData = {
      ...formData,
      country: formData.country || undefined,
      date: formData.date || undefined,
    };

    try {
      if (editingReview) {
        await updateReview(editingReview.id, reviewData);
        showToast("Review updated successfully", "success");
      } else {
        await createReview(reviewData);
        showToast("Review created successfully", "success");
      }

      await refreshReviews();
      handleFormClose();
    } catch (e: any) {
      showToast(e.message || "Save failed", "error");
    }
  };

  const columns: Column<Review>[] = [
    {
      key: "name",
      header: "Reviewer",
      sortable: true,
      render: (review) => (
        <div>
          <span className="font-medium text-foreground">{review.name}</span>
          {review.country && (
            <span className="block text-xs text-muted-foreground">
              {review.country}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "stars",
      header: "Rating",
      sortable: true,
      render: (review) => <StarRating rating={review.stars} />,
    },
    {
      key: "content",
      header: "Review",
      render: (review) => (
        <span className="text-muted-foreground line-clamp-2">
          {review.content}
        </span>
      ),
    },
    {
      key: "date",
      header: "Date",
      sortable: true,
      render: (review) => (
        <span className="text-muted-foreground">{review.date || "N/A"}</span>
      ),
    },
    {
      key: "featured",
      header: "Status",
      render: (review) => (
        <Badge
          variant={review.featured ? "default" : "secondary"}
          className={
            review.featured
              ? "bg-accent text-accent-foreground"
              : "bg-secondary text-secondary-foreground"
          }
        >
          {review.featured ? "Featured" : "Standard"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (review) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(review);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteId(review.id);
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
        title="Reviews"
        description="Manage customer reviews and testimonials."
        actions={
          <Button
            onClick={() => setFormOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Review
          </Button>
        }
      />

      <DataTable
        data={reviews}
        columns={columns}
        searchable
        searchKeys={["name", "content", "country"]}
        emptyMessage="No reviews found. Add your first review!"
      />

      {/* Form Dialog */}
      <Dialog open={formOpen} onOpenChange={handleFormClose}>
        <DialogContent className="max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingReview ? "Edit Review" : "Add Review"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <FormSection>
              <FormGrid columns={2}>
                <FormField label="Reviewer Name" htmlFor="name" required>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="John Smith"
                    className="bg-input border-border"
                  />
                </FormField>

                <FormField label="Country" htmlFor="country">
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    placeholder="United Kingdom"
                    className="bg-input border-border"
                  />
                </FormField>
              </FormGrid>

              <FormGrid columns={2}>
                <FormField label="Rating" htmlFor="stars" required>
                  <Select
                    value={String(formData.stars)}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        stars: parseInt(value) as 1 | 2 | 3 | 4 | 5,
                      })
                    }
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 4, 3, 2, 1].map((num) => (
                        <SelectItem key={num} value={String(num)}>
                          {num} {num === 1 ? "Star" : "Stars"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Date" htmlFor="date">
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="bg-input border-border"
                  />
                </FormField>
              </FormGrid>

              <FormField label="Review Content" htmlFor="content" required>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Amazing experience! The tour was..."
                  className="bg-input border-border min-h-[100px]"
                />
              </FormField>

              <div className="flex items-center gap-3">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, featured: checked })
                  }
                />
                <Label htmlFor="featured" className="text-foreground">
                  Featured review (shown prominently)
                </Label>
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
                {editingReview ? "Update Review" : "Add Review"}
              </Button>
            </FormActions>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Review"
        description="Are you sure you want to delete this review? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
