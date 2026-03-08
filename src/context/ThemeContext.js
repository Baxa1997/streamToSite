'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system') // 'light', 'dark', 'system'

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setTheme(storedTheme)
      console.log('Initial theme from localStorage:', storedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
      console.log('Initial theme from system preference: dark')
    } else {
      setTheme('light')
      console.log('Initial theme from system preference: light')
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')
    let currentTheme = theme

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
      currentTheme = systemTheme
      console.log('Applying system theme:', systemTheme)
    } else {
      root.classList.add(theme)
      console.log('Applying theme:', theme)
    }

    localStorage.setItem('theme', currentTheme)
    console.log('HTML element classes:', root.classList.value)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => {
      let newTheme
      if (prevTheme === 'light') {
        newTheme = 'dark'
      } else if (prevTheme === 'dark') {
        newTheme = 'system'
      } else {
        newTheme = 'light' // From system, go to light
      }
      console.log('Toggling theme from', prevTheme, 'to', newTheme)
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
