"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";
import { useRef, useState } from "react";
import { useEditable } from "./context";
import { uploadImageAction } from "@/lib/actions";
import { checkUploadSize } from "@/lib/upload";

type EditableImageProps = {
  path: string;
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
};

// Wraps next/image. On the public site (no editor context) it renders
// exactly like a plain <Image>. Inside the admin editor it adds a
// hover-to-reveal "Change image" control that uploads a new file to Supabase
// Storage and swaps the draft's src for this path.
export function EditableImage({ path, src, alt, className, fill, sizes, priority, width, height }: EditableImageProps) {
  const ctx = useEditable();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justPublished, setJustPublished] = useState(false);

  if (!ctx) {
    return (
      <Image src={src} alt={alt} className={className} fill={fill} sizes={sizes} priority={priority} width={width} height={height} />
    );
  }

  const currentSrc = (ctx.get(path) as string | undefined) ?? src;

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !ctx) return;
    const sizeError = checkUploadSize(file);
    if (sizeError) {
      setError(sizeError);
      if (inputRef.current) inputRef.current.value = "";
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
        // Images go live immediately on upload — unlike text, there's no
        // reason to stage a photo swap behind a separate Publish click, and
        // staging it was exactly why changes here used to look like they
        // "didn't work": the upload succeeded but nothing visibly changed
        // on the live site until Publish was clicked elsewhere.
        await ctx.setAndPublish(path, result.url);
        setJustPublished(true);
        setTimeout(() => setJustPublished(false), 3000);
      }
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const wrapperClass = fill ? "group/edit relative block h-full w-full" : "group/edit relative inline-block";

  return (
    <span className={wrapperClass}>
      <Image
        src={currentSrc}
        alt={alt}
        className={fill ? `object-cover ${className ?? ""}` : className}
        fill={fill}
        sizes={sizes}
        priority={priority}
        width={fill ? undefined : (width ?? 200)}
        height={fill ? undefined : (height ?? 200)}
      />
      <label
        className={`absolute inset-0 z-20 flex cursor-pointer flex-col items-center justify-center gap-1 bg-black/0 transition group-hover/edit:bg-black/55 group-hover/edit:opacity-100 ${
          justPublished ? "bg-emerald-900/60 opacity-100" : "opacity-0"
        }`}
      >
        <span
          className={`rounded-full px-3 py-1.5 text-[11px] font-semibold shadow ${
            justPublished ? "bg-emerald-500 text-white" : "bg-white text-navy"
          }`}
        >
          {uploading ? "Uploading…" : justPublished ? "✓ Live now" : "Change image"}
        </span>
        {error && <span className="rounded bg-red-600 px-2 py-0.5 text-[10px] text-white">{error}</span>}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
      </label>
      {!uploading && !justPublished && (
        <span
          className="pointer-events-none absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white text-navy opacity-90 shadow-md transition-opacity duration-200 group-hover/edit:opacity-0"
          aria-hidden="true"
        >
          <Pencil className="h-3 w-3" />
        </span>
      )}
    </span>
  );
}
