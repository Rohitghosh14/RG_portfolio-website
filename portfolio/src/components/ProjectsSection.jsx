// ProjectsSection.jsx — [02] PROJECTS layout shell.
// Holds activeProjectId state, renders ProjectList (left) and ProjectPreviewPane (right).
// Per arch.md v2 / design.md v2.

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from './SectionLabel'
import ProjectList from './ProjectList'
import ProjectPreviewPane from './ProjectPreviewPane'
import ProjectModal from './ProjectModal'
import projects from '../data/projects'

export default function ProjectsSection() {
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id)
  const [expandedProjectId, setExpandedProjectId] = useState(null)

  const activeProject = projects.find((p) => p.id === activeProjectId)
  const expandedProject = expandedProjectId ? projects.find((p) => p.id === expandedProjectId) : null

  return (
    <>
      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto px-6 py-24"
      >
        <SectionLabel number="02" label="PROJECTS" />

        {/* Two-panel layout: left list + right preview pane */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-12">
          {/* Left — clickable project list + active project details */}
          <ProjectList
            projects={projects}
            activeProjectId={activeProjectId}
            onSelectProject={setActiveProjectId}
            onExpandProject={setExpandedProjectId}
          />

          {/* Right — swapping preview pane with gallery */}
          <ProjectPreviewPane
            project={activeProject}
          />
        </div>
      </motion.section>

      {/* Full-screen expanded project overlay */}
      <AnimatePresence>
        {expandedProject && (
          <ProjectModal
            project={expandedProject}
            onClose={() => setExpandedProjectId(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
