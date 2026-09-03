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

export const ROUTE_FOR_PAGE: Record<PageKey, string> = {
  home: "/",
  wedding: "/wedding",
  "corporate-event": "/corporate-event",
  "wedding-venues": "/wedding-venues",
  "social-events": "/social-events",
  blog: "/blog",
  global: "/",
};
