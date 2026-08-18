import { getRelatedProducts } from "@/lib/api";
import { ProductGrid } from "@/components/product/ProductGrid";

export async function RelatedRow({
  slug,
  categoryName,
}: {
  slug: string;
  categoryName: string;
}) {
  const items = await getRelatedProducts(slug);
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="related-heading">
      <h2 id="related-heading" className="mb-6 text-h2 font-semibold tracking-tight text-ink">
        More in {categoryName}
      </h2>
      <ProductGrid products={items} />
    </section>
  );
}