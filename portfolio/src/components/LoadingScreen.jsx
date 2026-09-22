import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [currentDate, setCurrentDate] = useState(() => {
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date().toLocaleDateString('en-US', dateOptions).toUpperCase()
  })

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('hasSeenLoading')
    if (hasSeen) {
      setIsVisible(false)
      onComplete()
      return
    }

    // Simulate loading progress 0 -> 100
    const duration = 5000 // 5 seconds total loading phase per request
    const intervalTime = 30
    const steps = duration / intervalTime
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const newProgress = Math.min(Math.floor((currentStep / steps) * 100), 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(timer)
        setTimeout(() => {
          setIsVisible(false)
          sessionStorage.setItem('hasSeenLoading', 'true')
          setTimeout(onComplete, 600) // Wait for fade out animation
        }, 400) // Small pause at 100%
      }
    }, intervalTime)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]"
        >
          {/* Video Background - Dimmed */}
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen"
            src="/assets/avatar%20video.mp4"
            autoPlay
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-[#000000]/40 pointer-events-none" />

          {/* System Boot Overlay Content */}
          <div className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center">
            {/* Centered Monogram */}
            <div className="mb-8">
              <span className="text-3xl font-bold text-[#F2F2F0] tracking-tight">
                RG<span className="text-[#2563EB]">.</span>
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-[2px] bg-[#FFFFFF]/10 rounded-full mb-4 overflow-hidden relative">
              <div 
                className="absolute top-0 left-0 h-full bg-[#2563EB] transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Status Line */}
            <div className="w-full flex justify-between items-center font-mono text-[10px] sm:text-xs text-[#8A8A8A] tracking-widest uppercase mb-2">
              <span>Initializing System</span>
              <span className="text-[#F2F2F0] font-semibold">{progress}%</span>
            </div>

            {/* Date Readout */}
            <div className="w-full flex justify-start font-mono text-[10px] text-[#8A8A8A] opacity-80 tracking-widest uppercase">
              <span>{currentDate}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
