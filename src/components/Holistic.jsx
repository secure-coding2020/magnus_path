import SectionHeading from './SectionHeading.jsx'

const pillars = [
  {
    icon: 'fa-brain', color: 'teal',
    title: 'Life Skills Mentoring',
    text: 'Learn how to design a complete, meaningful life. We provide practical guidance on personal growth, developing a resilient mindset, and extracting the absolute best out of the human experience.',
  },
  {
    icon: 'fa-sack-dollar', color: 'green',
    title: 'Personal Finance Mastery',
    text: 'Demystify wealth building. Understand how money works in the modern economy, master personal finance management, and explore practical investment and wealth-generation options.',
  },
]

// Full class names are written out so Tailwind can find them
const colorClasses = {
  teal: { hover: 'hover:border-teal-500/50', box: 'bg-teal-500/10 border-teal-500/20', icon: 'text-teal-400' },
  green: { hover: 'hover:border-green-500/50', box: 'bg-green-500/10 border-green-500/20', icon: 'text-green-400' },
}

export default function Holistic() {
  return (
    <section id="holistic" className="py-24 bg-brand-dark relative border-t border-slate-800">
      {/* Dotted background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Beyond Security"
          eyebrowColor="text-brand-accent"
          title="The Magnus Path Holistic Approach"
          subtitle="True success requires a foundation of personal and financial well-being. We help you build both."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {pillars.map((p) => {
            const c = colorClasses[p.color]
            return (
              <div key={p.title} className={`bg-brand-card/80 backdrop-blur-sm rounded-3xl p-10 border border-slate-700 flex flex-col md:flex-row items-start gap-8 ${c.hover} transition-colors`}>
                <div className="flex-shrink-0">
                  <div className={`h-20 w-20 rounded-2xl flex items-center justify-center border ${c.box}`}>
                    <i className={`fa-solid ${p.icon} text-4xl ${c.icon}`}></i>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">{p.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{p.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
