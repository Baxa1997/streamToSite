'use client'

import { useCallback, useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import Underline from '@tiptap/extension-underline'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link2,
  Sparkles,
  Image as ImageIcon,
  Video,
  Youtube as YoutubeIcon,
  ShoppingBag,
  DollarSign,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  X
} from 'lucide-react'

// Slash Menu Commands
const SLASH_COMMANDS = [
  {
    title: 'Image',
    description: 'Upload, Unsplash, or URL',
    icon: ImageIcon,
    command: 'image',
    color: 'text-blue-500 bg-blue-50'
  },
  {
    title: 'Video Frame',
    description: 'Insert from Media Drawer',
    icon: Video,
    command: 'video',
    color: 'text-purple-500 bg-purple-50'
  },
  {
    title: 'YouTube Embed',
    description: 'Embed a YouTube video',
    icon: YoutubeIcon,
    command: 'youtube',
    color: 'text-red-500 bg-red-50'
  },
  {
    title: 'Product Card',
    description: 'Affiliate widget',
    icon: ShoppingBag,
    command: 'product',
    color: 'text-orange-500 bg-orange-50'
  },
  {
    title: 'Ad Placeholder',
    description: 'Monetization slot',
    icon: DollarSign,
    command: 'ad',
    color: 'text-green-500 bg-green-50'
  },
  {
    title: 'Heading 2',
    description: 'Medium section heading',
    icon: Heading2,
    command: 'h2',
    color: 'text-neutral-600 bg-neutral-100'
  },
  {
    title: 'Heading 3',
    description: 'Small section heading',
    icon: Heading3,
    command: 'h3',
    color: 'text-neutral-600 bg-neutral-100'
  },
  {
    title: 'Bullet List',
    description: 'Unordered list',
    icon: List,
    command: 'bullet',
    color: 'text-neutral-600 bg-neutral-100'
  },
  {
    title: 'Numbered List',
    description: 'Ordered list',
    icon: ListOrdered,
    command: 'number',
    color: 'text-neutral-600 bg-neutral-100'
  },
  {
    title: 'Quote',
    description: 'Block quote',
    icon: Quote,
    command: 'quote',
    color: 'text-neutral-600 bg-neutral-100'
  },
  {
    title: 'Code Block',
    description: 'Code snippet',
    icon: Code,
    command: 'code',
    color: 'text-neutral-600 bg-neutral-100'
  },
  {
    title: 'Divider',
    description: 'Horizontal rule',
    icon: Minus,
    command: 'divider',
    color: 'text-neutral-600 bg-neutral-100'
  },
]

