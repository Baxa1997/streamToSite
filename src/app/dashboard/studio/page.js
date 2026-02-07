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
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

// Mock content data
const contentData = [
  {
    id: 1,
    title: 'Inception Ending Explained - Mind-Bending Analysis',
    thumbnail: '🎬',
    status: 'published',
    site: 'Movie King',
    views: '12,453',
    date: '2024-02-05',
    excerpt: 'A deep dive into Christopher Nolan\'s masterpiece and what the spinning top really means...'
  },
  {
    id: 2,
    title: 'Breaking: New AI Regulations Announced by EU',
    thumbnail: '🤖',
    status: 'published',
    site: 'Tech Pulse',
    views: '8,921',
    date: '2024-02-04',
    excerpt: 'The European Union has announced sweeping new regulations for artificial intelligence...'
  },
  {
    id: 3,
    title: 'The Dark Knight - Why It\'s Still Relevant in 2026',
    thumbnail: '🦇',
    status: 'draft',
    site: 'Movie King',
    views: '-',
    date: '2024-02-03',
    excerpt: 'Examining the cultural impact of Heath Ledger\'s Joker and its relevance today...'
  },
  {
    id: 4,
    title: 'Tech News Roundup - January 2026 Edition',
    thumbnail: '📱',
    status: 'processing',
    site: 'Tech Pulse',
    views: '-',
    date: '2024-02-02',
    excerpt: 'All the biggest tech announcements from January 2026 in one comprehensive roundup...'
  },
  {
    id: 5,
    title: 'Interstellar Science Breakdown',
    thumbnail: '🌌',
    status: 'published',
    site: 'Movie King',
    views: '22,891',
    date: '2024-02-01',
    excerpt: 'The real physics behind the black hole, time dilation, and the tesseract...'
  },
]

// Status Badge Component
const StatusBadge = ({ status }) => {
  const configs = {
    published: { class: 'badge-success', label: 'Published', icon: CheckCircle2 },
    draft: { class: 'badge-neutral', label: 'Draft', icon: FileEdit },
    processing: { class: 'badge-warning', label: 'Processing', icon: Loader2 },
  }
  
  const config = configs[status] || configs.draft
  const Icon = config.icon
  
  return (
    <span className={config.class}>
      <Icon className={`w-3 h-3 ${status === 'processing' ? 'animate-spin' : ''}`} />
      {config.label}
    </span>
  )
}

// Content Card Component
const ContentCard = ({ content }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  
  return (
    <div className="card hover:shadow-md transition-all duration-200 group">
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Thumbnail */}
          <div className="w-16 h-16 rounded-lg bg-neutral-100 flex items-center justify-center text-3xl flex-shrink-0">
            {content.thumbnail}
          </div>
          
          {/* Content Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-neutral-900 text-sm line-clamp-2">
                {content.title}
              </h3>
              <div className="relative">
                <button 
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="btn-icon w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
                
                {menuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-20">
                      <Link href={`/dashboard/editor/${content.id}`} className="w-full px-3 py-2 text-left text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit
                      </Link>
                      <button className="w-full px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2">
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
              {content.excerpt}
            </p>
            
            <div className="flex items-center gap-3 mt-3">
              <StatusBadge status={content.status} />
              <span className="text-xs text-neutral-400">{content.site}</span>
            </div>
          </div>
        </div>
        
        {/* Footer Stats */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100">
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {content.date}
            </span>
            {content.views !== '-' && (
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {content.views}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <Link 
              href={`/dashboard/editor/${content.id}`}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
            >
              <Edit3 className="w-3 h-3" />
              Edit
            </Link>
            {content.status === 'published' && (
              <a 
                href="#"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                View
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StudioPage() {
  const [viewMode, setViewMode] = useState('grid')
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

        {/* Content Grid */}
        {filteredContent.length > 0 ? (
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
            {filteredContent.map((content) => (
              <ContentCard key={content.id} content={content} />
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
