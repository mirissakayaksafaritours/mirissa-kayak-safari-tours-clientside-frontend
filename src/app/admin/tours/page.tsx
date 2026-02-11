"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/admin/page-header";
import { DataTable, type Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { useToast } from "@/components/admin/toast-provider";
import {
  getTourPackagesAdmin,
  deleteTourPackage,
  type TourPackage,
} from "@/services/tourPackages.service";
import { TourFormDialog } from "./tour-form-dialog";

export default function ToursPage() {
  const { showToast } = useToast();
  const [tours, setTours] = useState<TourPackage[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<TourPackage | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    refreshTours();
  }, []);

  const refreshTours = async () => {
    const rows = await getTourPackagesAdmin();
    setTours(rows);
  };

  const handleEdit = (tour: TourPackage) => {
    setEditingTour(tour);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteTourPackage(deleteId);
      await refreshTours();
      showToast("Tour package deleted successfully", "success");
    } catch (e: any) {
      showToast(e?.response?.data?.message || "Delete failed", "error");
    } finally {
      setDeleteId(null);
    }
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingTour(null);
  };

  const handleFormSuccess = () => {
    refreshTours();
    handleFormClose();
  };

  const columns: Column<TourPackage>[] = [
    {
      key: "title",
      header: "Title",
      sortable: true,
      render: (tour) => (
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">{tour.title}</span>
          {tour.isFeatured && (
            <Star className="h-4 w-4 fill-accent text-accent" />
          )}
        </div>
      ),
    },
    {
      key: "duration",
      header: "Duration",
      sortable: true,
    },
    // {
    //   key: "priceLKR",
    //   header: "Price (LKR)",
    //   sortable: true,
    //   render: (tour) => (
    //     <span className="text-foreground">
    //       Rs. {tour.priceLKR.toLocaleString()}
    //     </span>
    //   ),
    // },
    {
      key: "isFeatured",
      header: "Status",
      render: (tour) => (
        <Badge
          variant={tour.isFeatured ? "default" : "secondary"}
          className={
            tour.isFeatured
              ? "bg-accent text-accent-foreground"
              : "bg-secondary text-secondary-foreground"
          }
        >
          {tour.isFeatured ? "Featured" : "Standard"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (tour) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(tour);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteId(tour.id);
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
        title="Tour Packages"
        description="Manage your tour packages and pricing."
        actions={
          <Button
            onClick={() => setFormOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Tour
          </Button>
        }
      />

      <DataTable
        data={tours}
        columns={columns}
        searchable
        searchKeys={["title", "shortDescription"]}
        emptyMessage="No tour packages found. Create your first tour!"
      />

      <TourFormDialog
        open={formOpen}
        onOpenChange={handleFormClose}
        tour={editingTour}
        onSuccess={handleFormSuccess}
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Tour Package"
        description="Are you sure you want to delete this tour package? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
