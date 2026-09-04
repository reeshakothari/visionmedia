import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServiceDetailGrid from "@/components/ServiceDetailGrid";
import JourneySteps from "@/components/JourneySteps";
import Gallery from "@/components/Gallery";
import ContactSection from "@/components/ContactSection";
import { getContent, getGalleryImages, type SocialContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Social Events & Celebrations | Vision Media & Entertainment",
  description:
    "Create unforgettable social gatherings and celebrations with our comprehensive event planning services. From birthdays to anniversaries, we make every occasion special.",
};

export default async function SocialEventsPage() {
  const [socialPage, galleryItems] = await Promise.all([
    getContent<SocialContent>("social-events"),
    getGalleryImages("social-events", { onlyPublished: true }),
  ]);

  return (
    <>
      <PageHero image={socialPage.heroImage} title={socialPage.heroTitle} subtitle={socialPage.heroSubtitle} />
      <ServiceDetailGrid
        heading={socialPage.servicesHeading}
        subheading={socialPage.servicesSubheading}
        services={socialPage.services}
      />
      <JourneySteps heading={socialPage.journeyHeading} subheading={socialPage.journeySubheading} steps={socialPage.journey} />
      <Gallery heading={socialPage.galleryHeading} subheading={socialPage.gallerySubheading} items={galleryItems} />
      <ContactSection
        basePath="contact"
        formType="social-events"
        heading={socialPage.contact.heading}
        subheading={socialPage.contact.subheading}
        phone={socialPage.contact.phone}
        email={socialPage.contact.email}
        address={socialPage.contact.address}
        hours={socialPage.contact.hours}
        labels={socialPage.contact.labels}
        submitLabel={socialPage.contact.submitLabel}
        successMessage={socialPage.contact.successMessage}
        errorMessage={socialPage.contact.errorMessage}
        fields={socialPage.contact.formFields}
      />
    </>
  );
}
