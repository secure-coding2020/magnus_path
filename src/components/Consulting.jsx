import SectionHeading from './SectionHeading.jsx'

function Card({ icon, iconColor, blob, title, children }) {
  return (
    <div className="bg-gradient-to-b from-slate-800 to-brand-dark rounded-2xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden group">
      <div className={`absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full blur-xl transition-all ${blob}`}></div>
      <i className={`fa-solid ${icon} text-4xl ${iconColor} mb-6`}></i>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      {children}
    </div>
  )
}

function CheckList({ items, checkColor }) {
  return (
    <ul className="space-y-3 text-slate-400 text-sm">
      {items.map((item) => (
        <li key={item} className="flex items-start">
          <i className={`fa-solid fa-check ${checkColor} mt-1 mr-2`}></i> {item}
        </li>
      ))}
    </ul>
  )
}

export default function Consulting() {
  return (
    <section id="consulting" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="B2B Solutions"
          title="Enterprise Cyber Security Consulting"
          subtitle="Stuck on a complex security challenge? We will architect a way forward."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card icon="fa-robot" iconColor="text-blue-400" blob="bg-blue-500/20 group-hover:bg-blue-500/40" title="AI & Automation">
            <CheckList
              checkColor="text-brand-accent"
              items={['AI Implementation in Cyber Security', 'Automated Controls Testing', 'AI-Powered GRC Engineering']}
            />
          </Card>

          <Card icon="fa-cloud" iconColor="text-cyan-400" blob="bg-cyan-500/20 group-hover:bg-cyan-500/40" title="Cloud Security for SMBs">
            <CheckList
              checkColor="text-brand-primary"
              items={[
                'End-to-end, cost-effective security implementation',
                'Comprehensive Risk Management',
                'Compliance Management for Small/Medium Enterprises',
              ]}
            />
          </Card>

          <Card icon="fa-comments-dollar" iconColor="text-purple-400" blob="bg-purple-500/20 group-hover:bg-purple-500/40" title="Custom Advisory">
            <p className="text-slate-400 text-sm mb-4">
              Bring us your toughest security bottlenecks, and we will find a custom-tailored, effective solution to protect your assets.
            </p>
            <a href="#contact" className="text-purple-400 font-semibold hover:text-white transition-colors text-sm">
              Discuss your project &rarr;
            </a>
          </Card>
        </div>
      </div>
    </section>
  )
}
