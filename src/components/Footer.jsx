const NAV = [
  { label: 'Home',     page: 'home' },
  { label: 'Projects', page: 'projects' },
  { label: 'Work',     page: 'work' },
  { label: 'Contact',  page: 'contact' },
]

const SOCIALS = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shreya-analyst/' },
  { name: 'GitHub',   url: 'https://github.com/shreyahhh' },
  { name: 'LeetCode', url: 'https://leetcode.com/u/shreyahhh_/' },
  { name: 'Unstop',   url: 'https://unstop.com/u/shreyamr4373' },
]

export default function Footer({ navigate }) {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 mt-8">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <button onClick={() => navigate('home')} className="text-xl font-bold text-white">
              Shreya<span className="text-indigo-400">.</span>
            </button>
            <p className="mt-2 text-sm text-[#a1a1a1]">
              Full-stack developer building smart, scalable web solutions.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#a1a1a1] mb-4">Pages</h4>
            <ul className="space-y-2 list-none p-0">
              {NAV.map(({ label, page }) => (
                <li key={page}>
                  <button
                    onClick={() => navigate(page)}
                    className="text-sm text-[#a1a1a1] hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#a1a1a1] mb-4">Connect</h4>
            <ul className="space-y-2 list-none p-0">
              {SOCIALS.map(({ name, url }) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-[#a1a1a1] hover:text-white transition-colors">
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
                  className="text-sm text-[#a1a1a1] hover:text-white transition-colors">
                  shreyyaaa369@gmail.com
                </a>
              </li>
              <li>
                <button onClick={() => navigate('contact')}
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                  Let's Connect →
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs text-[#a1a1a1]">
          © {new Date().getFullYear()} Shreya. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
