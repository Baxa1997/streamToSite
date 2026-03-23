/**
 * Mock API Service
 * 
 * Simulates backend API calls for Frontend-Only Mode.
 * All functions return promises with simulated delays.
 */

// ========== MOCK CHANNEL DATABASE ==========
const MOCK_CHANNELS = {
  youtube: [
    {
      id: 'ch_yt_techexplained',
      name: 'Tech Explained',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech',
      banner: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=300&fit=crop',
      subscribers: '1.2M',
      subscriberCount: 1200000,
      videoCount: 342,
      platform: 'youtube',
      description: 'We explain complex tech simply. From AI to quantum computing, we break it all down.',
      tags: ['Technology', 'AI', 'Science'],
    },
    {
      id: 'ch_yt_movieking',
      name: 'MovieKing Recaps',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=movie',
      banner: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=300&fit=crop',
      subscribers: '890K',
      subscriberCount: 890000,
      videoCount: 567,
      platform: 'youtube',
      description: 'Your ultimate guide to cinema. Movie breakdowns, theories, and explained endings.',
      tags: ['Movies', 'Entertainment', 'Reviews'],
    },
    {
      id: 'ch_yt_fitnessguru',
      name: 'FitnessGuru',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fitness',
      banner: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=300&fit=crop',
      subscribers: '2.5M',
      subscriberCount: 2500000,
      videoCount: 789,
      platform: 'youtube',
      description: 'Transform your body and mind. Workout routines, nutrition tips, and motivation.',
      tags: ['Fitness', 'Health', 'Lifestyle'],
    },
  ],
  tiktok: [
    {
      id: 'ch_tt_quicktips',
      name: 'QuickTips',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=quick',
      banner: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=300&fit=crop',
      subscribers: '5.8M',
      subscriberCount: 5800000,
      videoCount: 1200,
      platform: 'tiktok',
      description: '60-second life hacks that actually work. Follow for daily tips!',
      tags: ['Lifestyle', 'Tips', 'Viral'],
    },
  ],
  facebook: [
    {
      id: 'ch_fb_dailynews',
      name: 'Daily News Digest',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=news',
      banner: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=300&fit=crop',
      subscribers: '3.2M',
      subscriberCount: 3200000,
      videoCount: 2500,
      platform: 'facebook',
      description: 'Your daily dose of news, delivered in bite-sized videos.',
      tags: ['News', 'Current Events', 'Politics'],
    },
  ],
}

// ========== HELPER FUNCTIONS ==========
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)]

// Simulate network variability
const randomDelay = (min = 1000, max = 2000) => delay(min + Math.random() * (max - min))

// ========== MOCK API FUNCTIONS ==========

/**
 * Fetch channel data from a URL
 * Simulates: GET /api/channels/fetch?url=...
 */
export async function mockFetchChannel(url, platform = 'youtube') {
  await randomDelay(1200, 2000)
  
  // Simulate URL validation
  if (!url || url.length < 10) {
    throw new Error('Invalid channel URL. Please enter a valid YouTube, TikTok, or Facebook URL.')
  }

  // Get channels for the platform
  const platformChannels = MOCK_CHANNELS[platform] || MOCK_CHANNELS.youtube
  
  // Return a "found" channel (in real app, would parse URL and fetch from API)
  const channel = randomFromArray(platformChannels)
  
  return {
    success: true,
    channel: {
      ...channel,
      // Add some dynamic data
      lastVideoDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      isMonetized: Math.random() > 0.3,
    }
  }
}

/**
 * Verify channel ownership via bio check
 * Simulates: POST /api/verify/bio
 */
export async function mockVerifyBio(channelId, verificationCode) {
  await randomDelay(1800, 2500)
  
  // Simulate 90% success rate for demo purposes
  const isSuccess = Math.random() > 0.1
  
  if (isSuccess) {
    return {
      success: true,
      message: 'Ownership verified successfully!',
      verifiedAt: new Date().toISOString(),
    }
  } else {
    throw new Error(`Code "${verificationCode}" not found in bio. Please add it and try again.`)
  }
}

/**
 * Verify channel ownership via OAuth
 * Simulates: POST /api/verify/oauth
 */
