'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { 
  Plus,
  Sparkles,
  Search,
  Filter,
  Grid3X3,
  List,
  Clock,
  Eye,
  Edit3,
  Trash2,
  MoreHorizontal,
  CheckCircle2,
  FileEdit,
  Loader2,
  ExternalLink,
  FileText,
  Link2,
  MousePointer,
  DollarSign,
  BarChart3,
  User,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'

// Mock content data with expanded fields
const contentData = [
  {
    id: 1,
    title: 'Exploring the iPhone 16e: A Comprehensive Review of Features and Performance',
    thumbnailEmoji: '📱',
    status: 'published',
    site: 'Tech Pulse',
    author: 'Sm Onil',
    date: '12 Mar 2025',
    lastEdited: '1 hour ago',
    excerpt: 'As I unwrapped my new iPhone 16e, I felt the thrill of anticipation. This phone promised a sleek design and robust features, but would it meet my expectations? After a week of testing, I\'ve compiled my thoughts to share what it\'s really like to use this device daily. Join me on this exploration as we delve into every nook and cranny of the iPhone 16e, from its minimalist design to its mysterious new...',
    words: 1973,
    links: 4,
    clicks: 0,
    earnings: 0,
    cr: '0.00%',
  },
  {
    id: 2,
    title: 'Unleashing Creativity: The Best AI Writer Tools in 2023',
    thumbnailEmoji: '🤖',
    status: 'published',
    site: 'Tech Pulse',
    author: 'Sm Onil',
    date: '04 Mar 2025',
    lastEdited: '12 minutes ago',
    excerpt: 'As a writer, I\'ve often faced the daunting blank page, feeling paralyzed by the sheer volume of possibilities. It was during one of my creative slumps that I stumbled upon AI writing tools that promised not just to alleviate the pressure but also to aid my creativity. In this post, let\'s delve into how these tools can be game changers for writers in 2023 and beyond! The Transformative Power of AI Writing Too...',
    words: 2084,
    links: 6,
    clicks: 0,
    earnings: 0,
    cr: '0.00%',
  },
  {
    id: 3,
    title: 'The Dark Knight - Why It\'s Still Relevant in 2026',
    thumbnailEmoji: '🦇',
    status: 'draft',
    site: 'Movie King',
    author: 'Sm Onil',
    date: '03 Feb 2025',
    lastEdited: '2 days ago',
    excerpt: 'Examining the cultural impact of Heath Ledger\'s Joker and its relevance today. The Dark Knight continues to resonate with audiences nearly two decades after its release, and in this exploration, we uncover why...',
    words: 1856,
    links: 3,
    clicks: 0,
    earnings: 0,
    cr: '0.00%',
  },
  {
    id: 4,
    title: '10 Must-Have Gadgets for Kids: Essential Tools for the Modern Parent',
    thumbnailEmoji: '🧸',
    status: 'published',
    site: 'Tech Pulse',
    author: 'Sm Onil',
    date: '13 Feb 2025',
    lastEdited: 'last month',
    excerpt: 'As a parent, I often find myself amidst a whirlwind of tech promising to be the next big learning tool. I remember the day my child received a coding robot for their birthday; it not only entertained them for hours but also sparked a curiosity that I\'d never anticipated. If you\'re like me, standing at the crossroads of overwhelming options, then this guide to the...',
    words: 2017,
    links: 0,
    clicks: 0,
    earnings: 0,
    cr: '0.00%',
  },
  {
    id: 5,
    title: 'Interstellar Science Breakdown - Real Physics Explained',
    thumbnailEmoji: '🌌',
    status: 'processing',
    site: 'Movie King',
    author: 'Sm Onil',
    date: '01 Feb 2025',
    lastEdited: '3 days ago',
    excerpt: 'The real physics behind the black hole, time dilation, and the tesseract. Christopher Nolan consulted with Nobel Prize-winning physicist Kip Thorne to ensure the science in Interstellar was as accurate as possible...',
    words: 2891,
    links: 8,
    clicks: 0,
    earnings: 0,
    cr: '0.00%',
  },
]

