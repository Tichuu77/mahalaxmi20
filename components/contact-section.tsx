"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Phone, Mail, MapPin, CheckCircle2, Send, Award, Shield } from "lucide-react"

const EMPTY_FORM = { name: "", mobile: "", lookingFor: "", interestedIn: "" }

const CONTACTS = [
  {
    icon: Phone,
    label: "Call / WhatsApp",
    values: ["+91 9970501128"],
    href: "tel:+919970501128",
    accent: true,
  },
  {
    icon: Mail,
    label: "Email",
    values: ["manoj.mungale@gmail.com"],
    href: "mailto:manoj.mungale@gmail.com",
    accent: false,
  },
  {
    icon: MapPin,
    label: "Office Address",
    values: ["Flat 103/104, Laxmivihar Apartment,", "Wardha Road, Somalwada, Nagpur 440025"],
    href: null,
    accent: false,
  },
]

const BADGES = [
  { icon: Award, text: "MAHA RERA Approved" },
  { icon: Shield, text: "NMRDA Sanctioned" },
  { icon: CheckCircle2, text: "ISO Certified" },
  { icon: Phone, text: "30-min Response" },
]

export default function ContactSection() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
        }
      },
      { threshold: 0.07 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const set = useCallback(
    (k: keyof typeof EMPTY_FORM) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value })),
    []
  )

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!form.name || !form.mobile) return
      setStatus("loading")

      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: "7a6bc102-dcc3-4f79-a088-0a0f5bd21923",
            name: form.name,
            subject: `New Inquiry - ${form.lookingFor}`,
            message: `Name: ${form.name}\nMobile: ${form.mobile}\nLooking For: ${form.lookingFor}\nInterested In: ${form.interestedIn}`,
          }),
        })
        const data = await res.json()
        if (data.success) {
          setStatus("success")
          setForm(EMPTY_FORM)
        } else {
          setStatus("error")
          setTimeout(() => setStatus("idle"), 3500)
        }
      } catch {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 3500)
      }
    },
    [form]
  )

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Contact Mahalaxmi Infra"
      className="relative overflow-hidden bg-[#0d1a16] py-16 sm:py-20 lg:py-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-[#30534A]/20 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[#C9862b]/10 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mb-12 text-center transition-all duration-700 lg:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9862b]/20 bg-[#C9862b]/10 px-4 py-2">
            <div className="h-1.5 w-6 rounded-full bg-gradient-to-r from-[#C9862b] to-[#C9862b]/50" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9862b]">Contact Us</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Let&apos;s <span className="text-[#C9862b]">Find</span> Your
            <br />
            <span className="text-white/30">Dream Plot</span>
          </h2>
          <p className="mx-auto max-w-lg text-base leading-relaxed text-white/60">
            Reach out for a site visit, price list, or any query. Our team responds within 30 minutes.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left - Contact Info */}
          <div
            className={`space-y-4 transition-all delay-100 duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {/* Contact Cards */}
            {CONTACTS.map((contact) => {
              const Icon = contact.icon
              const Wrapper = contact.href ? "a" : "div"
              return (
                <Wrapper
                  key={contact.label}
                  {...(contact.href ? { href: contact.href } : {})}
                  className={`group flex items-start gap-4 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    contact.accent
                      ? "border-[#C9862b]/30 bg-[#C9862b]/10 hover:bg-[#C9862b]/20"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all ${
                      contact.accent ? "bg-[#C9862b] text-white" : "bg-white/10 text-[#C9862b]"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-white/50">{contact.label}</p>
                    {contact.values.map((v, i) => (
                      <p key={i} className={`text-base font-semibold ${contact.accent ? "text-[#C9862b]" : "text-white"}`}>
                        {v}
                      </p>
                    ))}
                  </div>
                </Wrapper>
              )
            })}

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-4">
              {BADGES.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"
                >
                  <Icon size={14} className="text-[#C9862b]" />
                  <span className="text-xs font-semibold text-white/70">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Contact Form */}
          <div
            className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all delay-200 duration-700 sm:p-8 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {/* Corner Decorations */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#C9862b]/10 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-[#30534A]/20 blur-2xl" />

            {status === "success" ? (
              <div className="relative flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#30534A]/20">
                  <CheckCircle2 size={40} className="text-[#C9862b]" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-white">We&apos;ll be in touch!</h3>
                <p className="text-white/60">Our team will call you within 30 minutes.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="relative space-y-5">
                <h3 className="mb-2 text-xl font-bold text-white">Schedule a Site Visit</h3>
                <p className="mb-6 text-sm text-white/50">Fill in your details and we&apos;ll get back to you shortly.</p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/50">
                      Full Name <span className="text-[#C9862b]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={set("name")}
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 transition-all focus:border-[#C9862b] focus:outline-none focus:ring-2 focus:ring-[#C9862b]/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-mobile" className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/50">
                      Mobile Number <span className="text-[#C9862b]">*</span>
                    </label>
                    <input
                      id="contact-mobile"
                      name="mobile"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.mobile}
                      onChange={set("mobile")}
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 transition-all focus:border-[#C9862b] focus:outline-none focus:ring-2 focus:ring-[#C9862b]/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-looking" className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/50">
                      Looking For
                    </label>
                    <select
                      id="contact-looking"
                      name="lookingFor"
                      value={form.lookingFor}
                      onChange={set("lookingFor")}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-all focus:border-[#C9862b] focus:outline-none focus:ring-2 focus:ring-[#C9862b]/20"
                    >
                      <option value="" className="bg-[#0d1a16]">Select...</option>
                      <option value="Residential Plot" className="bg-[#0d1a16]">Residential Plot</option>
                      <option value="Commercial Plot" className="bg-[#0d1a16]">Commercial Plot</option>
                      <option value="Investment" className="bg-[#0d1a16]">Investment</option>
                      <option value="Other" className="bg-[#0d1a16]">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-interested" className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/50">
                      Interested In
                    </label>
                    <select
                      id="contact-interested"
                      name="interestedIn"
                      value={form.interestedIn}
                      onChange={set("interestedIn")}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-all focus:border-[#C9862b] focus:outline-none focus:ring-2 focus:ring-[#C9862b]/20"
                    >
                      <option value="" className="bg-[#0d1a16]">Select...</option>
                      <option value="Mahalaxmi Nagar" className="bg-[#0d1a16]">Mahalaxmi Nagar</option>
                      <option value="Ongoing Project" className="bg-[#0d1a16]">Ongoing Project</option>
                      <option value="Completed Project" className="bg-[#0d1a16]">Completed Project</option>
                      <option value="Any Available" className="bg-[#0d1a16]">Any Available</option>
                    </select>
                  </div>
                </div>

                {status === "error" && (
                  <p className="rounded-xl bg-red-500/10 p-3 text-center text-sm text-red-400">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C9862b] to-[#a86a1a] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#C9862b]/30 transition-all hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "loading" ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={16} />
                      Send Enquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Trust Bar */}
        <div
          className={`mt-12 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all delay-300 duration-700 sm:p-6 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Your data is safe with us</p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {["No Spam", "100% Confidential", "Quick Response"].map((label) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#C9862b]" />
                  <span className="text-xs font-semibold text-white/60">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
