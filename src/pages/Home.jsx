import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import HomeAboutSlideshow from '../components/HomeAboutSlideshow'
import HomeBelowAboutSections from '../components/HomeBelowAboutSections'

/** Single active letter: greatest index i with clientX >= slot i's left (gap between i and i+1 → i). */
function pickHeroNameLetterIndex(clientX, h1El) {
  const slots = h1El.querySelectorAll('.home-name-slot')
  if (!slots.length) return null
  const rects = Array.from(slots, (el) => el.getBoundingClientRect())
  const first = rects[0]
  const last = rects[rects.length - 1]
  if (clientX < first.left || clientX > last.right) return null
  let idx = -1
  for (let i = 0; i < rects.length; i++) {
    if (clientX >= rects[i].left) idx = i
  }
  return idx >= 0 ? idx : null
}

// ── Screen Cat ────────────────────────────────────────────────────────────────
// Walks slowly left→right, sleeps at edges, reacts to hover.
const CAT_SHEET = 'https://raw.githubusercontent.com/raynecloudy/oneko_db/master/default.png'
const PX    = 2           // 2× scale → 64 px cat, 512×256 sheet
const CSIZE = 32 * PX     // 64

// Sprite background-positions at 2× scale.
// oneko grid: (col * 32 * PX) px  (row * 32 * PX) px  (offsets are negative)
const S = (col, row) => `${col * 32 * PX}px ${row * 32 * PX}px`
const SPR = {
  walkE:       [S(-3, 0),  S(-3,-1)],          // east walk
  walkW:       null,                            // reuse walkE + scaleX(-1)
  idle:        S(-3,-3),                       // sitting
  alert:       S(-7,-3),                       // ears up / surprised
  tired:       S(-3,-2),                       // yawning
  sleeping:    [S(-2, 0),  S(-2,-1)],          // zzz
  scratch:     [S(-5, 0),  S(-6, 0), S(-7,0)], // scratching self
}

// Behaviour:
//  walk (east) ──► reach right edge ──► tired ──► sleep
//  hover during sleep ──► wake (alert) ──► sit-awake 3 s ──► walk (west)
//  walk (west) ──► reach left  edge ──► tired ──► sleep
//  hover during walk  ──► sit-hover (alert while hovered) ──► sit-resume 0.8 s ──► walk

