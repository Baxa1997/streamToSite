'use client'

import DashboardLayout from '@/components/DashboardLayout'
import { 
  Eye, 
  DollarSign, 
  Video, 
  TrendingUp,
  Clock,
  CheckCircle2,
  FileEdit,
  Loader2
} from 'lucide-react'

const stats = [
  {
    name: 'Total Site Views',
    value: '124,582',
    change: '+12.5%',
    icon: Eye,
    color: 'blue',
  },
  {
    name: 'AdSense Revenue',
    value: '$2,847',
    change: '+8.2%',
    icon: DollarSign,
    color: 'green',
  },
  {
    name: 'Converted Videos',
    value: '47',
    change: '+5 this week',
    icon: Video,
    color: 'purple',
  },
  {
    name: 'Avg SEO Score',
    value: '92/100',
    change: '+3 points',
    icon: TrendingUp,
    color: 'primary',
  },
]

const recentActivity = [
  {
    id: 1,
    title: 'Inception Ending Explained - Mind-Bending Analysis',
    status: 'published',
    views: '12,453',
    revenue: '$124.50',
    date: '2 hours ago',
  },
  {
    id: 2,
    title: 'Breaking: New AI Regulations Announced',
    status: 'published',
    views: '8,921',
    revenue: '$89.20',
    date: '5 hours ago',
  },
  {
    id: 3,
    title: 'The Dark Knight - Why It\'s Still Relevant',
    status: 'processing',
    views: '-',
    revenue: '-',
    date: '1 hour ago',
  },
  {
    id: 4,
    title: 'Tech News Roundup - January 2026',
    status: 'draft',
    views: '-',
    revenue: '-',
    date: '3 hours ago',
  },
  {
    id: 5,
    title: 'Interstellar Science Breakdown',
    status: 'published',
    views: '15,234',
    revenue: '$152.30',
    date: '1 day ago',
  },
]

const getStatusBadge = (status) => {
  switch (status) {
    case 'published':
      return <span className="badge-success">Published</span>
    case 'processing':
      return <span className="badge-warning">Processing</span>
    case 'draft':
      return <span className="badge-info">Draft</span>
    default:
      return <span className="badge">{status}</span>
  }
}

const getStatusIcon = (status) => {
  switch (status) {
    case 'published':
      return <CheckCircle2 className="w-4 h-4 text-green-400" />
    case 'processing':
      return <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />
    case 'draft':
      return <FileEdit className="w-4 h-4 text-blue-400" />
    default:
      return null
  }
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Welcome back, <span className="text-gradient">John</span>
          </h1>
          <p className="text-text/70">
            Here's what's happening with your content empire
          </p>
        </div>

        {/* Stats Grid - Bento Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const colorClasses = {
              blue: 'bg-blue-500/10 text-blue-400',
              green: 'bg-green-500/10 text-green-400',
              purple: 'bg-purple-500/10 text-purple-400',
              primary: 'bg-primary/10 text-primary',
            }

            return (
              <div
                key={stat.name}
                className="bento-card animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${colorClasses[stat.color]} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-green-400">
                    {stat.change}
                  </span>
                </div>
                
                <div>
                  <p className="text-text/60 text-sm mb-1">{stat.name}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          <a
            href="/dashboard/studio"
            className="card-hover group cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Create New Post</h3>
                <p className="text-sm text-text/60">Convert a video to blog</p>
              </div>
            </div>
          </a>

          <a
            href="/dashboard/builder"
            className="card-hover group cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Customize Site</h3>
                <p className="text-sm text-text/60">Update theme & domain</p>
              </div>
            </div>
          </a>

          <a
            href="/dashboard/monetization"
            className="card-hover group cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">View Analytics</h3>
                <p className="text-sm text-text/60">Track your revenue</p>
              </div>
            </div>
          </a>
        </div>

        {/* Recent Activity */}
        <div className="bento-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Activity</h2>
            <a href="#" className="text-sm text-primary hover:underline">
              View All
            </a>
          </div>

          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-background/50 border border-border-color hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-start space-x-4 mb-3 sm:mb-0 flex-1">
                  <div className="mt-1">
                    {getStatusIcon(item.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors truncate">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-text/60">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.date}</span>
                      </span>
                      {getStatusBadge(item.status)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm sm:ml-4">
                  <div className="text-right">
                    <p className="text-text/60 text-xs mb-1">Views</p>
                    <p className="font-semibold">{item.views}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-text/60 text-xs mb-1">Revenue</p>
                    <p className="font-semibold text-green-400">{item.revenue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="bento-card">
          <h2 className="text-2xl font-bold mb-6">Performance Overview</h2>
          <div className="h-64 rounded-lg bg-background/50 border border-border-color flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-text/20 mx-auto mb-3" />
              <p className="text-text/60">Chart visualization coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
