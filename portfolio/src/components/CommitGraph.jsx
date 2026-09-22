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
    <div className="w-full bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm p-6">
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
          <div className="flex gap-8">
            <div>
              <p className="text-3xl font-bold text-heading">{data.totalCommits}</p>
              <p className="text-xs text-body/60 font-mono mt-1 uppercase tracking-wider">Commits</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-heading">{data.streak}</p>
              <p className="text-xs text-body/60 font-mono mt-1 uppercase tracking-wider">Day Streak</p>
            </div>
          </div>
          
          <div className="flex items-end gap-1 h-[60px]">
            {data.dailyData.map((day, i) => {
              // Normalize height relative to the max count in the 30 days
              const maxCount = Math.max(...data.dailyData.map(d => d.count), 1)
              const heightPercentage = Math.max((day.count / maxCount) * 100, 4) // minimum 4% height so 0 isn't invisible
              
              return (
                <motion.div
                  key={day.date}
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercentage}%` }}
                  transition={{ duration: 0.5, delay: i * 0.02, ease: "easeOut" }}
                  className={`flex-1 rounded-t-sm ${day.count > 0 ? 'bg-accent' : 'bg-white/10'}`}
                  title={`${day.count} commits on ${day.date}`}
                />
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
