'use client'

import DashboardLayout from '@/components/DashboardLayout'
import useAppStore from '@/store/useAppStore'
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
  Zap,
  ShieldCheck,
  Clock,
  Users,
  Video,
  Eye
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// Sample sites data (fallback if store is empty)
const fallbackSitesData = [
  {
    id: '1',
    channelName: 'Movie King',
    domain: 'movieking.com',
    channelAvatar: '🎬',
    status: 'verified',
    isVerified: true,
    dnsStatus: 'active',
    adsStatus: 'active',
    sslStatus: 'active',
    postsCount: 47,
    totalViews: 124500,
    revenue: 2847,
    platform: 'youtube',
    channelSubscribers: '890K',
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    channelName: 'Tech Pulse',
    domain: 'techpulse.streamtosite.com',
    channelAvatar: '💻',
    status: 'verified',
    isVerified: true,
    dnsStatus: 'pending',
    adsStatus: 'active',
    sslStatus: 'active',
    postsCount: 23,
    totalViews: 45200,
    revenue: 892,
    platform: 'youtube',
    channelSubscribers: '1.2M',
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
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
    verified: {
      dot: 'bg-emerald-500',
      text: 'text-emerald-700',
      bg: 'bg-emerald-50',
      icon: ShieldCheck,
    },
    pending: {
      dot: 'bg-amber-500',
      text: 'text-amber-700',
      bg: 'bg-amber-50',
      icon: AlertCircle,
    },
    unclaimed: {
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

// Site Card Component - Shows both store sites and fallback sites
const SiteCard = ({ site, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Format views
  const formatViews = (views) => {
    if (typeof views === 'number') {
      if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
      if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
      return views.toString()
    }
    return views || '-'
  }
  
  // Format revenue
  const formatRevenue = (revenue) => {
    if (typeof revenue === 'number') {
      return `$${revenue.toLocaleString()}`
    }
    return revenue || '-'
  }
  
  // Get relative time
  const getRelativeTime = (dateStr) => {
    if (!dateStr) return 'Recently'
    const now = new Date()
    const date = new Date(dateStr)
    const diff = now - date
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    return 'Just now'
  }
  
  // Determine if avatar is emoji or URL
  const isEmojiAvatar = !site.channelAvatar?.startsWith('http')
  
  return (
    <div className="card hover:shadow-md transition-all duration-200 group">
      {/* Card Header */}
      <div className="p-4 flex items-center gap-3 border-b border-neutral-100">
        {isEmojiAvatar ? (
          <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-2xl flex-shrink-0">
            {site.channelAvatar || '🌐'}
          </div>
        ) : (
          <img 
            src={site.channelAvatar} 
            alt={site.channelName}
            className="w-12 h-12 rounded-xl flex-shrink-0 bg-neutral-100"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-neutral-900 truncate text-sm">{site.channelName}</h3>
            {site.isVerified && (
              <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            )}
          </div>
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
                <button 
                  onClick={() => {
                    onDelete?.(site.id)
                    setMenuOpen(false)
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
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
        {/* Channel Info */}
        <div className="flex items-center gap-3 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {site.channelSubscribers || '0'}
          </span>
          <span className="flex items-center gap-1">
            <Video className="w-3.5 h-3.5" />
            {site.postsCount || 0} posts
          </span>
          <span className="flex items-center gap-1 capitalize">
            {site.platform === 'youtube' && '🔴'}
            {site.platform === 'tiktok' && '⚫'}
            {site.platform === 'facebook' && '🔵'}
            {site.platform}
          </span>
        </div>
        
        {/* Status Indicators */}
        <div className="flex flex-wrap gap-1.5">
          <StatusIndicator status={site.isVerified ? 'verified' : 'unclaimed'} label={site.isVerified ? 'Verified' : 'Unverified'} />
          <StatusIndicator status={site.dnsStatus || 'pending'} label="DNS" />
          <StatusIndicator status={site.sslStatus || 'pending'} label="SSL" />
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-100">
          <div className="text-center">
            <p className="text-base font-semibold text-neutral-900">{site.postsCount || 0}</p>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wide">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-neutral-900">{formatViews(site.totalViews)}</p>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wide">Views</p>
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-emerald-600">{formatRevenue(site.revenue)}</p>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wide">Revenue</p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-center gap-1 text-xs text-neutral-400 pt-2">
          <Clock className="w-3 h-3" />
          Updated {getRelativeTime(site.updatedAt)}
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
        <div className="flex items-center gap-2">
          {/* Preview Demo Button - Opens local preview */}
          <Link 
            href={`/site/${site.domain?.split('.')[0] || site.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors"
            title="Preview your demo website"
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </Link>
          {/* Visit Production Site Button */}
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
    </div>
  )
}

// Empty State Component
const EmptyState = () => (
  <Link 
    href="/dashboard/sites/new"
    className="empty-state col-span-full cursor-pointer hover:border-red-300 transition-colors"
  >
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
  const { sites: storeSites, deleteSite, user } = useAppStore()
  
  // Combine store sites with fallback data for demo
  const sites = storeSites.length > 0 ? storeSites : fallbackSitesData
  
  // Calculate stats
  const totalViews = sites.reduce((sum, s) => sum + (typeof s.totalViews === 'number' ? s.totalViews : 0), 0)
  const totalRevenue = sites.reduce((sum, s) => sum + (typeof s.revenue === 'number' ? s.revenue : 0), 0)
  const verifiedCount = sites.filter(s => s.isVerified).length
  
  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }
  
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
          <Link 
            href="/dashboard/sites/new"
            className="btn-primary"
          >
            <Plus className="w-4 h-4" />
            Create New Site
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
                <p className="stat-card-label">Verified Sites</p>
                <p className="stat-card-value mt-1">{verifiedCount}</p>
              </div>
              <div className="stat-card-icon bg-emerald-100">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="stat-card-label">Total Views</p>
                <p className="stat-card-value mt-1">{formatNumber(totalViews)}</p>
              </div>
              <div className="stat-card-icon bg-purple-100">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="stat-card-label">Total Revenue</p>
                <p className="stat-card-value mt-1 text-emerald-600">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="stat-card-icon bg-green-100">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sites.length > 0 ? (
            sites.map((site) => (
              <SiteCard key={site.id} site={site} onDelete={deleteSite} />
            ))
          ) : (
            <EmptyState />
          )}
          
          {sites.length > 0 && (
            <Link 
              href="/dashboard/sites/new"
              className="empty-state h-full min-h-[320px] cursor-pointer hover:border-red-300 transition-colors"
            >
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

        {/* Pro Features Banner - Show only for free users */}
        {user?.plan === 'free' && (
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
        )}
      </div>
    </DashboardLayout>
  )
}
