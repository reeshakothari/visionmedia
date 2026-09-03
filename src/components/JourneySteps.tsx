import Reveal from "@/components/Reveal";
import { Field } from "@/components/editable/Field";

type Step = { number: number; title: string; text: string };

export default function JourneySteps({
  heading,
  subheading,
  steps,
}: {
  heading: string;
  subheading: string;
  steps: Step[];
}) {
  return (
    <section className="bg-cream-alt px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <div className="divider-gold-center mb-5" />
            <h2 className="font-display text-3xl text-navy sm:text-4xl md:text-[2.75rem]">
              <Field path="journeyHeading" value={heading} />
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
              <Field path="journeySubheading" value={subheading} />
            </p>
          </div>
        </Reveal>

        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gold/20 lg:block" />
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="relative h-full rounded-2xl bg-white p-6 text-center shadow-sm transition-transform duration-500 ease-out hover:-translate-y-1.5">
                <div className="hairline mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy font-display text-lg text-gold-light">
                  {step.number}
                </div>
                <h3 className="mt-4 font-display text-lg text-navy">
                  <Field path={`journey.${i}.title`} value={step.title} />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-light">
                  <Field path={`journey.${i}.text`} value={step.text} />
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
