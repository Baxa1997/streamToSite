'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { 
  Palette, 
  Globe, 
  CheckCircle2,
  Newspaper,
  Film,
  Minimize2,
  Eye,
  Copy,
  ExternalLink
} from 'lucide-react'

const themes = [
  {
    id: 'newsroom',
    name: 'Newsroom',
    description: 'Clean, professional layout for news creators',
    icon: Newspaper,
    preview: 'Modern grid layout with bold headlines',
    colors: ['#1a1a1a', '#ef4444', '#ffffff'],
  },
  {
    id: 'cinema',
    name: 'Cinema Dark',
    description: 'Immersive dark theme for movie content',
    icon: Film,
    preview: 'Cinematic experience with rich imagery',
    colors: ['#0a0a0a', '#dc2626', '#ededed'],
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple, distraction-free reading experience',
    icon: Minimize2,
    preview: 'Clean typography, maximum readability',
    colors: ['#ffffff', '#000000', '#666666'],
  },
]

export default function BuilderPage() {
  const [selectedTheme, setSelectedTheme] = useState('cinema')
  const [subdomain, setSubdomain] = useState('johndoe')
  const [customDomain, setCustomDomain] = useState('')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(`${subdomain}.streamtosite.com`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-gradient">Site Builder</span>
          </h1>
          <p className="text-text/70">
            Customize your blog's appearance and domain settings
          </p>
        </div>

        {/* Theme Selector */}
        <div className="bento-card">
          <div className="flex items-center space-x-3 mb-6">
            <Palette className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Choose Your Theme</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {themes.map((theme) => {
              const Icon = theme.icon
              const isSelected = selectedTheme === theme.id

              return (
                <div
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`
                    relative cursor-pointer rounded-xl p-6 border-2 transition-all duration-300
                    ${isSelected 
                      ? 'border-primary bg-primary/5 shadow-lg shadow-primary/20' 
                      : 'border-border-color bg-surface hover:border-primary/50 hover:bg-surface-light'
                    }
                  `}
                >
                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center mb-4
                    ${isSelected ? 'bg-primary/20' : 'bg-white/5'}
                  `}>
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-primary' : 'text-text/70'}`} />
                  </div>

                  {/* Theme Info */}
                  <h3 className="text-lg font-bold mb-2">{theme.name}</h3>
                  <p className="text-sm text-text/70 mb-4">{theme.description}</p>

                  {/* Preview */}
                  <div className="bg-background/50 rounded-lg p-3 border border-border-color mb-4">
                    <p className="text-xs text-text/60">{theme.preview}</p>
                  </div>

                  {/* Color Palette */}
                  <div className="flex items-center space-x-2">
                    {theme.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-border-color"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Preview Button */}
          <div className="mt-6 flex justify-center">
            <button className="btn-secondary">
              <Eye className="w-5 h-5 mr-2 inline" />
              Preview Selected Theme
            </button>
          </div>
        </div>

        {/* Domain Settings */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Subdomain */}
          <div className="bento-card">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold">Subdomain</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-text/70 mb-2 block">
                  Your StreamToSite URL
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="input flex-1"
                    placeholder="yourname"
                  />
                  <span className="text-text/60 whitespace-nowrap">.streamtosite.com</span>
                </div>
              </div>

              {/* Live URL Display */}
              <div className="glass rounded-lg p-4">
                <p className="text-xs text-text/60 mb-2">Your live site:</p>
                <div className="flex items-center justify-between">
                  <a
                    href={`https://${subdomain}.streamtosite.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium flex items-center space-x-2"
                  >
                    <span>{subdomain}.streamtosite.com</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={handleCopy}
                    className="btn-ghost p-2"
                    title="Copy URL"
                  >
                    {copied ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button className="btn-primary w-full">
                Save Subdomain
              </button>
            </div>
          </div>

          {/* Custom Domain */}
          <div className="bento-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Globe className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold">Custom Domain</h2>
              </div>
              <span className="badge bg-primary/10 text-primary border-primary/20">
                Empire Plan
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-text/70 mb-2 block">
                  Use your own domain
                </label>
                <input
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value.toLowerCase())}
                  className="input w-full"
                  placeholder="yourdomain.com"
                />
              </div>

              {/* DNS Instructions */}
              <div className="bg-background/50 rounded-lg p-4 border border-border-color space-y-3">
                <p className="text-sm font-semibold mb-2">DNS Configuration:</p>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between p-2 bg-surface rounded">
                    <span className="text-text/60">Type:</span>
                    <span>CNAME</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-surface rounded">
                    <span className="text-text/60">Host:</span>
                    <span>@</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-surface rounded">
                    <span className="text-text/60">Value:</span>
                    <span>cname.streamtosite.com</span>
                  </div>
                </div>
              </div>

              <button className="btn-primary w-full">
                Connect Domain
              </button>

              <p className="text-xs text-text/60 text-center">
                Need help? <a href="#" className="text-primary hover:underline">View setup guide</a>
              </p>
            </div>
          </div>
        </div>

        {/* Site Settings */}
        <div className="bento-card">
          <h2 className="text-2xl font-bold mb-6">Site Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-text/70 mb-2 block">
                Site Title
              </label>
              <input
                type="text"
                defaultValue="John's Movie Recaps"
                className="input w-full"
              />
            </div>

            <div>
              <label className="text-sm text-text/70 mb-2 block">
                Tagline
              </label>
              <input
                type="text"
                defaultValue="Breaking down cinema, one scene at a time"
                className="input w-full"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-text/70 mb-2 block">
                Site Description
              </label>
              <textarea
                defaultValue="Your go-to source for in-depth movie analysis, plot breakdowns, and hidden details you might have missed."
                className="input w-full resize-none"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm text-text/70 mb-2 block">
                Favicon URL
              </label>
              <input
                type="text"
                placeholder="https://example.com/favicon.ico"
                className="input w-full"
              />
            </div>

            <div>
              <label className="text-sm text-text/70 mb-2 block">
                Logo URL
              </label>
              <input
                type="text"
                placeholder="https://example.com/logo.png"
                className="input w-full"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="btn-primary">
              Save Changes
            </button>
          </div>
        </div>

        {/* Preview Card */}
        <div className="bento-card bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="text-xl font-bold mb-2">Ready to see your site live?</h3>
              <p className="text-text/70">Preview your changes before publishing</p>
            </div>
            <button className="btn-primary">
              <Eye className="w-5 h-5 mr-2 inline" />
              Launch Preview
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
