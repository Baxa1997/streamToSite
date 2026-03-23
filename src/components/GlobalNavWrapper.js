'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function GlobalNavWrapper() {
  const pathname = usePathname()

  // Show Navbar only on non-dashboard and non-landing pages
  const shouldShowNavbar = !pathname.startsWith('/dashboard') && pathname !== '/' && pathname !== '/login' && pathname !== '/signup'

  if (!shouldShowNavbar) {
    return null
  }

  return <Navbar />
}
