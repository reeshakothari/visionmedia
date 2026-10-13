"use client";

import { useState } from "react";
import { Field } from "@/components/editable/Field";
import { EditableImage } from "@/components/editable/EditableImage";
import { Lightbox } from "@/components/Lightbox";
import { useEditable } from "@/components/editable/context";

export default function PageHero({ image, title, subtitle }: { image: string; title: string; subtitle: string }) {
  const ctx = useEditable();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section
      className={`relative h-[52vh] min-h-[340px] w-full overflow-hidden ${!ctx ? "cursor-zoom-in" : ""}`}
      onClick={!ctx ? () => setLightboxOpen(true) : undefined}
      role={!ctx ? "button" : undefined}
      tabIndex={!ctx ? 0 : undefined}
      aria-label={!ctx ? `View ${title} full size` : undefined}
      onKeyDown={
        !ctx
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setLightboxOpen(true);
              }
            }
          : undefined
      }
    >
      <EditableImage path="heroImage" src={image} alt={title} fill priority sizes="100vw" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/45 to-navy/20" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <div className="divider-gold-center mb-5" />
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl">
          <Field path="heroTitle" value={title} />
        </h1>
        <p className="mt-4 max-w-xl text-sm text-white/75 sm:text-base md:text-lg">
          <Field path="heroSubtitle" value={subtitle} />
        </p>
      </div>

      {!ctx && (
        <Lightbox
          images={[{ src: image, alt: title, title }]}
          openIndex={lightboxOpen ? 0 : null}
          onClose={() => setLightboxOpen(false)}
          onNavigate={() => {}}
        />
      )}
    </section>
  );
}
