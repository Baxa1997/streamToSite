'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import useAppStore from '@/store/useAppStore'
import { 
  Play, 
  Clock, 
  Eye, 
  ChevronRight, 
  Menu,
  X,
  Search,
  Bell,
  User,
  Youtube,
  Twitter,
  Instagram,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Zap
} from 'lucide-react'

// Mock posts for demo
const DEMO_POSTS = [
  {
    id: 'demo_1',
    title: 'The Ultimate Guide to Content Creation in 2026',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&h=450&fit=crop',
    excerpt: 'Everything you need to know about creating viral content that resonates with your audience.',
    views: 12453,
    readTime: 8,
    publishedAt: '2 days ago',
    category: 'Tutorial',
  },
  {
    id: 'demo_2',
    title: 'Breaking Down the Latest Tech Trends',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
    excerpt: 'AI, blockchain, and quantum computing - what\'s next for the tech industry?',
    views: 8932,
    readTime: 12,
    publishedAt: '5 days ago',
    category: 'Analysis',
  },
  {
    id: 'demo_3',
    title: 'How I Grew My Channel to 1 Million Subscribers',
    thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=450&fit=crop',
    excerpt: 'The exact strategies and techniques I used to build a massive YouTube following.',
    views: 45678,
    readTime: 15,
    publishedAt: '1 week ago',
    category: 'Case Study',
  },
  {
    id: 'demo_4',
    title: 'Essential Tools Every Creator Needs',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop',
    excerpt: 'From editing software to analytics platforms - the complete toolkit.',
    views: 6234,
    readTime: 6,
    publishedAt: '2 weeks ago',
    category: 'Resources',
  },
  {
    id: 'demo_5',
    title: 'The Psychology of Viral Videos',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    excerpt: 'Understanding what makes people click, watch, and share content.',
    views: 23456,
    readTime: 10,
    publishedAt: '3 weeks ago',
    category: 'Deep Dive',
  },
  {
    id: 'demo_6',
    title: 'Monetization Strategies That Actually Work',
    thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=450&fit=crop',
    excerpt: 'Beyond ads: diversifying your revenue streams as a content creator.',
    views: 17890,
    readTime: 11,
    publishedAt: '1 month ago',
    category: 'Business',
  },
]

// Format number with K/M suffix
const formatNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

// Post Card Component
const PostCard = ({ post, variant = 'default' }) => {
  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative aspect-[21/9] rounded-2xl overflow-hidden cursor-pointer"
      >
        <img
          src={post.thumbnail}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase tracking-wide rounded-full mb-4">
            {post.category}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-white/80 text-lg mb-4 max-w-2xl line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-white/60 text-sm">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {formatNumber(post.views)} views
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </span>
            <span>{post.publishedAt}</span>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
            <Play className="w-6 h-6 text-neutral-900 ml-1" />
          </div>
        </div>
        <span className="absolute top-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-medium rounded-md">
          {post.category}
        </span>
        <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded-md flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {post.readTime} min
        </span>
      </div>
      <h3 className="font-semibold text-lg text-white mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
        {post.title}
      </h3>
      <p className="text-neutral-400 text-sm mb-3 line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex items-center gap-3 text-neutral-500 text-xs">
        <span className="flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" />
          {formatNumber(post.views)}
        </span>
        <span>•</span>
        <span>{post.publishedAt}</span>
      </div>
    </motion.article>
  )
}

// Netflix-style Theme
const NetflixTheme = ({ site, posts, isPro }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const featuredPost = posts[0]
  const regularPosts = posts.slice(1)

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <img
                  src={site?.connectedChannel?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo'}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-red-500"
                />
                <span className="text-xl font-bold text-white">
                  {site?.connectedChannel?.name || 'My Channel'}
                </span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <a href="#" className="text-white font-medium">Home</a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Videos</a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Categories</a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">About</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero / Featured Post */}
      <section className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {featuredPost && <PostCard post={featuredPost} variant="featured" />}
      </section>

      {/* Content Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Zap className="w-6 h-6 text-red-500" />
          Latest Content
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-500 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Never Miss an Update
          </h2>
          <p className="text-white/80 mb-6">
            Subscribe to get notified when new content drops
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-neutral-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={site?.connectedChannel?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo'}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">{site?.connectedChannel?.name || 'My Channel'}</h3>
                  <p className="text-neutral-500 text-sm">{site?.connectedChannel?.subscribers || '0'} subscribers</p>
                </div>
              </div>
              <p className="text-neutral-400 text-sm max-w-md">
                {site?.connectedChannel?.description || 'Welcome to my blog where I share insights and knowledge from my YouTube videos.'}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-neutral-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">All Videos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <div className="flex items-center gap-3">
                <a href="#" className="p-2 bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-500 text-sm">
              © 2026 {site?.connectedChannel?.name || 'My Channel'}. All rights reserved.
            </p>
            
            {/* StreamToSite Badge - Only for Free Users */}
            {!isPro && (
              <motion.a
                href="/"
                target="_blank"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-orange-600 transition-all shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                Build your own site like this
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>
      </footer>

      {/* Floating StreamToSite Badge for Free Users */}
      {!isPro && (
        <motion.a
          href="/"
          target="_blank"
          initial={{ opacity: 0, x: 50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 1 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-neutral-900 border border-neutral-700 text-white font-medium rounded-full shadow-2xl hover:bg-neutral-800 transition-all group"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>Powered by StreamToSite</span>
          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.a>
      )}
    </div>
  )
}

export default function PublicSitePage() {
  const params = useParams()
  const { sites, user, getPublishedPostsBySite } = useAppStore()
  const [site, setSite] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const domain = params.domain
    
    // Find site by domain
    const foundSite = sites.find(s => 
      s.domain === domain || 
      s.domain.includes(domain) ||
      s.domain.split('.')[0] === domain
    )

    if (foundSite) {
      setSite(foundSite)
      const sitePosts = getPublishedPostsBySite(foundSite.id)
      // Merge with demo posts if no real posts
      setPosts(sitePosts.length > 0 ? sitePosts : DEMO_POSTS)
    } else {
      // Demo mode - use fallback data
      setSite({
        id: 'demo',
        domain: `${domain}.streamtosite.com`,
        connectedChannel: {
          name: 'Demo Channel',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
          subscribers: '890K',
          description: 'This is a demo site showcasing StreamToSite capabilities.',
        },
      })
      setPosts(DEMO_POSTS)
    }
    
    setLoading(false)
  }, [params.domain, sites, getPublishedPostsBySite])

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-400">Loading site...</p>
        </div>
      </div>
    )
  }

  return <NetflixTheme site={site} posts={posts} isPro={user.plan === 'pro'} />
}
