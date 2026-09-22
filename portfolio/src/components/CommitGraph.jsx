import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SiGithub } from 'react-icons/si'

export default function CommitGraph() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
    <div className="w-full h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <SiGithub className="text-xl opacity-80" />
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted">GitHub Activity (30 Days)</h4>
        </div>

        {loading ? (
          <div className="h-[160px] flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
        ) : error ? (
          <div className="h-[160px] flex items-center justify-center">
            <p className="text-xs text-body/50 font-mono">Data unavailable pending deployment</p>
          </div>
        ) : data ? (
          <div className="flex flex-col gap-8 h-full justify-between">
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
            
            <div className="flex items-end gap-1.5 h-[120px] mt-4">
              {data.dailyData.map((day, i) => {
                // Normalize height relative to the max count in the 30 days
                const maxCount = Math.max(...data.dailyData.map(d => d.count), 1)
                const heightPercentage = Math.max((day.count / maxCount) * 100, 4) // minimum 4% height so 0 isn't invisible
                
                return (
                  <motion.div
                    key={day.date}
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercentage}%` }}
                    transition={{ duration: 0.5, delay: i * 0.015, ease: "easeOut" }}
                    className={`flex-1 rounded-t-[2px] ${day.count > 0 ? 'bg-accent' : 'bg-white/10 dark:bg-white/10 bg-black/5'}`}
                    title={`${day.count} commits on ${day.date}`}
                  />
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
