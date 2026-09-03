import {
  getDraft,
  getAllGalleryImages,
  getTestimonials,
  getBlogPosts,
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
  const [home, wedding, corporateEvent, weddingVenues, socialEvents, blog, global, galleryImages, testimonials, blogPosts] =
    await Promise.all([
      getDraft<HomeContent>("home"),
      getDraft<WeddingContent>("wedding"),
      getDraft<CorporateContent>("corporate-event"),
      getDraft<VenuesContent>("wedding-venues"),
      getDraft<SocialContent>("social-events"),
      getDraft<BlogContent>("blog"),
      getDraft<GlobalContent>("global"),
      getAllGalleryImages(),
      getTestimonials(),
      getBlogPosts(),
    ]);

  return (
    <ContentEditor
      initialDrafts={{
        home,
        wedding,
        "corporate-event": corporateEvent,
        "wedding-venues": weddingVenues,
        "social-events": socialEvents,
        blog,
        global,
      }}
      initialGalleryImages={galleryImages}
      initialTestimonials={testimonials}
      initialBlogPosts={blogPosts}
    />
  );
}
