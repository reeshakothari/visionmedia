"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxImage = { src: string; alt: string; title?: string; caption?: string };

// A full-screen click-to-enlarge viewer for a set of images. Each gallery
// manages its own `openIndex` state (null = closed) and renders this once;
// Escape/outside-click/the X button close it, and arrow keys or the
// prev/next buttons move within the same set when there's more than one.
export function Lightbox({
  images,
  openIndex,
  onClose,
  onNavigate,
}: {
  images: LightboxImage[];
  openIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  useEffect(() => {
    if (openIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((openIndex! - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onNavigate((openIndex! + 1) % images.length);
    }
    window.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, images.length, onClose, onNavigate]);

  if (openIndex === null) return null;
  const img = images[openIndex];
  if (!img) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={img.title || img.alt}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-5 sm:top-5"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((openIndex - 1 + images.length) % images.length);
            }}
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-5"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((openIndex + 1) % images.length);
            }}
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-5"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <div className="flex max-h-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-[70vh] w-[88vw] max-w-5xl sm:h-[78vh]">
          <Image src={img.src} alt={img.alt} fill sizes="90vw" className="object-contain" priority />
        </div>
        {(img.title || img.caption) && (
          <div className="mt-4 max-w-xl text-center text-white">
            {img.title && <p className="font-heading text-sm font-semibold tracking-wide">{img.title}</p>}
            {img.caption && <p className="mt-1 text-xs text-white/70">{img.caption}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
