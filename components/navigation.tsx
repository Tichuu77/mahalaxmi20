"use client"

import { useEffect, useState } from "react"
import { Menu, X, ChevronRight, Phone, MapPin } from "lucide-react"

const navLinks = [
  { href: "#about", label: "About", icon: "info" },
  { href: "#amenities", label: "Amenities", icon: "star" },
  { href: "#projects", label: "Projects", icon: "building" },
  { href: "#gallery", label: "Gallery", icon: "image" },
  { href: "#user-guide", label: "How It Works", icon: "book" },
  { href: "#news", label: "News", icon: "newspaper" },
  { href: "#testimonials", label: "Testimonials", icon: "message" },
  { href: "#contact", label: "Contact", icon: "mail" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map(link => link.href.replace("#", ""))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      {/* Desktop & Mobile Header */}
      <header 
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 shadow-lg backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <a href="#" aria-label="Mahalaxmi Infra - Home" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/Malaxmi-Final-Logo-1.png"
                alt="Mahalaxmi Infra Logo"
                width={48}
                height={48}
                className="h-12 w-12 rounded-xl border border-[#30534A]/20 bg-white p-1 transition-transform duration-300 group-hover:scale-105"
                fetchPriority="high"
                decoding="sync"
              />
            </div>
            <div className="hidden sm:block">
              <p className={`text-base font-bold tracking-wide transition-colors ${scrolled ? "text-[#30534A]" : "text-white"}`}>
                Mahalaxmi Infra
              </p>
              <p className={`text-xs font-semibold ${scrolled ? "text-[#C9862b]" : "text-[#C9862b]"}`}>
                RERA Approved
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex" role="navigation" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  activeSection === link.href.replace("#", "")
                    ? scrolled
                      ? "bg-[#30534A] text-white"
                      : "bg-white/20 text-white"
                    : scrolled
                    ? "text-[#30534A]/80 hover:bg-[#30534A]/10 hover:text-[#30534A]"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className={`hidden rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 sm:inline-flex ${
                scrolled
                  ? "bg-[#C9862b] text-white shadow-lg shadow-[#C9862b]/30 hover:bg-[#b5771f] hover:shadow-xl"
                  : "bg-white text-[#30534A] hover:bg-white/90"
              }`}
            >
              Get Started
            </a>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className={`relative inline-flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 lg:hidden ${
                scrolled 
                  ? "bg-[#30534A] text-white" 
                  : "bg-white/20 text-white backdrop-blur-sm"
              }`}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              <span className={`absolute transition-all duration-300 ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}>
                <Menu size={20} />
              </span>
              <span className={`absolute transition-all duration-300 ${isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}>
                <X size={20} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile App-like Drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <aside
            id="mobile-nav"
            className="fixed inset-y-0 right-0 z-50 flex h-full w-[85%] max-w-sm flex-col bg-white"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            style={{ 
              animation: "slideInFromRight 0.3s cubic-bezier(0.32, 0.72, 0, 1)" 
            }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[#30534A]/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <img
                  src="/Malaxmi-Final-Logo-1.png"
                  alt="Mahalaxmi Infra"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-lg bg-white p-0.5"
                />
                <div>
                  <p className="text-sm font-bold text-[#30534A]">Mahalaxmi Infra</p>
                  <p className="text-xs text-[#C9862b]">RERA Approved</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#30534A]/10 text-[#30534A] transition-colors hover:bg-[#30534A] hover:text-white"
                aria-label="Close navigation menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto px-4 py-4" role="navigation" aria-label="Mobile navigation">
              <p className="mb-3 px-2 text-xs font-bold uppercase tracking-widest text-[#30534A]/50">
                Navigation
              </p>
              <div className="space-y-1">
                {navLinks.map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`group flex items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-200 ${
                      activeSection === link.href.replace("#", "")
                        ? "bg-[#30534A] text-white"
                        : "text-[#30534A] hover:bg-[#30534A]/5"
                    }`}
                    onClick={() => setIsOpen(false)}
                    style={{ 
                      animation: `fadeInUp 0.3s cubic-bezier(0.32, 0.72, 0, 1) ${index * 0.05}s both` 
                    }}
                  >
                    <span className="text-base font-semibold">{link.label}</span>
                    <ChevronRight 
                      size={16} 
                      className={`transition-transform duration-200 group-hover:translate-x-1 ${
                        activeSection === link.href.replace("#", "") ? "text-white/70" : "text-[#30534A]/40"
                      }`} 
                    />
                  </a>
                ))}
              </div>
            </nav>

            {/* Bottom Action Area */}
            <div className="border-t border-[#30534A]/10 p-4">
              {/* Quick Contact */}
              <div className="mb-4 rounded-xl bg-[#f7f4ef] p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#30534A]/60">Quick Contact</p>
                <a 
                  href="tel:+919970501128" 
                  className="mb-2 flex items-center gap-3 text-sm font-semibold text-[#30534A]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#30534A]/10">
                    <Phone size={14} className="text-[#30534A]" />
                  </span>
                  +91 9970501128
                </a>
                <div className="flex items-start gap-3 text-sm text-[#30534A]/70">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#30534A]/10">
                    <MapPin size={14} className="text-[#30534A]" />
                  </span>
                  <span className="text-xs leading-relaxed">Nagpur, Maharashtra</span>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="#contact"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C9862b] to-[#a86a1a] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#C9862b]/30 transition-all duration-300 hover:shadow-xl"
                onClick={() => setIsOpen(false)}
              >
                Schedule Site Visit
                <ChevronRight size={16} />
              </a>

              {/* RERA Badge */}
              <p className="mt-4 text-center text-[10px] font-medium text-[#30534A]/40">
                MAHA RERA NO. A50500044725
              </p>
            </div>
          </aside>
        </>
      )}

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
