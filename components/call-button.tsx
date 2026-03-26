"use client"

import { Phone } from "lucide-react"

export default function CallButton() {
  return (
    <div className="fixed bottom-6 left-4 sm:bottom-8 sm:left-8 z-[9999]">
      <a
        href="tel:+917276362575"
        aria-label="Call us at +91 7276362575"
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-white/30 bg-[#30534A] px-3 py-3 text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(48,83,74,0.5)]"
      >
        <span className="absolute inset-0 -z-10 bg-gradient-to-r from-[#30534A] via-[#3d6a5f] to-[#30534A] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#30534A]">
          <Phone size={18} strokeWidth={2.5} />
        </span>

        <span className="pr-1">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80">
            Need Help?
          </span>
          <span className="block text-sm font-bold leading-none">
            Call Now
          </span>
        </span>

        <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
      </a>
    </div>
  )
}