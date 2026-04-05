import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const EASE = [0.22, 0.61, 0.36, 1]

// Layout constants (px)
const YEAR_W         = 72
const TIMELINE_W     = 40
const TIMELINE_MX    = 24   // left + right margin around timeline column
const INNER_PAD      = 80   // paddingLeft of inner wrapper (match Contact / Projects rails)

// Center of timeline column, measured from inner wrapper's left border edge
// (border box, so includes the left padding)
const TIMELINE_CX = INNER_PAD + YEAR_W + TIMELINE_MX + TIMELINE_W / 2   // 140px

const EXPERIENCES = [
  {
    id: 'bytehint',
    year: '2026',
    date: 'Feb 2026 – Present',
    remote: true,
    company: 'ByteHint IT Solutions',
    roleLine: 'Junior Developer · EXM Tweaks',
    tags: ['React', 'Electron', 'OAuth', 'Node.js'],
    accent: '#22c55e',
    points: [
      'Engineered UI/UX, optimized script execution, and built a secure RBAC admin portal with OAuth (Discord/Google) for a platform serving 150,000+ active users.',
      "Built EXM's Game Mode from the ground up — complete UI, automated service management, and timer resolution tuning cutting execution time by 40%.",
      "Engineered a BIOS configuration module in EXM's Electron app with fail-safe nvram.txt and temp.txt state syncing, achieving 80% successful execution rate.",
    ],
  },
  {
    id: 'neurazor',
    year: '2025',
    date: 'Oct 2025 – Present',
    remote: true,
    company: 'NeuRazor Labs',
    roleLine: 'Full Stack Developer',
    tags: ['React 19', 'Supabase', 'Vite', 'REST API'],
    accent: '#e8846c',
    points: [
      'Architected a full-stack assessment platform with 15+ modules and real-time scoring — reduced admin time by 75%.',
      'Designed REST APIs across 20+ tables with 99.5% uptime and sub-200ms response times.',
      'Cut bundle size 45% via code splitting and lazy loading — Lighthouse scores in the 90s.',
    ],
  },
  {
    id: 'discover',
    year: '2024',
    date: 'Sept 2024 – Dec 2024',
    remote: true,
    company: 'Discover Architects and Designs',
    roleLine: 'Software Developer',
    tags: ['React', 'TypeScript', 'SQLite', 'Multer'],
    accent: '#2563eb',
    points: [
      'Built a React + TypeScript + SQLite platform — 60% higher engagement and 2000+ monthly users.',
      'Integrated Calendly with SMTP notifications — 500+ automated bookings per month.',
      'Gallery uploads via Multer middleware — 1000+ assets with fewer reliability issues.',
    ],
  },
]

const MONO = '"ui-monospace", "SFMono-Regular", "Menlo", monospace'
const INDIGO = '#6366f1'

