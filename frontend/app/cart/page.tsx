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
    <Container className="px-4 py-6 sm:px-6 sm:py-8 md:py-12">
      <div className="mb-4">
        <h1 className="text-2xl font-black uppercase tracking-tight text-ink sm:text-3xl">
          Your Bag{count > 0 ? ` (${count})` : ""}
        </h1>
      </div>

      {count === 0 ? (
        <div className="border border-border bg-surface px-4 py-8 sm:px-6 sm:py-12">
          <EmptyCart />
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-10">
          {/* Left: Items */}
          <div className="min-w-0">
            <div className="rounded-md border border-border bg-surface p-3 sm:p-4">
              <FreeShippingProgress subtotal={subtotal} />
            </div>

            {/* Table header — hidden on mobile */}
            <div className="hidden sm:grid grid-cols-12 gap-4 mt-6 pb-3 border-b border-border text-xs font-bold uppercase text-ink-faint">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            <ul className="divide-y divide-border sm:divide-y-0">
              {itemIds.map((productId) => (
                <CartItem key={productId} productId={productId} />
              ))}
            </ul>

            <div className="pt-4 mt-4 border-t border-border sm:border-t-0 sm:mt-2 sm:pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase transition-colors hover:text-ink-soft"
              >
                ← Continue shopping
              </Link>
            </div>
          </div>

          {/* Right: Order Summary */}
          <aside className="min-w-0 xl:sticky xl:top-24 xl:self-start">
            <div className="rounded-md border border-border bg-surface p-4 sm:p-6">
              <CartSummary variant="page" showViewCart={false} />
            </div>
          </aside>
        </div>
      )}
    </Container>
  );
}
