import Link from "next/link";
import { getProducts } from "@/lib/api";
import { content } from "@/lib/content";
import { ArrowRightIcon } from "@/components/ui/icons";
import { ProductGrid } from "@/components/product/ProductGrid";

export async function NewArrivalsRow() {
  const { items } = await getProducts({ limit: 6, sort: "newest" });

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="new-arrivals-heading">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 id="new-arrivals-heading" className="text-2xl font-black uppercase tracking-wider">
            {content.newArrivals.title}
          </h2>
          <Link
            href="/products?sort=newest"
            className="flex items-center gap-1 text-xs font-bold uppercase hover:underline"
          >
            View all <ArrowRightIcon className="h-3 w-3" />
          </Link>
        </div>
        <ProductGrid products={items} columns={6} />
      </div>
    </section>
  );
}
