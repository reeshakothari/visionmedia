"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { Field } from "@/components/editable/Field";
import { EditPanel, EditInput } from "@/components/editable/EditPanel";
import { useEditable } from "@/components/editable/context";
import { submitEnquiryAction } from "@/lib/actions";
import { PAGE_LABELS, type ContactField, type ContactLabels, type PageKey } from "@/lib/pages";

export type { ContactField };

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

export default function ContactSection({
  id = "contact",
  basePath,
  formType,
  heading,
  subheading,
  headingPath,
  subheadingPath,
  infoHeading = "Get In Touch",
  phone,
  email,
  address,
  hours,
  labels,
  submitLabel,
  successMessage,
  errorMessage,
  fields,
}: {
  id?: string;
  /** Path prefix into this page's content object, or "" when fields sit at its root. */
  basePath: string;
  formType: string;
  heading: string;
  subheading: string;
  headingPath?: string;
  subheadingPath?: string;
  infoHeading?: string;
  phone: string;
  email: string;
  address?: string;
  hours?: string;
  labels: ContactLabels;
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
  fields: ContactField[];
}) {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"idle" | "success" | "error">("idle");
  const ctx = useEditable();

  const p = (field: string) => (basePath ? `${basePath}.${field}` : field);
  /** Resolve text that can't be edited inline (attributes, option labels) from the live draft. */
  const live = (path: string, fallback: string) => (ctx?.get(path) as string | undefined) ?? fallback;

  const liveSubmitLabel = live(p("submitLabel"), submitLabel);

  return (
    <section id={id} className="bg-white px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <div className="divider-gold-center mb-5" />
            <h2 className="font-display text-3xl text-navy sm:text-4xl md:text-[2.75rem]">
              <Field path={headingPath ?? p("heading")} value={heading} />
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
              <Field path={subheadingPath ?? p("subheading")} value={subheading} />
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal direction="left">
            <div className="bg-noise shadow-premium-lg relative h-full overflow-hidden rounded-2xl bg-navy p-8 text-white sm:p-10">
              <div className="divider-gold mb-6" />
              <h3 className="font-display text-2xl">
                <Field path={p("infoHeading")} value={infoHeading} />
              </h3>
              <div className="mt-8 space-y-6 text-sm sm:text-base">
                <div>
                  <p className="font-heading text-[11px] font-semibold tracking-[0.15em] text-gold-light uppercase">
                    <Field path={p("labels.phone")} value={labels.phone} />
                  </p>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="mt-1 block text-white/80 hover:text-gold-light">
                    <Field path={p("phone")} value={phone} />
                  </a>
                </div>
                <div>
                  <p className="font-heading text-[11px] font-semibold tracking-[0.15em] text-gold-light uppercase">
                    <Field path={p("labels.email")} value={labels.email} />
                  </p>
                  <a href={`mailto:${email}`} className="mt-1 block break-all text-white/80 hover:text-gold-light">
                    <Field path={p("email")} value={email} />
                  </a>
                </div>
                {address && (
                  <div>
                    <p className="font-heading text-[11px] font-semibold tracking-[0.15em] text-gold-light uppercase">
                      <Field path={p("labels.address")} value={labels.address} />
                    </p>
                    <p className="mt-1 text-white/80">
                      <Field path={p("address")} value={address} />
                    </p>
                  </div>
                )}
                {hours && (
                  <div>
                    <p className="font-heading text-[11px] font-semibold tracking-[0.15em] text-gold-light uppercase">
                      <Field path={p("labels.hours")} value={labels.hours} />
                    </p>
                    <p className="mt-1 text-white/80">
                      <Field path={p("hours")} value={hours} />
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

                  const message = buildWhatsAppMessage(fields, formData, PAGE_LABELS[formType as PageKey] ?? formType);
                  window.location.href = `https://wa.me/${toWhatsAppNumber(phone)}?text=${encodeURIComponent(message)}`;
                } catch {
                  setResult("error");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {fields.map((field, i) => {
                const placeholder = live(p(`formFields.${i}.placeholder`), field.placeholder);

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
                        {placeholder}
                      </option>
                      {field.options.map((opt, j) => (
                        <option key={opt.value} value={opt.value}>
                          {live(p(`formFields.${i}.options.${j}.label`), opt.label)}
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
                      placeholder={placeholder}
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
                    placeholder={placeholder}
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
                {submitting ? "Sending..." : liveSubmitLabel}
              </button>

              {result === "success" && (
                <p className="text-center text-sm font-medium text-emerald-600">
                  {live(p("successMessage"), successMessage)}
                </p>
              )}
              {result === "error" && (
                <p className="text-center text-sm font-medium text-red-600">{live(p("errorMessage"), errorMessage)}</p>
              )}
            </form>
          </Reveal>
        </div>

        <EditPanel title="Contact form — button, field prompts & messages">
          <EditInput path={p("submitLabel")} label="Submit button" value={submitLabel} />
          <EditInput path={p("successMessage")} label="Success message" value={successMessage} multiline />
          <EditInput path={p("errorMessage")} label="Error message" value={errorMessage} multiline />
          {fields.map((field, i) => (
            <div key={field.name} className="contents">
              <EditInput
                path={p(`formFields.${i}.placeholder`)}
                label={`Field ${i + 1} prompt`}
                value={field.placeholder}
              />
              {field.kind === "select" &&
                field.options.map((opt, j) => (
                  <EditInput
                    key={opt.value}
                    path={p(`formFields.${i}.options.${j}.label`)}
                    label={`↳ Option ${j + 1}`}
                    value={opt.label}
                  />
                ))}
            </div>
          ))}
        </EditPanel>
      </div>
    </section>
  );
}
