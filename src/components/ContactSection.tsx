"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { formAction } from "@/lib/content";

export type ContactField =
  | { kind: "text"; name: string; placeholder: string }
  | { kind: "email"; name: string; placeholder: string }
  | { kind: "select"; name: string; placeholder: string; options: { value: string; label: string }[] }
  | { kind: "textarea"; name: string; placeholder: string };

export default function ContactSection({
  id = "contact",
  heading,
  subheading,
  infoHeading = "Get In Touch",
  phone,
  email,
  address,
  hours,
  fields,
  submitLabel = "Send Message",
}: {
  id?: string;
  heading: string;
  subheading: string;
  infoHeading?: string;
  phone: string;
  email: string;
  address?: string;
  hours?: string;
  fields: ContactField[];
  submitLabel?: string;
}) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <section id={id} className="bg-white px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <div className="divider-gold-center mb-5" />
            <h2 className="font-display text-3xl text-navy sm:text-4xl md:text-[2.75rem]">{heading}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">{subheading}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal direction="left">
            <div className="bg-noise shadow-premium-lg relative h-full overflow-hidden rounded-2xl bg-navy p-8 text-white sm:p-10">
              <div className="divider-gold mb-6" />
              <h3 className="font-display text-2xl">{infoHeading}</h3>
              <div className="mt-8 space-y-6 text-sm sm:text-base">
                <div>
                  <p className="font-heading text-[11px] font-semibold tracking-[0.15em] text-gold-light uppercase">Phone</p>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="mt-1 block text-white/80 hover:text-gold-light">
                    {phone}
                  </a>
                </div>
                <div>
                  <p className="font-heading text-[11px] font-semibold tracking-[0.15em] text-gold-light uppercase">Email</p>
                  <a href={`mailto:${email}`} className="mt-1 block break-all text-white/80 hover:text-gold-light">
                    {email}
                  </a>
                </div>
                {address && (
                  <div>
                    <p className="font-heading text-[11px] font-semibold tracking-[0.15em] text-gold-light uppercase">Address</p>
                    <p className="mt-1 text-white/80">{address}</p>
                  </div>
                )}
                {hours && (
                  <div>
                    <p className="font-heading text-[11px] font-semibold tracking-[0.15em] text-gold-light uppercase">
                      Business Hours
                    </p>
                    <p className="mt-1 text-white/80">{hours}</p>
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <form
              action={formAction}
              method="POST"
              className="hairline shadow-premium space-y-4 rounded-2xl p-8 sm:p-10"
              onSubmit={() => setSubmitting(true)}
            >
              {fields.map((field) => {
                if (field.kind === "select") {
                  return (
                    <select
                      key={field.name}
                      name={field.name}
                      required
                      defaultValue=""
                      className="tap-target w-full rounded-lg border border-navy/15 px-4 py-3 text-sm text-muted outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold-dark/25"
                    >
                      <option value="" disabled>
                        {field.placeholder}
                      </option>
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  );
                }
                if (field.kind === "textarea") {
                  return (
                    <textarea
                      key={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      rows={5}
                      required
                      className="tap-target w-full resize-none rounded-lg border border-navy/15 px-4 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold-dark/25"
                    />
                  );
                }
                return (
                  <input
                    key={field.name}
                    type={field.kind}
                    name={field.name}
                    placeholder={field.placeholder}
                    required
                    className="tap-target w-full rounded-lg border border-navy/15 px-4 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold-dark/25"
                  />
                );
              })}

              <button
                type="submit"
                className="btn-gold tap-target w-full rounded-full px-6 py-3.5 text-[13px] uppercase disabled:opacity-70"
                disabled={submitting}
              >
                {submitting ? "Sending..." : submitLabel}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
