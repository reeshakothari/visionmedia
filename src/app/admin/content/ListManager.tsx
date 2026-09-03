"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { uploadImageAction } from "@/lib/actions";

export type FieldConfig = { name: string; label: string; type: "text" | "textarea" | "image" };

type Item = { id: string; is_published?: boolean } & Record<string, unknown>;

export function ListManager<T extends Item>({
  title,
  description,
  items: initialItems,
  fields,
  emptyDefaults,
  createAction,
  updateAction,
  deleteAction,
  reorderAction,
}: {
  title: string;
  description?: string;
  items: T[];
  fields: FieldConfig[];
  emptyDefaults: Record<string, string>;
  createAction: (input: Record<string, string>) => Promise<void>;
  updateAction: (id: string, patch: Record<string, string>) => Promise<void>;
  deleteAction: (id: string) => Promise<void>;
  reorderAction: (orderedIds: string[]) => Promise<void>;
}) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [draft, setDraft] = useState<Record<string, string>>(emptyDefaults);
  const [adding, setAdding] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  async function handleAdd() {
    setAdding(true);
    try {
      await createAction(draft);
      setItems((prev) => [
        ...prev,
        { ...(draft as unknown as T), id: `temp-${Date.now()}`, sort_order: prev.length } as T,
      ]);
      setDraft(emptyDefaults);
    } finally {
      setAdding(false);
    }
  }

  async function handleUpdate(id: string, name: string, value: string) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [name]: value } : it)));
    await updateAction(id, { [name]: value });
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this item? This can't be undone.")) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
    await deleteAction(id);
  }

  async function handleMove(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
    await reorderAction(next.map((it) => it.id));
  }

  async function handleUpload(field: string, file: File, setter: (url: string) => void) {
    setUploadingField(field);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadImageAction(formData);
      if ("url" in result) setter(result.url);
    } finally {
      setUploadingField(null);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 md:py-10">
      <h1 className="font-display text-2xl text-navy sm:text-3xl">{title}</h1>
      {description && <p className="mt-1 text-sm text-muted-light">{description}</p>}

      <div className="mt-6 space-y-4">
        {items.map((item, i) => (
          <div key={item.id} className="hairline rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap">
                {fields.map((f) => (
                  <div key={f.name} className={f.type === "image" ? "w-24 shrink-0" : "min-w-[180px] flex-1"}>
                    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-light">{f.label}</label>
                    {f.type === "image" ? (
                      <ImageField
                        value={String(item[f.name] ?? "")}
                        uploading={uploadingField === `${item.id}-${f.name}`}
                        onFile={(file) => {
                          setUploadingField(`${item.id}-${f.name}`);
                          handleUpload(f.name, file, (url) => {
                            handleUpdate(item.id, f.name, url);
                            setUploadingField(null);
                          });
                        }}
                      />
                    ) : f.type === "textarea" ? (
                      <textarea
                        defaultValue={String(item[f.name] ?? "")}
                        rows={2}
                        onBlur={(e) => handleUpdate(item.id, f.name, e.target.value)}
                        className="w-full rounded-lg border border-navy/15 px-2.5 py-1.5 text-sm outline-none focus:border-gold"
                      />
                    ) : (
                      <input
                        defaultValue={String(item[f.name] ?? "")}
                        onBlur={(e) => handleUpdate(item.id, f.name, e.target.value)}
                        className="w-full rounded-lg border border-navy/15 px-2.5 py-1.5 text-sm outline-none focus:border-gold"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleMove(i, -1)}
                  disabled={i === 0}
                  className="rounded p-1.5 text-muted-light hover:bg-cream-alt disabled:opacity-30"
                  aria-label="Move up"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(i, 1)}
                  disabled={i === items.length - 1}
                  className="rounded p-1.5 text-muted-light hover:bg-cream-alt disabled:opacity-30"
                  aria-label="Move down"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="rounded p-1.5 text-red-500 hover:bg-red-50"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="py-8 text-center text-sm text-muted-light">Nothing here yet — add the first one below.</p>}
      </div>

      <div className="hairline mt-6 rounded-2xl border-dashed bg-cream-alt/50 p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-light">Add new</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {fields.map((f) => (
            <div key={f.name} className={f.type === "image" ? "w-24 shrink-0" : "min-w-[180px] flex-1"}>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-light">{f.label}</label>
              {f.type === "image" ? (
                <ImageField
                  value={draft[f.name] ?? ""}
                  uploading={uploadingField === `new-${f.name}`}
                  onFile={(file) => {
                    setUploadingField(`new-${f.name}`);
                    handleUpload(f.name, file, (url) => {
                      setDraft((d) => ({ ...d, [f.name]: url }));
                      setUploadingField(null);
                    });
                  }}
                />
              ) : f.type === "textarea" ? (
                <textarea
                  value={draft[f.name] ?? ""}
                  rows={2}
                  onChange={(e) => setDraft((d) => ({ ...d, [f.name]: e.target.value }))}
                  className="w-full rounded-lg border border-navy/15 px-2.5 py-1.5 text-sm outline-none focus:border-gold"
                />
              ) : (
                <input
                  value={draft[f.name] ?? ""}
                  onChange={(e) => setDraft((d) => ({ ...d, [f.name]: e.target.value }))}
                  className="w-full rounded-lg border border-navy/15 px-2.5 py-1.5 text-sm outline-none focus:border-gold"
                />
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={adding}
          className="btn-gold tap-target mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs uppercase disabled:opacity-60"
        >
          <Plus className="h-4 w-4" /> {adding ? "Adding…" : "Add"}
        </button>
      </div>
    </div>
  );
}

function ImageField({ value, uploading, onFile }: { value: string; uploading: boolean; onFile: (file: File) => void }) {
  return (
    <label className="group relative flex h-20 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-navy/25 bg-white text-[10px] text-muted-light">
      {value ? (
        <Image src={value} alt="" fill className="object-cover" />
      ) : (
        <span>{uploading ? "Uploading…" : "Upload"}</span>
      )}
      {value && uploading && <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">Uploading…</span>}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
        }}
      />
    </label>
  );
}
