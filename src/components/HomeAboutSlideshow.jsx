import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

const INTERVAL_MS = 5500

function publicAsset(name) {
  const base = import.meta.env.BASE_URL || '/'
  const root = String(base).replace(/\/$/, '')
  return root ? `${root}/${name}` : `/${name}`
}

/** Local files in /public override these fallbacks (home-slide-1.jpg … 4). */
const SLIDE_CONFIG = [
  {
    local: 'home-slide-1.jpg',
    remote:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80&auto=format&fit=crop',
    alt: 'Developer workstation with laptop',
  },
  {
    local: 'home-slide-2.jpg',
    remote:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80&auto=format&fit=crop',
    alt: 'Abstract neural network visualization',
  },
  {
    local: 'home-slide-3.jpg',
    remote:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80&auto=format&fit=crop',
    alt: 'Collaboration and hackathon energy',
  },
  {
    local: 'home-slide-4.jpg',
    remote:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&q=80&auto=format&fit=crop',
    alt: 'Books and creative aesthetic',
  },
]

function SlideImage({ localName, remote, alt, active }) {
  const primary = publicAsset(localName)
  const [src, setSrc] = useState(primary)

  const onError = useCallback(() => {
    setSrc((s) => (s === primary ? remote : s))
  }, [primary, remote])

  useEffect(() => {
    setSrc(primary)
  }, [primary])

  return (
    <motion.img
      src={src}
      alt={alt}
      onError={onError}
      className={`absolute inset-0 h-full w-full object-cover ${active ? 'z-[1]' : 'z-0'}`}
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      draggable={false}
    />
  )
}

export default function HomeAboutSlideshow() {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) return undefined
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDE_CONFIG.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.55)]">
      <div className="relative h-[min(200px,52vw)] w-full sm:h-[min(220px,48vw)] md:h-[240px] lg:h-[260px]">
        {SLIDE_CONFIG.map((slide, i) => (
          <SlideImage
            key={slide.local}
            localName={slide.local}
            remote={slide.remote}
            alt={slide.alt}
            active={i === index}
          />
        ))}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"
          aria-hidden
        />
        <div
          className="absolute bottom-4 left-1/2 z-[2] flex -translate-x-1/2 gap-1.5"
          role="tablist"
          aria-label="Slide indicators"
        >
          {SLIDE_CONFIG.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-indigo-400' : 'w-1.5 bg-white/25 hover:bg-white/45'
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
