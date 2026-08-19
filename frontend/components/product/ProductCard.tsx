import Image from "next/image";
import Link from "next/link";
import type { ProductListItem } from "@/lib/types";
import { WishlistButton } from "@/components/product/WishlistButton";

export function ProductCard({ product }: { product: ProductListItem }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group"
      aria-label={product.name}
    >
      <div className="relative mb-3 aspect-[3/4] overflow-hidden bg-gray-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 17vw, (min-width: 768px) 25vw, 50vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTRlMmRkIi8+PC9zdmc+"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gray-100" aria-hidden="true" />
        )}
        <span className="absolute right-2 top-2">
          <WishlistButton />
        </span>
      </div>
      <h3 className="text-xs font-bold uppercase tracking-tight">{product.name}</h3>
      <p className="mt-1 text-xs font-bold text-gray-700">
        ₹{product.price.toLocaleString("en-IN")}
      </p>
    </Link>
  );
}
