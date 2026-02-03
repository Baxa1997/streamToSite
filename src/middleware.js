import { NextResponse } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}

export default async function middleware(req) {
  const url = req.nextUrl
  const hostname = req.headers.get('host') || ''

  // Get the pathname (e.g. /, /dashboard, /about)
  const path = url.pathname

  // Define your main domain (in production, this would be streamtosite.com)
  const mainDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000'

  // Extract subdomain
  // For localhost:3000, we'll use a query parameter for testing
  // For production, we'll use actual subdomains
  let subdomain = null

  if (hostname.includes('localhost')) {
    // Development: Use query parameter
    // Example: localhost:3000?subdomain=john
    subdomain = url.searchParams.get('subdomain')
  } else {
    // Production: Extract from hostname
    // Example: john.streamtosite.com → subdomain = "john"
    const hostParts = hostname.split('.')
    
    // Check if we have a subdomain (more than 2 parts)
    if (hostParts.length > 2) {
      subdomain = hostParts[0]
      
      // Ignore common subdomains
      const ignoredSubdomains = ['www', 'app', 'api', 'admin']
      if (ignoredSubdomains.includes(subdomain)) {
        subdomain = null
      }
    }
  }

  // If we have a subdomain, rewrite to the site route
  if (subdomain) {
    // Rewrite to /site/[subdomain]/[...path]
    const rewritePath = `/site/${subdomain}${path === '/' ? '' : path}`
    
    console.log(`[Middleware] Subdomain detected: ${subdomain}`)
    console.log(`[Middleware] Rewriting ${path} → ${rewritePath}`)
    
    return NextResponse.rewrite(new URL(rewritePath, req.url))
  }

  // If accessing /dashboard or /api, continue normally
  if (path.startsWith('/dashboard') || path.startsWith('/api') || path.startsWith('/preview')) {
    return NextResponse.next()
  }

  // For root domain, continue to landing page
  return NextResponse.next()
}
