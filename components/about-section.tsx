"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { Award, Users, TrendingUp, Building2, Shield, CheckCircle2, ArrowRight } from "lucide-react"

const TARGETS = { projects: 70, clients: 17000, years: 13, sqft: 500 }

const FEATURES = [
  { icon: Award, text: "Premium Materials" },
  { icon: Users, text: "Expert Craftsmanship" },
  { icon: Shield, text: "Quality Assurance" },
  { icon: CheckCircle2, text: "Timely Delivery" },
  { icon: TrendingUp, text: "Value Appreciation" },
  { icon: Building2, text: "Modern Architecture" },
]

const TRUST = [
  { icon: Shield, label: "NMRDA Sanctioned" },
  { icon: CheckCircle2, label: "RERA Approved" },
  { icon: Award, label: "ISO Certified" },
]

export function AboutSection() {
  const [counters, setCounters] = useState({ projects: 0, clients: 0, years: 0, sqft: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const hasAnimated = useRef(false)

  const animateCounters = useCallback(() => {
    let step = 0
    const STEPS = 55
    timerRef.current = setInterval(() => {
      step++
      const p = Math.min(step / STEPS, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCounters({
        projects: Math.round(TARGETS.projects * ease),
        clients: Math.round(TARGETS.clients * ease),
        years: Math.round(TARGETS.years * ease),
        sqft: Math.round(TARGETS.sqft * ease),
      })
      if (step >= STEPS) {
        clearInterval(timerRef.current!)
        setCounters(TARGETS)
      }
    }, 30)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          setIsVisible(true)
          animateCounters()
        }
      },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [animateCounters])

  const stats = useMemo(
    () => [
      { value: counters.projects, suffix: "+", label: "Completed Projects", icon: Building2, accent: true },
      { value: counters.clients, suffix: "+", label: "Happy Families", icon: Users, accent: false },
      { value: counters.years, suffix: "+", label: "Years Experience", icon: Award, accent: true },
      { value: counters.sqft, suffix: "K+", label: "Sq.Ft Delivered", icon: TrendingUp, accent: false },
    ],
    [counters]
  )

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About Mahalaxmi Infra"
      className="relative overflow-hidden bg-[#f7f4ef] py-16 sm:py-20 lg:py-24"
    >
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(#30534A 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`mb-12 text-center transition-all duration-700 lg:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9862b]/20 bg-[#C9862b]/10 px-4 py-2">
            <div className="h-1.5 w-6 rounded-full bg-gradient-to-r from-[#C9862b] to-[#C9862b]/50" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9862b]">About Us</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-[#0d1a16] sm:text-4xl lg:text-5xl">
            Building <span className="text-[#30534A]">Dreams</span>
            <br />
            <span className="text-[#C9862b]">Since 2012</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#555] sm:text-lg">
            Mahalaxmi Infra is Nagpur&apos;s most trusted name in NMRDA sanctioned and RERA approved
            residential plots. With 70+ completed projects and 17,000+ families settled.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Features & CTA */}
          <div
            className={`transition-all delay-200 duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {/* Features Grid */}
            <div className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
              {FEATURES.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-[#30534A]/10 bg-white p-3 text-center transition-all duration-300 hover:border-[#C9862b]/30 hover:shadow-lg sm:flex-row sm:gap-3 sm:p-4 sm:text-left"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#30534A]/10 transition-colors group-hover:bg-[#C9862b]/10 sm:h-10 sm:w-10">
                    <Icon size={16} className="text-[#30534A] transition-colors group-hover:text-[#C9862b] sm:size-[18px]" />
                  </div>
                  <span className="text-[11px] font-semibold leading-tight text-[#0d1a16] sm:text-sm">{text}</span>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="mb-8 flex flex-wrap justify-center gap-2 sm:justify-start sm:gap-3">
              {TRUST.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#30534A]/15 bg-[#30534A]/5 px-3 py-1.5 sm:gap-2 sm:px-4 sm:py-2"
                >
                  <Icon size={12} className="text-[#30534A] sm:size-[14px]" />
                  <span className="text-[10px] font-bold text-[#30534A] sm:text-xs">{label}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#projects"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#30534A] to-[#3d6b60] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#30534A]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-auto sm:gap-3 sm:px-8 sm:py-4"
            >
              Explore Our Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right Column - Stats */}
          <div
            className={`transition-all delay-300 duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {/* Stats Header Card */}
            <div className="mb-4 rounded-2xl bg-gradient-to-br from-[#30534A] to-[#1a2e29] p-6 text-white shadow-xl">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/50">Our Track Record</p>
              <h3 className="text-2xl font-bold leading-tight sm:text-3xl">
                Numbers That
                <br />
                <span className="text-[#C9862b]">Speak</span> for Us
              </h3>
              <div className="mt-4 h-1 w-12 rounded-full bg-[#C9862b]" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className={`relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      stat.accent
                        ? "bg-[#30534A] text-white shadow-lg shadow-[#30534A]/20"
                        : "border border-[#30534A]/10 bg-white"
                    }`}
                  >
                    {/* Corner Accent */}
                    <div
                      className={`absolute right-0 top-0 h-16 w-16 rounded-bl-[100%] ${
                        stat.accent ? "bg-[#C9862b]/20" : "bg-[#30534A]/5"
                      }`}
                    />

                    <div
                      className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
                        stat.accent ? "bg-white/10" : "bg-[#30534A]/10"
                      }`}
                    >
                      <Icon size={18} className={stat.accent ? "text-[#C9862b]" : "text-[#30534A]"} />
                    </div>

                    <p className="text-3xl font-bold text-[#C9862b]">
                      {stat.value.toLocaleString()}
                      <span className="text-xl">{stat.suffix}</span>
                    </p>
                    <p className={`mt-1 text-xs font-medium ${stat.accent ? "text-white/60" : "text-[#888]"}`}>
                      {stat.label}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* RERA Note */}
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#C9862b]/20 bg-[#C9862b]/5 px-5 py-4">
              <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#C9862b] shadow-lg shadow-[#C9862b]/50" />
              <span className="text-xs font-semibold text-[#a86a1a]">
                MAHA RERA NO. A50500044725 - ISO Certified
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <div
          className={`mt-12 rounded-2xl bg-[#30534A] p-4 transition-all delay-400 duration-700 sm:mt-16 sm:p-6 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Building landmarks since 2012
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {["NMRDA Approved", "Up to 90% Finance", "RERA Certified"].map((label) => (
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
