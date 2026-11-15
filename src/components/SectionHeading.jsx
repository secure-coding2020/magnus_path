// Reusable centred heading used by several sections
export default function SectionHeading({ eyebrow, title, subtitle, eyebrowColor = 'text-brand-primary' }) {
  return (
    <div className="text-center mb-16">
      <h2 className={`text-base ${eyebrowColor} font-semibold tracking-wide uppercase`}>{eyebrow}</h2>
      <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">{title}</p>
      {subtitle && <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto">{subtitle}</p>}
    </div>
  )
}
