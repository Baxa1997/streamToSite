'use client'

import { Play, Clock, Eye, ChevronRight, TrendingUp } from 'lucide-react'

/**
 * HomeView Component
 * 
 * The homepage of the Public Website Simulator.
 * Features a Netflix-style hero section and grid of article cards.
 */

// Format view count
const formatViews = (views) => {
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
};

// Format date
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function HomeView({ 
  posts = [], 
  siteConfig,
  onPostClick,
  theme = 'cinema' 
}) {
  // Get featured post (first one with featured flag, or just the first post)
  const featuredPost = posts.find(p => p.featured) || posts[0];
  // Get remaining posts for grid
  const gridPosts = posts.filter(p => p.id !== featuredPost?.id);

  const isDark = theme === 'cinema' || theme === 'standard';

  return (
    <div>
      {/* ========== HERO SECTION ========== */}
      {featuredPost && (
        <section className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${featuredPost.thumbnail})` }}
          >
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 md:pb-16">
            {/* Category Badge */}
            <div className="mb-4">
              <span 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ backgroundColor: featuredPost.categoryColor || '#E50914' }}
              >
                <TrendingUp className="w-3 h-3" />
                {featuredPost.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight mb-4">
              {featuredPost.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mb-6 line-clamp-2">
              {featuredPost.excerpt}
            </p>

            {/* Meta & CTA */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              {/* Read Article Button */}
              <button
                onClick={() => onPostClick?.(featuredPost)}
                className="group flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all hover:scale-105 shadow-lg shadow-red-600/30"
              >
                <Play className="w-5 h-5 fill-current" />
                Read Article
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-neutral-400 text-sm">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {featuredPost.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  {formatViews(featuredPost.views)} views
                </span>
              </div>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 mt-6">
              <img 
                src={featuredPost.authorAvatar} 
                alt={featuredPost.author}
                className="w-10 h-10 rounded-full border-2 border-neutral-700"
              />
              <div>
                <p className="text-white font-medium text-sm">{featuredPost.author}</p>
                <p className="text-neutral-400 text-xs">{formatDate(featuredPost.date)}</p>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-neutral-500 flex items-start justify-center p-1">
              <div className="w-1.5 h-3 bg-neutral-500 rounded-full animate-pulse" />
            </div>
          </div>
        </section>
      )}

      {/* ========== LATEST POSTS GRID ========== */}
      <section className={`py-12 md:py-16 ${isDark ? 'bg-neutral-950' : 'bg-stone-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Latest Recaps
              </h2>
              <p className={`mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Fresh takes on your favorite films and shows
              </p>
            </div>
            <button className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border ${
              isDark ? 'border-neutral-700 text-neutral-300 hover:bg-neutral-800' : 'border-neutral-300 text-neutral-600 hover:bg-neutral-100'
            } transition-colors`}>
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridPosts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onClick={() => onPostClick?.(post)}
                isDark={isDark}
              />
            ))}
          </div>

          {/* Mobile View All */}
          <div className="mt-8 md:hidden text-center">
            <button className={`px-6 py-3 rounded-lg border ${
              isDark ? 'border-neutral-700 text-neutral-300' : 'border-neutral-300 text-neutral-600'
            }`}>
              View All Articles
            </button>
          </div>
        </div>
      </section>

      {/* ========== NEWSLETTER SECTION ========== */}
      <section className={`py-16 ${isDark ? 'bg-neutral-900' : 'bg-white'} border-t ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Never Miss a Breakdown
          </h3>
          <p className={`mb-8 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Get exclusive movie analysis and fan theories delivered to your inbox every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-1 px-4 py-3 rounded-lg border ${
                isDark 
                  ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500' 
                  : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400'
              } focus:outline-none focus:ring-2 focus:ring-red-500/50`}
            />
            <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap">
              Subscribe Free
            </button>
          </div>
          <p className={`text-xs mt-4 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Join 3,420+ movie fans. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}

// ========== POST CARD COMPONENT ==========
function PostCard({ post, onClick, isDark = true }) {
  return (
    <article 
      onClick={onClick}
      className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
        isDark ? 'bg-neutral-900 hover:bg-neutral-800' : 'bg-white hover:bg-neutral-50 shadow-md'
      }`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={post.thumbnail} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span 
            className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide text-white"
            style={{ backgroundColor: post.categoryColor || '#E50914' }}
          >
            {post.category}
          </span>
        </div>

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
            <Play className="w-6 h-6 text-white fill-current ml-1" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className={`font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-500 transition-colors ${
          isDark ? 'text-white' : 'text-neutral-900'
        }`}>
          {post.title}
        </h3>
        
        <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={post.authorAvatar} 
              alt={post.author}
              className="w-6 h-6 rounded-full"
            />
            <span className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
              {post.author}
            </span>
          </div>
          <div className={`flex items-center gap-3 text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {formatViews(post.views)}
            </span>
            <span>{formatDate(post.date)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
