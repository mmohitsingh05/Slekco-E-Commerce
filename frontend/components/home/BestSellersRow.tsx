import Link from "next/link";
import { getProducts } from "@/lib/api";
import { content } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";

export async function BestSellersRow() {
  const { items } = await getProducts({ limit: 8, sort: "rating" });

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="best-sellers-heading" className="border-t border-border">
      <Container className="py-12 md:py-16">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 id="best-sellers-heading" className="text-h2 font-semibold tracking-tight text-ink">
              {content.bestSellers.title}
            </h2>
            <p className="mt-1 text-body-sm text-ink-faint">{content.bestSellers.subtitle}</p>
          </div>
          <Link
            href="/products?sort=rating"
            className="text-body-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            Shop best sellers
          </Link>
        </div>
        <ProductGrid products={items} />
      </Container>
    </section>
  );
}