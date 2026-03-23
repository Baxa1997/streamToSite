'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Youtube, 
  ArrowRight, 
  ArrowLeft,
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  ExternalLink,
  Sparkles,
  Lock,
  ShieldCheck,
  PartyPopper,
  Globe,
  Users,
  Video,
  Link2
} from 'lucide-react'
import useAppStore from '@/store/useAppStore'
import { mockFetchChannel, mockVerifyBio } from '@/services/mockApi'

// ========== PLATFORM CONFIGS ==========
const PLATFORMS = [
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-500',
    textColor: 'text-red-500',
    borderColor: 'border-red-500',
    hoverBg: 'hover:bg-red-500/10',
    description: 'Convert videos into SEO-optimized blog posts',
    placeholder: 'https://youtube.com/@yourchannel',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
    color: 'from-neutral-800 to-neutral-900',
    bgColor: 'bg-neutral-900',
    textColor: 'text-white',
    borderColor: 'border-neutral-700',
    hoverBg: 'hover:bg-neutral-800/50',
    description: 'Transform short-form into engaging articles',
    placeholder: 'https://tiktok.com/@yourchannel',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    color: 'from-blue-600 to-blue-700',
    bgColor: 'bg-blue-600',
    textColor: 'text-blue-500',
    borderColor: 'border-blue-500',
    hoverBg: 'hover:bg-blue-500/10',
    description: 'Turn video posts into readable content',
    placeholder: 'https://facebook.com/yourchannel',
  },
]

// ========== ANIMATION VARIANTS ==========
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
  exit: { opacity: 0, scale: 0.9, y: 20 },
}

const stepVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
}

// ========== CONFETTI COMPONENT ==========
const Confetti = () => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
            top: -20,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 100,
            opacity: [1, 1, 0],
            rotate: Math.random() * 720 - 360,
            x: Math.random() * 200 - 100,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

