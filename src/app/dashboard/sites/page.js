'use client'

import DashboardLayout from '@/components/DashboardLayout'
import { 
  Globe, 
  Plus, 
  Settings, 
  ExternalLink, 
  BarChart3,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  Trash2,
  Copy,
  Shield,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// Sample sites data
const sitesData = [
  {
    id: 1,
    name: 'Movie King',
    domain: 'movieking.com',
    logo: '🎬',
    status: 'active',
    dnsStatus: 'active',
    adsStatus: 'active',
    sslStatus: 'active',
    posts: 47,
    views: '124.5K',
    revenue: '$2,847',
    lastUpdated: '2 hours ago',
  },
  {
    id: 2,
    name: 'Tech Pulse',
    domain: 'techpulse.streamtosite.com',
    logo: '💻',
    status: 'active',
    dnsStatus: 'pending',
    adsStatus: 'active',
    sslStatus: 'active',
    posts: 23,
    views: '45.2K',
    revenue: '$892',
    lastUpdated: '1 day ago',
  },
  {
    id: 3,
    name: 'Gaming Hub',
    domain: 'gaminghub.xyz',
    logo: '🎮',
    status: 'draft',
    dnsStatus: 'inactive',
    adsStatus: 'inactive',
    sslStatus: 'pending',
    posts: 5,
    views: '-',
    revenue: '-',
    lastUpdated: '3 days ago',
  },
]

// Status Indicator Component
const StatusIndicator = ({ status, label }) => {
  const configs = {
    active: {
      dot: 'bg-emerald-500',
      text: 'text-emerald-700',
      bg: 'bg-emerald-50',
      icon: CheckCircle2,
    },
    pending: {
      dot: 'bg-amber-500',
      text: 'text-amber-700',
      bg: 'bg-amber-50',
      icon: AlertCircle,
    },
    inactive: {
      dot: 'bg-neutral-400',
      text: 'text-neutral-600',
      bg: 'bg-neutral-100',
      icon: XCircle,
    },
  }
  
  const config = configs[status] || configs.inactive
  const Icon = config.icon
  
  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md ${config.bg}`}>
      <Icon className={`w-3.5 h-3.5 ${config.text}`} />
      <span className={`text-xs font-medium ${config.text}`}>{label}</span>
    </div>
  )
}

// Site Card Component - Compact Design
const SiteCard = ({ site }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  
  return (
    <div className="card hover:shadow-md transition-all duration-200 group">
      {/* Card Header */}
      <div className="p-4 flex items-center gap-3 border-b border-neutral-100">
        <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-xl flex-shrink-0">
          {site.logo}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-neutral-900 truncate text-sm">{site.name}</h3>
          <p className="text-xs text-neutral-500 truncate">{site.domain}</p>
        </div>
        <div className="relative">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn-icon w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          
          {menuOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-20">
                <button className="w-full px-3 py-2 text-left text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
                  <Copy className="w-3.5 h-3.5" />
                  Duplicate
                </button>
                <button className="w-full px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2">
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-4 space-y-3">
        {/* Status Indicators */}
        <div className="flex flex-wrap gap-1.5">
          <StatusIndicator status={site.dnsStatus} label="DNS" />
          <StatusIndicator status={site.adsStatus} label="Ads" />
          <StatusIndicator status={site.sslStatus} label="SSL" />
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-100">
          <div className="text-center">
            <p className="text-base font-semibold text-neutral-900">{site.posts}</p>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wide">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-neutral-900">{site.views}</p>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wide">Views</p>
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-emerald-600">{site.revenue}</p>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wide">Revenue</p>
          </div>
        </div>
      </div>
      
      {/* Card Footer - Compact Action Buttons */}
      <div className="px-4 py-3 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <Link 
            href={`/dashboard/settings/sites/${site.id}`} 
            className="inline-flex items-center justify-center w-8 h-8 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </Link>
          <Link 
            href={`/dashboard/analytics/${site.id}`} 
            className="inline-flex items-center justify-center w-8 h-8 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            title="Analytics"
          >
            <BarChart3 className="w-4 h-4" />
          </Link>
        </div>
        <a 
          href={`https://${site.domain}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Visit Site
        </a>
      </div>
    </div>
  )
}

// Empty State Component
const EmptyState = () => (
  <Link href="/dashboard/create" className="empty-state col-span-full">
    <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mb-4">
      <Plus className="w-8 h-8 text-red-500" />
    </div>
    <h3 className="empty-state-title">Build your First Site</h3>
    <p className="empty-state-description">
      Transform your YouTube videos into a beautiful, monetized blog. Get started in just 60 seconds.
    </p>
    <div className="mt-6">
      <span className="btn-primary">
        <Zap className="w-4 h-4" />
        Create Your First Site
      </span>
    </div>
  </Link>
)

export default function SitesPage() {
  const sites = sitesData // In real app, this would come from API
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              My Sites
            </h1>
            <p className="text-neutral-500 mt-1">
              Manage your blogs, domains, and monetization settings
            </p>
          </div>
          <Link href="/dashboard/create" className="btn-primary">
            <Plus className="w-4 h-4" />
            Create New Site
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="stat-card-label">Total Sites</p>
                <p className="stat-card-value mt-1">{sites.length}</p>
              </div>
              <div className="stat-card-icon bg-blue-100">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="stat-card-label">Active Sites</p>
                <p className="stat-card-value mt-1">
                  {sites.filter(s => s.status === 'active').length}
                </p>
              </div>
              <div className="stat-card-icon bg-emerald-100">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="stat-card-label">Total Revenue</p>
                <p className="stat-card-value mt-1 text-emerald-600">$3,739</p>
              </div>
              <div className="stat-card-icon bg-green-100">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sites.length > 0 ? (
            sites.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))
          ) : (
            <EmptyState />
          )}
          
          {/* Add New Site Card - Always visible if sites exist */}
          {sites.length > 0 && (
            <Link href="/dashboard/create" className="empty-state h-full min-h-[320px]">
              <div className="w-14 h-14 rounded-xl bg-neutral-200 flex items-center justify-center mb-3">
                <Plus className="w-7 h-7 text-neutral-500" />
              </div>
              <h3 className="text-base font-semibold text-neutral-700">Add New Site</h3>
              <p className="text-sm text-neutral-500 mt-1">
                Create another blog from your videos
              </p>
            </Link>
          )}
        </div>

        {/* Pro Features Banner */}
        <div className="card overflow-hidden">
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Unlock Unlimited Sites
                  </h3>
                  <p className="text-neutral-400 text-sm max-w-md">
                    Upgrade to Pro and create unlimited sites with custom domains, 
                    advanced SEO tools, and priority support.
                  </p>
                </div>
              </div>
              <Link href="/pricing" className="btn-primary-lg flex-shrink-0">
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
