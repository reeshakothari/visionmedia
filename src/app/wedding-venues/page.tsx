import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServiceDetailGrid from "@/components/ServiceDetailGrid";
import WhySection from "@/components/WhySection";
import Gallery from "@/components/Gallery";
import ContactSection from "@/components/ContactSection";
import { venuesPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Wedding Venues & Exclusive Locations | Vision Media & Entertainment",
  description:
    "Discover exclusive wedding venues and premium locations for your special day. From garden venues to historic mansions, we provide the perfect setting for your celebration.",
};

export default function WeddingVenuesPage() {
  return (
    <>
      <PageHero image={venuesPage.heroImage} title={venuesPage.heroTitle} subtitle={venuesPage.heroSubtitle} />
      <ServiceDetailGrid
        heading={venuesPage.servicesHeading}
        subheading={venuesPage.servicesSubheading}
        services={venuesPage.services}
      />
      <WhySection
        heading={venuesPage.whyHeading}
        subheading={venuesPage.whySubheading}
        features={venuesPage.whyFeatures}
        stats={venuesPage.stats}
      />
      <Gallery heading={venuesPage.galleryHeading} subheading={venuesPage.gallerySubheading} items={venuesPage.gallery} />
      <ContactSection
        heading={venuesPage.contact.heading}
        subheading={venuesPage.contact.subheading}
        phone={venuesPage.contact.phone}
        email={venuesPage.contact.email}
        address={venuesPage.contact.address}
        hours={venuesPage.contact.hours}
        fields={[
          { kind: "text", name: "name", placeholder: "Your Name" },
          { kind: "email", name: "email", placeholder: "Your Email" },
          { kind: "text", name: "partner-name", placeholder: "Partner's Name" },
          { kind: "select", name: "venue-type", placeholder: "Select Venue Type", options: venuesPage.contact.venueTypeOptions },
          { kind: "textarea", name: "message", placeholder: "Tell us about your venue requirements" },
        ]}
      />
    </>
  );
}
