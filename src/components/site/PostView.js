'use client'

import { 
  Clock, 
  Eye, 
  Calendar,
  Share2, 
  Bookmark, 
  MessageCircle,
  ThumbsUp,
  ChevronRight,
  Mail,
  TrendingUp,
  Play
} from 'lucide-react'
import { useState } from 'react'

/**
 * PostView Component
 * 
 * The article detail page of the Public Website Simulator.
 * Two-column layout with main content and sidebar.
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
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

export default function PostView({ 
  post,
  relatedPosts = [],
  siteConfig,
  onPostClick,
  theme = 'cinema'
}) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [email, setEmail] = useState('')
  
  const isDark = theme === 'cinema' || theme === 'standard';

  if (!post) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'text-white' : 'text-neutral-900'}`}>
        <p>Post not found</p>
      </div>
    );
  }

  // Insert ad after first paragraph in content
  const insertAdInContent = (htmlContent) => {
    const paragraphEnd = htmlContent.indexOf('</p>');
    if (paragraphEnd === -1) return htmlContent;
    
    const adHtml = `
      <div class="ad-placeholder my-8 p-6 bg-neutral-800/50 border border-neutral-700 rounded-xl text-center">
        <p class="text-neutral-500 text-xs uppercase tracking-wider mb-2">Advertisement</p>
        <div class="h-24 flex items-center justify-center text-neutral-600">
          <span class="text-sm">Ad space reserved for Pro users</span>
        </div>
      </div>
    `;
    
    return htmlContent.slice(0, paragraphEnd + 4) + adHtml + htmlContent.slice(paragraphEnd + 4);
  };

  return (
    <div className={`${isDark ? 'bg-neutral-950' : 'bg-stone-50'}`}>
      {/* ========== HERO IMAGE ========== */}
      <div className="relative h-[40vh] min-h-[300px] max-h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.thumbnail})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
        </div>
        
        {/* Category Badge */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8">
          <span 
            className="px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: post.categoryColor || '#E50914' }}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* ========== MAIN CONTENT AREA ========== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ===== MAIN ARTICLE (Left 70%) ===== */}
          <article className="lg:col-span-8">
            {/* Article Header */}
            <div className={`rounded-2xl p-6 md:p-8 ${isDark ? 'bg-neutral-900' : 'bg-white shadow-xl'}`}>
              {/* Title */}
              <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}>
                {post.title}
              </h1>

              {/* Meta Bar */}
              <div className={`flex flex-wrap items-center gap-4 pb-6 mb-6 border-b ${
                isDark ? 'border-neutral-800' : 'border-neutral-200'
              }`}>
                {/* Author */}
                <div className="flex items-center gap-3">
                  <img 
                    src={post.authorAvatar} 
                    alt={post.author}
                    className="w-12 h-12 rounded-full border-2 border-red-500"
                  />
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      {post.author}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      Movie Analyst
                    </p>
                  </div>
                </div>

                <div className={`hidden md:block w-px h-8 ${isDark ? 'bg-neutral-700' : 'bg-neutral-300'}`} />

                {/* Stats */}
                <div className={`flex items-center gap-4 text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    {formatViews(post.views)} views
                  </span>
                </div>
              </div>

              {/* Share Bar */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      liked 
                        ? 'bg-red-500/20 text-red-500' 
                        : isDark ? 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">{liked ? '2,401' : '2,400'}</span>
                  </button>
                  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isDark ? 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                  }`}>
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">86</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`p-2 rounded-lg transition-colors ${
                      bookmarked 
                        ? 'bg-amber-500/20 text-amber-500' 
                        : isDark ? 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
                  </button>
                  <button className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                  }`}>
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Article Content */}
              <div 
                className={`prose prose-lg max-w-none ${
                  isDark 
                    ? 'prose-invert prose-p:text-neutral-300 prose-headings:text-white prose-strong:text-white prose-a:text-red-400' 
                    : 'prose-neutral'
                }`}
                dangerouslySetInnerHTML={{ __html: insertAdInContent(post.content) }}
              />

              {/* Article Footer */}
              <div className={`mt-12 pt-8 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Movies', 'Christopher Nolan', 'Film Analysis', 'Endings Explained'].map(tag => (
                    <span 
                      key={tag}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        isDark ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      #{tag.replace(' ', '')}
                    </span>
                  ))}
                </div>

                {/* Author Bio */}
                <div className={`flex gap-4 p-6 rounded-xl ${isDark ? 'bg-neutral-800/50' : 'bg-neutral-50'}`}>
                  <img 
                    src={post.authorAvatar} 
                    alt={post.author}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <p className={`font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{post.author}</p>
                    <p className={`text-sm mb-3 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      Senior Movie Analyst at MovieKing. Obsessed with hidden details and frame-by-frame breakdowns.
                    </p>
                    <button className="text-sm text-red-500 font-medium hover:text-red-400">
                      View all articles →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* ===== SIDEBAR (Right 30%) ===== */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Subscribe Widget */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-neutral-900' : 'bg-white shadow-lg'}`}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    Never Miss a Recap
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    Join 3,420+ movie fans
                  </p>
                </div>
              </div>
              <p className={`text-sm mb-4 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Get exclusive breakdowns delivered to your inbox every week.
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={`w-full px-4 py-3 rounded-lg mb-3 ${
                  isDark 
                    ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500' 
                    : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400'
                } border focus:outline-none focus:ring-2 focus:ring-red-500/50`}
              />
              <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
                Subscribe Free
              </button>
            </div>

            {/* Ad Placeholder */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-neutral-900 border border-neutral-800' : 'bg-white shadow-lg'}`}>
              <p className={`text-xs uppercase tracking-wider mb-4 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Advertisement
              </p>
              <div className={`h-48 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-neutral-800' : 'bg-neutral-100'
              }`}>
                <p className={`text-sm ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`}>
                  300x250
                </p>
              </div>
            </div>

            {/* Trending Posts */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-neutral-900' : 'bg-white shadow-lg'}`}>
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-red-500" />
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Trending Now
                </h3>
              </div>
              <div className="space-y-4">
                {relatedPosts.slice(0, 4).map((relatedPost, index) => (
                  <div 
                    key={relatedPost.id}
                    onClick={() => onPostClick?.(relatedPost)}
                    className={`flex gap-3 cursor-pointer group ${
                      index < 3 ? `pb-4 border-b ${isDark ? 'border-neutral-800' : 'border-neutral-100'}` : ''
                    }`}
                  >
                    <img 
                      src={relatedPost.thumbnail}
                      alt={relatedPost.title}
                      className="w-20 h-14 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-sm font-medium line-clamp-2 group-hover:text-red-500 transition-colors ${
                        isDark ? 'text-white' : 'text-neutral-900'
                      }`}>
                        {relatedPost.title}
                      </h4>
                      <p className={`text-xs mt-1 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                        {formatViews(relatedPost.views)} views
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Watch on YouTube */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gradient-to-br from-red-900/30 to-neutral-900 border border-red-900/50' : 'bg-red-50'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white fill-current ml-0.5" />
                </div>
                <div>
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    Watch on YouTube
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    Video version available
                  </p>
                </div>
              </div>
              <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                <Play className="w-4 h-4 fill-current" />
                Watch Now
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* ========== RELATED POSTS SECTION ========== */}
      <section className={`py-16 mt-12 ${isDark ? 'bg-neutral-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              You Might Also Like
            </h2>
            <button className={`flex items-center gap-1 text-sm font-medium ${
              isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'
            }`}>
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.slice(0, 3).map((relatedPost) => (
              <article 
                key={relatedPost.id}
                onClick={() => onPostClick?.(relatedPost)}
                className={`group cursor-pointer rounded-xl overflow-hidden transition-all hover:scale-[1.02] ${
                  isDark ? 'bg-neutral-800' : 'bg-neutral-50'
                }`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={relatedPost.thumbnail}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span 
                      className="px-2.5 py-1 rounded-md text-xs font-bold uppercase text-white"
                      style={{ backgroundColor: relatedPost.categoryColor || '#E50914' }}
                    >
                      {relatedPost.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className={`font-bold line-clamp-2 group-hover:text-red-500 transition-colors ${
                    isDark ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {relatedPost.title}
                  </h3>
                  <p className={`text-sm mt-2 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {relatedPost.readTime} · {formatViews(relatedPost.views)} views
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
