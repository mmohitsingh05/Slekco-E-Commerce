"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";

export function AddToCartButton({
  product,
  qty,
  disabled,
  size = "md",
}: {
  product: { productId: string; slug: string; name: string; image: string; price: number };
  qty: number;
  disabled?: boolean;
  size?: "md" | "sm";
}) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useUiStore((state) => state.openCart);
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(product, qty);
    setAdded(true);
    openCart();
    window.setTimeout(() => setAdded(false), 1600);
  };

  const sizeClass = size === "sm" ? "h-9 min-w-0 px-4" : "h-11 min-w-40 px-6";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`flex items-center justify-center rounded-md bg-accent text-body-sm font-medium text-surface transition-colors duration-fast ease-out hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50 ${sizeClass}`}
    >
      {added ? "Added ✓" : disabled ? "Out of stock" : "Add to cart"}
    </button>
  );
}