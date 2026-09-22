import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaKaggle, FaLinkedin } from 'react-icons/fa6'
import CommitGraph from './CommitGraph'

export default function BioCard() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <div className="mb-16 border border-white/10 rounded-2xl overflow-hidden bg-panel">
      {/* Short version (always visible) */}
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-heading mb-2">Rohit Ghosh</h3>
          <p className="text-body text-sm opacity-80">AI/ML Engineering Student based in Kolkata, India.</p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group inline-flex items-center gap-2 text-body hover:text-accent-hover transition-colors text-sm font-semibold"
        >
          <span className="relative inline-block">
            {isExpanded ? 'Close' : 'More'}
            <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-accent-hover scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
          </span>
          <span className="transform transition-transform duration-300">
            {isExpanded ? '↑' : '↓'}
          </span>
        </button>
      </div>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2 border-t border-white/5">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8">
                {/* Bio text */}
                <div className="space-y-4 text-body text-sm leading-relaxed">
                  <p>
                    Rohit Ghosh — AI/ML Engineering student from Kolkata, India, specializing in the intersection of mathematics and applied machine learning.
                  </p>
                  <p>
                    I am currently pursuing my B.Tech in Computer Science Engineering (AI & ML) from Techno India University, while balancing advanced certification work and independent research projects.
                  </p>
                  <p>
                    I focus on building machine learning and deep learning systems from scratch, moving beyond standard tutorials to engineer custom solutions like an image-dehazing network and a locally-run AI companion app. Driven by engineering rigor, my approach emphasizes reproducibility, meticulous documentation, and deep failure-mode analysis to ensure robust system performance.
                  </p>
                </div>

                {/* Photo / Contact Card slot */}
                <div className="hidden lg:flex flex-col w-full gap-4">
                  <div className="flex flex-col w-full bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
                    {/* Photo area */}
                    <div className="relative w-full aspect-square bg-white/[0.02] flex items-center justify-center overflow-hidden">
                      {!imgError ? (
                        <img 
                          src="/assets/rohit-photo.jpg" 
                          alt="Rohit Ghosh" 
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={() => setImgError(true)}
                        />
                      ) : (
                        <span className="font-mono text-xs text-muted relative z-10">[PHOTO PENDING]</span>
                      )}
                      {/* Inner gradient overlay for smooth transition to links below */}
                      <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent opacity-50" />
                    </div>
                    
                    {/* Links Area */}
                    <div className="p-4 flex flex-col gap-2 relative z-10 bg-panel border-t border-white/5">
                      <SocialLink icon={FaGithub} label="GitHub" href="https://github.com/Rohitghosh14" />
                      <SocialLink icon={FaKaggle} label="Kaggle" href="https://www.kaggle.com/rohitghosh14" />
                      <SocialLink icon={FaLinkedin} label="LinkedIn" href="https://www.linkedin.com/in/rohit-ghosh14" />
                    </div>
                  </div>
                  
                  {/* GitHub Commit Graph */}
                  <CommitGraph />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SocialLink({ icon: Icon, label, href }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group flex items-center justify-between text-body hover:text-heading transition-colors py-1.5"
    >
      <div className="flex items-center gap-3">
        <Icon className="text-lg opacity-80 group-hover:opacity-100 transition-opacity" />
        <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">{label}</span>
      </div>
      <span className="text-muted group-hover:text-accent-hover transition-colors transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-300">
        ↗
      </span>
    </a>
  )
}
