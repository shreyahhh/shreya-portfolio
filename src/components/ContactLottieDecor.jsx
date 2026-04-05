import { useCallback, useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react'
import { motion } from 'framer-motion'
import { PIXEL_NATURE_EXAMPLES, PixelSprite } from './PixelNatureSprites'

/**
 * Fetch + play control: frozen at frame 0 (dormant) vs looping (alive).
 */
function LottieFromUrl({ src, className, wrapperClassName, freeze = false }) {
  const [data, setData] = useState(null)
  const lottieRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    fetch(src)
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled) setData(json)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [src])

  const syncPlayback = useCallback(() => {
    const api = lottieRef.current
    if (!api?.animationItem) return
    if (freeze) {
      api.pause()
      api.goToAndStop(0, true)
    } else {
      api.goToAndPlay(0, true)
    }
  }, [freeze])

  useEffect(() => {
    if (!data) return
    const t = requestAnimationFrame(() => syncPlayback())
    return () => cancelAnimationFrame(t)
  }, [freeze, data, syncPlayback])

  if (!data) {
    return <div className={wrapperClassName} aria-hidden />
  }

  return (
    <div className={wrapperClassName}>
      <Lottie
        lottieRef={lottieRef}
        animationData={data}
        loop={!freeze}
        className={className}
        onDOMLoaded={syncPlayback}
      />
    </div>
  )
}

const NATURE = [
  { key: 'moon', label: 'Moon' },
  { key: 'cloud', label: 'Clouds' },
  { key: 'tree', label: 'Trees' },
  { key: 'flower', label: 'Flowers' },
]

const RESOURCES = [
  { file: 'resources/dev-scene-1.json', title: 'Stack & craft', desc: 'Languages, tooling, and how things fit together.' },
  { file: 'resources/dev-scene-2.json', title: 'Build mode', desc: 'Shipping features from editor to production.' },
  { file: 'resources/dev-scene-3.json', title: 'Say hello', desc: 'Collaboration, feedback, and keeping humans in the loop.' },
  { file: 'resources/dev-scene-4.json', title: 'Ideas in motion', desc: 'Prototypes, motion, and bringing concepts to life.' },
]

/**
 * Hero reacts to Connect hover: night (moon, dormant trees/flowers/clouds) → day (sun, motion, color).
 * Assets: Google Noto Emoji (fonts.gstatic.com/s/e/notoemoji/).
 */
