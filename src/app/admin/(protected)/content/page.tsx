import {
  getDraftWithStatus,
  getAllGalleryImages,
  getTestimonials,
  getBlogPosts,
  getClients,
  type HomeContent,
  type WeddingContent,
  type CorporateContent,
  type VenuesContent,
  type SocialContent,
  type BlogContent,
  type GlobalContent,
} from "@/lib/cms";
import ContentEditor from "./ContentEditor";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const [home, wedding, corporateEvent, weddingVenues, socialEvents, blog, global, galleryImages, testimonials, blogPosts, clients] =
    await Promise.all([
      getDraftWithStatus<HomeContent>("home"),
      getDraftWithStatus<WeddingContent>("wedding"),
      getDraftWithStatus<CorporateContent>("corporate-event"),
      getDraftWithStatus<VenuesContent>("wedding-venues"),
      getDraftWithStatus<SocialContent>("social-events"),
      getDraftWithStatus<BlogContent>("blog"),
      getDraftWithStatus<GlobalContent>("global"),
      getAllGalleryImages(),
      getTestimonials(),
      getBlogPosts(),
      getClients(),
    ]);

  return (
    <ContentEditor
      initialDrafts={{
        home: home.draft,
        wedding: wedding.draft,
        "corporate-event": corporateEvent.draft,
        "wedding-venues": weddingVenues.draft,
        "social-events": socialEvents.draft,
        blog: blog.draft,
        global: global.draft,
      }}
      initialUnpublished={{
        home: home.hasUnpublishedChanges,
        wedding: wedding.hasUnpublishedChanges,
        "corporate-event": corporateEvent.hasUnpublishedChanges,
        "wedding-venues": weddingVenues.hasUnpublishedChanges,
        "social-events": socialEvents.hasUnpublishedChanges,
        blog: blog.hasUnpublishedChanges,
        global: global.hasUnpublishedChanges,
      }}
      initialGalleryImages={galleryImages}
      initialTestimonials={testimonials}
      initialBlogPosts={blogPosts}
      initialClients={clients}
    />
  );
}
