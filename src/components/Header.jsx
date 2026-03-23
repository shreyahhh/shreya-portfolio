const NAV = [
  { label: 'Home',     page: 'home' },
  { label: 'Projects', page: 'projects' },
  { label: 'Work',     page: 'work' },
  { label: 'Contact',  page: 'contact' },
]

export default function Header({ current, navigate }) {
  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-1 bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-full px-2 py-1.5">
        {NAV.map(({ label, page }) => (
          <button
            key={page}
            onClick={() => navigate(page)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              current === page
                ? 'bg-white text-[#0a0a0a]'
                : 'text-[#a1a1a1] hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  )
}
