"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";

export function AddToCartButton({
  product,
  qty,
  disabled,
}: {
  product: { productId: string; slug: string; name: string; image: string; price: number };
  qty: number;
  disabled?: boolean;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(product, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className="flex h-11 min-w-40 items-center justify-center rounded-md bg-accent px-6 text-body-sm font-medium text-surface transition-colors duration-fast ease-out hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
    >
      {added ? "Added ✓" : disabled ? "Out of stock" : "Add to cart"}
    </button>
  );
}