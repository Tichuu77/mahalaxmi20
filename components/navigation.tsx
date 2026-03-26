"use client"

import { useState, useCallback, useEffect, memo } from "react"
import { X, Menu } from "lucide-react"

const navLinks = [
  { href: "#about",        label: "About"        },
  { href: "#amenities",    label: "Amenities"    },
  { href: "#projects",     label: "Projects"     },
  { href: "#gallery",      label: "Gallery"      },
  { href: "#user-guide",   label: "How It Works" },
  { href: "#news",         label: "News"         },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact",      label: "Contact"      },
]

const DesktopLinks = memo(() => (
  <nav className="nav__links" aria-label="Primary navigation">
    {navLinks.map(link => (
      <a key={link.href} href={link.href} className="nav__link">
        {link.label}
      </a>
    ))}
  </nav>
))
DesktopLinks.displayName = "DesktopLinks"

export function Navigation() {
  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  const toggle    = useCallback(() => setIsOpen(p => !p), [])
  const closeMenu = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <nav role="navigation" aria-label="Main navigation" className={`nav revamp revamp--nav ${scrolled ? "nav--scrolled" : "nav--top"}`}>
        <div className="nav__inner">
          <a href="#" aria-label="Mahalaxmi Infra – Home" className="nav__logo">
            <img
              src="/Malaxmi-Final-Logo-1.png"
              alt="Mahalaxmi Infra Logo"
              width={48}
              height={48}
              className="nav__logo-img"
              fetchPriority="high"
              decoding="sync"
            />
            <div>
              <div className="nav__logo-name">Mahalaxmi Infra</div>
              <div className="nav__logo-sub">RERA Approved</div>
            </div>
          </a>

          <DesktopLinks />

          <div className="nav__cta">
            <a href="#contact" className="nav__cta-btn">
              Get Started
            </a>
          </div>

          <div className="nav__toggle">
            <button
              onClick={toggle}
              className="nav__toggle-btn"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {isOpen && (
        <div
          id="mobile-nav"
          className="nav__drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="nav__drawer-label">
            <div className="nav__drawer-label-line" />
            <span className="nav__drawer-label-text">Navigation</span>
          </div>

          <nav className="nav__drawer-links" aria-label="Mobile navigation">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="nav__drawer-link"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="nav__drawer-cta"
            onClick={closeMenu}
            aria-label="Get started – contact us"
          >
            Get Started
          </a>
        </div>
      )}
    </>
  )
}
