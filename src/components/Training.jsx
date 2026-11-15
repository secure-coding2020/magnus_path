import SectionHeading from './SectionHeading.jsx'

// Edit this list to change the training cards
const cards = [
  {
    icon: 'fa-crosshairs', iconColor: 'text-blue-400', bg: 'bg-blue-500/10',
    title: 'Targeted Deep-Dives',
    text: 'Gain immediate clarity on complex, specific cyber security topics with focused, intensive sessions.',
  },
  {
    icon: 'fa-building-columns', iconColor: 'text-cyan-400', bg: 'bg-cyan-500/10',
    title: 'Industry-Specific',
    text: 'Specialized training tailored to the unique threat landscapes of BFSI, Retail, Fintech, and IT.',
  },
  {
    icon: 'fa-network-wired', iconColor: 'text-indigo-400', bg: 'bg-indigo-500/10',
    title: 'Domain Mastery',
    text: 'Master core pillars: IAM, GRC, Security Architecture, Cyber Engineering, and Cyber Operations.',
  },
  {
    icon: 'fa-certificate', iconColor: 'text-teal-400', bg: 'bg-teal-500/10',
    title: 'Certification Mentoring',
    text: 'Fast-track your credentials with dedicated tutoring for top-tier certs: CISA, CISSP, CCSP, and AWS Security.',
  },
]

export default function Training() {
  return (
    <section id="training" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Education & Mentorship"
          title="Expert-Led Cyber Security Training"
          subtitle="Hands-on education and mentorship delivered by active industry experts."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((c) => (
            <div key={c.title} className="bg-brand-card rounded-2xl p-8 border border-slate-700 hover-lift glow-border">
              <div className={`h-14 w-14 rounded-xl ${c.bg} flex items-center justify-center mb-6`}>
                <i className={`fa-solid ${c.icon} text-2xl ${c.iconColor}`}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{c.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
