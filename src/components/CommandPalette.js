'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Monitor, PenSquare, Layout, DollarSign, Settings, LogOut, X } from 'lucide-react'
import { useCommandPaletteStore } from '@/store/commandPaletteStore'

export default function CommandPalette() {
  const router = useRouter()
  const { isOpen, close } = useCommandPaletteStore()
  const [searchTerm, setSearchTerm] = useState('')
  const inputRef = useRef(null)
  const paletteRef = useRef(null)

  const items = [
    { id: 'dashboard', name: 'Dashboard Overview', href: '/dashboard', icon: Monitor },
    { id: 'studio', name: 'Content Studio', href: '/dashboard/studio', icon: PenSquare },
    { id: 'builder', name: 'Site Builder', href: '/dashboard/builder', icon: Layout },
    { id: 'monetization', name: 'Monetization Hub', href: '/dashboard/monetization', icon: DollarSign },
    { id: 'settings', name: 'Account Settings', href: '/dashboard/settings', icon: Settings },
    { id: 'signout', name: 'Sign Out', href: '/api/auth/signout', icon: LogOut, action: () => alert('Signing out...') }, // Mock action
  ]

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      inputRef.current?.focus()
    } else {
      document.body.style.overflow = 'auto'
    }

    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        useCommandPaletteStore.getState().toggle()
      }
      if (event.key === 'Escape') {
        close()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, close])

  const handleSelect = (item) => {
    if (item.action) {
      item.action()
    } else {
      router.push(item.href)
    }
    close()
    setSearchTerm('')
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const paletteVariants = {
    hidden: { scale: 0.95, opacity: 0, y: 10 },
    visible: { scale: 1, opacity: 1, y: 0 },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={paletteRef}
          className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 lg:p-8 pt-[15vh]"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={(e) => e.target === paletteRef.current && close()} // Close on backdrop click
        >
          <motion.div
            className="w-full max-w-xl bg-surface-light rounded-xl shadow-2xl border border-border-color flex flex-col overflow-hidden"
            variants={paletteVariants}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Search Input */}
            <div className="relative flex items-center px-4 py-3 border-b border-border-color">
              <Search className="w-5 h-5 text-text/60 absolute left-4" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search StreamToSite..."
                className="w-full pl-10 pr-10 py-2 bg-transparent text-text placeholder-text/50 focus:outline-none text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={close} className="absolute right-4 p-1 rounded-full text-text/60 hover:bg-surface-light-hover">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto max-h-[calc(80vh-150px)] scrollbar-custom">
              {filteredItems.length === 0 ? (
                <div className="p-6 text-center text-text/50">
                  No results found for &quot;{searchTerm}&quot;
                </div>
              ) : (
                <ul className="py-2">
                  {filteredItems.map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.1, delay: 0.05 * filteredItems.indexOf(item) }}
                      className="group cursor-pointer"
                      onClick={() => handleSelect(item)}
                    >
                      <a
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-surface transition-colors rounded-md mx-2"
                      >
                        <item.icon className="w-5 h-5 text-text/60 group-hover:text-primary" />
                        <span className="text-text font-medium group-hover:text-primary">{item.name}</span>
                        {item.href && (
                          <span className="ml-auto text-xs text-text/40 group-hover:text-primary/70 hidden sm:block">
                            {item.href}
                          </span>
                        )}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-border-color flex justify-between items-center text-xs text-text/50">
              <div className="flex items-center space-x-2">
                <span className="kbd">⌘K</span>
                <span>to toggle</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="kbd">Esc</span>
                <span>to close</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
