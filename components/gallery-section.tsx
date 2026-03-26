"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"

const galleryItems = [
  { id: 1, src: "/gallery1.jpg", alt: "Morning view of the layout", category: "Exterior" },
  { id: 2, src: "/gallery2.jpg", alt: "Well-maintained community square", category: "Amenities" },
  { id: 3, src: "/gallery3.jpg", alt: "Grand entrance gate", category: "Exterior" },
  { id: 4, src: "/gallery4.jpg", alt: "Tree-lined boulevard", category: "Landscape" },
  { id: 5, src: "/gallery5.jpg", alt: "Night-time exterior view", category: "Exterior" },
  { id: 6, src: "/gallery6.jpg", alt: "Cosy living space interior", category: "Interior" },
  { id: 7, src: "/gallery7.jpg", alt: "Designer interior finish", category: "Interior" },
  { id: 8, src: "/gallery8.jpg", alt: "Premium amenity area", category: "Amenities" },
  { id: 9, src: "/gallery9.jpg", alt: "Swimming pool area", category: "Amenities" },
  { id: 10, src: "/gallery10.jpg", alt: "Evening aerial view", category: "Exterior" },
  { id: 11, src: "/gallery11.jpg", alt: "Children's playground", category: "Amenities" },
  { id: 12, src: "/gallery12.jpg", alt: "Aerial top view of layout", category: "Exterior" },
]

const TOTAL = galleryItems.length

function getNext(id: number) {
  return galleryItems[(galleryItems.findIndex((g) => g.id === id) + 1) % TOTAL].id
}
function getPrev(id: number) {
  return galleryItems[(galleryItems.findIndex((g) => g.id === id) - 1 + TOTAL) % TOTAL].id
}

export function GallerySection() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [slide, setSlide] = useState(0)
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
      { threshold: 0.05, rootMargin: "80px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (selectedId === null) return
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault()
        setSelectedId((id) => (id !== null ? getNext(id) : null))
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        setSelectedId((id) => (id !== null ? getPrev(id) : null))
      }
      if (e.key === "Escape") setSelectedId(null)
    }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [selectedId])

  useEffect(() => {
    document.body.style.overflow = selectedId !== null ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedId])

  const open = useCallback((id: number) => setSelectedId(id), [])
  const close = useCallback(() => setSelectedId(null), [])
  const modalPrev = useCallback(() => setSelectedId((id) => (id !== null ? getPrev(id) : null)), [])
  const modalNext = useCallback(() => setSelectedId((id) => (id !== null ? getNext(id) : null)), [])
  const prevSlide = useCallback(() => setSlide((p) => (p - 1 + TOTAL) % TOTAL), [])
  const nextSlide = useCallback(() => setSlide((p) => (p + 1) % TOTAL), [])

  const selectedItem = selectedId !== null ? galleryItems.find((g) => g.id === selectedId) : null
  const selectedIndex = selectedId !== null ? galleryItems.findIndex((g) => g.id === selectedId) : -1

  return (
    <section
      ref={sectionRef}
      id="gallery"
      aria-label="Project Gallery"
      className="relative overflow-hidden bg-[#f7f4ef] py-16 sm:py-20 lg:py-24"
    >
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
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
          className={`mb-10 text-center transition-all duration-700 lg:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9862b]/20 bg-[#C9862b]/10 px-4 py-2">
            <div className="h-1.5 w-6 rounded-full bg-gradient-to-r from-[#C9862b] to-[#C9862b]/50" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9862b]">Real Sites. Real Progress.</span>
          </div>
          <h2 className="text-3xl font-bold text-[#0d1a16] sm:text-4xl lg:text-5xl">
            Inside Our <span className="text-[#30534A]">Projects</span>
            <br />
            <span className="text-[#C9862b]">& Spaces</span>
          </h2>
        </div>

        {/* Desktop Masonry Grid */}
        <div
          className={`hidden gap-3 md:grid md:grid-cols-3 lg:grid-cols-4 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {galleryItems.map((item, i) => {
            const isLarge = i === 0 || i === 6
            return (
              <div
                key={item.id}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                  isLarge ? "md:col-span-2 md:row-span-2" : ""
                }`}
                style={{ transitionDelay: `${i * 40}ms` }}
                onClick={() => open(item.id)}
                role="button"
                tabIndex={0}
                aria-label={`View full image: ${item.alt}`}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open(item.id)}
              >
                <div className={`aspect-[4/3] ${isLarge ? "md:aspect-square" : ""}`}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Zoom Icon */}
                <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-[#C9862b] opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75">
                  <ZoomIn size={20} className="text-white" />
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#C9862b]">
                    {item.category}
                  </span>
                  <p className="text-sm font-semibold text-white">{item.alt}</p>
                </div>

                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#C9862b] to-[#30534A] transition-all duration-500 group-hover:w-full" />
              </div>
            )
          })}
        </div>

        {/* Mobile Slider */}
        <div className={`md:hidden transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            onClick={() => open(galleryItems[slide].id)}
            role="button"
            aria-label={`View: ${galleryItems[slide].alt}`}
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open(galleryItems[slide].id)}
          >
            <img
              src={galleryItems[slide].src}
              alt={galleryItems[slide].alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Caption */}
            <div className="absolute bottom-4 left-4 right-4">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#C9862b]">
                {galleryItems[slide].category}
              </span>
              <p className="text-base font-semibold text-white">{galleryItems[slide].alt}</p>
            </div>

            {/* Zoom Icon */}
            <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9862b]/90">
              <ZoomIn size={16} className="text-white" />
            </div>
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={prevSlide}
              aria-label="Previous photo"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#30534A]/15 bg-white text-[#30534A] transition-colors hover:bg-[#30534A] hover:text-white"
              type="button"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-1.5" role="tablist" aria-label="Gallery slides">
              {galleryItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  role="tab"
                  aria-selected={i === slide}
                  aria-label={`Photo ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === slide ? "w-6 bg-[#C9862b]" : "w-1.5 bg-[#30534A]/20"
                  }`}
                  type="button"
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next photo"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#30534A]/15 bg-white text-[#30534A] transition-colors hover:bg-[#30534A] hover:text-white"
              type="button"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Trust Bar */}
        <div
          className={`mt-12 rounded-2xl bg-[#30534A] p-4 transition-all delay-300 duration-700 sm:p-6 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Every frame, a promise</p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {["Real Photography", "Actual Sites", "No Renders"].map((label) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#C9862b]" />
                  <span className="text-xs font-semibold text-white/70">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedId !== null && selectedItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Image lightbox: ${selectedItem.alt}`}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={close}
              aria-label="Close lightbox"
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10"
              type="button"
            >
              <X size={18} />
            </button>

            {/* Image */}
            <div className="relative overflow-hidden rounded-2xl">
              <img src={selectedItem.src} alt={selectedItem.alt} className="max-h-[70vh] w-full object-contain" />

              {/* Nav Buttons */}
              <button
                onClick={modalPrev}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl border border-white/10 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-[#C9862b]"
                type="button"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={modalNext}
                aria-label="Next image"
                className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl border border-white/10 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-[#C9862b]"
                type="button"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Caption */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-white">{selectedItem.alt}</p>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C9862b]">{selectedItem.category}</span>
              </div>
              <div className="flex gap-1" aria-label={`Image ${selectedIndex + 1} of ${TOTAL}`}>
                {galleryItems.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${i === selectedIndex ? "w-6 bg-[#C9862b]" : "w-1.5 bg-white/20"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
