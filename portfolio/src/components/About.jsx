import { motion } from 'framer-motion'
import {
  SiPython,
  SiC,
  SiMysql,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiStreamlit,
  SiFastapi,
  SiPytorch,
  SiGit,
  SiGithub,
  SiJupyter,
  SiGooglecolab,
  SiLinux
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import SectionLabel from './SectionLabel'
import BioCard from './BioCard'

const skillCategories = [
  {
    id: "01",
    title: "Languages",
    description: "Languages used across ML pipelines, scripting, and data work.",
    items: [
      { name: "Python", icon: SiPython },
      { name: "C", icon: SiC },
      { name: "SQL", icon: SiMysql },
    ]
  },
  {
    id: "02",
    title: "ML & Data",
    description: "Algorithms and techniques applied across projects.",
    items: [
      { name: "Linear Regression" },
      { name: "Logistic Regression" },
      { name: "KNN" },
      { name: "Naive Bayes" },
      { name: "Decision Tree" },
      { name: "Random Forest" },
      { name: "SVM" },
      { name: "Clustering" },
    ]
  },
  {
    id: "03",
    title: "Libraries & Frameworks",
    description: "Core libraries for data work and app delivery.",
    items: [
      { name: "NumPy", icon: SiNumpy },
      { name: "Pandas", icon: SiPandas },
      { name: "Matplotlib" },
      { name: "Scikit-learn", icon: SiScikitlearn },
      { name: "Streamlit", icon: SiStreamlit },
      { name: "FastAPI", icon: SiFastapi },
      { name: "PyTorch", icon: SiPytorch },
    ]
  },
  {
    id: "04",
    title: "Tools & Environment",
    description: "Daily tooling for development and experimentation.",
    items: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "VS Code", icon: VscVscode },
      { name: "Jupyter", icon: SiJupyter },
      { name: "Google Colab", icon: SiGooglecolab },
      { name: "Linux/WSL", icon: SiLinux },
    ]
  }
]

export default function About() {
  const scrollVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  }

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
      variants={scrollVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="max-w-6xl mx-auto px-6 py-24"
    >
      <SectionLabel number="01" label="ABOUT" />

      <h2 className="text-2xl sm:text-3xl font-semibold text-heading leading-snug mb-8 max-w-3xl">
        I build machine learning and deep learning systems from scratch rather
        than copying tutorials. Every architecture is grounded in mathematical
        intuition, benchmarked empirically, and root-cause debugged down to
        individual tensor gradients.
      </h2>

      <BioCard />

      {/* Skills Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-0"
      >
        {skillCategories.map((category) => (
          <motion.div 
            key={category.id} 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 py-8 border-t border-white/10"
          >
            <div>
              <p className="font-mono text-xs tracking-widest text-muted mb-2">
                {category.id} — {category.title}
              </p>
            </div>
            
            <div>
              <p className="text-body text-sm mb-6 opacity-80">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {category.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      key={item.name}
                      className="relative overflow-hidden inline-flex items-center gap-1.5 font-mono text-xs text-body border border-white/10 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-colors cursor-default"
                    >
                      <span className="absolute inset-0 rounded-full border-t border-white/20 pointer-events-none" />
                      {Icon && <Icon className="text-sm opacity-80" />}
                      {item.name}
                    </motion.span>
                  )
                })}
              </div>
            </div>
          </motion.div>
        ))}
        <div className="border-t border-white/10" />
      </motion.div>
    </motion.section>
  )
}
