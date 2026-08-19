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
      className={`flex items-center justify-center rounded-md bg-gradient-to-b from-accent to-[#c8e430] text-[11px] font-bold uppercase tracking-wide text-accent-foreground shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-fast ease-out hover:from-accent-hover hover:to-[#e6c52e] hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:cursor-not-allowed disabled:opacity-50 ${sizeClass}`}
    >
      {added ? "Added ✓" : disabled ? "Out of stock" : label}
    </button>
  );
}
