'use client'

import { useState, useEffect } from 'react'
import SiteLayout from '@/components/site/SiteLayout'
import HomeView from '@/components/site/HomeView'
import PostView from '@/components/site/PostView'
import { DEMO_SITE, getRelatedPosts } from '@/data/demo-site'

/**
 * Public Website Simulator - Demo Page
 * 
 * This page demonstrates what a StreamToSite-generated website looks like.
 * Used for:
 * 1. The User's "Preview" button in the dashboard
 * 2. The public "/examples/demo" page to showcase the product
 */

export default function DemoSitePage() {
  // State for navigation
  const [currentView, setCurrentView] = useState('home') // 'home' | 'post'
  const [currentPost, setCurrentPost] = useState(null)
  const [theme, setTheme] = useState('cinema') // cinema | newspaper | minimal | standard
  
  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentView, currentPost])

  // Handle post click from home view
  const handlePostClick = (post) => {
    setCurrentPost(post)
    setCurrentView('post')
  }

  // Handle back to home
  const handleBackToHome = () => {
    setCurrentPost(null)
    setCurrentView('home')
  }

  // Get related posts for the current post
  const relatedPosts = currentPost 
    ? getRelatedPosts(currentPost.id, 5) 
    : []

  return (
    <>
      {/* Theme Switcher (Dev Mode) */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-neutral-800 rounded-xl p-3 shadow-2xl border border-neutral-700">
          <p className="text-xs text-neutral-400 mb-2 font-medium">Theme Preview</p>
          <div className="flex gap-2">
            {['cinema', 'newspaper', 'minimal', 'standard'].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  theme === t 
                    ? 'bg-red-500 text-white' 
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Site */}
      <SiteLayout
        siteConfig={DEMO_SITE.siteConfig}
        theme={theme}
        currentView={currentView}
        showBackButton={currentView === 'post'}
        onBack={handleBackToHome}
      >
        {currentView === 'home' && (
          <HomeView
            posts={DEMO_SITE.posts}
            siteConfig={DEMO_SITE.siteConfig}
            onPostClick={handlePostClick}
            theme={theme}
          />
        )}

        {currentView === 'post' && currentPost && (
          <PostView
            post={currentPost}
            relatedPosts={relatedPosts}
            siteConfig={DEMO_SITE.siteConfig}
            onPostClick={handlePostClick}
            theme={theme}
          />
        )}
      </SiteLayout>
    </>
  )
}
