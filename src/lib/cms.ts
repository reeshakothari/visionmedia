import "server-only";
import { supabase } from "./supabase";
import * as content from "./content";
import { PAGE_LABELS, ROUTE_FOR_PAGE, type PageKey } from "./pages";

export { PAGE_LABELS, ROUTE_FOR_PAGE, type PageKey };

// The static content.ts exports double as both the fallback (if Supabase is
// ever unreachable or a page row hasn't been created yet) and the shape the
// database rows are seeded with, so every page's content object always has
// the same keys whether it came from content.ts or Supabase.
export const pageDefaults: Record<PageKey, Record<string, unknown>> = {
  home: {
    hero: content.hero,
    servicesSection: content.servicesSection,
    serviceCards: content.serviceCards,
    aboutSection: content.aboutSection,
    gallerySection: content.gallerySection,
    reviewsSection: content.reviewsSection,
    blogPreviewSection: content.blogPreviewSection,
    homeContact: content.homeContact,
    footerContent: content.footerContent,
  },
  wedding: content.weddingPage,
  "corporate-event": content.corporatePage,
  "wedding-venues": content.venuesPage,
  "social-events": content.socialPage,
  blog: content.blogPage,
  global: {
    siteInfo: content.siteInfo,
    navLinks: content.navLinks,
    socialLinks: content.socialLinks,
    footerLinksHome: content.footerLinksHome,
    footerLinksStandard: content.footerLinksStandard,
    footerLinksBlog: content.footerLinksBlog,
    copyright: content.copyright,
    headerFooter: content.headerFooter,
  },
};

