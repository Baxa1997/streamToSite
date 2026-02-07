'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import PricingTable from '@/components/marketing/PricingTable'
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
  Check,
  Star,
  Play,
  Quote,
  X,
  Image as ImageIcon,
  Type,
  Hash,
  Link2
} from 'lucide-react'

// Testimonial data - balanced for grid layout
const testimonials = [
  {
    id: 1,
    name: 'Juan Manuel Garrido',
    role: 'Digital Marketer',
    date: 'Jan 3, 2024',
    rating: 5,
    title: "StreamToSite it's a total game-changer",
    content: "With StreamToSite, one person from our digital marketing team can pull off what usually takes at least 4 people. We mainly use it to turn videos into written content.",
    avatar: '👨‍💼',
    hasVideo: true,
    videoTitle: 'Transforming Podcasts into SEO Powerhouses'
  },
  {
    id: 2,
    name: 'Thierry ROBERT',
    role: 'Content Creator',
    date: 'October 25, 2023',
    rating: 5,
    title: 'This tool is very reactive and...',
    content: "This tool is very reactive and professional. From a video URL or file, it makes a great blog post in any language. Very impressive!",
    avatar: '🎬',
    hasVideo: true,
    videoTitle: 'Unlocking Blogging Potential'
  },
  {
    id: 3,
    name: 'Steve Day',
    role: 'Tech Blogger',
    date: 'November 10, 2023',
    rating: 5,
    title: 'Probably one of the best AI copywriting...',
    content: "Probably one of the best AI copywriting apps I've used for converting video or audio into engaging, well-written and SEO-ready blog posts.",
    avatar: '💻',
    hasVideo: false
  },
  {
    id: 4,
    name: 'Conan Breitmeier',
    role: 'Podcast Host',
    date: 'October 04, 2023',
    rating: 5,
    title: 'Does it all and more!',
    content: "I have been working on converting podcasts into blogs for over a year. StreamToSite makes it effortless!",
    avatar: '🎙️',
    hasVideo: true,
    videoTitle: 'Embrace Efficiency: A Deep Dive'
  },
]

