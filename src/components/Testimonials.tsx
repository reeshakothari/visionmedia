"use client";

import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { Field } from "@/components/editable/Field";
import type { HomeContent } from "@/lib/cms";
import type { Testimonial } from "@/lib/cms";

function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <div className="hairline shadow-premium flex h-full flex-col rounded-2xl bg-cream p-7 transition-transform duration-500 ease-out hover:-translate-y-1.5 sm:p-8">
      <div className="flex items-center justify-between">
        <span className="font-display text-5xl leading-none text-gold/50">&ldquo;</span>
        <span className="text-xs tracking-wide text-gold-dark" aria-hidden>★★★★★</span>
      </div>
      <p className="-mt-3 flex-1 font-display text-[17px] italic leading-relaxed text-navy/85 sm:text-lg">
        {review.quote}
      </p>
      <div className="mt-6 border-t border-gold/20 pt-4">
        <p className="font-heading text-sm font-semibold tracking-wide text-navy">{review.author}</p>
        <p className="mt-0.5 text-xs tracking-wide text-gold-dark uppercase">{review.role}</p>
      </div>
    </div>
  );
}

export default function Testimonials({
  reviewsSection,
  reviews,
}: {
  reviewsSection: Pick<HomeContent["reviewsSection"], "heading" | "subheading" | "stats">;
  reviews: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);
  const count = reviews.length;

  return (
    <section id="reviews" className="bg-noise bg-navy px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <div className="divider-gold-center mb-5" />
            <h2 className="font-display text-3xl text-white sm:text-4xl md:text-[2.75rem]">
              <Field path="reviewsSection.heading" value={reviewsSection.heading} />
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
              <Field path="reviewsSection.subheading" value={reviewsSection.subheading} />
            </p>
          </div>
        </Reveal>

        {count > 0 && (
          <>
            {/* Mobile: swipeable carousel */}
            <div className="md:hidden">
              <div className="overflow-hidden">
                <motion.div
                  className="flex"
                  drag="x"
                  style={{ x }}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  animate={{ x: `-${index * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60 && index < count - 1) setIndex(index + 1);
                    else if (info.offset.x > 60 && index > 0) setIndex(index - 1);
                  }}
                >
                  {reviews.map((review) => (
                    <div key={review.id} className="w-full shrink-0 px-1">
                      <ReviewCard review={review} />
                    </div>
                  ))}
                </motion.div>
              </div>
              <div className="mt-6 flex justify-center gap-2">
                {reviews.map((review, i) => (
                  <button
                    key={review.id}
                    aria-label={`Go to review ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`tap-target h-1.5 w-1.5 rounded-full transition-colors ${i === index ? "bg-gold" : "bg-white/20"}`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop: grid */}
            <div className="hidden md:grid md:grid-cols-3 md:gap-6">
              {reviews.map((review, i) => (
                <Reveal key={review.id} delay={i * 100}>
                  <ReviewCard review={review} />
                </Reveal>
              ))}
            </div>
          </>
        )}

        <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-6 md:mt-16">
          {reviewsSection.stats.map((stat, i) => (
            <Reveal key={i} delay={i * 90}>
              <div className="border-t border-gold/25 pt-4 text-center">
                <div className="font-display text-2xl text-gold-light sm:text-4xl">
                  <Field path={`reviewsSection.stats.${i}.number`} value={stat.number} />
                </div>
                <div className="mt-1 text-[10px] font-medium tracking-[0.15em] text-white/50 uppercase sm:text-xs">
                  <Field path={`reviewsSection.stats.${i}.label`} value={stat.label} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
