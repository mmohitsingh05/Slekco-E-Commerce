"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";

export function AddToCartButton({
  product,
  qty,
  disabled,
  size = "md",
  label = "Add to cart",
}: {
  product: { productId: string; slug: string; name: string; image: string; price: number };
  qty: number;
  disabled?: boolean;
  size?: "md" | "sm";
  label?: string;
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

  const sizeClass = size === "sm" ? "h-8 min-w-0 px-3" : "h-11 min-w-40 px-6";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`flex items-center justify-center rounded-md bg-accent text-[11px] font-bold uppercase tracking-wide text-accent-foreground transition-colors duration-fast ease-out hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50 ${sizeClass}`}
    >
      {added ? "Added ✓" : disabled ? "Out of stock" : label}
    </button>
  );
}
