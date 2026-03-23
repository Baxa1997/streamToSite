'use client'

import { useState, useEffect } from 'react'
import { 
  Image as ImageIcon,
  Link2,
  Calendar,
  User,
  Hash,
  ChevronRight,
  Upload,
  ExternalLink,
  X
} from 'lucide-react'

// Cover Image Component
const CoverImage = ({ src, onChangeCover }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative aspect-video bg-neutral-100 rounded-lg overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onChangeCover}
    >
      {src ? (
        <img src={src} alt="Cover" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="w-8 h-8 text-neutral-400 mx-auto mb-1" />
            <p className="text-xs text-neutral-500">Add cover image</p>
          </div>
        </div>
      )}
      
      {/* Hover Overlay */}
      <div 
        className={`
          absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-lg">
          <Upload className="w-4 h-4 text-neutral-700" />
          <span className="text-sm font-medium text-neutral-700">Change Cover</span>
        </div>
      </div>
    </div>
  )
}

// Table of Contents Item
const TocItem = ({ level, text, active, onClick }) => {
  const paddingLeft = level === 2 ? 'pl-0' : 'pl-4'
  
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left py-1.5 px-2 rounded text-xs transition-colors flex items-center gap-2
        ${paddingLeft}
        ${active 
          ? 'bg-red-50 text-red-700 font-medium' 
          : 'text-neutral-600 hover:bg-neutral-100'
        }
      `}
    >
      <ChevronRight className={`w-3 h-3 flex-shrink-0 ${active ? 'text-red-500' : 'text-neutral-400'}`} />
      <span className="truncate">{text}</span>
    </button>
  )
}

// Cover Image Modal
const CoverImageModal = ({ isOpen, onClose, onSelect }) => {
  const [tab, setTab] = useState('unsplash')
  const [searchQuery, setSearchQuery] = useState('')

  if (!isOpen) return null

  const unsplashImages = [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=225&fit=crop',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=225&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=225&fit=crop',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=225&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop',
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-[560px] max-h-[80vh] overflow-hidden animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900">Choose Cover Image</h3>
          <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-2 border-b border-neutral-200 bg-neutral-50">
          {['unsplash', 'upload', 'url'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                tab === t ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-4">
          {tab === 'unsplash' && (
            <div className="space-y-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Unsplash..."
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
              <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                {unsplashImages.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onSelect(url)
                      onClose()
                    }}
                    className="aspect-video bg-neutral-200 rounded-lg overflow-hidden hover:ring-2 hover:ring-red-500 transition-all"
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {tab === 'upload' && (
            <div className="border-2 border-dashed border-neutral-300 rounded-xl p-12 text-center hover:border-red-400 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <p className="text-sm text-neutral-600 mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-neutral-400">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}

          {tab === 'url' && (
            <div className="space-y-3">
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
              <button 
                onClick={onClose}
                className="w-full btn-primary py-2.5 text-sm justify-center"
              >
                Add Image
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Main Left Sidebar Component
export default function OutlineSidebar({
  coverImage,
  onCoverChange,
  tableOfContents = [],
  activeTocItem,
  onTocClick,
  slug,
  onSlugChange,
  date,
  onDateChange,
  author,
  onAuthorChange,
  tags = [],
  onTagsChange
}) {
  const [showCoverModal, setShowCoverModal] = useState(false)
  const [newTag, setNewTag] = useState('')

  // Generate default TOC if not provided
  const defaultToc = [
    { level: 2, text: 'The Spinning Top: A Red Herring' },
    { level: 2, text: 'The Wedding Ring Theory' },
    { level: 3, text: 'Visual Evidence' },
    { level: 3, text: 'Nolan\'s Confirmation' },
    { level: 2, text: 'Why This Matters' },
    { level: 2, text: 'Related Films' },
  ]

  const tocItems = tableOfContents.length > 0 ? tableOfContents : defaultToc

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      onTagsChange?.([...tags, newTag])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    onTagsChange?.(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="space-y-5 p-4">
      {/* Cover Image */}
      <div>
        <label className="text-xs font-semibold text-neutral-700 mb-2 block uppercase tracking-wider">
          Cover Image
        </label>
        <CoverImage 
          src={coverImage}
          onChangeCover={() => setShowCoverModal(true)}
        />
      </div>

      {/* Table of Contents */}
      <div>
        <label className="text-xs font-semibold text-neutral-700 mb-2 block uppercase tracking-wider">
          Table of Contents
        </label>
        <div className="space-y-0.5 max-h-48 overflow-y-auto">
          {tocItems.map((item, index) => (
            <TocItem
              key={index}
              level={item.level}
              text={item.text}
              active={activeTocItem === index}
              onClick={() => onTocClick?.(index)}
            />
          ))}
        </div>
      </div>

      {/* Publish Settings */}
      <div className="pt-4 border-t border-neutral-200">
        <label className="text-xs font-semibold text-neutral-700 mb-3 block uppercase tracking-wider">
          Publish Settings
        </label>
        
        <div className="space-y-3">
          {/* Slug */}
          <div>
            <label className="text-[10px] text-neutral-500 mb-1 flex items-center gap-1">
              <Link2 className="w-3 h-3" />
              <span>URL Slug</span>
            </label>
            <input
              type="text"
              value={slug || ''}
              onChange={(e) => onSlugChange?.(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
              className="w-full px-2.5 py-1.5 text-xs font-mono bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              placeholder="post-url-slug"
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-[10px] text-neutral-500 mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Publish Date</span>
            </label>
            <input
              type="date"
              value={date || ''}
              onChange={(e) => onDateChange?.(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            />
          </div>

          {/* Author */}
          <div>
            <label className="text-[10px] text-neutral-500 mb-1 flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>Author</span>
            </label>
            <input
              type="text"
              value={author || ''}
              onChange={(e) => onAuthorChange?.(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              placeholder="Author name"
            />
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="pt-4 border-t border-neutral-200">
        <label className="text-xs font-semibold text-neutral-700 mb-2 block uppercase tracking-wider flex items-center gap-1">
          <Hash className="w-3 h-3" />
          Tags
        </label>
        
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 border border-red-200 rounded-full text-xs text-red-700"
            >
              <span>{tag}</span>
              <button
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-red-500 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            className="flex-1 px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            placeholder="Add tag..."
          />
          <button
            onClick={handleAddTag}
            className="px-3 py-1.5 text-xs font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Cover Image Modal */}
      <CoverImageModal
        isOpen={showCoverModal}
        onClose={() => setShowCoverModal(false)}
        onSelect={(url) => onCoverChange?.(url)}
      />
    </div>
  )
}
