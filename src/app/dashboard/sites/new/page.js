'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardLayout from '@/components/DashboardLayout'
import useAppStore from '@/store/useAppStore'
import { detectPlatform, getPlatformConfig, PLATFORM_CONFIGS } from '@/utils/platform'
import { 
  Link2, 
  Loader2, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Copy,
  ExternalLink,
  Palette,
  Zap,
  Shield,
  AlertCircle,
  Plus,
  ChevronDown,
  Globe,
  Users,
  Video,
  Rocket,
  PartyPopper,
  X
} from 'lucide-react'

// ========== PLATFORM ICONS ==========
const YouTubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const getPlatformIcon = (platform) => {
  switch (platform) {
    case 'youtube': return YouTubeIcon
    case 'tiktok': return TikTokIcon
    case 'facebook': return FacebookIcon
    default: return Globe
  }
}

// ========== THEMES ==========
const THEMES = {
  cyber_dark: {
    id: 'cyber_dark',
    name: 'Cyber Dark',
    description: 'Neon accents, futuristic feel',
    preview: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b4e 100%)',
    accent: '#00f5ff',
    categories: ['gaming', 'tech'],
  },
  minimal_tech: {
    id: 'minimal_tech',
    name: 'Minimal Tech',
    description: 'Clean, modern, professional',
    preview: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    accent: '#3b82f6',
    categories: ['tech', 'business'],
  },
  cinema_dark: {
    id: 'cinema_dark',
    name: 'Cinema Dark',
    description: 'Netflix-style entertainment',
    preview: 'linear-gradient(135deg, #0a0a0a 0%, #1f1f1f 100%)',
    accent: '#ef4444',
    categories: ['entertainment', 'movies'],
  },
  spotlight: {
    id: 'spotlight',
    name: 'Spotlight',
    description: 'Bold, vibrant, eye-catching',
    preview: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
    accent: '#f472b6',
    categories: ['entertainment', 'lifestyle'],
  },
  energy: {
    id: 'energy',
    name: 'Energy',
    description: 'Dynamic, motivational',
    preview: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
    accent: '#10b981',
    categories: ['fitness', 'sports'],
  },
  newspaper: {
    id: 'newspaper',
    name: 'Newspaper',
    description: 'Classic editorial layout',
    preview: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    accent: '#b45309',
    categories: ['news', 'education'],
  },
}

// ========== CONFETTI COMPONENT ==========
const Confetti = () => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#FF5722', '#E91E63']
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 60 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: -20,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
            opacity: [1, 1, 0],
            rotate: Math.random() * 720 - 360,
            x: Math.random() * 200 - 100,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: 'easeOut',
          }}
        >
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors[i % colors.length] }}
          />
        </motion.div>
      ))}
    </div>
  )
}

