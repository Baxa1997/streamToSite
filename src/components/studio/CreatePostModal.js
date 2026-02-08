'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Link2, 
  ArrowRight, 
  ArrowLeft,
  Play,
  Clock,
  Eye,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Video,
  Globe,
} from 'lucide-react'
import useAppStore from '@/store/useAppStore'

// ========== MOCK VIDEO DATA ==========
const MOCK_VIDEOS = [
  {
    id: 'vid_1',
    title: 'The Ultimate Guide to AI in 2026 - Everything You Need to Know',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop',
    duration: '15:42',
    views: '1.2M',
    publishedAt: '2 days ago',
    channelId: 'ch_yt_techexplained',
  },
  {
    id: 'vid_2',
    title: 'iPhone 17 Leaked: Revolutionary Features Coming This Year',
    thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=225&fit=crop',
    duration: '12:18',
    views: '890K',
    publishedAt: '5 days ago',
    channelId: 'ch_yt_techexplained',
  },
  {
    id: 'vid_3',
    title: 'Why Every Developer Needs to Learn Rust in 2026',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop',
    duration: '18:55',
    views: '652K',
    publishedAt: '1 week ago',
    channelId: 'ch_yt_techexplained',
  },
  {
    id: 'vid_4',
    title: 'Building a $10M SaaS: Lessons from the Trenches',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
    duration: '22:30',
    views: '445K',
    publishedAt: '2 weeks ago',
    channelId: 'ch_yt_techexplained',
  },
  {
    id: 'vid_5',
    title: 'The Future of Web Development: What\'s Coming Next',
    thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=225&fit=crop',
    duration: '14:22',
    views: '328K',
    publishedAt: '3 weeks ago',
    channelId: 'ch_yt_techexplained',
  },
  {
    id: 'vid_6',
    title: 'How I Grew My YouTube Channel to 1M Subscribers',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=225&fit=crop',
    duration: '19:45',
    views: '1.5M',
    publishedAt: '1 month ago',
    channelId: 'ch_yt_techexplained',
  },
]

// ========== ANIMATION VARIANTS ==========
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
  exit: { opacity: 0, scale: 0.95, y: 20 },
}

const stepVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
}

