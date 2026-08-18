import { getCategories, getProduct, getProducts } from "@/lib/api";
import { Container } from "@/components/ui/Container";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { PriceTag } from "@/components/product/PriceTag";
import { RatingStars } from "@/components/product/RatingStars";
import { Badge } from "@/components/ui/Badge";
import { RelatedRow } from "@/components/product/RelatedRow";
import { Skeleton } from "@/components/ui/Skeleton";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const dynamicParams = false;

export async function generateStaticParams() {
  const { items } = await getProducts({ limit: 50 });
  return items.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description.slice(0, 155),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 155),
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, categories] = await Promise.all([getProduct(slug), getCategories()]);

  if (!product) notFound();

  const outOfStock = product.stock <= 0;
  const category = categories.find((c) => c.slug === product.category.slug);

  return (
    <Container className="py-8 md:py-12">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-body-sm text-ink-faint">
          <li>
            <Link href="/" className="transition-colors hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/categories/${product.category.slug}`}
              className="transition-colors hover:text-ink"
            >
              {product.category.name}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink-soft">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery images={product.images} name={product.name} />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-label uppercase text-ink-faint">{product.category.name}</p>
            <h1 className="text-h1 font-semibold tracking-tight text-ink">{product.name}</h1>
            <RatingStars rating={product.rating} ratingCount={product.ratingCount} />
          </div>

          <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />

          {outOfStock ? (
            <span>
              <Badge tone="danger">Out of stock</Badge>
            </span>
          ) : (
            <p className="text-body-sm text-success">
              In stock — ships within 24 hours
            </p>
          )}

          <ProductPurchasePanel
            product={{
              productId: product._id,
              slug: product.slug,
              name: product.name,
              image: product.image,
              price: product.price,
            }}
            outOfStock={outOfStock}
          />

          <p className="text-body text-ink-soft">{product.description}</p>

          {product.details.length > 0 && (
            <div>
              <h2 className="text-h3 font-semibold text-ink">Details</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {product.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 text-body-sm text-ink-soft">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 rounded-full bg-accent" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {category && (
        <div className="mt-16 border-t border-border pt-12">
          <Suspense
            fallback={
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4" aria-busy="true">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex flex-col gap-3">
                    <Skeleton className="aspect-square rounded-lg" />
                    <Skeleton className="h-4 w-3/4 rounded" />
                    <Skeleton className="h-4 w-1/2 rounded" />
                  </div>
                ))}
              </div>
            }
          >
            <RelatedRow slug={product.slug} categoryName={category.name} />
          </Suspense>
        </div>
      )}
    </Container>
  );
}