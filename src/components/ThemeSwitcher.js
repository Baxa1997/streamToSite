'use client'

import React from 'react'
import { useTheme } from '@/context/ThemeContext'
import { Sun, Moon, Monitor } from 'lucide-react'

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme()

  const getIcon = () => {
    if (theme === 'light') return <Sun className="w-5 h-5 text-yellow-500" />
    if (theme === 'dark') return <Moon className="w-5 h-5 text-blue-400" />
    return <Monitor className="w-5 h-5 text-gray-500" />
  }

  const getLabel = () => {
    if (theme === 'light') return 'Light Mode'
    if (theme === 'dark') return 'Dark Mode'
    return 'System Mode'
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
      aria-label={getLabel()}
      title={getLabel()}
    >
      {getIcon()}
    </button>
  )
}

export default ThemeSwitcher
