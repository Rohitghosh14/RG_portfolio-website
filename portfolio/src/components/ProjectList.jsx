// ProjectList.jsx — Left panel: clickable project name list + active project details.
// Per design.md v2: vertical list, muted gray default, active = bold white + subtle pill,
// tags/description/link rendered underneath for the active project.
// Hover/active items show a ↗ expand icon on the right.
// Tech tags rendered as icon+label pills using react-icons Simple Icons set.

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SiPython,
  SiScikitlearn,
  SiStreamlit,
  SiPytorch,
  SiFastapi,
  SiReact,
  SiNumpy,
  SiPandas,
  SiGit,
} from 'react-icons/si'
import LanguageBar from './LanguageBar'

// Map tag text → Simple Icons component. Tags without a match render text-only.
const tagIcons = {
  'Python': SiPython,
  'PyTorch': SiPytorch,
  'Scikit-learn': SiScikitlearn,
  'FastAPI': SiFastapi,
  'Streamlit': SiStreamlit,
  'React': SiReact,
  'NumPy': SiNumpy,
  'Pandas': SiPandas,
  'Git': SiGit,
}

export default function ProjectList({ projects, activeProjectId, onSelectProject, onExpandProject }) {
  const activeProject = projects.find((p) => p.id === activeProjectId)
  const [hoveredItem, setHoveredItem] = useState(null)

  return (
    <div className="flex flex-col">
      {/* Project name list */}
      <ul
        className="flex flex-col gap-1 mb-8 relative"
        onMouseLeave={() => setHoveredItem(null)}
      >
        {projects.map((project) => {
          const isActive = project.id === activeProjectId
          const isHovered = project.id === hoveredItem
          const showPill = isActive || isHovered

          return (
            <li
              key={project.id}
              onMouseEnter={() => setHoveredItem(project.id)}
              className="relative"
            >
              {showPill && (
                <motion.div
                  layoutId="project-pill"
                  className={`absolute inset-0 rounded-lg ${
                    isActive ? 'bg-white/[0.06]' : 'bg-white/[0.04]'
                  }`}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <div
                onClick={() => onSelectProject(project.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject(project.id);
                  }
                }}
                className={`relative z-10 group/item w-full text-left px-4 py-2.5 rounded-lg font-sans text-sm transition-colors duration-200 flex items-center cursor-pointer ${
                  isActive
                    ? 'text-heading font-semibold'
                    : 'text-muted hover:text-heading'
                }`}
              >
                <span className="font-mono text-xs tracking-wider mr-2 opacity-50">
                  [{project.order}]
                </span>
                <span className="flex-1 truncate">{project.name}</span>
                {/* ↗ icon — visible on hover or when active */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (onExpandProject) onExpandProject(project.id)
                  }}
                  className={`ml-2 p-2 -mr-2 text-xs transition-all duration-200 flex-shrink-0 rounded-full hover:bg-white/10 ${
                    isActive
                      ? 'opacity-60 text-accent hover:opacity-100'
                      : 'opacity-0 group-hover/item:opacity-50 text-body hover:!opacity-100 hover:text-white'
                  }`}
                  aria-label="Expand project"
                >
                  ↗
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      {/* Active project details — tags, description, link */}
      <AnimatePresence mode="wait">
        {activeProject && (
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="px-4"
          >
            {/* Descriptor line */}
            <p className="font-mono text-xs tracking-widest text-accent mb-3">
              {activeProject.descriptor}
            </p>

            {/* Description */}
            <p className="text-body text-sm leading-relaxed mb-5 max-w-lg">
              {activeProject.description}
            </p>

            {/* Tech tags — icon+label pill chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              {activeProject.tags.map((tag, idx) => {
                const Icon = tagIcons[tag]
                const isPrimary = idx === 0
                return (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    key={tag}
                    className={`relative overflow-hidden inline-flex items-center gap-1.5 font-mono text-[11px] border px-3 py-1 rounded-full cursor-default backdrop-blur-md transition-colors ${
                      isPrimary
                        ? 'border-accent/40 bg-accent/20 text-heading hover:bg-accent/30 hover:border-accent/60'
                        : 'border-white/10 bg-white/5 text-body hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <span className="absolute inset-0 rounded-full border-t border-white/20 pointer-events-none" />
                    {Icon && <Icon className={`w-3 h-3 flex-shrink-0 ${isPrimary ? 'text-accent' : 'opacity-70'}`} />}
                    {tag}
                  </motion.span>
                )
              })}
            </div>

            {/* Language Breakdown Bar */}
            {activeProject.github && !activeProject.comingSoon && (
              <div className="mb-5 min-w-0 max-w-full">
                <LanguageBar githubUrl={activeProject.github} />
              </div>
            )}

            {/* GitHub link or Coming Soon pill */}
            {activeProject.comingSoon ? (
              <span className="inline-flex items-center font-mono text-xs text-muted border border-white/10 px-4 py-1.5 rounded-full w-fit">
                Coming Soon
              </span>
            ) : (
              <a
                href={activeProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-heading font-semibold text-sm hover:text-accent-hover transition-colors w-fit"
              >
                <span className="relative inline-block">
                  View on GitHub
                  <span className="absolute left-0 bottom-0 w-full h-[1px] bg-accent-hover scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
                </span>
                <span className="transform transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
