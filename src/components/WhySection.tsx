import Icon, { type IconName } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { Field } from "@/components/editable/Field";

type Feature = { icon: string; title: string; text: string };
type Stat = { number: string; label: string };

export default function WhySection({
  heading,
  subheading,
  features,
  stats,
}: {
  heading: string;
  subheading: string;
  features: Feature[];
  stats: Stat[];
}) {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <div className="divider-gold-center mb-5" />
            <h2 className="font-display text-3xl text-navy sm:text-4xl md:text-[2.75rem]">
              <Field path="whyHeading" value={heading} />
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
              <Field path="whySubheading" value={subheading} />
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <div className="space-y-7">
            {features.map((f, i) => (
              <Reveal key={i} direction="left" delay={i * 100}>
                <div className="flex items-start gap-4">
                  <span className="hairline flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream-alt">
                    <Icon name={f.icon as IconName} className="h-5 w-5 text-gold-dark" />
                  </span>
                  <div>
                    <h3 className="font-heading text-[15px] font-semibold text-navy">
                      <Field path={`whyFeatures.${i}.title`} value={f.title} />
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-light">
                      <Field path={`whyFeatures.${i}.text`} value={f.text} />
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 self-start">
            {stats.map((stat, i) => (
              <Reveal key={i} direction="right" delay={i * 90}>
                <div className="shadow-premium rounded-2xl bg-navy p-6 text-center transition-transform duration-500 ease-out hover:-translate-y-1.5">
                  <div className="font-display text-3xl text-gold-light">
                    <Field path={`stats.${i}.number`} value={stat.number} />
                  </div>
                  <div className="mt-1.5 text-[11px] font-medium tracking-wide text-white/60 uppercase">
                    <Field path={`stats.${i}.label`} value={stat.label} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
