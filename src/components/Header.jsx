import { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Accomplishments', href: '#accomplishments' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-gray-800 shadow-xl py-2' : 'bg-transparent py-4'}`}>
      <nav className="container mx-auto flex items-center justify-between">
        <a href="#" className="text-2xl font-semibold tracking-tight text-[#ededed]">
          Shreya
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 list-none">
            {navLinks.map((link) => (
              <li key={link.name} className="list-none">
                <a 
                  href={link.href}
                  className="font-medium hover:text-indigo-400 transition-colors text-[#a1a1a1]"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-[#ededed]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-gray-800">
          <nav className="container py-4">
            <ul className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="block font-medium hover:text-indigo-400 transition-colors text-[#a1a1a1]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 