"use client"

import { useEffect, useState } from "react"
import { ArrowRight, MapPin, TrendingUp, Award, Shield, CheckCircle2, Play, Building2 } from "lucide-react"

const STATS = [
  { value: "70+", label: "Projects", icon: Building2 },
  { value: "17K+", label: "Families", icon: CheckCircle2 },
  { value: "100%", label: "RERA", icon: Shield },
  { value: "13+", label: "Years", icon: Award },
]

const TRUST = [
  { icon: Shield, label: "NMRDA Sanctioned" },
  { icon: CheckCircle2, label: "RERA Approved" },
  { icon: Award, label: "ISO Certified" },
]

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setLoaded(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section 
      id="home" 
      aria-label="Mahalaxmi Infra - Premium Plots in Nagpur" 
      className="relative min-h-screen overflow-hidden bg-[#0d1a16]"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpeg"
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1a16]/80 via-[#0d1a16]/60 to-[#0d1a16]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1a16]/90 via-transparent to-[#0d1a16]/70" />
      </div>

      {/* Decorative Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#30534A]/20 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] h-[400px] w-[400px] rounded-full bg-[#C9862b]/10 blur-[100px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        
        {/* Mobile-first: Centered content for mobile */}
        <div className="flex flex-1 flex-col items-center justify-center text-center lg:items-start lg:text-left">
          
          {/* Location Badge */}
          <div 
            className={`mb-6 inline-flex items-center gap-2 rounded-full border border-[#C9862b]/30 bg-[#C9862b]/10 px-4 py-2 backdrop-blur-sm transition-all duration-700 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <MapPin size={14} className="text-[#C9862b]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9862b]">
              Nagpur, Maharashtra
            </span>
          </div>

          {/* Main Heading */}
          <h1 
            className={`mb-6 text-4xl font-bold leading-[1.1] text-white transition-all delay-100 duration-700 sm:text-5xl md:text-6xl lg:text-7xl ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <span className="block">Premium</span>
            <span className="block text-[#C9862b]">RERA Approved</span>
            <span className="block">
              Plots in{" "}
              <span className="relative inline-block">
                Nagpur
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8 Q50 2, 100 6 T198 4" stroke="#C9862b" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>
                </svg>
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className={`mb-8 max-w-xl text-base leading-relaxed text-white/70 transition-all delay-200 duration-700 sm:text-lg ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            NMRDA sanctioned residential plots near MIHAN, Wardha Road & Hingna. 
            Starting <span className="font-bold text-[#C9862b]">Rs 22 Lakh</span>. 
            Bank loan up to <span className="font-bold text-[#C9862b]">90%</span> available.
          </p>

          {/* Stats Row - Grid on mobile, flex on larger screens */}
          <div 
            className={`mb-8 grid w-full grid-cols-2 gap-2 transition-all delay-300 duration-700 sm:flex sm:flex-wrap sm:justify-center sm:gap-3 lg:justify-start ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-sm transition-all duration-300 hover:border-[#C9862b]/30 hover:bg-white/10 sm:min-w-[100px] sm:px-5 sm:py-4"
                >
                  <Icon size={16} className="mb-1.5 text-[#C9862b] sm:mb-2 sm:size-[18px]" />
                  <span className="text-xl font-bold text-white sm:text-2xl">{stat.value}</span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-white/50 sm:text-xs">{stat.label}</span>
                </div>
              )
            })}
          </div>

          {/* CTA Buttons */}
          <div 
            className={`flex w-full flex-col gap-3 transition-all delay-400 duration-700 sm:w-auto sm:flex-row ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C9862b] to-[#a86a1a] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#C9862b]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#C9862b]/40 sm:px-8 sm:py-4"
            >
              Explore Projects
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 sm:px-8 sm:py-4"
            >
              <Play size={14} className="fill-white" />
              Schedule Visit
            </a>
          </div>
        </div>

        {/* Trust Badges - Bottom of hero */}
        <div 
          className={`mt-auto pt-8 transition-all delay-500 duration-700 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm lg:justify-start">
            <span className="text-xs font-medium uppercase tracking-wider text-white/40">Certified By:</span>
            {TRUST.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#C9862b]/20">
                    <Icon size={12} className="text-[#C9862b]" />
                  </div>
                  <span className="text-xs font-semibold text-white/70">{item.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Price Badge - Floating on desktop */}
        <div 
          className={`absolute bottom-32 right-8 hidden rounded-2xl bg-[#C9862b] p-5 shadow-2xl shadow-[#C9862b]/40 transition-all delay-600 duration-700 lg:block ${
            loaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
              <TrendingUp size={24} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Rs 22L</p>
              <p className="text-xs font-medium uppercase tracking-wider text-white/80">Starting Price</p>
            </div>
          </div>
        </div>

        {/* RERA Badge - Floating on desktop */}
        <div 
          className={`absolute right-8 top-32 hidden rounded-2xl border border-[#C9862b]/30 bg-[#0d1a16]/90 p-4 backdrop-blur-md transition-all delay-700 duration-700 lg:block ${
            loaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3">
            <Award size={20} className="text-[#C9862b]" />
            <div>
              <p className="text-sm font-bold text-[#C9862b]">RERA Approved</p>
              <p className="text-xs text-white/50">MAHA RERA Certified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Only on desktop */}
      <div 
        className={`absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 transition-all delay-700 duration-700 lg:flex ${
          loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1">
          <div className="h-2 w-1 animate-bounce rounded-full bg-[#C9862b]" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Scroll</span>
      </div>
    </section>
  )
}
