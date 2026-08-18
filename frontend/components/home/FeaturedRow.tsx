import Link from "next/link";
import { getProducts } from "@/lib/api";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";

export async function FeaturedRow() {
  const { items } = await getProducts({ limit: 8, sort: "featured" });

  return (
    <section aria-labelledby="featured-heading" className="border-t border-border bg-surface">
      <Container className="py-12 md:py-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 id="featured-heading" className="text-h2 font-semibold tracking-tight text-ink">
            Featured
          </h2>
          <Link
            href="/products"
            className="text-body-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            Shop all
          </Link>
        </div>
        <ProductGrid products={items} />
      </Container>
    </section>
  );
}