"use client"

import { useState, useRef, useEffect, useCallback, memo } from "react"
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"

const galleryItems = [
  { id: 1,  src: "/gallery1.jpg",  alt: "Morning view of the layout",      category: "Exterior"   },
  { id: 2,  src: "/gallery2.jpg",  alt: "Well-maintained community square", category: "Amenities"  },
  { id: 3,  src: "/gallery3.jpg",  alt: "Grand entrance gate",              category: "Exterior"   },
  { id: 4,  src: "/gallery4.jpg",  alt: "Tree-lined boulevard",             category: "Landscape"  },
  { id: 5,  src: "/gallery5.jpg",  alt: "Night-time exterior view",         category: "Exterior"   },
  { id: 6,  src: "/gallery6.jpg",  alt: "Cosy living space interior",       category: "Interior"   },
  { id: 7,  src: "/gallery7.jpg",  alt: "Designer interior finish",         category: "Interior"   },
  { id: 8,  src: "/gallery8.jpg",  alt: "Premium amenity area",             category: "Amenities"  },
  { id: 9,  src: "/gallery9.jpg",  alt: "Swimming pool area",               category: "Amenities"  },
  { id: 10, src: "/gallery10.jpg", alt: "Evening aerial view",              category: "Exterior"   },
  { id: 11, src: "/gallery11.jpg", alt: "Children's playground",            category: "Amenities"  },
  { id: 12, src: "/gallery12.jpg", alt: "Aerial top view of layout",        category: "Exterior"   },
]

const TOTAL    = galleryItems.length
const TALL_SET = new Set([0, 6])

function getNext(id: number) {
  return galleryItems[(galleryItems.findIndex(g => g.id === id) + 1) % TOTAL].id
}
function getPrev(id: number) {
  return galleryItems[(galleryItems.findIndex(g => g.id === id) - 1 + TOTAL) % TOTAL].id
}

