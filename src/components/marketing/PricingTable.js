'use client'

import { Check, X, Sparkles, Zap, Crown } from 'lucide-react'
import { PLANS, FEATURE_LABELS, getFeatureDisplayValue } from '@/config/plans'

/**
 * PricingTable Component
 * 
 * Displays subscription plans side-by-side with feature comparison.
 * The Pro plan is highlighted with a red border and "Most Popular" badge.
 */

// Mock function for Stripe Checkout (replace with actual implementation)
const handleUpgrade = async (planId) => {
  console.log(`Initiating Stripe Checkout for plan: ${planId}`)
  
  // In production, this would:
  // 1. Call your backend to create a Stripe Checkout Session
  // 2. Redirect to Stripe's hosted checkout page
  // 3. Handle success/cancel webhooks
  
  // Mock implementation
  alert(`Redirecting to Stripe Checkout for ${planId}...\n\nIn production, this would open Stripe's hosted checkout page.`)
  
  // Example production code:
  // const response = await fetch('/api/create-checkout-session', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ priceId: PLANS[planId].stripePriceId }),
  // });
  // const { url } = await response.json();
  // window.location.href = url;
}

// Feature row component for comparison table
const FeatureRow = ({ feature, starterValue, proValue, starterIncluded, proIncluded }) => {
  return (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-neutral-800 last:border-b-0">
      <div className="text-neutral-300 text-sm">{feature}</div>
      <div className="text-center">
        {starterIncluded ? (
          <div className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-neutral-400 text-sm">{starterValue}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <X className="w-4 h-4 text-neutral-600" />
            <span className="text-neutral-600 text-sm">{starterValue}</span>
          </div>
        )}
      </div>
      <div className="text-center">
        {proIncluded ? (
          <div className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-red-400" />
            <span className="text-neutral-300 text-sm">{proValue}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <X className="w-4 h-4 text-neutral-600" />
            <span className="text-neutral-600 text-sm">{proValue}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Plan card component
const PlanCard = ({ plan, onSelect }) => {
  const isHighlighted = plan.ui.highlighted

  return (
    <div className={`
      relative bg-neutral-900 rounded-2xl p-8 flex flex-col
      transition-all duration-300 hover:shadow-xl
      ${isHighlighted 
        ? 'border-2 border-red-500 hover:shadow-red-500/10' 
        : 'border border-neutral-800 hover:border-neutral-700'
      }
    `}>
      {/* Badge */}
      {plan.ui.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5">
            <Crown className="w-3 h-3" />
            {plan.ui.badge}
          </div>
        </div>
      )}

      {/* Plan Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
        <p className="text-neutral-400 text-sm mb-4">{plan.description}</p>
        
        <div className="flex items-baseline justify-center gap-1">
          <span className={`text-5xl font-bold ${isHighlighted ? 'bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600' : 'text-white'}`}>
            {plan.priceDisplay}
          </span>
          {plan.price > 0 && (
            <span className="text-neutral-500">/{plan.billingPeriod}</span>
          )}
        </div>
        
        {plan.price === 0 && (
          <p className="text-neutral-500 text-sm mt-2">Free forever. No credit card required.</p>
        )}
      </div>

      {/* Features List */}
      <ul className="space-y-4 mb-8 flex-1">
        {/* Posts limit */}
        <li className="flex items-start gap-3">
          <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isHighlighted ? 'text-red-400' : 'text-green-400'}`} />
          <span className="text-neutral-300">
            {plan.limits.maxPostsPerMonth >= 10000 ? (
              <><strong className="text-white">Unlimited</strong> blog posts</>
            ) : (
              <><strong className="text-white">{plan.limits.maxPostsPerMonth}</strong> blog posts/month</>
            )}
          </span>
        </li>

        {/* Custom Domain */}
        <li className="flex items-start gap-3">
          {plan.features.allowCustomDomain ? (
            <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isHighlighted ? 'text-red-400' : 'text-green-400'}`} />
          ) : (
            <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-neutral-600" />
          )}
          <span className={plan.features.allowCustomDomain ? 'text-neutral-300' : 'text-neutral-500'}>
            {plan.features.allowCustomDomain ? 'Custom domain support' : 'yourname.streamtosite.com only'}
          </span>
        </li>

        {/* Monetization */}
        <li className="flex items-start gap-3">
          {plan.features.monetization === 'user' ? (
            <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isHighlighted ? 'text-red-400' : 'text-green-400'}`} />
          ) : (
            <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-neutral-600" />
          )}
          <span className={plan.features.monetization === 'user' ? 'text-neutral-300' : 'text-neutral-500'}>
            {plan.features.monetization === 'user' 
              ? <><strong className="text-white">Your AdSense</strong> - Keep 100% revenue</>
              : 'Platform ads (0% for you)'
            }
          </span>
        </li>

        {/* Remove Branding */}
        <li className="flex items-start gap-3">
          {plan.features.removeBranding ? (
            <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isHighlighted ? 'text-red-400' : 'text-green-400'}`} />
          ) : (
            <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-neutral-600" />
          )}
          <span className={plan.features.removeBranding ? 'text-neutral-300' : 'text-neutral-500'}>
            {plan.features.removeBranding ? 'White label (no branding)' : '"Powered by StreamToSite" footer'}
          </span>
        </li>

        {/* Auto Sync */}
        <li className="flex items-start gap-3">
          {plan.features.autoSync ? (
            <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isHighlighted ? 'text-red-400' : 'text-green-400'}`} />
          ) : (
            <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-neutral-600" />
          )}
          <span className={plan.features.autoSync ? 'text-neutral-300' : 'text-neutral-500'}>
            {plan.features.autoSync ? 'Auto-sync new videos daily' : 'Manual URL paste only'}
          </span>
        </li>

        {/* Premium Themes */}
        <li className="flex items-start gap-3">
          {plan.features.themes.length > 1 ? (
            <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isHighlighted ? 'text-red-400' : 'text-green-400'}`} />
          ) : (
            <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-neutral-600" />
          )}
          <span className={plan.features.themes.length > 1 ? 'text-neutral-300' : 'text-neutral-500'}>
            {plan.features.themes.length > 1 
              ? <><strong className="text-white">{plan.features.themes.length}</strong> premium themes</>
              : 'Basic theme only'
            }
          </span>
        </li>

        {/* Analytics */}
        <li className="flex items-start gap-3">
          {plan.features.analytics === 'realtime' ? (
            <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isHighlighted ? 'text-red-400' : 'text-green-400'}`} />
          ) : (
            <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-neutral-600" />
          )}
          <span className={plan.features.analytics === 'realtime' ? 'text-neutral-300' : 'text-neutral-500'}>
            {plan.features.analytics === 'realtime' 
              ? 'Realtime analytics + 30 day history'
              : 'Last 24 hours only'
            }
          </span>
        </li>

        {/* AI Co-Pilot */}
        <li className="flex items-start gap-3">
          {plan.features.aiCoPilot ? (
            <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isHighlighted ? 'text-red-400' : 'text-green-400'}`} />
          ) : (
            <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-neutral-600" />
          )}
          <span className={plan.features.aiCoPilot ? 'text-neutral-300' : 'text-neutral-500'}>
            {plan.features.aiCoPilot ? 'AI Co-Pilot writing assistant' : 'No AI assistance'}
          </span>
        </li>
      </ul>

      {/* CTA Button */}
      <button
        onClick={() => onSelect(plan.id === 'creator_pro' ? 'creatorPro' : 'starter')}
        className={`
          w-full py-4 px-6 rounded-lg font-semibold text-center transition-all duration-300
          ${isHighlighted 
            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white hover:shadow-lg hover:shadow-red-500/30'
            : 'bg-neutral-800 hover:bg-neutral-700 text-white'
          }
        `}
      >
        {plan.ui.ctaText}
      </button>
    </div>
  )
}

