import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables");
}

// Server-only client using the service_role key, which bypasses Row Level
// Security entirely. This file must never be imported from a "use client"
// component — every read/write for CMS content, media lists, and enquiry
// submissions is done from Server Components / Server Actions so the admin
// dashboard can work without a login layer while the tables themselves stay
// locked down (RLS enabled, no anon/authenticated policies).
export const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false },
});

export const MEDIA_BUCKET = "vision-media";

export function publicMediaUrl(path: string) {
  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
