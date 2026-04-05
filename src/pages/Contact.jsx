import confetti from 'canvas-confetti/dist/confetti.module.mjs'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import smileyBundled from '../assets/smiley.png'
import ContactConnectLayoutGrid from '../components/ContactConnectLayoutGrid'

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
const CALENDLY_URL = 'https://calendly.com/shreyyaaa369'

const SERVICE_ID = String(import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '').trim()
const TEMPLATE_ID = String(import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '').trim()
const PUBLIC_KEY = String(import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '').trim()

/** Public fallback if bundled asset fails; handles subpath deploys */
function smileyPublicPath() {
  const base = import.meta.env.BASE_URL || '/'
  if (base === '/' || base === '') return '/smiley.png'
  return `${String(base).replace(/\/$/, '')}/smiley.png`
}

const CONFETTI_COLORS = ['#ffd93d', '#eab308', '#facc15', '#fef08a', '#ffffff', '#a78bfa', '#818cf8']

function shootTopConfetti(fire) {
  if (!fire) return
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }
  const x = 0.15 + Math.random() * 0.7
  void fire({
    particleCount: 90,
    spread: 110,
    startVelocity: 28,
    gravity: 1.05,
    drift: 0,
    ticks: 380,
    scalar: 0.95,
    origin: { x, y: 0 },
    colors: CONFETTI_COLORS,
  })
}

