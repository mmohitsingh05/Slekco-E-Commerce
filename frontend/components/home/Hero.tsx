import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6 px-5 py-16 text-center md:py-24 md:px-8">
        <Reveal>
          <p className="text-label uppercase text-ink-faint">Curated lifestyle store</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="text-display font-semibold tracking-tight text-ink">
            Everyday objects,
            <br />
            considered.
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="max-w-xl text-body text-ink-soft md:text-h3">
            A small, considered selection of electronics, home, accessories and
            beauty — chosen to make everyday life feel calmer.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <ButtonLink href="/products" className="mt-2">
            Shop the collection
          </ButtonLink>
        </Reveal>
        <p className="sr-only">{site.tagline}</p>
      </div>
    </section>
  );
}