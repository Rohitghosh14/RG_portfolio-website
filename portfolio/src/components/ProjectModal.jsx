import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SiPython, SiScikitlearn, SiStreamlit, SiPytorch,
  SiFastapi, SiReact, SiNumpy, SiPandas, SiGit
} from 'react-icons/si'

import LanguageBar from './LanguageBar'
import LightCurveChart from './charts/LightCurveChart'
import ProbabilityBarChart from './charts/ProbabilityBarChart'
import PSNRBarChart from './charts/PSNRBarChart'
import EmotionTimelineChart from './charts/EmotionTimelineChart'
import ScatterFitChart from './charts/ScatterFitChart'
import SimilarityBarChart from './charts/SimilarityBarChart'
import StrengthMeter from './charts/StrengthMeter'
import ConfidenceBarChart from './charts/ConfidenceBarChart'

const chartComponents = {
  LightCurveChart, ProbabilityBarChart, PSNRBarChart,
  EmotionTimelineChart, ScatterFitChart, SimilarityBarChart,
  StrengthMeter, ConfidenceBarChart,
}

const tagIcons = {
  'Python': SiPython, 'PyTorch': SiPytorch, 'Scikit-learn': SiScikitlearn,
  'FastAPI': SiFastapi, 'Streamlit': SiStreamlit, 'React': SiReact,
  'NumPy': SiNumpy, 'Pandas': SiPandas, 'Git': SiGit,
}

function getViewablePreviews(previews) {
  return previews.filter((p) => {
    if (p.type === 'image' && !p.src) return false
    return true
  })
}

