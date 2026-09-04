"use client";

import { useEditable } from "./context";

// Some text can't be clicked directly on the page — placeholder attributes,
// <option> labels, hidden success messages. These render an inline editing
// panel that only appears inside the admin editor and is completely absent
// from the public site.

export function EditPanel({ title, children }: { title: string; children: React.ReactNode }) {
  const ctx = useEditable();
  if (!ctx) return null;

  return (
    <div className="mx-auto mt-6 max-w-5xl rounded-2xl border-2 border-dashed border-gold/60 bg-gold/[0.06] p-5">
      <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-gold-dark">
        ✎ {title}
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>
    </div>
  );
}

export function EditInput({
  path,
  label,
  value,
  multiline = false,
}: {
  path: string;
  label: string;
  value: string;
  multiline?: boolean;
}) {
  const ctx = useEditable();
  if (!ctx) return null;

  const current = (ctx.get(path) as string | undefined) ?? value;
  const className =
    "w-full rounded-lg border border-navy/15 bg-white px-3 py-2 text-sm text-navy outline-none transition-colors focus:border-gold";

  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-light">{label}</span>
      {multiline ? (
        <textarea
          key={current}
          defaultValue={current}
          rows={2}
          onBlur={(e) => ctx.set(path, e.target.value)}
          className={className}
        />
      ) : (
        <input key={current} defaultValue={current} onBlur={(e) => ctx.set(path, e.target.value)} className={className} />
      )}
    </label>
  );
}
