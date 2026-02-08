'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import useAppStore from '@/store/useAppStore'
import { EditorLayout, TiptapEditor, MediaSidebar, OutlineSidebar } from '@/components/editor'
import { 
  Save, 
  Eye, 
  Send,
  ChevronLeft,
  FileText,
  CheckCircle2,
  Loader2,
  Clock,
  Globe,
  MoreVertical,
  Trash2,
  Copy,
  ExternalLink,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'

// Mock video frames for capture
const MOCK_FRAMES = [
  'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=450&fit=crop',
]

// Mock screenshots for media sidebar
const MOCK_SCREENSHOTS = [
  { id: 1, time: '0:12', url: MOCK_FRAMES[0], label: 'Opening Shot' },
  { id: 2, time: '0:45', url: MOCK_FRAMES[1], label: 'Intro Scene' },
  { id: 3, time: '1:23', url: MOCK_FRAMES[2], label: 'Main Topic' },
  { id: 4, time: '2:15', url: MOCK_FRAMES[3], label: 'Key Point 1' },
  { id: 5, time: '3:08', url: MOCK_FRAMES[4], label: 'Demonstration' },
  { id: 6, time: '4:32', url: MOCK_FRAMES[5], label: 'Key Point 2' },
]

export default function EditorPage() {
  const params = useParams()
  const router = useRouter()
  const { posts, sites, updatePost, publishPost, addPost, generateMockPost, addToast, user } = useAppStore()
  const editorRef = useRef(null)

  const [post, setPost] = useState(null)
  const [site, setSite] = useState(null)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)

  // Outline sidebar state
  const [coverImage, setCoverImage] = useState('')
  const [slug, setSlug] = useState('')
  const [publishDate, setPublishDate] = useState('')
  const [author, setAuthor] = useState('')
  const [tags, setTags] = useState([])
  const [activeTocItem, setActiveTocItem] = useState(0)
  const [tableOfContents, setTableOfContents] = useState([])

  // Load post data
  useEffect(() => {
    const postId = params.id
    const existingPost = posts.find(p => p.id === postId)
    
    // Get site - either from post or use first available or create a mock
    let targetSite = null
    
    if (existingPost) {
      targetSite = sites.find(s => s.id === existingPost.siteId)
      setPost(existingPost)
      setTitle(existingPost.title)
      setContent(existingPost.content)
      setCoverImage(existingPost.thumbnail || '')
      setSlug(existingPost.slug || existingPost.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || '')
      setPublishDate(existingPost.publishedAt || new Date().toISOString().split('T')[0])
      setAuthor(existingPost.author || user?.name || 'Anonymous')
      setTags(existingPost.tags || ['Review', 'Entertainment'])
    } else if (postId === 'new' || !existingPost) {
      // Create a new post
      const mockPost = {
        id: postId === 'new' ? `new_${Date.now()}` : postId,
        title: 'Untitled Post',
        content: '<p>Start writing your amazing content here...</p>',
        thumbnail: MOCK_FRAMES[0],
        videoUrl: 'https://youtube.com/watch?v=demo',
        status: 'draft',
        slug: 'untitled-post',
        author: user?.name || 'Anonymous',
        tags: ['Review'],
      }
      setPost(mockPost)
      setTitle(mockPost.title)
      setContent(mockPost.content)
      setCoverImage(mockPost.thumbnail)
      setSlug(mockPost.slug)
      setPublishDate(new Date().toISOString().split('T')[0])
      setAuthor(mockPost.author)
      setTags(mockPost.tags)
      targetSite = sites[0] // Take first site if available
    }
    
    // If we still don't have a site, create a mock one for the editor to work
    if (!targetSite && sites.length === 0) {
      targetSite = {
        id: 'temp_site',
        domain: 'demo.streamtosite.com',
        theme: 'modern_clean',
        isVerified: false,
        connectedChannel: {
          name: 'Demo Channel',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
        }
      }
    } else if (!targetSite) {
      targetSite = sites[0]
    }
    
    setSite(targetSite)
  }, [params.id, posts, sites, user])



  // Extract TOC from content
  useEffect(() => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headings = doc.querySelectorAll('h1, h2, h3')
    const toc = Array.from(headings).map(h => ({
      level: parseInt(h.tagName[1]),
      text: h.textContent || 'Untitled Section'
    }))
    setTableOfContents(toc.length > 0 ? toc : [
      { level: 2, text: 'Introduction' },
      { level: 2, text: 'Main Content' },
      { level: 3, text: 'Key Points' },
      { level: 2, text: 'Conclusion' },
    ])
  }, [content])

  // Handle content update from editor
  const handleContentUpdate = useCallback((newContent) => {
    setContent(newContent)
  }, [])

  // Insert image into editor
  const handleInsertImage = useCallback((imageUrl) => {
    if (editorRef.current) {
      editorRef.current.insertImage(imageUrl)
      addToast({ type: 'success', message: '🖼️ Image inserted into editor' })
    }
  }, [addToast])

  // Handle rewrite selection (AI feature)
  const handleRewriteSelection = useCallback(() => {
    addToast({ type: 'info', message: '✨ AI rewrite feature coming soon!' })
  }, [addToast])

  // Handle generate intro (AI feature)
  const handleGenerateIntro = useCallback(() => {
    addToast({ type: 'info', message: '✨ AI intro generation coming soon!' })
  }, [addToast])

  // Save post
  const handleSave = async () => {
    setIsSaving(true)
    
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    if (post?.id) {
      updatePost(post.id, { 
        title, 
        content,
        thumbnail: coverImage,
        slug,
        publishedAt: publishDate,
        author,
        tags
      })
    } else {
      const newPost = addPost({
        siteId: site?.id,
        title,
        content,
        thumbnail: coverImage || MOCK_FRAMES[0],
        videoUrl: 'https://youtube.com/watch?v=demo',
        slug,
        author,
        tags
      })
      setPost(newPost)
    }
    
    setIsSaving(false)
    setLastSaved(new Date())
    addToast({ type: 'success', message: '✓ Changes saved' })
  }

  // Publish post
  const handlePublish = async () => {
    setIsPublishing(true)
    
    // Save first
    if (post?.id) {
      updatePost(post.id, { 
        title, 
        content,
        thumbnail: coverImage,
        slug,
        author,
        tags
      })
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (post?.id) {
      publishPost(post.id)
    }
    
    setIsPublishing(false)
    addToast({ type: 'success', message: '🎉 Post published!' })
  }

  // Handle delete
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      addToast({ type: 'success', message: 'Post deleted' })
      router.push('/dashboard/studio')
    }
  }

  // Handle duplicate
  const handleDuplicate = () => {
    const newPost = addPost({
      siteId: site?.id,
      title: `${title} (Copy)`,
      content,
      thumbnail: coverImage || MOCK_FRAMES[0],
      videoUrl: post?.videoUrl || 'https://youtube.com/watch?v=demo',
    })
    addToast({ type: 'success', message: 'Post duplicated' })
    router.push(`/dashboard/editor/${newPost.id}`)
  }

  if (!site) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-500">Loading editor...</p>
        </div>
      </div>
    )
  }

  // Top Bar Component
  const TopBar = (
    <>
      {/* Left */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/studio"
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-semibold bg-transparent border-none outline-none focus:ring-0 w-full max-w-md"
            placeholder="Post title..."
          />
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <Globe className="w-3 h-3" />
            <span>{site?.domain}</span>
            {lastSaved && (
              <>
                <span>•</span>
                <Clock className="w-3 h-3" />
                <span>Saved {lastSaved.toLocaleTimeString()}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-neutral-500">
          {post?.status === 'published' ? (
            <span className="flex items-center gap-1 text-green-600">
              <CheckCircle2 className="w-4 h-4" />
              Published
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              Draft
            </span>
          )}
        </span>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-2"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save
        </button>

        <Link
          href={`/site/${site?.domain?.split('.')[0]}`}
          target="_blank"
          className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Preview
        </Link>

        <button
          onClick={handlePublish}
          disabled={isPublishing}
          className="px-5 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all flex items-center gap-2"
        >
          {isPublishing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Publish
            </>
          )}
        </button>

        {/* More Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-neutral-600" />
          </button>
          
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-neutral-200 py-1 z-50"
              >
                <button
                  onClick={() => { handleDuplicate(); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  <Copy className="w-4 h-4" />
                  Duplicate
                </button>
                <button
                  onClick={() => { window.open(`/site/${site?.domain?.split('.')[0]}/${slug}`, '_blank'); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live
                </button>
                <div className="border-t border-neutral-100 my-1" />
                <button
                  onClick={() => { handleDelete(); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )

  // Left Sidebar Content - Outline & Settings
  const LeftSidebarContent = (
    <OutlineSidebar
      coverImage={coverImage}
      onCoverChange={setCoverImage}
      tableOfContents={tableOfContents}
      activeTocItem={activeTocItem}
      onTocClick={setActiveTocItem}
      slug={slug}
      onSlugChange={setSlug}
      date={publishDate}
      onDateChange={setPublishDate}
      author={author}
      onAuthorChange={setAuthor}
      tags={tags}
      onTagsChange={setTags}
    />
  )

  // Right Sidebar Content - Media, SEO & AI
  const RightSidebarContent = (
    <MediaSidebar
      videoUrl={post?.videoUrl}
      screenshots={MOCK_SCREENSHOTS}
      seoScore={72}
      seoItems={[
        { status: 'good', message: `Title length is optimal (${title.length} characters)` },
        { status: title.length > 10 ? 'good' : 'warning', message: title.length > 10 ? 'Title is descriptive' : 'Make title more descriptive' },
        { status: coverImage ? 'good' : 'warning', message: coverImage ? 'Cover image is set' : 'Add a cover image' },
        { status: tags.length >= 2 ? 'good' : 'warning', message: tags.length >= 2 ? `${tags.length} tags added` : 'Add at least 2 tags' },
        { status: content.length > 500 ? 'good' : 'warning', message: content.length > 500 ? 'Good content length' : 'Add more content (500+ chars)' },
      ]}
      onRewriteSelection={handleRewriteSelection}
      onGenerateIntro={handleGenerateIntro}
      onInsertImage={handleInsertImage}
    />
  )

  return (
    <EditorLayout
      topBar={TopBar}
      leftSidebar={LeftSidebarContent}
      rightSidebar={RightSidebarContent}
      title={title}
      backHref="/dashboard/studio"
    >
      {/* Main Editor Area */}
      <TiptapEditor
        ref={editorRef}
        content={content}
        onUpdate={handleContentUpdate}
        placeholder="Start writing... Type '/' for commands"
      />
    </EditorLayout>
  )
}
