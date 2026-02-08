'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import useAppStore from '@/store/useAppStore'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Eye, 
  DollarSign, 
  Globe, 
  FileText,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Lock,
  MousePointer,
  BarChart3,
  Clock,
  User,
  ExternalLink,
  Edit3,
  CheckCircle2,
  Play,
  AlertTriangle,
  Plus,
  Settings,
  Zap,
  ArrowRight,
  Crown,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react'

// Mini Sparkline Chart Component
const Sparkline = ({ data, color = '#ef4444' }) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 100
  const height = 30
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((value - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Revenue Lock Tooltip
const RevenueLockTooltip = ({ amount, onUpgrade }) => {
  const [show, setShow] = useState(false)

  return (
    <div className="relative inline-flex items-center">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={onUpgrade}
        className="ml-2 p-1 text-amber-500 hover:bg-amber-100 rounded-full transition-colors"
      >
        <Lock className="w-4 h-4" />
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 bg-neutral-900 text-white text-sm rounded-xl shadow-xl z-50 whitespace-nowrap"
          >
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="font-semibold">Upgrade to Pro</span>
            </div>
            <p className="text-neutral-300">
              Claim this <span className="text-green-400 font-semibold">${amount}</span> revenue
            </p>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
              <div className="border-8 border-transparent border-t-neutral-900" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Site Card Component
const SiteCard = ({ site, isPro }) => {
  const isVerified = site.isVerified
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-5 hover:shadow-lg transition-all group"
    >
      <div className="flex items-start gap-4">
        <img
          src={site.connectedChannel?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo'}
          alt={site.connectedChannel?.name}
          className="w-14 h-14 rounded-xl object-cover border-2 border-neutral-100"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-neutral-900 truncate">
              {site.connectedChannel?.name || 'My Site'}
            </h3>
            {isVerified ? (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                <AlertTriangle className="w-3 h-3" />
                Fan Site
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-500 truncate">{site.domain}</p>
          
          <div className="flex items-center gap-4 mt-3 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              {site.stats?.posts || 0} posts
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {site.stats?.views || 0} views
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {site.connectedChannel?.subscribers || '0'}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <Link
            href={`/site/${site.domain.split('.')[0]}`}
            target="_blank"
            className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <Link
            href={`/dashboard/editor/new?site=${site.id}`}
            className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Free Plan Badge */}
      {!isPro && (
        <div className="mt-4 pt-4 border-t border-neutral-100">
          <p className="text-xs text-neutral-400 text-center">
            <span className="inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Powered by StreamToSite
            </span>
          </p>
        </div>
      )}
    </motion.div>
  )
}

// Empty State
const EmptySitesState = () => {
  return (
    <div className="card p-12 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
        <Globe className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-neutral-900 mb-2">Create Your First Site</h3>
      <p className="text-neutral-500 mb-6 max-w-md mx-auto">
        Connect your YouTube channel and we'll automatically create a beautiful blog website from your videos
      </p>
      <Link
        href="/dashboard/sites/new"
        className="inline-flex items-center gap-2 btn-primary"
      >
        <Plus className="w-4 h-4" />
        Create Site
      </Link>
    </div>
  )
}

export default function DashboardPage() {
  const { user, sites, posts, getTotalRevenue, getTotalViews, togglePlan, upgradePlan } = useAppStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Stats with dynamic data
  const stats = [
    {
      name: 'Total Views',
      value: mounted ? getTotalViews().toLocaleString() : '0',
      change: '+12.5%',
      changeType: 'positive',
      icon: Eye,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      sparkline: [40, 55, 45, 60, 75, 65, 80, 90, 85, 95, 100, 110],
    },
    {
      name: 'Active Sites',
      value: mounted ? sites.length.toString() : '0',
      change: sites.length > 0 ? '+1 this week' : 'Add your first site',
      changeType: sites.length > 0 ? 'positive' : 'neutral',
      icon: Globe,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      name: 'Ad Revenue',
      value: mounted ? `$${getTotalRevenue().toFixed(2)}` : '$0.00',
      change: '+23.1%',
      changeType: 'locked',
      icon: DollarSign,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      locked: user.plan === 'free',
    },
    {
      name: 'Published Posts',
      value: mounted ? posts.filter(p => p.status === 'published').length.toString() : '0',
      change: '+3 this month',
      changeType: 'positive',
      icon: FileText,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Welcome back, <span className="text-gradient-red">{user.name}</span>
            </h1>
            <p className="text-neutral-500 mt-1">
              Here's what's happening with your content empire
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Plan Toggle Button (for testing) */}
            <button
              onClick={togglePlan}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                user.plan === 'pro'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <Crown className="w-4 h-4" />
              {user.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}
            </button>
            <Link
              href="/site/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg transition-colors shadow-lg"
            >
              <Eye className="w-4 h-4" />
              Preview Site
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            
            return (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  {stat.sparkline && (
                    <Sparkline data={stat.sparkline} color="#3b82f6" />
                  )}
                </div>
                
                <p className="text-sm text-neutral-500 mb-1">{stat.name}</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                  {stat.locked && (
                    <RevenueLockTooltip 
                      amount={getTotalRevenue().toFixed(2)} 
                      onUpgrade={upgradePlan}
                    />
                  )}
                </div>
                
                {stat.changeType !== 'neutral' && (
                  <div className="flex items-center gap-1 mt-2">
                    {stat.changeType === 'positive' && !stat.locked && (
                      <>
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                      </>
                    )}
                    {stat.changeType === 'locked' && (
                      <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Upgrade to claim
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/sites/new"
            className="card p-5 bg-gradient-to-br from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-1">Create New Site</h3>
                <p className="text-white/80 text-sm">Connect your YouTube channel</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6" />
              </div>
            </div>
          </Link>
          
          <Link
            href="/dashboard/studio"
            className="card p-5 hover:shadow-lg transition-all group border-2 border-transparent hover:border-blue-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-neutral-900 mb-1">Content Studio</h3>
                <p className="text-neutral-500 text-sm">Create and manage posts</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Edit3 className="w-6 h-6" />
              </div>
            </div>
          </Link>
          
          <Link
            href="/dashboard/monetization"
            className="card p-5 hover:shadow-lg transition-all group border-2 border-transparent hover:border-green-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-neutral-900 mb-1">Monetization</h3>
                <p className="text-neutral-500 text-sm">View earnings & payouts</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </Link>
        </div>

        {/* Sites Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-neutral-900">Your Sites</h2>
            <Link
              href="/dashboard/sites"
              className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {sites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sites.slice(0, 3).map((site, index) => (
                <SiteCard 
                  key={site.id} 
                  site={site} 
                  isPro={user.plan === 'pro'} 
                />
              ))}
              {sites.length < 3 && (
                <Link
                  href="/dashboard/sites/new"
                  className="card p-5 border-2 border-dashed border-neutral-300 hover:border-red-300 hover:bg-red-50/50 transition-all flex flex-col items-center justify-center text-center min-h-[180px]"
                >
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-3">
                    <Plus className="w-6 h-6 text-neutral-400" />
                  </div>
                  <p className="font-medium text-neutral-600">Add Another Site</p>
                  <p className="text-sm text-neutral-400">Connect a new channel</p>
                </Link>
              )}
            </div>
          ) : (
            <EmptySitesState />
          )}
        </div>

        {/* Pro Upgrade Banner (for free users) */}
        {user.plan === 'free' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/20 to-transparent rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-400 font-semibold text-sm uppercase tracking-wide">Pro Features</span>
                </div>
                <h3 className="text-xl font-bold mb-1">Unlock Your Full Potential</h3>
                <p className="text-neutral-400">
                  Claim ${getTotalRevenue().toFixed(2)} revenue, remove branding, unlimited sites
                </p>
              </div>
              <button
                onClick={upgradePlan}
                className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-neutral-900 font-semibold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <Zap className="w-5 h-5" />
                Upgrade to Pro
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  )
}
