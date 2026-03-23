'use client'

import { Search, Menu, X, ArrowLeft, Youtube, Twitter } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

/**
 * SiteLayout Component
 * 
 * The shared shell for the Public Website Simulator.
 * Supports multiple themes: cinema, newspaper, minimal, standard.
 */

// Theme configurations
const THEMES = {
  cinema: {
    bg: 'bg-neutral-950',
    text: 'text-white',
    navBg: 'bg-neutral-950/95 backdrop-blur-xl',
    navBorder: 'border-neutral-800',
    accent: 'text-red-500',
    accentBg: 'bg-red-500',
    cardBg: 'bg-neutral-900',
    cardHover: 'hover:bg-neutral-800',
    footerBg: 'bg-neutral-900',
    muted: 'text-neutral-400',
  },
  newspaper: {
    bg: 'bg-stone-50',
    text: 'text-neutral-900',
    navBg: 'bg-white/95 backdrop-blur-xl',
    navBorder: 'border-neutral-200',
    accent: 'text-red-600',
    accentBg: 'bg-red-600',
    cardBg: 'bg-white',
    cardHover: 'hover:bg-neutral-50',
    footerBg: 'bg-white',
    muted: 'text-neutral-500',
  },
  minimal: {
    bg: 'bg-white',
    text: 'text-neutral-900',
    navBg: 'bg-white/95 backdrop-blur-xl',
    navBorder: 'border-neutral-100',
    accent: 'text-neutral-900',
    accentBg: 'bg-neutral-900',
    cardBg: 'bg-neutral-50',
    cardHover: 'hover:bg-neutral-100',
    footerBg: 'bg-neutral-50',
    muted: 'text-neutral-500',
  },
  standard: {
    bg: 'bg-neutral-900',
    text: 'text-white',
    navBg: 'bg-neutral-900/95 backdrop-blur-xl',
    navBorder: 'border-neutral-700',
    accent: 'text-blue-500',
    accentBg: 'bg-blue-500',
    cardBg: 'bg-neutral-800',
    cardHover: 'hover:bg-neutral-700',
    footerBg: 'bg-neutral-800',
    muted: 'text-neutral-400',
  },
};

export default function SiteLayout({ 
  children, 
  siteConfig,
  theme = 'cinema',
  currentView = 'home',
  onBack,
  showBackButton = false,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  
  const t = THEMES[theme] || THEMES.cinema

  return (
    <div className={`min-h-screen ${t.bg} ${t.text}`}>
      {/* ========== STICKY NAVBAR ========== */}
      <nav className={`sticky top-0 z-50 ${t.navBg} border-b ${t.navBorder}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Back Button or Logo */}
            <div className="flex items-center gap-4">
              {showBackButton && onBack ? (
                <button
                  onClick={onBack}
                  className={`flex items-center gap-2 ${t.muted} hover:${t.text} transition-colors group`}
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-medium hidden sm:inline">Back to Home</span>
                </button>
              ) : null}
              
              {/* Logo */}
              <div className="flex items-center gap-3">
                {siteConfig?.logo ? (
                  <img src={siteConfig.logo} alt={siteConfig.name} className="h-8 w-auto" />
                ) : (
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${t.accentBg} flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">MK</span>
                    </div>
                    <span className="font-bold text-lg tracking-tight">
                      {siteConfig?.name || 'MovieKing'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Center: Navigation (Desktop) */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className={`text-sm font-medium hover:${t.accent} transition-colors`}>
                Latest
              </a>
              <a href="#" className={`text-sm font-medium ${t.muted} hover:${t.text} transition-colors`}>
                Movies
              </a>
              <a href="#" className={`text-sm font-medium ${t.muted} hover:${t.text} transition-colors`}>
                TV Shows
              </a>
              <a href="#" className={`text-sm font-medium ${t.muted} hover:${t.text} transition-colors`}>
                Theories
              </a>
            </div>

            {/* Right: Search & Social */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-lg ${t.cardBg} ${t.cardHover} transition-colors`}
              >
                <Search className="w-5 h-5" />
              </button>
              
              {/* Social Icons (Desktop) */}
              <div className="hidden md:flex items-center gap-2">
                <a 
                  href={siteConfig?.social?.youtube || '#'} 
                  target="_blank"
                  className={`p-2 rounded-lg ${t.muted} hover:${t.text} hover:${t.cardBg} transition-colors`}
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a 
                  href={siteConfig?.social?.twitter || '#'} 
                  target="_blank"
                  className={`p-2 rounded-lg ${t.muted} hover:${t.text} hover:${t.cardBg} transition-colors`}
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg ${t.cardBg} ${t.cardHover} transition-colors`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        {searchOpen && (
          <div className={`absolute top-full left-0 right-0 ${t.navBg} border-b ${t.navBorder} p-4`}>
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search articles..."
                className={`w-full px-4 py-3 rounded-lg ${t.cardBg} border ${t.navBorder} focus:outline-none focus:ring-2 focus:ring-red-500/50 ${t.text}`}
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden absolute top-full left-0 right-0 ${t.navBg} border-b ${t.navBorder}`}>
            <div className="px-4 py-4 space-y-3">
              <a href="#" className={`block py-2 font-medium hover:${t.accent}`}>Latest</a>
              <a href="#" className={`block py-2 ${t.muted}`}>Movies</a>
              <a href="#" className={`block py-2 ${t.muted}`}>TV Shows</a>
              <a href="#" className={`block py-2 ${t.muted}`}>Theories</a>
              <div className="pt-3 border-t border-neutral-700 flex gap-4">
                <a href="#" className={t.muted}><Youtube className="w-5 h-5" /></a>
                <a href="#" className={t.muted}><Twitter className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ========== MAIN CONTENT ========== */}
      <main className="min-h-[calc(100vh-8rem)]">
        {children}
      </main>

      {/* ========== FOOTER ========== */}
      <footer className={`${t.footerBg} border-t ${t.navBorder}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Site Info */}
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg ${t.accentBg} flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">MK</span>
              </div>
              <div>
                <p className="font-semibold">{siteConfig?.name || 'MovieKing Recaps'}</p>
                <p className={`text-xs ${t.muted}`}>{siteConfig?.tagline || 'Your Ultimate Guide to Cinema'}</p>
              </div>
            </div>

            {/* Powered By Badge */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${t.cardBg} border ${t.navBorder}`}>
              <span className={`text-xs ${t.muted}`}>Powered by</span>
              <span className="text-xs font-bold">
                Stream<span className="text-red-500">ToSite</span>
              </span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="font-bold">{(siteConfig?.analytics?.totalViews || 125840).toLocaleString()}</p>
                <p className={`text-xs ${t.muted}`}>Total Views</p>
              </div>
              <div className="text-center">
                <p className="font-bold">{(siteConfig?.analytics?.subscribers || 3420).toLocaleString()}</p>
                <p className={`text-xs ${t.muted}`}>Subscribers</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className={`text-center mt-6 pt-6 border-t ${t.navBorder}`}>
            <p className={`text-xs ${t.muted}`}>
              © {new Date().getFullYear()} {siteConfig?.name || 'MovieKing Recaps'}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
