'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { 
  Save, 
  Eye, 
  Send, 
  Image as ImageIcon, 
  Tag, 
  Link2, 
  Sparkles,
  Smartphone,
  Monitor,
  X,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  Clock,
  ChevronDown,
  BarChart3,
  Target,
  AlertCircle,
  Check
} from 'lucide-react'
import Link from 'next/link'

export default function EditorPage({ params }) {
  const { id } = params
  
  const [title, setTitle] = useState('Inception Ending Explained: The Wedding Ring Theory')
  const [slug, setSlug] = useState('inception-ending-explained')
  const [tags, setTags] = useState(['Movie Analysis', 'Christopher Nolan', 'Inception'])
  const [newTag, setNewTag] = useState('')
  const [content, setContent] = useState(`Christopher Nolan's "Inception" left audiences worldwide debating one question: Did the top stop spinning?

After 16 years of debate, we finally have the answer. And it's been hiding in plain sight.

## The Spinning Top: A Red Herring

Many viewers fixate on whether Cobb's totem falls at the end. But Nolan planted a more subtle clue throughout the film: Cobb's wedding ring.

In every dream sequence, Cobb wears his wedding ring. In reality, he doesn't. The final scene? No ring.

This isn't speculation—it's visual storytelling at its finest. Nolan answered the question; we were just looking at the wrong totem.

## The Wedding Ring Theory

Eagle-eyed fans noticed that Cobb wears his wedding ring in dreams but not in reality. This detail is crucial because:

1. The ring represents his guilt and attachment to Mal
2. In dreams, he's still married to her
3. In reality, she's gone

The final scene shows Cobb without his ring, reunited with his children. He's awake. He's home.

## Why This Matters

Nolan's genius lies not in the answer, but in making us ask the wrong question. The entire audience fixates on the spinning top, but the real clue is hidden in plain sight.

This is transformative filmmaking—using visual language to tell a story that rewards analysis and repeat viewings.`)
  
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [previewDevice, setPreviewDevice] = useState('desktop')
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [isAiThinking, setIsAiThinking] = useState(false)

  const seoScore = 94
  const readabilityScore = 87

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
    }, 1500)
  }

  const handlePublish = () => {
    setIsPublishing(true)
    setTimeout(() => {
      setIsPublishing(false)
    }, 2000)
  }

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleAiAssist = () => {
    if (!aiPrompt) return
    
    setIsAiThinking(true)
    
    setTimeout(() => {
      setAiResponse(`Here's a rewritten version with improved clarity:

"${aiPrompt}"

I've enhanced the section by:
- Adding stronger opening hooks
- Improving readability with shorter sentences
- Emphasizing key points with bold text
- Adding transitional phrases for better flow

Would you like me to apply this to your content?`)
      setIsAiThinking(false)
    }, 2000)
  }

  return (
    <DashboardLayout>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col -m-4 sm:-m-6 lg:-m-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/studio" className="btn-icon w-8 h-8">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-sm font-semibold text-neutral-900">Editing Post</h1>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <Clock className="w-3 h-3" />
                <span>Last saved 2 min ago</span>
              </div>
            </div>
            <span className="badge-warning ml-2">Draft</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPreview(true)}
              className="btn-secondary py-2 px-3"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Preview</span>
            </button>
            
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-secondary py-2 px-3 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span className="hidden sm:inline">Save</span>
                </>
              )}
            </button>
            
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="btn-primary py-2 px-3 disabled:opacity-50"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Publishing...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Publish</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
          {/* Left Sidebar - Metadata */}
          <div className="hidden lg:block lg:col-span-3 border-r border-neutral-200 overflow-y-auto bg-white">
            <div className="p-4 space-y-5">
              {/* Thumbnail */}
              <div>
                <label className="text-xs font-medium text-neutral-700 mb-2 block">Featured Image</label>
                <div className="aspect-video bg-neutral-100 rounded-lg border-2 border-dashed border-neutral-300 hover:border-red-400 transition-colors cursor-pointer flex items-center justify-center group">
                  <div className="text-center">
                    <ImageIcon className="w-6 h-6 text-neutral-400 group-hover:text-red-400 mx-auto mb-1 transition-colors" />
                    <p className="text-xs text-neutral-500">Click to upload</p>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="text-xs font-medium text-neutral-700 mb-1.5 block">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input text-sm"
                  placeholder="Post title"
                />
                <p className="text-[10px] text-neutral-400 mt-1">{title.length} characters</p>
              </div>

              {/* Slug */}
              <div>
                <label className="text-xs font-medium text-neutral-700 mb-1.5 block flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5" />
                  <span>URL Slug</span>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="input text-sm font-mono"
                  placeholder="post-url-slug"
                />
                <p className="text-[10px] text-neutral-400 mt-1">
                  yoursite.com/<span className="text-red-500">{slug}</span>
                </p>
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs font-medium text-neutral-700 mb-1.5 block flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Tags</span>
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
                    className="input flex-1 text-xs py-1.5"
                    placeholder="Add tag..."
                  />
                  <button
                    onClick={handleAddTag}
                    className="btn-secondary py-1.5 px-2 text-xs"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* SEO & Readability Scores */}
              <div className="space-y-3">
                {/* SEO Score */}
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
                      <Target className="w-3.5 h-3.5" />
                      SEO Score
                    </span>
                    <span className="text-lg font-bold text-emerald-600">{seoScore}</span>
                  </div>
                  <div className="h-1.5 bg-emerald-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${seoScore}%` }} />
                  </div>
                </div>

                {/* Readability */}
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-blue-700 flex items-center gap-1">
                      <BarChart3 className="w-3.5 h-3.5" />
                      Readability
                    </span>
                    <span className="text-lg font-bold text-blue-600">{readabilityScore}</span>
                  </div>
                  <div className="h-1.5 bg-blue-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${readabilityScore}%` }} />
                  </div>
                </div>
              </div>

              {/* SEO Checklist */}
              <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                <h4 className="text-xs font-medium text-neutral-700 mb-2">SEO Checklist</h4>
                <ul className="space-y-1.5 text-xs">
                  <li className="flex items-center gap-2 text-emerald-600">
                    <Check className="w-3.5 h-3.5" />
                    Title contains target keyword
                  </li>
                  <li className="flex items-center gap-2 text-emerald-600">
                    <Check className="w-3.5 h-3.5" />
                    Meta description optimized
                  </li>
                  <li className="flex items-center gap-2 text-emerald-600">
                    <Check className="w-3.5 h-3.5" />
                    Headings structure valid
                  </li>
                  <li className="flex items-center gap-2 text-amber-600">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Add more internal links
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Center - Editor Canvas */}
          <div className="col-span-1 lg:col-span-6 overflow-y-auto bg-neutral-50">
            <div className="max-w-3xl mx-auto p-6">
              {/* Visual Editor */}
              <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-6">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[500px] bg-transparent border-none focus:outline-none resize-none text-neutral-800 leading-relaxed"
                  placeholder="Start writing your post..."
                  style={{
                    fontSize: '15px',
                    lineHeight: '1.75',
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}
                />
              </div>

              {/* Word count */}
              <div className="flex items-center justify-between mt-4 text-xs text-neutral-500">
                <span>{content.split(/\s+/).filter(Boolean).length} words</span>
                <span>~{Math.ceil(content.split(/\s+/).filter(Boolean).length / 200)} min read</span>
              </div>
            </div>
          </div>

          {/* Right Sidebar - AI Copilot */}
          <div className="hidden lg:block lg:col-span-3 border-l border-neutral-200 overflow-y-auto bg-white">
            <div className="p-4 space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">AI Copilot</h3>
                  <p className="text-[10px] text-neutral-500">Ask AI to help improve your writing</p>
                </div>
              </div>

              {/* AI Chat Interface */}
              <div className="space-y-3">
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="input text-sm resize-none"
                  rows={3}
                  placeholder="e.g., 'Rewrite the introduction to be more engaging'"
                />

                <button
                  onClick={handleAiAssist}
                  disabled={!aiPrompt || isAiThinking}
                  className="btn-primary w-full py-2 text-sm disabled:opacity-50"
                >
                  {isAiThinking ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Thinking...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Ask AI
                    </>
                  )}
                </button>

                {/* AI Response */}
                {aiResponse && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                    <div className="flex items-start gap-2 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-neutral-700 leading-relaxed whitespace-pre-line">
                        {aiResponse}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <button className="btn-primary py-1 px-2 text-xs">
                        Apply
                      </button>
                      <button className="btn-secondary py-1 px-2 text-xs">
                        Regenerate
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t border-neutral-200">
                <h4 className="text-xs font-medium text-neutral-700 mb-2">Quick Actions</h4>
                <div className="space-y-1">
                  {[
                    { emoji: '✨', label: 'Improve readability' },
                    { emoji: '📝', label: 'Fix grammar & spelling' },
                    { emoji: '🎯', label: 'Optimize for SEO' },
                    { emoji: '🔄', label: 'Rephrase section' },
                    { emoji: '📊', label: 'Add statistics' },
                  ].map((action, i) => (
                    <button 
                      key={i}
                      className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-neutral-100 transition-colors text-xs text-neutral-700"
                    >
                      {action.emoji} {action.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Affiliate Widget */}
              <div className="pt-4 border-t border-neutral-200">
                <h4 className="text-xs font-medium text-neutral-700 mb-2">Product Widgets</h4>
                <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                  <p className="text-xs text-orange-700 mb-2">
                    <strong>Tip:</strong> Add affiliate product widgets to increase revenue.
                  </p>
                  <button className="btn-secondary w-full py-1.5 text-xs justify-center">
                    + Add Product Widget
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl border border-neutral-200 max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
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
                  className="btn-icon w-8 h-8"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Preview Content */}
              <div className="flex-1 overflow-auto p-6 bg-neutral-100">
                <div
                  className={`mx-auto bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden transition-all ${
                    previewDevice === 'mobile' ? 'max-w-sm' : 'max-w-3xl'
                  }`}
                >
                  <div className="p-8">
                    <h1 className="text-3xl font-bold text-neutral-900 mb-4">{title}</h1>
                    <div className="flex items-center gap-3 text-sm text-neutral-500 mb-8">
                      <span>Movie Analysis</span>
                      <span>•</span>
                      <span>{Math.ceil(content.split(/\s+/).filter(Boolean).length / 200)} min read</span>
                      <span>•</span>
                      <span>Feb 3, 2026</span>
                    </div>
                    <div className="prose prose-neutral max-w-none">
                      <div className="whitespace-pre-line leading-relaxed text-neutral-700">
                        {content}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
