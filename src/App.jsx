import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Work from './pages/Work'
import Contact from './pages/Contact'

export default function App() {
  const [page, setPage] = useState('home')

  // scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  // Set favicon to the oneko cat idle frame (col 3, row 3 of the 256×128 sprite sheet)
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = 'https://raw.githubusercontent.com/raynecloudy/oneko_db/master/default.png'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width  = 32
      canvas.height = 32
      const ctx = canvas.getContext('2d')
      // idle frame: sheet position x=96, y=96 (col 3 × 32, row 3 × 32)
      ctx.drawImage(img, 96, 96, 32, 32, 0, 0, 32, 32)
      const link = document.querySelector("link[rel='icon']") || document.createElement('link')
      link.rel  = 'icon'
      link.type = 'image/png'
      link.href = canvas.toDataURL('image/png')
      document.head.appendChild(link)
    }
  }, [])

  const navigate = (p) => setPage(p)

  const renderPage = () => {
    switch (page) {
      case 'home':     return <Home navigate={navigate} />
      case 'projects': return <Projects navigate={navigate} />
      case 'work':     return <Work navigate={navigate} />
      case 'contact':  return <Contact navigate={navigate} />
      default:         return <Home navigate={navigate} />
    }
  }

  return (
    <div className="min-h-screen bg-[#060606] text-[#ededed]">
      <Header current={page} navigate={navigate} />
      <main className="min-h-screen w-full bg-[#060606]">{renderPage()}</main>
      <Footer navigate={navigate} />
    </div>
  )
}
