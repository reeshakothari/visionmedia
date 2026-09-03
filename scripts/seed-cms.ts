// One-time seed: copies the existing static content (src/lib/content.ts) into
// Supabase so the CMS starts out identical to the current live site. Safe to
// re-run — it only inserts rows that don't already exist, never overwrites.
//
// Run with: node --experimental-strip-types --env-file=.env.local scripts/seed-cms.ts

import { createClient } from "@supabase/supabase-js";
import * as content from "../src/lib/content.ts";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");

const supabase = createClient(url, key, { auth: { persistSession: false } });

const pages: Record<string, unknown> = {
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
  },
};

async function seedSiteContent() {
  const { data: existing } = await supabase.from("vision_media_site_content").select("page");
  const existingPages = new Set((existing ?? []).map((r) => r.page));
  const toInsert = Object.entries(pages)
    .filter(([page]) => !existingPages.has(page))
    .map(([page, value]) => ({ page, content: value, draft: value, published_at: new Date().toISOString() }));
  if (toInsert.length === 0) {
    console.log("site_content: nothing to seed, all pages already exist");
    return;
  }
  const { error } = await supabase.from("vision_media_site_content").insert(toInsert);
  if (error) throw error;
  console.log(`site_content: seeded ${toInsert.length} page(s): ${toInsert.map((p) => p.page).join(", ")}`);
}

async function seedGallery() {
  const galleries: { page: string; items: { image: string; title: string; text: string }[] }[] = [
    { page: "home", items: content.gallerySection.items },
    { page: "wedding", items: content.weddingPage.gallery },
    { page: "corporate-event", items: content.corporatePage.gallery },
    { page: "wedding-venues", items: content.venuesPage.gallery },
    { page: "social-events", items: content.socialPage.gallery },
  ];
  for (const { page, items } of galleries) {
    const { count } = await supabase
      .from("vision_media_gallery_images")
      .select("id", { count: "exact", head: true })
      .eq("page", page);
    if (count && count > 0) {
      console.log(`gallery_images[${page}]: already has ${count} row(s), skipping`);
      continue;
    }
    const rows = items.map((item, i) => ({
      page,
      src: item.image,
      alt: item.title,
      title: item.title,
      caption: item.text,
      sort_order: i,
    }));
    const { error } = await supabase.from("vision_media_gallery_images").insert(rows);
    if (error) throw error;
    console.log(`gallery_images[${page}]: seeded ${rows.length} row(s)`);
  }
}

async function seedTestimonials() {
  const { count } = await supabase
    .from("vision_media_testimonials")
    .select("id", { count: "exact", head: true });
  if (count && count > 0) {
    console.log(`testimonials: already has ${count} row(s), skipping`);
    return;
  }
  const rows = content.reviewsSection.reviews.map((r, i) => ({
    quote: r.text,
    author: r.author,
    role: r.role,
    sort_order: i,
  }));
  const { error } = await supabase.from("vision_media_testimonials").insert(rows);
  if (error) throw error;
  console.log(`testimonials: seeded ${rows.length} row(s)`);
}

async function seedBlogPosts() {
  const { count } = await supabase
    .from("vision_media_blog_posts")
    .select("id", { count: "exact", head: true });
  if (count && count > 0) {
    console.log(`blog_posts: already has ${count} row(s), skipping`);
    return;
  }
  const rows = content.blogPage.posts.map((p, i) => ({
    title: p.title,
    excerpt: p.text,
    date_label: p.date,
    sort_order: i,
  }));
  const { error } = await supabase.from("vision_media_blog_posts").insert(rows);
  if (error) throw error;
  console.log(`blog_posts: seeded ${rows.length} row(s)`);
}

async function main() {
  await seedSiteContent();
  await seedGallery();
  await seedTestimonials();
  await seedBlogPosts();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