const Lightbox = memo(({
  id,
  onClose,
  onPrev,
  onNext,
}: {
  id: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) => {
  const item  = galleryItems.find(g => g.id === id)!
  const index = galleryItems.findIndex(g => g.id === id)

  return (
    <div
      className="lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image lightbox: ${item.alt}`}
    >
      <div className="lightbox__inner" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="lightbox__close"
          type="button"
        >
          <X size={14} />
        </button>

        <div className="lightbox__frame">
          <img src={item.src} alt={item.alt} />
          <button
            onClick={onPrev}
            aria-label="Previous image"
            className="lightbox__nav lightbox__nav--prev"
            type="button"
          >
            <ChevronLeft size={17} />
          </button>
          <button
            onClick={onNext}
            aria-label="Next image"
            className="lightbox__nav lightbox__nav--next"
            type="button"
          >
            <ChevronRight size={17} />
          </button>
        </div>

        <div className="lightbox__caption">
          <div>
            <p className="lightbox__cap-name">{item.alt}</p>
            <span className="lightbox__cap-cat">{item.category}</span>
          </div>
          <div className="lightbox__progress" aria-label={`Image ${index + 1} of ${TOTAL}`}>
            {galleryItems.map((_, i) => (
              <div
                key={i}
                className={`lightbox__prog-dot${i === index ? " active" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})
Lightbox.displayName = "Lightbox"

const Tile = memo(({
  item,
  tall,
  visible,
  index,
  onOpen,
}: {
  item: typeof galleryItems[0]
  tall?: boolean
  visible: boolean
  index: number
  onOpen: (id: number) => void
}) => (
  <div
    className={`gal-tile${tall ? " gal-tile--tall" : ""}${visible ? " on" : ""} s${index}`}
    onClick={() => onOpen(item.id)}
    role="button"
    tabIndex={0}
    aria-label={`View full image: ${item.alt}`}
    onKeyDown={e => (e.key === "Enter" || e.key === " ") && onOpen(item.id)}
  >
    <img
      src={item.src}
      alt={item.alt}
      loading="lazy"
      decoding="async"
      className="gal-tile__img"
    />
    <div className="gal-tile__overlay" aria-hidden="true" />
    <div className="gal-tile__zoom" aria-hidden="true">
      <ZoomIn size={14} />
    </div>
    <div className="gal-tile__cap" aria-hidden="true">
      <span className="gal-tile__cat">{item.category}</span>
      <p className="gal-tile__name">{item.alt}</p>
    </div>
    <div className="gal-tile__bar" aria-hidden="true" />
  </div>
))
Tile.displayName = "Tile"

export function GallerySection() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [isVisible, setIsVisible]   = useState(false)
  const [slide, setSlide]           = useState(0)
  const sectionRef  = useRef<HTMLElement>(null)
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
      { threshold: 0.05, rootMargin: "80px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (selectedId === null) return
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); setSelectedId(id => id !== null ? getNext(id) : null) }
      if (e.key === "ArrowLeft")  { e.preventDefault(); setSelectedId(id => id !== null ? getPrev(id) : null) }
      if (e.key === "Escape")     setSelectedId(null)
    }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [selectedId])

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = selectedId !== null ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [selectedId])

  const open      = useCallback((id: number) => setSelectedId(id), [])
  const close     = useCallback(() => setSelectedId(null), [])
  const modalPrev = useCallback(() => setSelectedId(id => id !== null ? getPrev(id) : null), [])
  const modalNext = useCallback(() => setSelectedId(id => id !== null ? getNext(id) : null), [])
  const prevSlide = useCallback(() => setSlide(p => (p - 1 + TOTAL) % TOTAL), [])
  const nextSlide = useCallback(() => setSlide(p => (p + 1) % TOTAL), [])

  const vis = isVisible

  return (
    <section ref={sectionRef} id="gallery" aria-label="Project Gallery" className="gallery revamp revamp--gallery">
      <div className="label-strip">
        <div className="label-strip__line" />
        <span className="label-strip__text">Gallery</span>
        <div className="label-strip__fill" />
        <span className="label-strip__right">{TOTAL} Photos</span>
      </div>

      <div className="section-inner">
        <div className={`rv ${vis ? "on" : ""} d0 gallery__heading`}>
          <div className="section-eyebrow">
            <div className="section-eyebrow__line" />
            <span className="section-eyebrow__label">Real Sites. Real Progress.</span>
          </div>
          <h2 id="gallery-heading" className="section-heading">
            Inside Our <em>Projects</em> <span>&amp; Spaces</span>
          </h2>
        </div>

        {/* Desktop grid */}
        <div className={`gallery__grid rv ${vis ? "on" : ""} d1`}>
          {galleryItems.map((item, i) => (
            <Tile
              key={item.id}
              item={item}
              tall={TALL_SET.has(i)}
              visible={vis}
              index={i}
              onOpen={open}
            />
          ))}
        </div>

        {/* Mobile slider */}
        <div className={`gallery__mob rv ${vis ? "on" : ""} d1`}>
          <div
            className="gallery__mob-card"
            onClick={() => open(galleryItems[slide].id)}
            role="button"
            aria-label={`View: ${galleryItems[slide].alt}`}
            tabIndex={0}
            onKeyDown={e => (e.key === "Enter" || e.key === " ") && open(galleryItems[slide].id)}
          >
            <img
              src={galleryItems[slide].src}
              alt={galleryItems[slide].alt}
              loading="lazy"
              decoding="async"
            />
            <div className="gallery__mob-overlay" aria-hidden="true" />
            <div className="gallery__mob-caption" aria-hidden="true">
              <span className="gallery__mob-cat">{galleryItems[slide].category}</span>
              <p className="gallery__mob-name">{galleryItems[slide].alt}</p>
            </div>
            <div className="gallery__mob-zoom" aria-hidden="true">
              <ZoomIn size={13} />
            </div>
          </div>

          <div className="gallery__controls">
            <button
              onClick={prevSlide}
              aria-label="Previous photo"
              className="gallery__nav-btn"
              type="button"
            >
              <ChevronLeft size={15} />
            </button>

            <div
              className="gallery__dots"
              role="tablist"
              aria-label="Gallery slides"
            >
              {galleryItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  role="tab"
                  aria-selected={i === slide}
                  aria-label={`Photo ${i + 1}`}
                  className={`gallery__dot${i === slide ? " active" : ""}`}
                  type="button"
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next photo"
              className="gallery__nav-btn"
              type="button"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <div className="trust-bar">
        <div className="trust-bar__inner">
          <p className="trust-bar__label">Every frame, a promise</p>
          <div className="trust-bar__items">
            {["Real Photography", "Actual Sites", "No Renders"].map(label => (
              <div key={label} className="trust-bar__item">
                <div className="trust-bar__dot" />
                <span className="trust-bar__name">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedId !== null && (
        <Lightbox
          id={selectedId}
          onClose={close}
          onPrev={modalPrev}
          onNext={modalNext}
        />
      )}
    </section>
  )
}