export default function StackingExperience() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Map scroll progress → top position of the glowing dot within the inner wrapper
  const dotTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <>
      <style>{`
        .se-card {
          display: flex;
          overflow: hidden;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: #111111;
          transition: border-color 0.2s ease;
        }
        .se-card:hover {
          border-color: rgba(255,255,255,0.2);
        }
      `}</style>

      <section
        ref={sectionRef}
        aria-labelledby="experience-heading"
        style={{
          background: '#060606',
          paddingTop: 80,
          paddingBottom: 80,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            paddingLeft: INNER_PAD,
            paddingRight: INNER_PAD,
            boxSizing: 'border-box',
          }}
        >
          <header style={{ marginBottom: 32 }}>
            <p
              style={{
                margin: 0,
                fontFamily: MONO,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: INDIGO,
              }}
            >
              EXPERIENCE
            </p>
            <h2
              id="experience-heading"
              style={{
                margin: '10px 0 0',
                fontSize: 'clamp(28px, 4vw, 32px)',
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.2,
              }}
            >
              Work experience
            </h2>
          </header>
        </div>

        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            paddingLeft: INNER_PAD,
            paddingRight: INNER_PAD,
            boxSizing: 'border-box',
            position: 'relative',
          }}
        >
          {/* ── Full-height vertical line ───────────────────────────── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: TIMELINE_CX,
              top: 0,
              bottom: 0,
              width: 1,
              background: 'rgba(255,255,255,0.1)',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
            }}
          />

          {/* ── Traveling glowing dot ───────────────────────────────── */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: TIMELINE_CX,
              top: dotTop,
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'white',
              boxShadow: '0 0 8px 3px rgba(255,255,255,0.6)',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />

          {/* ── Experience rows ─────────────────────────────────────── */}
          {EXPERIENCES.map((exp, index) => {
            const isLast = index === EXPERIENCES.length - 1

            return (
              <div
                key={exp.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: isLast ? 0 : 48,
                }}
              >
                {/* Year label */}
                <div
                  style={{
                    width: YEAR_W,
                    flexShrink: 0,
                    textAlign: 'right',
                    paddingTop: 20,
                    fontFamily: MONO,
                    fontVariantNumeric: 'tabular-nums',
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.28)',
                    letterSpacing: '0.02em',
                    userSelect: 'none',
                  }}
                >
                  {exp.year}
                </div>

                {/* Static timeline dot (sits on top of the absolute line) */}
                <div
                  aria-hidden="true"
                  style={{
                    width: TIMELINE_W,
                    flexShrink: 0,
                    marginLeft: TIMELINE_MX,
                    marginRight: TIMELINE_MX,
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: 20,
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: 'white',
                      flexShrink: 0,
                    }}
                  />
                </div>

                {/* Animated card */}
                <motion.article
                  style={{ flex: 1, minWidth: 0 }}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.7, ease: EASE, delay: index * 0.1 }}
                >
                  <div className="se-card">
                    {/* Left accent bar */}
                    <div
                      aria-hidden="true"
                      style={{
                        width: 4,
                        minWidth: 4,
                        alignSelf: 'stretch',
                        background: exp.accent,
                        flexShrink: 0,
                      }}
                    />

                    {/* Card body */}
                    <div style={{ flex: 1, padding: '18px 20px 20px', minWidth: 0 }}>

                      {/* Meta: date · Remote */}
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, ease: EASE, delay: 0 }}
                        style={{
                          fontFamily: MONO,
                          fontSize: 11,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: 'rgba(255,255,255,0.45)',
                          margin: '0 0 6px',
                        }}
                      >
                        {exp.date}{exp.remote ? ' · Remote' : ''}
                      </motion.p>

                      {/* Company name */}
                      <motion.p
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
                        style={{
                          fontSize: 17,
                          fontWeight: 600,
                          color: 'white',
                          lineHeight: 1.2,
                          margin: '0 0 4px',
                        }}
                      >
                        {exp.company}
                      </motion.p>

                      {/* Role title */}
                      <motion.p
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, ease: EASE, delay: 0.14 }}
                        style={{
                          fontSize: 13,
                          color: 'rgba(255,255,255,0.6)',
                          margin: '0 0 12px',
                        }}
                      >
                        {exp.roleLine}
                      </motion.p>

                      {/* Tech tags */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 6,
                          marginBottom: 14,
                        }}
                      >
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: 13,
                              padding: '3px 10px',
                              border: '1px solid rgba(255,255,255,0.12)',
                              borderRadius: 4,
                              color: 'rgba(255,255,255,0.5)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>

                      {/* Bullet points */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {exp.points.map((pt, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, x: -18 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.55, ease: EASE, delay: 0.26 + j * 0.08 }}
                            style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}
                          >
                            <div
                              aria-hidden="true"
                              style={{
                                width: 5,
                                height: 5,
                                borderRadius: '50%',
                                background: 'white',
                                opacity: 0.4,
                                marginTop: 5,
                                flexShrink: 0,
                              }}
                            />
                            <span
                              style={{
                                fontSize: 13,
                                color: 'rgba(255,255,255,0.75)',
                                lineHeight: 1.6,
                              }}
                            >
                              {pt}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                    </div>
                  </div>
                </motion.article>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
