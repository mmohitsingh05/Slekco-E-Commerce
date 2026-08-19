"use client";

import Link from "next/link";
import { CartIcon } from "@/components/ui/icons";
import { useUiStore } from "@/store/ui-store";

export function EmptyCart() {
  const closeCart = useUiStore((state) => state.closeCart);

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface text-ink-faint">
        <CartIcon />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-h3 font-bold uppercase tracking-tight text-ink">Your cart is empty</p>
        <p className="text-body-sm text-ink-soft">
          Looks like you haven&apos;t added anything yet.
        </p>
      </div>
      <Link
        href="/products"
        onClick={closeCart}
        className="mt-2 inline-flex items-center rounded-md bg-brand-yellow px-6 py-3 text-body-sm font-bold uppercase tracking-wide text-brand-dark transition-colors hover:bg-brand-yellow-hover"
      >
        Continue shopping
      </Link>
    </div>
  );
}
