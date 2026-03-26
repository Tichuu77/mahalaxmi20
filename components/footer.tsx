"use client"

import { memo } from "react"
import { Phone, Mail, MapPin } from "lucide-react"

const navLinks = [
  { href: "#about",        label: "About Us"        },
  { href: "#amenities",    label: "Amenities"       },
  { href: "#projects",     label: "Our Projects"    },
  { href: "#gallery",      label: "Gallery"         },
  { href: "#user-guide",   label: "How It Works"    },
  { href: "#news",         label: "News & Articles" },
  { href: "#testimonials", label: "Testimonials"    },
  { href: "#faq",          label: "FAQ"             },
  { href: "#contact",      label: "Contact Us"      },
]

const contacts = [
  { icon: Phone, href: "tel:+919970501128",             label: "+91 9970501128"           },
  { icon: Mail,  href: "mailto:manoj.mungale@gmail.com", label: "manoj.mungale@gmail.com" },
]

export const Footer = memo(() => (
  <footer className="footer revamp revamp--footer refresh-v3 refresh-v3--footer" aria-label="Footer">
    <div className="footer__dot-bg" />
    <div className="footer__glow-1" />
    <div className="footer__glow-2" />

    <div className="footer__inner">
      <div className="footer__grid">
        {/* Brand */}
        <div>
          <div className="footer__logo-wrap">
            <img
              src="/Malaxmi-Final-Logo-1.png"
              alt="Mahalaxmi Infra"
              width={46}
              height={46}
              loading="lazy"
              className="footer__logo-img"
            />
            <div>
              <div className="footer__logo-name">Mahalaxmi Infra</div>
              <div className="footer__logo-sub">RERA Approved</div>
            </div>
          </div>
          <p className="footer__about-text">
            Nagpur's most trusted name in NMRDA sanctioned, RERA approved
            residential plots. Building landmarks since 2012.
          </p>
          <div className="gold-badge">
            <div className="gold-badge__dot" />
            <span className="gold-badge__text">MAHA RERA NO. A50500044725</span>
          </div>
        </div>

        {/* Quick links */}
        <nav className="footer__col-divider" aria-label="Quick links">
          <div className="footer__col-header">
            <div className="footer__col-line" />
            <h2 className="footer__col-label">Quick Links</h2>
          </div>
          <ul className="footer__nav-list">
            {navLinks.slice(0, 5).map(link => (
              <li key={link.href}>
                <a href={link.href} className="footer__nav-link">
                  <span className="footer__nav-link-dash" aria-hidden="true" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Information links */}
        <nav className="footer__col-divider" aria-label="Information links">
          <div className="footer__col-header">
            <div className="footer__col-line" />
            <h2 className="footer__col-label">Information</h2>
          </div>
          <ul className="footer__nav-list">
            {navLinks.slice(5).map(link => (
              <li key={link.href}>
                <a href={link.href} className="footer__nav-link">
                  <span className="footer__nav-link-dash" aria-hidden="true" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <address className="footer__col-divider" style={{ fontStyle: "normal" }}>
          <div className="footer__col-header">
            <div className="footer__col-line" />
            <h2 className="footer__col-label">Contact</h2>
          </div>
          <p className="footer__contact-name">Manoj Mungale</p>
          <ul className="footer__contact-list">
            {contacts.map(c => {
              const Icon = c.icon
              return (
                <li key={c.label}>
                  <a href={c.href} className="footer__contact-link">
                    <div className="footer__contact-icon-wrap">
                      <Icon size={11} className="footer__contact-icon" aria-hidden="true" />
                    </div>
                    {c.label}
                  </a>
                </li>
              )
            })}
            <li>
              <div className="footer__addr">
                <div className="footer__contact-icon-wrap">
                  <MapPin size={11} className="footer__contact-icon" aria-hidden="true" />
                </div>
                <p className="footer__addr-text">
                  Flat 103/104, Laxmivihar Apartment,<br />
                  Wardha Road, Somalwada,<br />
                  Nagpur 440025
                </p>
              </div>
            </li>
          </ul>
        </address>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">
          © {new Date().getFullYear()} Mahalaxmi Infra. All rights reserved.
        </p>
        <div className="footer__certs" aria-label="Certifications">
          {["NMRDA Approved", "RERA Certified", "ISO Certified"].map(cert => (
            <div key={cert} className="footer__cert">
              <div className="footer__cert-dot" aria-hidden="true" />
              <span className="footer__cert-name">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </footer>
))
Footer.displayName = "Footer"
