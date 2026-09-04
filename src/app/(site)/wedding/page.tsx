import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServiceDetailGrid from "@/components/ServiceDetailGrid";
import JourneySteps from "@/components/JourneySteps";
import Gallery from "@/components/Gallery";
import ContactSection from "@/components/ContactSection";
import { getContent, getGalleryImages, type WeddingContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Luxury Wedding Planning & Design Services | Vision Media & Entertainment",
  description:
    "Exquisite wedding planning and design services creating magical, unforgettable celebrations. From intimate ceremonies to grand destination weddings.",
};

export default async function WeddingPage() {
  const [weddingPage, galleryItems] = await Promise.all([
    getContent<WeddingContent>("wedding"),
    getGalleryImages("wedding", { onlyPublished: true }),
  ]);

  return (
    <>
      <PageHero image={weddingPage.heroImage} title={weddingPage.heroTitle} subtitle={weddingPage.heroSubtitle} />
      <ServiceDetailGrid
        heading={weddingPage.servicesHeading}
        subheading={weddingPage.servicesSubheading}
        services={weddingPage.services}
      />
      <JourneySteps heading={weddingPage.journeyHeading} subheading={weddingPage.journeySubheading} steps={weddingPage.journey} />
      <Gallery heading={weddingPage.galleryHeading} subheading={weddingPage.gallerySubheading} items={galleryItems} />
      <ContactSection
        basePath="contact"
        formType="wedding"
        heading={weddingPage.contact.heading}
        subheading={weddingPage.contact.subheading}
        phone={weddingPage.contact.phone}
        email={weddingPage.contact.email}
        address={weddingPage.contact.address}
        hours={weddingPage.contact.hours}
        labels={weddingPage.contact.labels}
        submitLabel={weddingPage.contact.submitLabel}
        successMessage={weddingPage.contact.successMessage}
        errorMessage={weddingPage.contact.errorMessage}
        fields={weddingPage.contact.formFields}
      />
    </>
  );
}