export async function mockVerifyOAuth(platform, authCode) {
  await randomDelay(2000, 3000)
  
  return {
    success: true,
    message: `${platform} account connected and verified!`,
    verifiedAt: new Date().toISOString(),
    scope: ['channel.read', 'analytics.read'],
  }
}

/**
 * Generate a new blog post from a video
 * Simulates: POST /api/posts/generate
 */
export async function mockGeneratePost(videoUrl, siteId) {
  await randomDelay(3000, 5000)
  
  const mockPosts = [
    {
      title: 'The Future of AI: What 2026 Really Looks Like',
      excerpt: 'Artificial intelligence has evolved beyond our wildest predictions. Here\'s what\'s actually happening...',
      content: '<p>The landscape of artificial intelligence in 2026 is nothing like we predicted...</p>',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
      readTime: '8 min read',
      wordCount: 2450,
    },
    {
      title: 'Why This Movie Broke All Box Office Records',
      excerpt: 'Breaking down the phenomenon that took the world by storm and why it resonated with audiences...',
      content: '<p>When this movie first premiered, nobody expected what would happen next...</p>',
      thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=450&fit=crop',
      readTime: '6 min read',
      wordCount: 1820,
    },
  ]
  
  const post = randomFromArray(mockPosts)
  
  return {
    success: true,
    post: {
      id: `post_${Date.now()}`,
      ...post,
      status: 'published',
      createdAt: new Date().toISOString(),
      siteId,
    }
  }
}

/**
 * Get analytics for a site
 * Simulates: GET /api/sites/:id/analytics
 */
export async function mockGetAnalytics(siteId, period = '7d') {
  await randomDelay(800, 1200)
  
  const days = period === '30d' ? 30 : period === '24h' ? 1 : 7
  
  return {
    success: true,
    analytics: {
      period,
      totalViews: Math.floor(Math.random() * 50000) + 1000,
      uniqueVisitors: Math.floor(Math.random() * 30000) + 500,
      avgTimeOnSite: `${Math.floor(Math.random() * 5) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      bounceRate: `${Math.floor(Math.random() * 40) + 20}%`,
      topPosts: [
        { title: 'Most Popular Post', views: Math.floor(Math.random() * 10000) },
        { title: 'Second Best Post', views: Math.floor(Math.random() * 8000) },
        { title: 'Third Best Post', views: Math.floor(Math.random() * 5000) },
      ],
      trafficSources: {
        organic: Math.floor(Math.random() * 60) + 20,
        direct: Math.floor(Math.random() * 30) + 10,
        social: Math.floor(Math.random() * 20) + 5,
        referral: Math.floor(Math.random() * 10) + 2,
      },
      chartData: Array.from({ length: days }, (_, i) => ({
        date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        views: Math.floor(Math.random() * 5000) + 500,
        visitors: Math.floor(Math.random() * 3000) + 200,
      })),
    }
  }
}

/**
 * Update site settings
 * Simulates: PATCH /api/sites/:id
 */
export async function mockUpdateSite(siteId, updates) {
  await randomDelay(500, 1000)
  
  return {
    success: true,
    message: 'Site updated successfully',
    updatedAt: new Date().toISOString(),
  }
}

/**
 * Connect custom domain
 * Simulates: POST /api/sites/:id/domain
 */
export async function mockConnectDomain(siteId, domain) {
  await randomDelay(1500, 2500)
  
  // Simulate DNS check
  const dnsVerified = Math.random() > 0.3
  
  if (dnsVerified) {
    return {
      success: true,
      message: `Domain ${domain} connected successfully!`,
      sslStatus: 'provisioning',
      estimatedTime: '5-10 minutes',
    }
  } else {
    throw new Error('DNS records not found. Please add the CNAME record and try again.')
  }
}

/**
 * Sync channel videos
 * Simulates: POST /api/sites/:id/sync
 */
export async function mockSyncChannel(siteId) {
  await randomDelay(2000, 4000)
  
  const newVideos = Math.floor(Math.random() * 5) + 1
  
  return {
    success: true,
    message: `Found ${newVideos} new videos to convert!`,
    newVideos,
    lastSyncAt: new Date().toISOString(),
  }
}

// Export all functions
export default {
  mockFetchChannel,
  mockVerifyBio,
  mockVerifyOAuth,
  mockGeneratePost,
  mockGetAnalytics,
  mockUpdateSite,
  mockConnectDomain,
  mockSyncChannel,
}
