'use client'

import { useState } from 'react'
import { 
  Play,
  Sparkles,
  Target,
  Image as ImageIcon,
  Video,
  GripVertical,
  Check,
  X,
  AlertCircle,
  Loader2,
  RefreshCw,
  Volume2,
  VolumeX,
  Maximize,
  ExternalLink,
  Wand2,
  FileText,
  BookOpen,
  Send
} from 'lucide-react'

// Mock Video Screenshots
const MOCK_SCREENSHOTS = [
  { id: 1, time: '0:12', url: '/api/placeholder/160/90', label: 'Opening Shot' },
  { id: 2, time: '0:45', url: '/api/placeholder/160/90', label: 'Intro Scene' },
  { id: 3, time: '1:23', url: '/api/placeholder/160/90', label: 'Main Topic' },
  { id: 4, time: '2:15', url: '/api/placeholder/160/90', label: 'Key Point 1' },
  { id: 5, time: '3:08', url: '/api/placeholder/160/90', label: 'Demonstration' },
  { id: 6, time: '4:32', url: '/api/placeholder/160/90', label: 'Key Point 2' },
  { id: 7, time: '5:18', url: '/api/placeholder/160/90', label: 'Example' },
  { id: 8, time: '6:45', url: '/api/placeholder/160/90', label: 'Key Point 3' },
  { id: 9, time: '8:02', url: '/api/placeholder/160/90', label: 'Summary' },
  { id: 10, time: '9:30', url: '/api/placeholder/160/90', label: 'Closing' },
]

