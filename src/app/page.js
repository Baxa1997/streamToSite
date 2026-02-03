'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { 
  TrendingDown, 
  AlertTriangle, 
  SearchX,
  ArrowRight,
  Youtube,
  FileText,
  Sparkles,
  DollarSign,
  BarChart3,
  Zap,
  Check
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen gradient-mesh">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow animate-delay-200" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI-Powered Content Generation</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-gradient-white">Own Your Audience.</span>
              <br />
              <span className="text-gradient">Beat the Algorithm.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-text/80 max-w-3xl mx-auto leading-relaxed">
              Turn your YouTube videos into a revenue-generating blog in seconds.
              <br />
              <span className="text-text/60">No coding. No hosting headaches. Just paste and publish.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/dashboard" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                Start Building Free
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Link>
              <Link href="#examples" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                See Examples
              </Link>
            </div>

            {/* Social Proof */}
            <p className="text-sm text-text/50 pt-4">
              Join 1,000+ creators who own their content destiny
            </p>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              The Platform Problem
            </h2>
            <p className="text-xl text-text/70">
              Relying on YouTube alone is killing your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Problem 1 */}
            <div className="bento-card group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Ad Revenue Volatility</h3>
              <p className="text-text/70 leading-relaxed">
                CPM rates fluctuate wildly. One algorithm change and your income drops 50% overnight.
              </p>
            </div>

            {/* Problem 2 */}
            <div className="bento-card group">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Copyright Strikes</h3>
              <p className="text-text/70 leading-relaxed">
                Movie clips and news footage? You're one claim away from losing your entire channel.
              </p>
            </div>

            {/* Problem 3 */}
            <div className="bento-card group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <SearchX className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Zero SEO Traffic</h3>
              <p className="text-text/70 leading-relaxed">
                YouTube videos don't rank on Google. You're missing millions of search visitors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              The StreamToSite Solution
            </h2>
            <p className="text-xl text-text/70">
              From video to SEO-optimized blog in 60 seconds
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Input Demo */}
            <div className="card-glass p-8 space-y-6 animate-slide-up">
              <div className="flex items-center space-x-3 mb-6">
                <Youtube className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold">Step 1: Paste URL</h3>
              </div>
              
              <div className="space-y-4">
                <div className="input flex items-center space-x-3">
                  <Youtube className="w-5 h-5 text-text/50" />
                  <span className="text-text/50">https://youtube.com/watch?v=...</span>
                </div>
                
                <button className="btn-primary w-full text-lg py-4">
                  <Sparkles className="w-5 h-5 mr-2 inline" />
                  Generate Blog Post
                </button>
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex items-center space-x-2 text-sm text-text/70">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>AI extracts key moments</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-text/70">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Generates SEO-optimized content</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-text/70">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Inserts AdSense placements</span>
                </div>
              </div>
            </div>

            {/* Right: Output Demo */}
            <div className="card-glass p-8 space-y-6 animate-slide-up animate-delay-200">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="w-8 h-8 text-green-400" />
                <h3 className="text-2xl font-bold">Step 2: Publish</h3>
              </div>

              <div className="bg-surface rounded-lg p-6 space-y-4 border border-border-color custom-scrollbar overflow-y-auto max-h-96">
                <div className="space-y-2">
                  <div className="h-2 bg-primary/20 rounded w-3/4" />
                  <div className="h-2 bg-text/10 rounded w-full" />
                  <div className="h-2 bg-text/10 rounded w-5/6" />
                </div>

                <div className="bg-background/50 rounded p-4 border border-primary/20">
                  <div className="text-xs text-primary mb-2">📺 Embedded Video</div>
                  <div className="aspect-video bg-surface rounded" />
                </div>

                <div className="space-y-2">
                  <div className="h-2 bg-text/10 rounded w-full" />
                  <div className="h-2 bg-text/10 rounded w-4/5" />
                  <div className="h-2 bg-text/10 rounded w-full" />
                </div>

                <div className="bg-green-500/10 rounded p-3 border border-green-500/20">
                  <div className="text-xs text-green-400">💰 AdSense Placement</div>
                </div>

                <div className="space-y-2">
                  <div className="h-2 bg-text/10 rounded w-full" />
                  <div className="h-2 bg-text/10 rounded w-3/4" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border-color">
                <span className="text-sm text-text/70">SEO Score</span>
                <span className="text-2xl font-bold text-green-400">94/100</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-text/70">
              Start free. Scale when you're ready.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="card-hover">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-text/60">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-text/80">5 blog posts per month</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-text/80">yourname.streamtosite.com subdomain</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-text/80">Basic SEO optimization</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-text/80">AdSense integration</span>
                </li>
              </ul>

              <Link href="/dashboard" className="btn-secondary w-full text-center block">
                Get Started
              </Link>
            </div>

            {/* Empire Plan */}
            <div className="card relative overflow-hidden border-2 border-primary">
              <div className="absolute top-0 right-0 bg-gradient-primary text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                POPULAR
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Empire</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl font-bold text-gradient">$29</span>
                  <span className="text-text/60">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-text/80"><strong>Unlimited</strong> blog posts</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-text/80">Custom domain support</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-text/80">Advanced SEO tools</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-text/80">Priority AI processing</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-text/80">Analytics dashboard</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-text/80">Premium themes</span>
                </li>
              </ul>

              <Link href="/dashboard" className="btn-primary w-full text-center block">
                Start Empire Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-color py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gradient">StreamToSite</span>
            </div>
            
            <p className="text-text/60 text-sm">
              © 2026 StreamToSite. Own your audience, beat the algorithm.
            </p>

            <div className="flex items-center space-x-6">
              <Link href="#" className="text-text/60 hover:text-text text-sm transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-text/60 hover:text-text text-sm transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-text/60 hover:text-text text-sm transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
