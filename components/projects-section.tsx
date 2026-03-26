"use client"

import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { MapPin, Phone, ArrowRight, Building2, ChevronLeft, ChevronRight } from "lucide-react"

type Project = {
  id: number
  title: string
  image: string
  description: string
  location: string
  status: "ongoing" | "completed" | "upcoming"
}

const projects: Record<string, Project[]> = {
  ongoing: [
    {
      id: 1,
      title: "Mahalaxmi Nagar - 42",
      image: "/ongoingProject42.webp",
      description: "Well-connected plots near Jamtha, Wardha Road. NMRDA & RL sanctioned with excellent amenities.",
      location: "Mouza Jamtha",
      status: "ongoing",
    },
    {
      id: 2,
      title: "Mahalaxmi Nagar - 43",
      image: "/project_43.jpg",
      description: "Ready-to-move plots behind Royal Gondwana School, Shankarpur. Fully developed with 90% finance.",
      location: "Mouza Shankarpur",
      status: "ongoing",
    },
    {
      id: 3,
      title: "Mahalaxmi Nagar - 44",
      image: "/M-44.jpg",
      description: "NIT / NMRDA sanctioned layout with RL. Bank finance available 75-80% from any nationalised bank.",
      location: "Mouza Tarodi",
      status: "ongoing",
    },
    {
      id: 4,
      title: "Mahalaxmi Nagar - 45",
      image: "/project_M-45.jpg",
      description: "Premium plotted development near Samruddhi Mahamarg, close to AIIMS, IIM, MIHAN & D-Mart.",
      location: "Mouza Sumthana",
      status: "ongoing",
    },
    {
      id: 5,
      title: "Mahalaxmi Nagar - 46",
      image: "/project_M-46.jpg",
      description: "NIT / NMRDA sanctioned layout with RL. Bank finance available 75-80% from any nationalised bank.",
      location: "Mouza Pandhurna, Umred Road",
      status: "ongoing",
    },
  ],
  completed: [],
  upcoming: [],
}

const ALL: Project[] = [...projects.completed, ...projects.ongoing, ...projects.upcoming]

