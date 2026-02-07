'use client'

import DashboardLayout from '@/components/DashboardLayout'
import { 
  Eye, 
  DollarSign, 
  Globe, 
  FileText,
  TrendingUp,
  MoreHorizontal,
  ExternalLink,
  Edit3,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'

// Stat Cards Data
const stats = [
  {
    name: 'Total Views',
    value: '124,582',
    change: '+12.5%',
    changeType: 'positive',
    icon: Eye,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    sparkline: [40, 55, 45, 60, 75, 65, 80, 90, 85, 95, 100, 110],
  },
  {
    name: 'Active Sites',
    value: '3',
    change: '+1 this week',
    changeType: 'positive',
    icon: Globe,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    name: 'Est. Revenue',
    value: '$2,847',
    change: '+23.1%',
    changeType: 'positive',
    icon: DollarSign,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    name: 'Words Generated',
    value: '847K',
    change: '+45K this month',
    changeType: 'positive',
    icon: FileText,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
]

// Recent Activity Data
const recentActivity = [
  {
    id: 1,
    title: 'Inception Ending Explained - Mind-Bending Analysis',
    thumbnail: '🎬',
    status: 'published',
    date: '2 hours ago',
    views: '12,453',
    slug: 'inception-ending-explained',
  },
  {
    id: 2,
    title: 'Breaking: New AI Regulations Announced by EU',
    thumbnail: '🤖',
    status: 'published',
    date: '5 hours ago',
    views: '8,921',
    slug: 'ai-regulations-eu',
  },
  {
    id: 3,
    title: 'The Dark Knight - Why It\'s Still Relevant in 2026',
    thumbnail: '🦇',
    status: 'draft',
    date: '1 day ago',
    views: '-',
    slug: 'dark-knight-analysis',
  },
  {
    id: 4,
    title: 'Tech News Roundup - January 2026 Edition',
    thumbnail: '📱',
    status: 'published',
    date: '2 days ago',
    views: '15,234',
    slug: 'tech-news-january',
  },
  {
    id: 5,
    title: 'Interstellar Science Breakdown - Real Physics Explained',
    thumbnail: '🌌',
    status: 'published',
    date: '3 days ago',
    views: '22,891',
    slug: 'interstellar-science',
  },
]

// Status Badge Component
const StatusBadge = ({ status }) => {
  const styles = {
    published: 'badge-success',
    draft: 'badge-neutral',
    processing: 'badge-warning',
  }
  
  const labels = {
    published: 'Published',
    draft: 'Draft',
    processing: 'Processing',
  }
  
  return (
    <span className={styles[status] || 'badge-neutral'}>
      {labels[status] || status}
    </span>
  )
}

// Sparkline Component
const Sparkline = ({ data }) => {
  const max = Math.max(...data)
  
  return (
    <div className="sparkline">
      {data.map((value, index) => (
        <div
          key={index}
          className="sparkline-bar"
          style={{ height: `${(value / max) * 100}%` }}
        />
      ))}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Welcome back, <span className="text-gradient-red">John</span>
          </h1>
          <p className="text-neutral-500 mt-1">
            Here's what's happening with your content empire today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            
            return (
              <div key={stat.name} className="stat-card">
                <div className="flex items-start justify-between">
                  <div className={`stat-card-icon ${stat.iconBg}`}>
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  {stat.changeType === 'positive' ? (
                    <div className="flex items-center gap-1 stat-card-change-positive">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>{stat.change}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 stat-card-change-negative">
                      <ArrowDownRight className="w-3.5 h-3.5" />
                      <span>{stat.change}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <p className="stat-card-value">{stat.value}</p>
                  <p className="stat-card-label mt-1">{stat.name}</p>
                </div>
                
                {stat.sparkline && (
                  <div className="mt-4">
                    <Sparkline data={stat.sparkline} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/create" className="card-interactive p-5 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <Sparkles className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 group-hover:text-red-600 transition-colors">
                  Create New Content
                </h3>
                <p className="text-sm text-neutral-500">Transform a video into a blog post</p>
              </div>
            </div>
          </Link>
          
          <Link href="/dashboard/sites" className="card-interactive p-5 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                <Globe className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 group-hover:text-emerald-600 transition-colors">
                  Manage Sites
                </h3>
                <p className="text-sm text-neutral-500">Configure domains & settings</p>
              </div>
            </div>
          </Link>
          
          <Link href="/dashboard/monetization" className="card-interactive p-5 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 group-hover:text-purple-600 transition-colors">
                  View Analytics
                </h3>
                <p className="text-sm text-neutral-500">Track revenue & performance</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity Table */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-900">Recent Activity</h2>
            <Link href="/dashboard/studio" className="btn-ghost text-sm">
              View All
            </Link>
          </div>
          
          <div className="table-wrapper">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th className="table-header-cell">Content</th>
                  <th className="table-header-cell">Status</th>
                  <th className="table-header-cell hidden sm:table-cell">Date</th>
                  <th className="table-header-cell hidden md:table-cell">Views</th>
                  <th className="table-header-cell text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((item) => (
                  <tr key={item.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-xl">
                          {item.thumbnail}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-neutral-900 truncate max-w-[200px] sm:max-w-[300px]">
                            {item.title}
                          </p>
                          <p className="text-xs text-neutral-500 sm:hidden">
                            {item.date}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="table-cell hidden sm:table-cell">
                      <div className="flex items-center gap-1.5 text-neutral-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
                      </div>
                    </td>
                    <td className="table-cell hidden md:table-cell">
                      <span className="font-medium text-neutral-900">{item.views}</span>
                    </td>
                    <td className="table-cell text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link 
                          href={`/dashboard/editor/${item.id}`}
                          className="btn-icon"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        {item.status === 'published' && (
                          <a 
                            href={`#`}
                            className="btn-icon"
                            title="View Live"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button className="btn-icon" title="More options">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Overview Placeholder */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-neutral-900">Performance Overview</h2>
          </div>
          <div className="card-body">
            <div className="h-64 rounded-lg bg-neutral-50 border-2 border-dashed border-neutral-200 flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <p className="text-neutral-500">Chart visualization coming soon</p>
                <p className="text-sm text-neutral-400 mt-1">Track your views, revenue, and engagement over time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
