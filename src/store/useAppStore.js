import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { detectPlatform } from '@/utils/platform'

/**
 * StreamToSite Global App Store
 * 
 * Manages user, sites (multi-source), posts, and onboarding state
 */

// Generate unique IDs
const generateId = (prefix = '') => `${prefix}${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

// Generate verification code
const generateVerificationCode = () => `STS-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

// Mock channel data generator
const generateMockChannel = (url, platform) => {
  const mockChannels = {
    youtube: {
      id: generateId('yt_'),
      name: 'TechDaily',
      handle: '@techdaily',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechDaily',
      banner: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=300&fit=crop',
      subscribers: '1.2M',
      videoCount: 847,
      description: 'Your daily dose of tech news, reviews, and tutorials. Making technology accessible for everyone.',
      category: 'tech',
      tags: ['Technology', 'Gadgets', 'Reviews'],
    },
    tiktok: {
      id: generateId('tt_'),
      name: 'CreativeVibes',
      handle: '@creativevibes',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CreativeVibes',
      banner: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&h=300&fit=crop',
      subscribers: '2.5M',
      videoCount: 1234,
      description: 'Trending content, creative tips, and viral moments. Join the vibe!',
      category: 'entertainment',
      tags: ['Entertainment', 'Trending', 'Creative'],
    },
    facebook: {
      id: generateId('fb_'),
      name: 'NewsToday',
      handle: 'newstoday',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NewsToday',
      banner: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=300&fit=crop',
      subscribers: '890K',
      videoCount: 532,
      description: 'Breaking news, world events, and important stories you need to know.',
      category: 'news',
      tags: ['News', 'Current Events', 'World'],
    },
  }

  return mockChannels[platform] || mockChannels.youtube
}

// Theme suggestions by category
const THEME_SUGGESTIONS = {
  gaming: 'cyber_dark',
  tech: 'minimal_tech',
  news: 'newspaper_white',
  entertainment: 'spotlight',
  fitness: 'energy',
  default: 'modern_clean',
}

