export default function DiscoveryBanner() {
  return (
    <div className="bg-brand-card border-y border-slate-800 py-8 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 flex-shrink-0">
            <i className="fa-solid fa-handshake text-brand-primary text-xl"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Complimentary Discovery Session</h3>
            <p className="text-slate-400 text-sm">We assess your goals and design a tailored solution that drives real results.</p>
          </div>
        </div>
        <a href="#contact" className="text-brand-accent font-semibold hover:text-white transition-colors flex items-center">
          Learn more <i className="fa-solid fa-arrow-right ml-2"></i>
        </a>
      </div>
    </div>
  )
}
