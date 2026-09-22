import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SiGithub } from 'react-icons/si'

export default function CommitGraph() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hoveredPoint, setHoveredPoint] = useState(null)

  useEffect(() => {
    async function fetchCommits() {
      try {
        const res = await fetch('/.netlify/functions/github-commits')
        if (!res.ok) {
          throw new Error('Failed to fetch commit data')
        }
        const json = await res.json()
        if (json.error) {
          throw new Error(json.error)
        }
        setData(json)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCommits()
  }, [])

  return (
    <div className="w-full flex flex-col">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <SiGithub className="text-xl opacity-80" />
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted">GitHub Activity (30 Days)</h4>
        </div>

        {loading ? (
          <div className="h-[120px] flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
        ) : error ? (
          <div className="h-[120px] flex items-center justify-center">
            <p className="text-xs text-body/50 font-mono">Data unavailable pending deployment</p>
          </div>
        ) : data ? (
          <div className="flex flex-col gap-6">
            <div className="flex gap-10">
              <div>
                <p className="text-4xl sm:text-5xl font-bold text-heading tracking-tight">{data.totalCommits}</p>
                <p className="text-[10px] sm:text-xs text-body/60 font-mono mt-2 uppercase tracking-wider">Commits</p>
              </div>
              <div>
                <p className="text-4xl sm:text-5xl font-bold text-heading tracking-tight">{data.streak}</p>
                <p className="text-[10px] sm:text-xs text-body/60 font-mono mt-2 uppercase tracking-wider">Day Streak</p>
              </div>
            </div>
            
            <div className="relative w-full h-[100px] mt-2" style={{ color: '#2E8B57' }}>
              {(() => {
                const maxCount = Math.max(...data.dailyData.map(d => d.count), 1);
                
                // Generate points in 0-100 percentage space
                const points = data.dailyData.map((day, i) => ({
                  x: (i / Math.max(data.dailyData.length - 1, 1)) * 100,
                  y: 90 - (day.count / maxCount) * 80, // Scales between 10% and 90% from top
                  count: day.count,
                  date: day.date
                }));

                // Create smooth cubic bezier path
                let pathD = `M ${points[0].x},${points[0].y}`;
                for (let i = 0; i < points.length - 1; i++) {
                  const p0 = points[i];
                  const p1 = points[i + 1];
                  const cx = (p0.x + p1.x) / 2;
                  pathD += ` C ${cx},${p0.y} ${cx},${p1.y} ${p1.x},${p1.y}`;
                }
                const fillD = `${pathD} L 100,100 L 0,100 Z`;

                return (
                  <>
                    <svg 
                      className="absolute inset-0 w-full h-full overflow-visible" 
                      viewBox="0 0 100 100" 
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="commitGraphGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2E8B57" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#2E8B57" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path 
                        d={fillD} 
                        fill="url(#commitGraphGradient)" 
                      />
                      <path 
                        d={pathD} 
                        fill="none" 
                        stroke="#2E8B57" 
                        strokeWidth="2" 
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>

                    {/* Data points */}
                    {points.map((p, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 -ml-1 -mt-1 bg-panel border-[1.5px] rounded-full z-10 hover:scale-150 transition-transform cursor-pointer"
                        style={{ left: `${p.x}%`, top: `${p.y}%`, borderColor: '#2E8B57' }}
                        onMouseEnter={() => setHoveredPoint(p)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                    ))}

                    <AnimatePresence>
                      {hoveredPoint && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 10, x: '-50%' }}
                          animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
                          exit={{ opacity: 0, scale: 0.9, y: 10, x: '-50%' }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-20 flex flex-col items-center pointer-events-none"
                          style={{
                            left: `${hoveredPoint.x}%`,
                            top: `calc(${hoveredPoint.y}% - 54px)`
                          }}
                        >
                          <div className="bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-1.5 shadow-xl whitespace-nowrap flex flex-col items-center">
                            <div className="text-[#2E8B57] font-bold text-sm leading-tight">{hoveredPoint.count} commits</div>
                            <div className="text-white/50 text-[10px] font-mono uppercase tracking-wider">{new Date(hoveredPoint.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                          </div>
                          {/* Triangle pointer (Outer border) */}
                          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white/10 -mt-px relative" />
                          {/* Triangle pointer (Inner fill) */}
                          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[#1A1A1A] -mt-[6px] relative" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                );
              })()}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