// Slash Menu Component
const SlashMenu = ({ editor, isOpen, onClose, onCommand, position }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [filter, setFilter] = useState('')

  const filteredCommands = SLASH_COMMANDS.filter(cmd => 
    cmd.title.toLowerCase().includes(filter.toLowerCase()) ||
    cmd.description.toLowerCase().includes(filter.toLowerCase())
  )

  useEffect(() => {
    setSelectedIndex(0)
  }, [filter])

  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredCommands[selectedIndex]) {
        onCommand(filteredCommands[selectedIndex].command)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }, [isOpen, filteredCommands, selectedIndex, onCommand, onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (!isOpen) return null

  return (
    <div 
      className="absolute z-50 bg-white rounded-xl shadow-2xl border border-neutral-200 w-72 max-h-80 overflow-y-auto animate-scale-in"
      style={{ top: position?.top || 0, left: position?.left || 0 }}
    >
      <div className="p-2 border-b border-neutral-100">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter commands..."
          className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
          autoFocus
        />
      </div>
      <div className="p-1">
        {filteredCommands.map((cmd, index) => {
          const Icon = cmd.icon
          return (
            <button
              key={cmd.command}
              onClick={() => onCommand(cmd.command)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors
                ${index === selectedIndex ? 'bg-neutral-100' : 'hover:bg-neutral-50'}
              `}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cmd.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">{cmd.title}</p>
                <p className="text-xs text-neutral-500">{cmd.description}</p>
              </div>
            </button>
          )
        })}
        {filteredCommands.length === 0 && (
          <p className="text-sm text-neutral-500 text-center py-4">No commands found</p>
        )}
      </div>
    </div>
  )
}

// Link Modal Component
const LinkModal = ({ isOpen, onClose, onSubmit, initialUrl = '' }) => {
  const [url, setUrl] = useState(initialUrl)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-neutral-200 w-96 p-4 animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-neutral-900">Insert Link</h3>
          <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded-lg transition-colors">
            <X className="w-4 h-4 text-neutral-500" />
          </button>
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 mb-4"
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onSubmit(url)
              onClose()
            }}
            className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  )
}

// YouTube Embed Modal
const YouTubeModal = ({ isOpen, onClose, onSubmit }) => {
  const [url, setUrl] = useState('')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-neutral-200 w-96 p-4 animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-neutral-900">Embed YouTube Video</h3>
          <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded-lg transition-colors">
            <X className="w-4 h-4 text-neutral-500" />
          </button>
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 mb-4"
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onSubmit(url)
              setUrl('')
              onClose()
            }}
            className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Embed
          </button>
        </div>
      </div>
    </div>
  )
}

// Image Insert Modal
const ImageModal = ({ isOpen, onClose, onSubmit }) => {
  const [url, setUrl] = useState('')
  const [tab, setTab] = useState('url') // 'url' | 'upload' | 'unsplash'

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-neutral-200 w-[480px] p-4 animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-neutral-900">Insert Image</h3>
          <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded-lg transition-colors">
            <X className="w-4 h-4 text-neutral-500" />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-neutral-100 rounded-lg mb-4">
          {[
            { id: 'url', label: 'URL' },
            { id: 'upload', label: 'Upload' },
            { id: 'unsplash', label: 'Unsplash' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                tab === t.id ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'url' && (
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 mb-4"
            autoFocus
          />
        )}

        {tab === 'upload' && (
          <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center mb-4 hover:border-red-400 transition-colors cursor-pointer">
            <ImageIcon className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
            <p className="text-sm text-neutral-600 mb-1">Click to upload or drag and drop</p>
            <p className="text-xs text-neutral-400">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}

        {tab === 'unsplash' && (
          <div className="space-y-3 mb-4">
            <input
              type="text"
              placeholder="Search Unsplash..."
              className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            />
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="aspect-square bg-neutral-200 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              if (url) onSubmit(url)
              setUrl('')
              onClose()
            }}
            disabled={tab === 'url' && !url}
            className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  )
}

// Main TipTap Editor Component
const TiptapEditor = forwardRef(({ 
  content = '',
  onUpdate,
  onSelectionUpdate,
  placeholder = "Start writing... Type '/' for commands",
  className = ''
}, ref) => {
  const [showSlashMenu, setShowSlashMenu] = useState(false)
  const [slashMenuPosition, setSlashMenuPosition] = useState({ top: 0, left: 0 })
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [showYouTubeModal, setShowYouTubeModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)

  const editor = useEditor({
    immediatelyRender: false, // Required for Next.js SSR
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-red-500 underline hover:text-red-600 transition-colors',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full my-6',
        },
      }),
      Youtube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: {
          class: 'rounded-lg overflow-hidden my-6',
        },
      }),
      Underline,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-lg prose-neutral max-w-none focus:outline-none min-h-[400px] px-8 py-6',
      },
      handleKeyDown: (view, event) => {
        if (event.key === '/') {
          // Get cursor position for menu placement
          const { from } = view.state.selection
          const coords = view.coordsAtPos(from)
          setSlashMenuPosition({
            top: coords.bottom + 8,
            left: coords.left
          })
          setTimeout(() => setShowSlashMenu(true), 0)
        }
        if (event.key === 'Escape' && showSlashMenu) {
          setShowSlashMenu(false)
          return true
        }
        return false
      },
    },
    onUpdate: ({ editor }) => {
      onUpdate?.(editor.getHTML())
    },
    onSelectionUpdate: ({ editor }) => {
      onSelectionUpdate?.(editor)
    },
  })

  // Expose editor methods via ref
  useImperativeHandle(ref, () => ({
    getEditor: () => editor,
    getHTML: () => editor?.getHTML(),
    getJSON: () => editor?.getJSON(),
    insertImage: (src) => editor?.chain().focus().setImage({ src }).run(),
    insertYouTube: (url) => editor?.chain().focus().setYoutubeVideo({ src: url }).run(),
  }))

  // Handle slash menu commands
  const handleSlashCommand = useCallback((command) => {
    if (!editor) return
    
    // Delete the slash character
    editor.chain().focus().deleteRange({
      from: editor.state.selection.from - 1,
      to: editor.state.selection.from
    }).run()

    setShowSlashMenu(false)

    switch (command) {
      case 'image':
        setShowImageModal(true)
        break
      case 'video':
        // Trigger media drawer (handled by parent)
        break
      case 'youtube':
        setShowYouTubeModal(true)
        break
      case 'product':
        // Insert product placeholder
        editor.chain().focus().insertContent(`
          <div class="p-4 bg-orange-50 border border-orange-200 rounded-xl my-4">
            <p class="text-orange-600 text-sm font-medium">🛒 Product Card Placeholder</p>
            <p class="text-xs text-orange-500">Configure affiliate product in the sidebar</p>
          </div>
        `).run()
        break
      case 'ad':
        // Insert ad placeholder
        editor.chain().focus().insertContent(`
          <div class="p-4 bg-green-50 border border-green-200 rounded-xl my-4 text-center">
            <p class="text-green-600 text-sm font-medium">💰 Ad Slot</p>
            <p class="text-xs text-green-500">AdSense will appear here</p>
          </div>
        `).run()
        break
      case 'h2':
        editor.chain().focus().toggleHeading({ level: 2 }).run()
        break
      case 'h3':
        editor.chain().focus().toggleHeading({ level: 3 }).run()
        break
      case 'bullet':
        editor.chain().focus().toggleBulletList().run()
        break
      case 'number':
        editor.chain().focus().toggleOrderedList().run()
        break
      case 'quote':
        editor.chain().focus().toggleBlockquote().run()
        break
      case 'code':
        editor.chain().focus().toggleCodeBlock().run()
        break
      case 'divider':
        editor.chain().focus().setHorizontalRule().run()
        break
    }
  }, [editor])

  // Close slash menu when clicking outside
  useEffect(() => {
    const handleClick = () => setShowSlashMenu(false)
    if (showSlashMenu) {
      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }
  }, [showSlashMenu])

  if (!editor) return null

  return (
    <div className={`relative ${className}`}>
      {/* Fixed Toolbar */}
      <div className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-4 py-2 flex items-center gap-1 flex-wrap">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive('bold') ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive('italic') ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive('underline') ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
          }`}
          title="Underline"
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-neutral-200 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive('heading', { level: 2 }) ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive('heading', { level: 3 }) ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
          }`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-neutral-200 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive('bulletList') ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive('orderedList') ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive('blockquote') ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
          }`}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-neutral-200 mx-1" />
        <button
          onClick={() => setShowLinkModal(true)}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive('link') ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
          }`}
          title="Insert Link"
        >
          <Link2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => setShowImageModal(true)}
          className="p-2 rounded-lg transition-colors text-neutral-600 hover:bg-neutral-100"
          title="Insert Image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => setShowYouTubeModal(true)}
          className="p-2 rounded-lg transition-colors text-neutral-600 hover:bg-neutral-100"
          title="Embed YouTube"
        >
          <YoutubeIcon className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-neutral-200 mx-1" />
        <button
          className="p-2 rounded-lg transition-colors text-red-500 hover:bg-red-50 flex items-center gap-1.5"
          title="AI Assistant"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-medium hidden sm:inline">AI Rewrite</span>
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Slash Menu */}
      <SlashMenu
        editor={editor}
        isOpen={showSlashMenu}
        onClose={() => setShowSlashMenu(false)}
        onCommand={handleSlashCommand}
        position={slashMenuPosition}
      />

      {/* Modals */}
      <LinkModal
        isOpen={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        onSubmit={(url) => {
          editor.chain().focus().setLink({ href: url }).run()
        }}
        initialUrl={editor.getAttributes('link').href || ''}
      />

      <YouTubeModal
        isOpen={showYouTubeModal}
        onClose={() => setShowYouTubeModal(false)}
        onSubmit={(url) => {
          editor.chain().focus().setYoutubeVideo({ src: url }).run()
        }}
      />

      <ImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        onSubmit={(url) => {
          editor.chain().focus().setImage({ src: url }).run()
        }}
      />

      {/* Editor Styles */}
      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #a3a3a3;
          pointer-events: none;
          height: 0;
        }
        
        .ProseMirror:focus {
          outline: none;
        }

        .ProseMirror h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }

        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .ProseMirror blockquote {
          border-left: 4px solid #ef4444;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #525252;
        }

        .ProseMirror code {
          background: #f5f5f5;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
        }

        .ProseMirror pre {
          background: #171717;
          color: #e5e5e5;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }

        .ProseMirror pre code {
          background: none;
          padding: 0;
          color: inherit;
        }

        .ProseMirror hr {
          border: none;
          border-top: 2px solid #e5e5e5;
          margin: 2rem 0;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 1rem 0;
        }

        .ProseMirror li {
          margin: 0.5rem 0;
        }

        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }

        .ProseMirror .youtube-embed {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 0.5rem;
          overflow: hidden;
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  )
})

TiptapEditor.displayName = 'TiptapEditor'

export default TiptapEditor