export default function ContactLottieDecor({ variant = 'hero', connectHovered = false }) {
  const base = import.meta.env.BASE_URL || '/'
  const awake = connectHovered

  if (variant === 'hero') {
    return (
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {/* Moon ↔ sun */}
        <div
          className="absolute -top-2 right-[1%] aspect-square w-[min(34vw,160px)] sm:w-[min(30vw,180px)] md:right-[5%] md:w-[min(26vw,200px)]"
        >
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: awake ? 0 : 1,
              scale: awake ? 0.92 : 1,
              filter: awake ? 'blur(4px)' : 'blur(0px)',
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="h-full w-full [filter:drop-shadow(0_0_18px_rgba(200,210,255,0.35))]">
              <LottieFromUrl
                src={`${base}lottie/nature-moon.json`}
                freeze={false}
                wrapperClassName="h-full w-full"
                className="h-full w-full object-contain"
              />
            </div>
          </motion.div>
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: awake ? 1 : 0,
              scale: awake ? 1 : 0.85,
              filter: awake ? 'blur(0px)' : 'blur(4px)',
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="h-full w-full" style={{ filter: 'drop-shadow(0 0 28px rgba(255, 220, 120, 0.55))' }}>
              <LottieFromUrl
                src={`${base}lottie/nature-sun.json`}
                freeze={false}
                wrapperClassName="h-full w-full"
                className="h-full w-full object-contain"
              />
            </div>
          </motion.div>
        </div>

        {/* Clouds — still until hover, then drift */}
        <motion.div
          className="absolute -left-2 top-[6%] w-[min(52vw,240px)] sm:top-[8%] md:left-[1%] md:w-[min(40vw,280px)]"
          animate={{ opacity: awake ? 0.72 : 0.32 }}
          transition={{ duration: 0.55 }}
        >
          <LottieFromUrl
            src={`${base}lottie/nature-cloud.json`}
            freeze={!awake}
            wrapperClassName="h-full w-full"
            className="h-full w-full object-contain"
          />
        </motion.div>

        {/* Tree — “bare” when frozen + desaturated; full green when awake */}
        <div className="absolute -left-4 bottom-[5%] w-[min(46vw,190px)] sm:bottom-[7%] md:left-[2%] md:w-[min(34vw,220px)]">
          <motion.div
            className="h-full w-full"
            animate={{
              filter: awake
                ? 'grayscale(0) brightness(1) saturate(1.05)'
                : 'grayscale(0.9) brightness(0.5) contrast(1.08) saturate(0.35)',
              scale: awake ? 1 : 0.96,
            }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <LottieFromUrl
              src={`${base}lottie/nature-tree.json`}
              freeze={!awake}
              wrapperClassName="h-full w-full"
              className="h-full w-full object-contain"
            />
          </motion.div>
        </div>

        {/* Flowers — upside-down + dull when dormant; upright + vivid when awake */}
        <div className="absolute -right-2 bottom-[3%] w-[min(40vw,170px)] sm:bottom-[5%] md:right-[3%] md:w-[min(30vw,200px)]">
          <motion.div
            className="h-full w-full"
            style={{ transformOrigin: '50% 88%' }}
            animate={{
              rotate: awake ? 0 : 180,
              filter: awake ? 'grayscale(0) brightness(1)' : 'grayscale(0.55) brightness(0.55)',
              scale: awake ? 1 : 0.94,
            }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <LottieFromUrl
              src={`${base}lottie/nature-flower.json`}
              freeze={!awake}
              wrapperClassName="h-full w-full"
              className="h-full w-full object-contain"
            />
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <section className="border-t border-white/10 px-6 pb-24 pt-16" aria-labelledby="contact-resources-heading">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-10"
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">Extras</p>
          <h2 id="contact-resources-heading" className="text-2xl font-bold text-white md:text-3xl">
            Resources
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#a1a1a1]">
            Developer-themed motion from LottieFiles — stack, shipping, collaboration, and playful energy. Below are
            static pixel-art examples of trees and flowers (SVG grids, crisp edges).
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RESOURCES.map((item, i) => (
            <motion.div
              key={item.file}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-4 transition-colors hover:border-white/20"
            >
              <div className="relative mx-auto flex h-[160px] w-full max-w-[200px] items-center justify-center">
                <LottieFromUrl
                  src={`${base}lottie/${item.file}`}
                  freeze={false}
                  wrapperClassName="h-full w-full"
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-[#a1a1a1]">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-14"
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-emerald-400/90">Pixel art</p>
          <h3 className="text-lg font-bold text-white md:text-xl">Flower &amp; tree examples</h3>
          <p className="mt-2 max-w-2xl text-sm text-[#a1a1a1]">
            Hand-authored on a small character grid — same idea as sprite tiles in games, scaled up with pixelated
            rendering.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PIXEL_NATURE_EXAMPLES.map((ex, i) => (
              <motion.div
                key={ex.key}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.05 * i }}
                className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] p-4 transition-colors hover:border-emerald-500/25"
              >
                <div className="flex min-h-[140px] items-center justify-center rounded-xl bg-[#161616] px-3 py-4">
                  <PixelSprite rows={ex.rows} palette={ex.palette} pixelSize={7} className="drop-shadow-[0_0_12px_rgba(16,185,129,0.12)]" />
                </div>
                <h4 className="mt-3 text-sm font-semibold text-white">{ex.label}</h4>
                <p className="mt-1 text-xs leading-relaxed text-[#a1a1a1]">{ex.caption}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <p className="mt-8 text-center text-[10px] text-[#555]">
          Hero nature (night → day on Connect hover): {NATURE.map((n) => n.label).join(' · ')} + sun — Google Noto Emoji ·
          Resources — LottieFiles community · Pixel examples — inline SVG.
        </p>
      </div>
    </section>
  )
}
