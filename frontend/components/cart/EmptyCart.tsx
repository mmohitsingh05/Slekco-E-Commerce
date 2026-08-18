"use client";

import Link from "next/link";
import { CartIcon } from "@/components/ui/icons";
import { useUiStore } from "@/store/ui-store";

export function EmptyCart() {
  const closeCart = useUiStore((state) => state.closeCart);

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-ink-faint">
        <CartIcon />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-h3 font-semibold text-ink">Your cart is empty</p>
        <p className="text-body-sm text-ink-soft">
          Add a few things to get started.
        </p>
      </div>
      <Link
        href="/products"
        onClick={closeCart}
        className="mt-2 inline-flex items-center rounded-md bg-accent px-5 py-3 text-body-sm font-medium text-surface transition-colors hover:bg-accent-hover"
      >
        Continue shopping
      </Link>
    </div>
  );
}