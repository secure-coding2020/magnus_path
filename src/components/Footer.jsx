// Replace '#' with your real profile links
const socials = [
  { icon: 'fa-linkedin', href: '#', label: 'LinkedIn' },
  { icon: 'fa-twitter', href: '#', label: 'Twitter' },
  { icon: 'fa-github', href: '#', label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <i className="fa-solid fa-shield-halved text-brand-accent text-2xl mr-2"></i>
            <span className="font-bold text-xl text-white">Magnus Path</span>
          </div>
          <div className="flex space-x-6 text-slate-400">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="hover:text-white transition-colors">
                <i className={`fa-brands ${s.icon} text-xl`}></i>
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <div className="text-center md:text-left">
            <p>&copy; 2026 Magnus Path. All rights reserved.</p>
            <p className="mt-1 text-slate-400">
              An initiative by Amit Tripathi &bull; Email:{' '}
              <a
                href="mailto:amit.tripathi02@gmail.com"
                className="text-brand-accent hover:underline"
              >
                amit.tripathi02@gmail.com
              </a>
            </p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
