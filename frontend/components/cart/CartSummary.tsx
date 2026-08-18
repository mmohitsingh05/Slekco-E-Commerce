"use client";

import Link from "next/link";
import { selectCount, selectSubtotal, useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { formatINR } from "@/lib/format";

export function CartSummary({ showViewCart = true }: { showViewCart?: boolean }) {
  const subtotal = useCartStore(selectSubtotal);
  const count = useCartStore(selectCount);
  const closeCart = useUiStore((state) => state.closeCart);

  return (
    <div className="flex flex-col gap-4 border-t border-border pt-4">
      <div className="flex items-baseline justify-between">
        <span className="text-body-sm text-ink-soft">
          Subtotal ({count} {count === 1 ? "item" : "items"})
        </span>
        <span className="text-h3 font-semibold text-ink">{formatINR(subtotal)}</span>
      </div>
      <p className="text-body-xs text-ink-faint">
        Checkout is not part of this demo. Prices shown are the live product prices.
      </p>
      <div className="flex flex-col gap-2">
        {showViewCart && (
          <Link
            href="/cart"
            onClick={closeCart}
            className="flex h-11 items-center justify-center rounded-md bg-accent px-6 text-body-sm font-medium text-surface transition-colors hover:bg-accent-hover"
          >
            View cart
          </Link>
        )}
        <Link
          href="/products"
          onClick={closeCart}
          className="flex h-11 items-center justify-center rounded-md border border-border text-body-sm font-medium text-ink transition-colors hover:bg-surface"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}