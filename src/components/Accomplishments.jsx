import { useCallback, useRef, useState } from 'react'

const INDIGO = '#6366f1'
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'

const CARDS = [
  {
    id: 'luminous',
    title: 'Top 10 Nationally — Luminous',
    description: 'Ranked top 10 out of 45,000+ teams in the Luminous Innovation Challenge.',
    link: 'https://venerable-belekoy-5b5dd9.netlify.app/',
    topRgb: '99, 102, 241',
  },
  {
    id: 'nest',
    title: 'Semi-Finalist — NEST2025 (Novartis)',
    description:
      'Recognized for developing a data-driven ML framework to forecast clinical trial Recruitment Rate.',
    link: 'https://github.com/shreyahhh/NEST_2025',
    topRgb: '34, 197, 94',
  },
  {
    id: 'hackathon',
    title: 'Hackathon Participant',
    description: 'Active in Woodpecker, Myntra WeForShe, and multiple national-level hackathons.',
    link: 'https://github.com/shreyahhh/WeForShe',
    topRgb: '245, 158, 11',
  },
  {
    id: 'certs',
    title: 'Multiple Certifications',
    description: 'Earned certificates across ML, Web Dev, and Cloud domains — continuous upskilling.',
    link: 'https://www.linkedin.com/in/shreya-analyst/details/certifications/',
    topRgb: '232, 121, 249',
  },
]

function MarqueeCard({ card, onPointerEnter, onPointerLeave }) {
  const rafRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [spotlight, setSpotlight] = useState('transparent')
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        const { x, y } = mouseRef.current
        setSpotlight(
          `radial-gradient(280px circle at ${x}px ${y}px, rgba(${card.topRgb}, 0.13), transparent 70%)`
        )
        rafRef.current = null
      })
    }
  }, [card.topRgb])

  const handleEnter = useCallback(() => {
    setHovered(true)
    onPointerEnter()
  }, [onPointerEnter])

  const handleLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    setSpotlight('transparent')
    setHovered(false)
    onPointerLeave()
  }, [onPointerLeave])

  return (
    <div
      role="article"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: 320,
        flexShrink: 0,
        background: '#111',
        borderLeft: `1px solid ${hovered ? `rgba(${card.topRgb}, 0.4)` : 'rgba(255,255,255,0.07)'}`,
        borderRight: `1px solid ${hovered ? `rgba(${card.topRgb}, 0.4)` : 'rgba(255,255,255,0.07)'}`,
        borderBottom: `1px solid ${hovered ? `rgba(${card.topRgb}, 0.4)` : 'rgba(255,255,255,0.07)'}`,
        borderTop: hovered
          ? `2px solid rgba(${card.topRgb}, 0.5)`
          : `2px solid rgba(${card.topRgb}, 0.35)`,
        borderRadius: 16,
        padding: 28,
        minHeight: 180,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        transformOrigin: 'center center',
        boxSizing: 'border-box',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          borderRadius: 16,
          overflow: 'hidden',
          background: spotlight,
          transition: spotlight === 'transparent' ? 'background 0.35s ease' : 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', minHeight: 0 }}>
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: 17,
              fontWeight: 600,
              color: '#fff',
              lineHeight: 1.35,
            }}
          >
            {card.title}
          </h3>
          <p
            style={{
              margin: '12px 0 0',
              fontSize: 14,
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.6,
            }}
          >
            {card.description}
          </p>
        </div>
        <a
          href={card.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: 20,
            fontSize: 13,
            fontWeight: 500,
            color: `rgb(${card.topRgb})`,
            textDecoration: 'none',
            alignSelf: 'flex-start',
          }}
        >
          View ↗
        </a>
      </div>
    </div>
  )
}

export default function Accomplishments() {
  const [marqueeHoverDepth, setMarqueeHoverDepth] = useState(0)
  const pauseMarquee = marqueeHoverDepth > 0

  const bumpEnter = useCallback(() => {
    setMarqueeHoverDepth((d) => d + 1)
  }, [])
  const bumpLeave = useCallback(() => {
    setMarqueeHoverDepth((d) => Math.max(0, d - 1))
  }, [])

  const STRIP_GAP = 20

  const renderStrip = (suffix) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: STRIP_GAP,
        flexShrink: 0,
        /* Same gap as between cards so the A|B loop seam matches (keeps -50% loop seamless) */
        paddingRight: STRIP_GAP,
      }}
    >
      {CARDS.map((card) => (
        <MarqueeCard
          key={`${card.id}-${suffix}`}
          card={card}
          onPointerEnter={bumpEnter}
          onPointerLeave={bumpLeave}
        />
      ))}
    </div>
  )

  return (
    <>
      <style>
        {`
          @keyframes accomplishments-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .accomplishments-marquee-track {
            animation: accomplishments-marquee 28s linear infinite;
            will-change: transform;
          }
        `}
      </style>

      <section
        style={{
          background: '#060606',
          paddingTop: 80,
          paddingBottom: 80,
        }}
        aria-labelledby="accomplishments-heading"
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            paddingLeft: 80,
            paddingRight: 80,
            boxSizing: 'border-box',
            marginBottom: 40,
          }}
        >
          <p
            style={{
              margin: '0 0 10px',
              fontFamily: MONO,
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: INDIGO,
            }}
          >
            HIGHLIGHTS
          </p>
          <h2
            id="accomplishments-heading"
            style={{
              margin: 0,
              fontSize: 'clamp(28px, 4vw, 32px)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.2,
            }}
          >
            Accomplishments
          </h2>
        </div>

        <div
          style={{
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <div
            className="accomplishments-marquee-track"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: 'max-content',
              gap: 0,
              /* Scale() does not affect layout; extra vertical space stops hover zoom clipping */
              paddingTop: 20,
              paddingBottom: 20,
              animationPlayState: pauseMarquee ? 'paused' : 'running',
            }}
          >
            {renderStrip('a')}
            {renderStrip('b')}
          </div>
        </div>
      </section>
    </>
  )
}


