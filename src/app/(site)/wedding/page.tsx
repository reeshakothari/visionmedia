import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServiceDetailGrid from "@/components/ServiceDetailGrid";
import JourneySteps from "@/components/JourneySteps";
import Gallery from "@/components/Gallery";
import ContactSection from "@/components/ContactSection";
import { weddingPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Luxury Wedding Planning & Design Services | Vision Media & Entertainment",
  description:
    "Exquisite wedding planning and design services creating magical, unforgettable celebrations. From intimate ceremonies to grand destination weddings.",
};

export default function WeddingPage() {
  return (
    <>
      <PageHero image={weddingPage.heroImage} title={weddingPage.heroTitle} subtitle={weddingPage.heroSubtitle} />
      <ServiceDetailGrid
        heading={weddingPage.servicesHeading}
        subheading={weddingPage.servicesSubheading}
        services={weddingPage.services}
      />
      <JourneySteps heading={weddingPage.journeyHeading} subheading={weddingPage.journeySubheading} steps={weddingPage.journey} />
      <Gallery heading={weddingPage.galleryHeading} subheading={weddingPage.gallerySubheading} items={weddingPage.gallery} />
      <ContactSection
        heading={weddingPage.contact.heading}
        subheading={weddingPage.contact.subheading}
        phone={weddingPage.contact.phone}
        email={weddingPage.contact.email}
        address={weddingPage.contact.address}
        hours={weddingPage.contact.hours}
        fields={[
          { kind: "text", name: "name", placeholder: "Your Name" },
          { kind: "email", name: "email", placeholder: "Your Email" },
          { kind: "text", name: "partner-name", placeholder: "Partner's Name" },
          { kind: "select", name: "wedding-type", placeholder: "Select Wedding Type", options: weddingPage.contact.weddingTypeOptions },
          { kind: "textarea", name: "message", placeholder: "Tell us about your dream wedding" },
        ]}
      />
    </>
  );
}
