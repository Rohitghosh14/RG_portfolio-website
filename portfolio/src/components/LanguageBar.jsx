import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const GITHUB_COLORS = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  'Jupyter Notebook': '#DA5B0B',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C++': '#f34b7d',
  Vue: '#41b883',
  Shell: '#89e051',
  Java: '#b07219',
  C: '#555555',
}

function getLanguageColor(lang) {
  if (GITHUB_COLORS[lang]) return GITHUB_COLORS[lang]
  let hash = 0
  for (let i = 0; i < lang.length; i++) {
    hash = lang.charCodeAt(i) + ((hash << 5) - hash)
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase()
  return '#' + '00000'.substring(0, 6 - c.length) + c
}

const cache = {}

export default function LanguageBar({ githubUrl }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!githubUrl || !githubUrl.includes('github.com')) {
      setLoading(false)
      return
    }

    const urlParts = githubUrl.split('github.com/')
    if (urlParts.length < 2) {
      setLoading(false)
      return
    }

    const repoPath = urlParts[1].replace(/\/$/, '')
    
    if (cache[repoPath]) {
      setData(cache[repoPath])
      setLoading(false)
      return
    }

    setLoading(true)
    fetch(`https://api.github.com/repos/${repoPath}/languages`)
      .then((res) => {
        if (!res.ok) throw new Error('API limit or error')
        return res.json()
      })
      .then((langs) => {
        const totalBytes = Object.values(langs).reduce((a, b) => a + b, 0)
        const parsed = Object.entries(langs)
          .map(([name, bytes]) => ({
            name,
            percent: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0,
            color: getLanguageColor(name)
          }))
          .filter((lang) => lang.percent > 0)
          .sort((a, b) => b.percent - a.percent)
        
        cache[repoPath] = parsed
        setData(parsed)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch languages for', repoPath, err)
        setLoading(false)
      })
  }, [githubUrl])

  if (loading) {
    return (
      <div className="animate-pulse flex flex-col gap-2.5 w-full max-w-md mt-6">
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"></div>
        <div className="flex gap-4">
          <div className="h-2 w-16 bg-white/5 rounded"></div>
          <div className="h-2 w-16 bg-white/5 rounded"></div>
        </div>
      </div>
    )
  }

  if (!data || data.length === 0) return null

  return (
    <div className="flex flex-col gap-3 w-full mt-6 max-w-full min-w-0">
      {/* Bar */}
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden flex min-w-0">
        {data.map((lang) => (
          <motion.div
            key={lang.name}
            initial={{ width: 0 }}
            whileInView={{ width: `${lang.percent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ backgroundColor: lang.color }}
            className="h-full"
            title={`${lang.name} ${lang.percent.toFixed(1)}%`}
          />
        ))}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {data.map((lang) => (
          <div key={lang.name} className="flex items-center gap-1.5 font-mono text-[11px] text-body">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
            <span className="font-semibold text-muted">{lang.name}</span>
            <span className="opacity-60">{lang.percent.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
