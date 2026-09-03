import FadeImage from "@/components/FadeImage";
import Reveal from "@/components/Reveal";
import { Field } from "@/components/editable/Field";
import type { GalleryImage } from "@/lib/cms";

export default function Gallery({
  id,
  heading,
  subheading,
  headingPath = "galleryHeading",
  subheadingPath = "gallerySubheading",
  items,
  cta,
}: {
  id?: string;
  heading: string;
  subheading: string;
  headingPath?: string;
  subheadingPath?: string;
  items: GalleryImage[];
  cta?: { text: string; label: string; href: string };
}) {
  return (
    <section id={id} className="bg-white px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <div className="divider-gold-center mb-5" />
            <h2 className="font-display text-3xl text-navy sm:text-4xl md:text-[2.75rem]">
              <Field path={headingPath} value={heading} />
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
              <Field path={subheadingPath} value={subheading} />
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 8) * 60}>
              <div className="group relative aspect-square overflow-hidden rounded-xl bg-cream-alt shadow-sm transition-shadow duration-500 hover:shadow-premium">
                <FadeImage
                  src={item.src}
                  alt={item.alt || item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-4">
                  <div className="divider-gold mb-1.5 w-6" />
                  <h3 className="font-heading text-xs font-semibold text-white sm:text-sm">{item.title}</h3>
                  <p className="hidden text-xs text-white/70 sm:block">{item.caption}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {cta && (
          <Reveal>
            <div className="hairline mt-12 rounded-2xl bg-cream-alt p-10 text-center md:mt-16">
              <p className="mb-5 font-display text-xl text-navy sm:text-2xl">
                <Field path="gallerySection.ctaText" value={cta.text} />
              </p>
              <a href={cta.href} className="btn-gold tap-target inline-block rounded-full px-9 py-3.5 text-[13px]">
                <Field path="gallerySection.ctaLabel" value={cta.label} />
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