export type HomeContent = {
  hero: typeof content.hero;
  servicesSection: typeof content.servicesSection;
  serviceCards: typeof content.serviceCards;
  aboutSection: typeof content.aboutSection;
  gallerySection: typeof content.gallerySection;
  reviewsSection: typeof content.reviewsSection;
  blogPreviewSection: typeof content.blogPreviewSection;
  homeContact: typeof content.homeContact;
  footerContent: typeof content.footerContent;
};
export type WeddingContent = typeof content.weddingPage;
export type CorporateContent = typeof content.corporatePage;
export type VenuesContent = typeof content.venuesPage;
export type SocialContent = typeof content.socialPage;
export type BlogContent = typeof content.blogPage;
export type GlobalContent = {
  siteInfo: typeof content.siteInfo;
  navLinks: typeof content.navLinks;
  socialLinks: typeof content.socialLinks;
  footerLinksHome: typeof content.footerLinksHome;
  footerLinksStandard: typeof content.footerLinksStandard;
  footerLinksBlog: typeof content.footerLinksBlog;
  copyright: typeof content.copyright;
  headerFooter: typeof content.headerFooter;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Deep merge so that fields added to content.ts *after* a page row was saved
// still show up, instead of being swallowed by the stored object. Saved values
// always win; defaults only fill gaps. Arrays take their length from the saved
// value (so removed/reordered items stick) but merge element-wise, which lets
// new fields inside existing list items fall back too.
function deepMerge(base: unknown, override: unknown): unknown {
  if (override === undefined) return base;
  if (Array.isArray(base) && Array.isArray(override)) {
    return override.map((item, i) => (i < base.length ? deepMerge(base[i], item) : item));
  }
  if (isPlainObject(base) && isPlainObject(override)) {
    const result: Record<string, unknown> = { ...base };
    for (const [key, value] of Object.entries(override)) {
      result[key] = key in base ? deepMerge(base[key], value) : value;
    }
    return result;
  }
  return override;
}

function mergeWithDefaults(page: PageKey, dbValue: Record<string, unknown> | null | undefined) {
  const base = pageDefaults[page];
  if (!dbValue || Object.keys(dbValue).length === 0) return base;
  return deepMerge(base, dbValue) as Record<string, unknown>;
}

async function fetchRow(page: PageKey) {
  const { data, error } = await supabase
    .from("vision_media_site_content")
    .select("content, draft")
    .eq("page", page)
    .maybeSingle();
  if (error) throw error;
  return data as { content: Record<string, unknown>; draft: Record<string, unknown> } | null;
}

export async function getContent<T = Record<string, unknown>>(page: PageKey): Promise<T> {
  const row = await fetchRow(page);
  return mergeWithDefaults(page, row?.content) as T;
}

export async function getDraft<T = Record<string, unknown>>(page: PageKey): Promise<T> {
  const row = await fetchRow(page);
  return mergeWithDefaults(page, row?.draft) as T;
}

export async function saveDraft(page: PageKey, draft: unknown) {
  const { error } = await supabase
    .from("vision_media_site_content")
    .upsert({ page, draft, updated_at: new Date().toISOString() }, { onConflict: "page" });
  if (error) throw error;
}

export async function publishPage(page: PageKey) {
  const row = await fetchRow(page);
  const draft = mergeWithDefaults(page, row?.draft);
  const { error } = await supabase.from("vision_media_site_content").upsert(
    {
      page,
      content: draft,
      draft,
      updated_at: new Date().toISOString(),
      published_at: new Date().toISOString(),
    },
    { onConflict: "page" }
  );
  if (error) throw error;
}

export async function discardDraft(page: PageKey) {
  const row = await fetchRow(page);
  const published = mergeWithDefaults(page, row?.content);
  const { error } = await supabase
    .from("vision_media_site_content")
    .upsert({ page, draft: published, updated_at: new Date().toISOString() }, { onConflict: "page" });
  if (error) throw error;
  return published;
}

// ---------------------------------------------------------------------------
// Gallery images — addable/removable lists, one per page, changes go live
// immediately (no draft/publish staging, unlike the page content above).
// ---------------------------------------------------------------------------

export type GalleryImage = {
  id: string;
  page: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
};

export async function getGalleryImages(page: string, opts: { onlyPublished?: boolean } = {}) {
  let q = supabase.from("vision_media_gallery_images").select("*").eq("page", page).order("sort_order", { ascending: true });
  if (opts.onlyPublished) q = q.eq("is_published", true);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as GalleryImage[];
}

export async function getAllGalleryImages() {
  const { data, error } = await supabase
    .from("vision_media_gallery_images")
    .select("*")
    .order("page", { ascending: true })
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as GalleryImage[];
}

export async function addGalleryImage(input: { page: string; src: string; alt: string; title: string; caption: string }) {
  const { data: existing } = await supabase
    .from("vision_media_gallery_images")
    .select("sort_order")
    .eq("page", input.page)
    .order("sort_order", { ascending: false })
    .limit(1);
  const nextOrder = ((existing?.[0] as { sort_order?: number } | undefined)?.sort_order ?? -1) + 1;
  const { error } = await supabase.from("vision_media_gallery_images").insert({ ...input, sort_order: nextOrder });
  if (error) throw error;
}

export async function updateGalleryImage(id: string, patch: Partial<GalleryImage>) {
  const { error } = await supabase.from("vision_media_gallery_images").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteGalleryImage(id: string) {
  const { error } = await supabase.from("vision_media_gallery_images").delete().eq("id", id);
  if (error) throw error;
}

export async function reorderGalleryImages(orderedIds: string[]) {
  await Promise.all(
    orderedIds.map((id, i) => supabase.from("vision_media_gallery_images").update({ sort_order: i }).eq("id", id))
  );
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
};

export async function getTestimonials(opts: { onlyPublished?: boolean } = {}) {
  let q = supabase.from("vision_media_testimonials").select("*").order("sort_order", { ascending: true });
  if (opts.onlyPublished) q = q.eq("is_published", true);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Testimonial[];
}

export async function addTestimonial(input: { quote: string; author: string; role: string }) {
  const { data: existing } = await supabase
    .from("vision_media_testimonials")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  const nextOrder = ((existing?.[0] as { sort_order?: number } | undefined)?.sort_order ?? -1) + 1;
  const { error } = await supabase.from("vision_media_testimonials").insert({ ...input, sort_order: nextOrder });
  if (error) throw error;
}

export async function updateTestimonial(id: string, patch: Partial<Testimonial>) {
  const { error } = await supabase.from("vision_media_testimonials").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteTestimonial(id: string) {
  const { error } = await supabase.from("vision_media_testimonials").delete().eq("id", id);
  if (error) throw error;
}

export async function reorderTestimonials(orderedIds: string[]) {
  await Promise.all(
    orderedIds.map((id, i) => supabase.from("vision_media_testimonials").update({ sort_order: i }).eq("id", id))
  );
}

// ---------------------------------------------------------------------------
// Blog posts
// ---------------------------------------------------------------------------

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date_label: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
};

export async function getBlogPosts(opts: { onlyPublished?: boolean; limit?: number } = {}) {
  let q = supabase.from("vision_media_blog_posts").select("*").order("sort_order", { ascending: true });
  if (opts.onlyPublished) q = q.eq("is_published", true);
  if (opts.limit) q = q.limit(opts.limit);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as BlogPost[];
}

export async function addBlogPost(input: { title: string; excerpt: string; date_label: string }) {
  const { data: existing } = await supabase
    .from("vision_media_blog_posts")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  const nextOrder = ((existing?.[0] as { sort_order?: number } | undefined)?.sort_order ?? -1) + 1;
  const { error } = await supabase.from("vision_media_blog_posts").insert({ ...input, sort_order: nextOrder });
  if (error) throw error;
}

export async function updateBlogPost(id: string, patch: Partial<BlogPost>) {
  const { error } = await supabase.from("vision_media_blog_posts").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteBlogPost(id: string) {
  const { error } = await supabase.from("vision_media_blog_posts").delete().eq("id", id);
  if (error) throw error;
}

export async function reorderBlogPosts(orderedIds: string[]) {
  await Promise.all(
    orderedIds.map((id, i) => supabase.from("vision_media_blog_posts").update({ sort_order: i }).eq("id", id))
  );
}

// ---------------------------------------------------------------------------
// Enquiries / form submissions
// ---------------------------------------------------------------------------

export type Submission = {
  id: number;
  created_at: string;
  form_type: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string | null;
  event_type: string | null;
  data: Record<string, unknown>;
  status: "new" | "contacted" | "closed";
};

export async function getSubmissions() {
  const { data, error } = await supabase
    .from("vision_media_form_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw error;
  return (data ?? []) as Submission[];
}

export async function updateSubmissionStatus(id: number, status: Submission["status"]) {
  const { error } = await supabase.from("vision_media_form_submissions").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function createSubmission(input: {
  form_type: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  subject?: string | null;
  message?: string | null;
  event_type?: string | null;
  data: Record<string, unknown>;
}) {
  const { error } = await supabase.from("vision_media_form_submissions").insert(input);
  if (error) throw error;
}
