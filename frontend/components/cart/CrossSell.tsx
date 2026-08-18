"use client";

import Image from "next/image";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { formatINR } from "@/lib/format";
import type { ProductListItem } from "@/lib/types";

export function CrossSell({ products }: { products: ProductListItem[] }) {
  if (products.length === 0) return null;

  return (
    <div className="border-t border-border px-6 py-4">
      <h3 className="mb-3 text-body-sm font-semibold text-ink">Complete your order</h3>
      <ul className="flex flex-col gap-3">
        {products.map((product) => (
          <li key={product._id} className="flex items-center gap-3">
            <Image
              src={product.image}
              alt={product.name}
              width={48}
              height={48}
              sizes="48px"
              className="h-12 w-12 shrink-0 rounded-md object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-body-sm text-ink">{product.name}</p>
              <p className="text-body-xs text-ink-faint">{formatINR(product.price)}</p>
            </div>
            <AddToCartButton
              product={{
                productId: product._id,
                slug: product.slug,
                name: product.name,
                image: product.image,
                price: product.price,
              }}
              qty={1}
              size="sm"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}