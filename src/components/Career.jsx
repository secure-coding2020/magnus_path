// Edit this list to change the experience levels
const levels = [
  {
    icon: 'fa-seedling', iconColor: 'text-green-400', hover: 'hover:border-brand-primary',
    title: 'Freshers',
    text: 'Break into the industry and land your first role with foundational guidance and confidence building.',
  },
  {
    icon: 'fa-laptop-code', iconColor: 'text-blue-400', hover: 'hover:border-brand-accent',
    title: '1–5 Years',
    text: 'Pivot your career or step up to mid-level engineering and analyst roles successfully.',
  },
  {
    icon: 'fa-sitemap', iconColor: 'text-indigo-400', hover: 'hover:border-indigo-400',
    title: '5–15 Years',
    text: 'Transition smoothly into architecture, management, and highly specialized domains.',
  },
  {
    icon: 'fa-chess-king', iconColor: 'text-purple-400', hover: 'hover:border-purple-400',
    title: '15–25 Years',
    text: 'Prepare for strategic leadership, Director, and CISO positions with executive-level coaching.',
  },
]

export default function Career() {
  return (
    <section id="career" className="py-24 bg-brand-card/50 relative border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-8">
            <h2 className="text-base text-brand-accent font-semibold tracking-wide uppercase">Advance Your Path</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl mb-6">
              Career Acceleration &amp; Interview Prep
            </p>
            <p className="text-lg text-slate-400 mb-8">
              Step into your next role with total confidence. We provide targeted knowledge sharing and intensive mock interviews calibrated to your exact experience level.
            </p>
            <a href="#contact" className="inline-flex items-center text-brand-primary font-bold text-lg hover:text-white transition-colors">
              Prepare for your next interview <i className="fa-solid fa-arrow-right ml-2"></i>
            </a>
          </div>

          <div className="lg:w-1/2">
            <div className="space-y-6">
              {levels.map((l) => (
                <div key={l.title} className={`flex bg-brand-dark p-6 rounded-2xl border border-slate-700 ${l.hover} transition-colors`}>
                  <div className="flex-shrink-0 mr-6">
                    <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600">
                      <i className={`fa-solid ${l.icon} ${l.iconColor}`}></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{l.title}</h4>
                    <p className="mt-1 text-sm text-slate-400">{l.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
