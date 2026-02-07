'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Check, 
  X, 
  Crown, 
  Zap, 
  ArrowRight, 
  Shield,
  Sparkles,
  TrendingUp,
  Video,
  Globe,
  DollarSign,
  BarChart3,
  Mail,
  Search
} from 'lucide-react'
import { PLANS } from '@/config/plans'

// Feature Item Component
const FeatureItem = ({ included, children, highlight = false }) => (
  <li className="flex items-start gap-3">
    {included ? (
      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
        highlight ? 'bg-emerald-500' : 'bg-emerald-500/20'
      }`}>
        <Check className={`w-3 h-3 ${highlight ? 'text-white' : 'text-emerald-500'}`} />
      </div>
    ) : (
      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-neutral-700/50">
        <X className="w-3 h-3 text-neutral-500" />
      </div>
    )}
    <span className={included ? 'text-neutral-200' : 'text-neutral-500'}>
      {children}
    </span>
  </li>
)

// Locked Feature (shows what unlocks on Pro)
const LockedFeature = ({ children }) => (
  <li className="flex items-start gap-3">
    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-amber-500/20 border border-amber-500/30">
      <Zap className="w-3 h-3 text-amber-500" />
    </div>
    <span className="text-neutral-400">
      {children} <span className="text-amber-500 text-xs font-medium">(Unlocks on Pro)</span>
    </span>
  </li>
)

// Starter/Growth Plan Card
const StarterCard = () => {
  const plan = PLANS.FREE

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col h-full hover:border-neutral-700 transition-colors">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-neutral-400" />
          </div>
          <div>
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Starter</span>
            <h3 className="text-xl font-bold text-white">{plan.ui.headline}</h3>
          </div>
        </div>
        
        <div className="flex items-baseline gap-1 mt-4">
          <span className="text-5xl font-bold text-white">$0</span>
          <span className="text-neutral-500">/forever</span>
        </div>
        <p className="text-neutral-500 text-sm mt-2">No credit card required. Free forever.</p>
      </div>

      {/* Features - INCLUDED FIRST */}
      <ul className="space-y-3 flex-1 mb-8">
        {/* Included Features */}
        <li className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">What's Included</li>
        <FeatureItem included={true} highlight={true}>
          <strong className="text-white">Unlimited</strong> AI Blog Posts
        </FeatureItem>
        <FeatureItem included={true}>
          <strong className="text-white">Auto-Sync 1</strong> YouTube Channel
        </FeatureItem>
        <FeatureItem included={true}>
          <strong className="text-white">Free Subdomain</strong> (yourname.streamtosite.com)
        </FeatureItem>
        <FeatureItem included={true}>
          <strong className="text-white">Analytics</strong> - Last 24 hours
        </FeatureItem>
        <FeatureItem included={true}>
          Standard Theme
        </FeatureItem>

        {/* Divider */}
        <li className="pt-3 border-t border-neutral-800"></li>
        
        {/* Not Included Features */}
        <li className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Unlocks on Pro</li>
        <FeatureItem included={false}>
          Ad Revenue (0% for you)
        </FeatureItem>
        <FeatureItem included={false}>
          Custom Domain
        </FeatureItem>
        <FeatureItem included={false}>
          Media Studio Tools
        </FeatureItem>
        <FeatureItem included={false}>
          White Label (remove branding)
        </FeatureItem>
        <FeatureItem included={false}>
          Email Newsletter Capture
        </FeatureItem>
      </ul>

      {/* CTA */}
      <Link
        href="/dashboard"
        className="w-full py-4 px-6 rounded-xl font-semibold text-center transition-all duration-300 bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center gap-2"
      >
        Get Started Free
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

// Pro/Business Plan Card
const ProCard = () => {
  const plan = PLANS.PRO

  return (
    <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 border-2 border-red-500 rounded-2xl p-8 flex flex-col h-full relative overflow-hidden">
      {/* Popular Badge */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-6 py-2 rounded-b-xl flex items-center gap-1.5 shadow-lg shadow-red-500/25">
          <Crown className="w-3.5 h-3.5" />
          MOST POPULAR
        </div>
      </div>

      {/* Header */}
      <div className="mb-6 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <span className="text-xs font-medium text-red-400 uppercase tracking-wider">Creator Pro</span>
            <h3 className="text-xl font-bold text-white">{plan.ui.headline}</h3>
          </div>
        </div>
        
        <div className="flex items-baseline gap-1 mt-4">
          <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">$29</span>
          <span className="text-neutral-500">/month</span>
        </div>
        <p className="text-neutral-500 text-sm mt-2">Cancel anytime. 14-day money-back guarantee.</p>
      </div>

      {/* Features */}
      <ul className="space-y-3 flex-1 mb-8">
        <li className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Everything Included</li>
        
        {/* Key Features - Highlighted */}
        <FeatureItem included={true} highlight={true}>
          <strong className="text-white">Keep 100%</strong> Ad & Affiliate Revenue
        </FeatureItem>
        <FeatureItem included={true} highlight={true}>
          <strong className="text-white">Connect Custom Domain</strong> (yourname.com)
        </FeatureItem>
        
        {/* All Features */}
        <FeatureItem included={true}>
          <strong className="text-white">Unlimited</strong> Blog Posts
        </FeatureItem>
        <FeatureItem included={true}>
          <strong className="text-white">Auto-Sync 10</strong> YouTube Channels
        </FeatureItem>
        <FeatureItem included={true}>
          <strong className="text-white">Media Studio</strong> - Smart Snapshots & Video Tools
        </FeatureItem>
        <FeatureItem included={true}>
          <strong className="text-white">White Label</strong> - Remove "Powered By"
        </FeatureItem>
        <FeatureItem included={true}>
          <strong className="text-white">Analytics</strong> - Realtime + 30-day history
        </FeatureItem>
        <FeatureItem included={true}>
          <strong className="text-white">Email Newsletter</strong> Capture Forms
        </FeatureItem>
        <FeatureItem included={true}>
          <strong className="text-white">Priority SEO</strong> Indexing
        </FeatureItem>
        <FeatureItem included={true}>
          <strong className="text-white">4 Premium</strong> Themes
        </FeatureItem>
      </ul>

      {/* CTA */}
      <button
        onClick={() => {
          // In production: redirect to Stripe checkout
          alert('Redirecting to Stripe Checkout...\n\nIn production, this would open Stripe\'s hosted checkout page.')
        }}
        className="w-full py-4 px-6 rounded-xl font-semibold text-center transition-all duration-300 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
      >
        <Sparkles className="w-4 h-4" />
        Start Pro - $29/mo
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}

// Main Pricing Page Component
export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState('monthly')

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Navigation */}
      <nav className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            Stream<span className="text-red-500">ToSite</span>
          </Link>
          <Link 
            href="/dashboard" 
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Go to Dashboard →
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Simple, Transparent Pricing
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Choose Your Path to{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
              Passive Income
            </span>
          </h1>
          
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Start free and upgrade when you're ready to monetize. 
            No hidden fees, no contracts, cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <StarterCard />
            <ProCard />
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            What's Included
          </h2>
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left py-4 px-6 text-neutral-500 text-sm font-medium">Feature</th>
                  <th className="text-center py-4 px-6 text-neutral-500 text-sm font-medium w-32">
                    Starter
                    <span className="block text-xs text-neutral-600">Free</span>
                  </th>
                  <th className="text-center py-4 px-6 text-red-400 text-sm font-medium w-32">
                    Pro
                    <span className="block text-xs text-neutral-500">$29/mo</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                <tr>
                  <td className="py-4 px-6 text-neutral-300">Blog Posts</td>
                  <td className="text-center py-4 px-6">
                    <span className="text-emerald-400 font-semibold">Unlimited</span>
                  </td>
                  <td className="text-center py-4 px-6">
                    <span className="text-emerald-400 font-semibold">Unlimited</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-neutral-300">Auto-Sync Channels</td>
                  <td className="text-center py-4 px-6 text-neutral-400">1 channel</td>
                  <td className="text-center py-4 px-6 text-white font-medium">10 channels</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-neutral-300">Ad Revenue Share</td>
                  <td className="text-center py-4 px-6 text-red-400">0%</td>
                  <td className="text-center py-4 px-6 text-emerald-400 font-bold">100%</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-neutral-300">Custom Domain</td>
                  <td className="text-center py-4 px-6">
                    <X className="w-5 h-5 text-neutral-600 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-neutral-300">Media Studio Tools</td>
                  <td className="text-center py-4 px-6">
                    <X className="w-5 h-5 text-neutral-600 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-neutral-300">Remove Branding</td>
                  <td className="text-center py-4 px-6">
                    <X className="w-5 h-5 text-neutral-600 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-neutral-300">Email Capture</td>
                  <td className="text-center py-4 px-6">
                    <X className="w-5 h-5 text-neutral-600 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-neutral-300">Analytics</td>
                  <td className="text-center py-4 px-6 text-neutral-400">Last 24h</td>
                  <td className="text-center py-4 px-6 text-white font-medium">30 days + Realtime</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-neutral-300">Themes</td>
                  <td className="text-center py-4 px-6 text-neutral-400">1 theme</td>
                  <td className="text-center py-4 px-6 text-white font-medium">4 premium themes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 text-neutral-500 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              <span>14-Day Money Back</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-500" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-500" />
              <span>Cancel Anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">How does the free tier work?</h3>
              <p className="text-neutral-400 text-sm">
                The free "Growth" plan lets you create unlimited blog posts and auto-sync 1 YouTube channel. 
                We display our ads on your site, and you get a free subdomain (yourname.streamtosite.com). 
                It's completely free forever - no credit card required.
              </p>
            </div>
            
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">How do I keep 100% of ad revenue on Pro?</h3>
              <p className="text-neutral-400 text-sm">
                When you upgrade to Pro, you enter YOUR OWN AdSense and affiliate IDs in the Monetization settings. 
                All ads displayed on your site will be linked to your accounts, meaning all revenue goes directly to you.
                We don't take any cut.
              </p>
            </div>
            
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">Can I upgrade or downgrade anytime?</h3>
              <p className="text-neutral-400 text-sm">
                Yes! You can upgrade to Pro anytime, and your new features activate immediately.
                If you downgrade, you'll keep Pro features until the end of your billing cycle.
                There are no contracts or long-term commitments.
              </p>
            </div>
            
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">What is the Media Studio?</h3>
              <p className="text-neutral-400 text-sm">
                The Media Studio (Pro only) includes Smart Snapshots - auto-extracted screenshots from your YouTube videos 
                that you can drag directly into your blog posts. It also includes the embedded video player for previewing content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-6 bg-gradient-to-b from-neutral-950 to-neutral-900 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Your Blogging Empire?
          </h2>
          <p className="text-neutral-400 mb-8">
            Join thousands of creators turning their YouTube content into passive income.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/25 transition-all"
          >
            Start Free Today
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
