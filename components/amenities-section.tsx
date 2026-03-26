"use client"

import { Wifi, Dumbbell, Trees, Zap, Shield, Users } from "lucide-react"
import { useState, useRef, useEffect, useMemo } from "react"

const amenities = [
  { icon: Wifi, title: "Smart Connectivity", description: "Advanced IoT integration for modern, connected living.", category: "facilities" },
  { icon: Dumbbell, title: "Fitness Centre", description: "State-of-the-art gym and dedicated workout facilities.", category: "wellness" },
  { icon: Trees, title: "Green Spaces", description: "Lush landscaping, parks and tree-lined promenades.", category: "wellness" },
  { icon: Zap, title: "Power Backup", description: "Uninterrupted power supply around the clock.", category: "facilities" },
  { icon: Shield, title: "24/7 Security", description: "CCTV surveillance and round-the-clock on-site security.", category: "facilities" },
  { icon: Users, title: "Community Hub", description: "Vibrant spaces designed for social gatherings and events.", category: "entertainment" },
  { title: "Swimming Pool", description: "Olympic-sized pool with children's splash zone.", category: "wellness", emoji: "pool" },
  { title: "Gaming Zone", description: "Indoor games and entertainment for all age groups.", category: "entertainment", emoji: "game" },
  { title: "Yoga Studio", description: "Dedicated wellness spaces for mind and body balance.", category: "wellness", emoji: "yoga" },
  { title: "Covered Parking", description: "Secure multi-level parking for every resident.", category: "facilities", emoji: "parking" },
  { title: "Banquet Hall", description: "Premium event spaces for celebrations and gatherings.", category: "entertainment", emoji: "event" },
  { title: "Kids Play Area", description: "Safe, colourful playground designed for children.", category: "entertainment", emoji: "kids" },
]

const TABS = ["all", "facilities", "wellness", "entertainment"] as const
type Tab = (typeof TABS)[number]

const getEmojiIcon = (emoji: string) => {
  const icons: Record<string, string> = {
    pool: "M",
    game: "G",
    yoga: "Y", 
    parking: "P",
    event: "E",
    kids: "K"
  }
  return icons[emoji] || "+"
}

export function AmenitiesSection() {
  const [activeTab, setActiveTab] = useState<Tab>("all")
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
      { threshold: 0.07, rootMargin: "60px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const filtered = useMemo(
    () => (activeTab === "all" ? amenities : amenities.filter((a) => a.category === activeTab)),
    [activeTab]
  )

  return (
    <section
      ref={sectionRef}
      id="amenities"
      aria-label="Amenities"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[600px] w-[600px] rounded-full bg-[#30534A]/5 blur-[100px]" />
        <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#C9862b]/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`mb-10 flex flex-col gap-6 transition-all duration-700 lg:mb-12 lg:flex-row lg:items-end lg:justify-between ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="text-center lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9862b]/20 bg-[#C9862b]/10 px-4 py-2">
              <div className="h-1.5 w-6 rounded-full bg-gradient-to-r from-[#C9862b] to-[#C9862b]/50" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9862b]">Lifestyle Features</span>
            </div>
            <h2 className="text-3xl font-bold text-[#0d1a16] sm:text-4xl lg:text-5xl">
              Designed for <span className="text-[#30534A]">Modern</span>
              <br />
              <span className="text-[#C9862b]">Living</span>
            </h2>
          </div>

          {/* Tabs */}
          <div
            className="flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:justify-end"
            role="tablist"
            aria-label="Filter amenities by category"
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-xs ${
                  activeTab === tab
                    ? "bg-[#30534A] text-white shadow-lg shadow-[#30534A]/30"
                    : "border border-[#30534A]/15 bg-transparent text-[#555] hover:border-[#30534A] hover:text-[#30534A]"
                }`}
                type="button"
              >
                {tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((amenity, index) => {
            const Icon = "icon" in amenity ? amenity.icon : null
            return (
              <article
                key={amenity.title}
                className={`group relative overflow-hidden rounded-xl border border-[#30534A]/10 bg-[#f7f4ef] p-3 transition-all duration-500 hover:-translate-y-1 hover:border-[#C9862b]/30 hover:bg-white hover:shadow-xl sm:rounded-2xl sm:p-5 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
                aria-label={amenity.title}
              >
                {/* Corner Decoration */}
                <div className="absolute right-0 top-0 h-12 w-12 rounded-bl-[100%] bg-gradient-to-br from-[#30534A]/5 to-transparent transition-colors group-hover:from-[#C9862b]/10 sm:h-20 sm:w-20" />

                {/* Icon */}
                <div className="relative mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg sm:mb-4 sm:h-14 sm:w-14 sm:rounded-xl">
                  {Icon ? (
                    <Icon size={18} className="text-[#30534A] transition-colors group-hover:text-[#C9862b] sm:size-6" />
                  ) : (
                    <span className="text-base font-bold text-[#30534A] transition-colors group-hover:text-[#C9862b] sm:text-xl">
                      {getEmojiIcon(amenity.emoji || "")}
                    </span>
                  )}
                </div>

                {/* Content */}
                <h3 className="mb-1 text-sm font-bold text-[#0d1a16] sm:mb-2 sm:text-base">{amenity.title}</h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-[#666] sm:line-clamp-none sm:text-sm">{amenity.description}</p>

                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#C9862b] to-[#30534A] transition-all duration-500 group-hover:w-full" />
              </article>
            )
          })}
        </div>

        {/* Bottom Trust Bar */}
        <div
          className={`mt-12 rounded-2xl bg-[#30534A] p-4 transition-all delay-300 duration-700 sm:p-6 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Designed for modern living
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {["Premium Build Quality", "Vastu Compliant", "24x7 Maintenance"].map((label) => (
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
