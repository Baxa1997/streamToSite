'use client'

import { useMemo } from 'react'
import { PLANS, hasFeatureAccess, isWithinLimit, getLimit } from '@/config/plans'

/**
 * useFeatureGate Hook
 * 
 * A custom React hook that checks the current user's subscription status
 * and returns access permissions for various features.
 * 
 * @param {string} featureName - Optional specific feature to check
 * @returns {object} Feature access flags and helper functions
 * 
 * @example
 * // Check a specific feature
 * const { hasAccess } = useFeatureGate('customDomain');
 * if (!hasAccess) showUpgradeModal();
 * 
 * @example
 * // Get all feature flags
 * const { canConnectDomain, canRemoveBranding, planName } = useFeatureGate();
 */

// Mock function to get current user's subscription
// In production, this would come from your auth context, Zustand store, or API
const getCurrentUserPlan = () => {
  // Check localStorage for mock subscription status
  if (typeof window !== 'undefined') {
    const storedPlan = localStorage.getItem('streamtosite_plan')
    if (storedPlan && (storedPlan === 'starter' || storedPlan === 'creatorPro')) {
      return storedPlan
    }
  }
  
  // Default to starter (free) plan
  return 'starter'
}

// Mock function to get current usage stats
// In production, this would come from your API
const getCurrentUsage = () => {
  if (typeof window !== 'undefined') {
    const storedUsage = localStorage.getItem('streamtosite_usage')
    if (storedUsage) {
      try {
        return JSON.parse(storedUsage)
      } catch (e) {
        console.error('Failed to parse usage data:', e)
      }
    }
  }
  
  return {
    postsThisMonth: 0,
    sitesCreated: 0,
  }
}

export function useFeatureGate(featureName = null) {
  // Get current plan and usage
  const currentPlan = getCurrentUserPlan()
  const usage = getCurrentUsage()
  const plan = PLANS[currentPlan] || PLANS.starter

  // Memoize feature access calculations
  const featureAccess = useMemo(() => {
    return {
      // Domain & Branding
      canConnectDomain: hasFeatureAccess(currentPlan, 'customDomain'),
      canRemoveBranding: hasFeatureAccess(currentPlan, 'removeBranding'),
      
      // Monetization
      canUseOwnMonetization: hasFeatureAccess(currentPlan, 'userMonetization'),
      monetizationType: plan.features.monetization,
      
      // Automation
      canAutoSync: hasFeatureAccess(currentPlan, 'autoSync'),
      
      // Themes
      canUsePremiumThemes: hasFeatureAccess(currentPlan, 'premiumThemes'),
      availableThemes: plan.features.themes,
      
      // Analytics
      hasRealtimeAnalytics: hasFeatureAccess(currentPlan, 'realtimeAnalytics'),
      analyticsType: plan.features.analytics,
      analyticsHistoryDays: plan.features.analyticsHistoryDays,
      
      // Support
      hasPrioritySupport: hasFeatureAccess(currentPlan, 'prioritySupport'),
      
      // AI Features
      canUseAICoPilot: hasFeatureAccess(currentPlan, 'aiCoPilot'),
    }
  }, [currentPlan, plan])

  // Memoize limit calculations
  const limits = useMemo(() => {
    return {
      // Current limits
      maxSites: getLimit(currentPlan, 'maxSites'),
      maxPostsPerMonth: getLimit(currentPlan, 'maxPostsPerMonth'),
      maxFileSizeMB: getLimit(currentPlan, 'maxFileSizeMB'),
      maxVideoDurationMinutes: getLimit(currentPlan, 'maxVideoDurationMinutes'),
      
      // Usage status
      postsRemaining: Math.max(0, getLimit(currentPlan, 'maxPostsPerMonth') - usage.postsThisMonth),
      sitesRemaining: Math.max(0, getLimit(currentPlan, 'maxSites') - usage.sitesCreated),
      
      // Limit checks
      canCreatePost: isWithinLimit(currentPlan, 'maxPostsPerMonth', usage.postsThisMonth),
      canCreateSite: isWithinLimit(currentPlan, 'maxSites', usage.sitesCreated),
      
      // Usage percentage (for progress bars)
      postsUsagePercent: Math.min(100, (usage.postsThisMonth / getLimit(currentPlan, 'maxPostsPerMonth')) * 100),
      sitesUsagePercent: Math.min(100, (usage.sitesCreated / getLimit(currentPlan, 'maxSites')) * 100),
    }
  }, [currentPlan, usage])

  // Check specific feature if provided
  const hasAccess = useMemo(() => {
    if (!featureName) return null
    
    const featureMap = {
      'customDomain': featureAccess.canConnectDomain,
      'removeBranding': featureAccess.canRemoveBranding,
      'userMonetization': featureAccess.canUseOwnMonetization,
      'autoSync': featureAccess.canAutoSync,
      'premiumThemes': featureAccess.canUsePremiumThemes,
      'realtimeAnalytics': featureAccess.hasRealtimeAnalytics,
      'prioritySupport': featureAccess.hasPrioritySupport,
      'aiCoPilot': featureAccess.canUseAICoPilot,
      'createPost': limits.canCreatePost,
      'createSite': limits.canCreateSite,
    }
    
    return featureMap[featureName] ?? false
  }, [featureName, featureAccess, limits])

  return {
    // Current plan info
    planId: currentPlan,
    planName: plan.name,
    isPro: currentPlan === 'creatorPro',
    isFree: currentPlan === 'starter',
    
    // Feature access flags
    ...featureAccess,
    
    // Limits and usage
    ...limits,
    
    // Specific feature check (if featureName provided)
    hasAccess,
    
    // Helper functions
    checkFeature: (feature) => hasFeatureAccess(currentPlan, feature),
    checkLimit: (limitKey, value) => isWithinLimit(currentPlan, limitKey, value),
    
    // Upgrade helpers
    requiresUpgrade: (feature) => !hasFeatureAccess(currentPlan, feature),
    getUpgradePlan: () => PLANS.creatorPro,
  }
}

