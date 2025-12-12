'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'blue' | 'green' | 'purple' | 'orange' | 'cyan'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize theme from localStorage immediately to prevent flash
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme
      if (savedTheme && ['blue', 'green', 'purple', 'orange', 'cyan'].includes(savedTheme)) {
        // Apply theme immediately to prevent flash
        document.documentElement.setAttribute('data-theme', savedTheme)
        return savedTheme
      }
    }
    return 'cyan'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
