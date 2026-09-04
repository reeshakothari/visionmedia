// Page-key constants shared by server code (cms.ts, actions.ts) and client
// components (e.g. ContactSection needs PAGE_LABELS for the WhatsApp
// message). Kept in its own file, with no "server-only" import, so both can
// use it safely.

export type PageKey =
  | "home"
  | "wedding"
  | "corporate-event"
  | "wedding-venues"
  | "social-events"
  | "blog"
  | "global";

export const PAGE_LABELS: Record<PageKey, string> = {
  home: "Home",
  wedding: "Wedding",
  "corporate-event": "Corporate Events",
  "wedding-venues": "Wedding Venues",
  "social-events": "Social Events",
  blog: "Blog",
  global: "Header & Footer",
};

/** Shape of a single field in a contact form. Lives here (rather than in the
 * component) so content.ts can type its editable form definitions. */
export type ContactField =
  | { kind: "text"; name: string; placeholder: string }
  | { kind: "email"; name: string; placeholder: string }
  | { kind: "select"; name: string; placeholder: string; options: { value: string; label: string }[] }
  | { kind: "textarea"; name: string; placeholder: string };

export type ContactLabels = { phone: string; email: string; address: string; hours: string };

export const CONTACT_LABELS: ContactLabels = {
  phone: "Phone",
  email: "Email",
  address: "Address",
  hours: "Business Hours",
};

export const CONTACT_MESSAGES = {
  success: "Thank you — taking you to WhatsApp to continue the conversation…",
  error: "Something went wrong. Please try again or call us directly.",
};

export const ROUTE_FOR_PAGE: Record<PageKey, string> = {
  home: "/",
  wedding: "/wedding",
  "corporate-event": "/corporate-event",
  "wedding-venues": "/wedding-venues",
  "social-events": "/social-events",
  blog: "/blog",
  global: "/",
};
