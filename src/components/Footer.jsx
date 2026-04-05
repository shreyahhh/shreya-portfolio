const NAV = [
  { label: 'Home',     page: 'home' },
  { label: 'Projects', page: 'projects' },
  { label: 'Work',     page: 'work' },
  { label: 'Contact',  page: 'contact' },
]

const RESUME_DRIVE_VIEW =
  'https://drive.google.com/file/d/1OgplMsVuovtLxsdZKzXAOrVxCq9QTQZV/view?usp=sharing'

const SOCIALS = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shreya-analyst/' },
  { name: 'GitHub',   url: 'https://github.com/shreyahhh' },
  { name: 'LeetCode', url: 'https://leetcode.com/u/shreyahhh_/' },
  { name: 'Unstop',   url: 'https://unstop.com/u/shreyamr4373' },
]

export default function Footer({ navigate }) {
  return (
    <footer className="bg-[#060606] border-t border-white/10 mt-8">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <button onClick={() => navigate('home')} className="text-xl font-bold text-white">
              Shreya<span className="text-indigo-400">.</span>
            </button>
            <p className="mt-2 text-[14px] leading-relaxed text-[#a1a1a1]">
              Full-stack developer building smart, scalable web solutions.
            </p>
            <a
              href={RESUME_DRIVE_VIEW}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center rounded-full border border-white/20 bg-transparent px-3 py-1 text-[12px] font-medium text-[#a1a1a1] transition-colors hover:border-white/35 hover:text-white"
            >
              Resume
            </a>
          </div>

          {/* Pages */}
          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-[#a1a1a1]">Pages</h4>
            <ul className="space-y-2 list-none p-0">
              {NAV.map(({ label, page }) => (
                <li key={page}>
                  <button
                    onClick={() => navigate(page)}
                    className="text-[13px] text-[#a1a1a1] transition-colors hover:text-white"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-[#a1a1a1]">Connect</h4>
            <ul className="space-y-2 list-none p-0">
              {SOCIALS.map(({ name, url }) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer"
                    className="text-[13px] text-[#a1a1a1] transition-colors hover:text-white">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#a1a1a1] mb-4">Get in Touch</h4>
            <ul className="space-y-2 list-none p-0">
              <li>
                <a href="mailto:shreyyaaa369@gmail.com"
                  className="text-[13px] text-[#a1a1a1] transition-colors hover:text-white">
                  shreyyaaa369@gmail.com
                </a>
              </li>
              <li>
                <button onClick={() => navigate('contact')}
                  className="text-[13px] text-indigo-400 transition-colors hover:text-indigo-300">
                  Let's Connect →
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
