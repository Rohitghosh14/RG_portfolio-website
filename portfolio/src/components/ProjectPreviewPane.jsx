// ProjectPreviewPane.jsx — Right panel: pageable preview gallery with dot indicators.
// Per arch.md v2 / design.md v2:
// - Renders the active project's `previews` array as a small gallery.
// - Cross-fade on project switch AND gallery-index change (~0.3s, AnimatePresence).
// - type: "mockup"  → pre-composited PNG (skip gracefully if src missing / file not found)
// - type: "chart"   → named chart component + monospace stats underneath
// - type: "image"   → plain full-bleed image (skip if src is null)
// - Navy-blue ambient glow behind the pane.
// - Dot indicators for paging.

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Chart component registry — same components as old ProjectPanel.jsx
import LightCurveChart from './charts/LightCurveChart'
import ProbabilityBarChart from './charts/ProbabilityBarChart'
import PSNRBarChart from './charts/PSNRBarChart'
import EmotionTimelineChart from './charts/EmotionTimelineChart'
import ScatterFitChart from './charts/ScatterFitChart'
import SimilarityBarChart from './charts/SimilarityBarChart'
import StrengthMeter from './charts/StrengthMeter'
import ConfidenceBarChart from './charts/ConfidenceBarChart'

const chartComponents = {
  LightCurveChart,
  ProbabilityBarChart,
  PSNRBarChart,
  EmotionTimelineChart,
  ScatterFitChart,
  SimilarityBarChart,
  StrengthMeter,
  ConfidenceBarChart,
}

/**
 * Filter out preview entries that can't be rendered yet:
 * - type: "image" with src: null → skip
 * - type: "mockup" with src that hasn't loaded → keep in array but handle load-error gracefully
 */
function getViewablePreviews(previews) {
  return previews.filter((p) => {
    if (p.type === 'image' && !p.src) return false
    return true
  })
}

