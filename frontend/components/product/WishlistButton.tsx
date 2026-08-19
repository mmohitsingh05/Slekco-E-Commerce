"use client";

import { useState } from "react";
import { HeartIcon } from "@/components/ui/icons";

export function WishlistButton() {
  const [filled, setFilled] = useState(false);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setFilled((f) => !f);
      }}
      aria-label={filled ? "Remove from wishlist" : "Add to wishlist"}
      className="text-gray-600 transition-colors hover:text-brand-dark"
    >
      <HeartIcon filled={filled} className="h-5 w-5" />
    </button>
  );
}
