import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import MobileMenu from './MobileMenu'

const navLinks = [
  { label: '首页', href: '#hero' },
  { label: '关于', href: '#about' },
  { label: '作品', href: '#projects' },
  { label: '联系', href: '#contact' },
]

export default function Navbar({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-lg shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5 lg:py-7 flex items-center justify-between">
          <a href="#hero" className="font-podium text-white font-bold uppercase text-2xl sm:text-3xl tracking-wider hover:opacity-80 transition-opacity">
            颜文博
          </a>

          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-inter text-sm text-white/70 tracking-widest uppercase hover:text-white transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white/50 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 border border-white/20 hover:border-white/50 px-6 py-3 text-xs tracking-widest uppercase font-inter text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group"
          >
            取得联系
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col items-end space-y-1.5 p-2"
            aria-label="打开菜单"
          >
            <span className="block w-6 h-0.5 bg-white rounded-full transition-all" />
            <span className="block w-6 h-0.5 bg-white rounded-full" />
            <span className="block w-4 h-0.5 bg-white rounded-full" />
          </button>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={navLinks} />
    </>
  )
}
