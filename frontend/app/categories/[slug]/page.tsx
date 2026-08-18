import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Category not found" };
  return {
    title: category.name,
    description: category.description ?? `Shop ${category.name} at Slekco.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const { items, total } = await getProducts({ category: slug, sort: "featured", limit: 24 });

  return (
    <Container className="py-8 md:py-12">
      <header className="mb-8">
        <p className="text-label uppercase text-ink-faint">Category</p>
        <h1 className="mt-1 text-h1 font-semibold tracking-tight text-ink">{category.name}</h1>
        {category.description && (
          <p className="mt-2 max-w-xl text-body text-ink-soft">{category.description}</p>
        )}
        <p className="mt-2 text-body-sm text-ink-faint">{total} products</p>
      </header>
      <ProductGrid products={items} />
    </Container>
  );
}