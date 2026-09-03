import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import AboutSection from "@/components/AboutSection";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import ContactSection from "@/components/ContactSection";
import { getContent, getGalleryImages, getTestimonials, getBlogPosts, type HomeContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [content, galleryItems, reviews, posts] = await Promise.all([
    getContent<HomeContent>("home"),
    getGalleryImages("home", { onlyPublished: true }),
    getTestimonials({ onlyPublished: true }),
    getBlogPosts({ onlyPublished: true, limit: 3 }),
  ]);
  const { hero, servicesSection, serviceCards, aboutSection, gallerySection, reviewsSection, blogPreviewSection, homeContact } = content;

  return (
    <>
      <Hero hero={hero} />
      <ServiceCards servicesSection={servicesSection} serviceCards={serviceCards} />
      <AboutSection aboutSection={aboutSection} />
      <Gallery
        id="gallery"
        heading={gallerySection.heading}
        subheading={gallerySection.subheading}
        headingPath="gallerySection.heading"
        subheadingPath="gallerySection.subheading"
        items={galleryItems}
        cta={{ text: gallerySection.ctaText, label: gallerySection.ctaLabel, href: "#contact" }}
      />
      <Testimonials reviewsSection={reviewsSection} reviews={reviews} />
      <BlogPreview blogPreviewSection={blogPreviewSection} posts={posts} />
      <ContactSection
        contentPath="homeContact"
        formType="home"
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
