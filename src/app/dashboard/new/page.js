'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardLayout from '@/components/DashboardLayout'
import useAppStore from '@/store/useAppStore'
import { 
  Link2, 
  Search, 
  Loader2, 
  CheckCircle2, 
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Copy,
  ExternalLink,
  Palette,
  Zap,
  Shield,
  AlertCircle,
  Youtube,
  Gamepad2,
  Newspaper,
  Tv,
  Dumbbell,
  MonitorSmartphone
} from 'lucide-react'

// Theme options
const THEMES = {
  cyber_dark: {
    id: 'cyber_dark',
    name: 'Cyber Dark',
    description: 'Neon accents, dark backgrounds, futuristic feel',
    preview: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b4e 100%)',
    accent: '#00f5ff',
    categories: ['gaming'],
  },
  minimal_tech: {
    id: 'minimal_tech',
    name: 'Minimal Tech',
    description: 'Clean lines, modern typography, professional look',
    preview: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    accent: '#3b82f6',
    categories: ['tech'],
  },
  newspaper_white: {
    id: 'newspaper_white',
    name: 'Newspaper White',
    description: 'Classic editorial layout, readable typography',
    preview: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    accent: '#b45309',
    categories: ['news'],
  },
  spotlight: {
    id: 'spotlight',
    name: 'Spotlight',
    description: 'Bold visuals, vibrant colors, entertainment focus',
    preview: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
    accent: '#f472b6',
    categories: ['entertainment'],
  },
  energy: {
    id: 'energy',
    name: 'Energy',
    description: 'Dynamic layouts, motivational design',
    preview: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
    accent: '#10b981',
    categories: ['fitness'],
  },
  modern_clean: {
    id: 'modern_clean',
    name: 'Modern Clean',
    description: 'Versatile, professional, works for any niche',
    preview: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
    accent: '#f97316',
    categories: ['default'],
  },
}

// Category icons
const CATEGORY_ICONS = {
  gaming: Gamepad2,
  tech: MonitorSmartphone,
  news: Newspaper,
  entertainment: Tv,
  fitness: Dumbbell,
}

