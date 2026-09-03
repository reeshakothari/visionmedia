"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { Field } from "@/components/editable/Field";
import { EditableImage } from "@/components/editable/EditableImage";
import type { HomeContent } from "@/lib/cms";

type ServiceCard = HomeContent["serviceCards"][number];

function ServiceCard({ card, index }: { card: ServiceCard; index: number }) {
  const isFirst = index === 0;
  const [flipped, setFlipped] = useState(false);
  const base = `serviceCards.${index}`;

  return (
    <Reveal delay={index * 100}>
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${card.frontTitle} — press to see details`}
        className="group relative h-[380px] cursor-pointer [perspective:1400px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-dark focus-visible:ring-offset-2 sm:h-[440px]"
        onClick={() => setFlipped((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((v) => !v);
          }
        }}
      >
        <div
          className={`relative h-full w-full rounded-2xl transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] md:group-hover:[transform:rotateY(180deg)] md:group-focus-visible:[transform:rotateY(180deg)] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Front */}
          <div className="shadow-premium absolute inset-0 overflow-hidden rounded-2xl [backface-visibility:hidden]">
            <EditableImage
              path={`${base}.image`}
              src={card.image}
              alt={card.frontTitle}
              fill
              sizes="(min-width: 768px) 25vw, 90vw"
              priority={isFirst}
              className="transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/15 to-transparent" />
            <div className="pointer-events-none absolute left-5 top-5 divider-gold" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6">
              <h3 className="font-display text-2xl text-white sm:text-[1.7rem]">
                <Field path={`${base}.frontTitle`} value={card.frontTitle} />
              </h3>
              <p className="mt-1 text-xs tracking-wide text-gold-light/90 uppercase">
                <Field path={`${base}.frontSubtitle`} value={card.frontSubtitle} />
              </p>
              <span className="mt-3 inline-block font-heading text-[11px] font-medium tracking-wide text-white/60 md:hidden">
                Tap to explore →
              </span>
            </div>
          </div>

          {/* Back */}
          <div className="shadow-premium hairline absolute inset-0 flex flex-col justify-between overflow-y-auto rounded-2xl bg-cream p-6 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div>
              <h3 className="font-display text-xl text-navy">
                <Field path={`${base}.backTitle`} value={card.backTitle} />
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                <Field path={`${base}.backText`} value={card.backText} />
              </p>
              <ul className="mt-4 space-y-1.5 text-left">
                {card.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-1.5 text-xs font-medium text-navy/70 sm:text-[13px]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-dark" aria-hidden />
                    <Field path={`${base}.items.${j}`} value={item} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="badge badge-gold mb-4">
                <Field path={`${base}.rating`} value={card.rating} />
              </p>
              <Link
                href={card.href}
                onClick={(e) => e.stopPropagation()}
                className="btn-gold tap-target inline-block w-full rounded-full px-6 py-3 text-[11px] uppercase"
              >
                <Field path={`${base}.ctaLabel`} value={card.ctaLabel} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function ServiceCards({
  servicesSection,
  serviceCards,
}: {
  servicesSection: HomeContent["servicesSection"];
  serviceCards: HomeContent["serviceCards"];
}) {
  return (
    <section id="services" className="bg-white px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <div className="divider-gold-center mb-5" />
            <h2 className="font-display text-3xl text-navy sm:text-4xl md:text-[2.75rem]">
              <Field path="servicesSection.heading" value={servicesSection.heading} />
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
              <Field path="servicesSection.subheading" value={servicesSection.subheading} />
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((card, i) => (
            <ServiceCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
