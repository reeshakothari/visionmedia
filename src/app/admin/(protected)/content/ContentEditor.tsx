"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import AboutSection from "@/components/AboutSection";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import ContactSection from "@/components/ContactSection";
import PageHero from "@/components/PageHero";
import ServiceDetailGrid from "@/components/ServiceDetailGrid";
import JourneySteps from "@/components/JourneySteps";
import WhySection from "@/components/WhySection";
import { EditableProvider, useEditable } from "@/components/editable/context";
import { Field } from "@/components/editable/Field";
import { saveDraftAction, publishPageAction, discardDraftAction } from "@/lib/actions";
import GlobalSettingsTab from "./GlobalSettingsTab";
import GalleryManager from "./GalleryManager";
import TestimonialsManager from "./TestimonialsManager";
import BlogPostsManager from "./BlogPostsManager";
import type {
  PageKey,
  HomeContent,
  WeddingContent,
  CorporateContent,
  VenuesContent,
  SocialContent,
  BlogContent,
  GlobalContent,
  GalleryImage,
  Testimonial,
  BlogPost,
} from "@/lib/cms";

const PAGE_TABS: { key: PageKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "wedding", label: "Wedding" },
  { key: "corporate-event", label: "Corporate Events" },
  { key: "wedding-venues", label: "Wedding Venues" },
  { key: "social-events", label: "Social Events" },
  { key: "blog", label: "Blog" },
  { key: "global", label: "Header & Footer" },
];

const LIST_TABS = [
  { key: "gallery", label: "Photo Gallery" },
  { key: "reviews", label: "Reviews" },
  { key: "blogposts", label: "Blog Posts" },
] as const;

type ListTabKey = (typeof LIST_TABS)[number]["key"];
type TabKey = PageKey | ListTabKey;

type Drafts = {
  home: HomeContent;
  wedding: WeddingContent;
  "corporate-event": CorporateContent;
  "wedding-venues": VenuesContent;
  "social-events": SocialContent;
  blog: BlogContent;
  global: GlobalContent;
};

export default function ContentEditor({
  initialDrafts,
  initialGalleryImages,
  initialTestimonials,
  initialBlogPosts,
}: {
  initialDrafts: Drafts;
  initialGalleryImages: GalleryImage[];
  initialTestimonials: Testimonial[];
  initialBlogPosts: BlogPost[];
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  return (
    <div>
      <div className="sticky top-0 z-30 flex gap-1 overflow-x-auto border-b border-navy/10 bg-white px-3 py-2 shadow-sm">
        {PAGE_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === tab.key ? "bg-navy text-white" : "text-navy/60 hover:bg-navy/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
        <span className="mx-1 my-auto h-4 w-px shrink-0 bg-navy/10" />
        {LIST_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === tab.key ? "bg-gold text-navy" : "text-navy/60 hover:bg-navy/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {PAGE_TABS.map((tab) => (
        <div key={tab.key} hidden={activeTab !== tab.key}>
          <EditableProvider
            page={tab.key}
            initialDraft={initialDrafts[tab.key]}
            saveDraftAction={saveDraftAction}
            publishAction={publishPageAction}
            discardAction={discardDraftAction}
          >
            <Toolbar pageLabel={tab.label} />
            <PagePreview
              pageKey={tab.key}
              content={initialDrafts[tab.key]}
              galleryImages={initialGalleryImages.filter((g) => g.page === tab.key)}
              testimonials={initialTestimonials}
              blogPosts={initialBlogPosts}
            />
          </EditableProvider>
        </div>
      ))}

      {activeTab === "gallery" && <GalleryManager initialImages={initialGalleryImages} />}
      {activeTab === "reviews" && <TestimonialsManager initialTestimonials={initialTestimonials} />}
      {activeTab === "blogposts" && <BlogPostsManager initialPosts={initialBlogPosts} />}
    </div>
  );
}

function Toolbar({ pageLabel }: { pageLabel: string }) {
  const ctx = useEditable()!;
  const label =
    ctx.status === "saving"
      ? "Saving…"
      : ctx.status === "publishing"
      ? "Publishing…"
      : ctx.status === "published"
      ? "Published ✓"
      : ctx.status === "dirty"
      ? "Unsaved changes"
      : ctx.status === "saved"
      ? "Draft saved"
      : ctx.status === "error"
      ? ctx.errorMessage ?? "Something went wrong"
      : "No changes";

  return (
    <div className="sticky top-[41px] z-20 flex flex-wrap items-center justify-between gap-3 border-b border-gold/30 bg-cream-alt/95 px-4 py-2.5 backdrop-blur">
      <p className="text-xs text-navy/70">
        Editing <span className="font-semibold text-navy">{pageLabel}</span> — click any text or image below to change it.
      </p>
      <div className="flex items-center gap-3">
        <span className={`text-xs font-medium ${ctx.status === "error" ? "text-red-600" : "text-navy/50"}`}>{label}</span>
        <button
          onClick={() => ctx.discard()}
          className="rounded-full border border-navy/20 px-4 py-1.5 text-xs font-semibold text-navy transition-colors hover:bg-navy/5"
        >
          Discard changes
        </button>
        <button
          onClick={() => ctx.publish()}
          className="btn-gold tap-target rounded-full px-5 py-1.5 text-xs font-semibold uppercase"
        >
          Publish
        </button>
      </div>
    </div>
  );
}