// ========== VIDEO CARD COMPONENT ==========
function VideoCard({ video, isSelected, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative group text-left rounded-xl overflow-hidden border-2 transition-all duration-200 ${
        isSelected 
          ? 'border-red-500 ring-2 ring-red-500/30' 
          : 'border-neutral-700 hover:border-neutral-600'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        {/* Duration Badge */}
        <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-xs font-medium rounded">
          {video.duration}
        </span>
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>
        {/* Selected Indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-3 bg-neutral-800">
        <h4 className="font-medium text-white text-sm line-clamp-2 leading-snug mb-2">
          {video.title}
        </h4>
        <div className="flex items-center gap-3 text-xs text-neutral-400">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {video.views}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {video.publishedAt}
          </span>
        </div>
      </div>
    </motion.button>
  )
}

// ========== VIDEO GRID COMPONENT ==========
function VideoGrid({ videos, selectedVideo, onVideoSelect }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          isSelected={selectedVideo?.id === video.id}
          onClick={() => onVideoSelect(video)}
        />
      ))}
    </div>
  )
}

// ========== SOURCE CARD COMPONENT ==========
function SourceCard({ icon: Icon, title, subtitle, isConnected, onClick, platformColor }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex items-center gap-4 p-4 rounded-xl border-2 border-neutral-700 hover:border-neutral-500 bg-neutral-800/50 transition-all group text-left w-full"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${platformColor || 'bg-neutral-700'}`}>
        {typeof Icon === 'string' ? (
          <img src={Icon} alt={title} className="w-full h-full rounded-xl object-cover" />
        ) : (
          <Icon className="w-7 h-7 text-white" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-white truncate">{title}</h4>
        <p className="text-sm text-neutral-400 truncate">{subtitle}</p>
      </div>
      {isConnected && (
        <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
          <CheckCircle2 className="w-3 h-3" />
          Connected
        </div>
      )}
      <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
    </motion.button>
  )
}

// ========== MAIN MODAL COMPONENT ==========
export default function CreatePostModal({ isOpen, onClose }) {
  const { sites, addToast } = useAppStore()
  
  // Wizard state
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(0)
  const [selectedSource, setSelectedSource] = useState(null) // 'channel' | 'paste'
  const [selectedChannel, setSelectedChannel] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [pastedUrl, setPastedUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  // Target Site ID - the site where this post will be published
  const [targetSiteId, setTargetSiteId] = useState(null)

  // ========== SMART AUTO-SELECTION LOGIC ==========
  useEffect(() => {
    if (!sites || sites.length === 0) {
      setTargetSiteId(null)
      return
    }

    // Rule 1: If only one site, auto-select it
    if (sites.length === 1) {
      setTargetSiteId(sites[0].id)
      return
    }

    // Rule 2: If multiple sites AND a channel is selected, try to match by name
    if (sites.length > 1 && selectedChannel) {
      const channelName = selectedChannel.name?.toLowerCase() || ''
      
      // Look for a site with a matching name (partial, case-insensitive)
      const matchingSite = sites.find(site => {
        const siteName = (site.connectedChannel?.name || site.name || '').toLowerCase()
        return siteName.includes(channelName) || channelName.includes(siteName)
      })
      
      if (matchingSite) {
        setTargetSiteId(matchingSite.id)
      } else {
        // No match found, default to first site
        setTargetSiteId(sites[0].id)
      }
      return
    }

    // Default: select first site
    if (!targetSiteId && sites.length > 0) {
      setTargetSiteId(sites[0].id)
    }
  }, [sites, selectedChannel])

  // Get the currently selected site object
  const selectedSite = sites.find(s => s.id === targetSiteId)

  // Mock connected channels from sites
  const connectedChannels = sites.map(site => ({
    id: site.sources?.[0]?.channelId || site.connectedChannel?.id || site.id,
    name: site.sources?.[0]?.name || site.connectedChannel?.name || site.name || 'My Channel',
    avatar: site.sources?.[0]?.avatar || site.connectedChannel?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=channel',
    subscribers: site.sources?.[0]?.subscribers || site.connectedChannel?.subscribers || '0',
    platform: site.sources?.[0]?.platform || 'youtube',
    siteId: site.id,
  }))

  // Reset state when modal closes
  const handleClose = useCallback(() => {
    setStep(1)
    setDirection(0)
    setSelectedSource(null)
    setSelectedChannel(null)
    setSelectedVideo(null)
    setPastedUrl('')
    setTargetSiteId(null)
    onClose()
  }, [onClose])

  // Navigate between steps
  const goToStep = (newStep) => {
    setDirection(newStep > step ? 1 : -1)
    setStep(newStep)
  }

  // Handle source selection
  const handleSourceSelect = (type, channel = null) => {
    setSelectedSource(type)
    if (type === 'channel' && channel) {
      setSelectedChannel(channel)
      // Auto-select the site linked to this channel
      if (channel.siteId) {
        setTargetSiteId(channel.siteId)
      }
    }
    goToStep(2)
  }

  // Handle video selection
  const handleVideoSelect = (video) => {
    setSelectedVideo(video)
  }

  // Handle URL paste
  const handleUrlSubmit = () => {
    if (!pastedUrl.trim()) return
    // Simulate loading
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // Create a mock video from the URL
      setSelectedVideo({
        id: 'pasted_video',
        title: 'Video from URL - ' + pastedUrl.split('/').pop(),
        thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=225&fit=crop',
        duration: '00:00',
        views: '-',
        publishedAt: 'Just now',
      })
    }, 1500)
  }

  // Handle creating the draft
  const handleCreateDraft = () => {
    if (!selectedVideo || !targetSiteId) {
      addToast?.({ type: 'error', message: 'Please select a video and target site' })
      return
    }
    
    console.log('Creating post for Site ID:', targetSiteId)
    console.log('Selected Video:', selectedVideo)
    
    // Navigate to editor with the selected video and site
    window.location.href = `/dashboard/editor/new?video=${selectedVideo.id}&site=${targetSiteId}`
    handleClose()
  }

  if (!isOpen) return null

  return (
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
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-900 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden flex flex-col"
          variants={modalVariants}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              {step > 1 && (
                <button
                  onClick={() => goToStep(step - 1)}
                  className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div>
                <h2 className="text-xl font-bold text-white">Create New Post</h2>
                <p className="text-sm text-neutral-400">
                  {step === 1 && 'Select your video source'}
                  {step === 2 && selectedSource === 'channel' && 'Choose a video to convert'}
                  {step === 2 && selectedSource === 'paste' && 'Paste your video URL'}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                {[1, 2].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      s === step 
                        ? 'w-8 bg-red-500' 
                        : s < step 
                          ? 'w-4 bg-red-500/50' 
                          : 'w-4 bg-neutral-700'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step + (selectedSource || '')}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                {/* Step 1: Source Selection */}
                {step === 1 && (
                  <div className="space-y-4 max-w-xl mx-auto">
                    <div className="text-center mb-6">
                      <Video className="w-12 h-12 text-red-500 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-white">Where's your video?</h3>
                      <p className="text-neutral-400 text-sm">
                        Select a connected channel or paste a URL
                      </p>
                    </div>

                    {/* Connected Channels */}
                    {connectedChannels.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-neutral-400">Connected Channels</p>
                        {connectedChannels.map((channel) => (
                          <SourceCard
                            key={channel.id}
                            icon={channel.avatar}
                            title={channel.name}
                            subtitle={`${channel.subscribers} subscribers • ${channel.platform}`}
                            isConnected
                            platformColor="bg-red-500"
                            onClick={() => handleSourceSelect('channel', channel)}
                          />
                        ))}
                      </div>
                    )}

                    {/* Divider */}
                    <div className="relative py-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-neutral-800" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-3 bg-neutral-900 text-neutral-500 text-sm">or</span>
                      </div>
                    </div>

                    {/* Paste URL Option */}
                    <SourceCard
                      icon={Link2}
                      title="Paste Video URL"
                      subtitle="YouTube, TikTok, Vimeo, and more"
                      platformColor="bg-neutral-700"
                      onClick={() => handleSourceSelect('paste')}
                    />
                  </div>
                )}

                {/* Step 2: Video Picker (from Channel) */}
                {step === 2 && selectedSource === 'channel' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedChannel?.avatar}
                          alt={selectedChannel?.name}
                          className="w-10 h-10 rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium text-white">{selectedChannel?.name}</h4>
                          <p className="text-xs text-neutral-400">Select a video to convert</p>
                        </div>
                      </div>
                      <span className="text-sm text-neutral-400">{MOCK_VIDEOS.length} videos</span>
                    </div>

                    <VideoGrid
                      videos={MOCK_VIDEOS}
                      selectedVideo={selectedVideo}
                      onVideoSelect={handleVideoSelect}
                    />
                  </div>
                )}

                {/* Step 2: URL Paste */}
                {step === 2 && selectedSource === 'paste' && (
                  <div className="max-w-xl mx-auto space-y-6">
                    <div className="text-center mb-6">
                      <Link2 className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-white">Paste your video URL</h3>
                      <p className="text-neutral-400 text-sm">
                        Works with YouTube, TikTok, Vimeo, and more
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="relative">
                        <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                        <input
                          type="url"
                          value={pastedUrl}
                          onChange={(e) => setPastedUrl(e.target.value)}
                          placeholder="https://youtube.com/watch?v=..."
                          className="w-full pl-12 pr-4 py-4 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                        />
                      </div>

                      <button
                        onClick={handleUrlSubmit}
                        disabled={!pastedUrl.trim() || isLoading}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-500 hover:bg-red-600 disabled:bg-neutral-700 disabled:text-neutral-500 text-white font-semibold rounded-xl transition-colors"
                      >
                        {isLoading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <Sparkles className="w-5 h-5" />
                            </motion.div>
                            Fetching Video...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            Fetch Video
                          </>
                        )}
                      </button>
                    </div>

                    {/* Show selected video preview */}
                    {selectedVideo && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-neutral-800 border border-neutral-700 rounded-xl flex items-center gap-4"
                      >
                        <div className="relative w-32 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={selectedVideo.thumbnail}
                            alt={selectedVideo.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white line-clamp-2">{selectedVideo.title}</h4>
                          <p className="text-sm text-neutral-400 mt-1">Ready to convert</p>
                        </div>
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ========== STICKY FOOTER - Target Website Selector ========== */}
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-6 py-4 border-t border-neutral-800 bg-neutral-950/95 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Left Side: Video Thumbnail + Title */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="relative w-16 h-9 rounded-md overflow-hidden flex-shrink-0 border border-neutral-700">
                    <img
                      src={selectedVideo.thumbnail}
                      alt={selectedVideo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-3 h-3 text-white fill-white" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">
                      {selectedVideo.title}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">
                      {selectedVideo.duration} • {selectedVideo.views} views
                    </p>
                  </div>
                </div>

                {/* Right Side: Publishing To Selector */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-neutral-500" />
                    <span className="text-sm text-neutral-400">Publishing to:</span>
                    
                    {/* Site Selector */}
                    {sites.length === 0 ? (
                      // No sites - show message
                      <span className="text-sm text-amber-400">
                        No sites created yet
                      </span>
                    ) : sites.length === 1 ? (
                      // Single site - just show the name (static)
                      <span className="font-semibold text-white">
                        {sites[0]?.connectedChannel?.name || sites[0]?.domain?.split('.')[0] || 'My Site'}
                      </span>
                    ) : (
                      // Multiple sites - show dropdown
                      <div className="relative">
                        <select
                          value={targetSiteId || ''}
                          onChange={(e) => setTargetSiteId(e.target.value)}
                          className="appearance-none bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 pr-8 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 cursor-pointer hover:border-neutral-600 transition-colors"
                        >
                          {sites.map((site) => (
                            <option key={site.id} value={site.id}>
                              {site.connectedChannel?.name || site.domain?.split('.')[0] || site.id}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                      </div>
                    )}
                  </div>

                  {/* Create Draft Button */}
                  <button
                    onClick={handleCreateDraft}
                    disabled={!selectedVideo || !targetSiteId}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-neutral-700 disabled:to-neutral-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all shadow-lg shadow-red-500/20 disabled:shadow-none"
                  >
                    <Sparkles className="w-4 h-4" />
                    Create Draft
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
