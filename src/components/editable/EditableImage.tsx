"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useEditable } from "./context";
import { uploadImageAction } from "@/lib/actions";

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

  if (!ctx) {
    return (
      <Image src={src} alt={alt} className={className} fill={fill} sizes={sizes} priority={priority} width={width} height={height} />
    );
  }

  const currentSrc = (ctx.get(path) as string | undefined) ?? src;

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !ctx) return;
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadImageAction(formData);
      if ("error" in result) setError(result.error);
      else ctx.set(path, result.url);
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
      <label className="absolute inset-0 z-20 flex cursor-pointer flex-col items-center justify-center gap-1 bg-black/0 opacity-0 transition group-hover/edit:bg-black/55 group-hover/edit:opacity-100">
        <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-navy shadow">
          {uploading ? "Uploading…" : "Change image"}
        </span>
        {error && <span className="rounded bg-red-600 px-2 py-0.5 text-[10px] text-white">{error}</span>}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
      </label>
    </span>
  );
}
