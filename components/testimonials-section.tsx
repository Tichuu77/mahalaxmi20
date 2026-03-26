"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Rajkumar Gharjale",
    location: "Nagpur",
    rating: 5,
    image: "/testonomials1.webp",
    content:
      "Investing with Maha Laxmi Developers was an effortless experience. Their transparent process and clear documentation gave me full confidence. The best decision I ever made.",
  },
  {
    id: 2,
    name: "Priya Shah",
    location: "Mumbai",
    rating: 5,
    image: "/testonomials2.jpg",
    content:
      "I wanted to invest in a growing area, and plots in Nagpur Besa seemed perfect. Maha Laxmi Developers exceeded my expectations in every way. Highly recommended!",
  },
  {
    id: 3,
    name: "Karan Akojwar",
    location: "Pune",
    rating: 5,
    image: "/testonomials3.jpg",
    content:
      "Investing in residential plots with Mahalaxmi Developers was one of my best decisions. Their transparency, clear titles, and prompt assistance gave me real peace of mind.",
  },
]

const TOTAL = testimonials.length

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={14} className="fill-[#C9862b] text-[#C9862b]" />
    ))}
  </div>
)

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
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

  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(() => setCurrent((p) => (p + 1) % TOTAL), 5200)
    return () => clearInterval(id)
  }, [autoplay])

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + TOTAL) % TOTAL)
    setAutoplay(false)
  }, [])

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % TOTAL)
    setAutoplay(false)
  }, [])

  const goTo = useCallback((i: number) => {
    setCurrent(i)
    setAutoplay(false)
  }, [])

  const active = testimonials[current]

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-label="Customer Testimonials"
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
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-[#30534A]/20 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-[#C9862b]/10 blur-[80px]" />
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
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9862b]">Real Stories</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Words from Our <span className="text-[#C9862b]">Happy</span>
            <br />
            <span className="text-white/30">Families</span>
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-5 lg:gap-12">
          {/* Active Quote Card */}
          <div
            className={`lg:col-span-3 transition-all delay-100 duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <blockquote
              key={active.id}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:rounded-3xl sm:p-8 lg:p-10"
              aria-label={`Testimonial from ${active.name}`}
            >
              {/* Quote Icon */}
              <div className="absolute -right-4 -top-4 opacity-10">
                <Quote size={120} className="text-[#C9862b]" />
              </div>

              {/* Glow */}
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#C9862b]/10 blur-3xl" />

              <div className="relative">
                {/* Stars */}
                <div className="mb-6">
                  <Stars count={active.rating} />
                </div>

                {/* Quote Text */}
                <p className="mb-6 text-base leading-relaxed text-white/80 sm:mb-8 sm:text-lg lg:text-2xl">
                  &ldquo;{active.content}&rdquo;
                </p>

                {/* Author */}
                <footer className="flex items-center gap-3 sm:gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={active.image}
                      alt={active.name}
                      loading="lazy"
                      decoding="async"
                      className="h-12 w-12 rounded-xl object-cover sm:h-14 sm:w-14 sm:rounded-2xl"
                      width={56}
                      height={56}
                    />
                    <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#0d1a16] bg-[#30534A] sm:h-4 sm:w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white sm:text-base">{active.name}</p>
                    <p className="truncate text-xs text-white/50 sm:text-sm">{active.location} - Verified Buyer</p>
                  </div>
                </footer>
              </div>
            </blockquote>

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 text-white transition-all hover:bg-white/10"
                  type="button"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 text-white transition-all hover:bg-white/10"
                  type="button"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="flex gap-2" role="tablist" aria-label="Testimonials">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Testimonial ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === current ? "w-8 bg-[#C9862b]" : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Picker & Rating */}
          <div
            className={`lg:col-span-2 space-y-4 transition-all delay-200 duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {/* Testimonial Picker */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:space-y-3 lg:overflow-visible lg:pb-0" role="tablist" aria-label="Select testimonial" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={i === current}
                  onClick={() => goTo(i)}
                  className={`flex min-w-[200px] shrink-0 items-center gap-3 rounded-xl border p-3 text-left transition-all lg:min-w-0 lg:gap-4 lg:rounded-2xl lg:p-4 ${
                    i === current
                      ? "border-[#C9862b]/30 bg-[#C9862b]/10"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                  }`}
                  type="button"
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    loading="lazy"
                    decoding="async"
                    className={`h-10 w-10 shrink-0 rounded-lg object-cover transition-all lg:h-12 lg:w-12 lg:rounded-xl ${
                      i === current ? "ring-2 ring-[#C9862b]" : ""
                    }`}
                    width={48}
                    height={48}
                  />
                  <div className="min-w-0 flex-1">
                    <p className={`truncate text-sm font-bold lg:text-base ${i === current ? "text-white" : "text-white/70"}`}>{t.name}</p>
                    <p className={`truncate text-xs lg:text-sm ${i === current ? "text-white/60" : "text-white/40"}`}>{t.location}</p>
                  </div>
                  <div className="hidden sm:block">
                    <Stars count={t.rating} />
                  </div>
                </button>
              ))}
            </div>

            {/* Rating Summary */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-4">
                <span className="text-5xl font-bold text-white">5.0</span>
                <div>
                  <Stars count={5} />
                  <p className="mt-1 text-xs text-white/50">Based on 500+ reviews</p>
                </div>
              </div>

              {/* Rating Bars */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((n, i) => {
                  const widths = ["w-full", "w-1/5", "w-0", "w-0", "w-0"]
                  return (
                    <div key={n} className="flex items-center gap-2">
                      <span className="w-3 text-xs text-white/50">{n}</span>
                      <Star size={10} className="fill-[#C9862b] text-[#C9862b]" />
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                        <div className={`h-full rounded-full bg-[#C9862b] ${widths[i]}`} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Bar */}
        <div
          className={`mt-12 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all delay-300 duration-700 sm:p-6 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Every word, a true story</p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {["Verified Reviews", "Real Families", "No Paid Promotions"].map((label) => (
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
