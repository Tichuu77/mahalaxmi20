"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#amenities", label: "Amenities" },
  { href: "#projects", label: "Projects" },
  { href: "#gallery", label: "Gallery" },
  { href: "#user-guide", label: "How It Works" },
  { href: "#news", label: "News" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 refresh-v3 refresh-v3--nav">
        <div
          className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-300 ${
            scrolled
              ? "border-[#30534A]/30 bg-white/95 shadow-xl backdrop-blur"
              : "border-white/25 bg-[#30534A]/90 shadow-lg backdrop-blur-sm"
          }`}
        >
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <a href="#" aria-label="Mahalaxmi Infra – Home" className="flex items-center gap-3">
              <img
                src="/Malaxmi-Final-Logo-1.png"
                alt="Mahalaxmi Infra Logo"
                width={44}
                height={44}
                className="h-11 w-11 rounded-xl border border-white/20 bg-white p-1"
                fetchPriority="high"
                decoding="sync"
              />
              <div>
                <p className={`text-sm font-extrabold uppercase tracking-[0.18em] ${scrolled ? "text-[#30534A]" : "text-white"}`}>
                  Mahalaxmi Infra
                </p>
                <p className={`text-xs font-semibold ${scrolled ? "text-[#30534A]/70" : "text-white/80"}`}>
                  RERA Approved
                </p>
              </div>
            </a>

            <div className="ml-6 hidden flex-1 items-center justify-center gap-2 lg:flex" role="navigation" aria-label="Primary navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    scrolled
                      ? "text-[#30534A] hover:bg-[#30534A] hover:text-white"
                      : "text-white hover:bg-white hover:text-[#30534A]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <a
                href="#contact"
                className={`hidden rounded-full px-5 py-2 text-sm font-bold sm:inline-flex ${
                  scrolled
                    ? "bg-[#30534A] text-white hover:bg-[#26433d]"
                    : "bg-white text-[#30534A] hover:bg-[#f4f4f4]"
                }`}
              >
                Get Started
              </a>

              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl lg:hidden ${
                  scrolled ? "bg-[#30534A] text-white" : "bg-white text-[#30534A]"
                }`}
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[1px]"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          />

          <aside
            id="mobile-nav"
            className="fixed right-0 top-0 z-50 h-full w-[86%] max-w-sm overflow-y-auto border-l border-[#30534A]/20 bg-white p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#30534A]/70">Menu</p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#30534A] text-white"
                aria-label="Close navigation menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2" role="navigation" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl border border-[#30534A]/15 px-4 py-3 text-base font-semibold text-[#30534A] transition hover:bg-[#30534A] hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#30534A] px-5 py-3 text-sm font-bold text-white"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </a>
          </aside>
        </>
      )}
    </>
  )
}
