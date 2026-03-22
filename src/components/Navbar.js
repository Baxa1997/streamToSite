'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, LogIn, Rocket } from 'lucide-react'
import { useCommandPaletteStore } from '@/store/commandPaletteStore'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleCommandPalette = useCommandPaletteStore((state) => state.toggle)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
  ]

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.1 }}
      className={`
        fixed inset-x-0 top-0 z-50 transition-all duration-300
        ${scrolled ? 'bg-surface/80 backdrop-blur-lg border-b border-border-color shadow-lg' : 'bg-transparent'}
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-2xl font-bold text-text flex items-center group">
            <Rocket className="w-6 h-6 mr-2 text-primary transition-transform group-hover:rotate-12" />
            <span className="bg-gradient-to-r from-primary to-blue-400 text-transparent bg-clip-text">
              StreamToSite
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-text/70 hover:text-primary transition-colors font-medium text-sm">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons & Search */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleCommandPalette}
            className="hidden md:flex items-center justify-center p-2 rounded-lg text-text/70 hover:text-primary hover:bg-surface-light transition-colors group"
            title="Search or Command (Cmd+K)"
          >
            <Search className="w-5 h-5" />
            <span className="ml-2 text-sm hidden lg:inline">Search</span>
            <kbd className="ml-2 hidden lg:inline-flex items-center justify-center h-5 px-1.5 rounded bg-surface-light text-text/50 border border-border-color text-[10px]">
              ⌘K
            </kbd>
          </button>

          <Link href="/login" className="hidden md:inline-flex btn-ghost text-sm py-2 px-4">
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </Link>
          <Link href="/signup" className="hidden md:inline-flex btn-primary text-sm py-2 px-4">
            Get Started
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-text/70 hover:text-primary hover:bg-surface-light focus:outline-none focus:ring-2 focus:ring-primary"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            id="mobile-menu"
            className={`
              md:hidden bg-surface/90 backdrop-blur-md border-t border-border-color
              absolute inset-x-0 top-16 shadow-xl
            `}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-text/80 hover:bg-surface-light hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-border-color my-2" />
              <button
                onClick={() => {
                  toggleCommandPalette();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-text/80 hover:bg-surface-light hover:text-primary transition-colors"
              >
                <Search className="w-5 h-5 mr-2" />
                Search (Cmd+K)
              </button>
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-text/80 hover:bg-surface-light hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogIn className="w-5 h-5 mr-2 inline-block" />
                Sign In
              </Link>
              <Link
                href="/signup"
                className="flex items-center justify-center w-full mt-2 btn-primary py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
