import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const cursorRotation = useMotionValue(0)
  
  // Spring physics for smooth but snappy follow
  const springConfig = { damping: 25, stiffness: 600, mass: 0.1 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  const cursorRotationSpring = useSpring(cursorRotation, { damping: 25, stiffness: 400 })

  const lastPos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Check if device is touch based
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const moveCursor = (e) => {
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      
      // Update position
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      
      // Calculate rotation if moved enough
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI)
        
        // Prevent 360 spin by finding shortest angular path
        let currentRotation = cursorRotation.get()
        let diff = angle - (currentRotation % 360)
        if (diff > 180) diff -= 360
        if (diff < -180) diff += 360
        
        cursorRotation.set(currentRotation + diff)
      }

      lastPos.current = { x: e.clientX, y: e.clientY }
      
      if (!isVisible) setIsVisible(true)

      // Determine if hovered element is clickable
      const target = e.target
      const isClickable = 
        target.closest('a') || 
        target.closest('button') || 
        window.getComputedStyle(target).cursor === 'pointer'
        
      setIsPointer(!!isClickable)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY, cursorRotation, isVisible])

  if (isTouch) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0
      }}
    >
      <motion.div 
        style={{ rotate: cursorRotationSpring }}
        className={`relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 ease-out ${
          isPointer ? 'scale-125' : 'scale-100'
        }`}
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="var(--color-accent, #4ade80)" 
          className="drop-shadow-md"
        >
          <polygon points="22,12 2,2 7,12 2,22" />
        </svg>
      </motion.div>
    </motion.div>
  )
}
