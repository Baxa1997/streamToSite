'use client'

import { useState } from 'react'
import { Globe, CheckCircle2, AlertCircle, Copy, ExternalLink, Loader2, Shield } from 'lucide-react'

export default function DomainSettings() {
  const [subdomain, setSubdomain] = useState('john')
  const [customDomain, setCustomDomain] = useState('')
  const [isCheckingSubdomain, setIsCheckingSubdomain] = useState(false)
  const [isVerifyingDomain, setIsVerifyingDomain] = useState(false)
  const [subdomainAvailable, setSubdomainAvailable] = useState(true)
  const [domainVerified, setDomainVerified] = useState(false)
  const [showDNSInstructions, setShowDNSInstructions] = useState(false)

  const handleCheckSubdomain = () => {
    setIsCheckingSubdomain(true)
    
    // Simulate availability check
    setTimeout(() => {
      setIsCheckingSubdomain(false)
      setSubdomainAvailable(true)
    }, 1500)
  }

  const handleVerifyDomain = () => {
    setIsVerifyingDomain(true)
    
    // Simulate DNS verification
    setTimeout(() => {
      setIsVerifyingDomain(false)
      setDomainVerified(true)
    }, 3000)
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Domain Settings</h2>
        <p className="text-text/70">
          Configure your subdomain or connect a custom domain
        </p>
      </div>

      {/* State 1: Subdomain Configuration */}
      <div className="bento-card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold">StreamToSite Subdomain</h3>
            <p className="text-sm text-text/60">Free subdomain on our platform</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-text/70 mb-2 block">
              Choose your subdomain
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 flex items-center bg-surface border border-border-color rounded-lg overflow-hidden">
                <input
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="flex-1 px-4 py-3 bg-transparent border-none focus:outline-none"
                  placeholder="yourname"
                />
                <span className="px-4 py-3 text-text/50 border-l border-border-color">
                  .streamtosite.com
                </span>
              </div>
              <button
                onClick={handleCheckSubdomain}
                disabled={!subdomain || isCheckingSubdomain}
                className="btn-secondary px-6 py-3 disabled:opacity-50"
              >
                {isCheckingSubdomain ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 inline animate-spin" />
                    Checking...
                  </>
                ) : (
                  'Check Availability'
                )}
              </button>
            </div>
          </div>

          {subdomainAvailable && subdomain && (
            <div className="glass rounded-lg p-4 border border-green-500/20 bg-green-500/5 animate-fade-in">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-green-400 mb-1">
                    {subdomain}.streamtosite.com is available!
                  </p>
                  <p className="text-sm text-text/70 mb-3">
                    Your site will be live at this URL immediately after publishing.
                  </p>
                  <a
                    href={`http://localhost:3000?subdomain=${subdomain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-sm text-primary hover:underline"
                  >
                    <span>Preview your site</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border-color" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-background text-sm text-text/50">OR</span>
        </div>
      </div>

      {/* State 2: Custom Domain */}
      <div className="bento-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Custom Domain</h3>
              <p className="text-sm text-text/60">Use your own domain name</p>
            </div>
          </div>
          {domainVerified && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-semibold text-green-400">Verified</span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Domain Input */}
          <div>
            <label className="text-sm text-text/70 mb-2 block">
              Enter your domain
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value.toLowerCase())}
                placeholder="www.yourdomain.com"
                className="input flex-1"
              />
              <button
                onClick={() => setShowDNSInstructions(true)}
                disabled={!customDomain}
                className="btn-secondary px-6 py-3 disabled:opacity-50"
              >
                Configure DNS
              </button>
            </div>
          </div>

          {/* DNS Instructions */}
          {showDNSInstructions && customDomain && (
            <div className="space-y-4 animate-slide-up">
              {/* Instructions Box */}
              <div className="glass rounded-xl p-6 border border-blue-500/20 bg-blue-500/5">
                <div className="flex items-start space-x-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-blue-400 mb-2">DNS Configuration Required</h4>
                    <p className="text-sm text-text/70">
                      Add the following DNS records to your domain provider (GoDaddy, Namecheap, Cloudflare, etc.)
                    </p>
                  </div>
                </div>

                {/* DNS Records Table */}
                <div className="space-y-3">
                  {/* CNAME Record */}
                  <div className="bg-background/50 rounded-lg p-4 border border-border-color">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-text/60 uppercase tracking-wide">
                        CNAME Record
                      </span>
                      <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded">
                        Required
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-text/50 block mb-1">Type</label>
                        <div className="flex items-center space-x-2">
                          <code className="text-sm font-mono bg-surface px-2 py-1 rounded">CNAME</code>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-text/50 block mb-1">Name/Host</label>
                        <div className="flex items-center space-x-2">
                          <code className="text-sm font-mono bg-surface px-2 py-1 rounded flex-1">@</code>
                          <button
                            onClick={() => handleCopy('@')}
                            className="btn-ghost p-1"
                            title="Copy"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-text/50 block mb-1">Value/Points to</label>
                        <div className="flex items-center space-x-2">
                          <code className="text-sm font-mono bg-surface px-2 py-1 rounded flex-1 truncate">
                            cname.streamtosite.com
                          </code>
                          <button
                            onClick={() => handleCopy('cname.streamtosite.com')}
                            className="btn-ghost p-1"
                            title="Copy"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* A Record (Alternative) */}
                  <div className="bg-background/50 rounded-lg p-4 border border-border-color">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-text/60 uppercase tracking-wide">
                        A Record (Alternative)
                      </span>
                      <span className="text-xs px-2 py-1 bg-text/10 text-text/60 rounded">
                        Optional
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-text/50 block mb-1">Type</label>
                        <code className="text-sm font-mono bg-surface px-2 py-1 rounded">A</code>
                      </div>
                      <div>
                        <label className="text-xs text-text/50 block mb-1">Name/Host</label>
                        <div className="flex items-center space-x-2">
                          <code className="text-sm font-mono bg-surface px-2 py-1 rounded flex-1">@</code>
                          <button
                            onClick={() => handleCopy('@')}
                            className="btn-ghost p-1"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-text/50 block mb-1">Value/IP Address</label>
                        <div className="flex items-center space-x-2">
                          <code className="text-sm font-mono bg-surface px-2 py-1 rounded flex-1">
                            76.76.21.21
                          </code>
                          <button
                            onClick={() => handleCopy('76.76.21.21')}
                            className="btn-ghost p-1"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Help Text */}
                <div className="mt-4 p-3 bg-background/50 rounded-lg border border-border-color">
                  <p className="text-xs text-text/60">
                    <strong>Note:</strong> DNS changes can take 24-48 hours to propagate globally. 
                    Most providers update within 1-2 hours.
                  </p>
                </div>
              </div>

              {/* Verification */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-surface border border-border-color">
                <div>
                  <p className="font-semibold mb-1">Ready to verify?</p>
                  <p className="text-sm text-text/60">
                    Click the button after you've added the DNS records
                  </p>
                </div>
                <button
                  onClick={handleVerifyDomain}
                  disabled={isVerifyingDomain || domainVerified}
                  className="btn-primary px-6 py-3 disabled:opacity-50"
                >
                  {isVerifyingDomain ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 inline animate-spin" />
                      Verifying DNS...
                    </>
                  ) : domainVerified ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2 inline" />
                      Verified
                    </>
                  ) : (
                    'Verify DNS'
                  )}
                </button>
              </div>

              {/* Success Message */}
              {domainVerified && (
                <div className="glass rounded-lg p-4 border border-green-500/20 bg-green-500/5 animate-fade-in">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-400 mb-1">
                        Domain verified successfully!
                      </p>
                      <p className="text-sm text-text/70 mb-3">
                        Your site is now live at <strong>{customDomain}</strong>
                      </p>
                      <a
                        href={`http://${customDomain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-sm text-primary hover:underline"
                      >
                        <span>Visit your site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SSL Certificate Info */}
      <div className="glass rounded-lg p-4 border border-border-color">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-semibold text-green-400 mb-1">SSL Certificate Included</p>
            <p className="text-text/70">
              All domains (subdomains and custom) automatically get free SSL certificates. 
              Your site will be served over HTTPS with no additional configuration.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
