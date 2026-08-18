import Link from "next/link";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-5 text-center">
      <p className="text-label uppercase text-ink-faint">Curated lifestyle store</p>
      <h1 className="text-display font-semibold tracking-tight text-ink">
        {site.name}
      </h1>
      <p className="max-w-md text-body text-ink-soft">{site.tagline}</p>
      <Link
        href="/products"
        className="mt-2 rounded-md bg-accent px-6 py-3 text-body-sm font-medium text-surface transition-colors duration-fast ease-out hover:bg-accent-hover"
      >
        Shop now
      </Link>
    </section>
  );
}