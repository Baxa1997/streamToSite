'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Zap, ArrowRight, DollarSign, TrendingUp } from 'lucide-react'
import { getPlanById, hasFeatureAccess } from '@/config/plans'

/**
 * UpgradeBanner Component
 * 
 * A sticky banner that appears for free users to encourage upgrades.
 * Shows personalized messaging based on user activity.
 * 
 * Usage:
 * <UpgradeBanner user={user} postsThisWeek={12} />
 */

export default function UpgradeBanner({ 
  user = { plan: 'growth' }, 
  postsThisWeek = 0,
  variant = 'sticky', // 'sticky' | 'inline' | 'modal'
  onDismiss,
}) {
  const [isDismissed, setIsDismissed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Check if user is on free plan
  const isFreePlan = !hasFeatureAccess(user.plan, 'userMonetization')

  // Show banner with slight delay for better UX
  useEffect(() => {
    if (isFreePlan && !isDismissed) {
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [isFreePlan, isDismissed])

  // Don't show if Pro or dismissed
  if (!isFreePlan || isDismissed || !isVisible) {
    return null
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    onDismiss?.()
  }

  // Dynamic messaging based on activity
  const getMessage = () => {
    if (postsThisWeek >= 10) {
      return {
        title: `🔥 You've published ${postsThisWeek} posts this week!`,
        subtitle: 'Upgrade to Pro and earn 100% of the ad revenue from all that content.',
        cta: 'Start Earning',
      }
    }
    if (postsThisWeek >= 5) {
      return {
        title: `You're on fire! ${postsThisWeek} posts created.`,
        subtitle: 'Imagine keeping 100% of the revenue from all those readers.',
        cta: 'Unlock Monetization',
      }
    }
    return {
      title: 'Ready to monetize your content?',
      subtitle: 'Upgrade to Pro and keep 100% of your ad & affiliate revenue.',
      cta: 'Go Pro - $29/mo',
    }
  }

  const message = getMessage()

  // Sticky Bottom Banner (default)
  if (variant === 'sticky') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
        <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 px-4 py-3 shadow-2xl shadow-red-500/20">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            {/* Message */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm md:text-base">
                  {message.title}
                </p>
                <p className="text-white/80 text-xs md:text-sm">
                  {message.subtitle}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-red-600 font-semibold text-sm hover:bg-neutral-100 transition-colors shadow-lg"
              >
                <Zap className="w-4 h-4" />
                {message.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <button
                onClick={handleDismiss}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-5 h-5 text-white/80" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Inline Banner (for dashboard cards)
  if (variant === 'inline') {
    return (
      <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-red-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white text-sm mb-1">
              {message.title}
            </p>
            <p className="text-neutral-400 text-xs mb-3">
              {message.subtitle}
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-red-400 text-sm font-medium hover:text-red-300 transition-colors"
            >
              {message.cta}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4 text-neutral-500" />
          </button>
        </div>
      </div>
    )
  }

  // Full Modal (for important moments)
  if (variant === 'modal') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-fade-in">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 max-w-md w-full animate-scale-in">
          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-neutral-400" />
          </button>

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-6">
            <DollarSign className="w-8 h-8 text-white" />
          </div>

          {/* Content */}
          <h3 className="text-2xl font-bold text-white text-center mb-2">
            {message.title}
          </h3>
          <p className="text-neutral-400 text-center mb-8">
            {message.subtitle}
          </p>

          {/* Benefits */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-500 text-xs">✓</span>
              </div>
              <span className="text-neutral-300">Keep 100% of ad revenue</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-500 text-xs">✓</span>
              </div>
              <span className="text-neutral-300">Connect your custom domain</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-500 text-xs">✓</span>
              </div>
              <span className="text-neutral-300">Media Studio tools for editing</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <Link
              href="/pricing"
              className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all shadow-lg shadow-red-500/25"
            >
              <Zap className="w-4 h-4" />
              {message.cta}
            </Link>
            <button
              onClick={handleDismiss}
              className="w-full py-3 px-6 rounded-xl font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}

/**
 * Compact upgrade prompt for specific feature gates
 */
export function UpgradePrompt({ 
  feature, 
  className = '',
}) {
  const featureMessages = {
    customDomain: {
      title: 'Custom Domain',
      description: 'Connect yourname.com to your blog',
    },
    monetization: {
      title: 'Ad Revenue',
      description: 'Keep 100% of your ad earnings',
    },
    mediaTools: {
      title: 'Media Studio',
      description: 'Smart Snapshots & Video Tools',
    },
    analytics: {
      title: 'Advanced Analytics',
      description: '30-day history + realtime stats',
    },
    removeBranding: {
      title: 'White Label',
      description: 'Remove "Powered by StreamToSite"',
    },
    themes: {
      title: 'Premium Themes',
      description: 'Access 4 professional designs',
    },
  }

  const message = featureMessages[feature] || {
    title: 'Pro Feature',
    description: 'Upgrade to unlock this feature',
  }

  return (
    <div className={`bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
          <Zap className="w-4 h-4 text-red-500" />
        </div>
        <div>
          <p className="font-medium text-white text-sm">{message.title}</p>
          <p className="text-neutral-500 text-xs">{message.description}</p>
        </div>
      </div>
      <Link
        href="/pricing"
        className="flex items-center justify-center gap-1.5 w-full py-2 px-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
      >
        Upgrade to Pro
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  )
}