// Status Badge Component (matching reference image style)
const StatusBadge = ({ status }) => {
  const configs = {
    published: { 
      bg: 'bg-orange-500', 
      text: 'text-white', 
      label: 'PUBLISHED', 
      icon: CheckCircle2 
    },
    draft: { 
      bg: 'bg-neutral-400', 
      text: 'text-white', 
      label: 'DRAFT', 
      icon: FileEdit 
    },
    processing: { 
      bg: 'bg-amber-500', 
      text: 'text-white', 
      label: 'PROCESSING', 
      icon: Loader2 
    },
  }
  
  const config = configs[status] || configs.draft
  const Icon = config.icon
  
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${config.bg} ${config.text}`}>
      <Icon className={`w-3 h-3 ${status === 'processing' ? 'animate-spin' : ''}`} />
      {config.label}
    </span>
  )
}

// Post Card Component (matching reference image)
const PostCard = ({ content }) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4 hover:shadow-lg transition-all duration-200">
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="w-40 h-24 rounded-lg bg-neutral-100 flex-shrink-0 overflow-hidden flex items-center justify-center">
          <span className="text-4xl">{content.thumbnailEmoji}</span>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="font-semibold text-neutral-900 text-base mb-2 line-clamp-1">
            {content.title}
          </h3>
          
          {/* Author & Date Row */}
          <div className="flex items-center gap-4 text-xs text-neutral-500 mb-2">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {content.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {content.date}
            </span>
            <span className="text-neutral-400">
              · Last edited {content.lastEdited}
            </span>
          </div>
          
          {/* Excerpt */}
          <p className="text-xs text-neutral-600 line-clamp-2 mb-3">
            {content.excerpt}
          </p>
          
          {/* Stats Row */}
          <div className="flex items-center gap-4 text-xs mb-3">
            <span className="flex items-center gap-1 text-neutral-600">
              <FileText className="w-3 h-3 text-blue-500" />
              <span className="text-blue-500 font-medium">WORDS:</span>
              <span className="text-neutral-800 font-medium">{content.words.toLocaleString()}</span>
            </span>
            <span className="flex items-center gap-1 text-neutral-600">
              <Link2 className="w-3 h-3 text-purple-500" />
              <span className="text-purple-500 font-medium">LINKS:</span>
              <span className="text-neutral-800 font-medium">{content.links}</span>
            </span>
            <span className="flex items-center gap-1 text-neutral-600">
              <MousePointer className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-500 font-medium">CLICKS:</span>
              <span className="text-neutral-800 font-medium">{content.clicks}</span>
            </span>
            <span className="flex items-center gap-1 text-neutral-600">
              <DollarSign className="w-3 h-3 text-green-500" />
              <span className="text-green-500 font-medium">EARNINGS:</span>
              <span className="text-neutral-800 font-medium">${content.earnings}</span>
            </span>
            <span className="flex items-center gap-1 text-neutral-600">
              <BarChart3 className="w-3 h-3 text-orange-500" />
              <span className="text-orange-500 font-medium">CR:</span>
              <span className="text-neutral-800 font-medium">{content.cr}</span>
            </span>
          </div>
          
          {/* Status Badge */}
          <StatusBadge status={content.status} />
        </div>
        
        {/* Actions */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          <Link 
            href={`/dashboard/editor/${content.id}`}
            className="px-4 py-2 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors border border-neutral-200"
          >
            View Details
          </Link>
          <Link 
            href={`/dashboard/editor/${content.id}`}
            className="px-4 py-2 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors border border-neutral-200"
          >
            Edit Blog
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function StudioPage() {
  const [viewMode, setViewMode] = useState('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  
  // Filter content
  const filteredContent = contentData.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || content.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Content Studio
            </h1>
            <p className="text-neutral-500 mt-1">
              Manage and create your blog posts
            </p>
          </div>
          <Link href="/dashboard/create" className="btn-primary">
            <Plus className="w-4 h-4" />
            Create Content
          </Link>
        </div>

        {/* Tabs Navigation */}
        <div className="flex items-center gap-6 border-b border-neutral-200 pb-1">
          <button className="px-1 py-2 text-sm font-medium text-orange-600 border-b-2 border-orange-500">
            All Blogs
          </button>
          <button className="px-1 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-700">
            Subscribers
          </button>
          <button className="px-1 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-700">
            Theme
          </button>
          <button className="px-1 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-700">
            Settings
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors">
              All Blogs
            </button>
          </div>
          
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white text-neutral-700 text-sm border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            <Plus className="w-4 h-4" />
            New Category
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="card p-4">
            <p className="text-2xl font-bold text-neutral-900">{contentData.length}</p>
            <p className="text-xs text-neutral-500">Total Posts</p>
          </div>
          <div className="card p-4">
            <p className="text-2xl font-bold text-emerald-600">
              {contentData.filter(c => c.status === 'published').length}
            </p>
            <p className="text-xs text-neutral-500">Published</p>
          </div>
          <div className="card p-4">
            <p className="text-2xl font-bold text-neutral-600">
              {contentData.filter(c => c.status === 'draft').length}
            </p>
            <p className="text-xs text-neutral-500">Drafts</p>
          </div>
          <div className="card p-4">
            <p className="text-2xl font-bold text-amber-600">
              {contentData.filter(c => c.status === 'processing').length}
            </p>
            <p className="text-xs text-neutral-500">Processing</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>
          
          {/* Filter */}
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input py-2.5"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="processing">Processing</option>
            </select>
            
            {/* View Mode Toggle */}
            <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 ${viewMode === 'grid' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-50'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 ${viewMode === 'list' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-50'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content List */}
        {filteredContent.length > 0 ? (
          <div className="space-y-4">
            {filteredContent.map((content) => (
              <PostCard key={content.id} content={content} />
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center">
            <Sparkles className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">No content found</h3>
            <p className="text-neutral-500 mb-6">
              {searchQuery ? 'Try adjusting your search or filters' : 'Start creating your first blog post'}
            </p>
            <Link href="/dashboard/create" className="btn-primary">
              <Plus className="w-4 h-4" />
              Create Content
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
