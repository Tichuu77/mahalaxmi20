"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronDown, ExternalLink, Calendar, Clock } from "lucide-react"

const newsArticles = [
  {
    id: 1,
    title: "MIHAN Nagpur: Why It's Becoming the City's Most Sought-After Corridor",
    date: "March 2025",
    category: "Market Insight",
    readTime: "4 min",
    image: "/gallery1.jpg",
    summary: "With AIIMS, IT parks, and logistics hubs expanding along the MIHAN belt, plot demand has surged 35% year-on-year.",
    content:
      "The MIHAN Special Economic Zone on Nagpur's Wardha Road has transformed from an ambitious blueprint into a live economic engine. Anchored by AIIMS Nagpur, an expanding cargo hub, and several multinational manufacturing units, the corridor now attracts both end-users and investors. Property prices in MIHAN-adjacent areas have appreciated between 18-35% since 2022, making early movers significant beneficiaries.",
  },
  {
    id: 2,
    title: "RERA's Impact on Plot Buying: What Every Nagpur Buyer Must Know",
    date: "January 2025",
    category: "Legal & Compliance",
    readTime: "3 min",
    image: "/gallery2.jpg",
    summary: "RERA registration protects buyers from project delays and ensures full transparency in layout documents.",
    content:
      "Maharashtra's RERA framework has fundamentally changed how residential plots are marketed and sold. All projects above 500 sq meters must be registered. Mahalaxmi Infra's layouts carry MAHA RERA NO. A50500044725, providing buyers complete legal protection.",
  },
  {
    id: 3,
    title: "Home Loan for Plots in 2025: Rate Trends & What Banks Offer",
    date: "February 2025",
    category: "Finance",
    readTime: "5 min",
    image: "/gallery3.jpg",
    summary: "Leading banks now offer up to 90% LTV on NMRDA-approved residential plots - here's how to qualify.",
    content:
      "Plot loan rates have stabilised, with most public sector banks offering between 8.5-9.2% for NMRDA/RERA approved plots. Mahalaxmi Infra's projects qualify with SBI, Bank of Maharashtra, and Axis Bank.",
  },
  {
    id: 4,
    title: "Green Layouts: How Mahalaxmi Infra is Integrating Sustainability",
    date: "December 2024",
    category: "Projects",
    readTime: "3 min",
    image: "/gallery4.jpg",
    summary: "Rain harvesting systems, wide green belts, and solar street lighting are now standard in new layouts.",
    content:
      "Every new Mahalaxmi Infra layout includes rain water harvesting pits, 30% green belt coverage, energy-efficient street lighting, and proper solid waste management zones.",
  },
]

export default function NewsArticles() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
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

  const toggle = useCallback((id: number) => setExpandedId((p) => (p === id ? null : id)), [])

  const [featured, ...sides] = newsArticles

  return (
    <section
      ref={sectionRef}
      id="news"
      aria-label="News and Articles"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-[#30534A]/5 blur-[100px]" />
        <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#C9862b]/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mb-12 text-center transition-all duration-700 lg:mb-16 lg:text-left ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9862b]/20 bg-[#C9862b]/10 px-4 py-2">
            <div className="h-1.5 w-6 rounded-full bg-gradient-to-r from-[#C9862b] to-[#C9862b]/50" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9862b]">From the Desk</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-[#0d1a16] sm:text-4xl lg:text-5xl">
            News <span className="text-[#30534A]">&</span>
            <br />
            <span className="text-[#C9862b]">Articles</span>
          </h2>
          <p className="mx-auto max-w-lg text-base leading-relaxed text-[#666] lg:mx-0">
            Stay updated with the latest news, project launches, and insights from Mahalaxmi Infra.
          </p>
        </div>

        {/* Desktop Layout */}
        <div
          className={`hidden gap-6 lg:grid lg:grid-cols-2 transition-all delay-100 duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Featured Article */}
          <article className="group overflow-hidden rounded-3xl border border-[#30534A]/10 bg-[#f7f4ef] transition-all duration-300 hover:shadow-xl">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="rounded-full bg-[#C9862b] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  {featured.category}
                </span>
                <div className="flex items-center gap-3 text-xs text-white/70">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {featured.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {featured.date}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-3 text-xl font-bold text-[#0d1a16] group-hover:text-[#30534A]">{featured.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-[#666]">{featured.summary}</p>
              <button
                onClick={() => toggle(featured.id)}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#30534A] hover:text-[#C9862b]"
                type="button"
              >
                {expandedId === featured.id ? "Read Less" : "Read More"}
                <ExternalLink size={14} />
              </button>
              {expandedId === featured.id && (
                <p className="mt-4 text-sm leading-relaxed text-[#555]">{featured.content}</p>
              )}
            </div>
          </article>

          {/* Side Articles */}
          <div className="space-y-4">
            {sides.map((article) => (
              <article
                key={article.id}
                className="group flex gap-4 overflow-hidden rounded-2xl border border-[#30534A]/10 bg-[#f7f4ef] p-4 transition-all duration-300 hover:border-[#C9862b]/30 hover:shadow-lg"
              >
                <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute bottom-1 left-1 rounded bg-[#C9862b]/90 px-1.5 py-0.5 text-[8px] font-bold uppercase text-white">
                    {article.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="mb-2 flex items-center gap-2 text-[10px] text-[#888]">
                    <span>{article.readTime} read</span>
                    <span>-</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="mb-2 text-sm font-bold text-[#0d1a16] group-hover:text-[#30534A]">{article.title}</h3>
                  <button
                    onClick={() => toggle(article.id)}
                    className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-[#30534A] hover:text-[#C9862b]"
                    type="button"
                  >
                    {expandedId === article.id ? "Collapse" : "Read More"}
                    <ChevronDown
                      size={12}
                      className={`transition-transform ${expandedId === article.id ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedId === article.id && (
                    <p className="mt-3 text-xs leading-relaxed text-[#555]">{article.content}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="space-y-4 lg:hidden">
          {newsArticles.map((article, index) => (
            <article
              key={article.id}
              className={`overflow-hidden rounded-2xl border border-[#30534A]/10 bg-[#f7f4ef] transition-all duration-500 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => toggle(article.id)}
                className="flex w-full items-center gap-4 p-4 text-left"
                type="button"
              >
                <img
                  src={article.image}
                  alt=""
                  loading="lazy"
                  className="h-16 w-16 shrink-0 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <span className="mb-1 inline-block rounded-full bg-[#C9862b]/10 px-2 py-0.5 text-[9px] font-bold uppercase text-[#C9862b]">
                    {article.category}
                  </span>
                  <h3 className="text-sm font-bold text-[#0d1a16]">{article.title}</h3>
                </div>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-[#30534A] transition-transform ${
                    expandedId === article.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedId === article.id && (
                <div className="border-t border-[#30534A]/10 px-4 pb-4 pt-3">
                  <p className="text-sm leading-relaxed text-[#555]">{article.content}</p>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Trust Bar */}
        <div
          className={`mt-12 rounded-2xl bg-[#30534A] p-4 transition-all delay-300 duration-700 sm:p-6 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Real insights. Expert advice.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {["Market Updates", "Legal Guides", "Finance Tips"].map((label) => (
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
