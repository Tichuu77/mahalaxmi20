"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronDown, MessageCircle, Phone, Building2, HelpCircle } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "What does NMRDA sanctioned mean?",
    category: "legal",
    answer:
      "NMRDA (Nagpur Metropolitan Region Development Authority) sanctioned means the layout has received official government approval for residential development. It ensures the land is legally designated for housing, roads are planned, and basic infrastructure norms are met. All Mahalaxmi Infra projects carry NMRDA sanction.",
  },
  {
    id: 2,
    question: "Is bank loan available on your plots?",
    category: "finance",
    answer:
      "Yes. All our projects are eligible for bank finance of up to 90% of the plot value. We work with SBI, Bank of Maharashtra, Axis Bank, HDFC, and other leading banks. Our team assists with documentation, valuation, and loan processing at no extra charge.",
  },
  {
    id: 3,
    question: "What is RERA and why does it matter?",
    category: "legal",
    answer:
      "RERA (Real Estate Regulatory Authority) is a government body that protects homebuyers. RERA-registered projects ensure developer accountability, transparent pricing, and legal recourse in case of disputes. Our MAHA RERA number is A50500044725 - verifiable on the MahaRERA portal.",
  },
  {
    id: 4,
    question: "How do I book a site visit?",
    category: "process",
    answer:
      "You can book a site visit by calling us at +91 9322987615, messaging on WhatsApp, or filling the contact form on this page. Our representative will accompany you to the site, explain the layout, and answer all questions on-spot. We arrange transport from Nagpur city at no cost.",
  },
  {
    id: 5,
    question: "What is the starting price of plots?",
    category: "pricing",
    answer:
      "Our plots start from Rs 22 Lakh. Pricing varies by project, size, and location. Plots near MIHAN and Samruddhi Mahamarg are priced higher due to connectivity and appreciation potential. Contact us for a current price list for any specific project.",
  },
  {
    id: 6,
    question: "How long does the registration process take?",
    category: "process",
    answer:
      "After booking, the registration process typically takes 2-4 weeks, subject to SRO appointment availability. Our team handles all documentation, liaises with the sub-registrar office, and keeps you updated at every step. Stamp duty and registration charges are as per Maharashtra government norms.",
  },
]

const CHIPS = ["all", "legal", "finance", "process", "pricing"] as const
type Chip = (typeof CHIPS)[number]