const TABS = [
  { label: "All", value: "all" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Completed", value: "completed" },
  { label: "Upcoming", value: "upcoming" },
] as const
type TabValue = (typeof TABS)[number]["value"]

function buildWhatsAppUrl(title: string, location: string): string {
  const text = `Hi, I'm interested in "${title}"${location ? ` at ${location}` : ""}. Could you please share more details?`
  return `https://wa.me/919970501128?text=${encodeURIComponent(text)}`
}

const StatusBadge = ({ status }: { status: Project["status"] }) => {
  const styles = {
    ongoing: "bg-[#C9862b]/10 text-[#C9862b] border-[#C9862b]/30",
    completed: "bg-[#30534A]/10 text-[#30534A] border-[#30534A]/30",
    upcoming: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${styles[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === "ongoing" ? "bg-[#C9862b]" : status === "completed" ? "bg-[#30534A]" : "bg-blue-500"}`} />
      {status}
    </span>
  )
}

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<TabValue>("all")
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
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
      { threshold: 0.05, rootMargin: "60px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const filtered = useMemo(
    () => (activeTab === "all" ? ALL : ALL.filter((p) => p.status === activeTab)),
    [activeTab]
  )

  const openWA = useCallback((title: string, location: string) => {
    window.open(buildWhatsAppUrl(title, location), "_blank")
  }, [])

  const prevSlide = useCallback(() => setCurrentSlide((p) => (p - 1 + filtered.length) % filtered.length), [filtered.length])
  const nextSlide = useCallback(() => setCurrentSlide((p) => (p + 1) % filtered.length), [filtered.length])

  useEffect(() => {
    setCurrentSlide(0)
  }, [activeTab])

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Our Projects"
      className="relative overflow-hidden bg-[#0d1a16] py-16 sm:py-20 lg:py-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-[#30534A]/20 blur-[100px]" />
        <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#C9862b]/10 blur-[80px]" />
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
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9862b]">Our Portfolio</span>
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Our <span className="text-[#C9862b]">Landmark</span>
              <br />
              <span className="text-white/30">Projects</span>
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:justify-end" role="tablist" aria-label="Filter projects">
            {TABS.map((t) => (
              <button
                key={t.value}
                role="tab"
                aria-selected={activeTab === t.value}
                onClick={() => setActiveTab(t.value)}
                className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-xs ${
                  activeTab === t.value
                    ? "bg-[#C9862b] text-white shadow-lg shadow-[#C9862b]/30"
                    : "border border-white/15 text-white/60 hover:border-[#C9862b]/50 hover:text-[#C9862b]"
                }`}
                type="button"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className={`py-20 text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <Building2 size={48} className="mx-auto mb-4 text-white/20" />
            <p className="text-lg text-white/50">No projects in this category yet.</p>
          </div>
        ) : (
          <>
            {/* Featured Project - First one */}
            {filtered[0] && (
              <div
                className={`mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all delay-100 duration-700 sm:mb-8 sm:rounded-3xl ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <div className="grid lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[400px]">
                    <img
                      src={filtered[0].image}
                      alt={`${filtered[0].title} - ${filtered[0].location}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
                      <StatusBadge status={filtered[0].status} />
                    </div>
                    {/* Mobile Title Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 lg:hidden">
                      <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-[#C9862b] sm:mb-1 sm:text-xs">Featured Project</p>
                      <h3 className="text-lg font-bold text-white sm:text-xl">{filtered[0].title}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between p-4 sm:p-6 lg:p-10">
                    <div>
                      <div className="mb-2 hidden lg:block">
                        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#C9862b]">Featured Project</p>
                        <h3 className="text-3xl font-bold text-white">{filtered[0].title}</h3>
                      </div>
                      {filtered[0].location && (
                        <div className="mb-3 flex items-center gap-2 sm:mb-4">
                          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#C9862b]/20 sm:h-7 sm:w-7">
                            <MapPin size={10} className="text-[#C9862b] sm:size-3" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 sm:text-xs">{filtered[0].location}</span>
                        </div>
                      )}
                      <p className="mb-4 text-sm leading-relaxed text-white/70 sm:mb-6 lg:text-base">{filtered[0].description}</p>

                      {/* Tags */}
                      <div className="mb-4 flex flex-wrap gap-1.5 sm:mb-6 sm:gap-2">
                        {["NMRDA Approved", "Bank Finance", "RERA Certified"].map((tag) => (
                          <span key={tag} className="rounded-full border border-[#30534A]/30 bg-[#30534A]/20 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#30534A] sm:px-3 sm:py-1.5 sm:text-[10px]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => openWA(filtered[0].title, filtered[0].location)}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#30534A] to-[#3d6b60] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#30534A]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-auto sm:gap-3 sm:px-8 sm:py-4"
                      type="button"
                    >
                      <Phone size={16} />
                      Enquire Now
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Swiper for remaining projects */}
            {filtered.length > 1 && (
              <div className="lg:hidden">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white/50">More Projects ({filtered.length - 1})</p>
                  <div className="flex gap-2">
                    <button onClick={prevSlide} className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white transition-colors hover:bg-white/10" type="button">
                      <ChevronLeft size={18} />
                    </button>
                    <button onClick={nextSlide} className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white transition-colors hover:bg-white/10" type="button">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl">
                  <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {filtered.slice(1).map((project) => (
                      <div key={project.id} className="w-full shrink-0 px-1">
                        <ProjectCard project={project} onEnquire={openWA} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dots */}
                <div className="mt-4 flex justify-center gap-1.5">
                  {filtered.slice(1).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-1.5 rounded-full transition-all ${i === currentSlide ? "w-6 bg-[#C9862b]" : "w-1.5 bg-white/30"}`}
                      type="button"
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Desktop Grid for remaining projects */}
            {filtered.length > 1 && (
              <div className="hidden grid-cols-2 gap-4 lg:grid xl:grid-cols-4">
                {filtered.slice(1).map((project, index) => (
                  <div
                    key={project.id}
                    className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                    style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                  >
                    <ProjectCard project={project} onEnquire={openWA} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Trust Bar */}
        <div
          className={`mt-12 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all delay-400 duration-700 sm:p-6 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Building landmarks since 2012</p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {["NMRDA Approved", "Up to 90% Finance", "RERA Certified"].map((label) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#C9862b]" />
                  <span className="text-xs font-semibold text-white/60">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, onEnquire }: { project: Project; onEnquire: (title: string, location: string) => void }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} - ${project.location}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute left-3 top-3">
          <StatusBadge status={project.status} />
        </div>
        <span className="absolute bottom-3 right-3 text-3xl font-bold text-white/20">
          {String(project.id).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-2 text-lg font-bold text-[#0d1a16]">{project.title}</h3>
        {project.location && (
          <div className="mb-3 flex items-center gap-1.5">
            <MapPin size={10} className="text-[#C9862b]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#888]">{project.location}</span>
          </div>
        )}
        <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-[#666]">{project.description}</p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          <span className="rounded-full border border-[#C9862b]/20 bg-[#C9862b]/10 px-2 py-0.5 text-[9px] font-bold uppercase text-[#a86a1a]">NMRDA</span>
          <span className="rounded-full border border-[#C9862b]/20 bg-[#C9862b]/10 px-2 py-0.5 text-[9px] font-bold uppercase text-[#a86a1a]">Bank Finance</span>
        </div>

        <button
          onClick={() => onEnquire(project.title, project.location)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#30534A]/15 bg-[#30534A]/5 py-3 text-xs font-bold text-[#30534A] transition-all hover:bg-[#30534A] hover:text-white"
          type="button"
        >
          <Phone size={12} />
          Contact Us
        </button>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#C9862b] to-[#30534A] transition-all duration-500 group-hover:w-full" />
    </article>
  )
}