// ========== MAIN WIZARD COMPONENT ==========
export default function CreateSiteWizard() {
  const { 
    onboarding, 
    closeWizard, 
    selectPlatform, 
    setPendingChannel,
    addSite,
    verifySite,
    setWizardStep,
  } = useAppStore()

  const [direction, setDirection] = useState(0)
  const [channelUrl, setChannelUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [foundChannel, setFoundChannel] = useState(null)
  const [createdSite, setCreatedSite] = useState(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [copied, setCopied] = useState(false)

  const currentStep = onboarding.currentStep
  const selectedPlatform = PLATFORMS.find(p => p.id === onboarding.selectedPlatform)

  // Reset state when wizard closes
  useEffect(() => {
    if (!onboarding.isWizardOpen) {
      setChannelUrl('')
      setFoundChannel(null)
      setCreatedSite(null)
      setError(null)
      setIsVerifying(false)
      setIsVerified(false)
    }
  }, [onboarding.isWizardOpen])

  // ========== HANDLERS ==========
  const handlePlatformSelect = (platformId) => {
    setDirection(1)
    selectPlatform(platformId)
  }

  const handleBack = () => {
    setDirection(-1)
    if (currentStep === 1) {
      setWizardStep(0)
      setChannelUrl('')
      setFoundChannel(null)
      setError(null)
    } else if (currentStep === 2) {
      setWizardStep(1)
    }
  }

  const handleFetchChannel = async () => {
    if (!channelUrl.trim()) {
      setError('Please enter a channel URL')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await mockFetchChannel(channelUrl, onboarding.selectedPlatform)
      setFoundChannel(result.channel)
      setPendingChannel(result.channel)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateSite = () => {
    if (!foundChannel) return
    
    const site = addSite(foundChannel)
    setCreatedSite(site)
    setDirection(1)
    setWizardStep(2)
  }

  const handleVerifyBio = async () => {
    if (!createdSite) return

    setIsVerifying(true)
    setError(null)

    try {
      await mockVerifyBio(createdSite.channelId, createdSite.verificationCode)
      verifySite(createdSite.id, 'bio')
      setIsVerified(true)
      setShowConfetti(true)
      
      // Auto-close after celebration
      setTimeout(() => {
        closeWizard()
        window.location.href = '/dashboard/sites'
      }, 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleCopyCode = () => {
    if (createdSite?.verificationCode) {
      navigator.clipboard.writeText(createdSite.verificationCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // ========== RENDER STEPS ==========
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepPlatformSelect onSelect={handlePlatformSelect} />
      case 1:
        return (
          <StepConnectChannel
            platform={selectedPlatform}
            channelUrl={channelUrl}
            setChannelUrl={setChannelUrl}
            isLoading={isLoading}
            error={error}
            foundChannel={foundChannel}
            onFetch={handleFetchChannel}
            onCreate={handleCreateSite}
            onBack={handleBack}
          />
        )
      case 2:
        return (
          <StepVerification
            site={createdSite}
            platform={selectedPlatform}
            isVerifying={isVerifying}
            isVerified={isVerified}
            error={error}
            copied={copied}
            onCopyCode={handleCopyCode}
            onVerify={handleVerifyBio}
            onBack={handleBack}
          />
        )
      default:
        return null
    }
  }

  if (!onboarding.isWizardOpen) return null

  return (
    <>
      {showConfetti && <Confetti />}
      
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeWizard}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl bg-neutral-900 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden"
            variants={modalVariants}
          >
            {/* Close Button */}
            <button
              onClick={closeWizard}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Progress Indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              {[0, 1, 2].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step === currentStep 
                      ? 'w-8 bg-red-500' 
                      : step < currentStep 
                        ? 'w-4 bg-red-500/50' 
                        : 'w-4 bg-neutral-700'
                  }`}
                />
              ))}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="p-8 pt-16"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

// ========== STEP 0: PLATFORM SELECT ==========
function StepPlatformSelect({ onSelect }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Choose Your Platform
        </h2>
        <p className="text-neutral-400">
          Select the platform you want to turn into a blog
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {PLATFORMS.map((platform) => {
          const Icon = platform.icon
          return (
            <motion.button
              key={platform.id}
              onClick={() => onSelect(platform.id)}
              className={`group relative p-6 rounded-xl border-2 border-neutral-700 ${platform.hoverBg} transition-all duration-300 hover:border-opacity-100 hover:scale-[1.02]`}
              style={{ '--platform-color': platform.borderColor }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-1">{platform.name}</h3>
              <p className="text-xs text-neutral-500 line-clamp-2">
                {platform.description}
              </p>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

// ========== STEP 1: CONNECT CHANNEL ==========
function StepConnectChannel({ 
  platform, 
  channelUrl, 
  setChannelUrl, 
  isLoading, 
  error, 
  foundChannel,
  onFetch,
  onCreate,
  onBack 
}) {
  const Icon = platform?.icon || Youtube

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${platform?.color} flex items-center justify-center mb-4`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Connect Your {platform?.name} Channel
        </h2>
        <p className="text-neutral-400">
          Paste your channel URL to get started
        </p>
      </div>

      {/* URL Input */}
      <div className="space-y-3">
        <div className="relative">
          <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <input
            type="url"
            value={channelUrl}
            onChange={(e) => setChannelUrl(e.target.value)}
            placeholder={platform?.placeholder}
            className="w-full pl-12 pr-4 py-4 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
            disabled={isLoading || foundChannel}
          />
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-400 text-sm"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </div>

      {/* Found Channel Card */}
      {foundChannel && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-xl border border-neutral-700"
        >
          {/* Glassmorphism Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-xl" />
          
          {/* Banner */}
          <div 
            className="relative h-24 bg-cover bg-center"
            style={{ backgroundImage: `url(${foundChannel.banner})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative p-5 -mt-10">
            <div className="flex items-end gap-4">
              <img
                src={foundChannel.avatar}
                alt={foundChannel.name}
                className="w-20 h-20 rounded-xl border-4 border-neutral-900 bg-neutral-800"
              />
              <div className="flex-1 pb-2">
                <h3 className="font-bold text-xl text-white">{foundChannel.name}</h3>
                <div className="flex items-center gap-4 text-sm text-neutral-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {foundChannel.subscribers}
                  </span>
                  <span className="flex items-center gap-1">
                    <Video className="w-4 h-4" />
                    {foundChannel.videoCount} videos
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Found
              </div>
            </div>
            <p className="text-sm text-neutral-400 mt-4 line-clamp-2">
              {foundChannel.description}
            </p>
            <div className="flex gap-2 mt-4">
              {foundChannel.tags?.map(tag => (
                <span key={tag} className="px-2 py-1 bg-neutral-800 text-neutral-400 text-xs rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-3 text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        
        <div className="flex-1" />
        
        {!foundChannel ? (
          <button
            onClick={onFetch}
            disabled={isLoading || !channelUrl.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-neutral-700 disabled:text-neutral-500 text-white font-semibold rounded-xl transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                Connect
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        ) : (
          <button
            onClick={onCreate}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-500/25"
          >
            <Sparkles className="w-5 h-5" />
            Confirm & Create Site
          </button>
        )}
      </div>
    </div>
  )
}

// ========== STEP 2: VERIFICATION ==========
function StepVerification({ 
  site, 
  platform,
  isVerifying, 
  isVerified, 
  error, 
  copied,
  onCopyCode,
  onVerify,
  onBack 
}) {
  if (isVerified) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.2 }}
          className="w-24 h-24 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-6"
        >
          <PartyPopper className="w-12 h-12 text-emerald-400" />
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2">
          You're Verified! 🎉
        </h2>
        <p className="text-neutral-400 mb-6">
          Your site is now ready to earn revenue. Redirecting to dashboard...
        </p>
        <div className="flex items-center justify-center gap-2 text-emerald-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Redirecting...</span>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-amber-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Verify Channel Ownership
        </h2>
        <p className="text-neutral-400">
          To unlock monetization, prove you own <span className="text-white font-medium">@{site?.channelName}</span>
        </p>
      </div>

      {/* Verification Instructions */}
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-red-400">1</span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-white mb-2">Add this code to your {platform?.name} bio</h4>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-lg font-mono text-amber-400">
                {site?.verificationCode || 'STS-XXXX'}
              </code>
              <button
                onClick={onCopyCode}
                className="p-3 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
              >
                {copied ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Copy className="w-5 h-5 text-neutral-300" />
                )}
              </button>
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              {copied ? '✓ Copied to clipboard!' : 'Click to copy the verification code'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 mt-6 pt-6 border-t border-neutral-700">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-red-400">2</span>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Click verify once you've added the code</h4>
            <p className="text-sm text-neutral-400">
              We'll check your {platform?.name} profile to confirm the code is present.
            </p>
          </div>
        </div>
      </div>

      {/* Alternative: OAuth */}
      <div className="text-center">
        <p className="text-xs text-neutral-500 mb-2">Or verify instantly with</p>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-sm text-neutral-300 transition-colors">
          <Globe className="w-4 h-4" />
          Connect with {platform?.name}
          <ExternalLink className="w-3 h-3 opacity-50" />
        </button>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-3 text-neutral-400 hover:text-white transition-colors"
          disabled={isVerifying}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        
        <div className="flex-1" />
        
        <button
          onClick={onVerify}
          disabled={isVerifying}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-neutral-700 disabled:to-neutral-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/25 disabled:shadow-none"
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Checking Bio...
            </>
          ) : (
            <>
              <ShieldCheck className="w-5 h-5" />
              I've Added the Code
            </>
          )}
        </button>
      </div>
    </div>
  )
}
