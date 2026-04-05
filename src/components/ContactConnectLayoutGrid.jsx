import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const spring = {
  type: 'spring',
  damping: 20,
  stiffness: 300,
}

const LINKEDIN = 'https://www.linkedin.com/in/shreya-analyst/'
const GITHUB = 'https://github.com/shreyahhh'
const EMAIL = 'mailto:shreyyaaa369@gmail.com'

/** Per-tile palette: brand = soft fill; link = dark fill + accent border */
const initialItems = [
  {
    id: 1,
    title: 'Shreya',
    description: 'Full-stack dev',
    isBrand: true,
    accent: {
      border: 'rgba(34, 197, 94, 0.45)',
      background: 'rgba(34, 197, 94, 0.2)',
      title: '#4ade80',
      desc: '#bbf7d0',
    },
  },
  {
    id: 2,
    title: 'GitHub',
    description: 'Code & projects',
    href: GITHUB,
    accent: {
      border: 'rgba(139, 92, 246, 0.65)',
      background: '#0a0a0a',
      title: '#c4b5fd',
      desc: '#a78bfa',
      shadow: '0 2px 10px rgba(139, 92, 246, 0.2)',
    },
  },
  {
    id: 3,
    title: 'LinkedIn',
    description: 'Connect',
    href: LINKEDIN,
    accent: {
      border: 'rgba(239, 68, 68, 0.75)',
      background: '#0a0a0a',
      title: '#f87171',
      desc: '#fca5a5',
      shadow: '0 2px 10px rgba(239, 68, 68, 0.28)',
    },
  },
  {
    id: 4,
    title: 'Email',
    description: 'Inbox',
    href: EMAIL,
    accent: {
      border: 'rgba(245, 158, 11, 0.65)',
      background: '#0a0a0a',
      title: '#fbbf24',
      desc: '#fcd34d',
      shadow: '0 2px 10px rgba(245, 158, 11, 0.2)',
    },
  },
]

function shuffle(array) {
  const arr = [...array]
  let currentIndex = arr.length
  let randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
  }
  return arr
}

function tileStyle(item) {
  const { accent } = item
  const base = {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: accent.border,
    background: accent.background,
    boxShadow: accent.shadow ?? 'none',
  }
  return base
}

export default function ContactConnectLayoutGrid() {
  const [items, setItems] = useState(initialItems)

  useEffect(() => {
    const id = window.setInterval(() => {
      setItems((prev) => shuffle(prev))
    }, 3000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <ul className="m-0 grid h-[150px] w-full max-w-[150px] list-none grid-cols-2 grid-rows-2 gap-2 p-0 md:h-[210px] md:max-w-[210px] md:w-[210px]">
      {items.map((item) => {
        const { accent } = item
        const inner = (
          <>
            <h3
              className={`font-bold leading-tight ${
                item.isBrand ? 'text-sm md:text-base' : 'text-xs md:text-sm'
              }`}
              style={{ color: accent.title }}
            >
              {item.title}
            </h3>
            <p
              className="mt-0.5 text-[9px] leading-snug md:text-[10px]"
              style={{ color: accent.desc }}
            >
              {item.description}
            </p>
          </>
        )

        const tileClass =
          'flex h-full min-h-0 flex-col items-center justify-center rounded-lg p-2 text-center box-border'

        if (item.href) {
          const isMail = item.href.startsWith('mailto:')
          return (
            <motion.li key={item.id} layout transition={spring} className="min-h-0 list-none">
              <a
                href={item.href}
                className={`${tileClass} transition-opacity hover:opacity-90`}
                style={tileStyle(item)}
                {...(isMail
                  ? {}
                  : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {inner}
              </a>
            </motion.li>
          )
        }

        return (
          <motion.li
            key={item.id}
            layout
            transition={spring}
            className={`min-h-0 list-none ${tileClass}`}
            style={tileStyle(item)}
          >
            {inner}
          </motion.li>
        )
      })}
    </ul>
  )
}
