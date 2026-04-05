import { useState } from 'react'

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'

/** Public-folder URLs (works with Vite base path). */
function publicAsset(file) {
  const base = import.meta.env.BASE_URL || '/'
  const root = String(base).replace(/\/$/, '')
  return `${root}/${file}`
}

const RESUME_DRIVE_VIEW =
  'https://drive.google.com/file/d/1OgplMsVuovtLxsdZKzXAOrVxCq9QTQZV/view?usp=sharing'
const RESUME_DRIVE_DOWNLOAD =
  'https://drive.google.com/uc?export=download&id=1OgplMsVuovtLxsdZKzXAOrVxCq9QTQZV'

const STATS = [
  { num: '3', accent: '+', label: 'Years building' },
  { num: '150k', accent: '+', label: 'Users reached' },
  { num: '2', accent: null, label: 'Publications' },
  { num: '8.58', accent: null, label: 'CGPA' },
]

const FUELS = [
  { name: 'Music', src: publicAsset('music.jpg') },
  { name: 'Sitcoms', src: publicAsset('sitcoms.webp') },
  { name: 'Reading', src: publicAsset('reading.jpg') },
  { name: 'Journaling', src: publicAsset('journaling1.jpg') },
  { name: 'Cooking', src: publicAsset('cooking.jpg') },
]

function FuelCard({ index, name, src }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      style={{
        flex: 1,
        height: 260,
        overflow: 'hidden',
        position: 'relative',
        minWidth: 0,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={src}
        alt={name}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: hover ? 0.75 : 0.55,
          transform: hover ? 'scale(1.05)' : 'scale(1)',
          transition: 'opacity 0.3s ease, transform 0.4s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.25)',
          pointerEvents: 'none',
        }}
        aria-hidden
      />
      <div style={{ position: 'absolute', bottom: 16, left: 16, zIndex: 2, pointerEvents: 'none' }}>
        <div
          style={{
            fontSize: 11,
            fontFamily: MONO,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 4,
          }}
        >
          {String(index).padStart(2, '0')}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{name}</div>
      </div>
    </div>
  )
}

export default function HomeBelowAboutSections() {
  return (
    <div style={{ background: '#060606' }}>
      {/* Section 1 — Stats Row */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '40px 80px',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              padding: i === 0 ? '0 32px 0 0' : '0 32px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              {s.num}
              {s.accent != null && s.accent !== '' && (
                <span style={{ color: '#6366f1' }}>{s.accent}</span>
              )}
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 11,
                fontFamily: MONO,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Section 2 — What Fuels Me */}
      <section style={{ padding: '72px 0 0', background: '#060606' }}>
        <header style={{ padding: '0 80px', marginBottom: 32 }}>
          <p
            style={{
              margin: 0,
              fontSize: 11,
              textTransform: 'uppercase',
              color: '#6366f1',
              fontFamily: MONO,
              letterSpacing: '0.15em',
            }}
          >
            BEYOND THE CODE
          </p>
          <h2
            style={{
              margin: '10px 0 0',
              fontSize: 32,
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.2,
            }}
          >
            What fuels me
          </h2>
        </header>
        <div
          style={{
            display: 'flex',
            width: '100%',
            gap: 0,
            padding: 0,
            flexDirection: 'row',
          }}
        >
          {FUELS.map((f, i) => (
            <FuelCard key={f.name} index={i + 1} name={f.name} src={f.src} />
          ))}
        </div>
      </section>

      {/* Section 3 — Resume Card */}
      <section style={{ padding: '56px 80px', background: '#060606' }}>
        <div
          style={{
            background: '#111',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: '28px 32px',
            borderTop: '2px solid rgba(99,102,241,0.45)',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 20,
            boxSizing: 'border-box',
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                fontFamily: MONO,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.12em',
              }}
            >
              DOCUMENT
            </p>
            <p
              style={{
                margin: '8px 0 0',
                fontSize: 14,
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.35,
              }}
            >
              Want the full picture?{' '}
              <span className="catchy-script inline font-normal" style={{ fontSize: '1.22em' }}>
                (It&apos;s one download away.)
              </span>
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
            <a
              href={RESUME_DRIVE_VIEW}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 10,
                padding: '11px 24px',
                fontSize: 13,
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                fontFamily: 'inherit',
                cursor: 'pointer',
                boxSizing: 'border-box',
              }}
            >
              Open in Drive ↗
            </a>
            <a
              href={RESUME_DRIVE_DOWNLOAD}
              download="Shreya-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#6366f1',
                border: 'none',
                borderRadius: 10,
                padding: '11px 24px',
                fontSize: 13,
                fontWeight: 600,
                color: '#fff',
                textDecoration: 'none',
                fontFamily: 'inherit',
                cursor: 'pointer',
                boxSizing: 'border-box',
              }}
            >
              Download PDF
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
