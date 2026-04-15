"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { X, Send, CheckCircle2, Award, Shield, Phone } from "lucide-react"

const EMPTY_FORM = { name: "", mobile: "", lookingFor: "", interestedIn: "" }

export default function ContactPopup() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  // Open after 2s on load
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 2000)
    return () => clearTimeout(t)
  }, [])

  // Auto-close after 3s on success
  useEffect(() => {
    if (status !== "success") return
    const t = setTimeout(() => {
      setOpen(false)
      setStatus("idle")
      setForm(EMPTY_FORM)
    }, 3000)
    return () => clearTimeout(t)
  }, [status])

  const set = useCallback(
    (k: keyof typeof EMPTY_FORM) => (v: string) =>
      setForm(p => ({ ...p, [k]: v })),
    []
  )

  const submit = useCallback(async () => {
    if (!form.name || !form.mobile) return
    setStatus("loading")
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "ebbe3bfb-d9c7-4c4e-873c-96728dc8a956",
          name: form.name,
          subject: `Popup Inquiry – ${form.lookingFor}`,
          message: `Name: ${form.name}\nMobile: ${form.mobile}\nLooking For: ${form.lookingFor}\nInterested In: ${form.interestedIn}`,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus("success")
      } else {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 3500)
      }
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3500)
    }
  }, [form])

  if (!open) return null

  return (
    <div
      className="popup-overlay"
      onClick={() => { if (status !== "success") setOpen(false) }}
      role="dialog"
      aria-modal="true"
      aria-label="Contact form"
    >
      <div
        className="popup-box"
        onClick={e => e.stopPropagation()}
      >
        {/* Close btn */}
        {status !== "success" && (
          <button
            className="popup-close"
            onClick={() => setOpen(false)}
            aria-label="Close"
            type="button"
          >
            <X size={16} />
          </button>
        )}

        {status === "success" ? (
          /* ── Thank You State ── */
          <div className="popup-thankyou">
            <div className="popup-thankyou__icon">
              <CheckCircle2 size={30} style={{ color: "#C9862B" }} />
            </div>
            <h3 className="popup-thankyou__title">Thank You!</h3>
            <p className="popup-thankyou__sub">
              Our team will call you within 30 minutes.
            </p>
            <div className="popup-thankyou__bar">
              <div className="popup-thankyou__bar-fill" />
            </div>
          </div>
        ) : (
          /* ── Form State ── */
          <>
            {/* Corner accents */}
            <div className="popup-corner-tl" />
            <div className="popup-corner-br" />

            <div className="popup-header">
              <div className="popup-eyebrow">
                <div className="popup-eyebrow__line" />
                <span className="popup-eyebrow__label">Limited Plots Available</span>
              </div>
              <h3 className="popup-title">Get a Free<br /><em>Site Visit</em></h3>
              <p className="popup-sub">
                Fill in your details — we'll call you within 30 minutes.
              </p>
            </div>

            <div className="popup-form">
              {/* Name */}
              <div className="form-field">
                <label htmlFor="popup-name" className="form-field__label">
                  Full Name<span className="form-field__required">*</span>
                </label>
                <input
                  id="popup-name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => set("name")(e.target.value)}
                  required
                  className="form-field__input"
                />
              </div>

              {/* Mobile */}
              <div className="form-field">
                <label htmlFor="popup-mobile" className="form-field__label">
                  Mobile Number<span className="form-field__required">*</span>
                </label>
                <input
                  id="popup-mobile"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.mobile}
                  onChange={e => set("mobile")(e.target.value)}
                  required
                  className="form-field__input"
                />
              </div>

              {/* Looking For */}
              <div className="form-field">
                <label htmlFor="popup-looking" className="form-field__label">Looking For</label>
                <select
                  id="popup-looking"
                  value={form.lookingFor}
                  onChange={e => set("lookingFor")(e.target.value)}
                  className="form-field__select"
                >
                  <option value="">Select…</option>
                  {["Residential Plot", "Commercial Plot", "Investment", "Other"].map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              {/* Interested In */}
              <div className="form-field">
                <label htmlFor="popup-interested" className="form-field__label">Interested In</label>
                <select
                  id="popup-interested"
                  value={form.interestedIn}
                  onChange={e => set("interestedIn")(e.target.value)}
                  className="form-field__select"
                >
                  <option value="">Select…</option>
                  {["Mahalaxmi Nagar", "Ongoing Project", "Completed Project", "Any Available"].map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              {status === "error" && (
                <p className="contact__error" role="alert">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                onClick={submit}
                disabled={status === "loading"}
                className="contact__submit"
                type="button"
                aria-busy={status === "loading"}
              >
                {status === "loading" ? "Sending…" : (
                  <>
                    <Send size={14} aria-hidden="true" />
                    Send Enquiry
                  </>
                )}
              </button>
            </div>

           
          </>
        )}
      </div>
    </div>
  )
}