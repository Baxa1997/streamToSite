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
  Loader2
} from 'lucide-react'

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
    
    // Simulate AI response
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
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 border-b border-border-color bg-background/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-bold">Editing: Post #{id}</h1>
            <span className="text-xs px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded">
              Draft
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowPreview(true)}
              className="btn-ghost px-4 py-2"
            >
              <Eye className="w-4 h-4 mr-2 inline" />
              Preview
            </button>
            
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-secondary px-4 py-2 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 inline animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2 inline" />
                  Save Draft
                </>
              )}
            </button>
            
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="btn-primary px-4 py-2 disabled:opacity-50"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 inline animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2 inline" />
                  Publish
                </>
              )}
            </button>
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
          {/* Left Sidebar - Metadata */}
          <div className="col-span-3 border-r border-border-color p-6 overflow-y-auto custom-scrollbar bg-surface/30">
            <div className="space-y-6">
              {/* Thumbnail */}
              <div>
                <label className="text-sm font-semibold mb-3 block">Featured Image</label>
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg border-2 border-dashed border-border-color hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center group">
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 text-text/30 group-hover:text-primary/50 mx-auto mb-2 transition-colors" />
                    <p className="text-xs text-text/50">Click to upload</p>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="text-sm font-semibold mb-2 block">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input w-full"
                  placeholder="Post title"
                />
                <p className="text-xs text-text/50 mt-1">{title.length} characters</p>
              </div>

              {/* Slug */}
              <div>
                <label className="text-sm font-semibold mb-2 block flex items-center space-x-2">
                  <Link2 className="w-4 h-4" />
                  <span>URL Slug</span>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="input w-full font-mono text-sm"
                  placeholder="post-url-slug"
                />
                <p className="text-xs text-text/50 mt-1">
                  yoursite.com/<span className="text-primary">{slug}</span>
                </p>
              </div>

              {/* Tags */}
              <div>
                <label className="text-sm font-semibold mb-2 block flex items-center space-x-2">
                  <Tag className="w-4 h-4" />
                  <span>Tags</span>
                </label>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-primary transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    className="input flex-1 text-sm"
                    placeholder="Add tag..."
                  />
                  <button
                    onClick={handleAddTag}
                    className="btn-ghost px-3 py-2"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* SEO Score */}
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-green-400">SEO Score</span>
                  <span className="text-2xl font-bold text-green-400">94/100</span>
                </div>
                <div className="h-2 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 w-[94%]" />
                </div>
                <p className="text-xs text-text/60 mt-2">
                  Great! Your post is well-optimized for search engines.
                </p>
              </div>
            </div>
          </div>

          {/* Center - Editor Canvas */}
          <div className="col-span-6 p-8 overflow-y-auto custom-scrollbar">
            <div className="max-w-3xl mx-auto">
              {/* Notion-style Editor */}
              <div className="space-y-6">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[600px] bg-transparent border-none focus:outline-none resize-none text-text/90 leading-relaxed"
                  placeholder="Start writing your post..."
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.75',
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar - AI Copilot */}
          <div className="col-span-3 border-l border-border-color p-6 overflow-y-auto custom-scrollbar bg-surface/30">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">AI Copilot</h3>
                  <p className="text-xs text-text/60">Ask AI to help rewrite</p>
                </div>
              </div>

              {/* AI Chat Interface */}
              <div className="space-y-4">
                <div>
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="input w-full resize-none"
                    rows={4}
                    placeholder="e.g., 'Rewrite the introduction to be more engaging' or 'Make this section more concise'"
                  />
                </div>

                <button
                  onClick={handleAiAssist}
                  disabled={!aiPrompt || isAiThinking}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {isAiThinking ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 inline animate-spin" />
                      AI is thinking...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 inline" />
                      Ask AI
                    </>
                  )}
                </button>

                {/* AI Response */}
                {aiResponse && (
                  <div className="glass rounded-lg p-4 border border-primary/20 bg-primary/5 animate-fade-in">
                    <div className="flex items-start space-x-2 mb-3">
                      <Sparkles className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm text-text/80 leading-relaxed whitespace-pre-line">
                        {aiResponse}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="btn-secondary text-xs px-3 py-1">
                        Apply Changes
                      </button>
                      <button className="btn-ghost text-xs px-3 py-1">
                        Regenerate
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="pt-6 border-t border-border-color">
                <h4 className="text-sm font-semibold mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface transition-colors text-sm">
                    ✨ Improve readability
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface transition-colors text-sm">
                    📝 Fix grammar & spelling
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface transition-colors text-sm">
                    🎯 Optimize for SEO
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface transition-colors text-sm">
                    🔄 Rephrase section
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-2xl border border-border-color max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-border-color">
                <div className="flex items-center space-x-4">
                  <h3 className="font-bold">Preview</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-2 rounded-lg transition-colors ${
                        previewDevice === 'mobile' ? 'bg-primary text-white' : 'hover:bg-surface'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-2 rounded-lg transition-colors ${
                        previewDevice === 'desktop' ? 'bg-primary text-white' : 'hover:bg-surface'
                      }`}
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="btn-ghost p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preview Content */}
              <div className="flex-1 overflow-auto p-8 bg-surface/30">
                <div
                  className={`mx-auto bg-background rounded-lg border border-border-color overflow-hidden transition-all ${
                    previewDevice === 'mobile' ? 'max-w-sm' : 'max-w-4xl'
                  }`}
                >
                  <div className="p-8">
                    <h1 className="text-4xl font-bold mb-4">{title}</h1>
                    <div className="flex items-center space-x-3 text-sm text-text/60 mb-8">
                      <span>Movie Analysis</span>
                      <span>•</span>
                      <span>12 min read</span>
                      <span>•</span>
                      <span>Feb 3, 2026</span>
                    </div>
                    <div className="prose prose-invert max-w-none">
                      <div className="whitespace-pre-line leading-relaxed">
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
