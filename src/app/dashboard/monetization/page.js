'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
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
  Info,
  ArrowUpRight,
  CreditCard,
  PieChart
} from 'lucide-react'

// Toggle Switch Component
const ToggleSwitch = ({ enabled, onChange, color = 'emerald' }) => {
  const colorClasses = {
    emerald: enabled ? 'bg-emerald-500' : 'bg-neutral-200',
    blue: enabled ? 'bg-blue-500' : 'bg-neutral-200',
  }
  
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${colorClasses[color]}`}
    >
      <div
        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
          enabled ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

export default function MonetizationPage() {
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

  const revenue = {
    thisMonth: 2847,
    lastMonth: 2341,
    growth: 21.6,
    adsense: 1892,
    affiliate: 955,
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Monetization
          </h1>
          <p className="text-neutral-500 mt-1">
            Manage your revenue streams and maximize earnings
          </p>
        </div>

        {/* Revenue Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="stat-card-label">This Month</p>
                <p className="stat-card-value text-emerald-600">${revenue.thisMonth.toLocaleString()}</p>
              </div>
              <div className="stat-card-icon bg-emerald-100">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+{revenue.growth}% from last month</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="stat-card-label">Last Month</p>
                <p className="stat-card-value">${revenue.lastMonth.toLocaleString()}</p>
              </div>
              <div className="stat-card-icon bg-neutral-100">
                <TrendingUp className="w-5 h-5 text-neutral-600" />
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="stat-card-label">AdSense Revenue</p>
                <p className="stat-card-value text-blue-600">${revenue.adsense.toLocaleString()}</p>
              </div>
              <div className="stat-card-icon bg-blue-100">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="stat-card-label">Affiliate Revenue</p>
                <p className="stat-card-value text-orange-600">${revenue.affiliate.toLocaleString()}</p>
              </div>
              <div className="stat-card-icon bg-orange-100">
                <PieChart className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* API Keys Configuration */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Amazon Associates */}
          <div className="card">
            <div className="card-header flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Key className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Amazon Associates</h3>
                <p className="text-xs text-neutral-500">Affiliate tracking ID</p>
              </div>
            </div>

            <div className="card-body space-y-4">
              <div>
                <label className="text-sm text-neutral-600 mb-1.5 block">Associate ID</label>
                <div className="relative">
                  <input
                    type={showAmazonKey ? 'text' : 'password'}
                    value={amazonId}
                    onChange={(e) => setAmazonId(e.target.value)}
                    placeholder="yourname-20"
                    className="input pr-20"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button
                      onClick={() => setShowAmazonKey(!showAmazonKey)}
                      className="btn-icon w-8 h-8"
                    >
                      {showAmazonKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button className="btn-icon w-8 h-8">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-neutral-600">
                    <p className="font-medium text-blue-600 mb-1">How to find your ID:</p>
                    <ol className="list-decimal list-inside space-y-0.5">
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
                className="btn-secondary w-full justify-center"
              >
                <span>Get Amazon Associate ID</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Google AdSense */}
          <div className="card">
            <div className="card-header flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Key className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Google AdSense</h3>
                <p className="text-xs text-neutral-500">Publisher ID</p>
              </div>
            </div>

            <div className="card-body space-y-4">
              <div>
                <label className="text-sm text-neutral-600 mb-1.5 block">Publisher ID</label>
                <div className="relative">
                  <input
                    type={showAdsenseKey ? 'text' : 'password'}
                    value={adsenseId}
                    onChange={(e) => setAdsenseId(e.target.value)}
                    placeholder="pub-1234567890123456"
                    className="input pr-20"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button
                      onClick={() => setShowAdsenseKey(!showAdsenseKey)}
                      className="btn-icon w-8 h-8"
                    >
                      {showAdsenseKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button className="btn-icon w-8 h-8">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-neutral-600">
                    <p className="font-medium text-blue-600 mb-1">How to find your ID:</p>
                    <ol className="list-decimal list-inside space-y-0.5">
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
                className="btn-secondary w-full justify-center"
              >
                <span>Get AdSense Publisher ID</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Automation Settings */}
        <div className="card">
          <div className="card-header flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <Zap className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">Automation Settings</h3>
              <p className="text-xs text-neutral-500">Configure automatic monetization features</p>
            </div>
          </div>

          <div className="card-body space-y-4">
            {/* Auto-Inject Affiliate Links */}
            <div className="flex items-start justify-between p-4 rounded-lg bg-neutral-50 border border-neutral-200">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <h4 className="font-medium text-neutral-900">Auto-Inject Affiliate Links</h4>
                </div>
                <p className="text-xs text-neutral-500 mb-2">
                  Automatically detect product mentions and insert affiliate links.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Recommended for maximum earnings</span>
                </div>
              </div>
              <ToggleSwitch enabled={autoAffiliate} onChange={setAutoAffiliate} color="emerald" />
            </div>

            {/* Exit-Intent Newsletter */}
            <div className="flex items-start justify-between p-4 rounded-lg bg-neutral-50 border border-neutral-200">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <h4 className="font-medium text-neutral-900">Exit-Intent Newsletter Popup</h4>
                </div>
                <p className="text-xs text-neutral-500 mb-2">
                  Show a newsletter signup popup when visitors are about to leave.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                  <Info className="w-3.5 h-3.5" />
                  <span>Average conversion: 8-12%</span>
                </div>
              </div>
              <ToggleSwitch enabled={exitIntent} onChange={setExitIntent} color="blue" />
            </div>
          </div>
        </div>

        {/* Save Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <Shield className="w-4 h-4" />
            <span>All API keys are encrypted and stored securely</span>
          </div>
          <button
            onClick={handleSave}
            disabled={saved}
            className="btn-primary px-6 disabled:opacity-50"
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Saved Successfully
              </>
            ) : (
              <>
                <DollarSign className="w-4 h-4" />
                Save Configuration
              </>
            )}
          </button>
        </div>

        {/* Active Status */}
        {(amazonId || adsenseId) && (
          <div className="card border-emerald-200 bg-emerald-50/50">
            <div className="card-body flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-emerald-700">Monetization Active</h3>
                <p className="text-sm text-emerald-600/80">
                  Your blog is now generating revenue from {amazonId ? 'affiliate links' : ''} 
                  {amazonId && adsenseId ? ' and ' : ''} 
                  {adsenseId ? 'display ads' : ''}.
                </p>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
