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

// Mock database - In production, this would be a real database query
const customDomainDatabase = {
  'movieking.com': 'john',
  'techreviews.net': 'sarah',
  'gamernews.io': 'mike',
}

// Mock function to lookup tenant by custom domain
async function getTenantByCustomDomain(domain) {
  // In production, this would be:
  // const tenant = await db.customDomains.findUnique({ where: { domain } })
  return customDomainDatabase[domain] || null
}

export default async function middleware(req) {
  const url = req.nextUrl
  const hostname = req.headers.get('host') || ''
  const path = url.pathname

  console.log(`[Middleware] Request: ${hostname}${path}`)

  // Define your main domain (in production, this would be streamtosite.com)
  const mainDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000'
  const appSubdomain = process.env.NEXT_PUBLIC_APP_SUBDOMAIN || 'app'

  // Remove port for comparison (localhost:3000 → localhost)
  const hostnameWithoutPort = hostname.split(':')[0]
  const mainDomainWithoutPort = mainDomain.split(':')[0]

  // ============================================
  // CASE 1: Dashboard (app.streamtosite.com)
  // ============================================
  if (
    hostname === `${appSubdomain}.${mainDomain}` ||
    hostname === `${appSubdomain}.${mainDomainWithoutPort}` ||
    (hostname.includes('localhost') && url.searchParams.get('app') === 'true')
  ) {
    console.log('[Middleware] → Dashboard (app subdomain)')
    
    // Allow dashboard routes to pass through normally
    if (path.startsWith('/dashboard') || path.startsWith('/api')) {
      return NextResponse.next()
    }
    
    // Redirect root to dashboard
    if (path === '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    
    return NextResponse.next()
  }

  // ============================================
  // CASE 2: Main Marketing Site (streamtosite.com)
  // ============================================
  if (
    hostname === mainDomain ||
    hostname === mainDomainWithoutPort ||
    hostname === `www.${mainDomain}` ||
    hostname === `www.${mainDomainWithoutPort}` ||
    hostname.endsWith('.vercel.app') || // Allow Vercel deployments
    hostname.endsWith('.vercel.com') || // Allow Vercel preview deployments
    (hostname.includes('localhost') && !url.searchParams.get('subdomain') && !url.searchParams.get('app'))
  ) {
    console.log('[Middleware] → Main marketing site')
    
    // Allow normal routing for marketing pages
    if (path.startsWith('/dashboard') || path.startsWith('/api') || path.startsWith('/preview')) {
      return NextResponse.next()
    }
    
    return NextResponse.next()
  }

  // ============================================
  // CASE 3: Subdomain (john.streamtosite.com)
  // ============================================
  let subdomain = null

  if (hostname.includes('localhost')) {
    // Development: Use query parameter
    subdomain = url.searchParams.get('subdomain')
  } else {
    // Production: Extract from hostname
    const hostParts = hostname.split('.')
    
    // Check if we have a subdomain (more than 2 parts)
    if (hostParts.length > 2) {
      const potentialSubdomain = hostParts[0]
      
      // Ignore common subdomains
      const ignoredSubdomains = ['www', appSubdomain, 'api', 'admin']
      if (!ignoredSubdomains.includes(potentialSubdomain)) {
        subdomain = potentialSubdomain
      }
    }
  }

  if (subdomain) {
    // Rewrite to /site/[subdomain]/[...path]
    const rewritePath = `/site/${subdomain}${path === '/' ? '' : path}`
    
    console.log(`[Middleware] Subdomain detected: ${subdomain}`)
    console.log(`[Middleware] Rewriting ${path} → ${rewritePath}`)
    
    return NextResponse.rewrite(new URL(rewritePath, req.url))
  }

  // ============================================
  // CASE 4: Custom Domain (movieking.com)
  // ============================================
  // If we reach here and it's not localhost, it's a custom domain
  if (!hostname.includes('localhost')) {
    console.log(`[Middleware] Checking custom domain: ${hostname}`)
    
    // Lookup tenant in database
    const tenant = await getTenantByCustomDomain(hostname)
    
    if (tenant) {
      // Rewrite to the tenant's site
      const rewritePath = `/site/${tenant}${path === '/' ? '' : path}`
      
      console.log(`[Middleware] Custom domain found: ${hostname} → ${tenant}`)
      console.log(`[Middleware] Rewriting ${path} → ${rewritePath}`)
      
      return NextResponse.rewrite(new URL(rewritePath, req.url))
    } else {
      console.log(`[Middleware] Custom domain not found: ${hostname}`)
      
      // Custom domain not configured - show error page
      return NextResponse.rewrite(new URL('/domain-not-found', req.url))
    }
  }

  // Default: continue normally
  console.log('[Middleware] → Default (no rewrite)')
  return NextResponse.next()
}
