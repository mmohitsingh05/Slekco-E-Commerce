"use client";

import { useState } from "react";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { QuantityStepper } from "@/components/product/QuantityStepper";

export function ProductPurchasePanel({
  product,
  outOfStock,
}: {
  product: { productId: string; slug: string; name: string; image: string; price: number };
  outOfStock: boolean;
}) {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-col gap-3">
      <QuantityStepper qty={qty} onChange={setQty} />
      <AddToCartButton product={product} qty={qty} disabled={outOfStock} />
    </div>
  );
}