export default function NewSitePage() {
  const router = useRouter()
  const {
    onboarding,
    simulateChannelFetch,
    simulateVerification,
    addSite,
    verifySite,
    addToast,
    nextWizardStep,
    prevWizardStep,
    setSelectedTheme,
    closeWizard,
  } = useAppStore()

  const [step, setStep] = useState(1)
  const [channelUrl, setChannelUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [channel, setChannel] = useState(null)
  const [selectedTheme, setTheme] = useState(null)
  const [verificationCode, setVerificationCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [createdSite, setCreatedSite] = useState(null)

  // Get suggested themes based on channel category
  const getSuggestedThemes = () => {
    if (!channel) return Object.values(THEMES)
    
    const category = channel.category
    const suggested = Object.values(THEMES).filter(t => t.categories.includes(category))
    const others = Object.values(THEMES).filter(t => !t.categories.includes(category))
    
    return [...suggested, ...others]
  }

  // Handle URL submission
  const handleFetchChannel = async () => {
    if (!channelUrl.trim()) {
      setError('Please enter a YouTube channel URL')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await simulateChannelFetch(channelUrl)
      setChannel(result)
      setVerificationCode(`STS-${Math.random().toString(36).substring(2, 6).toUpperCase()}`)
      // Auto-select suggested theme
      if (result.suggestedTheme) {
        setTheme(THEMES[result.suggestedTheme.id] || THEMES.modern_clean)
      }
      setStep(2)
    } catch (err) {
      setError(err.message || 'Failed to fetch channel. Please check the URL.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle theme selection and site creation
  const handleCreateSite = async () => {
    if (!selectedTheme) {
      addToast({ type: 'error', message: 'Please select a theme' })
      return
    }

    setIsLoading(true)

    try {
      const newSite = addSite({
        channelId: channel.id,
        channelName: channel.name,
        channelAvatar: channel.avatar,
        channelSubscribers: channel.subscribers,
        channelVideos: channel.videos,
        channelDescription: channel.description,
        category: channel.category,
        theme: selectedTheme.id,
      })
      
      setCreatedSite(newSite)
      setStep(4)
    } catch (err) {
      setError('Failed to create site')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle verification
  const handleVerify = async () => {
    setIsVerifying(true)
    
    try {
      await simulateVerification(channel?.id, verificationCode)
      if (createdSite) {
        verifySite(createdSite.id)
      }
      addToast({ type: 'success', message: '🎉 Channel verified! Your site is now live.' })
      router.push('/dashboard')
    } catch (err) {
      setError(err.message)
      setIsVerifying(false)
    }
  }

  // Skip verification for now
  const handleSkipVerification = () => {
    addToast({ type: 'info', message: 'Site created! You can verify later.' })
    router.push('/dashboard')
  }

  // Copy code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(verificationCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Animation variants
  const stepVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  }

  const CategoryIcon = CATEGORY_ICONS[channel?.category] || Tv

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-neutral-900">Create New Site</h1>
            <span className="text-sm text-neutral-500">Step {step} of 4</span>
          </div>
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait" custom={step}>
          {/* STEP 1: Input URL */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={1}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                  <Youtube className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-900">
                  Paste Your YouTube Channel URL
                </h2>
                <p className="text-neutral-500 max-w-lg mx-auto">
                  We'll analyze your channel and create a beautiful blog website tailored to your content
                </p>
              </div>

              <div className="card p-8 space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Link2 className="w-5 h-5 text-neutral-400" />
                  </div>
                  <input
                    type="url"
                    value={channelUrl}
                    onChange={(e) => {
                      setChannelUrl(e.target.value)
                      setError('')
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleFetchChannel()}
                    placeholder="https://youtube.com/@yourchannel"
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-neutral-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <button
                  onClick={handleFetchChannel}
                  disabled={isLoading || !channelUrl.trim()}
                  className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing Channel...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Find My Channel
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-neutral-400">
                  Supported formats: youtube.com/@handle, youtube.com/channel/ID, youtube.com/c/name
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Channel Found */}
          {step === 2 && channel && (
            <motion.div
              key="step2"
              custom={1}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-900">
                  Channel Found!
                </h2>
                <p className="text-neutral-500">
                  We detected your channel. Let's customize your site.
                </p>
              </div>

              {/* Channel Card */}
              <div className="card p-6 border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
                <div className="flex items-start gap-4">
                  <img
                    src={channel.avatar}
                    alt={channel.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-neutral-900">{channel.name}</h3>
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Found
                      </span>
                    </div>
                    <p className="text-neutral-500 text-sm mb-3">{channel.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-neutral-600">
                        <span className="font-semibold">{channel.subscribers}</span> subscribers
                      </span>
                      <span className="flex items-center gap-1 text-neutral-600">
                        <span className="font-semibold">{channel.videos}</span> videos
                      </span>
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-neutral-100 rounded-full text-neutral-600">
                        <CategoryIcon className="w-3 h-3" />
                        {channel.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
                >
                  Choose Theme
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Theme Selection */}
          {step === 3 && channel && (
            <motion.div
              key="step3"
              custom={1}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-900">
                  Choose Your Theme
                </h2>
                <p className="text-neutral-500">
                  We recommend themes based on your content category
                </p>
              </div>

              {/* Theme Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {getSuggestedThemes().map((theme, index) => (
                  <motion.button
                    key={theme.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setTheme(theme)}
                    className={`group relative p-4 rounded-2xl border-2 transition-all text-left ${
                      selectedTheme?.id === theme.id
                        ? 'border-red-500 ring-4 ring-red-500/20'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {theme.categories.includes(channel.category) && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Recommended
                      </span>
                    )}
                    <div
                      className="h-24 rounded-xl mb-3"
                      style={{ background: theme.preview }}
                    >
                      <div className="h-full flex items-center justify-center">
                        <div
                          className="w-8 h-8 rounded-lg"
                          style={{ backgroundColor: theme.accent }}
                        />
                      </div>
                    </div>
                    <h4 className="font-semibold text-neutral-900">{theme.name}</h4>
                    <p className="text-sm text-neutral-500 mt-1">{theme.description}</p>
                    {selectedTheme?.id === theme.id && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleCreateSite}
                  disabled={!selectedTheme || isLoading}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Create My Site
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Verification */}
          {step === 4 && (
            <motion.div
              key="step4"
              custom={1}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-900">
                  Verify Ownership
                </h2>
                <p className="text-neutral-500 max-w-lg mx-auto">
                  Add this code to your YouTube bio to verify you own <strong>{channel?.name}</strong>
                </p>
              </div>

              <div className="card p-8 space-y-6">
                {/* Verification Code */}
                <div className="bg-neutral-900 rounded-xl p-6 text-center">
                  <p className="text-neutral-400 text-sm mb-2">Verification Code</p>
                  <div className="flex items-center justify-center gap-4">
                    <code className="text-3xl font-mono font-bold text-white tracking-wider">
                      {verificationCode}
                    </code>
                    <button
                      onClick={handleCopyCode}
                      className={`p-3 rounded-lg transition-all ${
                        copied 
                          ? 'bg-green-500 text-white' 
                          : 'bg-neutral-700 hover:bg-neutral-600 text-neutral-300'
                      }`}
                    >
                      {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 font-semibold">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Copy the code above</p>
                      <p className="text-sm text-neutral-500">Click the copy button next to the code</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 font-semibold">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Add to your YouTube bio</p>
                      <p className="text-sm text-neutral-500">
                        Go to YouTube Studio → Customization → Basic info → Description
                      </p>
                      <a
                        href="https://studio.youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-sm text-red-600 hover:text-red-700"
                      >
                        Open YouTube Studio
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 font-semibold">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Click verify below</p>
                      <p className="text-sm text-neutral-500">We'll check your bio and verify instantly</p>
                    </div>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

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
                    className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        I've Added the Code
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Site Preview */}
              {createdSite && (
                <div className="card p-6 border-2 border-dashed border-neutral-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Your site is ready at:</p>
                      <p className="text-lg font-semibold text-neutral-900">
                        {createdSite.domain}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                      ⚠️ Unverified
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  )
}