/**
 * FeatureGate Component
 * 
 * A wrapper component that conditionally renders children based on feature access.
 * Shows upgrade prompt if feature is not available.
 * 
 * @example
 * <FeatureGate feature="customDomain" fallback={<UpgradePrompt />}>
 *   <CustomDomainSettings />
 * </FeatureGate>
 */
export function FeatureGate({ 
  feature, 
  children, 
  fallback = null, 
  showUpgradePrompt = true,
  upgradeMessage = 'Upgrade to Pro to unlock this feature'
}) {
  const { hasAccess, planName } = useFeatureGate(feature)

  if (hasAccess) {
    return children
  }

  if (fallback) {
    return fallback
  }

  if (showUpgradePrompt) {
    return (
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🔒</span>
        </div>
        <h4 className="text-lg font-semibold text-white mb-2">Pro Feature</h4>
        <p className="text-neutral-400 text-sm mb-4">{upgradeMessage}</p>
        <a 
          href="/#pricing" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
        >
          Upgrade to Pro
        </a>
      </div>
    )
  }

  return null
}

/**
 * LimitGate Component
 * 
 * A wrapper component that checks if user is within their limits.
 * Shows limit reached message if at capacity.
 * 
 * @example
 * <LimitGate limit="maxPostsPerMonth" current={postsThisMonth}>
 *   <CreatePostButton />
 * </LimitGate>
 */
export function LimitGate({ 
  limit, 
  current, 
  children, 
  fallback = null,
  limitMessage = 'You have reached your plan limit'
}) {
  const { checkLimit, planName } = useFeatureGate()
  const isWithin = checkLimit(limit, current)

  if (isWithin) {
    return children
  }

  if (fallback) {
    return fallback
  }

  return (
    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-center">
      <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">⚠️</span>
      </div>
      <h4 className="text-lg font-semibold text-white mb-2">Limit Reached</h4>
      <p className="text-neutral-400 text-sm mb-4">{limitMessage}</p>
      <a 
        href="/#pricing" 
        className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
      >
        Upgrade for More
      </a>
    </div>
  )
}

// Default export
export default useFeatureGate
