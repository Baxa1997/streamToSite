'use client'

import { useState } from 'react'
import { Play, ExternalLink, TrendingUp, DollarSign, Sparkles } from 'lucide-react'

const streamingServices = [
  {
    name: 'Netflix',
    color: 'from-red-600 to-red-700',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    textColor: 'text-red-400',
    commission: '4%',
    available: true,
  },
  {
    name: 'Prime Video',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    commission: '5%',
    available: true,
  },
  {
    name: 'Hulu',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    textColor: 'text-green-400',
    commission: '3%',
    available: false,
  },
  {
    name: 'Disney+',
    color: 'from-blue-400 to-blue-500',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/30',
    textColor: 'text-blue-300',
    commission: '4%',
    available: true,
  },
]

export default function AffiliateWidget({ movieTitle = 'Inception', sticky = true }) {
  const [clicks, setClicks] = useState(0)

  const handleClick = (service) => {
    setClicks(prev => prev + 1)
    // In production, this would track affiliate clicks
    console.log(`Affiliate click: ${service}`)
  }

  return (
    <div className={`${sticky ? 'sticky top-24' : ''} space-y-4`}>
      {/* Main Widget */}
      <div className="glass-strong rounded-2xl p-6 border border-primary/20 shadow-lg shadow-primary/10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Where to Watch</h3>
              <p className="text-xs text-text/60">Stream {movieTitle} now</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-xs text-green-400">
            <Sparkles className="w-3 h-3" />
            <span>Earn</span>
          </div>
        </div>

        {/* Streaming Services */}
        <div className="space-y-3">
          {streamingServices.map((service) => (
            <button
              key={service.name}
              onClick={() => handleClick(service.name)}
              disabled={!service.available}
              className={`
                w-full flex items-center justify-between p-4 rounded-xl
                border transition-all duration-300 group
                ${service.available 
                  ? `${service.bgColor} ${service.borderColor} hover:scale-105 hover:shadow-lg cursor-pointer` 
                  : 'bg-surface/30 border-border-color opacity-50 cursor-not-allowed'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                  <Play className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">{service.name}</p>
                  {service.available ? (
                    <p className="text-xs text-text/60">Available now</p>
                  ) : (
                    <p className="text-xs text-text/40">Not available</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {service.available && (
                  <>
                    <span className="text-xs text-green-400 font-medium">+{service.commission}</span>
                    <ExternalLink className={`w-4 h-4 ${service.textColor} group-hover:scale-110 transition-transform`} />
                  </>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-text/60">
              <DollarSign className="w-3 h-3" />
              <span>Affiliate earnings enabled</span>
            </div>
            <div className="flex items-center space-x-1 text-green-400">
              <TrendingUp className="w-3 h-3" />
              <span className="font-medium">{clicks} clicks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Indicator */}
      <div className="glass rounded-xl p-4 border border-green-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-green-400">Monetization Active</span>
          </div>
          <span className="text-xs text-text/60">Est. $2-5/click</span>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="text-center">
        <p className="text-xs text-text/50">
          Powered by Amazon Associates
        </p>
      </div>
    </div>
  )
}
