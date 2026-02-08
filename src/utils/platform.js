/**
 * Platform Detection Utility
 * 
 * Identifies the source platform from a URL
 * Supports: YouTube, TikTok, Facebook
 */

// Platform regex patterns
const PLATFORM_PATTERNS = {
  youtube: [
    /^(https?:\/\/)?(www\.)?youtube\.com\/@?[\w-]+/i,
    /^(https?:\/\/)?(www\.)?youtube\.com\/channel\/[\w-]+/i,
    /^(https?:\/\/)?(www\.)?youtube\.com\/c\/[\w-]+/i,
    /^(https?:\/\/)?(www\.)?youtube\.com\/user\/[\w-]+/i,
    /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+/i,
    /^(https?:\/\/)?youtu\.be\/[\w-]+/i,
  ],
  tiktok: [
    /^(https?:\/\/)?(www\.|vm\.)?tiktok\.com\/@[\w.-]+/i,
    /^(https?:\/\/)?(www\.)?tiktok\.com\/[\w]+/i,
  ],
  facebook: [
    /^(https?:\/\/)?(www\.|m\.)?facebook\.com\/[\w.-]+/i,
    /^(https?:\/\/)?(www\.)?fb\.com\/[\w.-]+/i,
    /^(https?:\/\/)?(www\.)?fb\.watch\/[\w]+/i,
  ],
}

// Platform configurations
export const PLATFORM_CONFIGS = {
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    color: '#FF0000',
    bgColor: 'bg-red-500',
    textColor: 'text-red-500',
    borderColor: 'border-red-500',
    hoverBg: 'hover:bg-red-500/10',
    gradientFrom: 'from-red-500',
    gradientTo: 'to-red-600',
    icon: 'youtube',
    placeholder: 'https://youtube.com/@yourchannel',
  },
  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    color: '#000000',
    bgColor: 'bg-black',
    textColor: 'text-neutral-900',
    borderColor: 'border-neutral-900',
    hoverBg: 'hover:bg-neutral-900/10',
    gradientFrom: 'from-neutral-800',
    gradientTo: 'to-neutral-900',
    icon: 'tiktok',
    placeholder: 'https://tiktok.com/@yourchannel',
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    color: '#1877F2',
    bgColor: 'bg-blue-600',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-600',
    hoverBg: 'hover:bg-blue-600/10',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-blue-700',
    icon: 'facebook',
    placeholder: 'https://facebook.com/yourchannel',
  },
}

/**
 * Detects the platform from a URL
 * @param {string} url - The URL to analyze
 * @returns {'youtube' | 'tiktok' | 'facebook' | 'unknown'} - The detected platform
 */
export function detectPlatform(url) {
  if (!url || typeof url !== 'string') {
    return 'unknown'
  }

  const normalizedUrl = url.trim().toLowerCase()

  for (const [platform, patterns] of Object.entries(PLATFORM_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(normalizedUrl)) {
        return platform
      }
    }
  }

  return 'unknown'
}

/**
 * Validates if a URL is from a supported platform
 * @param {string} url - The URL to validate
 * @returns {boolean} - Whether the URL is from a supported platform
 */
export function isSupportedPlatform(url) {
  return detectPlatform(url) !== 'unknown'
}

/**
 * Gets platform configuration by ID
 * @param {string} platformId - The platform ID
 * @returns {object|null} - The platform configuration or null
 */
export function getPlatformConfig(platformId) {
  return PLATFORM_CONFIGS[platformId] || null
}

/**
 * Extracts the channel handle/ID from a URL
 * @param {string} url - The URL to parse
 * @param {string} platform - The platform type
 * @returns {string|null} - The channel handle or null
 */
export function extractChannelHandle(url, platform) {
  if (!url) return null

  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
    const pathname = urlObj.pathname

    switch (platform) {
      case 'youtube':
        // Handle @username format
        if (pathname.includes('@')) {
          const match = pathname.match(/@([\w-]+)/)
          return match ? match[1] : null
        }
        // Handle /channel/ID format
        if (pathname.includes('/channel/')) {
          const match = pathname.match(/\/channel\/([\w-]+)/)
          return match ? match[1] : null
        }
        // Handle /c/name format
        if (pathname.includes('/c/')) {
          const match = pathname.match(/\/c\/([\w-]+)/)
          return match ? match[1] : null
        }
        // Handle /user/name format
        if (pathname.includes('/user/')) {
          const match = pathname.match(/\/user\/([\w-]+)/)
          return match ? match[1] : null
        }
        return null

      case 'tiktok':
        const tiktokMatch = pathname.match(/@([\w.-]+)/)
        return tiktokMatch ? tiktokMatch[1] : null

      case 'facebook':
        // Remove common prefixes
        const fbPath = pathname.replace(/^\//, '').split('/')[0]
        return fbPath && fbPath !== 'watch' ? fbPath : null

      default:
        return null
    }
  } catch {
    return null
  }
}

/**
 * Validates URL format
 * @param {string} url - The URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
export function isValidUrl(url) {
  if (!url) return false
  
  try {
    const urlToTest = url.startsWith('http') ? url : `https://${url}`
    new URL(urlToTest)
    return true
  } catch {
    return false
  }
}

export default {
  detectPlatform,
  isSupportedPlatform,
  getPlatformConfig,
  extractChannelHandle,
  isValidUrl,
  PLATFORM_CONFIGS,
}
