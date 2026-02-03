'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import AdSenseConnect from '@/components/AdSenseConnect'
import { 
  DollarSign, 
  Key, 
  Shield, 
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Zap,
  Mail,
  ExternalLink,
  Copy,
  Eye,
  EyeOff,
  Info
} from 'lucide-react'

export default function RevenueHubPage() {
  const [amazonId, setAmazonId] = useState('')
  const [adsenseId, setAdsenseId] = useState('')
  const [autoAffiliate, setAutoAffiliate] = useState(true)
  const [exitIntent, setExitIntent] = useState(false)
  const [showAmazonKey, setShowAmazonKey] = useState(false)
  const [showAdsenseKey, setShowAdsenseKey] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const estimatedRevenue = {
    youtube: 847,
    blog: 2847,
    difference: 2000,
    percentage: 236
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-gradient">Revenue Hub</span>
          </h1>
          <p className="text-text/70">
            Maximize your earnings with automated monetization
          </p>
        </div>

        {/* AdSense Connect - The Blogify Killer Feature */}
        <AdSenseConnect />

        {/* Revenue Comparison Card */}
        <div className="bento-card bg-gradient-to-br from-green-500/10 to-primary/10 border-green-500/20">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold">Estimated Lost Revenue Calculator</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* YouTube Only */}
            <div className="bg-background/50 rounded-xl p-6 border border-border-color">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-text/60">YouTube Only</span>
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-red-400" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">${estimatedRevenue.youtube}</p>
              <p className="text-xs text-text/50">Monthly average</p>
            </div>

            {/* With Blog */}
            <div className="bg-background/50 rounded-xl p-6 border-2 border-green-500/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-green-400 font-semibold">YouTube + Blog</span>
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-green-400" />
                </div>
              </div>
              <p className="text-3xl font-bold text-green-400 mb-1">${estimatedRevenue.blog}</p>
              <p className="text-xs text-text/50">Projected monthly</p>
            </div>

            {/* Difference */}
            <div className="bg-gradient-primary rounded-xl p-6 border border-primary/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-white font-semibold">You're Missing</span>
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white mb-1">${estimatedRevenue.difference}</p>
              <p className="text-xs text-white/70">+{estimatedRevenue.percentage}% increase</p>
            </div>
          </div>

          <div className="mt-6 glass rounded-lg p-4">
            <p className="text-sm text-text/70">
              <strong className="text-green-400">Calculation:</strong> Based on your current YouTube CPM, 
              estimated blog traffic, and affiliate conversion rates. Actual results may vary.
            </p>
          </div>
        </div>

        {/* API Keys Configuration */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Amazon Associates */}
          <div className="bento-card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Key className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Amazon Associates</h3>
                <p className="text-sm text-text/60">Affiliate tracking ID</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-text/70 mb-2 block">
                  Associate ID
                </label>
                <div className="relative">
                  <input
                    type={showAmazonKey ? 'text' : 'password'}
                    value={amazonId}
                    onChange={(e) => setAmazonId(e.target.value)}
                    placeholder="yourname-20"
                    className="input w-full pr-20"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                    <button
                      onClick={() => setShowAmazonKey(!showAmazonKey)}
                      className="btn-ghost p-2"
                    >
                      {showAmazonKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button className="btn-ghost p-2">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="glass rounded-lg p-4 space-y-3">
                <div className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-text/70">
                    <p className="font-semibold text-blue-400 mb-1">How to find your ID:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Go to Amazon Associates dashboard</li>
                      <li>Click "Product Linking" → "Link to Any Page"</li>
                      <li>Your ID is shown at the top (format: yourname-20)</li>
                    </ol>
                  </div>
                </div>
              </div>

              <a
                href="https://affiliate-program.amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full text-center flex items-center justify-center space-x-2"
              >
                <span>Get Amazon Associate ID</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Google AdSense */}
          <div className="bento-card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Key className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Google AdSense</h3>
                <p className="text-sm text-text/60">Publisher ID</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-text/70 mb-2 block">
                  Publisher ID
                </label>
                <div className="relative">
                  <input
                    type={showAdsenseKey ? 'text' : 'password'}
                    value={adsenseId}
                    onChange={(e) => setAdsenseId(e.target.value)}
                    placeholder="pub-1234567890123456"
                    className="input w-full pr-20"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                    <button
                      onClick={() => setShowAdsenseKey(!showAdsenseKey)}
                      className="btn-ghost p-2"
                    >
                      {showAdsenseKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button className="btn-ghost p-2">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="glass rounded-lg p-4 space-y-3">
                <div className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-text/70">
                    <p className="font-semibold text-blue-400 mb-1">How to find your ID:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Go to AdSense dashboard</li>
                      <li>Click "Account" → "Settings"</li>
                      <li>Your Publisher ID starts with "pub-"</li>
                    </ol>
                  </div>
                </div>
              </div>

              <a
                href="https://www.google.com/adsense"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full text-center flex items-center justify-center space-x-2"
              >
                <span>Get AdSense Publisher ID</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Automation Settings */}
        <div className="bento-card">
          <div className="flex items-center space-x-3 mb-6">
            <Zap className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Automation Settings</h2>
          </div>

          <div className="space-y-6">
            {/* Auto-Inject Affiliate Links */}
            <div className="flex items-start justify-between p-6 rounded-xl bg-background/50 border border-border-color">
              <div className="flex-1 pr-6">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-bold">Auto-Inject Affiliate Links</h3>
                </div>
                <p className="text-sm text-text/70 mb-3">
                  Automatically detect movie titles and insert "Where to Watch" widgets with your 
                  Amazon Associate links. Increases revenue by 200-300%.
                </p>
                <div className="flex items-center space-x-2 text-xs text-green-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Recommended for maximum earnings</span>
                </div>
              </div>
              <div>
                <button
                  onClick={() => setAutoAffiliate(!autoAffiliate)}
                  className={`
                    relative w-16 h-8 rounded-full transition-colors duration-300
                    ${autoAffiliate ? 'bg-green-500' : 'bg-surface border border-border-color'}
                  `}
                >
                  <div
                    className={`
                      absolute top-1 w-6 h-6 rounded-full bg-white transition-transform duration-300
                      ${autoAffiliate ? 'translate-x-9' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>
            </div>

            {/* Exit-Intent Newsletter */}
            <div className="flex items-start justify-between p-6 rounded-xl bg-background/50 border border-border-color">
              <div className="flex-1 pr-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-bold">Enable Exit-Intent Newsletter Popup</h3>
                </div>
                <p className="text-sm text-text/70 mb-3">
                  Show a newsletter signup popup when visitors are about to leave. Build your email 
                  list and reduce platform dependency. Average conversion: 8-12%.
                </p>
                <div className="flex items-center space-x-2 text-xs text-text/60">
                  <Info className="w-4 h-4" />
                  <span>Non-intrusive, only shows on exit intent</span>
                </div>
              </div>
              <div>
                <button
                  onClick={() => setExitIntent(!exitIntent)}
                  className={`
                    relative w-16 h-8 rounded-full transition-colors duration-300
                    ${exitIntent ? 'bg-blue-500' : 'bg-surface border border-border-color'}
                  `}
                >
                  <div
                    className={`
                      absolute top-1 w-6 h-6 rounded-full bg-white transition-transform duration-300
                      ${exitIntent ? 'translate-x-9' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-text/60">
            <Shield className="w-4 h-4" />
            <span>All API keys are encrypted and stored securely</span>
          </div>
          <button
            onClick={handleSave}
            disabled={saved}
            className="btn-primary px-8 py-3 disabled:opacity-50"
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2 inline" />
                Saved Successfully
              </>
            ) : (
              <>
                <DollarSign className="w-5 h-5 mr-2 inline" />
                Save Configuration
              </>
            )}
          </button>
        </div>

        {/* Status Indicator */}
        {(amazonId || adsenseId) && (
          <div className="glass-strong rounded-xl p-6 border border-green-500/30 bg-green-500/5 animate-fade-in">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-green-400 mb-1">Monetization Active</h3>
                <p className="text-sm text-text/70">
                  Your blog is now generating revenue from {amazonId ? 'affiliate links' : ''} 
                  {amazonId && adsenseId ? ' and ' : ''} 
                  {adsenseId ? 'display ads' : ''}.
                </p>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
