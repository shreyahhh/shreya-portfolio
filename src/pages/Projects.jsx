import { useState } from 'react'
import { motion } from 'framer-motion'

const RESEARCH = [
  {
    title: 'Demand Forecasting',
    year: '2023',
    tags: ['Python', 'Time Series', 'Forecasting'],
    desc: 'Predicted future product demand from historical sales data. Implemented time series models to improve inventory management and reduce stockouts.',
    github: 'https://github.com/shreyahhh/Demand-Forecasting',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'FFN-MNIST Dataset',
    year: '2023',
    tags: ['Python', 'Neural Networks', 'Deep Learning'],
    desc: 'Classified handwritten digits from the MNIST dataset using a Feed Forward Neural Network, achieving high accuracy.',
    github: 'https://github.com/shreyahhh/FFN-MNIST',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Amazon Review Analyzer',
    year: 'Nov 2023 – May 2024',
    tags: ['Python', 'NLP', 'ML', 'Statistics'],
    desc: 'Analyzed product reviews to understand impact on customer satisfaction. Research paper accepted at Springer conference 2024. Improved satisfaction scores by 15%.',
    github: 'https://github.com/shreyahhh/AmazonReviewAnalyser',
    img: 'https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'CV Football Analysis (YOLOv8)',
    year: '2024',
    tags: ['Python', 'YOLOv8', 'Computer Vision', 'OpenCV'],
    desc: 'Computer vision system for football analytics — automated player/ball detection and tracking for match analysis.',
    github: 'https://github.com/shreyahhh/CV_for_Football_Analysis_YOLOv8',
    img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80',
  },
]

const DEPLOYED = [
  {
    title: 'MouseAI — Intelligent Chat Application',
    url: 'https://mouseai.netlify.app/',
    github: 'https://github.com/shreyahhh/My-Chatbot-MOUSE',
    tags: ['Next.js 14', 'TypeScript', 'GraphQL', 'PostgreSQL'],
    desc: 'Production-ready AI chatbot handling 100+ concurrent users. Real-time messaging via GraphQL subscriptions with sub-200ms response times. n8n webhook pipeline with OpenRouter AI processing 500+ daily requests.',
  },
  {
    title: 'Emote — AI Mental Wellness Platform',
    url: 'https://emote-ai-journal.vercel.app/',
    github: 'https://github.com/shreyahhh/EmoteAI_Journal',
    tags: ['React', 'Firebase', 'Gemini AI', 'Chart.js'],
    desc: 'AI-powered journaling with Google Gemini for emotional analysis. Serving 100+ users with 95% satisfaction. HIPAA-compliant architecture protecting 10,000+ journal entries.',
  },
  {
    title: 'ADmyBRAND — AI Marketing Platform',
    url: 'https://a-dmy-brand-ultimate-ui-ux-project-cw6n-q9j31q0e4.vercel.app/',
    github: 'https://github.com/shreyahhh/ADmyBRAND-Ultimate-UI-UX-Project',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    desc: '15+ reusable components, 100% type safety, 60fps Framer Motion animations. Sub-2s load times, 99.9% uptime on Vercel.',
  },
  {
    title: 'Ecosync — Solar Energy Platform',
    url: 'https://venerable-belekoy-5b5dd9.netlify.app/',
    github: 'https://github.com/shreyahhh/Ecosync-Luminous-Top-10-Project',
    tags: ['React', 'TypeScript', 'XGBoost', 'ML'],
    desc: 'Top 10 nationally in Luminous innovation competition (45,000+ teams). Projects 25% lower household energy costs and 30% higher solar utilization.',
  },
  {
    title: 'GigFlow — Freelancing Marketplace',
    url: 'https://gigflow-bids-on-gigs.vercel.app/',
    github: 'https://github.com/shreyahhh/GigFlow',
    tags: ['MERN Stack', 'Socket.io', 'JWT', 'Redux'],
    desc: 'Full-stack marketplace with real-time Socket.io notifications. Atomic MongoDB transactions prevent race conditions in the hiring system.',
  },
  {
    title: 'TaskFlow — Task Management System',
    url: 'https://taskflow-three-beta.vercel.app/',
    github: 'https://github.com/shreyahhh/Task-Tracker-HEXA-SOLUTIONS',
    tags: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    desc: 'Task management with automatic backups, atomic writes, and auto-recovery from corrupted files.',
  },
]

function GHIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.6-.18-3.29-.8-3.29-3.56 0-.79.28-1.44.74-1.95-.07-.18-.32-.92.07-1.91 0 0 .6-.19 1.97.74.57-.16 1.18-.24 1.79-.24.61 0 1.22.08 1.79.24 1.37-.93 1.97-.74 1.97-.74.39.99.14 1.73.07 1.91.46.51.74 1.16.74 1.95 0 2.77-1.69 3.38-3.3 3.56.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function LiveIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  )
}

function DeployedCard({ p, idx }) {
  const [loading, setLoading] = useState(true)
  const [blocked, setBlocked] = useState(false)

  return (
    <motion.div
      className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 cursor-pointer group flex flex-col"
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.07 }}
      onClick={() => window.open(p.url, '_blank', 'noopener,noreferrer')}
    >
      {/* Preview */}
      <div className="relative h-52 bg-[#0d0d0d] flex-shrink-0">
        {!blocked ? (
          <>
            <iframe
              src={p.url} title={p.title} loading="lazy"
              className="w-full h-full border-none"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              onLoad={() => setLoading(false)}
              onError={() => { setLoading(false); setBlocked(true) }}
            />
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0d0d]">
                <div className="w-8 h-8 border-2 border-white/10 border-t-indigo-500 rounded-full animate-spin mb-2" />
                <p className="text-xs text-[#a1a1a1]">Loading…</p>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <span className="text-4xl mb-3">🚀</span>
            <p className="text-xs text-[#a1a1a1]">Click to open live site</p>
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="text-xs text-white border border-white/20 bg-white/10 px-4 py-2 rounded-lg">Open live ↗</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-white leading-snug">{p.title}</h3>
          <div className="flex gap-1.5 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            <a href={p.url} target="_blank" rel="noopener noreferrer"
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-indigo-400 hover:bg-white/10 transition-all">
              <LiveIcon />
            </a>
            <a href={p.github} target="_blank" rel="noopener noreferrer"
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-[#a1a1a1] hover:text-white hover:bg-white/10 transition-all">
              <GHIcon />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2.5 py-0.5 rounded-full">{t}</span>
          ))}
        </div>
        <p className="text-xs text-[#a1a1a1] leading-relaxed">{p.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <div className="pt-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="py-16 border-b border-white/10 mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Portfolio</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white">Projects</h1>
          <p className="mt-4 text-[#a1a1a1] max-w-xl">Research work, deployed apps, and everything in between.</p>
        </motion.div>

        {/* Category 1: Research */}
        <section className="mb-16">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">Category 01</p>
            <h2 className="text-2xl font-bold text-white">Research &amp; Academic</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {RESEARCH.map((p, i) => (
              <motion.div key={p.title}
                className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}>
                <div className="h-44 overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                    <span className="text-xs text-[#a1a1a1] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full flex-shrink-0 ml-2">{p.year}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs text-[#a1a1a1] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                  <p className="text-xs text-[#a1a1a1] leading-relaxed mb-3">{p.desc}</p>
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                    <GHIcon /> View on GitHub
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Category 2: Deployed */}
        <section className="pb-20">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">Category 02</p>
            <h2 className="text-2xl font-bold text-white">Deployed Applications</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {DEPLOYED.map((p, i) => (
              <DeployedCard key={p.title} p={p} idx={i} />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