// ========== MAIN PAGE COMPONENT ==========
export default function NewSitePage() {
  const router = useRouter()
  const { 
    sites, 
    createSite, 
    addSourceToSite, 
    verifySite, 
    addToast,
    canCreateSite,
    user
  } = useAppStore()

  // ========== STATE ==========
  const [url, setUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [detectedPlatform, setDetectedPlatform] = useState(null)
  const [channelData, setChannelData] = useState(null)
  const [error, setError] = useState('')
  
  // Flow state
  const [flowStep, setFlowStep] = useState('input') // 'input' | 'detected' | 'choose' | 'theme' | 'verify' | 'success'
  const [flowChoice, setFlowChoice] = useState(null) // 'new' | 'existing'
  const [selectedExistingSite, setSelectedExistingSite] = useState(null)
  const [selectedTheme, setSelectedTheme] = useState(null)
  
  // Verification
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [createdSite, setCreatedSite] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [copied, setCopied] = useState(false)

  // ========== MOCK CHANNEL DATA ==========
  const generateChannelData = (platform) => {
    const mockData = {
      youtube: {
        name: 'TechDaily',
        handle: '@techdaily',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechDaily',
        subscribers: '1.2M',
        videoCount: 847,
        category: 'tech',
      },
      tiktok: {
        name: 'CreativeVibes',
        handle: '@creativevibes',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CreativeVibes',
        subscribers: '2.5M',
        videoCount: 1234,
        category: 'entertainment',
      },
      facebook: {
        name: 'NewsToday',
        handle: 'newstoday',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NewsToday',
        subscribers: '890K',
        videoCount: 532,
        category: 'news',
      },
    }
    return mockData[platform] || mockData.youtube
  }

  // ========== HANDLERS ==========
  const handleUrlPaste = async () => {
    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    setIsAnalyzing(true)
    setError('')
    
    // Detect platform
    const platform = detectPlatform(url)
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (platform === 'unknown') {
      setError('Unsupported platform. Please use YouTube, TikTok, or Facebook.')
      setIsAnalyzing(false)
      return
    }

    setDetectedPlatform(platform)
    setChannelData(generateChannelData(platform))
    setIsAnalyzing(false)
    setFlowStep('detected')

    // Wait for animation, then show branching
    setTimeout(() => {
      if (sites.length === 0) {
        // No sites - auto-select new site creation
        setFlowChoice('new')
        setFlowStep('theme')
        // Auto-suggest theme based on category
        const category = generateChannelData(platform).category
        const suggestedTheme = Object.values(THEMES).find(t => t.categories.includes(category))
        if (suggestedTheme) {
          setSelectedTheme(suggestedTheme)
        }
      } else {
        // Has sites - show options
        setFlowStep('choose')
      }
    }, 1500)
  }

  const handleChooseNew = () => {
    setFlowChoice('new')
    setFlowStep('theme')
    // Auto-suggest theme
    if (channelData?.category) {
      const suggestedTheme = Object.values(THEMES).find(t => t.categories.includes(channelData.category))
      if (suggestedTheme) {
        setSelectedTheme(suggestedTheme)
      }
    }
  }

  const handleChooseExisting = (site) => {
    setFlowChoice('existing')
    setSelectedExistingSite(site)
    handleAddToExisting(site)
  }

  const handleAddToExisting = async (site) => {
    // Add source to existing site
    const updatedSite = addSourceToSite(site.id, url, detectedPlatform)
    
    if (updatedSite) {
      addToast({ type: 'success', message: `🎉 ${channelData.name} added to ${site.domain}` })
      setShowConfetti(true)
      setFlowStep('success')
      setCreatedSite(updatedSite)
      
      setTimeout(() => {
        router.push('/dashboard/sites')
      }, 3000)
    }
  }

  const handleCreateSite = () => {
    if (!selectedTheme) {
      addToast({ type: 'error', message: 'Please select a theme' })
      return
    }

    // Check plan limits
    if (!canCreateSite()) {
      addToast({ type: 'error', message: 'Upgrade to Pro to create more sites!' })
      return
    }

    // Create the site
    const newSite = createSite(url, detectedPlatform)
    setCreatedSite(newSite)
    setVerificationCode(newSite.verificationCode)
    setFlowStep('verify')
  }

  const handleVerify = async () => {
    setIsVerifying(true)
    
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 90% success rate for demo
    if (Math.random() > 0.1) {
      verifySite(createdSite.id)
      setShowConfetti(true)
      setFlowStep('success')
      addToast({ type: 'success', message: '🎉 Channel verified! Your site is now live.' })
      
      setTimeout(() => {
        router.push('/dashboard/sites')
      }, 3000)
    } else {
      setError('Verification code not found. Please try again.')
      setIsVerifying(false)
    }
  }

  const handleSkipVerification = () => {
    addToast({ type: 'info', message: 'Site created! Verify later to unlock ads.' })
    router.push('/dashboard/sites')
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(verificationCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setUrl('')
    setDetectedPlatform(null)
    setChannelData(null)
    setFlowStep('input')
    setFlowChoice(null)
    setSelectedExistingSite(null)
    setSelectedTheme(null)
    setError('')
    setCreatedSite(null)
  }

  // ========== PLATFORM ICON ==========
  const PlatformIcon = detectedPlatform ? getPlatformIcon(detectedPlatform) : null

  // ========== RENDER ==========
  return (
    <DashboardLayout>
      {showConfetti && <Confetti />}
      
      <div className="max-w-4xl mx-auto py-8">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Build your <span className="text-gradient-red">Media Empire</span>
          </h1>
          <p className="text-lg text-neutral-500 max-w-xl mx-auto">
            Turn your social channels into a stunning website in seconds
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ========== STEP: INPUT ========== */}
          {flowStep === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Central Input Card */}
              <div className="card p-8 sm:p-12 backdrop-blur-xl bg-white/80 border-2 border-neutral-100 shadow-2xl shadow-neutral-200/50">
                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Large Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <Link2 className="w-6 h-6 text-neutral-400" />
                    </div>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value)
                        setError('')
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleUrlPaste()}
                      placeholder="Paste link from YouTube, TikTok, or Facebook..."
                      className="w-full pl-14 pr-6 py-5 text-lg border-2 border-neutral-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all placeholder:text-neutral-400"
                      autoFocus
                    />
                  </div>

                  {/* Platform Helper Icons */}
                  <div className="flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                        <YouTubeIcon className="w-4 h-4 text-red-500" />
                      </div>
                      <span>YouTube</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center">
                        <TikTokIcon className="w-4 h-4 text-white" />
                      </div>
                      <span>TikTok</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <FacebookIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <span>Facebook</span>
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    onClick={handleUrlPaste}
                    disabled={isAnalyzing || !url.trim()}
                    className="w-full py-5 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold text-lg rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Analyzing Channel...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-6 h-6" />
                        Analyze Channel
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========== STEP: DETECTED ========== */}
          {flowStep === 'detected' && channelData && (
            <motion.div
              key="detected"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {/* Channel Found Card */}
              <div className="card overflow-hidden border-2 border-green-200 shadow-xl shadow-green-100/50">
                {/* Success Header */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-green-100">
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 10 }}
                      className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h2 className="text-xl font-bold text-neutral-900">Channel Found!</h2>
                      <p className="text-neutral-500">We detected your {detectedPlatform} channel</p>
                    </div>
                  </div>
                </div>

                {/* Channel Info */}
                <div className="p-6">
                  <div className="flex items-center gap-5">
                    <img
                      src={channelData.avatar}
                      alt={channelData.name}
                      className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-neutral-900">{channelData.name}</h3>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                          detectedPlatform === 'youtube' ? 'bg-red-100 text-red-700' :
                          detectedPlatform === 'tiktok' ? 'bg-neutral-900 text-white' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {PlatformIcon && <PlatformIcon className="w-4 h-4" />}
                          {detectedPlatform?.charAt(0).toUpperCase() + detectedPlatform?.slice(1)}
                        </span>
                      </div>
                      <p className="text-neutral-500 mb-3">{channelData.handle}</p>
                      <div className="flex items-center gap-6 text-sm">
                        <span className="flex items-center gap-1.5 text-neutral-600">
                          <Users className="w-4 h-4" />
                          <strong>{channelData.subscribers}</strong> subscribers
                        </span>
                        <span className="flex items-center gap-1.5 text-neutral-600">
                          <Video className="w-4 h-4" />
                          <strong>{channelData.videoCount}</strong> videos
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loading indicator for next step */}
              <div className="flex items-center justify-center gap-3 py-4 text-neutral-500">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Preparing your options...</span>
              </div>
            </motion.div>
          )}

          {/* ========== STEP: CHOOSE (Branching) ========== */}
          {flowStep === 'choose' && (
            <motion.div
              key="choose"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Mini Channel Card */}
              <div className="card p-4 flex items-center gap-4">
                <img src={channelData?.avatar} alt="" className="w-12 h-12 rounded-xl" />
                <div>
                  <h3 className="font-semibold text-neutral-900">{channelData?.name}</h3>
                  <p className="text-sm text-neutral-500">{channelData?.subscribers} subscribers</p>
                </div>
                <button onClick={handleReset} className="ml-auto p-2 text-neutral-400 hover:text-neutral-600 rounded-lg hover:bg-neutral-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Options */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">What would you like to do?</h2>
                <p className="text-neutral-500">Choose how to use this channel</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1: Create New */}
                <motion.button
                  onClick={handleChooseNew}
                  className="card p-6 text-left hover:border-red-300 hover:shadow-lg transition-all group"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Create a New Website</h3>
                  <p className="text-neutral-500 text-sm">
                    A completely new brand. Perfect for a separate niche or audience.
                  </p>
                </motion.button>

                {/* Option 2: Add to Existing */}
                <div className="card p-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-4">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Add to Existing Site</h3>
                  <p className="text-neutral-500 text-sm mb-4">
                    Merge this {detectedPlatform} channel into an existing website.
                  </p>
                  
                  {/* Site List */}
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {sites.map((site) => (
                      <button
                        key={site.id}
                        onClick={() => handleChooseExisting(site)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl border border-neutral-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-left"
                      >
                        <img 
                          src={site.sources?.[0]?.avatar || site.connectedChannel?.avatar} 
                          alt="" 
                          className="w-10 h-10 rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-neutral-900 truncate">{site.domain}</p>
                          <p className="text-xs text-neutral-500 truncate">
                            {site.sources?.length || 1} source{(site.sources?.length || 1) > 1 ? 's' : ''}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========== STEP: THEME ========== */}
          {flowStep === 'theme' && (
            <motion.div
              key="theme"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-2">Choose Your Theme</h2>
                <p className="text-neutral-500">Pick a design that matches your content</p>
              </div>

              {/* Theme Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.values(THEMES).map((theme) => (
                  <motion.button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`group relative p-4 rounded-2xl border-2 transition-all text-left ${
                      selectedTheme?.id === theme.id
                        ? 'border-red-500 ring-4 ring-red-500/20 shadow-lg'
                        : 'border-neutral-200 hover:border-neutral-300 hover:shadow-md'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Recommended Badge */}
                    {channelData?.category && theme.categories.includes(channelData.category) && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded-full flex items-center gap-1 shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        Best Match
                      </span>
                    )}
                    
                    {/* Preview */}
                    <div
                      className="h-20 rounded-xl mb-3 shadow-inner"
                      style={{ background: theme.preview }}
                    >
                      <div className="h-full flex items-center justify-center">
                        <div
                          className="w-6 h-6 rounded-md shadow-lg"
                          style={{ backgroundColor: theme.accent }}
                        />
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-neutral-900">{theme.name}</h4>
                    <p className="text-sm text-neutral-500 mt-1">{theme.description}</p>
                    
                    {/* Selected Check */}
                    {selectedTheme?.id === theme.id && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors"
                >
                  Start Over
                </button>
                <button
                  onClick={handleCreateSite}
                  disabled={!selectedTheme}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-red-500/25"
                >
                  <Rocket className="w-5 h-5" />
                  Launch Site
                </button>
              </div>
            </motion.div>
          )}

          {/* ========== STEP: VERIFY ========== */}
          {flowStep === 'verify' && createdSite && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Success Banner */}
              <div className="card p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">Site Created! 🎉</h3>
                    <p className="text-neutral-600">
                      Your site is live at <strong>{createdSite.domain}</strong>
                    </p>
                  </div>
                  <span className="ml-auto px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                    ⚠️ Unverified
                  </span>
                </div>
              </div>

              {/* Verification Card */}
              <div className="card p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2">Verify Ownership</h2>
                  <p className="text-neutral-500 max-w-md mx-auto">
                    Verify to unlock monetization and remove the "Fan Site" label
                  </p>
                </div>

                {/* Verification Code */}
                <div className="bg-neutral-900 rounded-2xl p-6 text-center mb-6">
                  <p className="text-neutral-400 text-sm mb-3">Add this code to your bio:</p>
                  <div className="flex items-center justify-center gap-4">
                    <code className="text-3xl font-mono font-bold text-white tracking-widest">
                      {verificationCode}
                    </code>
                    <button
                      onClick={handleCopyCode}
                      className={`p-3 rounded-xl transition-all ${
                        copied 
                          ? 'bg-green-500 text-white' 
                          : 'bg-neutral-700 hover:bg-neutral-600 text-neutral-300'
                      }`}
                    >
                      {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  {copied && <p className="text-green-400 text-sm mt-2">Copied!</p>}
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl mb-6"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={handleSkipVerification}
                    className="flex-1 py-4 border-2 border-neutral-200 text-neutral-600 hover:bg-neutral-50 font-medium rounded-xl transition-all"
                  >
                    Skip for Now
                  </button>
                  <button
                    onClick={handleVerify}
                    disabled={isVerifying}
                    className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-green-500/25"
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        I Did It
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========== STEP: SUCCESS ========== */}
          {flowStep === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.2 }}
                className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-8 shadow-xl shadow-green-500/30"
              >
                <PartyPopper className="w-14 h-14 text-white" />
              </motion.div>
              
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                You're All Set! 🎉
              </h2>
              <p className="text-xl text-neutral-500 mb-8">
                {flowChoice === 'existing' 
                  ? 'Channel merged successfully!' 
                  : 'Your site is now live and verified!'
                }
              </p>
              
              <div className="flex items-center justify-center gap-3 text-neutral-500">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Redirecting to your sites...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  )
}
