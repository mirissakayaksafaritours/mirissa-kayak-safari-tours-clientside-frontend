import type { ReactNode } from 'react'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminTopbar } from '@/components/admin/admin-topbar'
import { ToastProvider } from '@/components/admin/toast-provider'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-background">
        <AdminSidebar />
        <div className="lg:pl-64">
          <AdminTopbar />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </ToastProvider>
  )
}