export default function ProjectPreviewPane({ project }) {
  const viewable = getViewablePreviews(project.previews)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [imgError, setImgError] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState(0) // -1 left, 1 right, 0 neutral
  const constraintRef = useRef(null)

  // Reset gallery index and image error state when project changes
  useEffect(() => {
    setGalleryIndex(0)
    setImgError(false)
    setSwipeDirection(0)
  }, [project.id])

  // Reset image error when gallery index changes
  useEffect(() => {
    setImgError(false)
  }, [galleryIndex])

  // Clamp index if viewable count changes
  const safeIndex = Math.min(galleryIndex, Math.max(0, viewable.length - 1))

  const currentPreview = viewable[safeIndex]

  const goTo = useCallback(
    (idx) => {
      if (idx >= 0 && idx < viewable.length) {
        setSwipeDirection(idx > safeIndex ? -1 : 1)
        setGalleryIndex(idx)
      }
    },
    [viewable.length, safeIndex]
  )

  // Swipe/drag handler — detect direction from velocity or offset
  const handleDragEnd = useCallback(
    (_event, info) => {
      const SWIPE_THRESHOLD = 50    // px offset
      const VELOCITY_THRESHOLD = 300 // px/s

      if (
        info.offset.x < -SWIPE_THRESHOLD ||
        info.velocity.x < -VELOCITY_THRESHOLD
      ) {
        // Swiped left → next
        if (safeIndex < viewable.length - 1) {
          setSwipeDirection(-1)
          setGalleryIndex(safeIndex + 1)
        }
      } else if (
        info.offset.x > SWIPE_THRESHOLD ||
        info.velocity.x > VELOCITY_THRESHOLD
      ) {
        // Swiped right → previous
        if (safeIndex > 0) {
          setSwipeDirection(1)
          setGalleryIndex(safeIndex - 1)
        }
      }
    },
    [safeIndex, viewable.length]
  )

  // Determine if we should skip a mockup that failed to load
  const handleImgError = useCallback(() => {
    setImgError(true)
  }, [])

  // Slide animation variants — direction-aware
  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir === 0 ? 0 : dir < 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir === 0 ? 0 : dir < 0 ? -80 : 80 }),
  }

  const canGoPrev = safeIndex > 0
  const canGoNext = safeIndex < viewable.length - 1

  return (
    <div className="relative flex flex-col items-center">
      {/* Navy-blue ambient glow behind the pane */}
      <div className="absolute inset-0 -m-4 rounded-2xl bg-accent/[0.06] blur-2xl pointer-events-none" />

      {/* Preview content area — drag constraint container */}
      <div
        ref={constraintRef}
        className="group/pane relative w-full bg-panel rounded-xl overflow-hidden h-[450px] flex flex-col touch-pan-y"
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
            // Drag/swipe — only when multiple viewable previews
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

        {/* Arrow buttons — appear on hover (desktop) via group-hover, always visible on touch */}
        {viewable.length > 1 && (
          <>
            {/* Left arrow ‹ */}
            <button
              onClick={() => canGoPrev && goTo(safeIndex - 1)}
              disabled={!canGoPrev}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-10
                w-8 h-8 rounded-full bg-white/[0.08] backdrop-blur-sm
                flex items-center justify-center
                text-heading text-lg font-light select-none
                transition-all duration-200
                sm:opacity-0 sm:group-hover/pane:opacity-100
                ${canGoPrev
                  ? 'hover:bg-white/[0.15] active:scale-95'
                  : 'opacity-30 !cursor-default'
                }`}
              aria-label="Previous preview"
            >
              ‹
            </button>

            {/* Right arrow › */}
            <button
              onClick={() => canGoNext && goTo(safeIndex + 1)}
              disabled={!canGoNext}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-10
                w-8 h-8 rounded-full bg-white/[0.08] backdrop-blur-sm
                flex items-center justify-center
                text-heading text-lg font-light select-none
                transition-all duration-200
                sm:opacity-0 sm:group-hover/pane:opacity-100
                ${canGoNext
                  ? 'hover:bg-white/[0.15] active:scale-95'
                  : 'opacity-30 !cursor-default'
                }`}
              aria-label="Next preview"
            >
              ›
            </button>
          </>
        )}

        {/* Dot indicators — enlarged hit area (24x24) wrapping a small visual dot */}
        {viewable.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm">
            {viewable.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className="w-6 h-6 flex items-center justify-center"
                aria-label={`Preview ${idx + 1}`}
              >
                <span
                  className={`block w-2 h-2 rounded-full transition-all duration-200 ${
                    idx === safeIndex
                      ? 'bg-accent scale-110'
                      : 'bg-white/40 hover:bg-white/80'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Render a single preview entry based on its type.
 */
function renderPreview(preview, imgError, onImgError) {
  switch (preview.type) {
    case 'mockup':
      return renderMockup(preview, imgError, onImgError)
    case 'chart':
      return renderChart(preview)
    case 'image':
      return renderImage(preview, imgError, onImgError)
    default:
      return null
  }
}

/**
 * type: "mockup" — pre-composited PNG (device frame baked in).
 * If the image fails to load (file missing), show a clean fallback.
 */
function renderMockup(preview, imgError, onImgError) {
  if (imgError) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="font-mono text-xs text-muted text-center">
          Mockup image not yet available
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <img
        src={preview.src}
        alt="Project mockup"
        className="max-w-full max-h-[400px] object-contain rounded"
        onError={onImgError}
      />
    </div>
  )
}

/**
 * type: "chart" — named chart component from charts/ + stats underneath.
 * Stats rendered in monospace, same style as old ProjectPanel.jsx.
 */
function renderChart(preview) {
  const ChartComponent = chartComponents[preview.component]

  return (
    <div className="flex-1 flex flex-col p-5 sm:p-6">
      {/* Chart area */}
      <div className="flex-1 mb-4">
        {ChartComponent ? <ChartComponent /> : (
          <div className="flex items-center justify-center h-full">
            <p className="font-mono text-xs text-muted">Chart not found</p>
          </div>
        )}
      </div>

      {/* Stats row — monospace label+value pairs underneath the chart */}
      {preview.stats && preview.stats.length > 0 && (
        <>
          <div className="border-t border-white/10 mb-4" />
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {preview.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-mono text-[10px] text-body tracking-wider">
                  {stat.label}
                </span>
                <span className="font-mono text-sm text-heading">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/**
 * type: "image" — plain full-bleed image, no frame.
 * (Only shown when src is not null — null-src entries are filtered out.)
 */
function renderImage(preview, imgError, onImgError) {
  if (imgError || !preview.src) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="font-mono text-xs text-muted text-center">
          Screenshot not yet available
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <img
        src={preview.src}
        alt="Project screenshot"
        className="w-full h-full object-cover"
        onError={onImgError}
      />
    </div>
  )
}
