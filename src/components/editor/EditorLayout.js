'use client'

import { useState } from 'react'
import { 
  ChevronLeft, 
  PanelLeftClose, 
  PanelRightClose,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'

/**
 * EditorLayout - 3-Zone Layout for the Block Editor
 * 
 * ZONE A: Left Sidebar (Outline & Meta) - Collapsible
 * ZONE B: Center Canvas (TipTap Editor) - Max Width 800px
 * ZONE C: Right Sidebar (Copilot & Media Hub) - Tabs
 */
export default function EditorLayout({ 
  children,
  leftSidebar,
  rightSidebar,
  topBar,
  title = 'Editing Post',
  backHref = '/dashboard/studio'
}) {
  const [leftCollapsed, setLeftCollapsed] = useState(false)
  const [rightCollapsed, setRightCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      {/* Top Bar */}
      {topBar && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-white sticky top-0 z-50">
          {topBar}
        </div>
      )}

      {/* Main 3-Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* ZONE A: Left Sidebar (Outline & Meta) */}
        <aside 
          className={`
            bg-white border-r border-neutral-200 flex flex-col
            transition-all duration-300 ease-in-out
            ${leftCollapsed ? 'w-0 overflow-hidden' : 'w-72'}
            hidden lg:flex
          `}
        >
          {/* Back Button */}
          <div className="p-3 border-b border-neutral-100">
            <Link 
              href={backHref}
              className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          
          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            {leftSidebar}
          </div>
          
          {/* Collapse Button */}
          <button 
            onClick={() => setLeftCollapsed(!leftCollapsed)}
            className="p-2 border-t border-neutral-100 hover:bg-neutral-50 transition-colors flex items-center justify-center"
          >
            <PanelLeftClose className="w-4 h-4 text-neutral-400" />
          </button>
        </aside>

        {/* Left Sidebar Toggle (when collapsed) */}
        {leftCollapsed && (
          <button 
            onClick={() => setLeftCollapsed(false)}
            className="hidden lg:flex w-8 bg-white border-r border-neutral-200 items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>
        )}

        {/* ZONE B: Center Canvas */}
        <main className="flex-1 overflow-y-auto bg-neutral-100">
          <div className="max-w-4xl mx-auto px-4 py-8 lg:px-8">
            {/* The "Paper" Canvas */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 min-h-[calc(100vh-200px)]">
              {children}
            </div>
          </div>
        </main>

        {/* Right Sidebar Toggle (when collapsed) */}
        {rightCollapsed && (
          <button 
            onClick={() => setRightCollapsed(false)}
            className="hidden lg:flex w-8 bg-white border-l border-neutral-200 items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-neutral-400" />
          </button>
        )}

        {/* ZONE C: Right Sidebar (Copilot & Media Hub) */}
        <aside 
          className={`
            bg-white border-l border-neutral-200 flex flex-col
            transition-all duration-300 ease-in-out
            ${rightCollapsed ? 'w-0 overflow-hidden' : 'w-80'}
            hidden lg:flex
          `}
        >
          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            {rightSidebar}
          </div>
          
          {/* Collapse Button */}
          <button 
            onClick={() => setRightCollapsed(!rightCollapsed)}
            className="p-2 border-t border-neutral-100 hover:bg-neutral-50 transition-colors flex items-center justify-center"
          >
            <PanelRightClose className="w-4 h-4 text-neutral-400" />
          </button>
        </aside>
      </div>
    </div>
  )
}
