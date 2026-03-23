/**
 * StreamToSite Plan Configuration
 * 
 * PRIMARY GOALS:
 * - GROWTH Plan: High engagement, unlimited content creation
 * - BUSINESS Plan: Revenue ownership, full control
 * 
 * REMOVED: AI Copilot feature is no longer part of any plan.
 */

export const PLANS = {
  // ============================================
  // FREE TIER: GROWTH
  // Goal: Engagement - Get users creating lots of content
  // ============================================
  FREE: {
    id: 'growth',
    name: 'Growth',
    label: 'Growth',
    description: 'Build Your Audience',
    price: 0,
    priceDisplay: '$0',
    billingPeriod: 'forever',
    stripePriceId: null,

    limits: {
      sites: 1,
      posts: 'UNLIMITED', // Critical for engagement
    },

    features: {
      autoSync: 1, // 1 YouTube channel auto-sync
      monetization: 'platform', // We inject OUR AdSense. User gets 0%.
      customDomain: false, // Must use .streamtosite.com subdomain
      removeBranding: false, // Footer shows "Powered by StreamToSite"
      analytics: '24h', // Only last 24 hours
      themes: ['standard'], // Basic theme only
      mediaTools: false, // No "Smart Snapshots" in editor
      emailCapture: false,
      prioritySeo: false,
    },

    ui: {
      badge: null,
      highlighted: false,
      ctaText: 'Start Free',
      ctaVariant: 'secondary',
      headline: 'Build Your Audience.',
    }
  },

  // ============================================
  // PAID TIER: BUSINESS ($29/month)
  // Goal: Revenue ownership - User keeps 100%
  // ============================================
  PRO: {
    id: 'business',
    name: 'Creator Pro',
    label: 'Business',
    description: 'Own Your Income',
    price: 29,
    priceDisplay: '$29',
    billingPeriod: 'month',
    stripePriceId: 'price_creator_pro_monthly',

    limits: {
      sites: 3,
      posts: 'UNLIMITED',
    },

    features: {
      autoSync: 10, // 10 YouTube channels auto-sync
      monetization: 'user', // User enters THEIR AdSense/Affiliate IDs. 100% theirs.
      customDomain: true, // Connect www.yourname.com
      removeBranding: true, // White label
      analytics: 'realtime', // 30-day history + live view
      themes: ['standard', 'cinema', 'newspaper', 'minimal'],
      mediaTools: true, // Video Player & Snapshot tools in Editor
      emailCapture: true, // Newsletter signup forms
      prioritySeo: true, // Priority search indexing
    },

    ui: {
      badge: 'Most Popular',
      highlighted: true,
      ctaText: 'Go Pro - $29/mo',
      ctaVariant: 'primary',
      headline: 'Own Your Income.',
    }
  },

  // ============================================
  // ENTERPRISE TIER
  // Goal: High-volume usage, dedicated support
  // ============================================
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise',
    label: 'Enterprise',
    description: 'High-Volume & Dedicated Support',
    price: 99,
    priceDisplay: '$99',
    billingPeriod: 'month',
    stripePriceId: 'price_enterprise_monthly',

    limits: {
      sites: 'UNLIMITED',
      posts: 'UNLIMITED',
    },

    features: {
      autoSync: 'UNLIMITED', // Unlimited YouTube channels auto-sync
      monetization: 'user', // User enters THEIR AdSense/Affiliate IDs. 100% theirs.
      customDomain: true, // Connect www.yourname.com
      removeBranding: true, // White label
      analytics: 'realtime_plus_history', // Realtime + unlimited history
      themes: ['standard', 'cinema', 'newspaper', 'minimal', 'enterprise_exclusive'], // All themes + exclusive
      mediaTools: true, // Video Player & Snapshot tools in Editor
      emailCapture: true, // Newsletter signup forms
      prioritySeo: true, // Priority search indexing
      dedicatedSupport: true, // Dedicated account manager
      apiAccess: true, // Full API access
    },

    ui: {
      badge: 'For Agencies',
      highlighted: false,
      ctaText: 'Contact Us',
      ctaVariant: 'tertiary',
      headline: 'Scale Your Business.',
    }
  },
};

