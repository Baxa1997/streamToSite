import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * StreamToSite Global App Store
 * 
 * Mimics the database in Frontend-Only Mode.
 * Manages user state, sites, and verification status.
 */

// Generate unique ID
const generateId = () => `site_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

// Generate verification code
const generateVerificationCode = (siteId) => `STS-${siteId.slice(-4).toUpperCase()}`

const useAppStore = create(
  persist(
    (set, get) => ({
      // ========== USER STATE ==========
      user: {
        id: 'user_demo_001',
        name: 'Demo User',
        email: 'demo@streamtosite.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
        plan: 'free', // 'free' | 'pro'
        createdAt: new Date().toISOString(),
      },

      // ========== SITES STATE ==========
      sites: [],

      // ========== ONBOARDING STATE ==========
      onboarding: {
        isWizardOpen: false,
        currentStep: 0,
        selectedPlatform: null,
        pendingChannel: null,
        verificationCode: null,
      },

      // ========== USER ACTIONS ==========
      updateUser: (updates) => set((state) => ({
        user: { ...state.user, ...updates }
      })),

      upgradePlan: () => set((state) => ({
        user: { ...state.user, plan: 'pro' }
      })),

      downgradePlan: () => set((state) => ({
        user: { ...state.user, plan: 'free' }
      })),

      // ========== SITE ACTIONS ==========
      addSite: (channelData) => {
        const id = generateId()
        const verificationCode = generateVerificationCode(id)
        
        const newSite = {
          id,
          channelId: channelData.id,
          channelName: channelData.name,
          channelAvatar: channelData.avatar,
          channelSubscribers: channelData.subscribers,
          channelDescription: channelData.description,
          platform: channelData.platform,
          domain: `${channelData.name.toLowerCase().replace(/\s+/g, '-')}.streamtosite.com`,
          customDomain: null,
          status: 'unclaimed', // 'unclaimed' | 'pending' | 'verified'
          verificationMethod: 'none', // 'none' | 'bio' | 'oauth'
          verificationCode,
          isVerified: false,
          theme: 'cinema',
          postsCount: 0,
          totalViews: 0,
          revenue: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        set((state) => ({
          sites: [...state.sites, newSite],
          onboarding: {
            ...state.onboarding,
            verificationCode,
          }
        }))

        return newSite
      },

      updateSite: (siteId, updates) => set((state) => ({
        sites: state.sites.map(site => 
          site.id === siteId 
            ? { ...site, ...updates, updatedAt: new Date().toISOString() }
            : site
        )
      })),

      updateSiteStatus: (siteId, status) => set((state) => ({
        sites: state.sites.map(site =>
          site.id === siteId
            ? { 
                ...site, 
                status, 
                isVerified: status === 'verified',
                verificationMethod: status === 'verified' ? 'bio' : site.verificationMethod,
                updatedAt: new Date().toISOString() 
              }
            : site
        )
      })),

      verifySite: (siteId, method = 'bio') => set((state) => ({
        sites: state.sites.map(site =>
          site.id === siteId
            ? { 
                ...site, 
                status: 'verified',
                isVerified: true,
                verificationMethod: method,
                updatedAt: new Date().toISOString() 
              }
            : site
        )
      })),

      deleteSite: (siteId) => set((state) => ({
        sites: state.sites.filter(site => site.id !== siteId)
      })),

      getSiteById: (siteId) => {
        return get().sites.find(site => site.id === siteId)
      },

      // ========== ONBOARDING ACTIONS ==========
      openWizard: () => set((state) => ({
        onboarding: {
          ...state.onboarding,
          isWizardOpen: true,
          currentStep: 0,
          selectedPlatform: null,
          pendingChannel: null,
          verificationCode: null,
        }
      })),

      closeWizard: () => set((state) => ({
        onboarding: {
          ...state.onboarding,
          isWizardOpen: false,
          currentStep: 0,
          selectedPlatform: null,
          pendingChannel: null,
        }
      })),

      setWizardStep: (step) => set((state) => ({
        onboarding: { ...state.onboarding, currentStep: step }
      })),

      nextWizardStep: () => set((state) => ({
        onboarding: { 
          ...state.onboarding, 
          currentStep: state.onboarding.currentStep + 1 
        }
      })),

      prevWizardStep: () => set((state) => ({
        onboarding: { 
          ...state.onboarding, 
          currentStep: Math.max(0, state.onboarding.currentStep - 1) 
        }
      })),

      selectPlatform: (platform) => set((state) => ({
        onboarding: { 
          ...state.onboarding, 
          selectedPlatform: platform,
          currentStep: 1 
        }
      })),

      setPendingChannel: (channel) => set((state) => ({
        onboarding: { ...state.onboarding, pendingChannel: channel }
      })),

      // ========== COMPUTED VALUES ==========
      getVerifiedSitesCount: () => {
        return get().sites.filter(site => site.isVerified).length
      },

      getTotalViews: () => {
        return get().sites.reduce((sum, site) => sum + site.totalViews, 0)
      },

      getTotalRevenue: () => {
        return get().sites.reduce((sum, site) => sum + site.revenue, 0)
      },

      canCreateMoreSites: () => {
        const { user, sites } = get()
        if (user.plan === 'pro') return true
        return sites.length < 1 // Free plan: 1 site limit
      },

      // ========== RESET (for testing) ==========
      resetStore: () => set({
        user: {
          id: 'user_demo_001',
          name: 'Demo User',
          email: 'demo@streamtosite.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
          plan: 'free',
          createdAt: new Date().toISOString(),
        },
        sites: [],
        onboarding: {
          isWizardOpen: false,
          currentStep: 0,
          selectedPlatform: null,
          pendingChannel: null,
          verificationCode: null,
        },
      }),
    }),
    {
      name: 'streamtosite-storage',
      partialize: (state) => ({
        user: state.user,
        sites: state.sites,
      }),
    }
  )
)

export default useAppStore
