import { content } from "@/lib/content";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";

export function Hero() {
  const lines = content.hero.title.split("\n");

  return (
    <section className="relative min-h-[600px] bg-brand-dark text-white flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={content.hero.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 transition-transform duration-[2s] ease-out motion-reduce:transition-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/70 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <Reveal>
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-brand-yellow">
            {content.hero.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase leading-none tracking-tight mb-4">
            {lines.map((line, i) => {
              if (line.includes(content.hero.highlight)) {
                const parts = line.split(content.hero.highlight);
                return (
                  <span key={i}>
                    {parts[0]}
                    <span className="text-brand-yellow">{content.hero.highlight}</span>
                    {parts[1]}
                    {i < lines.length - 1 && <br />}
                  </span>
                );
              }
              return (
                <span key={i}>
                  {line}
                  {i < lines.length - 1 && <br />}
                </span>
              );
            })}
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="max-w-md text-base mb-8 text-white/70">
            {content.hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/products">
              {content.hero.cta}
            </ButtonLink>
            <ButtonLink href="/#categories" variant="outline-light">
              {content.hero.ctaSecondary}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
