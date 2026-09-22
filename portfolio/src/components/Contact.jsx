import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import SectionLabel from './SectionLabel'

const links = [
  { label: 'Email', href: 'mailto:rohitghosh1214@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rohit-ghosh14' },
  { label: 'GitHub', href: 'https://github.com/Rohitghosh14' },
  { label: 'Kaggle', href: 'https://www.kaggle.com/rohitghosh14' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/87HME5FC2Z/' },
  { label: 'Instagram', href: 'https://www.instagram.com/rohit_ghosh14' },
]

export default function Contact() {
  const scrollVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  }

  return (
    <>
      <motion.section 
        id="contact"
        variants={scrollVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-6 py-24"
      >
        <SectionLabel number="04" label="CONTACT" />

        <h2 className="text-2xl sm:text-3xl font-semibold text-heading mb-4">
          Interested in building together? Let&apos;s talk.
        </h2>
        <p className="text-body text-base leading-relaxed mb-12 max-w-2xl">
          Always open to discussions regarding novel architectures, research
          collaborations, or production ML engineering roles.
        </p>

        {/* Link row */}
        <div className="flex flex-wrap gap-x-8 gap-y-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-heading font-semibold text-sm hover:text-accent-hover transition-colors"
            >
              <span className="relative inline-block">
                {link.label}
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-accent-hover scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
              </span>
              <span className="transform transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-body text-xs">
                Rohit • AI/ML Engineer • Kolkata, India
              </span>
              <span className="text-body text-xs">
                Built with React, Tailwind &amp; Framer Motion • © 2026
              </span>
            </div>
            <span className="text-muted text-[10px] mt-1 sm:mt-0">
              <a href="https://www.flaticon.com/free-icons/cursor" title="cursor icons" target="_blank" rel="noopener noreferrer" className="hover:text-body transition-colors">
                Cursor icon by meaicon — Flaticon
              </a>
            </span>
          </div>
          {/* Small monochrome QR code → GitHub */}
          <QRCodeSVG
            value="https://github.com/Rohitghosh14"
            size={64}
            bgColor="transparent"
            fgColor="var(--theme-body)"
            level="L"
            className="opacity-50 hover:opacity-80 transition-opacity flex-shrink-0"
          />
        </div>
      </footer>
    </>
  )
}
