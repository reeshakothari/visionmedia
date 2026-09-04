import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServiceDetailGrid from "@/components/ServiceDetailGrid";
import WhySection from "@/components/WhySection";
import Gallery from "@/components/Gallery";
import ContactSection from "@/components/ContactSection";
import { getContent, getGalleryImages, type VenuesContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Wedding Venues & Exclusive Locations | Vision Media & Entertainment",
  description:
    "Discover exclusive wedding venues and premium locations for your special day. From garden venues to historic mansions, we provide the perfect setting for your celebration.",
};

export default async function WeddingVenuesPage() {
  const [venuesPage, galleryItems] = await Promise.all([
    getContent<VenuesContent>("wedding-venues"),
    getGalleryImages("wedding-venues", { onlyPublished: true }),
  ]);

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
      <Gallery heading={venuesPage.galleryHeading} subheading={venuesPage.gallerySubheading} items={galleryItems} />
      <ContactSection
        basePath="contact"
        formType="wedding-venues"
        heading={venuesPage.contact.heading}
        subheading={venuesPage.contact.subheading}
        phone={venuesPage.contact.phone}
        email={venuesPage.contact.email}
        address={venuesPage.contact.address}
        hours={venuesPage.contact.hours}
        labels={venuesPage.contact.labels}
        submitLabel={venuesPage.contact.submitLabel}
        successMessage={venuesPage.contact.successMessage}
        errorMessage={venuesPage.contact.errorMessage}
        fields={venuesPage.contact.formFields}
      />
    </>
  );
}
