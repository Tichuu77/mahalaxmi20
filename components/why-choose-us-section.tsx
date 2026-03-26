"use client"

import { Check, Zap, Trophy, Users, Heart, Lightbulb } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const reasons = [
  {
    icon: Trophy,
    title: "Proven Excellence",
    description: "Award-winning projects trusted by thousands of families across Nagpur.",
    stat: "70+",
    statLabel: "Projects",
  },
  {
    icon: Zap,
    title: "Innovation First",
    description: "Modern layouts, smart planning, and forward-thinking infrastructure.",
    stat: "13+",
    statLabel: "Years",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Dedicated professionals with decades of real estate experience.",
    stat: "17K+",
    statLabel: "Clients",
  },
  {
    icon: Heart,
    title: "Customer Focused",
    description: "Your satisfaction drives every decision we make, from plot to possession.",
    stat: "100%",
    statLabel: "RERA Approved",
  },
  {
    icon: Lightbulb,
    title: "Prime Locations",
    description: "Strategically chosen land near MIHAN, highways, hospitals & schools.",
    stat: "9+",
    statLabel: "Locations",
  },
  {
    icon: Check,
    title: "Quality Assured",
    description: "NMRDA sanctioned, legally clear, and bank finance eligible plots.",
    stat: "90%",
    statLabel: "Finance Avail",
  },
]

const trackRecord = ["13+ years industry experience", "17,000+ satisfied families", "Industry-leading satisfaction"]
const support = ["24/7 customer support", "Dedicated site visit assistance", "Transparent documentation process"]

export function WhyChooseUsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)
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

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      aria-label="Why Choose Mahalaxmi Infra"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#30534A]/5 blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-[#C9862b]/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div
          className={`mb-12 grid gap-10 transition-all duration-700 lg:mb-16 lg:grid-cols-2 lg:items-start ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Left - Title */}
          <div className="text-center lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9862b]/20 bg-[#C9862b]/10 px-4 py-2">
              <div className="h-1.5 w-6 rounded-full bg-gradient-to-r from-[#C9862b] to-[#C9862b]/50" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9862b]">Our Story</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-[#0d1a16] sm:text-4xl lg:text-5xl">
              Why Thousands
              <br />
              <span className="text-[#30534A]">Trust</span> <span className="text-[#C9862b]">Mahalaxmi</span>
            </h2>
            <p className="mx-auto max-w-lg text-base leading-relaxed text-[#666] lg:mx-0">
              For over a decade, we&apos;ve been building more than plots - we build confidence, community, and lasting
              value for families across Nagpur.
            </p>
          </div>

          {/* Right - Checklists */}
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { heading: "Track Record", items: trackRecord, accent: true },
              { heading: "Our Support", items: support, accent: false },
            ].map(({ heading, items, accent }) => (
              <div key={heading} className="rounded-2xl border border-[#30534A]/10 bg-[#f7f4ef] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <div className={`h-1 w-5 rounded-full ${accent ? "bg-[#C9862b]" : "bg-[#30534A]"}`} />
                  <h3 className={`text-xs font-bold uppercase tracking-widest ${accent ? "text-[#C9862b]" : "text-[#30534A]"}`}>
                    {heading}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          accent ? "bg-[#C9862b]/10 text-[#C9862b]" : "bg-[#30534A]/10 text-[#30534A]"
                        }`}
                      >
                        <Check size={10} />
                      </span>
                      <span className="text-sm text-[#555]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Pillars Label */}
        <div
          className={`mb-8 flex items-center gap-4 transition-all delay-100 duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="h-0.5 w-8 rounded-full bg-gradient-to-r from-[#C9862b] to-[#C9862b]/30" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9862b]">The Six Pillars</span>
          <div className="h-px flex-1 bg-[#30534A]/10" />
        </div>

        {/* Reasons Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            const isActive = activeCard === index
            return (
              <article
                key={reason.title}
                className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-500 ${
                  isActive
                    ? "border-[#C9862b]/30 bg-[#30534A] text-white shadow-xl shadow-[#30534A]/20"
                    : "border-[#30534A]/10 bg-[#f7f4ef] hover:border-[#C9862b]/30 hover:shadow-lg"
                } ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                style={{ transitionDelay: `${index * 80}ms` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Number */}
                <span
                  className={`absolute right-4 top-4 text-4xl font-bold transition-colors ${
                    isActive ? "text-white/10" : "text-[#30534A]/5"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 ${
                    isActive ? "bg-white/10" : "bg-white shadow-sm group-hover:shadow-md"
                  }`}
                >
                  <Icon
                    size={24}
                    className={`transition-colors ${isActive ? "text-[#C9862b]" : "text-[#30534A] group-hover:text-[#C9862b]"}`}
                  />
                </div>

                {/* Content */}
                <h3 className={`mb-2 text-lg font-bold ${isActive ? "text-white" : "text-[#0d1a16]"}`}>{reason.title}</h3>
                <p className={`mb-4 text-sm leading-relaxed ${isActive ? "text-white/70" : "text-[#666]"}`}>
                  {reason.description}
                </p>

                {/* Stat */}
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 ${
                    isActive ? "bg-white/10" : "bg-[#C9862b]/10"
                  }`}
                >
                  <span className="text-lg font-bold text-[#C9862b]">{reason.stat}</span>
                  <span className={`text-xs font-semibold ${isActive ? "text-white/60" : "text-[#888]"}`}>
                    {reason.statLabel}
                  </span>
                </div>

                {/* Bottom Bar */}
                <div
                  className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ${
                    isActive ? "w-full bg-[#C9862b]" : "w-0 bg-gradient-to-r from-[#C9862b] to-[#30534A] group-hover:w-full"
                  }`}
                />
              </article>
            )
          })}
        </div>

        {/* Trust Bar */}
        <div
          className={`mt-12 rounded-2xl bg-[#30534A] p-4 transition-all delay-400 duration-700 sm:p-6 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Integrity in every step</p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {["NMRDA Approved", "RERA Certified", "ISO Certified"].map((label) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#C9862b]" />
                  <span className="text-xs font-semibold text-white/70">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
