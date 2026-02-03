'use client'

import Link from 'next/link'
import { Menu, X, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-primary p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">StreamToSite</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="btn-ghost">
              Features
            </Link>
            <Link href="#pricing" className="btn-ghost">
              Pricing
            </Link>
            <Link href="#examples" className="btn-ghost">
              Examples
            </Link>
            <Link href="/dashboard" className="btn-ghost">
              Sign In
            </Link>
            <Link href="/dashboard" className="btn-primary">
              Start Free
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden btn-ghost p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden glass-strong border-t border-white/10 animate-fade-in">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              href="#features"
              className="block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#examples"
              className="block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Examples
            </Link>
            <Link
              href="/dashboard"
              className="block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="block btn-primary text-center mt-2"
              onClick={() => setIsOpen(false)}
            >
              Start Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