const useAppStore = create(
  persist(
    (set, get) => ({
      // ========== USER STATE ==========
      user: {
        id: 1,
        name: 'Demo User',
        email: 'demo@streamtosite.com',
        plan: 'free', // 'free' allows 1 site, 'pro' allows unlimited
        createdAt: new Date().toISOString(),
      },

      // ========== SITES STATE (Multi-Source) ==========
      sites: [],

      // ========== POSTS STATE ==========
      posts: [],

      // ========== ONBOARDING/WIZARD STATE ==========
      onboarding: {
        isWizardOpen: false,
        currentStep: 0,
        selectedPlatform: null,
        pendingChannel: null,
        selectedTheme: null,
      },

      // ========== TOAST/NOTIFICATIONS ==========
      toasts: [],

      // ========== PLATFORM DETECTION ==========
      /**
       * Detects platform from URL
       * @param {string} url - The URL to analyze
       * @returns {'youtube' | 'tiktok' | 'facebook' | 'unknown'}
       */
      detectPlatform: (url) => {
        return detectPlatform(url)
      },

      // ========== SITE ACTIONS ==========
      /**
       * Creates a NEW site with this source
       * @param {object} channelData - Channel data to create site from
       * @returns {object} - The created site
       */
      createSite: (url, platform) => {
        const state = get()
        const channel = generateMockChannel(url, platform)
        
        const newSite = {
          id: generateId('site_'),
          domain: `${channel.name.toLowerCase().replace(/\s+/g, '')}.streamtosite.com`,
          theme: THEME_SUGGESTIONS[channel.category] || THEME_SUGGESTIONS.default,
          isVerified: false,
          verificationCode: generateVerificationCode(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          sources: [
            {
              id: generateId('source_'),
              platform,
              url,
              channelId: channel.id,
              name: channel.name,
              handle: channel.handle,
              avatar: channel.avatar,
              banner: channel.banner,
              subscribers: channel.subscribers,
              videoCount: channel.videoCount,
              description: channel.description,
              category: channel.category,
              tags: channel.tags,
              isPrimary: true,
              addedAt: new Date().toISOString(),
            }
          ],
          stats: {
            posts: 0,
            views: 0,
            revenue: 0,
          },
          connectedChannel: channel, // For backwards compatibility
          
          // ========== BACKEND FIELDS ==========
          owner_id: state.user.id,
          sub_domain: channel.name.toLowerCase().replace(/\s+/g, ''),
          custom_domain: null,
          branding_enabled: state.user.plan === 'pro', // Only Pros can remove branding
        }

        set((state) => ({
          sites: [...state.sites, newSite],
        }))

        return newSite
      },

      /**
       * Adds a 2nd/3rd source to an EXISTING site
       * @param {string} siteId - The site ID to add source to
       * @param {string} url - The source URL
       * @param {string} platform - The platform type
       * @returns {object|null} - The updated site or null if not found
       */
      addSourceToSite: (siteId, url, platform) => {
        const state = get()
        const siteIndex = state.sites.findIndex(s => s.id === siteId)
        
        if (siteIndex === -1) return null

        const channel = generateMockChannel(url, platform)
        const newSource = {
          id: generateId('source_'),
          platform,
          url,
          channelId: channel.id,
          name: channel.name,
          handle: channel.handle,
          avatar: channel.avatar,
          banner: channel.banner,
          subscribers: channel.subscribers,
          videoCount: channel.videoCount,
          description: channel.description,
          category: channel.category,
          tags: channel.tags,
          isPrimary: false,
          addedAt: new Date().toISOString(),
        }

        const updatedSites = [...state.sites]
        updatedSites[siteIndex] = {
          ...updatedSites[siteIndex],
          sources: [...updatedSites[siteIndex].sources, newSource],
          updatedAt: new Date().toISOString(),
        }

        set({ sites: updatedSites })

        return updatedSites[siteIndex]
      },

      /**
       * Legacy addSite for backwards compatibility
       */
      addSite: (channelData) => {
        const state = get()
        
        const newSite = {
          id: generateId('site_'),
          domain: `${(channelData.channelName || channelData.name || 'mysite').toLowerCase().replace(/\s+/g, '')}.streamtosite.com`,
          theme: channelData.theme || THEME_SUGGESTIONS[channelData.category] || THEME_SUGGESTIONS.default,
          isVerified: false,
          verificationCode: generateVerificationCode(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          sources: [
            {
              id: generateId('source_'),
              platform: channelData.platform || 'youtube',
              url: channelData.url || '',
              channelId: channelData.channelId || channelData.id || generateId('ch_'),
              name: channelData.channelName || channelData.name,
              handle: channelData.handle || `@${(channelData.channelName || channelData.name || '').toLowerCase().replace(/\s+/g, '')}`,
              avatar: channelData.channelAvatar || channelData.avatar,
              banner: channelData.banner,
              subscribers: channelData.channelSubscribers || channelData.subscribers,
              videoCount: channelData.channelVideos || channelData.videoCount,
              description: channelData.channelDescription || channelData.description,
              category: channelData.category,
              tags: channelData.tags,
              isPrimary: true,
              addedAt: new Date().toISOString(),
            }
          ],
          stats: {
            posts: Math.floor(Math.random() * 20),
            views: Math.floor(Math.random() * 10000),
            revenue: Math.floor(Math.random() * 500),
          },
          connectedChannel: {
            id: channelData.channelId || channelData.id || generateId('ch_'),
            name: channelData.channelName || channelData.name,
            avatar: channelData.channelAvatar || channelData.avatar,
            banner: channelData.banner,
            subscribers: channelData.channelSubscribers || channelData.subscribers,
            videoCount: channelData.channelVideos || channelData.videoCount,
            description: channelData.channelDescription || channelData.description,
            category: channelData.category,
            tags: channelData.tags,
          },
          
          // ========== BACKEND FIELDS ==========
          owner_id: state.user.id,
          sub_domain: (channelData.channelName || channelData.name || 'mysite').toLowerCase().replace(/\s+/g, ''),
          custom_domain: null,
          branding_enabled: state.user.plan === 'pro', // Only Pros can remove branding
        }

        set((state) => ({
          sites: [...state.sites, newSite],
        }))

        return newSite
      },

      /**
       * Delete a site
       */
      deleteSite: (siteId) => {
        set((state) => ({
          sites: state.sites.filter(s => s.id !== siteId),
        }))
      },

      /**
       * Verify a site
       */
      verifySite: (siteId, method = 'bio') => {
        set((state) => ({
          sites: state.sites.map(s => 
            s.id === siteId 
              ? { ...s, isVerified: true, verificationMethod: method, verifiedAt: new Date().toISOString() }
              : s
          ),
        }))
      },

      /**
       * Update site theme
       */
      updateSiteTheme: (siteId, theme) => {
        set((state) => ({
          sites: state.sites.map(s => 
            s.id === siteId 
              ? { ...s, theme, updatedAt: new Date().toISOString() }
              : s
          ),
        }))
      },

      // ========== WIZARD ACTIONS ==========
      openWizard: () => {
        set({
          onboarding: {
            ...get().onboarding,
            isWizardOpen: true,
            currentStep: 0,
            selectedPlatform: null,
            pendingChannel: null,
          },
        })
      },

      closeWizard: () => {
        set({
          onboarding: {
            ...get().onboarding,
            isWizardOpen: false,
            currentStep: 0,
            selectedPlatform: null,
            pendingChannel: null,
          },
        })
      },

      selectPlatform: (platformId) => {
        set({
          onboarding: {
            ...get().onboarding,
            selectedPlatform: platformId,
            currentStep: 1,
          },
        })
      },

      setPendingChannel: (channel) => {
        set({
          onboarding: {
            ...get().onboarding,
            pendingChannel: channel,
          },
        })
      },

      setWizardStep: (step) => {
        set({
          onboarding: {
            ...get().onboarding,
            currentStep: step,
          },
        })
      },

      nextWizardStep: () => {
        set({
          onboarding: {
            ...get().onboarding,
            currentStep: get().onboarding.currentStep + 1,
          },
        })
      },

      prevWizardStep: () => {
        set({
          onboarding: {
            ...get().onboarding,
            currentStep: Math.max(0, get().onboarding.currentStep - 1),
          },
        })
      },

      setSelectedTheme: (theme) => {
        set({
          onboarding: {
            ...get().onboarding,
            selectedTheme: theme,
          },
        })
      },

      // ========== SIMULATED API CALLS ==========
      simulateChannelFetch: async (url) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        const platform = detectPlatform(url)
        if (platform === 'unknown') {
          throw new Error('Unsupported platform. Please use YouTube, TikTok, or Facebook URL.')
        }

        const channel = generateMockChannel(url, platform)
        return {
          ...channel,
          platform,
          url,
          suggestedTheme: {
            id: THEME_SUGGESTIONS[channel.category] || THEME_SUGGESTIONS.default,
          },
        }
      },

      simulateVerification: async (channelId, code) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // 90% success rate for demo
        if (Math.random() > 0.1) {
          return { success: true }
        }
        throw new Error('Verification code not found in bio. Please try again.')
      },

      // ========== POST ACTIONS ==========
      addPost: (postData) => {
        const newPost = {
          id: generateId('post_'),
          ...postData,
          
          // ========== BACKEND FIELDS ==========
          platform: postData.platform || 'youtube', // Default to YouTube
          original_video_url: postData.videoUrl || null,
          content_json: null, // Placeholder for Tiptap JSON
          
          status: 'draft',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({
          posts: [...state.posts, newPost],
        }))
        return newPost
      },

      updatePost: (postId, updates) => {
        set((state) => ({
          posts: state.posts.map(p => 
            p.id === postId 
              ? { ...p, ...updates, updatedAt: new Date().toISOString() }
              : p
          ),
        }))
      },

      publishPost: (postId) => {
        set((state) => ({
          posts: state.posts.map(p => 
            p.id === postId 
              ? { ...p, status: 'published', publishedAt: new Date().toISOString() }
              : p
          ),
        }))
      },

      generateMockPost: () => {
        const mockTitles = [
          'The Future of AI in Content Creation',
          'Top 10 Productivity Hacks for Creators',
          'How to Build a Successful YouTube Channel',
          'Understanding the Algorithm: A Deep Dive',
        ]
        return {
          title: mockTitles[Math.floor(Math.random() * mockTitles.length)],
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
          thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400',
        }
      },

      getPublishedPostsBySite: (siteId) => {
        return get().posts.filter(p => p.siteId === siteId && p.status === 'published')
      },

      // ========== USER/PLAN ACTIONS ==========
      togglePlan: () => {
        set((state) => ({
          user: {
            ...state.user,
            plan: state.user.plan === 'free' ? 'pro' : 'free',
          },
        }))
      },

      upgradePlan: () => {
        set((state) => ({
          user: {
            ...state.user,
            plan: 'pro',
          },
        }))
        get().addToast({ type: 'success', message: '🎉 Welcome to Pro! All features unlocked.' })
      },

      // ========== COMPUTED VALUES ==========
      getTotalViews: () => {
        return get().sites.reduce((sum, site) => sum + (site.stats?.views || 0), 0)
      },

      getTotalRevenue: () => {
        return get().sites.reduce((sum, site) => sum + (site.stats?.revenue || 0), 0)
      },

      getSiteCount: () => {
        return get().sites.length
      },

      getVerifiedSiteCount: () => {
        return get().sites.filter(s => s.isVerified).length
      },

      canCreateSite: () => {
        const state = get()
        if (state.user.plan === 'pro') return true
        return state.sites.length < 1
      },

      // ========== TOAST ACTIONS ==========
      addToast: (toast) => {
        const id = generateId('toast_')
        set((state) => ({
          toasts: [...state.toasts, { id, ...toast }],
        }))
        // Auto-remove after 5 seconds
        setTimeout(() => {
          set((state) => ({
            toasts: state.toasts.filter(t => t.id !== id),
          }))
        }, 5000)
      },

      removeToast: (toastId) => {
        set((state) => ({
          toasts: state.toasts.filter(t => t.id !== toastId),
        }))
      },
    }),
    {
      name: 'streamtosite-storage',
      partialize: (state) => ({
        user: state.user,
        sites: state.sites,
        posts: state.posts,
      }),
    }
  )
)

export default useAppStore
