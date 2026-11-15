import { useState } from 'react'

const links = [
  { href: '#training', label: 'Training' },
  { href: '#career', label: 'Career Prep' },
  { href: '#consulting', label: 'Consulting' },
  { href: '#holistic', label: 'Holistic Approach' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <nav className="fixed w-full z-50 bg-brand-dark/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button
            type="button"
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); close() }}
          >
            <i className="fa-solid fa-shield-halved text-brand-accent text-3xl mr-3"></i>
            <span className="font-bold text-2xl tracking-tight text-white">Magnus Path</span>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                {l.label}
              </a>
            ))}
            <a href="#contact" className="bg-gradient-brand text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
              Book Session
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="h-10 w-10 flex items-center justify-center text-slate-300 hover:text-white focus:outline-none"
            >
              <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (now actually opens) */}
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-brand-dark px-4 pb-6 pt-2 space-y-1">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={close} className="block py-3 text-slate-300 hover:text-white font-medium">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={close} className="block mt-3 text-center bg-gradient-brand text-white px-6 py-3 rounded-full font-medium">
            Book Session
          </a>
        </div>
      )}
    </nav>
  )
}
