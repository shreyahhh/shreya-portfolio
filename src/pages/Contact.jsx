import { motion } from 'framer-motion'

const SOCIALS = [
  {
    name: 'LinkedIn', handle: 'linkedin.com/in/shreya-analyst', url: 'https://www.linkedin.com/in/shreya-analyst/',
    desc: 'Professional network & career updates',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
    color: 'indigo',
  },
  {
    name: 'GitHub', handle: 'github.com/shreyahhh', url: 'https://github.com/shreyahhh',
    desc: 'Open source projects & code',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.234 1.911 1.234 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576 4.765-1.584 8.199-6.081 8.199-11.384 0-6.627-5.373-12-12-12z"/></svg>,
    color: 'purple',
  },
  {
    name: 'LeetCode', handle: 'leetcode.com/u/shreyahhh_', url: 'https://leetcode.com/u/shreyahhh_/',
    desc: 'DSA & competitive programming',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z"/></svg>,
    color: 'indigo',
  },
  {
    name: 'Unstop', handle: 'unstop.com/u/shreyamr4373', url: 'https://unstop.com/u/shreyamr4373',
    desc: 'Hackathons & competitions',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-7 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/></svg>,
    color: 'purple',
  },
]

export default function Contact() {
  return (
    <div className="pt-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="py-16 border-b border-white/10 mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Get in Touch</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white">Let's Connect</h1>
          <p className="mt-4 text-[#a1a1a1] max-w-xl text-lg leading-relaxed">
            Open to opportunities, collabs, or just a good conversation. Reach out however feels easiest.
          </p>
        </motion.div>

        {/* Direct contact cards */}
        <section className="mb-14">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">Direct</p>
            <h2 className="text-2xl font-bold text-white">Reach Out</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Email */}
            <motion.a href="mailto:shreyyaaa369@gmail.com"
              className="group bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-indigo-400/40 hover:bg-indigo-500/5 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4 }} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <p className="text-xs text-[#a1a1a1] uppercase tracking-wider mb-1">Email</p>
              <p className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">shreyyaaa369@gmail.com</p>
              <p className="text-xs text-[#a1a1a1] mt-1">Best for opportunities</p>
            </motion.a>

            {/* Phone */}
            <motion.a href="tel:+919451954329"
              className="group bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-purple-400/40 hover:bg-purple-500/5 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <p className="text-xs text-[#a1a1a1] uppercase tracking-wider mb-1">Phone</p>
              <p className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">+91 9451954329</p>
              <p className="text-xs text-[#a1a1a1] mt-1">Available on WhatsApp</p>
            </motion.a>

            {/* Calendly */}
            <motion.a href="https://calendly.com/shreyyaaa369" target="_blank" rel="noopener noreferrer"
              className="group bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-indigo-400/40 hover:bg-indigo-500/5 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <p className="text-xs text-[#a1a1a1] uppercase tracking-wider mb-1">Schedule</p>
              <p className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">Book a Meeting</p>
              <p className="text-xs text-[#a1a1a1] mt-1">30-min chat via Calendly ↗</p>
            </motion.a>
          </div>
        </section>

        {/* Social links */}
        <section className="pb-20">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">Socials</p>
            <h2 className="text-2xl font-bold text-white">Find Me Online</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {SOCIALS.map((s, i) => (
              <motion.a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-[#111] border border-white/10 rounded-2xl p-5 hover:border-white/20 hover:bg-white/3 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  s.color === 'indigo'
                    ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400'
                    : 'bg-purple-500/10 border border-purple-500/20 text-purple-400'
                }`}>
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white">{s.name}</p>
                  <p className="text-xs text-[#a1a1a1] truncate">{s.handle}</p>
                  <p className="text-xs text-[#a1a1a1]/60 mt-0.5">{s.desc}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                  className="w-4 h-4 text-[#a1a1a1] group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </motion.a>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
