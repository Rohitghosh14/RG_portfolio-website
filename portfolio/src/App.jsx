import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import Hero from './components/Hero'
import About from './components/About'
import ProjectsSection from './components/ProjectsSection'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import LoadingScreen from './components/LoadingScreen'
import Cursor from './components/Cursor'
import NavBar from './components/NavBar'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    // Initialize Lenis for smooth scrolling globally
    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
    })
    
    let rafId;
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // If they already saw it, don't wait for transition to show content properly.
    if (sessionStorage.getItem('hasSeenLoading')) {
      setLoadingComplete(true)
    }

    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="min-h-screen bg-bg text-heading">
      <Cursor />
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      
      {loadingComplete && <NavBar />}
      {loadingComplete && <ThemeToggle />}

      {/* Main Content - we always render it, but hide overflow during loading */}
      <div
        className={`transition-opacity duration-700 ${
          loadingComplete ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'
        }`}
      >
        <Hero />
        <About />

        <ProjectsSection />

        <Certifications />
        <Contact />
      </div>
    </div>
  )
}

export default App
