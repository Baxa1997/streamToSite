'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { 
  LayoutGrid, 
  Globe, 
  PenTool, 
  DollarSign,
  Settings,
  ChevronRight,
  Home,
  Plus,
  Menu,
  X,
  Sparkles,
  LogOut,
  Crown,
  Bell,
  Search
} from 'lucide-react'
import useAppStore from '@/store/useAppStore'

// Navigation items
const mainNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { name: 'My Sites', href: '/dashboard/sites', icon: Globe },
  { name: 'Content Studio', href: '/dashboard/studio', icon: PenTool },
  { name: 'Monetization', href: '/dashboard/monetization', icon: DollarSign },
]

const bottomNavigation = [
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

// Breadcrumb mapping
const pageTitles = {
  '/dashboard': 'Dashboard',
  '/dashboard/sites': 'My Sites',
  '/dashboard/studio': 'Content Studio',
  '/dashboard/create': 'Create Content',
  '/dashboard/monetization': 'Monetization',
  '/dashboard/settings': 'Settings',
  '/dashboard/builder': 'Site Builder',
  '/dashboard/editor': 'Editor',
}

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, upgradePlan } = useAppStore()

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs = []
    let currentPath = ''
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const title = pageTitles[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1)
      breadcrumbs.push({
        name: title,
        href: currentPath,
        isLast: index === segments.length - 1
      })
    })
    
    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 sidebar
          transform transition-transform duration-300 ease-out
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between h-16 px-5 border-b border-neutral-800">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">StreamToSite</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden btn-dark-ghost p-1.5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar custom-scrollbar-dark">
            <div className="sidebar-section-title">Main Menu</div>
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/dashboard' && pathname.startsWith(item.href))
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`sidebar-nav-item ${isActive ? 'sidebar-nav-item-active' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Bottom Section */}
          <div className="p-3 space-y-3 border-t border-neutral-800">
            {/* Settings Link */}
            {bottomNavigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`sidebar-nav-item ${isActive ? 'sidebar-nav-item-active' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}

            {/* Upgrade Banner */}
            <div className="upgrade-banner">
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-4 h-4" />
                <span className="upgrade-banner-title">Upgrade to Pro</span>
              </div>
              <p className="upgrade-banner-text">
                Unlock unlimited sites & advanced features
              </p>
              <button 
                onClick={upgradePlan}
                className="upgrade-banner-button"
              >
                Upgrade Now
              </button>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/50 border border-neutral-800">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-sm font-semibold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-200 truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-neutral-500 truncate capitalize">{user?.plan || 'Free'} Plan</p>
              </div>
              <button className="btn-dark-ghost p-1.5 text-neutral-500 hover:text-neutral-300">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 topbar">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Left: Mobile menu + Breadcrumbs */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden btn-dark-ghost p-2"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Breadcrumbs */}
              <nav className="breadcrumb hidden sm:flex">
                <Link href="/dashboard" className="breadcrumb-item flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
                {breadcrumbs.map((crumb, index) => (
                  <div key={crumb.href} className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 breadcrumb-separator" />
                    {crumb.isLast ? (
                      <span className="breadcrumb-current">{crumb.name}</span>
                    ) : (
                      <Link href={crumb.href} className="breadcrumb-item">
                        {crumb.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
              
              {/* Mobile Title */}
              <h1 className="text-lg font-semibold text-white sm:hidden">
                {breadcrumbs[breadcrumbs.length - 1]?.name || 'Dashboard'}
              </h1>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <button className="btn-dark-ghost p-2 hidden sm:flex">
                <Search className="w-5 h-5" />
              </button>
              
              {/* Notifications */}
              <button className="btn-dark-ghost p-2 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              
              {/* Create New Button */}
              <Link href="/dashboard/sites/new" className="btn-primary">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Create New</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="content-area p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
