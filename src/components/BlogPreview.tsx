import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Field } from "@/components/editable/Field";
import type { HomeContent, BlogPost } from "@/lib/cms";

export default function BlogPreview({
  blogPreviewSection,
  posts,
}: {
  blogPreviewSection: Pick<HomeContent["blogPreviewSection"], "heading" | "subheading" | "ctaText" | "ctaLabel">;
  posts: BlogPost[];
}) {
  return (
    <section className="bg-cream-alt px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <div className="divider-gold-center mb-5" />
            <h2 className="font-display text-3xl text-navy sm:text-4xl md:text-[2.75rem]">
              <Field path="blogPreviewSection.heading" value={blogPreviewSection.heading} />
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
              <Field path="blogPreviewSection.subheading" value={blogPreviewSection.subheading} />
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 100}>
              <Link
                href="/blog"
                className="hairline shadow-premium block h-full rounded-2xl bg-white p-7 transition-transform duration-500 ease-out hover:-translate-y-1.5"
              >
                <h3 className="font-display text-xl text-navy">{post.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                <span className="mt-5 inline-block font-heading text-xs font-semibold tracking-wide text-gold-dark uppercase">
                  Read More →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 text-center">
            <p className="mb-5 text-base text-muted-light">
              <Field path="blogPreviewSection.ctaText" value={blogPreviewSection.ctaText} />
            </p>
            <Link href="/blog" className="btn-outline-navy tap-target inline-block rounded-full px-9 py-3.5 text-[13px]">
              <Field path="blogPreviewSection.ctaLabel" value={blogPreviewSection.ctaLabel} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
