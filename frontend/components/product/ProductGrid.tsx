import type { ProductListItem } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductGrid({
  products,
  columns = 4,
}: {
  products: ProductListItem[];
  columns?: 3 | 4 | 6;
}) {
  const colClass =
    columns === 6
      ? "grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6"
      : columns === 3
        ? "grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3"
        : "grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid ${colClass}`}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
