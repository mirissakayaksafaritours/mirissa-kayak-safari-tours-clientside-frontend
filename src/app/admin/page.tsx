'use client'

import Link from 'next/link'
import { Map, ImageIcon, Star, HelpCircle, Users, FolderOpen, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/admin/page-header'
import { getDashboardStats } from '@/lib/adminStore'

const quickLinks = [
  { href: '/admin/tours', label: 'Manage Tours', icon: Map },
  { href: '/admin/gallery/images', label: 'Upload Images', icon: ImageIcon },
  { href: '/admin/reviews', label: 'View Reviews', icon: Star },
  { href: '/admin/settings', label: 'Site Settings', icon: HelpCircle },
]

export default function AdminDashboard() {
  const stats = getDashboardStats()

  const statCards = [
    { label: 'Total Tours', value: stats.totalTours, icon: Map, href: '/admin/tours' },
    { label: 'Gallery Images', value: stats.totalGalleryImages, icon: ImageIcon, href: '/admin/gallery/images' },
    { label: 'Total Reviews', value: stats.totalReviews, icon: Star, href: '/admin/reviews' },
    { label: 'FAQ Items', value: stats.faqCount, icon: HelpCircle, href: '/admin/faq' },
    { label: 'Tour Guides', value: stats.totalGuides, icon: Users, href: '/admin/guides' },
    { label: 'Categories', value: stats.totalCategories, icon: FolderOpen, href: '/admin/gallery/categories' },
  ]

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your website content."
      />

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="bg-card border-border transition-colors hover:bg-secondary/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="outline"
                  className="w-full justify-between border-border bg-secondary/50 text-foreground hover:bg-secondary"
                >
                  <span className="flex items-center gap-2">
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Placeholder */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Tour package updated', item: 'Sunset Beach Tour', time: '2 hours ago' },
              { action: 'New review added', item: 'John Smith - 5 stars', time: '4 hours ago' },
              { action: 'Gallery image uploaded', item: 'Beach Tours category', time: '1 day ago' },
              { action: 'FAQ item created', item: 'Booking cancellation policy', time: '2 days ago' },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.item}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