// Tab Button Component
const TabButton = ({ active, onClick, children, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors
      ${active 
        ? 'bg-red-500 text-white' 
        : 'text-neutral-600 hover:bg-neutral-100'
      }
    `}
  >
    <Icon className="w-3.5 h-3.5" />
    {children}
  </button>
)

// SEO Traffic Light Item
const SeoItem = ({ status, message }) => {
  const configs = {
    good: { icon: Check, color: 'text-emerald-600 bg-emerald-50', emoji: '🟢' },
    warning: { icon: AlertCircle, color: 'text-amber-600 bg-amber-50', emoji: '🟡' },
    error: { icon: X, color: 'text-red-600 bg-red-50', emoji: '🔴' },
  }
  const config = configs[status] || configs.warning
  
  return (
    <div className={`flex items-start gap-2 px-3 py-2 rounded-lg ${config.color}`}>
      <span className="text-sm mt-0.5">{config.emoji}</span>
      <p className="text-xs leading-relaxed">{message}</p>
    </div>
  )
}

// Circular Progress Component
const CircularProgress = ({ value, size = 96, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference
  
  // Color based on value
  const getColor = (val) => {
    if (val >= 80) return '#10b981' // emerald
    if (val >= 60) return '#f59e0b' // amber
    return '#ef4444' // red
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e5e5"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(value)}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-neutral-900">{value}</span>
      </div>
    </div>
  )
}

// Media Source Tab Content
const MediaSourceTab = ({ videoUrl, screenshots = MOCK_SCREENSHOTS, onInsertImage }) => {
  const [muted, setMuted] = useState(true)
  const [draggedItem, setDraggedItem] = useState(null)

  const handleDragStart = (e, screenshot) => {
    setDraggedItem(screenshot)
    e.dataTransfer.setData('text/plain', JSON.stringify(screenshot))
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  return (
    <div className="space-y-4">
      {/* Video Player (Mini) */}
      <div className="relative aspect-video bg-neutral-900 rounded-lg overflow-hidden">
        {videoUrl ? (
          <iframe
            src={`${videoUrl}?autoplay=0&mute=1`}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Video className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
              <p className="text-xs text-neutral-500">No video loaded</p>
            </div>
          </div>
        )}
        
        {/* Video Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
          <button 
            onClick={() => setMuted(!muted)}
            className="p-1 text-white/80 hover:text-white transition-colors"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button className="p-1 text-white/80 hover:text-white transition-colors">
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Smart Gallery */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
            Smart Gallery
          </h4>
          <button className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1">
            <RefreshCw className="w-3 h-3" />
            Refresh
          </button>
        </div>
        <p className="text-[10px] text-neutral-500 mb-3">
          Drag screenshots directly into your editor
        </p>
        
        {/* Screenshot Grid */}
        <div className="grid grid-cols-2 gap-2">
          {screenshots.map((screenshot) => (
            <div
              key={screenshot.id}
              draggable
              onDragStart={(e) => handleDragStart(e, screenshot)}
              onDragEnd={handleDragEnd}
              className={`
                relative group cursor-grab active:cursor-grabbing
                rounded-lg overflow-hidden border-2 transition-all
                ${draggedItem?.id === screenshot.id 
                  ? 'border-red-500 opacity-50' 
                  : 'border-transparent hover:border-red-300'
                }
              `}
            >
              {/* Screenshot Image */}
              <div className="aspect-video bg-neutral-200 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-neutral-400" />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="text-[10px] text-white/80">{screenshot.time}</p>
                  <p className="text-xs text-white font-medium truncate">{screenshot.label}</p>
                </div>
              </div>
              
              {/* Drag Handle */}
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="w-4 h-4 text-white drop-shadow-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// SEO Radar Tab Content
const SeoRadarTab = ({ score = 72, items = [] }) => {
  const defaultItems = [
    { status: 'good', message: 'Title length is optimal (58 characters)' },
    { status: 'good', message: 'Keyword "Inception" used 4 times' },
    { status: 'good', message: 'Meta description is set' },
    { status: 'warning', message: 'Add at least 2 more images' },
    { status: 'warning', message: 'Consider adding internal links' },
    { status: 'error', message: 'Missing alt text on 1 image' },
  ]

  const seoItems = items.length > 0 ? items : defaultItems

  return (
    <div className="space-y-6">
      {/* SEO Score Gauge */}
      <div className="flex flex-col items-center py-4">
        <CircularProgress value={score} size={120} strokeWidth={10} />
        <p className="text-sm font-semibold text-neutral-700 mt-3">SEO Score</p>
        <p className="text-xs text-neutral-500">
          {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Work'}
        </p>
      </div>

      {/* Traffic Light System */}
      <div>
        <h4 className="text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-3">
          Optimization Checklist
        </h4>
        <div className="space-y-2">
          {seoItems.map((item, index) => (
            <SeoItem key={index} status={item.status} message={item.message} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="pt-4 border-t border-neutral-200">
        <button className="w-full btn-secondary py-2.5 text-sm justify-center">
          <RefreshCw className="w-4 h-4" />
          Re-analyze Content
        </button>
      </div>
    </div>
  )
}

// AI Assistant Tab Content
const AiAssistantTab = ({ onRewrite, onGenerateIntro }) => {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState('')

  const handleSubmit = () => {
    if (!prompt.trim()) return
    setIsLoading(true)
    
    // Simulate AI response
    setTimeout(() => {
      setResponse(`Here's my suggestion based on your request:\n\n"${prompt}"\n\nI've analyzed the context and recommend:\n• Using more descriptive language\n• Adding transitional phrases\n• Strengthening the hook\n\nWould you like me to apply these changes?`)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      {/* AI Header */}
      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100">
        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-neutral-900">AI Copilot</h3>
          <p className="text-[10px] text-neutral-500">Powered by GPT-4</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <button 
          onClick={() => onRewrite?.()}
          className="w-full flex items-center gap-3 px-3 py-2.5 bg-white border border-neutral-200 rounded-lg hover:border-red-300 hover:bg-red-50/50 transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
            <Wand2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-neutral-900">Rewrite Selection</p>
            <p className="text-[10px] text-neutral-500">Improve selected text</p>
          </div>
        </button>
        
        <button 
          onClick={() => onGenerateIntro?.()}
          className="w-full flex items-center gap-3 px-3 py-2.5 bg-white border border-neutral-200 rounded-lg hover:border-red-300 hover:bg-red-50/50 transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-neutral-900">Generate Intro</p>
            <p className="text-[10px] text-neutral-500">Create a compelling opening</p>
          </div>
        </button>

        <button 
          className="w-full flex items-center gap-3 px-3 py-2.5 bg-white border border-neutral-200 rounded-lg hover:border-red-300 hover:bg-red-50/50 transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
            <BookOpen className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-neutral-900">Expand Section</p>
            <p className="text-[10px] text-neutral-500">Add more detail</p>
          </div>
        </button>
      </div>

      {/* Custom Prompt */}
      <div className="pt-4 border-t border-neutral-200">
        <h4 className="text-xs font-semibold text-neutral-700 mb-2">Custom Prompt</h4>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask AI to help with your writing..."
          className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none"
          rows={3}
        />
        <button 
          onClick={handleSubmit}
          disabled={!prompt.trim() || isLoading}
          className="mt-2 w-full btn-primary py-2.5 text-sm justify-center disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Thinking...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Ask AI
            </>
          )}
        </button>
      </div>

      {/* AI Response */}
      {response && (
        <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
          <div className="flex items-start gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-neutral-700 leading-relaxed whitespace-pre-line">
              {response}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-200">
            <button className="btn-primary py-1.5 px-3 text-xs">
              Apply
            </button>
            <button className="btn-secondary py-1.5 px-3 text-xs">
              Regenerate
            </button>
            <button 
              onClick={() => setResponse('')}
              className="btn-ghost py-1.5 px-3 text-xs ml-auto"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Main MediaSidebar Component
export default function MediaSidebar({ 
  videoUrl,
  screenshots,
  seoScore,
  seoItems,
  onRewriteSelection,
  onGenerateIntro,
  onInsertImage,
  defaultTab = 'media'
}) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <div className="h-full flex flex-col">
      {/* Tab Bar */}
      <div className="flex items-center gap-1 p-2 border-b border-neutral-200 bg-neutral-50">
        <TabButton 
          active={activeTab === 'media'} 
          onClick={() => setActiveTab('media')}
          icon={ImageIcon}
        >
          Media
        </TabButton>
        <TabButton 
          active={activeTab === 'seo'} 
          onClick={() => setActiveTab('seo')}
          icon={Target}
        >
          SEO
        </TabButton>
        <TabButton 
          active={activeTab === 'ai'} 
          onClick={() => setActiveTab('ai')}
          icon={Sparkles}
        >
          AI
        </TabButton>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'media' && (
          <MediaSourceTab 
            videoUrl={videoUrl}
            screenshots={screenshots}
            onInsertImage={onInsertImage}
          />
        )}
        {activeTab === 'seo' && (
          <SeoRadarTab 
            score={seoScore}
            items={seoItems}
          />
        )}
        {activeTab === 'ai' && (
          <AiAssistantTab 
            onRewrite={onRewriteSelection}
            onGenerateIntro={onGenerateIntro}
          />
        )}
      </div>
    </div>
  )
}
