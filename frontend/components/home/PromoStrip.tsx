import Image from "next/image";
import Link from "next/link";
import { content } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function PromoStrip() {
  return (
    <section aria-label="Promotions">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.promo.map((block) => (
          <Reveal key={block.href}>
            <Link
              href={block.href}
              className={`group relative flex h-72 items-center overflow-hidden p-8 ${
                block.tone === "dark"
                  ? "bg-brand-dark text-white"
                  : "bg-gray-200 text-brand-dark"
              }`}
              aria-label={block.title}
            >
              <Image
                src={block.image}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
                  block.tone === "dark" ? "opacity-50" : "opacity-40"
                }`}
              />
              <div className="relative z-10 max-w-xs">
                <span
                  className={`mb-1 block text-xs font-bold uppercase tracking-widest ${
                    block.tone === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {block.eyebrow}
                </span>
                <h3 className="mb-6 text-3xl font-black uppercase leading-tight">
                  {block.title}
                </h3>
                {block.tone === "dark" ? (
                  <span className="inline-block bg-brand-yellow px-6 py-2.5 text-xs font-bold uppercase text-brand-dark hover:bg-brand-yellow-hover transition-colors">
                    {block.cta}
                  </span>
                ) : (
                  <span className="inline-block border border-brand-dark px-6 py-2.5 text-xs font-bold uppercase hover:bg-brand-dark hover:text-white transition-colors">
                    {block.cta}
                  </span>
                )}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
