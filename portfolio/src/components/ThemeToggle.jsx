import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('system') // 'light', 'dark', 'system'
  const [isVisible, setIsVisible] = useState(true)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-preference') || 'system'
    setTheme(savedTheme)
  }, [])

  // Apply theme to HTML root
  useEffect(() => {
    const root = window.document.documentElement
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      if (systemTheme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    } else {
      if (theme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }

    localStorage.setItem('theme-preference', theme)
  }, [theme])

  // Listen for system theme changes if set to 'system'
  useEffect(() => {
    if (theme !== 'system') return
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const root = window.document.documentElement
      if (mediaQuery.matches) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  // Scroll detection to auto-hide
  useEffect(() => {
    let timeoutId
    
    const handleScroll = () => {
      setIsVisible(false)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsVisible(true)
      }, 750) // Reappear ~0.75s after scrolling stops
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  const options = [
    { id: 'system', icon: FiMonitor, label: 'System' },
    { id: 'light', icon: FiSun, label: 'Light' },
    { id: 'dark', icon: FiMoon, label: 'Dark' },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-1 p-1 bg-panel border border-white/10 rounded-full shadow-lg backdrop-blur-md"
        >
          {options.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setTheme(id)}
              aria-label={`Set theme to ${label}`}
              className={`p-2 rounded-full transition-colors flex items-center justify-center ${
                theme === id 
                  ? 'bg-white/10 text-heading' 
                  : 'text-muted hover:text-heading hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
