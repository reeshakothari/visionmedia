"use client";

import { useState } from "react";
import { ListManager } from "./ListManager";
import type { GalleryImage } from "@/lib/cms";
import { addGalleryImageAction, updateGalleryImageAction, deleteGalleryImageAction, reorderGalleryImagesAction } from "@/lib/actions";

const PAGES = [
  { key: "home", label: "Home" },
  { key: "wedding", label: "Wedding" },
  { key: "corporate-event", label: "Corporate Events" },
  { key: "wedding-venues", label: "Wedding Venues" },
  { key: "social-events", label: "Social Events" },
];

export default function GalleryManager({ initialImages }: { initialImages: GalleryImage[] }) {
  const [page, setPage] = useState("home");
  const imagesForPage = initialImages.filter((img) => img.page === page);

  return (
    <div>
      <div className="mx-auto flex max-w-4xl flex-wrap gap-2 px-4 pt-8 sm:px-6">
        {PAGES.map((p) => (
          <button
            key={p.key}
            onClick={() => setPage(p.key)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              page === p.key ? "bg-navy text-white" : "bg-white text-navy/60 hairline"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <ListManager
        key={page}
        title={`Photo Gallery — ${PAGES.find((p) => p.key === page)?.label}`}
        description="Photos shown in this page's gallery grid. Add, remove, or reorder them."
        items={imagesForPage}
        fields={[
          { name: "src", label: "Image", type: "image" },
          { name: "title", label: "Title", type: "text" },
          { name: "caption", label: "Caption", type: "text" },
          { name: "alt", label: "Alt text", type: "text" },
        ]}
        emptyDefaults={{ src: "", title: "", caption: "", alt: "" }}
        createAction={(input) =>
          addGalleryImageAction(page, {
            src: input.src,
            title: input.title,
            caption: input.caption,
            alt: input.alt || input.title,
          })
        }
        updateAction={(id, patch) => updateGalleryImageAction(id, page, patch)}
        deleteAction={(id) => deleteGalleryImageAction(id, page)}
        reorderAction={(ids) => reorderGalleryImagesAction(page, ids)}
      />
    </div>
  );
}
