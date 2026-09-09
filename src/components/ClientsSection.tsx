"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { Field } from "@/components/editable/Field";
import { useEditable } from "@/components/editable/context";
import type { Client } from "@/lib/cms";

export default function ClientsSection({
  heading,
  subheading,
  clients,
}: {
  heading: string;
  subheading: string;
  clients: Client[];
}) {
  const ctx = useEditable();

  // On the public site, hide the whole section until at least one client
  // logo has been added — an empty "Our Clients" block would look broken.
  // Inside the admin editor, always show it (with a helper note when empty)
  // so it's obvious where to go to add logos.
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

        {clients.length === 0 ? (
          <p className="rounded-2xl border-2 border-dashed border-gold/40 bg-white/60 p-8 text-center text-sm text-muted-light">
            No client logos yet — add them from the &ldquo;Clients&rdquo; tab.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {clients.map((client, i) => (
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