function ScreenCat({ nameRef }) {
  const ref    = useRef(null)
  const hovRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const LEFT_EDGE    = 10
    const rightEdge    = () => window.innerWidth - CSIZE - 10
    const rand         = (a, b) => a + Math.random() * (b - a)
    const WALK_SPEED   = 1.25           // half speed
    const WALK_SPR_MS  = 120
    const SLEEP_SPR_MS = 500
    const SCRATCH_MS   = 110

    let x              = LEFT_EDGE
    let dir            = 'east'
    let state          = 'walk'
    let sprIdx         = 0
    let lastSpr        = 0
    let stateTs        = 0
    let nextBreak      = 0
    let breakDur       = 0
    let nameBreakDone  = false          // one name-edge break per eastward pass
    let prevHov        = false
    let started        = false
    let rafId

    const setX      = ()    => { el.style.left = `${x}px` }
    const single    = (pos) => { el.style.backgroundPosition = pos }
    const cycle     = (arr) => { el.style.backgroundPosition = arr[sprIdx % arr.length] }
    const setFacing = (d)   => { el.style.transform = d === 'west' ? 'scaleX(-1)' : 'scaleX(1)' }

    function enter(s, ts) {
      state = s; stateTs = ts; sprIdx = 0; lastSpr = ts
      // reset name-break flag every time the cat reaches an edge (new lap)
      if (s === 'tired') nameBreakDone = false
    }
    function scheduleBreak(ts) {
      nextBreak = ts + rand(3000, 7000)
    }

    el.style.left = `${x}px`
    setFacing(dir)
    single(SPR.walkE[0])

    const onEnter = () => { hovRef.current = true  }
    const onLeave = () => { hovRef.current = false }
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)

    function tick(ts) {
      if (!started) {
        started   = true
        stateTs   = ts
        lastSpr   = ts
        scheduleBreak(ts)
      }

      const hov       = hovRef.current
      const justHov   = hov  && !prevHov
      const justUnhov = !hov && prevHov
      prevHov = hov

      // ── SLEEPING (edges only) ──────────────────────────────────────────────
      if (state === 'sleep') {
        if (ts - lastSpr > SLEEP_SPR_MS) { lastSpr = ts; sprIdx++; cycle(SPR.sleeping) }
        if (justHov) { enter('wake', ts); single(SPR.alert) }

      // ── WAKE — alert then sit ─────────────────────────────────────────────
      } else if (state === 'wake') {
        single(SPR.alert)
        if (ts - stateTs > 700) { enter('sit-awake', ts); single(SPR.idle) }

      // ── SIT-AWAKE — sit 3 s then walk opposite ────────────────────────────
      } else if (state === 'sit-awake') {
        single(SPR.idle)
        if (ts - stateTs > 3000) {
          dir = dir === 'east' ? 'west' : 'east'
          enter('walk', ts)
          scheduleBreak(ts)
          setFacing(dir)
          single(SPR.walkE[0])
        }

      // ── WALKING ───────────────────────────────────────────────────────────
      } else if (state === 'walk') {
        if (justHov) {
          enter('sit-hover', ts); single(SPR.alert)
        } else {
          // Name-edge break: stop at the right end of "Shreya" once per eastward pass
          const nameRight = nameRef?.current?.getBoundingClientRect().right ?? -1
          if (dir === 'east' && !nameBreakDone && nameRight > 0 && x >= nameRight - CSIZE) {
            nameBreakDone = true
            enter('name-sit', ts)
            single(SPR.idle)
          // Random mid-run break
          } else if (ts >= nextBreak) {
            const pick = Math.random() < 0.5 ? 'sit-break' : 'scratch-break'
            breakDur = pick === 'sit-break' ? rand(1000, 2200) : rand(1500, 3000)
            enter(pick, ts)
            single(pick === 'sit-break' ? SPR.idle : SPR.scratch[0])
          } else if (dir === 'east') {
            x = Math.min(x + WALK_SPEED, rightEdge()); setX()
            if (ts - lastSpr > WALK_SPR_MS) { lastSpr = ts; sprIdx++; cycle(SPR.walkE) }
            if (x >= rightEdge()) { enter('tired', ts); single(SPR.tired) }
          } else {
            x = Math.max(x - WALK_SPEED, LEFT_EDGE); setX()
            if (ts - lastSpr > WALK_SPR_MS) { lastSpr = ts; sprIdx++; cycle(SPR.walkE) }
            if (x <= LEFT_EDGE) { enter('tired', ts); single(SPR.tired) }
          }
        }

      // ── NAME-SIT — sits at the end of "Shreya" ───────────────────────────
      } else if (state === 'name-sit') {
        single(SPR.idle)
        if (ts - stateTs > 1500) { enter('name-scratch', ts) }

      // ── NAME-SCRATCH — grooms itself at the end of "Shreya" ──────────────
      } else if (state === 'name-scratch') {
        if (ts - lastSpr > SCRATCH_MS) { lastSpr = ts; sprIdx++; cycle(SPR.scratch) }
        if (ts - stateTs > 2000) {
          enter('walk', ts); scheduleBreak(ts)
          single(SPR.walkE[0])
        }

      // ── SIT-BREAK — mid-run idle sit ──────────────────────────────────────
      } else if (state === 'sit-break') {
        single(SPR.idle)
        if (ts - stateTs > breakDur) {
          enter('walk', ts); scheduleBreak(ts)
          setFacing(dir); single(SPR.walkE[0])
        }

      // ── SCRATCH-BREAK — mid-run grooming ──────────────────────────────────
      } else if (state === 'scratch-break') {
        if (ts - lastSpr > SCRATCH_MS) { lastSpr = ts; sprIdx++; cycle(SPR.scratch) }
        if (ts - stateTs > breakDur) {
          enter('walk', ts); scheduleBreak(ts)
          setFacing(dir); single(SPR.walkE[0])
        }

      // ── TIRED — yawn before sleep (edges only) ────────────────────────────
      } else if (state === 'tired') {
        single(SPR.tired)
        if (ts - stateTs > 900) { enter('sleep', ts); cycle(SPR.sleeping) }

      // ── SIT-HOVER — alert while hovered during walk ───────────────────────
      } else if (state === 'sit-hover') {
        single(hov ? SPR.alert : SPR.idle)
        if (justUnhov) { enter('sit-resume', ts); single(SPR.idle) }

      // ── SIT-RESUME — brief pause then continue ────────────────────────────
      } else if (state === 'sit-resume') {
        single(SPR.idle)
        if (ts - stateTs > 800) {
          enter('walk', ts); scheduleBreak(ts)
          setFacing(dir); single(SPR.walkE[0])
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafId)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position:         'absolute',
        bottom:           '8rem',
        width:            CSIZE,
        height:           CSIZE,
        backgroundImage:  `url('${CAT_SHEET}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize:   `${256 * PX}px ${128 * PX}px`,
        imageRendering:   'pixelated',
        zIndex:           20,
        pointerEvents:    'auto',
        cursor:           'default',
        transformOrigin:  'bottom center',
      }}
    />
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home({ navigate }) {
  const nameRef = useRef(null)
  const [activeNameLetter, setActiveNameLetter] = useState(null)

  const onNamePointerMove = useCallback((e) => {
    const el = nameRef.current
    if (!el) return
    const next = pickHeroNameLetterIndex(e.clientX, el)
    setActiveNameLetter((prev) => (prev === next ? prev : next))
  }, [])

  const onNamePointerLeave = useCallback(() => {
    setActiveNameLetter(null)
  }, [])

  return (
    <div className="bg-[#060606]">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col justify-end bg-[#060606]">

        {/* Cat lives inside the hero so it scrolls with the page */}
        <ScreenCat nameRef={nameRef} />

        {/* Bottom block — intro + name */}
        <motion.div
          className="relative z-10 w-full min-w-0 px-8 md:px-14 pb-32"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        >
          {/* Tagline */}
          <p
            className="mb-4 min-w-0 overflow-x-auto whitespace-nowrap leading-snug text-[#888] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            style={{ fontSize: 14 }}
          >
            Not just another dev on the internet.{' '}
            <span className="catchy-script inline font-normal" style={{ fontSize: '1.22em' }}>
              (Okay maybe. But a really good one.)
            </span>
          </p>

          <h1
            ref={nameRef}
            aria-label="Shreya"
            className="home-shreya-heading font-black leading-[0.82] tracking-tighter text-white select-none"
            onPointerMove={onNamePointerMove}
            onPointerLeave={onNamePointerLeave}
            onPointerCancel={onNamePointerLeave}
          >
            <span aria-hidden="true">
              {'Shreya'.split('').map((char, i) => (
                <span
                  key={`${char}-${i}`}
                  className={`home-name-slot${activeNameLetter === i ? ' home-name-slot--active' : ''}`}
                >
                  <span className="home-name-base">{char}</span>
                  <span className="home-name-fx">{char}</span>
                </span>
              ))}
            </span>
          </h1>

        </motion.div>
      </section>

      {/* ── ABOUT / SUMMARY — same horizontal rails as Resume (max-w-6xl + px-6) ─ */}
      <section className="border-t border-white/10 bg-[#060606] py-20">
        <div className="mx-auto box-border max-w-[1200px] px-[80px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-400">About</p>
            <div className="grid items-start gap-10 md:grid-cols-2 md:gap-12">
              <div>
                <h2 className="mb-5 font-bold text-white" style={{ fontSize: 'clamp(28px, 4vw, 32px)', lineHeight: 1.2 }}>
                  Who I Am
                </h2>
                <p className="mb-4 text-[17px] font-medium leading-snug text-white">
                  I build things that are fast, beautiful, and actually work.
                </p>
                <p className="text-[14px] leading-relaxed text-[#a1a1a1]">
                  CS student at Bennett University, graduating 2026 but I stopped waiting for a degree to start shipping.
                  I’ve built for platforms with 150,000+ users, published research in Springer and Elsevier, and I lead design
                  while writing the code behind it. Full stack by skill, detail-obsessed by nature.
                </p>
              </div>
              <HomeAboutSlideshow />
            </div>
          </motion.div>
        </div>
      </section>

      <HomeBelowAboutSections />

    </div>
  )
}
