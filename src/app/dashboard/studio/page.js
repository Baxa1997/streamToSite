'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import ProductSidebar from '@/components/ProductSidebar'
import LegalShieldToggle from '@/components/LegalShieldToggle'
import { 
  Youtube, 
  Sparkles, 
  Loader2,
  Play,
  FileText,
  Image as ImageIcon,
  DollarSign,
  Eye,
  CheckCircle2,
  Shield
} from 'lucide-react'

export default function StudioPage() {
  const [url, setUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [legalShieldEnabled, setLegalShieldEnabled] = useState(true)
  const [videoTitle, setVideoTitle] = useState('The Ultimate Guide to Understanding Inception\'s Ending')

  const handleGenerate = () => {
    if (!url) return
    setIsGenerating(true)
    
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false)
      setShowPreview(true)
    }, 3000)
  }

  const handleAddProduct = (product, buttonHTML) => {
    console.log('Product added:', product)
    console.log('Button HTML:', buttonHTML)
    // In production, this would insert the HTML into the editor
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-gradient">Content Studio</span>
          </h1>
          <p className="text-text/70">
            Transform any video into an SEO-optimized blog post in seconds
          </p>
        </div>

        {/* Input Area */}
        <div className="bento-card max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI-Powered Generation</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Paste Your Video URL</h2>
            <p className="text-text/60">YouTube, TikTok, or any video platform</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Youtube className="w-5 h-5 text-text/50" />
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="input w-full pl-12 text-lg py-4"
                disabled={isGenerating}
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!url || isGenerating}
              className="btn-primary w-full text-xl py-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 inline animate-spin" />
                  Generating Your Blog Post...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 mr-3 inline" />
                  Generate Site
                </>
              )}
            </button>
          </div>

          {/* Processing Steps */}
          {isGenerating && (
            <div className="mt-8 space-y-3 animate-fade-in">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <Loader2 className="w-5 h-5 text-primary animate-spin flex-shrink-0" />
                <span className="text-sm">Analyzing video content...</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-surface/50 border border-border-color opacity-50">
                <div className="w-5 h-5 rounded-full border-2 border-text/20 flex-shrink-0" />
                <span className="text-sm text-text/60">Generating SEO-optimized content...</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-surface/50 border border-border-color opacity-50">
                <div className="w-5 h-5 rounded-full border-2 border-text/20 flex-shrink-0" />
                <span className="text-sm text-text/60">Inserting ad placements...</span>
              </div>
            </div>
          )}
        </div>

        {/* Legal Shield Toggle - The Blogify Killer Feature */}
        {showPreview && (
          <div className="max-w-4xl mx-auto animate-slide-up">
            <LegalShieldToggle 
              enabled={legalShieldEnabled}
              onChange={setLegalShieldEnabled}
            />
          </div>
        )}

        {/* Product Matcher Sidebar - Beating Blogify */}
        {showPreview && (
          <div className="max-w-4xl mx-auto animate-slide-up">
            <ProductSidebar 
              videoTitle={videoTitle}
              onAddProduct={handleAddProduct}
            />
          </div>
        )}

        {/* Editor Preview - Split View */}
        {showPreview && (
          <div className="grid lg:grid-cols-2 gap-6 animate-slide-up">
            {/* Left: Video Player */}
            <div className="bento-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center space-x-2">
                  <Play className="w-5 h-5 text-primary" />
                  <span>Original Video</span>
                </h3>
                <span className="badge-info">Source</span>
              </div>

              <div className="aspect-video bg-background rounded-lg border border-border-color flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <Play className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-text/60 text-sm">Video Player Embed</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text/60">Duration</span>
                  <span className="font-medium">12:34</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text/60">Platform</span>
                  <span className="font-medium">YouTube</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text/60">Views</span>
                  <span className="font-medium">1.2M</span>
                </div>
              </div>
            </div>

            {/* Right: Generated Content Editor */}
            <div className="bento-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-green-400" />
                  <span>Generated Blog Post</span>
                </h3>
                <span className="badge-success">Ready</span>
              </div>

              <div className="bg-background rounded-lg border border-border-color p-6 custom-scrollbar overflow-y-auto max-h-[600px] space-y-6">
                {/* Title */}
                <div>
                  <label className="text-xs text-text/60 uppercase tracking-wide mb-2 block">
                    Title (H1)
                  </label>
                  <input
                    type="text"
                    defaultValue="The Ultimate Guide to Understanding Inception's Ending"
                    className="input w-full font-bold text-lg"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <label className="text-xs text-text/60 uppercase tracking-wide mb-2 block">
                    Meta Description
                  </label>
                  <textarea
                    defaultValue="Dive deep into Christopher Nolan's masterpiece. We break down the ending, analyze the spinning top, and reveal the hidden clues you missed."
                    className="input w-full resize-none"
                    rows={2}
                  />
                </div>

                {/* Section 1: The Hook */}
                <div className="border-l-4 border-primary pl-4">
                  <label className="text-xs text-primary uppercase tracking-wide mb-2 block font-semibold">
                    Section 1: The Hook
                  </label>
                  <div className="bg-surface/50 rounded-lg p-4 border border-border-color">
                    <p className="text-sm leading-relaxed">
                      Christopher Nolan's "Inception" left audiences worldwide debating one question: 
                      Did the top stop spinning? In this comprehensive breakdown, we'll explore the 
                      film's intricate layers, hidden symbolism, and what the director really meant...
                    </p>
                  </div>
                </div>

                {/* Video Embed Placeholder */}
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <Play className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-primary">Embedded Video</span>
                  </div>
                  <div className="aspect-video bg-background/50 rounded border border-primary/20 flex items-center justify-center">
                    <Youtube className="w-12 h-12 text-primary/50" />
                  </div>
                </div>

                {/* Section 2: The Recap */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <label className="text-xs text-blue-400 uppercase tracking-wide mb-2 block font-semibold">
                    Section 2: The Recap
                  </label>
                  <div className="bg-surface/50 rounded-lg p-4 border border-border-color">
                    <p className="text-sm leading-relaxed">
                      Dom Cobb is a skilled thief who specializes in extraction—stealing secrets from 
                      people's subconscious. When offered a chance to have his criminal record erased, 
                      he accepts one final job: inception...
                    </p>
                  </div>
                </div>

                {/* Section 3: Critical Analysis - FAIR USE SHIELD */}
                <div className="border-l-4 border-green-500 pl-4 bg-green-500/5 rounded-r-lg py-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <label className="text-xs text-green-400 uppercase tracking-wide font-semibold">
                      Section 3: Critical Analysis (Fair Use Protected)
                    </label>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 border border-green-500/20">
                    <p className="text-sm leading-relaxed text-green-300 font-medium mb-2">
                      The Spinning Top: A Masterclass in Misdirection
                    </p>
                    <p className="text-sm leading-relaxed text-text/80">
                      Nolan's genius lies not in the answer, but in making us ask the wrong question. 
                      The real clue is hidden in plain sight: Cobb's wedding ring. This transformative 
                      analysis reveals the truth...
                    </p>
                  </div>
                </div>

                {/* Section 4: Hidden Details */}
                <div className="border-l-4 border-purple-500 pl-4">
                  <label className="text-xs text-purple-400 uppercase tracking-wide mb-2 block font-semibold">
                    Section 4: Hidden Details & Easter Eggs
                  </label>
                  <div className="bg-surface/50 rounded-lg p-4 border border-border-color">
                    <p className="text-sm leading-relaxed">
                      • The carpet pattern matches The Shining<br />
                      • "Mal" means "evil" in French<br />
                      • The children's ages change in the final scene
                    </p>
                  </div>
                </div>

                {/* Ad Placement */}
                <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-semibold text-green-400">AdSense Placement #1</span>
                  </div>
                  <div className="h-24 bg-background/50 rounded border border-green-500/20 flex items-center justify-center">
                    <span className="text-xs text-text/40">Advertisement Space</span>
                  </div>
                </div>

                {/* Affiliate Widget Preview */}
                <div className="bg-orange-500/5 rounded-lg p-4 border border-orange-500/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <Sparkles className="w-5 h-5 text-orange-400" />
                    <span className="text-sm font-semibold text-orange-400">Auto-Generated Affiliate Widget</span>
                  </div>
                  <div className="bg-background/50 rounded border border-orange-500/20 p-3">
                    <p className="text-xs text-text/60 mb-2">Where to Watch: Inception</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>Netflix</span>
                        <span className="text-green-400">+4% commission</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>Prime Video</span>
                        <span className="text-green-400">+5% commission</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEO Score */}
              <div className="mt-4 flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  <div>
                    <p className="font-semibold text-green-400">SEO Score</p>
                    <p className="text-xs text-text/60">Optimized for search engines</p>
                  </div>
                </div>
                <span className="text-3xl font-bold text-green-400">94/100</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {showPreview && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-4xl mx-auto animate-fade-in">
            <button className="btn-secondary w-full sm:w-auto px-8 py-4">
              <Eye className="w-5 h-5 mr-2 inline" />
              Preview Site
            </button>
            <button className="btn-primary w-full sm:w-auto px-8 py-4">
              <CheckCircle2 className="w-5 h-5 mr-2 inline" />
              Publish Now
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