// Footer links data
const footerLinks = {
  company: [
    { label: 'Pricing', href: '#pricing' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'F.A.Q.', href: '#' },
    { label: 'Blogs', href: '#' },
    { label: 'Partner Program', href: '#' },
    { label: 'Case Study', href: '#' },
  ],
  social: [
    { label: 'Facebook', href: '#' },
    { label: 'X / Twitter', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Product Hunt', href: '#' },
    { label: 'Pinterest', href: '#' },
    { label: 'Instagram', href: '#' },
  ],
  videoToBlog: [
    { label: 'YouTube Video to Blog', href: '#' },
    { label: 'Vimeo Video to Blog', href: '#' },
    { label: 'Rumble Video to Blog', href: '#' },
    { label: 'TikTok Video to Blog', href: '#' },
    { label: 'Facebook Video to Blog', href: '#' },
    { label: 'Twitter to Blog', href: '#' },
  ],
  audioToBlog: [
    { label: 'Apple Podcast to Blog', href: '#' },
    { label: 'Castbox to Blog', href: '#' },
    { label: 'Podchaser to Blog', href: '#' },
    { label: 'Podbean to Blog', href: '#' },
    { label: 'SoundCloud to Blog', href: '#' },
    { label: 'Spotify to Blog', href: '#' },
  ],
  integrations: [
    { label: 'WordPress.com', href: '#' },
    { label: 'WordPress.org', href: '#' },
    { label: 'Medium.com', href: '#' },
    { label: 'Blogger.com', href: '#' },
    { label: 'LinkedIn.com', href: '#' },
    { label: 'Zapier.com', href: '#' },
  ],
}

export default function LandingPage() {
  return (
    <div className="min-h-screen gradient-mesh">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-white">AI-Powered Content Generation</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">Own Your Audience.</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">Beat the Algorithm.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Turn your YouTube videos into a revenue-generating blog in seconds.
              <br />
              <span className="text-neutral-400">No coding. No hosting headaches. Just paste and publish.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/dashboard" className="bg-red-500 hover:bg-red-600 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 w-full sm:w-auto flex items-center justify-center">
                Start Building Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="#examples" className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto text-center">
                See Examples
              </Link>
            </div>

            {/* Social Proof */}
            <p className="text-sm text-neutral-500 pt-4">
              Join 1,000+ creators who own their content destiny
            </p>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              The Platform Problem
            </h2>
            <p className="text-xl text-neutral-400">
              Relying on YouTube alone is killing your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Problem 1 */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-red-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Ad Revenue Volatility</h3>
              <p className="text-neutral-400 leading-relaxed">
                CPM rates fluctuate wildly. One algorithm change and your income drops 50% overnight.
              </p>
            </div>

            {/* Problem 2 */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-red-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Copyright Strikes</h3>
              <p className="text-neutral-400 leading-relaxed">
                Movie clips and news footage? You're one claim away from losing your entire channel.
              </p>
            </div>

            {/* Problem 3 */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-red-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <SearchX className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Zero SEO Traffic</h3>
              <p className="text-neutral-400 leading-relaxed">
                YouTube videos don't rank on Google. You're missing millions of search visitors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              The StreamToSite Solution
            </h2>
            <p className="text-xl text-neutral-400">
              From video to SEO-optimized blog in 60 seconds
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Left: Input Demo */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <Youtube className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-white">Step 1: Paste URL</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 flex items-center space-x-3">
                  <Youtube className="w-5 h-5 text-neutral-500" />
                  <span className="text-neutral-400">https://youtube.com/watch?v=...</span>
                </div>
                
                <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold text-lg py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Generate Blog Post
                </button>
              </div>

              <div className="pt-4 space-y-3 border-t border-neutral-800">
                <div className="flex items-center space-x-3 text-sm">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-neutral-300">AI extracts key moments automatically</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-neutral-300">Generates SEO-optimized content</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-neutral-300">Inserts AdSense placements strategically</span>
                </div>
              </div>
            </div>

            {/* Right: Output Demo - More detailed blog post preview */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white">Step 2: Publish</h3>
              </div>

              {/* Blog Post Preview */}
              <div className="bg-neutral-800 rounded-xl p-5 space-y-4 border border-neutral-700">
                {/* Title placeholder */}
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-red-400" />
                  <div className="h-3 bg-red-500/30 rounded w-3/4" />
                </div>
                
                {/* Content lines */}
                <div className="space-y-2">
                  <div className="h-2 bg-neutral-600 rounded w-full" />
                  <div className="h-2 bg-neutral-600 rounded w-11/12" />
                  <div className="h-2 bg-neutral-600 rounded w-4/5" />
                </div>

                {/* Embedded Video */}
                <div className="bg-neutral-900 rounded-lg p-3 border border-red-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Play className="w-4 h-4 text-red-400" />
                    <span className="text-xs text-red-400 font-medium">Embedded Video</span>
                  </div>
                  <div className="aspect-video bg-neutral-950 rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                      <Play className="w-5 h-5 text-red-400 ml-1" />
                    </div>
                  </div>
                </div>

                {/* More content */}
                <div className="space-y-2">
                  <div className="h-2 bg-neutral-600 rounded w-full" />
                  <div className="h-2 bg-neutral-600 rounded w-5/6" />
                </div>

                {/* AdSense placement */}
                <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/30">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-green-400 font-medium">AdSense Placement</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Hash className="w-4 h-4 text-neutral-500" />
                  <span className="text-xs bg-neutral-700 text-neutral-300 px-2 py-1 rounded">tutorial</span>
                  <span className="text-xs bg-neutral-700 text-neutral-300 px-2 py-1 rounded">tech</span>
                  <span className="text-xs bg-neutral-700 text-neutral-300 px-2 py-1 rounded">review</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                <span className="text-sm text-neutral-400">SEO Score</span>
                <span className="text-2xl font-bold text-green-400">94/100</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">Reviews</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-2 mb-4 text-white">
              Loved by bloggers around the world
            </h2>
            <div className="flex items-center justify-center gap-6 mt-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-medium">Trustpilot: 4.8</span>
                <span className="text-neutral-500 text-sm">See all 52 reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <span className="text-white font-medium">G2 Review: 4.6</span>
                <span className="text-neutral-500 text-sm">See all 28 reviews</span>
              </div>
            </div>
          </div>

          {/* Testimonials Grid - Fixed equal height */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 hover:border-neutral-700 transition-all duration-300 flex flex-col"
              >
                {/* Video Thumbnail if available */}
                {testimonial.hasVideo && (
                  <div className="relative aspect-video bg-neutral-800 rounded-lg overflow-hidden group cursor-pointer mb-4 flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-xs font-medium line-clamp-2">{testimonial.videoTitle}</p>
                    </div>
                  </div>
                )}

                {/* Review Content */}
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2 line-clamp-1">{testimonial.title}</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
                    {testimonial.content}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-white text-xs font-medium">{testimonial.name}</p>
                      <p className="text-neutral-500 text-xs">{testimonial.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-neutral-400">
              Start free. Scale when you're ready.
            </p>
          </div>

          <PricingTable />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-800 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Footer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-2 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">StreamToSite</span>
              </div>
              <p className="text-neutral-500 text-sm mb-4">
                © 2026 StreamToSite Inc. All rights reserved.
              </p>
              <div className="space-y-2">
                <Link href="#" className="block text-neutral-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="block text-neutral-400 hover:text-white text-sm transition-colors">
                  Terms & Conditions
                </Link>
                <Link href="#" className="block text-neutral-400 hover:text-white text-sm transition-colors">
                  Careers
                </Link>
              </div>
            </div>

            {/* StreamToSite Column */}
            <div>
              <h4 className="text-white font-semibold mb-4">StreamToSite</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-neutral-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Column */}
            <div>
              <h4 className="text-white font-semibold mb-4">Social</h4>
              <ul className="space-y-2">
                {footerLinks.social.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-neutral-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Video to Blog Column */}
            <div>
              <h4 className="text-white font-semibold mb-4">Video to Blog</h4>
              <ul className="space-y-2">
                {footerLinks.videoToBlog.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-neutral-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Audio to Blog Column */}
            <div>
              <h4 className="text-white font-semibold mb-4">Audio to Blog</h4>
              <ul className="space-y-2">
                {footerLinks.audioToBlog.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-neutral-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Integration Column */}
            <div>
              <h4 className="text-white font-semibold mb-4">Integration</h4>
              <ul className="space-y-2">
                {footerLinks.integrations.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-neutral-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-neutral-800 pt-8 text-center">
            <p className="text-neutral-500 text-sm">
              Made with ❤️ for content creators worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
