'use client'

import Link from 'next/link'
import { Menu, X, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">StreamToSite</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-neutral-400 hover:text-white transition-colors font-medium">
              Features
            </Link>
            <Link href="#pricing" className="text-neutral-400 hover:text-white transition-colors font-medium">
              Pricing
            </Link>
            <Link href="#reviews" className="text-neutral-400 hover:text-white transition-colors font-medium">
              Reviews
            </Link>
            <Link href="/login" className="text-neutral-400 hover:text-white transition-colors font-medium">
              Log In
            </Link>
            <Link href="/signup" className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105">
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-neutral-400 hover:text-white p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              href="#features"
              className="block px-4 py-3 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="block px-4 py-3 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#reviews"
              className="block px-4 py-3 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Reviews
            </Link>
            <Link
              href="/login"
              className="block px-4 py-3 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="block bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-3 rounded-lg text-center mt-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
