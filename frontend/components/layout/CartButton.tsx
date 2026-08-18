"use client";

import { useSyncExternalStore } from "react";
import { selectCount, useCartStore } from "@/store/cart-store";
import { CartIcon } from "@/components/ui/icons";

const emptySubscribe = () => () => {};

export function CartButton() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const count = useCartStore(selectCount);

  return (
    <button
      type="button"
      aria-label={`Open cart${isClient && count > 0 ? `, ${count} items` : ""}`}
      className="relative flex h-11 w-11 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-surface hover:text-ink"
    >
      <CartIcon />
      {isClient && count > 0 && (
        <span
          className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-label text-surface"
          aria-live="polite"
        >
          {count}
        </span>
      )}
    </button>
  );
}