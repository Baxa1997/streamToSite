'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import UrlInputSection from '@/components/UrlInputSection'
import BlogPreviewCard from '@/components/BlogPreviewCard'
import ProductSidebar from '@/components/ProductSidebar'
import LegalShieldToggle from '@/components/LegalShieldToggle'
import { useRouter } from 'next/navigation'

export default function StudioPage() {
  const router = useRouter()
  const [previewData, setPreviewData] = useState(null)
  const [showFullEditor, setShowFullEditor] = useState(false)
  const [legalShieldEnabled, setLegalShieldEnabled] = useState(true)

  const handleUrlDetected = (data) => {
    // Called when valid YouTube URL is detected
    setPreviewData(data)
  }

  const handleGenerate = () => {
    // Called when user clicks "Generate Site"
    setShowFullEditor(true)
  }

  const handleEdit = () => {
    // Navigate to full editor
    router.push('/dashboard/editor/1')
  }

  const handlePublish = () => {
    // Handle publish action
    console.log('Publishing post...')
    // In production, this would create the post and redirect
    router.push('/dashboard')
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-16">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-gradient">Content Studio</span>
          </h1>
          <p className="text-text/70">
            Transform any video into an SEO-optimized blog post in seconds
          </p>
        </div>

        {/* URL Input Section */}
        <UrlInputSection 
          onUrlDetected={handleUrlDetected}
          onGenerate={handleGenerate}
        />

        {/* Blog Preview Card (appears after URL is detected) */}
        {previewData && (
          <BlogPreviewCard 
            data={previewData}
            onEdit={handleEdit}
            onPublish={handlePublish}
          />
        )}

        {/* Advanced Options (shown after preview) */}
        {previewData && showFullEditor && (
          <>
            {/* Legal Shield Toggle */}
            <div className="max-w-4xl mx-auto animate-slide-up">
              <LegalShieldToggle 
                enabled={legalShieldEnabled}
                onChange={setLegalShieldEnabled}
              />
            </div>

            {/* Product Matcher Sidebar */}
            <div className="max-w-4xl mx-auto animate-slide-up">
              <ProductSidebar 
                videoTitle={previewData.title}
                onAddProduct={(product, html) => {
                  console.log('Product added:', product)
                }}
              />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
