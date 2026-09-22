import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const [videoError, setVideoError] = useState(false)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      } 
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  }

  return (
    <section className="min-h-screen relative flex flex-col justify-center pt-24 pb-20 px-6 max-w-7xl mx-auto">
      {/* Floating Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 rounded-3xl">
        <motion.div
          animate={{ x: [0, 80], y: [0, -60] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-accent opacity-20 blur-[80px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -100], y: [0, 80] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-accent opacity-20 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, 60], y: [0, 50] }}
          transition={{ duration: 22, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="absolute top-[40%] right-[30%] w-[250px] h-[250px] bg-accent opacity-15 blur-[60px] rounded-full"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-20 items-center lg:items-start relative z-10"
      >
        {/* Left Column: Content */}
        <div className="flex flex-col items-start order-2 lg:order-1">
          <motion.p 
            variants={itemVariants}
            className="font-mono text-xs tracking-widest uppercase text-muted mb-8"
          >
            [00] AI & ML ENGINEER / KOLKATA, INDIA
          </motion.p>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-heading leading-[1.1] tracking-tight mb-8"
          >
            Building intelligent, data-driven ML systems{' '}
            <span className="italic text-accent font-medium whitespace-nowrap">from first principles.</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-body max-w-2xl leading-relaxed mb-10"
          >
            AI & ML undergraduate skilled in Python, Machine Learning, Data Analysis, and AI application development, passionate about building intelligent data-driven solutions.
          </motion.p>
          
          {/* Button Row */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-6 mb-12"
          >
            <motion.a 
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="relative overflow-hidden inline-flex items-center justify-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 text-heading text-sm font-semibold px-7 py-3.5 rounded-full transition-colors duration-300"
            >
              <span className="absolute inset-0 rounded-full border-t border-white/20 pointer-events-none" />
              SEE PROJECTS →
            </motion.a>
            
            <a 
              href="https://github.com/Rohitghosh14" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group inline-flex items-center gap-2 text-body hover:text-accent-hover transition-colors text-sm font-semibold"
            >
              <span className="relative inline-block">
                GitHub profile
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-accent-hover scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
              </span>
              <span className="transform transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>

            <a 
              href="/assets/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group inline-flex items-center gap-2 text-body hover:text-accent-hover transition-colors text-sm font-semibold"
            >
              <span className="relative inline-block">
                Resume
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-accent-hover scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
              </span>
              <span className="transform transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          </motion.div>

          {/* Open to opportunities Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 max-w-xl"
          >
            <div className="mt-1.5 w-2 h-2 rounded-full bg-accent animate-pulse flex-shrink-0" />
            <div className="flex flex-col gap-1">
              <span className="text-heading text-sm font-semibold">Open to opportunities</span>
              <span className="text-muted text-sm leading-relaxed">
                AI/ML engineering roles, research collaborations, internships.
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Photo / Avatar Slot */}
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] mx-auto lg:mx-0 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden order-1 lg:order-2 lg:mt-8 group bg-[#000]"
        >
          {!videoError ? (
            <>
              <video
                className="absolute inset-0 w-full h-full object-cover dark:mix-blend-screen opacity-100"
                src="/assets/avatar%20video.mp4"
                autoPlay
                loop
                muted
                playsInline
                onError={() => setVideoError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-accent/5 mix-blend-overlay"></div>
              <span className="font-mono text-xs text-muted tracking-widest uppercase relative z-10 px-4 text-center">
                [PHOTO PENDING]
              </span>
              <span className="text-xs text-body/50 text-center px-8 relative z-10">
                Awaiting avatar video
              </span>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Bottom-right label */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 right-6 hidden lg:block text-right"
      >
        <p className="font-mono text-[10px] tracking-widest text-muted/60 uppercase">
          / TECHNO INDIA UNIVERSITY · AI & ML ENGINEERING STUDENT
        </p>
      </motion.div>
    </section>
  )
}