function ConnectHero() {
  const [hovered, setHovered] = useState(false)
  const canvasRef = useRef(null)
  const confettiFireRef = useRef(null)

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    try {
      confettiFireRef.current = confetti.create(canvas, { resize: true, useWorker: false })
    } catch {
      confettiFireRef.current = null
    }
    return () => {
      confettiFireRef.current?.reset?.()
      confettiFireRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!hovered) return undefined
    const fire = confettiFireRef.current
    if (!fire) return undefined
    shootTopConfetti(fire)
    const id = window.setInterval(() => shootTopConfetti(fire), 520)
    return () => window.clearInterval(id)
  }, [hovered])

  return (
    <div className="relative z-40 h-[calc(100vh-5rem)] min-h-[calc(100vh-5rem)] w-full overflow-x-visible bg-[#060606] px-4 py-12 sm:px-8">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 block h-full w-full"
        aria-hidden
      />
      <div className="relative z-10 flex h-full min-h-0 w-full flex-col items-center justify-center">
        <motion.p
          className="catchy-script relative z-10 mb-10 max-w-2xl px-2 text-center leading-snug text-[#a8a8a8]"
          style={{ fontSize: 'clamp(1.35rem, 3.5vw, 2.25rem)' }}
          animate={{ opacity: hovered ? 0.85 : 1, y: hovered ? -4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          A huge button for a huge impact
        </motion.p>

        <motion.div
          className="pointer-events-none absolute z-[2] rounded-full"
          style={{
            width: 500,
            height: 300,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -44%)',
          }}
          animate={{
            background: hovered
              ? 'radial-gradient(ellipse at center, rgba(234,179,8,0.35) 0%, rgba(234,179,8,0.12) 45%, transparent 72%)'
              : 'radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 70%)',
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        <div
          className="relative z-10 inline-flex flex-col items-center px-2"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <motion.a
            href="mailto:shreyyaaa369@gmail.com"
            className="cursor-pointer select-none"
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.div
              className="relative px-20 py-8 md:px-28 md:py-10"
              style={{ borderRadius: 9999 }}
              animate={{
                background: hovered
                  ? 'linear-gradient(160deg, #7a6a1a 0%, #4a4010 40%, #2a2408 100%)'
                  : 'linear-gradient(160deg, #2c2c2c 0%, #1a1a1a 40%, #0d0d0d 100%)',
                boxShadow: hovered
                  ? '0 0 0 1px rgba(255,220,50,0.12), 0 0 32px rgba(234,179,8,0.45), 0 0 64px rgba(234,179,8,0.2), 0 0 96px rgba(234,179,8,0.08), inset 0 1px 0 rgba(255,220,50,0.15)'
                  : '0 0 0 1px rgba(255,255,255,0.06), 0 0 28px rgba(0,0,0,0.55), 0 0 56px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <motion.span
                className="relative z-10 font-bold leading-none tracking-tight"
                style={{ fontSize: 'clamp(48px, 5vw, 52px)' }}
                animate={{ color: hovered ? '#e8c832' : '#ffffff' }}
                transition={{ duration: 0.35 }}
              >
                Connect
              </motion.span>
            </motion.div>
          </motion.a>

          <div
            className={`pointer-events-none absolute left-1/2 top-full z-30 mt-4 w-max -translate-x-1/2 transition-opacity duration-300 ease-out md:mt-5 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden
          >
            <img
              src={smileyBundled}
              alt=""
              width={120}
              height={120}
              className="h-[100px] w-[100px] object-contain [image-rendering:pixelated] sm:h-[112px] sm:w-[112px] md:h-[120px] md:w-[120px]"
              draggable={false}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = smileyPublicPath()
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  background: '#181818',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 8,
  padding: '11px 13px',
  fontSize: 14,
  color: '#fff',
  outline: 'none',
  fontFamily: 'inherit',
}

function SendArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function ConnectFormSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)

  const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

  useEffect(() => {
    if (!PUBLIC_KEY) return
    try {
      emailjs.init({ publicKey: PUBLIC_KEY })
    } catch {
      /* ignore */
    }
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setError(null)
      if (!configured) {
        setError(
          'Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to .env, save, and restart the dev server.'
        )
        return
      }
      const form = e.currentTarget
      const readField = (fieldName) => {
        const el = form.elements.namedItem(fieldName)
        if (el && 'value' in el) return String(el.value).trim()
        return ''
      }
      const fromName = readField('from_name') || name.trim()
      const fromEmail = readField('from_email') || email.trim()
      const subjectLine = readField('subject') || subject.trim()
      const body = readField('message') || message.trim()
      if (!fromName || !fromEmail || !subjectLine || !body) {
        setError('Please fill in all fields before sending.')
        return
      }
      setSending(true)
      try {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name: fromName,
            from_email: fromEmail,
            subject: subjectLine,
            message: body,
          },
          PUBLIC_KEY
        )
        setSent(true)
      } catch (err) {
        const msg =
          err?.text ||
          err?.message ||
          (typeof err === 'string' ? err : null) ||
          'Something went wrong. Please try again.'
        setError(msg)
      } finally {
        setSending(false)
      }
    },
    [name, email, subject, message, configured]
  )

  return (
    <section style={{ padding: '72px 0 0' }}>
      <header style={{ textAlign: 'left', marginBottom: 48 }}>
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
          LET&apos;S CONNECT
        </p>
        <h1
          style={{
            margin: '12px 0 0',
            fontSize: 'clamp(28px, 4vw, 32px)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.2,
            fontFamily: 'inherit',
          }}
        >
          <span style={{ display: 'block' }}>Let&apos;s talk about</span>
          <span style={{ display: 'block' }}>
            <span style={{ color: 'rgba(255,255,255,0.55)' }}>everything</span>
            <span style={{ color: '#fff' }}> and nothing.</span>
          </span>
        </h1>
        <p
          style={{
            margin: '16px 0 0',
            fontSize: 14,
            color: 'rgba(255,255,255,0.35)',
            maxWidth: 480,
            lineHeight: 1.5,
          }}
        >
          Whether it&apos;s a project, an opportunity, or just a good conversation — my inbox is always open.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-8">
        <div
          className="flex h-full min-h-0 min-w-0 flex-col"
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            overflow: 'hidden',
            background: '#060606',
          }}
        >
          {/* Top bar */}
          <div
            style={{
              background: '#060606',
              padding: '20px 28px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexShrink: 0,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: MONO,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)',
                  letterSpacing: '0.1em',
                }}
              >
                NEW MESSAGE
              </div>
              <div style={{ marginTop: 4, fontSize: 14, fontWeight: 600, color: '#fff' }}>Shreya</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} aria-hidden />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} aria-hidden />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} aria-hidden />
            </div>
          </div>

          {/* Form body or success */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              background: '#060606',
              padding: '24px 28px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {!sent ? (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex min-h-0 flex-1 flex-col"
                style={{ minHeight: 0 }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <input
                    type="text"
                    name="from_name"
                    autoComplete="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onInput={(e) => setName(e.currentTarget.value)}
                    style={inputStyle}
                  />
                  <input
                    type="email"
                    name="from_email"
                    autoComplete="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onInput={(e) => setEmail(e.currentTarget.value)}
                    style={inputStyle}
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  onInput={(e) => setSubject(e.currentTarget.value)}
                  style={{ ...inputStyle, marginBottom: 10 }}
                />
                <textarea
                  name="message"
                  placeholder="Tell me about your project or just say hi..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onInput={(e) => setMessage(e.currentTarget.value)}
                  rows={3}
                  style={{
                    ...inputStyle,
                    height: 90,
                    minHeight: 90,
                    resize: 'vertical',
                    marginBottom: 16,
                  }}
                />
                {error && (
                  <p style={{ margin: '0 0 12px', fontSize: 13, color: '#f87171' }} role="alert">
                    {error}
                  </p>
                )}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: 'auto',
                    paddingTop: 8,
                  }}
                >
                  <button
                    type="submit"
                    disabled={sending}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      background: '#6366f1',
                      border: 'none',
                      borderRadius: 8,
                      padding: '10px 20px',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#fff',
                      cursor: sending ? 'wait' : 'pointer',
                      fontFamily: 'inherit',
                      opacity: sending ? 0.85 : 1,
                    }}
                  >
                    {sending ? 'Sending…' : 'Send'}
                    {!sending && <SendArrow />}
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    margin: '0 auto',
                    borderRadius: '50%',
                    border: '1px solid rgba(99,102,241,0.3)',
                    background: 'rgba(99,102,241,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CheckIcon />
                </div>
                <p style={{ margin: '16px 0 0', fontSize: 17, fontWeight: 700, color: '#fff' }}>Message received!</p>
                <p style={{ margin: '8px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
              </div>
            )}
          </div>

          {/* Status bar */}
          <div
            style={{
              background: '#060606',
              padding: '10px 28px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              flexShrink: 0,
            }}
          >
            <span
              className="contact-pulse-dot"
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#22c55e',
                flexShrink: 0,
              }}
              aria-hidden
            />
            <span style={{ fontSize: 11, fontFamily: MONO, color: 'rgba(255,255,255,0.25)' }}>
              Available for new opportunities · Replies within 24h
            </span>
          </div>
        </div>
        <div className="flex min-h-0 min-w-0 flex-col lg:h-full">
          <BookMeetingPanel />
        </div>
      </div>
    </section>
  )
}

const BOOK_MEETING_ROWS = [
  {
    text: (
      <>
        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Duration · </span>
        <span style={{ color: '#fff', fontWeight: 500 }}>30 minutes</span>
      </>
    ),
  },
  {
    text: (
      <>
        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Where · </span>
        <span style={{ color: '#fff', fontWeight: 500 }}>Google Meet · link sent on confirm</span>
      </>
    ),
  },
  {
    text: (
      <>
        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Timezone · </span>
        <span style={{ color: '#fff', fontWeight: 500 }}>IST · India Standard Time</span>
      </>
    ),
  },
]

function BookMeetingPanel() {
  return (
    <div
      className="flex h-full min-h-0 flex-1 flex-col"
      style={{
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        overflow: 'hidden',
        background: '#060606',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          background: '#060606',
          padding: '20px 28px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexShrink: 0,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              fontFamily: MONO,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.1em',
            }}
          >
            30-MIN CHAT
          </div>
          <div style={{ marginTop: 4, fontSize: 14, fontWeight: 600, color: '#fff' }}>Let&apos;s talk</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} aria-hidden />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} aria-hidden />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} aria-hidden />
        </div>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          background: '#060606',
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
          Book a free 30-minute slot — we can walk through your idea, role, or anything you&apos;d like to align on.
        </p>
        <div style={{ marginTop: 20 }}>
          {BOOK_MEETING_ROWS.map((row, idx) => (
            <div
              key={idx}
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  flexShrink: 0,
                  background: '#1a1a2e',
                  border: '1px solid rgba(99,102,241,0.2)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="2" aria-hidden>
                  {idx === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                  {idx === 1 && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  )}
                  {idx === 2 && (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  )}
                </svg>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.4 }}>{row.text}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 16 }}>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'center',
              background: '#6366f1',
              borderRadius: 10,
              padding: 13,
              fontSize: 14,
              fontWeight: 600,
              color: '#fff',
              textDecoration: 'none',
              boxSizing: 'border-box',
            }}
          >
            Open Calendly ↗
          </a>
        </div>
      </div>

      <div
        style={{
          background: '#060606',
          padding: '10px 28px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 7,
          flexShrink: 0,
        }}
      >
        <span
          className="contact-pulse-dot"
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#6366f1',
            flexShrink: 0,
          }}
          aria-hidden
        />
        <span style={{ fontSize: 11, fontFamily: MONO, color: 'rgba(255,255,255,0.25)' }}>
          Calendly · Pick a time that works for you
        </span>
      </div>
    </div>
  )
}

function FindMeOnlineSection() {
  return (
    <section style={{ padding: '52px 0 80px' }}>
      <p
        style={{
          margin: 0,
          fontSize: 11,
          textTransform: 'uppercase',
          color: '#6366f1',
          fontFamily: MONO,
          letterSpacing: '0.12em',
        }}
      >
        SOCIALS
      </p>
      <h2 style={{ margin: '8px 0 28px', fontSize: 'clamp(28px, 4vw, 32px)', fontWeight: 700, color: '#fff' }}>
        Find me online
      </h2>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0">
          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.35,
            }}
          >
            Stalking welcome.{' '}
            <span className="catchy-script inline font-normal" style={{ fontSize: '1.22em' }}>
              (LinkedIn preferred.)
            </span>
          </p>
          <p style={{ margin: '16px 0 20px', fontSize: 14, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
            Follow my work, connect on LinkedIn, or check out what I&apos;ve been doing on GitHub.
          </p>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} aria-hidden />
            <span style={{ fontSize: 13, fontFamily: MONO, color: 'rgba(255,255,255,0.35)' }}>
              Open to work · Greater Noida- Delhi
            </span>
          </div>
        </div>
        <div className="flex w-full justify-center lg:justify-end">
          <ContactConnectLayoutGrid />
        </div>
      </div>
    </section>
  )
}

export default function Contact() {
  return (
    <>
      <div className="w-full bg-[#060606] pt-16">
        <ConnectHero />
      </div>
      <div className="border-t border-white/10 mx-6 bg-[#060606]" />

      <div className="contact-page-scope" style={{ width: '100%', background: '#060606' }}>
        <style>
          {`
          .contact-page-scope input::placeholder,
          .contact-page-scope textarea::placeholder {
            color: rgba(255,255,255,0.2);
          }
          .contact-page-scope input:focus,
          .contact-page-scope textarea:focus {
            border-color: rgba(99,102,241,0.45);
          }
          @keyframes contact-pulse-dot {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          .contact-pulse-dot {
            animation: contact-pulse-dot 2s ease-in-out infinite;
          }
        `}
        </style>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 80px',
            boxSizing: 'border-box',
          }}
        >
          <ConnectFormSection />
          <FindMeOnlineSection />
        </div>
      </div>
    </>
  )
}
