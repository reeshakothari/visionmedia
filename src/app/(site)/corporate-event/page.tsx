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
        basePath="contact"
        formType="corporate-event"
        heading={corporatePage.contact.heading}
        subheading={corporatePage.contact.subheading}
        phone={corporatePage.contact.phone}
        email={corporatePage.contact.email}
        address={corporatePage.contact.address}
        hours={corporatePage.contact.hours}
        labels={corporatePage.contact.labels}
        submitLabel={corporatePage.contact.submitLabel}
        successMessage={corporatePage.contact.successMessage}
        errorMessage={corporatePage.contact.errorMessage}
        fields={corporatePage.contact.formFields}
      />
    </>
  );
}
