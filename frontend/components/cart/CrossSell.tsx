"use client";

import Image from "next/image";
import Link from "next/link";
import { formatINR } from "@/lib/format";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import type { ProductListItem } from "@/lib/types";

export function CrossSell({ products }: { products?: ProductListItem[] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="px-6 py-4">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-ink-faint">
        You may also like
      </p>
      <ul className="space-y-2">
        {products.map((p) => (
          <li
            key={p._id}
            className="flex gap-3 rounded-md p-2 transition-colors hover:bg-canvas"
          >
            <Link
              href={`/products/${p.slug}`}
              className="relative h-14 w-14 shrink-0 overflow-hidden bg-surface"
            >
              {p.images?.[0] ? (
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-surface" aria-hidden="true" />
              )}
            </Link>
            <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
              <div className="space-y-0.5">
                <Link
                  href={`/products/${p.slug}`}
                  className="text-[11px] font-bold uppercase tracking-wide text-ink transition-colors hover:text-brand-dark leading-tight line-clamp-1"
                >
                  {p.name}
                </Link>
                <p className="text-[11px] text-ink-faint whitespace-nowrap">
                  {formatINR(p.price)}
                </p>
              </div>
              <AddToCartButton
                product={{
                  productId: p._id,
                  slug: p.slug,
                  name: p.name,
                  image: p.images?.[0] ?? "",
                  price: p.price,
                }}
                qty={1}
                size="sm"
                label="ADD"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
