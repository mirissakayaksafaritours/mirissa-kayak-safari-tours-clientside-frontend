"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
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
  getFaqsAdmin,
  createFaq,
  updateFaq,
  deleteFaq,
  FAQ,
} from "@/services/faq.service";

const initialFormData = {
  question: "",
  answer: "",
  order: 1,
  active: true,
};

export default function FAQPage() {
  const { showToast } = useToast();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    refreshFAQs();
  }, []);

  useEffect(() => {
    getFaqsAdmin().then(setFaqs);
  }, []);

  useEffect(() => {
    if (editingFAQ) {
      setFormData({
        question: editingFAQ.question,
        answer: editingFAQ.answer,
        order: editingFAQ.order,
        active: editingFAQ.isActive,
      });
    } else {
      setFormData({ ...initialFormData, order: faqs.length + 1 });
    }
  }, [editingFAQ, faqs.length]);

  const refreshFAQs = async () => {
    const rows = await getFaqsAdmin();
    setFaqs(rows);
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteFaq(deleteId);
      await refreshFAQs();
      showToast("FAQ deleted successfully", "success");
    } catch (e: any) {
      showToast(e?.response?.data?.message || "Delete failed", "error");
    } finally {
      setDeleteId(null);
    }
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingFAQ(null);
    setFormData(initialFormData);
  };

  const handleSubmit = async () => {
    if (!formData.question || !formData.answer) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    const payload = {
      question: formData.question,
      answer: formData.answer,
      order: formData.order,
      isActive: formData.active,
    };

    try {
      if (editingFAQ) {
        await updateFaq(editingFAQ._id, payload);
        showToast("FAQ updated successfully", "success");
      } else {
        await createFaq(payload);
        showToast("FAQ created successfully", "success");
      }

      await refreshFAQs();
      handleFormClose();
    } catch (e: any) {
      showToast(e?.response?.data?.message || "Save failed", "error");
    }
  };

  const columns: Column<FAQ>[] = [
    {
      key: "order",
      header: "#",
      sortable: true,
      className: "w-16",
      render: (faq) => (
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
          <span>{faq.order}</span>
        </div>
      ),
    },
    {
      key: "question",
      header: "Question",
      sortable: true,
      render: (faq) => (
        <span className="font-medium text-foreground line-clamp-2">
          {faq.question}
        </span>
      ),
    },
    {
      key: "answer",
      header: "Answer",
      render: (faq) => (
        <span className="text-muted-foreground line-clamp-2">{faq.answer}</span>
      ),
    },
    {
      key: "active",
      header: "Status",
      render: (faq) => (
        <Badge
          variant={faq.isActive ? "default" : "secondary"}
          className={
            faq.isActive
              ? "bg-accent text-accent-foreground"
              : "bg-secondary text-secondary-foreground"
          }
        >
          {faq.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (faq) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(faq);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteId(faq.id);
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
        title="FAQ"
        description="Manage frequently asked questions for your website."
        actions={
          <Button
            onClick={() => {
              setEditingFAQ(null);
              setFormOpen(true);
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add FAQ
          </Button>
        }
      />

      <DataTable
        data={faqs}
        columns={columns}
        searchable
        searchKeys={["question", "answer"]}
        emptyMessage="No FAQs found. Create your first FAQ!"
      />

      {/* Form Dialog */}
      <Dialog open={formOpen} onOpenChange={handleFormClose}>
        <DialogContent className="max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingFAQ ? "Edit FAQ" : "Create FAQ"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <FormSection>
              <FormField label="Question" htmlFor="question" required>
                <Input
                  id="question"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  placeholder="What should I bring for the tour?"
                  className="bg-input border-border"
                />
              </FormField>

              <FormField label="Answer" htmlFor="answer" required>
                <Textarea
                  id="answer"
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData({ ...formData, answer: e.target.value })
                  }
                  placeholder="We recommend bringing comfortable shoes, sunscreen..."
                  className="bg-input border-border min-h-[100px]"
                />
              </FormField>

              <FormGrid columns={2}>
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

                <div className="flex items-end pb-2">
                  <div className="flex items-center gap-3">
                    <Switch
                      id="active"
                      checked={formData.active}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, active: checked })
                      }
                    />
                    <Label htmlFor="active" className="text-foreground">
                      Active
                    </Label>
                  </div>
                </div>
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
                {editingFAQ ? "Update FAQ" : "Create FAQ"}
              </Button>
            </FormActions>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete FAQ"
        description="Are you sure you want to delete this FAQ? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
