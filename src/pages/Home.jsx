import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

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

// ── Data ──────────────────────────────────────────────────────────────────────
const SKILLS = [
  { title: 'Languages',      skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL', 'C++'] },
  { title: 'Frontend',       skills: ['React.js', 'Next.js 14', 'Vue.js', 'Tailwind CSS', 'Shadcn/ui', 'Redux'] },
  { title: 'Backend & APIs', skills: ['Node.js', 'Express.js', 'FastAPI', 'GraphQL', 'WebSockets', 'n8n'] },
  { title: 'Databases',      skills: ['PostgreSQL', 'SQLite', 'Firebase', 'Supabase', 'Docker'] },
  { title: 'AI / ML',        skills: ['Gemini API', 'OpenRouter', 'NLP', 'XGBoost', 'OpenCV'] },
  { title: 'Tools',          skills: ['Git', 'GitHub', 'OAuth 2.0', 'JWT', 'Vercel', 'Netlify'] },
]

const SOCIALS = [
  {
    name: 'GitHub', handle: '@shreyahhh', url: 'https://github.com/shreyahhh',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.234 1.911 1.234 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576 4.765-1.584 8.199-6.081 8.199-11.384 0-6.627-5.373-12-12-12z"/></svg>,
  },
  {
    name: 'LinkedIn', handle: '@shreya-analyst', url: 'https://www.linkedin.com/in/shreya-analyst/',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
  },
  {
    name: 'LeetCode', handle: '@shreyahhh_', url: 'https://leetcode.com/u/shreyahhh_/',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z"/></svg>,
  },
  {
    name: 'Unstop', handle: '@shreyamr4373', url: 'https://unstop.com/u/shreyamr4373',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-7 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/></svg>,
  },
  {
    name: 'Email', handle: 'shreyyaaa369@gmail.com', url: 'mailto:shreyyaaa369@gmail.com',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>,
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home({ navigate }) {
  const nameRef = useRef(null)

  return (
    <div>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end">

        {/* Cat lives inside the hero so it scrolls with the page */}
        <ScreenCat nameRef={nameRef} />

        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 inset-x-0 h-2/3 bg-gradient-to-b from-indigo-950/30 to-transparent" />
          <div className="absolute bottom-0 left-1/3 w-[50vw] h-[40vh] bg-indigo-600/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[30vw] h-[30vh] bg-purple-600/6 rounded-full blur-[100px]" />
        </div>

        {/* Top-right meta */}
        <motion.div
          className="absolute top-24 right-8 md:right-14 text-right"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-xs text-[#555] uppercase tracking-widest">Currently at</p>
          <p className="text-sm text-[#a1a1a1] font-medium">NeuRazor Labs</p>
        </motion.div>

        {/* Bottom block — intro + name */}
        <motion.div
          className="relative z-10 px-8 md:px-14 pb-32"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        >
          {/* Tagline */}
          <p className="text-base md:text-lg text-[#888] max-w-xs leading-snug mb-4">
            Hey! I build fast, beautiful<br />
            apps — from idea to deployment.
          </p>

          {/* Massive name */}
          <h1
            ref={nameRef}
            className="font-black text-white leading-[0.82] tracking-tighter select-none"
            style={{ fontSize: 'clamp(72px, 22.5vw, 360px)', marginLeft: '-0.03em' }}
          >
            Shreya
          </h1>

        </motion.div>
      </section>

      {/* ── ABOUT / SUMMARY ──────────────────────────────── */}
      <section className="border-t border-white/10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">About</p>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold mb-5 text-white">Who I Am</h2>
                <p className="text-[#a1a1a1] leading-relaxed mb-4">
                  I'm a Computer Science Engineering student at Bennett University with a CGPA of 8.80, graduating in 2026.
                  I specialize in full-stack development with a passion for AI/ML integrations, performance optimization, and beautiful UIs.
                </p>
                <p className="text-[#a1a1a1] leading-relaxed">
                  As a Design Head and developer, I bring both technical precision and aesthetic sensibility to everything I build.
                  Currently contributing as a Full Stack Developer at NeuRazor Labs.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'CGPA', value: '8.80 / 10', icon: '🎓' },
                  { label: 'University', value: 'Bennett University', icon: '🏫' },
                  { label: 'Batch', value: '2022 – 2026', icon: '📅' },
                  { label: 'Role', value: 'Full-Stack Dev', icon: '💻' },
                ].map((item) => (
                  <div key={item.label} className="bg-[#111] border border-white/10 rounded-xl p-4">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <p className="text-xs text-[#a1a1a1] uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-sm font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────── */}
      <section className="border-t border-white/10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Technical Stack</p>
            <h2 className="text-3xl font-bold mb-10 text-white">Skills</h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {SKILLS.map((cat) => (
                <div key={cat.title} className="bg-[#111] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">{cat.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s) => (
                      <span key={s} className="text-xs text-[#a1a1a1] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── RESUME ───────────────────────────────────────── */}
      <section className="border-t border-white/10 py-20 px-6 pb-28">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Document</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Resume</h2>
                <p className="text-sm text-[#a1a1a1]">Open or download my latest resume.</p>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://drive.google.com/file/d/1Ra6JNYZAlCX9SH5oXi_cdeMR5G03JdJR/view?usp=sharing"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold hover:from-indigo-400 hover:to-purple-400 transition-all"
                >
                  Open in Drive ↗
                </a>
                <a
                  href="https://drive.google.com/file/d/1Ra6JNYZAlCX9SH5oXi_cdeMR5G03JdJR/view?usp=sharing"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-sm font-semibold hover:bg-white/10 transition-all"
                >
                  Download
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
