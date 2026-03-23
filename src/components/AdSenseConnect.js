'use client'

import { useState } from 'react'
import { CheckCircle2, Clock, Zap, TrendingUp, Info } from 'lucide-react'

const ADSENSE_STATES = {
  DISCONNECTED: 'disconnected',
  PENDING: 'pending',
  ACTIVE: 'active'
}

export default function AdSenseConnect() {
  const [status, setStatus] = useState(ADSENSE_STATES.DISCONNECTED)
  const [platformFee, setPlatformFee] = useState(0)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = () => {
    setIsConnecting(true)
    
    // Simulate OAuth flow
    setTimeout(() => {
      setStatus(ADSENSE_STATES.PENDING)
      setIsConnecting(false)
      
      // Simulate Google review process
      setTimeout(() => {
        setStatus(ADSENSE_STATES.ACTIVE)
      }, 3000)
    }, 2000)
  }

  const renderDisconnected = () => (
    <div className="space-y-6">
      <div className="text-center py-8">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        
        <h3 className="text-2xl font-bold mb-3">Connect Google AdSense</h3>
        <p className="text-text/70 max-w-md mx-auto mb-6">
          One-click integration. No code required. Start earning from your content immediately.
        </p>

        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="btn-primary px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: isConnecting ? undefined : 'linear-gradient(135deg, #4285f4 0%, #34a853 100%)',
          }}
        >
          {isConnecting ? (
            <>
              <Clock className="w-5 h-5 mr-2 inline animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2 inline" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              Connect with Google
            </>
          )}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass rounded-lg p-4 text-center">
          <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-sm font-semibold mb-1">Instant Setup</p>
          <p className="text-xs text-text/60">No code, no hassle</p>
        </div>
        <div className="glass rounded-lg p-4 text-center">
          <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <p className="text-sm font-semibold mb-1">0% Platform Fee</p>
          <p className="text-xs text-text/60">Keep 100% of earnings</p>
        </div>
        <div className="glass rounded-lg p-4 text-center">
          <CheckCircle2 className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <p className="text-sm font-semibold mb-1">Auto-Optimization</p>
          <p className="text-xs text-text/60">AI-powered placement</p>
        </div>
      </div>
    </div>
  )

  const renderPending = () => (
    <div className="space-y-6">
      <div className="text-center py-8">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-yellow-500/20 border-2 border-yellow-500/30 flex items-center justify-center">
          <Clock className="w-10 h-10 text-yellow-400 animate-pulse" />
        </div>
        
        <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-full mb-4">
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-sm font-semibold text-yellow-400">Under Review</span>
        </div>

        <h3 className="text-2xl font-bold mb-3">Your Site is Being Reviewed</h3>
        <p className="text-text/70 max-w-md mx-auto mb-6">
          Google is reviewing your site for AdSense compliance. This typically takes 24-48 hours.
        </p>
      </div>

      <div className="glass rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-text/70">
            <p className="font-semibold text-text mb-2">What happens next?</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Google reviews your content for policy compliance</li>
              <li>Your site is checked for quality and user experience</li>
              <li>Once approved, ads will automatically appear on your blog</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-background/50 rounded-lg p-4 border border-border-color">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-text/70">Review Progress</span>
          <span className="text-sm font-semibold text-yellow-400">45%</span>
        </div>
        <div className="h-2 bg-surface rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 w-[45%] animate-pulse" />
        </div>
      </div>
    </div>
  )

  const renderActive = () => (
    <div className="space-y-6">
      <div className="text-center py-8">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-green-500/20 border-2 border-green-500/30 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>
        
        <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-full mb-4">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-semibold text-green-400">Monetized</span>
        </div>

        <h3 className="text-2xl font-bold mb-3">AdSense is Active!</h3>
        <p className="text-text/70 max-w-md mx-auto mb-6">
          Your blog is now generating revenue. Ads are automatically optimized for maximum earnings.
        </p>
      </div>

      {/* Platform Fee Slider - The Competitive Advantage */}
      <div className="bento-card bg-gradient-to-br from-green-500/10 to-primary/10 border-green-500/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold mb-1">Platform Fee</h4>
            <p className="text-sm text-text/60">Unlike Blogify, we don't take a cut</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-green-400">{platformFee}%</div>
            <p className="text-xs text-green-400">You keep 100%</p>
          </div>
        </div>

        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="0"
            value={platformFee}
            onChange={(e) => setPlatformFee(Number(e.target.value))}
            className="w-full h-2 bg-green-500/20 rounded-full appearance-none cursor-not-allowed"
            style={{
              background: 'linear-gradient(to right, #22c55e 0%, #22c55e 100%)',
            }}
            disabled
          />
          
          <div className="glass rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-green-400 mb-1">Competitive Advantage</p>
                <p className="text-text/70">
                  Blogify charges 15-20% platform fees. We charge <strong className="text-green-400">0%</strong>. 
                  You own your content, you keep all the revenue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card-glass p-4">
          <p className="text-xs text-text/60 mb-1">Today's Earnings</p>
          <p className="text-2xl font-bold text-green-400">$47.23</p>
          <p className="text-xs text-green-400 mt-1">+12.5%</p>
        </div>
        <div className="card-glass p-4">
          <p className="text-xs text-text/60 mb-1">This Month</p>
          <p className="text-2xl font-bold">$1,234.56</p>
          <p className="text-xs text-text/60 mt-1">Projected: $2,847</p>
        </div>
        <div className="card-glass p-4">
          <p className="text-xs text-text/60 mb-1">Ad Impressions</p>
          <p className="text-2xl font-bold">124,582</p>
          <p className="text-xs text-blue-400 mt-1">CTR: 2.3%</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="bento-card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Google AdSense</h2>
          <p className="text-sm text-text/60">One-click monetization</p>
        </div>
      </div>

      {status === ADSENSE_STATES.DISCONNECTED && renderDisconnected()}
      {status === ADSENSE_STATES.PENDING && renderPending()}
      {status === ADSENSE_STATES.ACTIVE && renderActive()}
    </div>
  )
}
