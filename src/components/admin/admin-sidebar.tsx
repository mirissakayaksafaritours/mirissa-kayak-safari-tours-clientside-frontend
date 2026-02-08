"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Map,
  HelpCircle,
  Clock,
  Star,
  ImageIcon,
  FolderOpen,
  Users,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { logoutAdmin } from "@/services/auth.service";
import { useEffect, useState } from "react";
import { getAdminMe } from "@/services/admin.service";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/tours", label: "Tour Packages", icon: Map },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  {
    href: "/admin/gallery/categories",
    label: "Gallery Categories",
    icon: FolderOpen,
  },
  { href: "/admin/gallery/images", label: "Gallery Images", icon: ImageIcon },
  { href: "/admin/guides", label: "Guides", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const [admin, setAdmin] = useState<{ name: string; email: string } | null>(
    () => {
      if (typeof window === "undefined") return null;
      const raw = localStorage.getItem("admin_me");
      return raw ? JSON.parse(raw) : null;
    },
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("admin_me");
      if (raw) setAdmin(JSON.parse(raw));
    } catch {}

    getAdminMe()
      .then((a) => {
        setAdmin(a);
        localStorage.setItem("admin_me", JSON.stringify(a));
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await logoutAdmin();
    router.replace("/");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-sidebar-border px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <LayoutDashboard className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">
              Admin CMS
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-sm font-medium text-sidebar-accent-foreground">
              {mounted ? (admin?.name?.charAt(0).toUpperCase() ?? "A") : "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                {mounted ? (admin?.name ?? "Admin") : "Admin"}
              </p>
              <p className="truncate text-xs text-sidebar-foreground/60">
                {mounted ? (admin?.email ?? "") : ""}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-8 w-8 text-sidebar-foreground/70 hover:text-sidebar-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
