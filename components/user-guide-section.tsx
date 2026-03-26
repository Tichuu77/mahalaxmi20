"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronDown, Search, MapPin, FileText, Key, Lightbulb, Clock, Shield, TrendingUp, CheckCircle2 } from "lucide-react"

const guides = [
  {
    number: "01",
    icon: Search,
    title: "Explore & Shortlist",
    description: "Browse projects and shortlist plots matching your budget and location.",
    details: [
      "Filter by location, size & budget",
      "Compare plots side-by-side",
      "Download project brochures",
      "Review RERA & NMRDA approvals",
    ],
    tip: "Start broad, then narrow down based on proximity to AIIMS, schools, and highways.",
  },
  {
    number: "02",
    icon: MapPin,
    title: "Schedule a Site Visit",
    description: "Visit our actual plots - no renders, no stock photos.",
    details: [
      "Book via WhatsApp or phone",
      "Our representative accompanies you",
      "Visit multiple sites in one trip",
      "Complimentary transport arranged",
    ],
    tip: "Visit on a weekday for a quieter, more personal walkthrough with our site manager.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Documentation & Finance",
    description: "We handle legal verification. Get up to 90% bank finance.",
    details: [
      "Title verification & legal due diligence",
      "RERA certificate & NMRDA sanction copy",
      "Bank loan up to 90% LTV",
      "Flexible EMI payment plans",
    ],
    tip: "Keep your KYC documents ready. Pre-approved bank loans speed up registration by 50%.",
  },
  {
    number: "04",
    icon: Key,
    title: "Register & Move In",
    description: "Sign the sale deed, register, and take possession of your plot.",
    details: [
      "Sale deed execution",
      "Stamp duty & registration support",
      "Possession certificate issued",
      "Handover with site inspection",
    ],
    tip: "We stay with you through every registration step - from SRO appointment to key handover.",
  },
]

const tips = [
  { icon: Clock, title: "Check Legal Docs", body: "Always verify RERA registration and NMRDA sanctions before booking.", accent: true },
  { icon: Shield, title: "Verify Clear Title", body: "Confirm no existing liens, disputes, or encumbrances on the land.", accent: false },
  { icon: TrendingUp, title: "Assess Appreciation", body: "Look at proximity to MIHAN, AIIMS, highways for long-term value.", accent: false },
  { icon: CheckCircle2, title: "Get Pre-Approved", body: "Arrange bank pre-approval to move fast when you find the right plot.", accent: false },
]

