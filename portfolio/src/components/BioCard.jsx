import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaKaggle, FaLinkedin } from 'react-icons/fa6'
import CommitGraph from './CommitGraph'

export default function BioCard() {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="mb-16">
      {/* Part A: Showcase Card */}
      <div className="flex flex-col sm:flex-row gap-8 p-6 sm:p-8 border border-white/10 rounded-2xl bg-panel overflow-hidden mb-6">
        <div className="w-full sm:w-1/3 aspect-[4/5] sm:h-auto rounded-xl overflow-hidden relative flex-shrink-0">
          {!imgError ? (
            <img 
              src="/assets/rohit-photo.jpg" 
              alt="Rohit Ghosh" 
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-white/[0.02]">
              <span className="font-mono text-xs text-muted">[PHOTO PENDING]</span>
            </div>
          )}
          {/* Inner gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-panel/50 via-transparent to-transparent opacity-50" />
        </div>
        
        <div className="w-full sm:w-2/3 flex flex-col justify-center">
          <h3 className="text-3xl sm:text-4xl font-semibold text-heading mb-2">Rohit Ghosh</h3>
          <p className="text-accent text-sm font-mono tracking-wider mb-6">AI/ML Engineering Student</p>
          <div className="space-y-4 text-body text-sm leading-relaxed">
            <p>
              Based in Kolkata, India, specializing in the intersection of mathematics and applied machine learning.
            </p>
            <p>
              I am currently pursuing my B.Tech in Computer Science Engineering (AI & ML) from Techno India University, while balancing advanced certification work and independent research projects.
            </p>
            <p>
              I build machine learning and deep learning systems from scratch, moving beyond standard tutorials to engineer custom solutions like an image-dehazing network and a locally-run AI companion app. Driven by engineering rigor, my approach emphasizes reproducibility, meticulous documentation, and deep failure-mode analysis to ensure robust system performance.
            </p>
          </div>
        </div>
      </div>

      {/* Part B: Split Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Social Links */}
        <div className="border border-white/10 rounded-2xl bg-panel p-6 sm:p-8 flex flex-col justify-center gap-6">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted">Connect</h4>
          <div className="flex flex-col gap-4">
            <SocialLink icon={FaGithub} label="GitHub" href="https://github.com/Rohitghosh14" />
            <SocialLink icon={FaKaggle} label="Kaggle" href="https://www.kaggle.com/rohitghosh14" />
            <SocialLink icon={FaLinkedin} label="LinkedIn" href="https://www.linkedin.com/in/rohit-ghosh14" />
          </div>
        </div>
        
        {/* Right: Commit Graph */}
        <div className="border border-white/10 rounded-2xl bg-panel p-6 sm:p-8 flex flex-col h-full">
          <CommitGraph />
        </div>
      </div>
    </div>
  )
}

function SocialLink({ icon: Icon, label, href }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group flex items-center justify-between text-body hover:text-heading transition-colors py-2"
    >
      <div className="flex items-center gap-4">
        <Icon className="text-2xl opacity-80 group-hover:opacity-100 transition-opacity" />
        <span className="font-mono text-sm uppercase tracking-wider font-semibold">{label}</span>
      </div>
      <span className="text-muted group-hover:text-accent-hover transition-colors transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-300 text-lg">
        ↗
      </span>
    </a>
  )
}
