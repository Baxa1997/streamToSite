'use client'

import { useState, useEffect } from 'react'
import { Link2, Sparkles, Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'


const motion = {
  div: dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false }),
}

export default function UrlInputSection({ onUrlDetected, onGenerate }) {
  const [url, setUrl] = useState('')
  const [isValidUrl, setIsValidUrl] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/

  useEffect(() => {
    if (url && youtubeRegex.test(url)) {
      setIsValidUrl(true)
      
      setIsLoading(true)
      
      const timer = setTimeout(() => {
        setIsLoading(false)
        
        const videoId = extractVideoId(url)
        
        if (onUrlDetected) {
          onUrlDetected({
            url,
            videoId,
            thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            title: generateMockTitle(url),
          })
        }
      }, 1500)

      return () => clearTimeout(timer)
    } else {
      setIsValidUrl(false)
    }
  }, [url])

  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : 'dQw4w9WgXcQ' 
  }

  const generateMockTitle = (url) => {
    const titles = [
      'Analysis: The Hidden Meaning of Inception',
      'Breaking Down: The Dark Knight\'s Best Scenes',
      'Explained: Interstellar\'s Time Paradox',
      'Deep Dive: Oppenheimer\'s Historical Accuracy',
      'Review: Dune Part Two - A Masterpiece',
    ]
    return titles[Math.floor(Math.random() * titles.length)]
  }

  const handleGenerate = () => {
    if (onGenerate) {
      onGenerate()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">AI-Powered Generation</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
          Transform Any Video into a Blog Post
        </h2>
        <p className="text-text/60 text-lg">
          Paste a YouTube URL and watch the magic happen
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bento-card"
      >
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
              <Link2 className={`w-6 h-6 transition-colors ${isValidUrl ? 'text-green-400' : 'text-text/50'}`} />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className={`
                input w-full pl-14 pr-4 text-lg py-6 
                transition-all duration-300
                ${isValidUrl ? 'border-green-500/50 bg-green-500/5' : ''}
              `}
              disabled={isLoading}
            />
            
            {isValidUrl && !isLoading && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <div className="w-8 h-8 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </motion.div>
            )}
          </div>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <Loader2 className="w-5 h-5 text-primary animate-spin flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Analyzing video content...</p>
                  <div className="mt-2 h-1 bg-surface rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <button
            onClick={handleGenerate}
            disabled={!isValidUrl || isLoading}
            className="btn-primary w-full text-xl py-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 mr-3 inline animate-spin" />
                Generating Preview...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 mr-3 inline" />
                Generate Site
              </>
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-text/50">
              Supports YouTube, TikTok, and most video platforms
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 text-center"
      >
        <p className="text-xs text-text/40 mb-2">Try an example:</p>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setUrl('https://youtube.com/watch?v=dQw4w9WgXcQ')}
            className="text-xs px-3 py-1 rounded-full bg-surface hover:bg-surface/80 border border-border-color transition-colors"
          >
            Movie Analysis
          </button>
          <button
            onClick={() => setUrl('https://youtube.com/watch?v=YQHsXMglC9A')}
            className="text-xs px-3 py-1 rounded-full bg-surface hover:bg-surface/80 border border-border-color transition-colors"
          >
            Tech Review
          </button>
          <button
            onClick={() => setUrl('https://youtube.com/watch?v=jNQXAC9IVRw')}
            className="text-xs px-3 py-1 rounded-full bg-surface hover:bg-surface/80 border border-border-color transition-colors"
          >
            News Breakdown
          </button>
        </div>
      </motion.div>
    </div>
  )
}
