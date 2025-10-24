import { ref, onMounted, watch } from 'vue'
import type { Theme } from '@/types'

export const useTheme = () => {
  const theme = ref<Theme>('light')

  // Check if we're in a browser environment
  const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'

  // Initialize theme from localStorage or system preference
  const initTheme = () => {
    if (!isBrowser) return

    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        theme.value = savedTheme
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        theme.value = prefersDark ? 'dark' : 'light'
      }
      applyTheme()
    } catch (error) {
      // Silently fail if localStorage is not available
      console.warn('Theme initialization failed:', error)
    }
  }

  // Apply theme to document
  const applyTheme = () => {
    if (!isBrowser) return

    try {
      document.documentElement.setAttribute('data-theme', theme.value)
      localStorage.setItem('theme', theme.value)
    } catch (error) {
      // Silently fail if localStorage is not available
      console.warn('Theme application failed:', error)
    }
  }

  // Toggle theme
  const toggleTheme = () => {
    try {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
      applyTheme()
    } catch (error) {
      console.warn('Theme toggle failed:', error)
    }
  }

  // Set specific theme
  const setTheme = (newTheme: Theme) => {
    try {
      theme.value = newTheme
      applyTheme()
    } catch (error) {
      console.warn('Theme set failed:', error)
    }
  }

  // Watch for theme changes and apply them
  watch(theme, applyTheme)

  // Initialize theme on mount
  onMounted(() => {
    if (!isBrowser) return

    initTheme()

    try {
      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        // Only auto-update if user hasn't manually set a preference
        try {
          const savedTheme = localStorage.getItem('theme')
          if (!savedTheme) {
            theme.value = e.matches ? 'dark' : 'light'
            applyTheme()
          }
        } catch (error) {
          console.warn('System theme change handler failed:', error)
        }
      }

      mediaQuery.addEventListener('change', handleSystemThemeChange)

      // Cleanup listener on unmount
      return () => {
        try {
          mediaQuery.removeEventListener('change', handleSystemThemeChange)
        } catch (error) {
          console.warn('Failed to remove theme change listener:', error)
        }
      }
    } catch (error) {
      console.warn('Theme initialization in onMounted failed:', error)
    }
  })

  return {
    theme,
    toggleTheme,
    setTheme,
    initTheme
  }
}
