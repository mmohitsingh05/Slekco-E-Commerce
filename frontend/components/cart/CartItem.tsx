"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { formatINR } from "@/lib/format";
import { CloseIcon } from "@/components/ui/icons";

export function CartItem({ productId }: { productId: string }) {
  const item = useCartStore((state) => state.items[productId]);
  const setQty = useCartStore((state) => state.setQty);
  const removeItem = useCartStore((state) => state.removeItem);

  if (!item) return null;

  return (
    <li className="flex gap-4 border-b border-border pb-4">
      <Link
        href={`/products/${item.slug}`}
        className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-md bg-surface"
      >
        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${item.slug}`}
            className="truncate text-body-sm font-medium text-ink transition-colors hover:text-accent"
          >
            {item.name}
          </Link>
          <button
            type="button"
            onClick={() => removeItem(productId)}
            aria-label={`Remove ${item.name} from cart`}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-ink-faint transition-colors hover:bg-surface hover:text-ink"
          >
            <CloseIcon />
          </button>
        </div>

        <p className="text-body-sm text-ink-soft">{formatINR(item.price)} each</p>

        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex h-8 items-center rounded-md border border-border bg-surface" role="group" aria-label={`Quantity of ${item.name}`}>
            <button
              type="button"
              onClick={() => setQty(productId, item.qty - 1)}
              disabled={item.qty <= 1}
              aria-label="Decrease quantity"
              className="flex h-full w-8 items-center justify-center text-ink transition-colors hover:bg-canvas disabled:opacity-40"
            >
              −
            </button>
            <span className="w-8 text-center text-body-sm font-medium text-ink">{item.qty}</span>
            <button
              type="button"
              onClick={() => setQty(productId, item.qty + 1)}
              disabled={item.qty >= 99}
              aria-label="Increase quantity"
              className="flex h-full w-8 items-center justify-center text-ink transition-colors hover:bg-canvas disabled:opacity-40"
            >
              +
            </button>
          </div>
          <p className="text-body-sm font-semibold text-ink">{formatINR(item.price * item.qty)}</p>
        </div>
      </div>
    </li>
  );
}