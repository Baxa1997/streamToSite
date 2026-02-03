'use client'

import { useState } from 'react'
import { Edit3, Send, Eye, DollarSign, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BlogPreviewCard({ data, onEdit, onPublish }) {
  const [title, setTitle] = useState(data?.title || 'Analysis: The Hidden Meaning of Inception')
  const [isEditingTitle, setIsEditingTitle] = useState(false)

  const thumbnail = data?.thumbnail || 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Eye className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold">Instant Preview</h3>
          <span className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded-full">
            Ready to Edit
          </span>
        </div>
        <p className="text-sm text-text/60">
          This is how your blog post will look
        </p>
      </div>

      {/* Mini Browser Window */}
      <div className="bento-card overflow-hidden">
        {/* Browser Chrome */}
        <div className="flex items-center space-x-2 px-4 py-3 bg-surface/50 border-b border-border-color">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="px-4 py-1 bg-background/50 rounded-full text-xs text-text/50 font-mono">
              {data?.url ? new URL(data.url).hostname : 'yoursite.streamtosite.com'}
            </div>
          </div>
        </div>

        {/* Blog Content Preview */}
        <div className="bg-background p-8">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="aspect-video rounded-xl overflow-hidden mb-6 border border-border-color"
          >
            <img
              src={thumbnail}
              alt="Blog post hero"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
              }}
            />
          </motion.div>

          {/* Title (Editable) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            {isEditingTitle ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                autoFocus
                className="w-full text-3xl sm:text-4xl font-bold bg-transparent border-b-2 border-primary focus:outline-none"
              />
            ) : (
              <h1
                onClick={() => setIsEditingTitle(true)}
                className="text-3xl sm:text-4xl font-bold cursor-pointer hover:text-primary transition-colors group"
              >
                {title}
                <Edit3 className="w-5 h-5 inline ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h1>
            )}
            <p className="text-sm text-text/50 mt-2">Click title to edit</p>
          </motion.div>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center space-x-4 text-sm text-text/60 mb-8 pb-6 border-b border-border-color"
          >
            <span>Movie Analysis</span>
            <span>•</span>
            <span>12 min read</span>
            <span>•</span>
            <span>Feb 3, 2026</span>
          </motion.div>

          {/* Body Content (Skeleton) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 mb-8"
          >
            {/* First Paragraph */}
            <div className="space-y-2">
              <div className="h-4 bg-text/10 rounded w-full" />
              <div className="h-4 bg-text/10 rounded w-[95%]" />
              <div className="h-4 bg-text/10 rounded w-[98%]" />
            </div>

            {/* Second Paragraph */}
            <div className="space-y-2">
              <div className="h-4 bg-text/10 rounded w-full" />
              <div className="h-4 bg-text/10 rounded w-[92%]" />
            </div>

            {/* Third Paragraph */}
            <div className="space-y-2">
              <div className="h-4 bg-text/10 rounded w-full" />
              <div className="h-4 bg-text/10 rounded w-[96%]" />
              <div className="h-4 bg-text/10 rounded w-[88%]" />
            </div>

            {/* Read More Fade */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
              <div className="space-y-2 opacity-30">
                <div className="h-4 bg-text/10 rounded w-full" />
                <div className="h-4 bg-text/10 rounded w-[90%]" />
              </div>
            </div>
          </motion.div>

          {/* Monetization Spot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="my-8 p-6 rounded-xl border-2 border-dashed border-yellow-500/30 bg-yellow-500/5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <p className="font-semibold text-yellow-400">Revenue Spot</p>
                  <p className="text-xs text-text/60">AdSense Banner / Affiliate Link</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-400">+$2-5 per click</p>
                <p className="text-xs text-text/50">Estimated earnings</p>
              </div>
            </div>
          </motion.div>

          {/* More Skeleton Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <div className="h-4 bg-text/10 rounded w-full" />
              <div className="h-4 bg-text/10 rounded w-[94%]" />
              <div className="h-4 bg-text/10 rounded w-[97%]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6"
      >
        <button
          onClick={onEdit}
          className="btn-secondary w-full sm:w-auto px-8 py-4 text-lg"
        >
          <Edit3 className="w-5 h-5 mr-2 inline" />
          Edit Full Post
        </button>
        <button
          onClick={onPublish}
          className="btn-primary w-full sm:w-auto px-8 py-4 text-lg relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary to-green-500"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative z-10 flex items-center">
            <Send className="w-5 h-5 mr-2 inline" />
            Publish Now
          </span>
        </button>
      </motion.div>

      {/* Stats Preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-6 grid grid-cols-3 gap-4"
      >
        <div className="glass rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-2xl font-bold text-primary">94</p>
          </div>
          <p className="text-xs text-text/60">SEO Score</p>
        </div>
        <div className="glass rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Eye className="w-4 h-4 text-blue-400" />
            <p className="text-2xl font-bold text-blue-400">2.5K</p>
          </div>
          <p className="text-xs text-text/60">Est. Monthly Views</p>
        </div>
        <div className="glass rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <DollarSign className="w-4 h-4 text-green-400" />
            <p className="text-2xl font-bold text-green-400">$120</p>
          </div>
          <p className="text-xs text-text/60">Est. Revenue</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
