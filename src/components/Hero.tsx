"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { HomeContent } from "@/lib/cms";
import { Field } from "@/components/editable/Field";
import { EditableImage } from "@/components/editable/EditableImage";

const tileClasses = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1 md:col-span-2 md:row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1 md:col-span-1",
];

export default function Hero({ hero }: { hero: HomeContent["hero"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);

  return (
    <section id="home" ref={ref} className="bg-noise relative overflow-hidden bg-navy px-4 pb-16 pt-12 sm:px-6 md:pb-28 md:pt-20">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gold/[0.06] blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 text-center md:text-left"
        >
          <div className="divider-gold-center mb-6 md:mx-0" />
          <h1 className="font-display text-[2.75rem] leading-[1.05] text-white sm:text-6xl md:text-6xl lg:text-7xl">
            <Field path="hero.titleLine1" value={hero.titleLine1} />
            <Field
              as="span"
              path="hero.titleLine2"
              value={hero.titleLine2}
              className="mt-1 block text-3xl text-gold-light italic sm:text-4xl md:text-4xl lg:text-5xl"
            />
          </h1>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-white/65 md:mx-0 md:text-base">
            <Field path="hero.subtitle" value={hero.subtitle} />
          </p>

          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row md:items-start">
            <a
              href={hero.primaryCta.href}
              className="btn-gold tap-target inline-flex w-full items-center justify-center rounded-full px-9 py-3.5 text-[13px] sm:w-auto"
            >
              <Field path="hero.primaryCta.label" value={hero.primaryCta.label} />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="btn-outline-gold tap-target inline-flex w-full items-center justify-center rounded-full px-9 py-3.5 text-[13px] sm:w-auto"
            >
              <Field path="hero.secondaryCta.label" value={hero.secondaryCta.label} />
            </a>
          </div>
        </motion.div>

        <motion.div style={{ y, opacity }} className="order-2 mt-8 md:mt-0">
          <div className="grid h-[360px] grid-cols-2 grid-rows-4 grid-flow-dense gap-2.5 sm:h-[420px] md:h-[480px] md:grid-cols-4 md:grid-rows-2 md:gap-3">
            {hero.images.map((img, i) => (
              <motion.div
                key={img.title}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`group hairline-light relative overflow-hidden rounded-xl shadow-premium-lg ${tileClasses[i]}`}
              >
                <EditableImage
                  path={`hero.images.${i}.src`}
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 45vw"
                  priority={i === 0}
                  className="transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/5 to-transparent" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3 font-heading text-[11px] font-medium tracking-wide text-white/90">
                  <Field path={`hero.images.${i}.title`} value={img.title} />
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
