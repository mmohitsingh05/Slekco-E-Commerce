import Image from "next/image";
import Link from "next/link";
import type { ProductListItem } from "@/lib/types";
import { PriceTag } from "@/components/product/PriceTag";
import { RatingStars } from "@/components/product/RatingStars";
import { Badge } from "@/components/ui/Badge";

export function ProductCard({ product }: { product: ProductListItem }) {
  const outOfStock = product.stock <= 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col gap-3"
      aria-label={product.name}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg bg-surface shadow-card transition-shadow duration-base ease-out group-hover:shadow-card-hover">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTZlNGRlIi8+PC9zdmc+"
          className="object-cover transition-transform duration-slow ease-out group-hover:scale-[1.03]"
        />
        {outOfStock ? (
          <span className="absolute left-3 top-3">
            <Badge tone="danger">Out of stock</Badge>
          </span>
        ) : (
          product.isFeatured && (
            <span className="absolute left-3 top-3">
              <Badge tone="accent">Featured</Badge>
            </span>
          )
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-label uppercase text-ink-faint">{product.category.name}</p>
        <h3 className="text-h3 font-medium text-ink">{product.name}</h3>
        <RatingStars rating={product.rating} ratingCount={product.ratingCount} />
        <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} />
      </div>
    </Link>
  );
}