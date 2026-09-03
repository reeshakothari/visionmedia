import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServiceDetailGrid from "@/components/ServiceDetailGrid";
import WhySection from "@/components/WhySection";
import Gallery from "@/components/Gallery";
import ContactSection from "@/components/ContactSection";
import { getContent, getGalleryImages, type CorporateContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Corporate Event Management Services | Vision Media & Entertainment",
  description:
    "Professional corporate event management services including conferences, product launches, award ceremonies, and business celebrations. Excellence in every detail.",
};

export default async function CorporateEventPage() {
  const [corporatePage, galleryItems] = await Promise.all([
    getContent<CorporateContent>("corporate-event"),
    getGalleryImages("corporate-event", { onlyPublished: true }),
  ]);

  return (
    <>
      <PageHero image={corporatePage.heroImage} title={corporatePage.heroTitle} subtitle={corporatePage.heroSubtitle} />
      <ServiceDetailGrid
        heading={corporatePage.servicesHeading}
        subheading={corporatePage.servicesSubheading}
        services={corporatePage.services}
      />
      <WhySection
        heading={corporatePage.whyHeading}
        subheading={corporatePage.whySubheading}
        features={corporatePage.whyFeatures}
        stats={corporatePage.stats}
      />
      <Gallery heading={corporatePage.galleryHeading} subheading={corporatePage.gallerySubheading} items={galleryItems} />
      <ContactSection
        contentPath="contact"
        formType="corporate-event"
        heading={corporatePage.contact.heading}
        subheading={corporatePage.contact.subheading}
        phone={corporatePage.contact.phone}
        email={corporatePage.contact.email}
        address={corporatePage.contact.address}
        hours={corporatePage.contact.hours}
        fields={[
          { kind: "text", name: "name", placeholder: "Your Name" },
          { kind: "email", name: "email", placeholder: "Your Email" },
          { kind: "text", name: "company", placeholder: "Company Name" },
          { kind: "select", name: "event-type", placeholder: "Select Event Type", options: corporatePage.contact.eventTypeOptions },
          { kind: "textarea", name: "message", placeholder: "Tell us about your event requirements" },
        ]}
      />
    </>
  );
}
