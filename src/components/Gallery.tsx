"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import FadeImage from "@/components/FadeImage";
import Reveal from "@/components/Reveal";
import { Field } from "@/components/editable/Field";
import { EditPanel, EditInput } from "@/components/editable/EditPanel";
import { useEditable } from "@/components/editable/context";
import { uploadImageAction, addGalleryImageAction, updateGalleryImageAction, deleteGalleryImageAction } from "@/lib/actions";
import { checkUploadSize } from "@/lib/upload";
import type { GalleryImage } from "@/lib/cms";

export default function Gallery({
  id,
  page,
  heading,
  subheading,
  headingPath = "galleryHeading",
  subheadingPath = "gallerySubheading",
  items: initialItems,
  cta,
}: {
  id?: string;
  /** Which page this gallery belongs to — required to add new photos. */
  page: string;
  heading: string;
  subheading: string;
  headingPath?: string;
  subheadingPath?: string;
  items: GalleryImage[];
  cta?: { text: string; label: string; href: string };
}) {
  const ctx = useEditable();
  const ctaHref = cta ? ((ctx?.get("gallerySection.ctaHref") as string | undefined) ?? cta.href) : undefined;
  const [items, setItems] = useState(initialItems);

  return (
    <section id={id} className="bg-white px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <div className="divider-gold-center mb-5" />
            <h2 className="font-display text-3xl text-navy sm:text-4xl md:text-[2.75rem]">
              <Field path={headingPath} value={heading} />
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
              <Field path={subheadingPath} value={subheading} />
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) =>
            ctx ? (
              <EditableGalleryTile
                key={item.id}
                item={item}
                page={page}
                onChange={(patch) => setItems((prev) => prev.map((it) => (it.id === item.id ? { ...it, ...patch } : it)))}
                onDelete={() => setItems((prev) => prev.filter((it) => it.id !== item.id))}
              />
            ) : (
              <Reveal key={item.id} delay={(i % 8) * 60}>
                <div className="group relative aspect-square overflow-hidden rounded-xl bg-cream-alt shadow-sm transition-shadow duration-500 hover:shadow-premium">
                  <FadeImage
                    src={item.src}
                    alt={item.alt || item.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-4">
                    <div className="divider-gold mb-1.5 w-6" />
                    <h3 className="font-heading text-xs font-semibold text-white sm:text-sm">{item.title}</h3>
                    <p className="hidden text-xs text-white/70 sm:block">{item.caption}</p>
                  </div>
                </div>
              </Reveal>
            )
          )}
          {ctx && (
            <AddGalleryTile
              page={page}
              onAdd={(created) => setItems((prev) => [...prev, created])}
            />
          )}
        </div>

        {cta && (
          <Reveal>
            <div className="hairline mt-12 rounded-2xl bg-cream-alt p-10 text-center md:mt-16">
              <p className="mb-5 font-display text-xl text-navy sm:text-2xl">
                <Field path="gallerySection.ctaText" value={cta.text} />
              </p>
              <a href={ctaHref} className="btn-gold tap-target inline-block rounded-full px-9 py-3.5 text-[13px]">
                <Field path="gallerySection.ctaLabel" value={cta.label} />
              </a>
            </div>
          </Reveal>
        )}

        {cta && (
          <EditPanel title="Gallery button destination">
            <EditInput path="gallerySection.ctaHref" label="Link destination" value={cta.href} />
          </EditPanel>
        )}
      </div>
    </section>
  );
}

function EditableGalleryTile({
  item,
  page,
  onChange,
  onDelete,
}: {
  item: GalleryImage;
  page: string;
  onChange: (patch: Partial<GalleryImage>) => void;
  onDelete: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleReplace(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeError = checkUploadSize(file);
    if (sizeError) {
      setError(sizeError);
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadImageAction(formData);
      if ("error" in result) {
        setError(result.error);
      } else {
        await updateGalleryImageAction(item.id, page, { src: result.url });
        onChange({ src: result.url });
      }
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleDelete() {
    if (!confirm("Remove this photo? This can't be undone.")) return;
    await deleteGalleryImageAction(item.id, page);
    onDelete();
  }

  return (
    <div className="hairline overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="group/edit relative aspect-square">
        <FadeImage src={item.src} alt={item.alt || item.title} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" className="object-cover" />
        <label className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center gap-1 bg-black/0 opacity-0 transition group-hover/edit:bg-black/55 group-hover/edit:opacity-100">
          <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-navy shadow">
            {uploading ? "Uploading…" : "Change image"}
          </span>
          <input type="file" accept="image/*" className="hidden" onChange={handleReplace} disabled={uploading} />
        </label>
        <button
          type="button"
          onClick={handleDelete}
          className="absolute right-1.5 top-1.5 z-20 rounded-full bg-white/90 p-1.5 text-red-500 shadow hover:bg-red-50"
          aria-label="Remove photo"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="space-y-1 p-2">
        <input
          key={item.title}
          defaultValue={item.title}
          placeholder="Title"
          onBlur={async (e) => {
            if (e.target.value === item.title) return;
            await updateGalleryImageAction(item.id, page, { title: e.target.value });
            onChange({ title: e.target.value });
          }}
          className="w-full rounded border border-navy/10 px-1.5 py-1 text-[11px] font-semibold text-navy outline-none focus:border-gold"
        />
        <input
          key={item.caption}
          defaultValue={item.caption}
          placeholder="Caption"
          onBlur={async (e) => {
            if (e.target.value === item.caption) return;
            await updateGalleryImageAction(item.id, page, { caption: e.target.value });
            onChange({ caption: e.target.value });
          }}
          className="w-full rounded border border-navy/10 px-1.5 py-1 text-[11px] text-muted outline-none focus:border-gold"
        />
        {error && <p className="text-[10px] leading-snug text-red-600">{error}</p>}
      </div>
    </div>
  );
}

function AddGalleryTile({ page, onAdd }: { page: string; onAdd: (item: GalleryImage) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeError = checkUploadSize(file);
    if (sizeError) {
      setError(sizeError);
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadImageAction(formData);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      const title = file.name.replace(/\.[^.]+$/, "");
      const created = await addGalleryImageAction(page, { src: result.url, alt: title, title, caption: "" });
      onAdd(created);
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gold/40 bg-cream-alt/40 text-muted-light transition-colors hover:border-gold hover:bg-cream-alt">
      <Plus className="h-6 w-6" aria-hidden />
      <span className="px-2 text-center text-xs font-semibold">{uploading ? "Uploading…" : "Add Photo"}</span>
      {error && <span className="px-2 text-center text-[10px] text-red-600">{error}</span>}
      <input type="file" accept="image/*" className="hidden" onChange={handleAdd} disabled={uploading} />
    </label>
  );
}
