import { notFound } from 'next/navigation'
import { Menu, Search, Twitter, Youtube, Mail } from 'lucide-react'

// Mock database - In production, this would fetch from your database
const getUserSite = (subdomain) => {
  const sites = {
    john: {
      name: 'John\'s Movie Recaps',
      tagline: 'Deep dives into cinema\'s greatest mysteries',
      author: 'John Smith',
      avatar: '🎬',
      theme: 'cinema',
      posts: [
        {
          id: 1,
          title: 'Inception Ending Explained: The Wedding Ring Theory',
          excerpt: 'After 16 years of debate, we finally have the answer. And it\'s been hiding in plain sight.',
          category: 'Movie Analysis',
          date: '2026-02-03',
          readTime: '12 min',
          views: '124.5K',
          featured: true,
        },
        {
          id: 2,
          title: 'The Dark Knight: Why Heath Ledger\'s Joker Still Matters',
          excerpt: 'A critical analysis of the performance that changed superhero cinema forever.',
          category: 'Critical Review',
          date: '2026-02-01',
          readTime: '10 min',
          views: '89.2K',
          featured: false,
        },
        {
          id: 3,
          title: 'Oppenheimer: The Hidden Details You Missed',
          excerpt: 'Nolan\'s latest masterpiece is packed with Easter eggs and historical references.',
          category: 'Easter Eggs',
          date: '2026-01-28',
          readTime: '8 min',
          views: '67.8K',
          featured: false,
        },
      ],
    },
  }

  return sites[subdomain] || null
}

export default function PublicSitePage({ params }) {
  const { subdomain } = params
  const site = getUserSite(subdomain)

  if (!site) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation - Verge Style */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{site.avatar}</span>
              <div>
                <h1 className="text-xl font-bold tracking-tight">{site.name}</h1>
                <p className="text-xs text-white/50">{site.tagline}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Latest</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Reviews</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Analysis</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">About</a>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Featured Post */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-xs font-semibold text-primary mb-4">
              Featured
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              {site.posts[0].title}
            </h2>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              {site.posts[0].excerpt}
            </p>
            <div className="flex items-center space-x-6 text-sm text-white/50">
              <span>{site.posts[0].category}</span>
              <span>•</span>
              <span>{site.posts[0].readTime} read</span>
              <span>•</span>
              <span>{site.posts[0].views} views</span>
            </div>
            <button className="mt-8 px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg font-semibold transition-all hover:scale-105">
              Read Article →
            </button>
          </div>
        </div>
      </div>

      {/* Latest Posts Grid - Verge Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold">Latest Articles</h3>
          <div className="flex items-center space-x-4 text-sm">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">All</button>
            <button className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Reviews</button>
            <button className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Analysis</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {site.posts.slice(1).map((post) => (
            <article
              key={post.id}
              className="group cursor-pointer"
            >
              {/* Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl mb-4 overflow-hidden border border-white/10 group-hover:border-primary/30 transition-all">
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  🎬
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-xs text-white/50">
                  <span className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-primary">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>

                <h4 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h4>

                <p className="text-sm text-white/60 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-white/50 pt-2">
                  <span>{post.readTime} read</span>
                  <span>{post.views} views</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Newsletter Section - High Converting */}
      <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-3xl font-bold mb-4">Never Miss a Deep Dive</h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Get weekly breakdowns of the latest movies, hidden Easter eggs, and critical analysis 
            delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
            <button className="px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg font-semibold transition-all hover:scale-105">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-white/40 mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </div>

      {/* Footer - Clean & Professional */}
      <footer className="border-t border-white/10 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">{site.avatar}</span>
                <div>
                  <h4 className="font-bold">{site.name}</h4>
                  <p className="text-sm text-white/50">{site.tagline}</p>
                </div>
              </div>
              <p className="text-sm text-white/60 max-w-md">
                Independent film criticism and analysis. Owned by creators, for creators.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Content</h5>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-primary transition-colors">Latest Reviews</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Critical Analysis</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Easter Eggs</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Archive</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <div className="flex items-center space-x-3">
                <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-sm text-white/40">
            <p>© 2026 {site.name}. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">
                Powered by <span className="text-primary font-semibold">StreamToSite</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
