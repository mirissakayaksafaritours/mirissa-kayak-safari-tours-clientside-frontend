import { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { ToastProvider } from "@/components/admin/toast-provider";
import { AdminGuard } from "./AdminGuard";

export const metadata: Metadata = {
  title: "Admin CMS Dashboard",
  description: "Content Management System for managing website content",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon1.png", type: "image/png" },
      { url: "/icon0.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },

  manifest: "/manifest.json",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <AdminGuard>
        <div className="min-h-screen bg-background">
          <AdminSidebar />
          <div className="lg:pl-64">
            <AdminTopbar />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </AdminGuard>
    </ToastProvider>
  );
}
