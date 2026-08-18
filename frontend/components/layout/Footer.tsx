import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-h3 font-semibold tracking-tight text-ink">{site.name}</p>
          <p className="mt-1 text-body-sm text-ink-faint">{site.tagline}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2 text-body-sm text-ink-soft sm:flex-row sm:items-center sm:gap-6">
          <Link href="/products" className="transition-colors hover:text-ink">
            Shop all
          </Link>
          <Link href="/products" className="transition-colors hover:text-ink">
            Search
          </Link>
        </nav>
        <p className="text-label uppercase text-ink-faint">
          © {new Date().getFullYear()} {site.name}
        </p>
      </Container>
    </footer>
  );
}