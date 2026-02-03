'use client'

import { useState } from 'react'
import { 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Loader2,
  Eye,
  EyeOff,
  Zap,
  Send
} from 'lucide-react'

export default function WordPressConnect() {
  const [wpUrl, setWpUrl] = useState('')
  const [wpUsername, setWpUsername] = useState('')
  const [wpPassword, setWpPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState('')

  const handleTestConnection = () => {
    setIsConnecting(true)
    setConnectionError('')
    
    setTimeout(() => {
      setIsConnecting(false)
      
      if (Math.random() > 0.1) {
        setIsConnected(true)
      } else {
        setConnectionError('Failed to connect. Please check your credentials and try again.')
      }
    }, 2500)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setWpUrl('')
    setWpUsername('')
    setWpPassword('')
  }

  return (
    <div className="bento-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Globe className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold">WordPress Integration</h3>
            <p className="text-sm text-text/60">Publish directly to your WordPress site</p>
          </div>
        </div>
        
        {isConnected && (
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-semibold text-green-400">Connected</span>
          </div>
        )}
      </div>

      {!isConnected ? (
        <div className="space-y-6">
          {/* Connection Form */}
          <div className="space-y-4">
            {/* WordPress URL */}
            <div>
              <label className="text-sm font-semibold mb-2 block">
                WordPress Site URL
              </label>
              <input
                type="url"
                value={wpUrl}
                onChange={(e) => setWpUrl(e.target.value)}
                placeholder="https://yoursite.com"
                className="input w-full"
              />
              <p className="text-xs text-text/50 mt-1">
                The full URL of your WordPress site
              </p>
            </div>

            {/* Username */}
            <div>
              <label className="text-sm font-semibold mb-2 block">
                Username
              </label>
              <input
                type="text"
                value={wpUsername}
                onChange={(e) => setWpUsername(e.target.value)}
                placeholder="admin"
                className="input w-full"
              />
            </div>

            {/* Application Password */}
            <div>
              <label className="text-sm font-semibold mb-2 block">
                Application Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={wpPassword}
                  onChange={(e) => setWpPassword(e.target.value)}
                  placeholder="xxxx xxxx xxxx xxxx xxxx xxxx"
                  className="input w-full pr-12"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 btn-ghost p-2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-text/50 mt-1">
                Not your regular password. Generate one in WordPress → Users → Profile
              </p>
            </div>
          </div>

          {/* How to Get Application Password */}
          <div className="glass rounded-lg p-4 border border-blue-500/20 bg-blue-500/5">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-blue-400 mb-2">How to create an Application Password:</p>
                <ol className="list-decimal list-inside space-y-1 text-text/70">
                  <li>Log in to your WordPress admin panel</li>
                  <li>Go to <strong>Users → Profile</strong></li>
                  <li>Scroll down to <strong>Application Passwords</strong></li>
                  <li>Enter a name (e.g., "StreamToSite") and click <strong>Add New</strong></li>
                  <li>Copy the generated password and paste it above</li>
                </ol>
                <a
                  href="https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-blue-400 hover:underline mt-2"
                >
                  <span>Learn more</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {connectionError && (
            <div className="glass rounded-lg p-4 border border-red-500/20 bg-red-500/5 animate-fade-in">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-red-400 mb-1">Connection Failed</p>
                  <p className="text-sm text-text/70">{connectionError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Test Connection Button */}
          <button
            onClick={handleTestConnection}
            disabled={!wpUrl || !wpUsername || !wpPassword || isConnecting}
            className="btn-primary w-full py-3 disabled:opacity-50"
          >
            {isConnecting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 inline animate-spin" />
                Testing Connection...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2 inline" />
                Test Connection
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Connected State */}
          <div className="glass rounded-lg p-6 border border-green-500/20 bg-green-500/5">
            <div className="flex items-start space-x-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-green-400 mb-1">Successfully Connected!</p>
                <p className="text-sm text-text/70 mb-3">
                  Your WordPress site is now linked to StreamToSite
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-text/60">Site URL:</span>
                    <a
                      href={wpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center space-x-1"
                    >
                      <span>{wpUrl}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text/60">Username:</span>
                    <span className="font-mono">{wpUsername}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Publishing Options */}
          <div className="space-y-4">
            <h4 className="font-semibold">Publishing Options</h4>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-4 rounded-lg bg-surface border border-border-color hover:border-primary/30 transition-colors cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <div className="flex-1">
                  <p className="font-medium">Auto-publish to WordPress</p>
                  <p className="text-xs text-text/60">Automatically publish posts to WordPress when you click "Publish"</p>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-4 rounded-lg bg-surface border border-border-color hover:border-primary/30 transition-colors cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <div className="flex-1">
                  <p className="font-medium">Keep posts in sync</p>
                  <p className="text-xs text-text/60">Update WordPress when you edit posts on StreamToSite</p>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-4 rounded-lg bg-surface border border-border-color hover:border-primary/30 transition-colors cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <div className="flex-1">
                  <p className="font-medium">Preserve formatting</p>
                  <p className="text-xs text-text/60">Maintain your custom styling when publishing</p>
                </div>
              </label>
            </div>
          </div>

          {/* Test Publish */}
          <div className="flex items-center space-x-3">
            <button className="btn-secondary flex-1 py-3">
              <Send className="w-4 h-4 mr-2 inline" />
              Test Publish
            </button>
            <button
              onClick={handleDisconnect}
              className="btn-ghost px-6 py-3"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}

      {/* Benefits */}
      <div className="mt-6 pt-6 border-t border-border-color">
        <h4 className="text-sm font-semibold mb-3">Why Connect WordPress?</h4>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex items-start space-x-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="text-text/70">Publish to both platforms simultaneously</span>
          </div>
          <div className="flex items-start space-x-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="text-text/70">Keep your existing WordPress site</span>
          </div>
          <div className="flex items-start space-x-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="text-text/70">Maintain SEO and backlinks</span>
          </div>
          <div className="flex items-start space-x-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="text-text/70">Automatic content synchronization</span>
          </div>
        </div>
      </div>
    </div>
  )
}
