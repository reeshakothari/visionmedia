import Image from "next/image";

export default function PageHero({ image, title, subtitle }: { image: string; title: string; subtitle: string }) {
  return (
    <section className="relative h-[52vh] min-h-[340px] w-full overflow-hidden">
      <Image src={image} alt={title} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/45 to-navy/20" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <div className="divider-gold-center mb-5" />
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl">{title}</h1>
        <p className="mt-4 max-w-xl text-sm text-white/75 sm:text-base md:text-lg">{subtitle}</p>
      </div>
    </section>
  );
}