export default function ProjectModal({ project, onClose }) {
  const viewable = getViewablePreviews(project.previews)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [imgError, setImgError] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState(0)
  const constraintRef = useRef(null)

  // Scroll lock & Escape key
  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  useEffect(() => {
    setGalleryIndex(0)
    setImgError(false)
    setSwipeDirection(0)
  }, [project.id])

  useEffect(() => {
    setImgError(false)
  }, [galleryIndex])

  const safeIndex = Math.min(galleryIndex, Math.max(0, viewable.length - 1))
  const currentPreview = viewable[safeIndex]

  const goTo = useCallback((idx) => {
    if (idx >= 0 && idx < viewable.length) {
      setSwipeDirection(idx > safeIndex ? -1 : 1)
      setGalleryIndex(idx)
    }
  }, [viewable.length, safeIndex])

  const handleDragEnd = useCallback((_event, info) => {
    const SWIPE_THRESHOLD = 50
    const VELOCITY_THRESHOLD = 300
    if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -VELOCITY_THRESHOLD) {
      if (safeIndex < viewable.length - 1) {
        setSwipeDirection(-1)
        setGalleryIndex(safeIndex + 1)
      }
    } else if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > VELOCITY_THRESHOLD) {
      if (safeIndex > 0) {
        setSwipeDirection(1)
        setGalleryIndex(safeIndex - 1)
      }
    }
  }, [safeIndex, viewable.length])

  const handleImgError = useCallback(() => setImgError(true), [])

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir === 0 ? 0 : dir < 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir === 0 ? 0 : dir < 0 ? -80 : 80 }),
  }

  const canGoPrev = safeIndex > 0
  const canGoNext = safeIndex < viewable.length - 1

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-[95vw] md:w-[90vw] max-w-[1400px] h-[95vh] md:h-[90vh] flex flex-col bg-bg rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[60] w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors backdrop-blur-md"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Scrollable container for modal content */}
        <div 
          data-lenis-prevent="true"
          className="overflow-y-auto w-full h-full flex flex-col [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-accent/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-accent/60"
        >
          
          {/* Top Gallery Area */}
          <div
            ref={constraintRef}
            className="group/pane relative w-full bg-panel flex-shrink-0 min-h-[40vh] md:min-h-[50vh] flex flex-col touch-pan-y border-b border-white/5 overflow-hidden"
          >
            <AnimatePresence mode="wait" custom={swipeDirection}>
              <motion.div
                key={`${project.id}-${safeIndex}`}
                custom={swipeDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full h-full flex flex-col"
                {...(viewable.length > 1 && {
                  drag: 'x',
                  dragConstraints: constraintRef,
                  dragElastic: 0.15,
                  onDragEnd: handleDragEnd,
                  style: { cursor: 'grab' },
                })}
              >
                {currentPreview && renderPreview(currentPreview, imgError, handleImgError)}
              </motion.div>
            </AnimatePresence>

            {/* Arrow buttons */}
            {viewable.length > 1 && (
              <>
                <button
                  onClick={() => canGoPrev && goTo(safeIndex - 1)}
                  disabled={!canGoPrev}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/[0.08] backdrop-blur-sm flex items-center justify-center text-heading text-xl font-light select-none transition-all duration-200 sm:opacity-0 sm:group-hover/pane:opacity-100 ${canGoPrev ? 'hover:bg-white/[0.15] active:scale-95' : 'opacity-30 !cursor-default'}`}
                  aria-label="Previous preview"
                >
                  ‹
                </button>
                <button
                  onClick={() => canGoNext && goTo(safeIndex + 1)}
                  disabled={!canGoNext}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/[0.08] backdrop-blur-sm flex items-center justify-center text-heading text-xl font-light select-none transition-all duration-200 sm:opacity-0 sm:group-hover/pane:opacity-100 ${canGoNext ? 'hover:bg-white/[0.15] active:scale-95' : 'opacity-30 !cursor-default'}`}
                  aria-label="Next preview"
                >
                  ›
                </button>
              </>
            )}

            {/* Dot indicators overlaying bottom center of gallery */}
            {viewable.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm">
                {viewable.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    className="w-6 h-6 flex items-center justify-center"
                    aria-label={`Preview ${idx + 1}`}
                  >
                    <span className={`block w-2 h-2 rounded-full transition-all duration-200 ${idx === safeIndex ? 'bg-accent scale-110' : 'bg-white/40 hover:bg-white/80'}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Info Area */}
          <div className="p-6 sm:p-8 md:p-10 flex flex-col flex-1 bg-bg">
            <p className="font-mono text-xs tracking-widest text-accent mb-4">
              {project.descriptor}
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-heading mb-6">
              {project.name}
            </h2>
            
            <p className="text-body text-base sm:text-lg leading-relaxed mb-8 max-w-4xl">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag, idx) => {
                const Icon = tagIcons[tag]
                const isPrimary = idx === 0
                  return (
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      key={tag}
                      className={`relative overflow-hidden inline-flex items-center gap-1.5 font-mono text-xs border px-3 py-1.5 rounded-full cursor-default backdrop-blur-md transition-colors ${
                        isPrimary 
                          ? 'border-accent/40 bg-accent/20 text-heading hover:bg-accent/30 hover:border-accent/60' 
                          : 'border-white/10 bg-white/5 text-body hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="absolute inset-0 rounded-full border-t border-white/20 pointer-events-none" />
                    {Icon && <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isPrimary ? 'text-accent' : 'opacity-70'}`} />}
                    {tag}
                  </motion.span>
                )
              })}
            </div>

            {/* Language Breakdown Bar */}
            {project.github && !project.comingSoon && (
              <div className="mb-8 min-w-0 max-w-full">
                <LanguageBar githubUrl={project.github} />
              </div>
            )}

            <div className="mt-auto pt-4">
              {project.comingSoon ? (
                <span className="inline-flex items-center font-mono text-sm text-muted border border-white/10 px-5 py-2 rounded-full">
                  Coming Soon
                </span>
              ) : (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-heading font-semibold text-base hover:text-accent-hover transition-colors w-fit"
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
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  )
}

function renderPreview(preview, imgError, onImgError) {
  switch (preview.type) {
    case 'mockup':
      if (imgError) return <div className="flex-1 flex items-center justify-center p-8"><p className="font-mono text-sm text-muted">Mockup image not yet available</p></div>
      return (
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <img src={preview.src} alt="Project mockup" className="w-full h-full object-contain rounded" onError={onImgError} />
        </div>
      )
    case 'chart':
      const ChartComponent = chartComponents[preview.component]
      return (
        <div className="flex-1 flex flex-col p-6 md:p-10">
          <div className="flex-1 mb-6">
            {ChartComponent ? <ChartComponent /> : <div className="flex items-center justify-center h-full"><p className="font-mono text-sm text-muted">Chart not found</p></div>}
          </div>
          {preview.stats && preview.stats.length > 0 && (
            <>
              <div className="border-t border-white/10 mb-6" />
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {preview.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="font-mono text-xs text-body tracking-wider mb-1">{stat.label}</span>
                    <span className="font-mono text-lg text-heading">{stat.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )
    case 'image':
      if (imgError || !preview.src) return <div className="flex-1 flex items-center justify-center p-8"><p className="font-mono text-sm text-muted">Screenshot not yet available</p></div>
      return (
        <div className="flex-1 flex items-center justify-center">
          <img src={preview.src} alt="Project screenshot" className="w-full h-full object-cover" onError={onImgError} />
        </div>
      )
    default:
      return null
  }
}
