import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import SectionLabel from './SectionLabel'
import experienceData from '../data/experience'

const certifications = [
  {
    name: 'Google for Education AI Masterclass (2026)',
    verifyUrl: null,
  },
  {
    name: 'Qualcomm AI Technical Foundations',
    verifyUrl: null,
  },
  {
    name: 'Deloitte Data Analytics Job Simulation (Forage)',
    verifyUrl: null,
  },
  {
    name: 'AI/ML Virtual Internship — EduSkills Foundation',
    verifyUrl: null,
  },
  {
    name: 'Coursera: Python Data Structures — University of Michigan',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/QHE3M9XJWL7N',
  },
  {
    name: 'Anthropic AI Professional Certificates',
    verifyUrl: null,
  },
]

const additionalCredentials = [
  {
    name: 'Coursera Verified Credential',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/KXM72MUBFQEQ',
  },
  {
    name: 'Coursera Verified Credential',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/HDT9WKXERUQX',
  },
  {
    name: 'Coursera Verified Credential',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/E7JG92QT8ENZ',
  },
]

function TimelineCard({ index, title, subtitle, description, link, date }) {
  const ref = useRef(null)
  // Trigger when card crosses the vertical center of the screen
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" })
  const numStr = (index + 1).toString().padStart(2, '0')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex gap-4 sm:gap-6 bg-panel border border-white/10 rounded-2xl p-6 sm:p-8"
    >
      {/* Number */}
      <div className="flex-shrink-0 flex items-start">
        <span className="font-mono text-3xl sm:text-4xl font-bold text-muted opacity-50">{numStr}</span>
      </div>
      
      {/* Vertical Accent Bar */}
      <div 
        className={`w-1 rounded-full transition-colors duration-500 flex-shrink-0 ${isInView ? 'bg-accent' : 'bg-white/10'}`} 
      />
      
      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-heading text-lg font-bold mb-1">{title}</h3>
        {subtitle && <p className="text-accent text-xs sm:text-sm font-mono tracking-wider mb-2">{subtitle}</p>}
        {date && <p className="text-muted text-xs font-mono mb-3">{date}</p>}
        {description && <p className="text-body text-sm leading-relaxed">{description}</p>}
        
        {link && (
          <div className="mt-4">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-body text-sm font-semibold hover:text-accent-hover transition-colors whitespace-nowrap"
            >
              <span className="relative inline-block">
                Verify
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-accent-hover scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
              </span>
              <span className="transform transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Certifications() {
  const [activeTab, setActiveTab] = useState('experience')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }

  return (
    <motion.section 
      id="certifications"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="max-w-6xl mx-auto px-6 py-24"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-6">
        <SectionLabel number="03" label="BACKGROUND" />
        
        {/* Tabs */}
        <div 
          data-lenis-prevent="true"
          className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest border-b border-white/10 pb-2 overflow-x-auto whitespace-nowrap scrollbar-hide w-full sm:w-auto"
        >
          <button
            onClick={() => setActiveTab('experience')}
            className={`transition-colors ${activeTab === 'experience' ? 'text-accent' : 'text-muted hover:text-body'}`}
          >
            Experience
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`transition-colors ${activeTab === 'certifications' ? 'text-accent' : 'text-muted hover:text-body'}`}
          >
            Certifications
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`transition-colors ${activeTab === 'achievements' ? 'text-accent' : 'text-muted hover:text-body'} opacity-50 cursor-not-allowed`}
            title="Coming Soon"
          >
            Achievements
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'experience' && (
          <motion.div
            key="experience"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            {experienceData.map((exp, i) => (
              <TimelineCard 
                key={exp.id}
                index={i}
                title={exp.role}
                subtitle={exp.company}
                date={exp.date}
                description={exp.description}
              />
            ))}
          </motion.div>
        )}

        {activeTab === 'certifications' && (
          <motion.div
            key="certifications"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-0"
          >
            {[...certifications, ...additionalCredentials].map((cert, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-5 border-t border-white/10"
              >
                <span className="text-heading text-sm sm:text-base">
                  {cert.name}
                </span>
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-body text-sm font-semibold hover:text-accent-hover transition-colors mt-2 sm:mt-0 whitespace-nowrap"
                  >
                    <span className="relative inline-block">
                      Verify
                      <span className="absolute left-0 bottom-0 w-full h-[1px] bg-accent-hover scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
                    </span>
                    <span className="transform transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </a>
                )}
              </motion.div>
            ))}
            <div className="border-t border-white/10" />
          </motion.div>
        )}

        {activeTab === 'achievements' && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="py-12 border border-white/10 rounded-2xl bg-panel"
          >
            <p className="font-mono text-sm text-muted text-center">Achievements coming soon.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
