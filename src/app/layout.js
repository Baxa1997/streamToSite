import './globals.css'

export const metadata = {
  title: 'StreamToSite - Turn Videos into SEO-Optimized Blogs',
  description: 'A Website-as-a-Service platform for Movie Recappers and News Creators. Convert YouTube videos into fully SEO-optimized, AdSense-ready blog posts.',
  keywords: 'YouTube to blog, video to website, content creator tools, SEO optimization, AdSense monetization',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
