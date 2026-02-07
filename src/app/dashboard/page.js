'use client'

import DashboardLayout from '@/components/DashboardLayout'
import { 
  Eye, 
  DollarSign, 
  Globe, 
  FileText,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Link2,
  MousePointer,
  BarChart3,
  Clock,
  User,
  ExternalLink,
  Edit3,
  CheckCircle2
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

// Recent Activity Data with expanded fields to match reference image
const recentActivity = [
  {
    id: 1,
    title: 'Exploring the iPhone 16e: A Comprehensive Review of Features and Performance',
    thumbnail: '/api/placeholder/160/100',
    thumbnailEmoji: '📱',
    status: 'published',
    author: 'Sm Onil',
    date: '12 Mar 2025',
    lastEdited: '1 hour ago',
    excerpt: 'As I unwrapped my new iPhone 16e, I felt the thrill of anticipation. This phone promised a sleek design and robust features, but would it meet my expectations? After a week of testing, I\'ve compiled my thoughts to share what it\'s really like to use this device daily. Join me on this exploration as we delve into every nook and cranny of the iPhone 16e, from its minimalist design to its mysterious new...',
    words: 1973,
    links: 4,
    clicks: 0,
    earnings: 0,
    cr: '0.00%',
    slug: 'iphone-16e-review',
  },
  {
    id: 2,
    title: 'Unleashing Creativity: The Best AI Writer Tools in 2023',
    thumbnail: '/api/placeholder/160/100',
    thumbnailEmoji: '🤖',
    status: 'published',
    author: 'Sm Onil',
    date: '04 Mar 2025',
    lastEdited: '12 minutes ago',
    excerpt: 'As a writer, I\'ve often faced the daunting blank page, feeling paralyzed by the sheer volume of possibilities. It was during one of my creative slumps that I stumbled upon AI writing tools that promised not just to alleviate the pressure but also to aid my creativity. In this post, let\'s delve into how these tools can be game changers for writers in 2023 and beyond! The Transformative Power of AI Writing Too...',
    words: 2084,
    links: 6,
    clicks: 0,
    earnings: 0,
    cr: '0.00%',
    slug: 'ai-writer-tools-2023',
  },
  {
    id: 3,
    title: '10 Must-Have Gadgets for Kids: Essential Tools for the Modern Parent',
    thumbnail: '/api/placeholder/160/100',
    thumbnailEmoji: '🧸',
    status: 'published',
    author: 'Sm Onil',
    date: '13 Feb 2025',
    lastEdited: 'last month',
    excerpt: 'As a parent, I often find myself amidst a whirlwind of tech promising to be the next big learning tool. I remember the day my child received a coding robot for their birthday; it not only entertained them for hours but also sparked a curiosity that I\'d never anticipated. If you\'re like me, standing at the crossroads of overwhelming options, then this guide to the...',
    words: 2017,
    links: 0,
    clicks: 0,
    earnings: 0,
    cr: '0.00%',
    slug: 'gadgets-for-kids',
  },
]

// Status Badge Component (matching reference image style)
const StatusBadge = ({ status }) => {
  const styles = {
    published: 'bg-orange-500 text-white',
    draft: 'bg-neutral-400 text-white',
    processing: 'bg-amber-500 text-white',
  }
  
  const labels = {
    published: 'PUBLISHED',
    draft: 'DRAFT',
    processing: 'PROCESSING',
  }
  
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${styles[status] || 'bg-neutral-400 text-white'}`}>
      <CheckCircle2 className="w-3 h-3" />
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

// Post Card Component (matching reference image)
const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4 hover:shadow-lg transition-all duration-200">
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="w-40 h-24 rounded-lg bg-neutral-100 flex-shrink-0 overflow-hidden flex items-center justify-center">
          <span className="text-4xl">{post.thumbnailEmoji}</span>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="font-semibold text-neutral-900 text-base mb-2 line-clamp-1">
            {post.title}
          </h3>
          
          {/* Author & Date Row */}
          <div className="flex items-center gap-4 text-xs text-neutral-500 mb-2">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.date}
            </span>
            <span className="text-neutral-400">
              · Last edited {post.lastEdited}
            </span>
          </div>
          
          {/* Excerpt */}
          <p className="text-xs text-neutral-600 line-clamp-2 mb-3">
            {post.excerpt}
          </p>
          
          {/* Stats Row */}
          <div className="flex items-center gap-4 text-xs mb-3">
            <span className="flex items-center gap-1 text-neutral-600">
              <FileText className="w-3 h-3 text-blue-500" />
              <span className="text-blue-500 font-medium">WORDS:</span>
              <span className="text-neutral-800 font-medium">{post.words.toLocaleString()}</span>
            </span>
            <span className="flex items-center gap-1 text-neutral-600">
              <Link2 className="w-3 h-3 text-purple-500" />
              <span className="text-purple-500 font-medium">LINKS:</span>
              <span className="text-neutral-800 font-medium">{post.links}</span>
            </span>
            <span className="flex items-center gap-1 text-neutral-600">
              <MousePointer className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-500 font-medium">CLICKS:</span>
              <span className="text-neutral-800 font-medium">{post.clicks}</span>
            </span>
            <span className="flex items-center gap-1 text-neutral-600">
              <DollarSign className="w-3 h-3 text-green-500" />
              <span className="text-green-500 font-medium">EARNINGS:</span>
              <span className="text-neutral-800 font-medium">${post.earnings}</span>
            </span>
            <span className="flex items-center gap-1 text-neutral-600">
              <BarChart3 className="w-3 h-3 text-orange-500" />
              <span className="text-orange-500 font-medium">CR:</span>
              <span className="text-neutral-800 font-medium">{post.cr}</span>
            </span>
          </div>
          
          {/* Status Badge */}
          <StatusBadge status={post.status} />
        </div>
        
        {/* Actions */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          <Link 
            href={`/dashboard/editor/${post.id}`}
            className="px-4 py-2 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors border border-neutral-200"
          >
            View Details
          </Link>
          <Link 
            href={`/dashboard/editor/${post.id}`}
            className="px-4 py-2 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors border border-neutral-200"
          >
            Edit Blog
          </Link>
        </div>
      </div>
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

        {/* Recent Activity - New Card Layout */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900">Recent Activity</h2>
            <Link href="/dashboard/studio" className="btn-ghost text-sm">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
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
