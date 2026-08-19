"use client";

import { useSyncExternalStore } from "react";
import { selectCount, useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { CartIcon } from "@/components/ui/icons";

const emptySubscribe = () => () => {};

export function CartButton() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const count = useCartStore(selectCount);
  const toggleCart = useUiStore((state) => state.toggleCart);

  return (
    <button
      type="button"
      onClick={toggleCart}
      aria-label={`Open cart${isClient && count > 0 ? `, ${count} items` : ""}`}
      className="relative hover:text-gray-600 transition-colors"
    >
      <CartIcon />
      {isClient && count > 0 && (
        <span
          className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-yellow px-1 text-[0.625rem] font-bold text-brand-dark"
          aria-live="polite"
        >
          {count}
        </span>
      )}
    </button>
  );
}
