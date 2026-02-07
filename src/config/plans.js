/**
 * StreamToSite Plan Configuration
 * 
 * This file defines the feature gating logic for all subscription plans.
 * Modify limits here to adjust plan capabilities across the entire application.
 */

export const PLANS = {
  // ============================================
  // PLAN A: STARTER (Free Tier)
  // Goal: Acquisition - Get users hooked on the product
  // ============================================
  starter: {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for trying out StreamToSite',
    price: 0,
    priceDisplay: '$0',
    billingPeriod: 'forever',
    stripePriceId: null, // Free tier, no Stripe price

    limits: {
      maxSites: 1,
      maxPostsPerMonth: 10,
      maxFileSizeMB: 20,
      maxVideoDurationMinutes: 30,
    },

    features: {
      // Domain & Branding
      allowCustomDomain: false, // Must use .streamtosite.com subdomain
      removeBranding: false, // Footer shows "Powered by StreamToSite"
      
      // Monetization
      monetization: 'platform', // We inject OUR AdSense, user gets 0%
      
      // Automation
      autoSync: false, // Manual URL paste only
      
      // Themes & Customization
      themes: ['standard'], // Only basic dark theme
      
      // Analytics
      analytics: '24h', // Only last 24 hours of data
      analyticsHistoryDays: 1,
      
      // Support
      prioritySupport: false,
      
      // AI Features
      aiCoPilot: false,
    },

    // UI Display Configuration
    ui: {
      badge: null,
      highlighted: false,
      ctaText: 'Get Started Free',
      ctaVariant: 'secondary',
    }
  },

  // ============================================
  // PLAN B: CREATOR PRO ($29/month)
  // Goal: Monetization & Business Use
  // ============================================
  creatorPro: {
    id: 'creator_pro',
    name: 'Creator Pro',
    description: 'For serious content creators who want to monetize',
    price: 29,
    priceDisplay: '$29',
    billingPeriod: 'month',
    stripePriceId: 'price_creator_pro_monthly', // Replace with actual Stripe Price ID

    limits: {
      maxSites: 1, // Upsell to Agency for more
      maxPostsPerMonth: 10000, // Effectively unlimited
      maxFileSizeMB: 100,
      maxVideoDurationMinutes: 60,
    },

    features: {
      // Domain & Branding
      allowCustomDomain: true, // User can connect www.movieking.com
      removeBranding: true, // White label - no "Powered by" footer
      
      // Monetization
      monetization: 'user', // User inputs THEIR AdSense/Affiliate IDs, gets 100%
      
      // Automation
      autoSync: true, // Background job fetches new videos daily
      
      // Themes & Customization
      themes: ['standard', 'cinema', 'newspaper', 'minimal'],
      
      // Analytics
      analytics: 'realtime', // Live view + 30 day history
      analyticsHistoryDays: 30,
      
      // Support
      prioritySupport: true,
      
      // AI Features
      aiCoPilot: true,
    },

    // UI Display Configuration
    ui: {
      badge: 'Most Popular',
      highlighted: true,
      ctaText: 'Start Pro Trial',
      ctaVariant: 'primary',
    }
  },
};

// ============================================
// FEATURE DEFINITIONS
// Maps feature keys to human-readable labels
// ============================================
export const FEATURE_LABELS = {
  maxSites: 'Number of sites',
  maxPostsPerMonth: 'Blog posts per month',
  maxFileSizeMB: 'Max file size',
  maxVideoDurationMinutes: 'Max video duration',
  allowCustomDomain: 'Custom domain',
  removeBranding: 'Remove branding',
  monetization: 'Monetization',
  autoSync: 'Auto-sync new videos',
  themes: 'Premium themes',
  analytics: 'Analytics',
  prioritySupport: 'Priority support',
  aiCoPilot: 'AI Co-Pilot assistant',
};

// ============================================
// FEATURE DISPLAY VALUES
// How to display feature values in the UI
// ============================================
export const getFeatureDisplayValue = (planId, featureKey) => {
  const plan = PLANS[planId];
  if (!plan) return null;

  const limits = plan.limits;
  const features = plan.features;

  switch (featureKey) {
    case 'maxSites':
      return `${limits.maxSites} site${limits.maxSites > 1 ? 's' : ''}`;
    case 'maxPostsPerMonth':
      return limits.maxPostsPerMonth >= 10000 ? 'Unlimited' : `${limits.maxPostsPerMonth}/month`;
    case 'maxFileSizeMB':
      return `Up to ${limits.maxFileSizeMB} MB`;
    case 'maxVideoDurationMinutes':
      return `Up to ${limits.maxVideoDurationMinutes} min`;
    case 'allowCustomDomain':
      return features.allowCustomDomain ? 'Yes' : 'yourname.streamtosite.com only';
    case 'removeBranding':
      return features.removeBranding ? 'White label' : '"Powered by StreamToSite" footer';
    case 'monetization':
      return features.monetization === 'user' ? 'Your AdSense (100% yours)' : 'Platform ads (0% for you)';
    case 'autoSync':
      return features.autoSync ? 'Daily auto-sync' : 'Manual paste only';
    case 'themes':
      return features.themes.length > 1 ? `${features.themes.length} premium themes` : 'Basic theme only';
    case 'analytics':
      return features.analytics === 'realtime' ? 'Realtime + 30 day history' : 'Last 24 hours only';
    case 'prioritySupport':
      return features.prioritySupport ? '24/7 priority support' : 'Community support';
    case 'aiCoPilot':
      return features.aiCoPilot ? 'Included' : 'Not available';
    default:
      return null;
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get plan by ID
 */
export const getPlanById = (planId) => {
  return Object.values(PLANS).find(plan => plan.id === planId) || PLANS.starter;
};

/**
 * Check if a user has access to a specific feature
 */
export const hasFeatureAccess = (userPlan, featureKey) => {
  const plan = PLANS[userPlan] || PLANS.starter;
  const features = plan.features;
  
  switch (featureKey) {
    case 'customDomain':
      return features.allowCustomDomain;
    case 'removeBranding':
      return features.removeBranding;
    case 'userMonetization':
      return features.monetization === 'user';
    case 'autoSync':
      return features.autoSync;
    case 'premiumThemes':
      return features.themes.length > 1;
    case 'realtimeAnalytics':
      return features.analytics === 'realtime';
    case 'prioritySupport':
      return features.prioritySupport;
    case 'aiCoPilot':
      return features.aiCoPilot;
    default:
      return false;
  }
};

/**
 * Check if user is within their limits
 */
export const isWithinLimit = (userPlan, limitKey, currentValue) => {
  const plan = PLANS[userPlan] || PLANS.starter;
  const limit = plan.limits[limitKey];
  
  if (limit === undefined) return true;
  if (limit >= 10000) return true; // Effectively unlimited
  
  return currentValue < limit;
};

/**
 * Get the limit value for a plan
 */
export const getLimit = (userPlan, limitKey) => {
  const plan = PLANS[userPlan] || PLANS.starter;
  return plan.limits[limitKey];
};

// Default export
export default PLANS;
