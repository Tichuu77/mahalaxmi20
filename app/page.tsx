import dynamic from "next/dynamic"
import { HeroSection } from "../components/hero-section"
import { Navigation } from "../components/navigation"

// Heavy sections lazy-loaded for performance
const AboutSection        = dynamic(() => import("../components/about-section").then(m => ({ default: m.AboutSection })))
const AmenitiesSection    = dynamic(() => import("../components/amenities-section").then(m => ({ default: m.AmenitiesSection })))
const ProjectsSection     = dynamic(() => import("../components/projects-section").then(m => ({ default: m.ProjectsSection })))
const GallerySection      = dynamic(() => import("../components/gallery-section").then(m => ({ default: m.GallerySection })))
const WhyChooseUsSection  = dynamic(() => import("../components/why-choose-us-section").then(m => ({ default: m.WhyChooseUsSection })))
const UserGuideSection    = dynamic(() => import("../components/user-guide-section").then(m => ({ default: m.UserGuideSection })))
const TestimonialsSection = dynamic(() => import("../components/testimonials-section").then(m => ({ default: m.TestimonialsSection })))
const NewsArticles        = dynamic(() => import("../components/news-articals"))
const FAQSection          = dynamic(() => import("../components/faq-section"))
const ContactSection      = dynamic(() => import("../components/contact-section"))
const CallButton          = dynamic(() => import("../components/call-button"))
const WhatsappButton      = dynamic(() => import("../components/whatsapp-button"))
const Footer              = dynamic(() => import("../components/footer").then(m => ({ default: m.Footer })))

export default function Home() {
  return (
    <div className="site-refresh">
      {/* Skip-to-main for keyboard & screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-green focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:text-sm"
      >
        Skip to main content
      </a>

      <Navigation />

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <AmenitiesSection />
        <ProjectsSection />
        <GallerySection />
        <WhyChooseUsSection />
        <UserGuideSection />
        <TestimonialsSection />
        <NewsArticles />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Floating action buttons */}
      <CallButton />
      <WhatsappButton />
    </div>
  )
}