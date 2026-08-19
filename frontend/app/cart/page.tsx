"use client";

import Link from "next/link";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Container } from "@/components/ui/Container";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { FreeShippingProgress } from "@/components/cart/FreeShippingProgress";
import { selectCount, selectSubtotal, useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const count = useCartStore(selectCount);
  const subtotal = useCartStore(selectSubtotal);
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const itemIds = Object.keys(items);

  return (
    <Container className="py-8 md:py-12">
      <div className="mb-4">
        <h1 className="text-3xl font-black uppercase tracking-tight text-ink">
          Your Bag{count > 0 ? ` (${count})` : ""}
        </h1>
      </div>

      {count === 0 ? (
        <div className="border border-border bg-surface px-6 py-12">
          <EmptyCart />
        </div>
      ) : (
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_400px]">
          {/* Left: Items */}
          <div className="min-w-0">
            <FreeShippingProgress subtotal={subtotal} />

            {/* Table header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 mt-6 pb-3 border-b border-border text-xs font-bold uppercase text-ink-faint">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            <ul>
              {itemIds.map((productId) => (
                <CartItem key={productId} productId={productId} />
              ))}
            </ul>

            <div className="pt-2 mt-2">
              <Link
                href="/products"
                className="text-xs font-bold uppercase underline transition-colors hover:text-ink-soft"
              >
                ← Continue shopping
              </Link>
            </div>
          </div>

          {/* Right: Order Summary */}
          <aside className="min-w-0 xl:sticky xl:top-24 xl:self-start">
            <CartSummary variant="page" showViewCart={false} />
          </aside>
        </div>
      )}
    </Container>
  );
}