// Main PricingTable component
export default function PricingTable({ showComparison = false }) {
  const starter = PLANS.starter
  const pro = PLANS.creatorPro

  return (
    <div className="w-full">
      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <PlanCard plan={starter} onSelect={handleUpgrade} />
        <PlanCard plan={pro} onSelect={handleUpgrade} />
      </div>

      {/* Feature Comparison Table (Optional) */}
      {showComparison && (
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Feature Comparison
          </h3>
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 pb-4 border-b border-neutral-700 mb-4">
              <div className="text-neutral-500 text-sm font-medium">Feature</div>
              <div className="text-center">
                <span className="text-white font-semibold">Starter</span>
                <span className="text-neutral-500 text-sm block">Free</span>
              </div>
              <div className="text-center">
                <span className="text-red-400 font-semibold">Creator Pro</span>
                <span className="text-neutral-500 text-sm block">$29/mo</span>
              </div>
            </div>

            {/* Feature Rows */}
            <FeatureRow 
              feature="Blog posts" 
              starterValue="10/month"
              proValue="Unlimited"
              starterIncluded={true}
              proIncluded={true}
            />
            <FeatureRow 
              feature="Custom domain" 
              starterValue="Subdomain only"
              proValue="Your domain"
              starterIncluded={false}
              proIncluded={true}
            />
            <FeatureRow 
              feature="Monetization" 
              starterValue="0% revenue"
              proValue="100% yours"
              starterIncluded={false}
              proIncluded={true}
            />
            <FeatureRow 
              feature="Remove branding" 
              starterValue="No"
              proValue="Yes"
              starterIncluded={false}
              proIncluded={true}
            />
            <FeatureRow 
              feature="Auto-sync videos" 
              starterValue="No"
              proValue="Daily"
              starterIncluded={false}
              proIncluded={true}
            />
            <FeatureRow 
              feature="Premium themes" 
              starterValue="1 theme"
              proValue="4 themes"
              starterIncluded={false}
              proIncluded={true}
            />
            <FeatureRow 
              feature="Analytics history" 
              starterValue="24 hours"
              proValue="30 days"
              starterIncluded={true}
              proIncluded={true}
            />
            <FeatureRow 
              feature="AI Co-Pilot" 
              starterValue="No"
              proValue="Yes"
              starterIncluded={false}
              proIncluded={true}
            />
            <FeatureRow 
              feature="Max file size" 
              starterValue="20 MB"
              proValue="100 MB"
              starterIncluded={true}
              proIncluded={true}
            />
            <FeatureRow 
              feature="Video duration" 
              starterValue="30 min"
              proValue="60 min"
              starterIncluded={true}
              proIncluded={true}
            />
          </div>
        </div>
      )}

      {/* Money Back Guarantee */}
      <div className="text-center mt-8">
        <p className="text-neutral-500 text-sm">
          ✨ 14-day money-back guarantee on all paid plans
        </p>
      </div>
    </div>
  )
}
