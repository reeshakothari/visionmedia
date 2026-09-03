import Icon, { type IconName } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { Field } from "@/components/editable/Field";
import type { HomeContent } from "@/lib/cms";

export default function AboutSection({ aboutSection }: { aboutSection: HomeContent["aboutSection"] }) {
  return (
    <section id="about" className="bg-cream-alt px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr] lg:gap-16">
          <div>
            <Reveal direction="left">
              <div className="divider-gold mb-5" />
              <h2 className="font-display text-3xl text-navy sm:text-4xl md:text-[2.75rem]">
                <Field path="aboutSection.heading" value={aboutSection.heading} />
              </h2>
              <p className="mt-3 text-sm text-muted-light sm:text-base">
                <Field path="aboutSection.subheading" value={aboutSection.subheading} />
              </p>
            </Reveal>

            <Reveal direction="left" delay={100}>
              <div className="mt-7 space-y-4">
                {aboutSection.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-muted sm:text-base">
                    <Field path={`aboutSection.paragraphs.${i}`} value={p} />
                  </p>
                ))}
              </div>
            </Reveal>

            <div className="mt-9 space-y-6">
              {aboutSection.features.map((f, i) => (
                <Reveal key={i} direction="left" delay={150 + i * 80}>
                  <div className="flex items-start gap-4">
                    <span className="hairline flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                      <Icon name={f.icon as IconName} className="h-5 w-5 text-gold-dark" />
                    </span>
                    <div>
                      <h3 className="font-heading text-[15px] font-semibold text-navy">
                        <Field path={`aboutSection.features.${i}.title`} value={f.title} />
                      </h3>
                      <p className="mt-0.5 text-sm text-muted-light">
                        <Field path={`aboutSection.features.${i}.text`} value={f.text} />
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 self-start">
            {aboutSection.stats.map((stat, i) => (
              <Reveal key={i} direction="right" delay={i * 90}>
                <div className="shadow-premium rounded-2xl bg-navy p-6 text-center transition-transform duration-500 ease-out hover:-translate-y-1.5">
                  <div className="font-display text-3xl text-gold-light sm:text-4xl">
                    <Field path={`aboutSection.stats.${i}.number`} value={stat.number} />
                  </div>
                  <div className="mt-1.5 text-[11px] font-medium tracking-wide text-white/60 uppercase sm:text-xs">
                    <Field path={`aboutSection.stats.${i}.label`} value={stat.label} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center md:mt-24">
          <Reveal>
            <div className="divider-gold-center mb-5" />
            <h3 className="font-display text-2xl text-navy sm:text-3xl">
              <Field path="aboutSection.teamHeading" value={aboutSection.teamHeading} />
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-light sm:text-base">
              <Field path="aboutSection.teamSubheading" value={aboutSection.teamSubheading} />
            </p>
          </Reveal>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
            {aboutSection.team.map((member, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="hairline shadow-premium rounded-2xl bg-white p-8 transition-transform duration-500 ease-out hover:-translate-y-1.5">
                  <div className="hairline flex h-16 w-16 items-center justify-center rounded-full bg-navy font-display text-xl text-gold-light">
                    <Field path={`aboutSection.team.${i}.initials`} value={member.initials} />
                  </div>
                  <h4 className="mt-4 font-display text-xl text-navy">
                    <Field path={`aboutSection.team.${i}.name`} value={member.name} />
                  </h4>
                  <p className="mt-0.5 text-sm font-medium tracking-wide text-gold-dark uppercase">
                    <Field path={`aboutSection.team.${i}.role`} value={member.role} />
                  </p>
                  <p className="mt-2 text-sm text-muted-light">
                    <Field path={`aboutSection.team.${i}.note`} value={member.note} />
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