export default function FaqSection() {
  const [activeChip, setActiveChip] = useState<Chip>("all")
  const [expandedId, setExpandedId] = useState<number | null>(1)
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

  const filtered = activeChip === "all" ? faqs : faqs.filter((f) => f.category === activeChip)

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative overflow-hidden bg-[#f7f4ef] py-16 sm:py-20 lg:py-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(#30534A 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mb-10 flex flex-col gap-6 transition-all duration-700 lg:mb-12 lg:flex-row lg:items-end lg:justify-between ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="text-center lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9862b]/20 bg-[#C9862b]/10 px-4 py-2">
              <div className="h-1.5 w-6 rounded-full bg-gradient-to-r from-[#C9862b] to-[#C9862b]/50" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9862b]">Common Questions</span>
            </div>
            <h2 className="text-3xl font-bold text-[#0d1a16] sm:text-4xl lg:text-5xl">
              Frequently <span className="text-[#30534A]">Asked</span>
              <br />
              <span className="text-[#C9862b]">Questions</span>
            </h2>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:justify-end" role="group" aria-label="Filter questions">
            {CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => setActiveChip(chip)}
                aria-pressed={activeChip === chip}
                className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all sm:px-4 sm:py-2 sm:text-xs ${
                  activeChip === chip
                    ? "bg-[#30534A] text-white shadow-lg shadow-[#30534A]/30"
                    : "border border-[#30534A]/15 bg-white text-[#555] hover:border-[#30534A] hover:text-[#30534A]"
                }`}
                type="button"
              >
                {chip.charAt(0).toUpperCase() + chip.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* FAQ Accordion */}
          <div
            className={`lg:col-span-2 space-y-2 sm:space-y-3 transition-all delay-100 duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {filtered.map((faq, index) => {
              const isOpen = expandedId === faq.id
              return (
                <div
                  key={faq.id}
                  className={`overflow-hidden rounded-xl border transition-all duration-300 sm:rounded-2xl ${
                    isOpen
                      ? "border-[#C9862b]/30 bg-white shadow-lg"
                      : "border-[#30534A]/10 bg-white/50 hover:border-[#30534A]/20 hover:bg-white"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <button
                    className="flex w-full items-center gap-3 p-4 text-left sm:gap-4 sm:p-5"
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    type="button"
                  >
                    <span
                      className={`text-base font-bold transition-colors sm:text-lg ${isOpen ? "text-[#C9862b]" : "text-[#30534A]/30"}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={`flex-1 text-sm font-semibold sm:text-base ${isOpen ? "text-[#0d1a16]" : "text-[#0d1a16]/80"}`}>
                      {faq.question}
                    </span>
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all sm:h-8 sm:w-8 ${
                        isOpen ? "rotate-180 bg-[#C9862b] text-white" : "bg-[#30534A]/5 text-[#30534A]"
                      }`}
                    >
                      <ChevronDown size={14} className="sm:size-4" />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="border-t border-[#30534A]/10 px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
                      <p className="text-sm leading-relaxed text-[#555]">{faq.answer}</p>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Hint */}
            <div className="flex items-start gap-3 rounded-xl border border-[#30534A]/10 bg-white/50 p-3 sm:items-center sm:rounded-2xl sm:p-4">
              <MessageCircle size={16} className="mt-0.5 shrink-0 text-[#30534A] sm:mt-0 sm:size-[18px]" />
              <p className="text-xs text-[#666] sm:text-sm">
                Still have questions? <strong>Chat with us on WhatsApp</strong> - we respond within minutes.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside
            className={`space-y-4 transition-all delay-200 duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {/* Stats Card */}
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#30534A] to-[#1a2e29] p-6 text-white shadow-xl">
              <div className="relative">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#C9862b]/20 blur-2xl" />
                <div className="relative">
                  <div className="mb-1 h-1 w-8 rounded-full bg-[#C9862b]" />
                  <h3 className="mb-4 text-lg font-bold">Why Families Choose Us</h3>
                  <div className="space-y-4">
                    {[
                      { icon: Building2, val: "70+", lbl: "Completed Projects" },
                      { icon: HelpCircle, val: "17K+", lbl: "Happy Families" },
                      { icon: MessageCircle, val: "100%", lbl: "RERA Approved" },
                    ].map((s) => {
                      const Icon = s.icon
                      return (
                        <div key={s.lbl} className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                            <Icon size={18} className="text-[#C9862b]" />
                          </div>
                          <div>
                            <p className="text-xl font-bold text-[#C9862b]">{s.val}</p>
                            <p className="text-xs text-white/60">{s.lbl}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="rounded-2xl border border-[#30534A]/10 bg-white p-6">
              <div className="mb-3 h-1 w-8 rounded-full bg-[#C9862b]" />
              <h4 className="mb-2 text-base font-bold text-[#0d1a16]">Ready to Visit a Site?</h4>
              <p className="mb-4 text-sm text-[#666]">Book a free site visit - our team will guide you personally.</p>
              <div className="flex gap-2">
                <button
                  className="flex-1 rounded-xl bg-[#30534A] py-3 text-sm font-bold text-white transition-all hover:bg-[#26433d]"
                  onClick={() => window.open("https://wa.me/919970501128", "_blank")}
                  type="button"
                >
                  WhatsApp
                </button>
                <a
                  href="tel:+919322987615"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#30534A]/15 py-3 text-sm font-bold text-[#30534A] transition-all hover:bg-[#30534A]/5"
                >
                  <Phone size={14} />
                  Call Us
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Trust Bar */}
        <div
          className={`mt-12 rounded-2xl bg-[#30534A] p-4 transition-all delay-300 duration-700 sm:p-6 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Transparent. Honest. Always.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {["No Hidden Charges", "Clear Documentation", "Expert Guidance"].map((label) => (
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
