'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import EditorLayout from '@/components/editor/EditorLayout'
import TiptapEditor from '@/components/editor/TiptapEditor'
import MediaSidebar from '@/components/editor/MediaSidebar'
import OutlineSidebar from '@/components/editor/OutlineSidebar'
import { 
  Save, 
  Eye, 
  Send, 
  Loader2,
  Clock,
  Smartphone,
  Monitor,
  X,
  Undo,
  Redo,
  MoreHorizontal,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'

// Sample content for the editor
const INITIAL_CONTENT = `
<h1>Inception Ending Explained: The Wedding Ring Theory</h1>

<p>Christopher Nolan's "Inception" left audiences worldwide debating one question: Did the top stop spinning?</p>

<p>After 16 years of debate, we finally have the answer. And it's been hiding in plain sight.</p>

<h2>The Spinning Top: A Red Herring</h2>

<p>Many viewers fixate on whether Cobb's totem falls at the end. But Nolan planted a more subtle clue throughout the film: <strong>Cobb's wedding ring</strong>.</p>

<p>In every dream sequence, Cobb wears his wedding ring. In reality, he doesn't. The final scene? <em>No ring.</em></p>

<p>This isn't speculation—it's visual storytelling at its finest. Nolan answered the question; we were just looking at the wrong totem.</p>

<h2>The Wedding Ring Theory</h2>

<p>Eagle-eyed fans noticed that Cobb wears his wedding ring in dreams but not in reality. This detail is crucial because:</p>

<ol>
<li>The ring represents his guilt and attachment to Mal</li>
<li>In dreams, he's still married to her</li>
<li>In reality, she's gone</li>
</ol>

<p>The final scene shows Cobb without his ring, reunited with his children. He's awake. He's home.</p>

<h2>Why This Matters</h2>

<p>Nolan's genius lies not in the answer, but in making us ask the wrong question. The entire audience fixates on the spinning top, but the real clue is hidden in plain sight.</p>

<blockquote>
<p>This is transformative filmmaking—using visual language to tell a story that rewards analysis and repeat viewings.</p>
</blockquote>
`

export default function EditorPage({ params }) {
  const { id } = params
  const editorRef = useRef(null)
  
  // Content State
  const [title, setTitle] = useState('Inception Ending Explained: The Wedding Ring Theory')
  const [content, setContent] = useState(INITIAL_CONTENT)
  
  // Meta State
  const [coverImage, setCoverImage] = useState('')
  const [slug, setSlug] = useState('inception-ending-explained')
  const [date, setDate] = useState('2026-02-07')
  const [author, setAuthor] = useState('John Doe')
  const [tags, setTags] = useState(['Movie Analysis', 'Christopher Nolan', 'Inception'])
  
  // UI State
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [lastSaved, setLastSaved] = useState('Just now')
  const [showPreview, setShowPreview] = useState(false)
  const [previewDevice, setPreviewDevice] = useState('desktop')
  const [status, setStatus] = useState('draft')
  
  // Table of Contents (auto-generated from content)
  const [tableOfContents, setTableOfContents] = useState([])
  const [activeTocItem, setActiveTocItem] = useState(null)

  // Extract headings from content for TOC
  useEffect(() => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headings = doc.querySelectorAll('h2, h3')
    const toc = Array.from(headings).map(heading => ({
      level: parseInt(heading.tagName.charAt(1)),
      text: heading.textContent
    }))
    setTableOfContents(toc)
  }, [content])

  // Auto-save simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLastSaved(`${Math.floor(Math.random() * 5) + 1} min ago`)
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Handlers
  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setLastSaved('Just now')
    }, 1500)
  }

  const handlePublish = () => {
    setIsPublishing(true)
    setTimeout(() => {
      setIsPublishing(false)
      setStatus('published')
    }, 2000)
  }

  const handleContentUpdate = useCallback((html) => {
    setContent(html)
  }, [])

  const handleRewriteSelection = () => {
    console.log('Rewrite selection triggered')
  }

  const handleGenerateIntro = () => {
    console.log('Generate intro triggered')
  }

  // Calculate word count
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length
  const readTime = Math.ceil(wordCount / 200)

  // Top Bar Component
  const TopBar = (
    <>
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-sm font-semibold text-neutral-900 hidden sm:block">Editing Post</h1>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <Clock className="w-3 h-3" />
            <span>Last saved {lastSaved}</span>
          </div>
        </div>
        <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded ${
          status === 'published' 
            ? 'bg-emerald-100 text-emerald-700' 
            : 'bg-amber-100 text-amber-700'
        }`}>
          {status}
        </span>
      </div>
      
      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Word Count */}
        <div className="hidden md:flex items-center gap-3 text-xs text-neutral-500 pr-3 border-r border-neutral-200">
          <span>{wordCount.toLocaleString()} words</span>
          <span>{readTime} min read</span>
        </div>
        
        {/* Preview */}
        <button
          onClick={() => setShowPreview(true)}
          className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
          title="Preview"
        >
          <Eye className="w-4 h-4" />
        </button>
        
        {/* Save */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save'}</span>
        </button>
        
        {/* Publish */}
        <button
          onClick={handlePublish}
          disabled={isPublishing}
          className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50"
        >
          {isPublishing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">{isPublishing ? 'Publishing...' : 'Publish'}</span>
        </button>
      </div>
    </>
  )

  // Left Sidebar Content
  const LeftSidebarContent = (
    <OutlineSidebar
      coverImage={coverImage}
      onCoverChange={setCoverImage}
      tableOfContents={tableOfContents}
      activeTocItem={activeTocItem}
      onTocClick={setActiveTocItem}
      slug={slug}
      onSlugChange={setSlug}
      date={date}
      onDateChange={setDate}
      author={author}
      onAuthorChange={setAuthor}
      tags={tags}
      onTagsChange={setTags}
    />
  )

  // Right Sidebar Content
  const RightSidebarContent = (
    <MediaSidebar
      videoUrl=""
      seoScore={78}
      onRewriteSelection={handleRewriteSelection}
      onGenerateIntro={handleGenerateIntro}
      onInsertImage={(src) => {
        editorRef.current?.insertImage(src)
      }}
    />
  )

  return (
    <>
      <EditorLayout
        topBar={TopBar}
        leftSidebar={LeftSidebarContent}
        rightSidebar={RightSidebarContent}
        backHref="/dashboard/studio"
      >
        {/* Title Input */}
        <div className="px-8 pt-8 pb-0">
          <textarea
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              // Auto-resize
              e.target.style.height = 'auto'
              e.target.style.height = e.target.scrollHeight + 'px'
            }}
            placeholder="Untitled"
            className="w-full text-4xl font-bold text-neutral-900 placeholder-neutral-300 resize-none focus:outline-none leading-tight"
            rows={1}
            style={{ overflow: 'hidden' }}
          />
        </div>

        {/* TipTap Editor */}
        <TiptapEditor
          ref={editorRef}
          content={content}
          onUpdate={handleContentUpdate}
          placeholder="Start writing... Type '/' for commands"
        />

        {/* Footer Stats */}
        <div className="px-8 py-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
          <span>{wordCount.toLocaleString()} words • {readTime} min read</span>
          <span>Auto-saved</span>
        </div>
      </EditorLayout>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-neutral-200 max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-scale-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
              <div className="flex items-center gap-4">
                <h3 className="text-sm font-semibold text-neutral-900">Preview</h3>
                <div className="flex items-center gap-1 bg-white rounded-lg border border-neutral-200 p-0.5">
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`p-1.5 rounded-md transition-colors ${
                      previewDevice === 'mobile' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`p-1.5 rounded-md transition-colors ${
                      previewDevice === 'desktop' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="p-1.5 hover:bg-neutral-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-auto p-8 bg-neutral-100">
              <div
                className={`mx-auto bg-white rounded-xl border border-neutral-200 shadow-lg overflow-hidden transition-all ${
                  previewDevice === 'mobile' ? 'max-w-sm' : 'max-w-3xl'
                }`}
              >
                {/* Cover Image */}
                {coverImage && (
                  <div className="aspect-video bg-neutral-200">
                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                )}
                
                <div className="p-8">
                  <h1 className="text-3xl font-bold text-neutral-900 mb-4">{title}</h1>
                  <div className="flex items-center gap-3 text-sm text-neutral-500 mb-8">
                    <span>{author}</span>
                    <span>•</span>
                    <span>{readTime} min read</span>
                    <span>•</span>
                    <span>{date}</span>
                  </div>
                  <div 
                    className="prose prose-lg prose-neutral max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                  
                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-neutral-200 flex flex-wrap gap-2">
                      {tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-neutral-100 text-neutral-600 text-sm rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
