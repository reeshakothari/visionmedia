"use server";

import { revalidatePath } from "next/cache";
import * as cms from "./cms";
import { supabase, MEDIA_BUCKET } from "./supabase";

function revalidateForPage(page: string) {
  revalidatePath(cms.ROUTE_FOR_PAGE[page as cms.PageKey] ?? "/");
  revalidatePath("/admin/content");
}

// ---------------------------------------------------------------------------
// Page content — draft / publish / discard
// ---------------------------------------------------------------------------

export async function saveDraftAction(page: string, draft: unknown) {
  await cms.saveDraft(page as cms.PageKey, draft);
}

export async function publishPageAction(page: string) {
  await cms.publishPage(page as cms.PageKey);
  revalidateForPage(page);
}

export async function discardDraftAction(page: string) {
  return cms.discardDraft(page as cms.PageKey);
}

// ---------------------------------------------------------------------------
// Image upload (Server Actions can receive File objects inside FormData)
// ---------------------------------------------------------------------------

export async function uploadImageAction(formData: FormData): Promise<{ url: string } | { error: string }> {
  const file = formData.get("file");
  if (!(file instanceof File)) return { error: "No file provided" };
  if (!file.type.startsWith("image/")) return { error: "Only image files are supported" };

  const ext = file.name.split(".").pop() || "jpg";
  const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) return { error: error.message };

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

export async function addGalleryImageAction(
  page: string,
  input: { src: string; alt: string; title: string; caption: string }
) {
  await cms.addGalleryImage({ page, ...input });
  revalidateForPage(page);
}

export async function updateGalleryImageAction(id: string, page: string, patch: Partial<cms.GalleryImage>) {
  await cms.updateGalleryImage(id, patch);
  revalidateForPage(page);
}

export async function deleteGalleryImageAction(id: string, page: string) {
  await cms.deleteGalleryImage(id);
  revalidateForPage(page);
}

export async function reorderGalleryImagesAction(page: string, orderedIds: string[]) {
  await cms.reorderGalleryImages(orderedIds);
  revalidateForPage(page);
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export async function addTestimonialAction(input: { quote: string; author: string; role: string }) {
  await cms.addTestimonial(input);
  revalidateForPage("home");
}

export async function updateTestimonialAction(id: string, patch: Partial<cms.Testimonial>) {
  await cms.updateTestimonial(id, patch);
  revalidateForPage("home");
}

export async function deleteTestimonialAction(id: string) {
  await cms.deleteTestimonial(id);
  revalidateForPage("home");
}

export async function reorderTestimonialsAction(orderedIds: string[]) {
  await cms.reorderTestimonials(orderedIds);
  revalidateForPage("home");
}

// ---------------------------------------------------------------------------
// Blog posts
// ---------------------------------------------------------------------------

export async function addBlogPostAction(input: { title: string; excerpt: string; date_label: string }) {
  await cms.addBlogPost(input);
  revalidateForPage("blog");
  revalidateForPage("home");
}

export async function updateBlogPostAction(id: string, patch: Partial<cms.BlogPost>) {
  await cms.updateBlogPost(id, patch);
  revalidateForPage("blog");
  revalidateForPage("home");
}

export async function deleteBlogPostAction(id: string) {
  await cms.deleteBlogPost(id);
  revalidateForPage("blog");
  revalidateForPage("home");
}

export async function reorderBlogPostsAction(orderedIds: string[]) {
  await cms.reorderBlogPosts(orderedIds);
  revalidateForPage("blog");
  revalidateForPage("home");
}

// ---------------------------------------------------------------------------
// Enquiries
// ---------------------------------------------------------------------------

export async function updateSubmissionStatusAction(id: number, status: cms.Submission["status"]) {
  await cms.updateSubmissionStatus(id, status);
  revalidatePath("/admin/submissions");
  revalidatePath("/admin/dashboard");
}

const EVENT_TYPE_FIELD_NAMES = ["wedding-type", "event-type", "venue-type", "event-category"];

export async function submitEnquiryAction(formType: string, formData: FormData) {
  const entries = Object.fromEntries(formData.entries()) as Record<string, string>;
  const eventTypeField = EVENT_TYPE_FIELD_NAMES.find((name) => entries[name]);

  await cms.createSubmission({
    form_type: formType,
    name: entries.name ?? null,
    email: entries.email ?? null,
    phone: entries.phone ?? null,
    subject: entries.subject ?? null,
    message: entries.message ?? null,
    event_type: eventTypeField ? entries[eventTypeField] : null,
    data: entries,
  });
}
