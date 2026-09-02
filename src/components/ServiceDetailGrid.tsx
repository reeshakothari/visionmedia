import { Check } from "lucide-react";
import Icon, { type IconName } from "@/components/Icon";
import Reveal from "@/components/Reveal";

type Service = { icon: string; title: string; text: string; items: string[] };

export default function ServiceDetailGrid({
  id = "services",
  heading,
  subheading,
  services,
}: {
  id?: string;
  heading: string;
  subheading: string;
  services: Service[];
}) {
  return (
    <section id={id} className="bg-white px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <div className="divider-gold-center mb-5" />
            <h2 className="font-display text-3xl text-navy sm:text-4xl md:text-[2.75rem]">{heading}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">{subheading}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 90}>
              <div className="hairline group h-full rounded-2xl bg-white p-7 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-premium">
                <span className="hairline flex h-12 w-12 items-center justify-center rounded-full bg-cream-alt transition-transform duration-500 group-hover:scale-110">
                  <Icon name={service.icon as IconName} className="h-6 w-6 text-gold-dark" />
                </span>
                <h3 className="mt-4 font-display text-lg text-navy">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.text}</p>
                <div className="mt-4 border-t border-gold/15 pt-4">
                  <ul className="space-y-1.5">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-[13px] font-medium text-navy/65">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-dark" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