export function UserGuideSection() {
  const [expandedIndex, setExpandedIndex] = useState<number>(0)
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

  const handleToggle = useCallback((i: number) => setExpandedIndex((p) => (p === i ? -1 : i)), [])

  return (
    <section
      ref={sectionRef}
      id="user-guide"
      aria-label="How to Buy a Plot"
      className="relative overflow-hidden bg-[#f7f4ef] py-16 sm:py-20 lg:py-24"
    >
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(#30534A 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Decorative Stripe */}
      <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/3 bg-gradient-to-l from-[#30534A]/5 to-transparent lg:block" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mb-12 text-center transition-all duration-700 lg:mb-16 lg:text-left ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9862b]/20 bg-[#C9862b]/10 px-4 py-2">
            <div className="h-1.5 w-6 rounded-full bg-gradient-to-r from-[#C9862b] to-[#C9862b]/50" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9862b]">Your Journey</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-[#0d1a16] sm:text-4xl lg:text-5xl">
            How to <span className="text-[#30534A]">Get</span>
            <br />
            <span className="text-[#C9862b]">Started</span>
          </h2>
          <p className="mx-auto max-w-lg text-base leading-relaxed text-[#666] lg:mx-0">
            Follow our simple guide to find, visit, finance and own your dream plot in Nagpur.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left - Steps Accordion */}
          <div
            className={`space-y-2 transition-all delay-100 duration-700 sm:space-y-3 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {guides.map((guide, index) => {
              const Icon = guide.icon
              const isOpen = expandedIndex === index
              return (
                <div
                  key={guide.number}
                  className={`overflow-hidden rounded-xl border transition-all duration-300 sm:rounded-2xl ${
                    isOpen
                      ? "border-[#C9862b]/30 bg-white shadow-lg"
                      : "border-[#30534A]/10 bg-white/50 hover:border-[#30534A]/20 hover:bg-white"
                  }`}
                >
                  <button
                    className="flex w-full items-center gap-3 p-4 text-left sm:gap-4 sm:p-5"
                    onClick={() => handleToggle(index)}
                    aria-expanded={isOpen}
                    type="button"
                  >
                    {/* Number */}
                    <span
                      className={`text-xl font-bold transition-colors sm:text-2xl ${
                        isOpen ? "text-[#C9862b]" : "text-[#30534A]/20"
                      }`}
                    >
                      {guide.number}
                    </span>

                    {/* Icon */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all sm:h-12 sm:w-12 sm:rounded-xl ${
                        isOpen ? "bg-[#C9862b]/10" : "bg-[#30534A]/5"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={`transition-colors sm:size-5 ${isOpen ? "text-[#C9862b]" : "text-[#30534A]"}`}
                      />
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`text-sm font-bold transition-colors sm:text-lg ${
                          isOpen ? "text-[#0d1a16]" : "text-[#0d1a16]/80"
                        }`}
                      >
                        {guide.title}
                      </h3>
                      <p className="truncate text-xs text-[#888] sm:text-sm sm:whitespace-normal">{guide.description}</p>
                    </div>

                    {/* Chevron */}
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all sm:h-8 sm:w-8 ${
                        isOpen ? "rotate-180 bg-[#C9862b] text-white" : "bg-[#30534A]/5 text-[#30534A]"
                      }`}
                    >
                      <ChevronDown size={14} className="sm:size-4" />
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isOpen && (
                    <div className="border-t border-[#30534A]/10 px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
                      <ul className="mb-3 space-y-2 sm:mb-4">
                        {guide.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 sm:gap-3">
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#30534A]/10 sm:mt-1 sm:h-5 sm:w-5">
                              <CheckCircle2 size={8} className="text-[#30534A] sm:size-[10px]" />
                            </span>
                            <span className="text-xs text-[#555] sm:text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tip */}
                      <div className="flex items-start gap-2 rounded-lg bg-[#C9862b]/5 p-3 sm:gap-3 sm:rounded-xl sm:p-4">
                        <Lightbulb size={14} className="mt-0.5 shrink-0 text-[#C9862b] sm:size-4" />
                        <p className="text-xs text-[#a86a1a] sm:text-sm">{guide.tip}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 pt-4">
              {guides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setExpandedIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    expandedIndex === i ? "w-8 bg-[#C9862b]" : "w-4 bg-[#30534A]/20 hover:bg-[#30534A]/40"
                  }`}
                  aria-label={`Step ${i + 1}`}
                  type="button"
                />
              ))}
            </div>
          </div>

          {/* Right - Active Step Panel (Desktop) */}
          <div
            className={`hidden lg:block transition-all delay-200 duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {guides[expandedIndex >= 0 ? expandedIndex : 0] && (
              <div className="sticky top-24">
                {/* Main Card */}
                <div className="mb-4 overflow-hidden rounded-3xl bg-gradient-to-br from-[#30534A] to-[#1a2e29] p-8 text-white shadow-xl">
                  <div className="relative">
                    {/* Glow */}
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#C9862b]/20 blur-3xl" />

                    <div className="relative">
                      <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                          {(() => {
                            const Icon = guides[expandedIndex >= 0 ? expandedIndex : 0].icon
                            return <Icon size={28} className="text-[#C9862b]" />
                          })()}
                        </div>
                        <div>
                          <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                            Step {guides[expandedIndex >= 0 ? expandedIndex : 0].number}
                          </span>
                          <h3 className="text-2xl font-bold">{guides[expandedIndex >= 0 ? expandedIndex : 0].title}</h3>
                        </div>
                      </div>
                      <p className="text-base leading-relaxed text-white/70">
                        {guides[expandedIndex >= 0 ? expandedIndex : 0].description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Details Card */}
                <div className="mb-4 rounded-2xl border border-[#30534A]/10 bg-white p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-1 w-5 rounded-full bg-[#30534A]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#30534A]">What&apos;s Included</span>
                  </div>
                  <ul className="space-y-3">
                    {guides[expandedIndex >= 0 ? expandedIndex : 0].details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#30534A]/10">
                          <CheckCircle2 size={10} className="text-[#30534A]" />
                        </span>
                        <span className="text-sm text-[#555]">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tip Card */}
                <div className="flex items-start gap-3 rounded-2xl bg-[#C9862b]/10 p-5">
                  <Lightbulb size={20} className="mt-0.5 shrink-0 text-[#C9862b]" />
                  <p className="text-sm leading-relaxed text-[#a86a1a]">
                    {guides[expandedIndex >= 0 ? expandedIndex : 0].tip}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Tips */}
        <div
          className={`mt-12 transition-all delay-300 duration-700 lg:mt-16 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="h-0.5 w-8 rounded-full bg-gradient-to-r from-[#C9862b] to-[#C9862b]/30" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9862b]">Quick Tips</span>
            <div className="h-px flex-1 bg-[#30534A]/10" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tips.map((tip, index) => {
              const Icon = tip.icon
              return (
                <div
                  key={tip.title}
                  className={`group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    tip.accent
                      ? "bg-[#30534A] text-white"
                      : "border border-[#30534A]/10 bg-white hover:border-[#C9862b]/30"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
                      tip.accent ? "bg-white/10" : "bg-[#30534A]/5 group-hover:bg-[#C9862b]/10"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={tip.accent ? "text-[#C9862b]" : "text-[#30534A] group-hover:text-[#C9862b]"}
                    />
                  </div>
                  <h3 className={`mb-2 text-sm font-bold ${tip.accent ? "text-white" : "text-[#0d1a16]"}`}>
                    {tip.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${tip.accent ? "text-white/70" : "text-[#666]"}`}>
                    {tip.body}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Trust Bar */}
        <div
          className={`mt-12 rounded-2xl bg-[#30534A] p-4 transition-all delay-400 duration-700 sm:p-6 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Simple. Transparent. Yours.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {["No Hidden Steps", "Guided Process", "Expert Support"].map((label) => (
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
