import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Accomplishments from './components/Accomplishments'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    document.title = "Shreya | Portfolio"
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Accomplishments />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
