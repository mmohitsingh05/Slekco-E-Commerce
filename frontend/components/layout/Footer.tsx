import Link from "next/link";
import { site } from "@/lib/site";
import { content } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/layout/NewsletterForm";

const footerLinks = [
  { label: "Shop all", href: "/products" },
  { label: "Best sellers", href: "/products?sort=rating" },
  { label: "New arrivals", href: "/products?sort=newest" },
  { label: "Categories", href: "/#categories" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.8fr_1.2fr]">
          <div className="flex flex-col gap-3">
            <p className="text-h3 font-semibold tracking-tight text-ink">{site.name}</p>
            <p className="max-w-sm text-body-sm text-ink-faint">{content.footer.blurb}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2">
            <p className="text-label uppercase text-ink-faint">Shop</p>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body-sm text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <p className="text-h3 font-medium text-ink">{content.newsletter.title}</p>
            <p className="max-w-sm text-body-sm text-ink-soft">{content.newsletter.description}</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-label uppercase text-ink-faint">
            © {year} {site.name}
          </p>
          <p className="text-body-sm text-ink-faint">Prices in INR · Cart is stored locally</p>
        </div>
      </Container>
    </footer>
  );
}