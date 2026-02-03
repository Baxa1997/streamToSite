'use client'

import { useState, useEffect } from 'react'
import { Package, Plus, ExternalLink, Star, TrendingUp, Sparkles } from 'lucide-react'

// Mock product database
const PRODUCT_DATABASE = {
  camera: [
    {
      id: 'cam-001',
      name: 'Sony A7 IV Mirrorless Camera',
      price: '$2,498.00',
      rating: 4.8,
      reviews: 1247,
      commission: '4.5%',
      image: '📷',
      affiliate: 'amazon.com/dp/B09JZT6YK5?tag=yoursite-20'
    },
    {
      id: 'cam-002',
      name: 'Canon EOS R6 Mark II',
      price: '$2,499.00',
      rating: 4.9,
      reviews: 892,
      commission: '4.0%',
      image: '📸',
      affiliate: 'amazon.com/dp/B0BKZ1V3YZ?tag=yoursite-20'
    },
  ],
  movie: [
    {
      id: 'mov-001',
      name: 'Inception (4K Ultra HD + Blu-ray)',
      price: '$24.99',
      rating: 4.9,
      reviews: 15234,
      commission: '5.0%',
      image: '🎬',
      affiliate: 'amazon.com/dp/B08CVZW8KL?tag=yoursite-20'
    },
    {
      id: 'mov-002',
      name: 'The Dark Knight Trilogy (4K)',
      price: '$39.99',
      rating: 4.9,
      reviews: 8921,
      commission: '5.0%',
      image: '🦇',
      affiliate: 'amazon.com/dp/B07YFXFQVZ?tag=yoursite-20'
    },
  ],
  phone: [
    {
      id: 'phn-001',
      name: 'iPhone 15 Pro Max',
      price: '$1,199.00',
      rating: 4.7,
      reviews: 3421,
      commission: '3.0%',
      image: '📱',
      affiliate: 'amazon.com/dp/B0CHX3TW7P?tag=yoursite-20'
    },
    {
      id: 'phn-002',
      name: 'Samsung Galaxy S24 Ultra',
      price: '$1,299.99',
      rating: 4.8,
      reviews: 2156,
      commission: '3.5%',
      image: '📲',
      affiliate: 'amazon.com/dp/B0CMDWC5KL?tag=yoursite-20'
    },
  ],
}

export default function ProductSidebar({ videoTitle = '', onAddProduct }) {
  const [detectedProducts, setDetectedProducts] = useState([])
  const [addedProducts, setAddedProducts] = useState(new Set())

  useEffect(() => {
    // Product detection logic
    const title = videoTitle.toLowerCase()
    let products = []

    if (title.includes('camera') || title.includes('photography')) {
      products = [...products, ...PRODUCT_DATABASE.camera]
    }
    if (title.includes('movie') || title.includes('film') || title.includes('inception') || title.includes('nolan')) {
      products = [...products, ...PRODUCT_DATABASE.movie]
    }
    if (title.includes('phone') || title.includes('iphone') || title.includes('samsung')) {
      products = [...products, ...PRODUCT_DATABASE.phone]
    }

    setDetectedProducts(products)
  }, [videoTitle])

  const handleAddProduct = (product) => {
    setAddedProducts(prev => new Set([...prev, product.id]))
    
    // Generate affiliate button HTML
    const buttonHTML = `
<div class="affiliate-product-card">
  <div class="product-info">
    <h4>${product.name}</h4>
    <div class="product-meta">
      <span class="price">${product.price}</span>
      <span class="rating">⭐ ${product.rating} (${product.reviews} reviews)</span>
    </div>
  </div>
  <a href="https://${product.affiliate}" target="_blank" class="buy-button">
    Buy on Amazon →
  </a>
</div>
    `.trim()

    // Call parent callback to insert into editor
    if (onAddProduct) {
      onAddProduct(product, buttonHTML)
    }
  }

  if (detectedProducts.length === 0) {
    return (
      <div className="bento-card">
        <div className="flex items-center space-x-3 mb-4">
          <Package className="w-5 h-5 text-text/50" />
          <h3 className="text-lg font-bold text-text/50">Detected Products</h3>
        </div>
        <div className="text-center py-8">
          <Sparkles className="w-12 h-12 text-text/20 mx-auto mb-3" />
          <p className="text-sm text-text/50">
            No products detected yet. Add a video title containing "Camera," "Movie," or "Phone" to see suggestions.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bento-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Detected Products</h3>
            <p className="text-xs text-text/60">{detectedProducts.length} matches found</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-xs text-green-400">
          <TrendingUp className="w-3 h-3" />
          <span>High converting</span>
        </div>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
        {detectedProducts.map((product) => {
          const isAdded = addedProducts.has(product.id)
          
          return (
            <div
              key={product.id}
              className={`
                rounded-xl p-4 border transition-all duration-300
                ${isAdded 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : 'bg-surface border-border-color hover:border-primary/30'
                }
              `}
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className="text-3xl">{product.image}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm mb-1 line-clamp-2">
                    {product.name}
                  </h4>
                  <div className="flex items-center space-x-2 text-xs text-text/60 mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span>{product.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{product.reviews} reviews</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">{product.price}</span>
                    <span className="text-xs text-green-400 font-medium">+{product.commission}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleAddProduct(product)}
                  disabled={isAdded}
                  className={`
                    flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg
                    font-medium text-sm transition-all duration-300
                    ${isAdded
                      ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                      : 'bg-primary hover:bg-primary/90 text-white hover:scale-105'
                    }
                  `}
                >
                  {isAdded ? (
                    <>
                      <Plus className="w-4 h-4 rotate-45" />
                      <span>Added to Post</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Post</span>
                    </>
                  )}
                </button>
                
                <a
                  href={`https://${product.affiliate}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost p-2"
                  title="Preview on Amazon"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {/* Revenue Estimate */}
      <div className="mt-4 pt-4 border-t border-border-color">
        <div className="glass rounded-lg p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text/60">Potential Monthly Revenue</span>
            <span className="font-bold text-green-400">$120-$340</span>
          </div>
          <div className="mt-2 text-xs text-text/50">
            Based on average CTR and conversion rates
          </div>
        </div>
      </div>
    </div>
  )
}
