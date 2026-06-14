import { useEffect } from 'react'
import { X, ArrowUpRight } from 'lucide-react'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  links: { label: string; href: string }[]
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-md transition-all duration-500 ${
        open ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div className="flex items-center justify-between px-6 sm:px-10 py-5">
        <span className="font-podium text-white font-bold uppercase text-2xl tracking-wider">
          颜文博
        </span>
        <button onClick={onClose} className="p-2 hover:opacity-70 transition-opacity" aria-label="关闭菜单">
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] px-6">
        <div className="flex flex-col items-center gap-8 sm:gap-10">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="font-podium text-4xl sm:text-5xl text-white uppercase hover:text-white/70 transition-colors duration-300"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease ${i * 0.08 + 0.1}s`,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          onClick={onClose}
          className="mt-12 inline-flex items-center gap-3 border border-white/30 hover:border-white/60 px-8 py-4 text-sm tracking-widest uppercase font-inter text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? 'translateY(0)' : 'translateY(20px)',
            transition: `all 0.5s ease ${links.length * 0.08 + 0.15}s`,
          }}
        >
          取得联系
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  )
}
