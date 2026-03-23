'use client'

import DashboardLayout from '@/components/DashboardLayout'
import { 
  Youtube, 
  FileAudio, 
  Link as LinkIcon, 
  ArrowRight, 
  Loader2, 
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Play,
  Clock,
  User,
  Eye
} from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// Source Type Selection Cards
const sourceTypes = [
  {
    id: 'video',
    title: 'From YouTube / TikTok',
    description: 'Paste a video URL and we\'ll transform it into a fully SEO-optimized blog post',
    icon: Youtube,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    badge: 'Most Popular',
    badgeColor: 'bg-red-500',
  },
  {
    id: 'audio',
    title: 'From Audio / File',
    description: 'Upload an audio file, podcast episode, or document to convert',
    icon: FileAudio,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    badge: null,
    badgeColor: null,
  },
]

// Detection states
const DetectionStates = {
  IDLE: 'idle',
  DETECTING: 'detecting',
  FOUND: 'found',
  ERROR: 'error',
}

// Mock video data for demo
const mockVideoData = {
  title: 'The Future of AI in 2026 - Everything You Need to Know',
  channel: 'Tech Explained',
  duration: '14:32',
  views: '1.2M views',
  thumbnail: '🎬',
}

export default function CreatePage() {
  const [step, setStep] = useState(1)
  const [sourceType, setSourceType] = useState(null)
  const [url, setUrl] = useState('')
  const [detectionState, setDetectionState] = useState(DetectionStates.IDLE)
  const [videoData, setVideoData] = useState(null)

  // Auto-detect when URL changes
  useEffect(() => {
    if (!url) {
      setDetectionState(DetectionStates.IDLE)
      setVideoData(null)
      return
    }

    // Check if URL looks valid
    const isValidUrl = url.includes('youtube.com') || 
                       url.includes('youtu.be') || 
                       url.includes('tiktok.com')
    
    if (isValidUrl) {
      setDetectionState(DetectionStates.DETECTING)
      
      // Simulate API call
      const timer = setTimeout(() => {
        setDetectionState(DetectionStates.FOUND)
        setVideoData(mockVideoData)
      }, 1500)
      
      return () => clearTimeout(timer)
    }
  }, [url])

  const handleSourceSelect = (type) => {
    setSourceType(type)
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
    setSourceType(null)
    setUrl('')
    setDetectionState(DetectionStates.IDLE)
    setVideoData(null)
  }

  const handleGenerate = () => {
    // In real app, this would trigger the AI generation
    window.location.href = '/dashboard/editor/new'
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          {step > 1 && (
            <button 
              onClick={handleBack}
              className="btn-ghost mb-4 -ml-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            {step === 1 ? 'Create New Content' : 'Enter Content Source'}
          </h1>
          <p className="text-neutral-500 mt-1">
            {step === 1 
              ? 'Choose how you want to create your blog post'
              : 'Paste your video URL and we\'ll handle the rest'
            }
          </p>
        </div>

        {/* Step 1: Source Selection */}
        {step === 1 && (
          <div className="grid md:grid-cols-2 gap-6">
            {sourceTypes.map((source) => {
              const Icon = source.icon
              
              return (
                <button
                  key={source.id}
                  onClick={() => handleSourceSelect(source.id)}
                  className="card-interactive p-8 text-left relative group"
                >
                  {source.badge && (
                    <span className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-medium text-white ${source.badgeColor}`}>
                      {source.badge}
                    </span>
                  )}
                  
                  <div className={`w-16 h-16 rounded-2xl ${source.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 ${source.iconColor}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {source.title}
                  </h3>
                  <p className="text-neutral-500">
                    {source.description}
                  </p>
                  
                  <div className="mt-6 flex items-center text-red-500 font-medium">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* Step 2: URL Input */}
        {step === 2 && sourceType === 'video' && (
          <div className="space-y-6">
            {/* URL Input Card */}
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <LinkIcon className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-neutral-900">Video URL</h2>
                  <p className="text-sm text-neutral-500">Works with YouTube, TikTok, and more</p>
                </div>
              </div>

              <div className="relative">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="input-lg pr-12"
                  autoFocus
                />
                
                {/* Detection Status Indicator */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {detectionState === DetectionStates.DETECTING && (
                    <Loader2 className="w-5 h-5 text-red-500 animate-spin" />
                  )}
                  {detectionState === DetectionStates.FOUND && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  )}
                </div>
              </div>

              {/* Detection Status Message */}
              <div className="mt-3 h-5">
                {detectionState === DetectionStates.DETECTING && (
                  <p className="text-sm text-neutral-500 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Searching for video...
                  </p>
                )}
                {detectionState === DetectionStates.FOUND && (
                  <p className="text-sm text-emerald-600 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Video found! Ready to generate.
                  </p>
                )}
              </div>
            </div>

            {/* Video Preview Card */}
            {videoData && detectionState === DetectionStates.FOUND && (
              <div className="card overflow-hidden animate-fade-in">
                <div className="flex flex-col sm:flex-row">
                  {/* Thumbnail */}
                  <div className="sm:w-64 h-36 sm:h-auto bg-neutral-900 flex items-center justify-center relative">
                    <span className="text-6xl">{videoData.thumbnail}</span>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-5 h-5 text-neutral-900 ml-0.5" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 p-5">
                    <h3 className="font-semibold text-neutral-900 text-lg mb-2">
                      {videoData.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                      <span className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        {videoData.channel}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {videoData.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        {videoData.views}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={detectionState !== DetectionStates.FOUND}
              className={`
                w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3
                transition-all duration-300
                ${detectionState === DetectionStates.FOUND
                  ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }
              `}
            >
              <Sparkles className="w-5 h-5" />
              Generate Blog Post
            </button>

            {/* Tips */}
            <div className="bg-neutral-100 rounded-xl p-5">
              <h3 className="font-semibold text-neutral-900 mb-3">Tips for best results:</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Choose videos with clear audio for accurate transcription</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Longer videos (10+ minutes) generate more comprehensive articles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Educational and review content converts best for SEO</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Step 2: Audio Upload (Simplified) */}
        {step === 2 && sourceType === 'audio' && (
          <div className="card p-8">
            <div className="empty-state py-16">
              <FileAudio className="w-12 h-12 text-neutral-400 mb-4" />
              <h3 className="empty-state-title">Upload Audio or Document</h3>
              <p className="empty-state-description mb-6">
                Drag and drop your file here, or click to browse
              </p>
              <button className="btn-secondary">
                Choose File
              </button>
              <p className="text-xs text-neutral-400 mt-4">
                Supports MP3, WAV, M4A, PDF, and DOCX files
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
