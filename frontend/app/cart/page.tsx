"use client";

import Link from "next/link";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Container } from "@/components/ui/Container";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { CartIcon } from "@/components/ui/icons";
import { selectCount, useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const count = useCartStore(selectCount);
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const itemIds = Object.keys(items);

  return (
    <Container className="py-8 md:py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-h1 font-semibold tracking-tight text-ink">
          Your cart{count > 0 ? ` (${count})` : ""}
        </h1>
        {count > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-body-sm text-ink-soft underline-offset-2 transition-colors hover:text-ink hover:underline"
          >
            Clear cart
          </button>
        )}
      </div>

      {count === 0 ? (
        <div className="rounded-lg border border-border bg-surface/50 px-6 py-12">
          <EmptyCart />
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <ul className="flex flex-col gap-4">
            {itemIds.map((productId) => (
              <CartItem key={productId} productId={productId} />
            ))}
          </ul>
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="rounded-lg border border-border bg-surface p-6">
              <CartSummary showViewCart={false} />
            </div>
          </aside>
        </div>
      )}

      <p className="mt-8 flex items-center gap-2 text-body-sm text-ink-faint">
        <CartIcon />
        Cart is stored locally on your device — it persists across visits.
      </p>
      <p className="mt-1 text-body-sm text-ink-faint">
        Want to keep browsing?{" "}
        <Link href="/products" className="text-accent underline-offset-2 hover:underline">
          Explore the catalog
        </Link>
      </p>
    </Container>
  );
}