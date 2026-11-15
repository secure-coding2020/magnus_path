export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 hero-bg min-h-screen flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-sm font-medium text-cyan-400">
          <i className="fa-solid fa-bolt mr-2"></i> Elevating Students, Professionals &amp; Enterprises
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white leading-tight">
          Secure Your <span className="text-gradient">Enterprise.</span>
          <br />
          Accelerate Your <span className="text-gradient">Career.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto mb-10">
          Empowering your career, securing your enterprise, and enriching your life. Every journey begins with a strategic vision.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#contact" className="bg-gradient-brand text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-1">
            Book a 30-Minute Strategy Session
          </a>
          <a href="#training" className="bg-slate-800 border border-slate-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-700 transition-colors">
            Explore Services
          </a>
        </div>
      </div>

      {/* Decorative abstract shapes */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"></div>
    </section>
  )
}
