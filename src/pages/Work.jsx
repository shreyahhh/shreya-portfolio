import { motion } from 'framer-motion'

const EXPERIENCE = [
  {
    role: 'Junior Developer',
    company: 'ByteHint IT Solutions',
    location: 'Remote',
    period: 'Feb 2026 – Present',
    current: true,
    achievements: [
      'Working on EXM Tweaks — an internal product focused on delivering developer tooling and workflow enhancements.',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'NeuRazor Labs',
    location: 'Remote',
    period: 'Oct 2025 – Present',
    current: false,
    achievements: [
      'Architected full-stack assessment platform using React 19, Vite, Supabase — built 15+ interactive modules with real-time scoring, reducing admin time by 75%.',
      'Designed scalable RESTful API architecture handling 2000+ database operations across 20+ tables; achieved 99.5% uptime and sub-200ms response times.',
      'Optimized performance via code splitting & lazy loading — reduced bundle size by 45% and achieved a 92+ Lighthouse score.',
    ],
  },
  {
    role: 'Software Developer',
    company: 'Discover Architects and Designs',
    location: 'Remote',
    period: 'Sept 2024 – Dec 2024',
    current: false,
    achievements: [
      'Engineered a full-stack web platform using React, TypeScript, and SQLite — increased client engagement by 60% and served 2000+ monthly users.',
      'Integrated Calendly API with SMTP notifications — automated 500+ bookings monthly and reduced scheduling overhead by 80%.',
      'Introduced file upload with Multer middleware — supported 1000+ gallery uploads and cut access issues by 50%.',
    ],
  },
]

const ACCOMPLISHMENTS = [
  { icon: '🥇', title: 'Top 10 Nationally — Luminous', desc: 'Ranked top 10 out of 45,000+ teams in the Luminous innovation competition.' },
  { icon: '🏆', title: 'Semi-Finalist — NEST2025 (Novartis)', desc: 'Recognized for developing a data-driven ML framework to forecast clinical trial Recruitment Rate.' },
  { icon: '📖', title: 'Springer Research Paper', desc: 'Published research at Springer conference 2024 — Amazon Review sentiment analysis.' },
  { icon: '📰', title: 'Elsevier Journal Paper', desc: 'Published review in Computers and Electrical Engineering (2026) — Multimodal Sentiment Analysis: Taxonomy, issues, challenges, and future perspectives.', url: 'https://www.sciencedirect.com/science/article/abs/pii/S0045790626000273' },
  { icon: '💡', title: 'Hackathon Participant', desc: 'Active in Woodpecker, Myntra Hackerramp WeForShe, and multiple national-level hackathons.' },
  { icon: '📜', title: 'Multiple Certifications', desc: 'Earned certificates across ML, Web Dev, and Cloud domains — continuous upskilling.' },
]

export default function Work() {
  return (
    <div className="pt-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="py-16 border-b border-white/10 mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Experience</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white">Work</h1>
          <p className="mt-4 text-[#a1a1a1] max-w-xl">My professional journey building real products with real impact.</p>
        </motion.div>

        {/* Experience */}
        <section className="mb-16">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">Timeline</p>
            <h2 className="text-2xl font-bold text-white">Professional Experience</h2>
          </motion.div>

          <div className="space-y-5">
            {EXPERIENCE.map((exp, i) => (
              <motion.div key={exp.company}
                className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                      {exp.current && (
                        <span className="text-xs bg-green-500/10 border border-green-500/20 text-green-400 px-2.5 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-indigo-400 text-sm font-medium">{exp.company} · {exp.location}</p>
                  </div>
                  <span className="text-xs text-[#a1a1a1] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full self-start flex-shrink-0">
                    {exp.period}
                  </span>
                </div>
                <div className="border-t border-white/8 mb-5" />
                <ul className="space-y-3">
                  {exp.achievements.map((a, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-[#a1a1a1] leading-relaxed">
                      <span className="text-indigo-400 flex-shrink-0 mt-0.5">→</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Accomplishments */}
        <section className="pb-20">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">Highlights</p>
            <h2 className="text-2xl font-bold text-white">Accomplishments</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {ACCOMPLISHMENTS.map((item, i) => (
              <motion.a key={item.title}
                href={item.url ?? undefined}
                target={item.url ? '_blank' : undefined}
                rel={item.url ? 'noopener noreferrer' : undefined}
                className={`bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 block ${item.url ? 'cursor-pointer' : 'cursor-default'}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{item.icon}</span>
                  {item.url && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-[#555] flex-shrink-0 mt-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-[#a1a1a1] leading-relaxed">{item.desc}</p>
              </motion.a>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
