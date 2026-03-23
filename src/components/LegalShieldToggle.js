'use client'

import { useState } from 'react'
import { Shield, AlertTriangle, CheckCircle2, Info } from 'lucide-react'

export default function LegalShieldToggle({ enabled = false, onChange }) {
  const [isEnabled, setIsEnabled] = useState(enabled)

  const handleToggle = () => {
    const newValue = !isEnabled
    setIsEnabled(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <div className="space-y-4">
      {/* Main Toggle Card */}
      <div className={`
        rounded-xl p-6 border-2 transition-all duration-300
        ${isEnabled 
          ? 'bg-green-500/10 border-green-500/30' 
          : 'bg-orange-500/10 border-orange-500/30'
        }
      `}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className={`
              w-10 h-10 rounded-xl flex items-center justify-center
              ${isEnabled ? 'bg-green-500/20' : 'bg-orange-500/20'}
            `}>
              {isEnabled ? (
                <Shield className="w-6 h-6 text-green-400" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-orange-400" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Legal Shield Mode</h3>
              <p className="text-sm text-text/70">
                {isEnabled 
                  ? 'Fair Use protection is ACTIVE. Your content includes transformative commentary.'
                  : 'WARNING: Generic summaries risk copyright strikes. Enable protection.'
                }
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={handleToggle}
            className={`
              relative w-16 h-8 rounded-full transition-colors duration-300 flex-shrink-0
              ${isEnabled ? 'bg-green-500' : 'bg-orange-500'}
            `}
          >
            <div
              className={`
                absolute top-1 w-6 h-6 rounded-full bg-white transition-transform duration-300
                ${isEnabled ? 'translate-x-9' : 'translate-x-1'}
              `}
            />
          </button>
        </div>

        {/* Status Indicator */}
        <div className={`
          flex items-center space-x-2 text-sm font-medium
          ${isEnabled ? 'text-green-400' : 'text-orange-400'}
        `}>
          <div className={`w-2 h-2 rounded-full animate-pulse ${isEnabled ? 'bg-green-400' : 'bg-orange-400'}`} />
          <span>{isEnabled ? 'Protected' : 'Unprotected'}</span>
        </div>
      </div>

      {/* Explanation Panel */}
      {isEnabled ? (
        <div className="glass rounded-xl p-6 border border-green-500/20">
          <div className="flex items-start space-x-3 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-green-400 mb-2">What Legal Shield Does:</h4>
              <ul className="space-y-2 text-sm text-text/70">
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>
                    <strong className="text-text">Inserts "Critical Review" Section:</strong> Adds original analysis and commentary that transforms the source material.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>
                    <strong className="text-text">Adds "Transformative Commentary":</strong> Clearly distinguishes your insights from the original content.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>
                    <strong className="text-text">Fair Use Compliance:</strong> Structures content to meet legal requirements for commentary and criticism.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>
                    <strong className="text-text">Visual Indicators:</strong> Green shields and badges show protected sections.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/20">
            <p className="text-xs text-text/60">
              <strong className="text-green-400">Legal Note:</strong> While Legal Shield Mode structures your content for Fair Use compliance, 
              it does not guarantee legal protection. Consult a legal professional for specific advice.
            </p>
          </div>
        </div>
      ) : (
        <div className="glass rounded-xl p-6 border border-orange-500/20">
          <div className="flex items-start space-x-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-orange-400 mb-2">Why You Should Enable This:</h4>
              <ul className="space-y-2 text-sm text-text/70">
                <li className="flex items-start space-x-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>
                    <strong className="text-text">Generic AI Summaries = Risk:</strong> Simply summarizing content can trigger copyright claims.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>
                    <strong className="text-text">Blogify's Weakness:</strong> They generate basic summaries without legal protection.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>
                    <strong className="text-text">Our Advantage:</strong> We structure content for Fair Use compliance from the start.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-500/5 rounded-lg p-4 border border-orange-500/20">
            <div className="flex items-start space-x-2">
              <Info className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-text/60">
                <strong className="text-orange-400">Recommendation:</strong> Always enable Legal Shield Mode for movie recaps, 
                news summaries, and any content based on copyrighted material.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Table */}
      <div className="glass rounded-xl p-6">
        <h4 className="font-bold mb-4">Content Structure Comparison</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Without Shield */}
          <div className="bg-orange-500/5 rounded-lg p-4 border border-orange-500/20">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-semibold text-orange-400">Without Legal Shield</span>
            </div>
            <ul className="space-y-2 text-xs text-text/60">
              <li>❌ Generic summary only</li>
              <li>❌ No transformative content</li>
              <li>❌ Higher copyright risk</li>
              <li>❌ Similar to Blogify output</li>
            </ul>
          </div>

          {/* With Shield */}
          <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/20">
            <div className="flex items-center space-x-2 mb-3">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-green-400">With Legal Shield</span>
            </div>
            <ul className="space-y-2 text-xs text-text/60">
              <li>✅ Critical analysis section</li>
              <li>✅ Transformative commentary</li>
              <li>✅ Fair Use compliance</li>
              <li>✅ Unique to StreamToSite</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
