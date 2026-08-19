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
        className="mt-2 inline-flex items-center rounded-md bg-gradient-to-b from-brand-yellow to-[#c8e430] px-6 py-3 text-body-sm font-bold uppercase tracking-wide text-brand-dark shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all hover:from-brand-yellow-hover hover:to-[#e6c52e] hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
      >
        Continue shopping
      </Link>
    </div>
  );
}