function PagePreview({
  pageKey,
  content,
  galleryImages,
  testimonials,
  blogPosts,
}: {
  pageKey: PageKey;
  content: Drafts[PageKey];
  galleryImages: GalleryImage[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
}) {
  if (pageKey === "home") {
    const c = content as HomeContent;
    return (
      <>
        <Hero hero={c.hero} />
        <ServiceCards servicesSection={c.servicesSection} serviceCards={c.serviceCards} />
        <AboutSection aboutSection={c.aboutSection} />
        <Gallery
          id="gallery"
          heading={c.gallerySection.heading}
          subheading={c.gallerySection.subheading}
          headingPath="gallerySection.heading"
          subheadingPath="gallerySection.subheading"
          items={galleryImages}
          cta={{ text: c.gallerySection.ctaText, label: c.gallerySection.ctaLabel, href: c.gallerySection.ctaHref }}
        />
        <Testimonials reviewsSection={c.reviewsSection} reviews={testimonials.filter((t) => t.is_published)} />
        <BlogPreview blogPreviewSection={c.blogPreviewSection} posts={blogPosts.filter((p) => p.is_published).slice(0, 3)} />
        <ContactSection
          basePath="homeContact"
          formType="home"
          heading={c.homeContact.heading}
          subheading={c.homeContact.subheading}
          infoHeading={c.homeContact.infoHeading}
          phone={c.homeContact.phone}
          email={c.homeContact.email}
          address={c.homeContact.address}
          labels={c.homeContact.labels}
          submitLabel={c.homeContact.submitLabel}
          successMessage={c.homeContact.successMessage}
          errorMessage={c.homeContact.errorMessage}
          fields={c.homeContact.formFields}
        />
      </>
    );
  }

  if (pageKey === "blog") {
    const c = content as BlogContent;
    const posts = blogPosts.filter((p) => p.is_published);
    return (
      <>
        <section className="bg-noise bg-navy px-4 pb-14 pt-12 text-center text-white sm:px-6">
          <div className="divider-gold-center mb-5" />
          <h1 className="font-display text-4xl sm:text-5xl">
            <Field path="heading" value={c.heading} />
          </h1>
          <p className="mt-4 text-sm text-white/65">
            <Field path="subheading" value={c.subheading} />
          </p>
        </section>
        <section className="bg-white px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl text-navy">
              <Field path="listHeading" value={c.listHeading} />
            </h2>
            <p className="mt-2 text-sm text-muted-light">
              <Field path="listSubheading" value={c.listSubheading} />
            </p>
            <div className="mt-8 space-y-4">
              {posts.map((post) => (
                <article key={post.id} className="hairline rounded-2xl bg-cream-alt p-6">
                  <h3 className="font-display text-lg text-navy">{post.title}</h3>
                  <p className="badge badge-gold mt-2">{post.date_label}</p>
                  <p className="mt-3 text-sm text-muted">{post.excerpt}</p>
                  <span className="mt-3 inline-block font-heading text-xs font-semibold tracking-wide text-gold-dark uppercase">
                    {c.readMoreLabel}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>
        <ContactSection
          basePath=""
          formType="blog"
          headingPath="ctaHeading"
          subheadingPath="ctaSubheading"
          heading={c.ctaHeading}
          subheading={c.ctaSubheading}
          phone={c.phone}
          email={c.email}
          labels={c.labels}
          submitLabel={c.submitLabel}
          successMessage={c.successMessage}
          errorMessage={c.errorMessage}
          fields={c.formFields}
        />
      </>
    );
  }

  if (pageKey === "global") {
    return <GlobalSettingsTab global={content as GlobalContent} />;
  }

  // Wedding / Corporate Events / Wedding Venues / Social Events all share the
  // same section layout, differing only in Journey vs Why + the contact form's
  // extra field and select options.
  const c = content as WeddingContent | CorporateContent | VenuesContent | SocialContent;
  const hasJourney = "journey" in c;

  return (
    <>
      <PageHero image={c.heroImage} title={c.heroTitle} subtitle={c.heroSubtitle} />
      <ServiceDetailGrid heading={c.servicesHeading} subheading={c.servicesSubheading} services={c.services} />
      {hasJourney ? (
        <JourneySteps heading={c.journeyHeading} subheading={c.journeySubheading} steps={c.journey} />
      ) : (
        <WhySection heading={c.whyHeading} subheading={c.whySubheading} features={c.whyFeatures} stats={c.stats} />
      )}
      <Gallery heading={c.galleryHeading} subheading={c.gallerySubheading} items={galleryImages} />
      <ContactSection
        basePath="contact"
        formType={pageKey}
        heading={c.contact.heading}
        subheading={c.contact.subheading}
        phone={c.contact.phone}
        email={c.contact.email}
        address={c.contact.address}
        hours={c.contact.hours}
        labels={c.contact.labels}
        submitLabel={c.contact.submitLabel}
        successMessage={c.contact.successMessage}
        errorMessage={c.contact.errorMessage}
        fields={c.contact.formFields}
      />
    </>
  );
}
