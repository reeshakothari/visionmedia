import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactSection from "@/components/ContactSection";
import { Field } from "@/components/editable/Field";
import { getContent, getBlogPosts, type BlogContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Vision Media & Entertainment",
  description:
    "Insights, tips, and stories on events, weddings, hospitality, and venue planning from Vision Media & Entertainment.",
};

export default async function BlogPage() {
  const [blogPage, posts] = await Promise.all([
    getContent<BlogContent>("blog"),
    getBlogPosts({ onlyPublished: true }),
  ]);

  return (
    <>
      <section className="bg-noise bg-navy px-4 pb-14 pt-20 text-center text-white sm:px-6 md:pt-28">
        <Reveal>
          <div className="divider-gold-center mb-5" />
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl">
            <Field path="heading" value={blogPage.heading} />
          </h1>
          <p className="mt-4 text-sm text-white/65 sm:text-base">
            <Field path="subheading" value={blogPage.subheading} />
          </p>
        </Reveal>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl text-navy sm:text-3xl">
              <Field path="listHeading" value={blogPage.listHeading} />
            </h2>
            <p className="mt-2 text-sm text-muted-light sm:text-base">
              <Field path="listSubheading" value={blogPage.listSubheading} />
            </p>
          </Reveal>

          <div className="mt-10 space-y-5">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={i * 90}>
                <article className="hairline shadow-premium rounded-2xl bg-cream-alt p-7 transition-transform duration-500 ease-out hover:-translate-y-1.5 sm:p-8">
                  <h3 className="font-display text-xl text-navy sm:text-2xl">{post.title}</h3>
                  <p className="badge badge-gold mt-2">{post.date_label}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{post.excerpt}</p>
                  <span className="mt-5 inline-block font-heading text-xs font-semibold tracking-wide text-gold-dark uppercase">
                    {blogPage.readMoreLabel}
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection
        basePath=""
        formType="blog"
        headingPath="ctaHeading"
        subheadingPath="ctaSubheading"
        heading={blogPage.ctaHeading}
        subheading={blogPage.ctaSubheading}
        phone={blogPage.phone}
        email={blogPage.email}
        labels={blogPage.labels}
        submitLabel={blogPage.submitLabel}
        successMessage={blogPage.successMessage}
        errorMessage={blogPage.errorMessage}
        fields={blogPage.formFields}
      />
    </>
  );
}
