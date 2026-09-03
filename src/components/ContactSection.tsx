"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { Field } from "@/components/editable/Field";
import { submitEnquiryAction } from "@/lib/actions";
import { PAGE_LABELS, type PageKey } from "@/lib/pages";

function toWhatsAppNumber(phone: string) {
  return phone.replace(/\D/g, "");
}

function buildWhatsAppMessage(fields: ContactField[], formData: FormData, pageLabel: string) {
  const lines = [`New enquiry from the website — ${pageLabel}`, ""];
  for (const field of fields) {
    const raw = formData.get(field.name);
    if (!raw || !String(raw).trim()) continue;
    const value = field.kind === "select" ? (field.options.find((o) => o.value === raw)?.label ?? raw) : raw;
    const label = field.placeholder.replace(/^(Your |Select )/, "");
    lines.push(`${label}: ${value}`);
  }
  return lines.join("\n");
}

export type ContactField =
  | { kind: "text"; name: string; placeholder: string }
  | { kind: "email"; name: string; placeholder: string }
  | { kind: "select"; name: string; placeholder: string; options: { value: string; label: string }[] }
  | { kind: "textarea"; name: string; placeholder: string };

export default function ContactSection({
  id = "contact",
  contentPath,
  formType,
  heading,
  subheading,
  headingPath,
  subheadingPath,
  phonePath,
  emailPath,
  addressPath,
  hoursPath,
  infoHeading = "Get In Touch",
  phone,
  email,
  address,
  hours,
  fields,
  submitLabel = "Send Message",
}: {
  id?: string;
  contentPath: string;
  formType: string;
  heading: string;
  subheading: string;
  headingPath?: string;
  subheadingPath?: string;
  phonePath?: string;
  emailPath?: string;
  addressPath?: string;
  hoursPath?: string;
  infoHeading?: string;
  phone: string;
  email: string;
  address?: string;
  hours?: string;
  fields: ContactField[];
  submitLabel?: string;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"idle" | "success" | "error">("idle");
  const prefixed = (override: string | undefined, field: string) => override ?? `${contentPath}.${field}`;

  return (
    <section id={id} className="bg-white px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <div className="divider-gold-center mb-5" />
            <h2 className="font-display text-3xl text-navy sm:text-4xl md:text-[2.75rem]">
              <Field path={prefixed(headingPath, "heading")} value={heading} />
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
              <Field path={prefixed(subheadingPath, "subheading")} value={subheading} />
            </p>
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
                    <Field path={prefixed(phonePath, "phone")} value={phone} />
                  </a>
                </div>
                <div>
                  <p className="font-heading text-[11px] font-semibold tracking-[0.15em] text-gold-light uppercase">Email</p>
                  <a href={`mailto:${email}`} className="mt-1 block break-all text-white/80 hover:text-gold-light">
                    <Field path={prefixed(emailPath, "email")} value={email} />
                  </a>
                </div>
                {address && (
                  <div>
                    <p className="font-heading text-[11px] font-semibold tracking-[0.15em] text-gold-light uppercase">Address</p>
                    <p className="mt-1 text-white/80">
                      <Field path={prefixed(addressPath, "address")} value={address} />
                    </p>
                  </div>
                )}
                {hours && (
                  <div>
                    <p className="font-heading text-[11px] font-semibold tracking-[0.15em] text-gold-light uppercase">
                      Business Hours
                    </p>
                    <p className="mt-1 text-white/80">
                      <Field path={prefixed(hoursPath, "hours")} value={hours} />
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <form
              className="hairline shadow-premium space-y-4 rounded-2xl p-8 sm:p-10"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                setSubmitting(true);
                setResult("idle");
                try {
                  const formData = new FormData(form);
                  await submitEnquiryAction(formType, formData);
                  setResult("success");
                  form.reset();

                  const whatsappNumber = toWhatsAppNumber(phone);
                  const message = buildWhatsAppMessage(fields, formData, PAGE_LABELS[formType as PageKey] ?? formType);
                  window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                } catch {
                  setResult("error");
                } finally {
                  setSubmitting(false);
                }
              }}
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

              {result === "success" && (
                <p className="text-center text-sm font-medium text-emerald-600">
                  Thank you — taking you to WhatsApp to continue the conversation…
                </p>
              )}
              {result === "error" && (
                <p className="text-center text-sm font-medium text-red-600">
                  Something went wrong. Please try again or call us directly.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
