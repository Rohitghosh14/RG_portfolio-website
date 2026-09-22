import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  
  // Eye-follow logic for Get In Touch button
  const buttonRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { damping: 15, stiffness: 150, mass: 0.2 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    x.set((e.clientX - centerX) * 0.2) // Subtle pull factor
    y.set((e.clientY - centerY) * 0.2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left: Monogram */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl sm:text-2xl font-bold text-heading tracking-tight"
        >
          RG<span className="text-accent">.</span>
        </a>

        {/* Right: Links */}
        <div className="flex items-center gap-6 sm:gap-8 text-sm font-semibold text-body">
          <a 
            href="#projects" 
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-heading transition-colors hidden sm:block"
          >
            Projects
          </a>
          <a 
            href="#certifications"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#certifications')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-heading transition-colors hidden sm:block"
          >
            Certifications
          </a>
          <a 
            href="#contact"
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-1.5 text-heading hover:text-accent-hover transition-colors px-2 py-1"
          >
            <span className="relative inline-block">
              Get in Touch
              <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-accent-hover scale-x-100 group-hover:scale-x-0 origin-left transition-transform duration-300 ease-out" />
            </span>
            <motion.span 
              style={{ x: springX, y: springY }}
              className="inline-block"
            >
              ↗
            </motion.span>
          </a>
        </div>
      </div>
    </nav>
  )
}
