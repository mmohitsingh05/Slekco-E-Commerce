"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { formatINR } from "@/lib/format";

export function CartItem({
  productId,
  compact = false,
}: {
  productId: string;
  compact?: boolean;
}) {
  const item = useCartStore((state) => state.items[productId]);
  const setQty = useCartStore((state) => state.setQty);
  const removeItem = useCartStore((state) => state.removeItem);

  if (!item) return null;

  // Drawer variant — compact layout
  if (compact) {
    return (
      <li className="flex gap-3 py-3">
        {/* Product image */}
        <Link
          href={`/products/${item.slug}`}
          className="relative h-[72px] w-[72px] shrink-0 overflow-hidden bg-surface"
        >
          {item.image ? (
            <Image src={item.image} alt={item.name} fill sizes="72px" className="object-cover" />
          ) : (
            <div className="h-full w-full bg-surface" aria-hidden="true" />
          )}
        </Link>

        {/* Product info */}
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div className="space-y-0.5">
            <div className="flex items-start justify-between gap-2">
              <Link
                href={`/products/${item.slug}`}
                className="text-xs font-bold uppercase tracking-wide text-ink transition-colors hover:text-brand-dark leading-tight line-clamp-2"
              >
                {item.name}
              </Link>
              <button
                type="button"
                onClick={() => removeItem(productId)}
                aria-label={`Remove ${item.name} from cart`}
                className="shrink-0 text-[10px] uppercase tracking-wide text-ink-faint transition-colors hover:text-ink"
              >
                Remove
              </button>
            </div>
            <p className="text-[11px] text-ink-faint whitespace-nowrap">
              {formatINR(item.price)} each
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <div
              className="inline-flex h-8 items-center rounded border border-border"
              role="group"
              aria-label={`Quantity of ${item.name}`}
            >
              <button
                type="button"
                onClick={() => setQty(productId, item.qty - 1)}
                disabled={item.qty <= 1}
                aria-label="Decrease quantity"
                className="flex h-full w-8 items-center justify-center text-xs font-bold text-ink transition-colors hover:bg-canvas disabled:opacity-40"
              >
                −
              </button>
              <span className="w-7 text-center text-xs font-bold text-ink">{item.qty}</span>
              <button
                type="button"
                onClick={() => setQty(productId, item.qty + 1)}
                disabled={item.qty >= 99}
                aria-label="Increase quantity"
                className="flex h-full w-8 items-center justify-center text-xs font-bold text-ink transition-colors hover:bg-canvas disabled:opacity-40"
              >
                +
              </button>
            </div>
            <p className="text-xs font-bold text-ink whitespace-nowrap">
              {formatINR(item.price * item.qty)}
            </p>
          </div>
        </div>
      </li>
    );
  }

  // Full page layout — responsive card (mobile) + grid (sm+)
  return (
    <li className="border-b border-border py-6">
      {/* Mobile card */}
      <div className="sm:hidden flex gap-4">
        <Link
          href={`/products/${item.slug}`}
          className="relative h-24 w-20 shrink-0 overflow-hidden bg-surface"
        >
          {item.image ? (
            <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
          ) : (
            <div className="h-full w-full bg-surface" aria-hidden="true" />
          )}
        </Link>
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-2">
              <Link
                href={`/products/${item.slug}`}
                className="font-bold text-xs uppercase tracking-wide text-ink transition-colors hover:text-brand-dark truncate"
              >
                {item.name}
              </Link>
              <button
                type="button"
                onClick={() => removeItem(productId)}
                aria-label={`Remove ${item.name} from cart`}
                className="shrink-0 text-xs text-ink-faint underline transition-colors hover:text-ink"
              >
                Remove
              </button>
            </div>
            <p className="text-xs text-ink-faint truncate">{formatINR(item.price)} each</p>
          </div>
          <div className="flex items-center justify-between gap-2 pt-2">
            <div
              className="inline-flex h-9 items-center rounded-md border border-border bg-surface"
              role="group"
              aria-label={`Quantity of ${item.name}`}
            >
              <button
                type="button"
                onClick={() => setQty(productId, item.qty - 1)}
                disabled={item.qty <= 1}
                aria-label="Decrease quantity"
                className="flex h-full w-9 items-center justify-center text-ink transition-colors hover:bg-canvas disabled:opacity-40"
              >
                −
              </button>
              <span className="w-9 text-center text-body-sm font-medium text-ink">{item.qty}</span>
              <button
                type="button"
                onClick={() => setQty(productId, item.qty + 1)}
                disabled={item.qty >= 99}
                aria-label="Increase quantity"
                className="flex h-full w-9 items-center justify-center text-ink transition-colors hover:bg-canvas disabled:opacity-40"
              >
                +
              </button>
            </div>
            <p className="text-xs font-bold text-ink whitespace-nowrap">{formatINR(item.price * item.qty)}</p>
          </div>
        </div>
      </div>

      {/* Desktop grid (sm+) */}
      <div className="hidden sm:grid sm:grid-cols-12 gap-4 items-center">
        <div className="col-span-6 flex gap-4 min-w-0">
          <Link
            href={`/products/${item.slug}`}
            className="relative h-24 w-20 shrink-0 overflow-hidden bg-surface"
          >
            {item.image ? (
              <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
            ) : (
              <div className="h-full w-full bg-surface" aria-hidden="true" />
            )}
          </Link>
          <div className="space-y-1 min-w-0">
            <Link
              href={`/products/${item.slug}`}
              className="block font-bold text-xs uppercase tracking-wide text-ink transition-colors hover:text-brand-dark truncate"
            >
              {item.name}
            </Link>
            <p className="text-xs text-ink-faint truncate">
              {formatINR(item.price)} each
            </p>
            <button
              type="button"
              onClick={() => removeItem(productId)}
              aria-label={`Remove ${item.name} from cart`}
              className="block pt-2 text-xs text-ink-faint underline transition-colors hover:text-ink"
            >
              Remove
            </button>
          </div>
        </div>

        <div className="col-span-3 flex justify-center items-center">
          <div
            className="inline-flex items-center border border-border"
            role="group"
            aria-label={`Quantity of ${item.name}`}
          >
            <button
              type="button"
              onClick={() => setQty(productId, item.qty - 1)}
              disabled={item.qty <= 1}
              aria-label="Decrease quantity"
              className="px-2.5 py-1 text-ink-faint font-bold text-xs transition-colors hover:text-ink disabled:opacity-40"
            >
              −
            </button>
            <span className="px-3 py-1 text-xs font-bold text-ink">{item.qty}</span>
            <button
              type="button"
              onClick={() => setQty(productId, item.qty + 1)}
              disabled={item.qty >= 99}
              aria-label="Increase quantity"
              className="px-2.5 py-1 text-ink-faint font-bold text-xs transition-colors hover:text-ink disabled:opacity-40"
            >
              +
            </button>
          </div>
        </div>

        <div className="col-span-3 text-right">
          <span className="font-black text-sm text-ink whitespace-nowrap">{formatINR(item.price * item.qty)}</span>
        </div>
      </div>
    </li>
  );
}
