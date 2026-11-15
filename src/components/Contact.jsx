import { useState } from 'react'
import { GOOGLE_SHEET_URL } from '../config.js'

const interests = [
  'Cyber Security Training',
  'Career Acceleration',
  'Enterprise Consulting',
  'Holistic / Life Mentoring',
]

const emptyForm = { name: '', email: '', mobile: '', interest: interests[0], website: '' }

const inputClass =
  'w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary'

// Accepts numbers like +91 98765 43210, 9876543210, +1-415-555-0100 (7–15 digits)
function isValidMobile(value) {
  if (!/^\+?[0-9\s-]+$/.test(value.trim())) return false
  const digits = value.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 15
}

export default function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [submittedName, setSubmittedName] = useState('')

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!isValidMobile(form.mobile)) {
      setErrorMsg('Please enter a valid mobile number (7–15 digits, e.g. +91 98765 43210).')
      return
    }

    if (!GOOGLE_SHEET_URL.startsWith('https://script.google.com/')) {
      setErrorMsg('The form is not connected yet. Add your Google Apps Script URL in src/config.js.')
      return
    }

    setStatus('sending')
    try {
      // Sent as a simple form post so the browser doesn't block it (no CORS preflight)
      const body = new URLSearchParams({
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        interest: form.interest,
        website: form.website, // hidden spam trap; real visitors leave it empty
      })
      const res = await fetch(GOOGLE_SHEET_URL, { method: 'POST', body })
      const data = await res.json()
      if (data.result !== 'success') throw new Error(data.message || 'Could not save your details.')

      setSubmittedName(form.name.trim())
      setForm(emptyForm)
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
      setErrorMsg('Something went wrong while sending. Please try again in a moment.')
    }
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900 z-0"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">Ready to transform your trajectory?</h2>
        <p className="text-xl text-slate-300 mb-10">
          Book your complimentary 30-minute discovery session today. Let's discuss your unique requirements and chart your Magnus Path.
        </p>

        <div className="bg-brand-card/50 p-8 rounded-2xl backdrop-blur-md border border-slate-700 inline-block w-full max-w-md">
          {status === 'success' ? (
            <div className="py-8">
              <i className="fa-solid fa-circle-check text-5xl text-brand-accent mb-4"></i>
              <h3 className="text-xl font-bold text-white mb-2">Thank you, {submittedName}!</h3>
              <p className="text-slate-400 text-sm mb-6">We've received your details and will contact you shortly to schedule your session.</p>
              <button type="button" onClick={() => setStatus('idle')} className="text-brand-accent text-sm font-semibold hover:text-white">
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate={false}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                <input id="name" name="name" type="text" required maxLength={100} autoComplete="name"
                  value={form.name} onChange={update} className={inputClass} placeholder="Jane Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                <input id="email" name="email" type="email" required maxLength={150} autoComplete="email"
                  value={form.email} onChange={update} className={inputClass} placeholder="jane@example.com" />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-slate-300 mb-1">Mobile Number</label>
                <input id="mobile" name="mobile" type="tel" required maxLength={20} autoComplete="tel" inputMode="tel"
                  value={form.mobile} onChange={update} className={inputClass} placeholder="+91 98765 43210" />
              </div>
              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-slate-300 mb-1">Area of Interest</label>
                <select id="interest" name="interest" value={form.interest} onChange={update} className={inputClass}>
                  {interests.map((i) => <option key={i}>{i}</option>)}
                </select>
              </div>

              {/* Spam trap: hidden from people, but bots tend to fill it in */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
              </div>

              {errorMsg && (
                <p role="alert" className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                  {errorMsg}
                </p>
              )}

              <button type="submit" disabled={status === 'sending'}
                className="w-full bg-gradient-brand text-white font-bold py-3 px-4 rounded-lg mt-4 hover:shadow-lg hover:shadow-cyan-500/40 transition-all disabled:opacity-60 disabled:cursor-wait">
                {status === 'sending' ? (
                  <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Sending…</>
                ) : (
                  'Schedule Strategy Session'
                )}
              </button>
              <p className="text-xs text-center text-slate-500 mt-4">No credit card required. 100% confidential.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
