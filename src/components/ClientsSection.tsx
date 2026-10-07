"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Field } from "@/components/editable/Field";
import { useEditable } from "@/components/editable/context";
import { uploadImageAction, addClientAction, updateClientAction, deleteClientAction } from "@/lib/actions";
import { checkUploadSize } from "@/lib/upload";
import type { Client } from "@/lib/cms";

export default function ClientsSection({
  heading,
  subheading,
  clients: initialClients,
}: {
  heading: string;
  subheading: string;
  clients: Client[];
}) {
  const ctx = useEditable();
  const [clients, setClients] = useState(initialClients);

  // On the public site, hide the whole section until at least one client
  // logo has been added — an empty "Our Clients" block would look broken.
  // Inside the admin editor, always show it so it's obvious where to add logos.
  if (!ctx && clients.length === 0) return null;

  return (
    <section className="bg-cream-alt px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <div className="divider-gold-center mb-5" />
            <h2 className="font-display text-3xl text-navy sm:text-4xl md:text-[2.75rem]">
              <Field path="clientsHeading" value={heading} />
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
              <Field path="clientsSubheading" value={subheading} />
            </p>
          </div>
        </Reveal>

        {clients.length === 0 && !ctx ? (
          <p className="rounded-2xl border-2 border-dashed border-gold/40 bg-white/60 p-8 text-center text-sm text-muted-light">
            No client logos yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {clients.map((client, i) =>
              ctx ? (
                <EditableClientTile
                  key={client.id}
                  client={client}
                  onChange={(patch) => setClients((prev) => prev.map((c) => (c.id === client.id ? { ...c, ...patch } : c)))}
                  onDelete={() => setClients((prev) => prev.filter((c) => c.id !== client.id))}
                />
              ) : (
                <Reveal key={client.id} delay={(i % 10) * 60}>
                  <div className="hairline shadow-premium flex h-32 flex-col items-center justify-center gap-3 rounded-2xl bg-white p-4 transition-transform duration-500 ease-out hover:-translate-y-1.5">
                    <div className="relative h-12 w-full">
                      {client.logo ? (
                        <Image src={client.logo} alt={client.name} fill className="object-contain" sizes="180px" />
                      ) : (
                        <div className="flex h-full items-center justify-center font-display text-lg text-navy/40">
                          {client.name.slice(0, 1)}
                        </div>
                      )}
                    </div>
                    <p className="text-center text-xs font-medium text-navy/70">{client.name}</p>
                  </div>
                </Reveal>
              )
            )}
            {ctx && <AddClientTile onAdd={(created) => setClients((prev) => [...prev, created])} />}
          </div>
        )}
      </div>
    </section>
  );
}

function EditableClientTile({
  client,
  onChange,
  onDelete,
}: {
  client: Client;
  onChange: (patch: Partial<Client>) => void;
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
        await updateClientAction(client.id, { logo: result.url });
        onChange({ logo: result.url });
      }
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleDelete() {
    if (!confirm("Remove this client? This can't be undone.")) return;
    await deleteClientAction(client.id);
    onDelete();
  }

  return (
    <div className="hairline shadow-premium relative flex h-32 flex-col items-center justify-center gap-3 rounded-2xl bg-white p-4">
      <button
        type="button"
        onClick={handleDelete}
        className="absolute right-1.5 top-1.5 rounded-full bg-white p-1 text-red-500 shadow hover:bg-red-50"
        aria-label="Remove client"
      >
        <Trash2 className="h-3 w-3" />
      </button>
      <label className="group/edit relative h-12 w-full cursor-pointer">
        {client.logo ? (
          <Image src={client.logo} alt={client.name} fill className="object-contain" sizes="180px" />
        ) : (
          <div className="flex h-full items-center justify-center font-display text-lg text-navy/40">{client.name.slice(0, 1)}</div>
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-white/0 text-[10px] font-semibold text-navy opacity-0 transition group-hover/edit:bg-white/85 group-hover/edit:opacity-100">
          {uploading ? "Uploading…" : "Change logo"}
        </span>
        <input type="file" accept="image/*" className="hidden" onChange={handleReplace} disabled={uploading} />
      </label>
      <input
        key={client.name}
        defaultValue={client.name}
        placeholder="Company name"
        onBlur={async (e) => {
          if (e.target.value === client.name) return;
          await updateClientAction(client.id, { name: e.target.value });
          onChange({ name: e.target.value });
        }}
        className="w-full rounded border border-navy/10 px-1.5 py-1 text-center text-[11px] font-medium text-navy outline-none focus:border-gold"
      />
      {error && <p className="text-[10px] leading-snug text-red-600">{error}</p>}
    </div>
  );
}

function AddClientTile({ onAdd }: { onAdd: (client: Client) => void }) {
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
      const name = file.name.replace(/\.[^.]+$/, "");
      const created = await addClientAction({ name, logo: result.url });
      onAdd(created);
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <label className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gold/40 bg-white/40 text-muted-light transition-colors hover:border-gold hover:bg-white">
      <Plus className="h-5 w-5" aria-hidden />
      <span className="px-2 text-center text-[11px] font-semibold">{uploading ? "Uploading…" : "Add Client"}</span>
      {error && <span className="px-2 text-center text-[10px] text-red-600">{error}</span>}
      <input type="file" accept="image/*" className="hidden" onChange={handleAdd} disabled={uploading} />
    </label>
  );
}