// ============================================
// FEATURE LABELS
// ============================================
export const FEATURE_LABELS = {
  sites: 'Number of sites',
  posts: 'Blog posts',
  autoSync: 'Auto-sync channels',
  monetization: 'Ad revenue',
  customDomain: 'Custom domain',
  removeBranding: 'White label',
  analytics: 'Analytics',
  themes: 'Themes',
  mediaTools: 'Media Studio',
  emailCapture: 'Email capture',
  prioritySeo: 'Priority SEO',
  dedicatedSupport: 'Dedicated Support',
  apiAccess: 'API Access',
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get plan by ID
 */
export const getPlanById = (planId) => {
  if (planId === 'growth' || planId === 'starter' || planId === 'free') {
    return PLANS.FREE;
  }
  if (planId === 'business' || planId === 'pro' || planId === 'creator_pro') {
    return PLANS.PRO;
  }
  if (planId === 'enterprise') {
    return PLANS.ENTERPRISE;
  }
  return PLANS.FREE;
};

/**
 * Get plan key (FREE or PRO)
 */
export const getPlanKey = (planId) => {
  if (planId === 'growth' || planId === 'starter' || planId === 'free') {
    return 'FREE';
  }
  if (planId === 'business' || planId === 'pro' || planId === 'creator_pro') {
    return 'PRO';
  }
  if (planId === 'enterprise') {
    return 'ENTERPRISE';
  }
  return 'FREE';
};

/**
 * Check if a user has access to a specific feature
 */
export const hasFeatureAccess = (userPlanId, featureKey) => {
  const plan = getPlanById(userPlanId);
  const features = plan.features;

  switch (featureKey) {
    case 'customDomain':
      return features.customDomain;
    case 'removeBranding':
      return features.removeBranding;
    case 'userMonetization':
      return features.monetization === 'user';
    case 'autoSync':
      return features.autoSync > 0;
    case 'multiChannelSync':
      return features.autoSync > 1;
    case 'premiumThemes':
      return features.themes.length > 1;
    case 'realtimeAnalytics':
      return features.analytics === 'realtime';
    case 'mediaTools':
      return features.mediaTools;
    case 'emailCapture':
      return features.emailCapture;
    case 'prioritySeo':
      return features.prioritySeo;
    case 'dedicatedSupport':
      return features.dedicatedSupport;
    case 'apiAccess':
      return features.apiAccess;
    default:
      return false;
  }
};

/**
 * Check if user is within their limits
 */
export const isWithinLimit = (userPlanId, limitKey, currentValue) => {
  const plan = getPlanById(userPlanId);
  const limit = plan.limits[limitKey];

  if (limit === undefined) return true;
  if (limit === 'UNLIMITED') return true;

  return currentValue < limit;
};

/**
 * Get the limit value for a plan
 */
export const getLimit = (userPlanId, limitKey) => {
  const plan = getPlanById(userPlanId);
  return plan.limits[limitKey];
};

/**
 * Get display value for a feature
 */
export const getFeatureDisplayValue = (planKey, featureKey) => {
  const plan = PLANS[planKey];
  if (!plan) return null;

  const features = plan.features;
  const limits = plan.limits;

  switch (featureKey) {
    case 'sites':
      if (limits.sites === 'UNLIMITED') return 'Unlimited';
      return limits.sites === 1 ? '1 site' : `${limits.sites} sites`;
    case 'posts':
      return limits.posts === 'UNLIMITED' ? 'Unlimited' : `${limits.posts}/month`;
    case 'autoSync':
      if (features.autoSync === 'UNLIMITED') return 'Unlimited channels';
      return features.autoSync === 0 ? 'None' : `${features.autoSync} channel${features.autoSync > 1 ? 's' : ''}`;
    case 'monetization':
      return features.monetization === 'user' ? '100% yours' : '0% for you';
    case 'customDomain':
      return features.customDomain ? 'Connect your .com' : 'Subdomain only';
    case 'removeBranding':
      return features.removeBranding ? 'White label' : 'StreamToSite branding';
    case 'analytics':
      if (features.analytics === 'realtime_plus_history') return 'Realtime + Unlimited History';
      return features.analytics === 'realtime' ? 'Realtime + 30 days' : 'Last 24 hours';
    case 'themes':
      return `${features.themes.length} theme${features.themes.length > 1 ? 's' : ''}`;
    case 'mediaTools':
      return features.mediaTools ? 'Full access' : 'Not available';
    case 'emailCapture':
      return features.emailCapture ? 'Included' : 'Not available';
    case 'prioritySeo':
      return features.prioritySeo ? 'Priority indexing' : 'Standard';
    case 'dedicatedSupport':
      return features.dedicatedSupport ? 'Dedicated account manager' : 'Standard support';
    case 'apiAccess':
      return features.apiAccess ? 'Full API access' : 'Not available';
    default:
      return null;
  }
};

// Backward compatibility exports
export const starter = PLANS.FREE;
export const creatorPro = PLANS.PRO;

export default PLANS;
