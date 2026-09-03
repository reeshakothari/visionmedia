import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import AboutSection from "@/components/AboutSection";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import ContactSection from "@/components/ContactSection";
import { gallerySection, homeContact } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <AboutSection />
      <Gallery
        id="gallery"
        heading={gallerySection.heading}
        subheading={gallerySection.subheading}
        items={gallerySection.items}
        cta={{ text: gallerySection.ctaText, label: gallerySection.ctaLabel, href: "#contact" }}
      />
      <Testimonials />
      <BlogPreview />
      <ContactSection
        heading={homeContact.heading}
        subheading={homeContact.subheading}
        infoHeading={homeContact.infoHeading}
        phone={homeContact.phone}
        email={homeContact.email}
        address={homeContact.address}
        fields={[
          { kind: "text", name: "name", placeholder: "Your Name" },
          { kind: "email", name: "email", placeholder: "Your Email" },
          { kind: "text", name: "subject", placeholder: "Subject" },
          { kind: "textarea", name: "message", placeholder: "Your Message" },
        ]}
      />
    </>
  );
}
