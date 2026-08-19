"use client";

import Link from "next/link";
import { useCartStore, selectCount, selectSubtotal } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { content } from "@/lib/content";
import { formatINR } from "@/lib/format";

export function CartSummary({
  onCheckout,
  variant = "drawer",
  showViewCart = true,
}: {
  onCheckout?: () => void;
  variant?: "drawer" | "page";
  showViewCart?: boolean;
}) {
  const items = useCartStore((state) => state.items);
  const count = useCartStore(selectCount);
  const subtotal = useCartStore(selectSubtotal);
  const remaining = content.freeShippingThreshold - subtotal;
  const unlocked = remaining <= 0;
  const closeCart = useUiStore((s) => s.closeCart);

  const total = Math.max(0, subtotal);

  if (variant === "page") {
    return (
      <div className="space-y-4">
        <h2 className="font-black uppercase tracking-tight">Order Summary</h2>
        <div className="space-y-2 text-body-sm">
          <p className="text-ink-faint">
            {count} {count === 1 ? "item" : "items"}
          </p>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-bold">{formatINR(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className={unlocked ? "text-success font-bold" : "font-bold"}>
              {unlocked ? "Free" : formatINR(content.freeShippingThreshold)}
            </span>
          </div>
          {!unlocked && (
            <p className="text-[11px] text-ink-faint">
              Spend {formatINR(content.freeShippingThreshold - subtotal)} more for free shipping
            </p>
          )}
          <div className="border-t border-border pt-2 text-sm font-black">
            <div className="flex justify-between">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {showViewCart && (
            <Link
              href="/cart"
              className="flex h-11 w-full items-center justify-center border border-border text-body-sm font-medium transition-colors hover:bg-canvas"
            >
              View cart
            </Link>
          )}
          <button
            type="button"
            onClick={onCheckout}
            disabled={count === 0}
            className="h-12 w-full rounded-md bg-gradient-to-b from-accent to-[#c8e430] text-accent-foreground font-black uppercase tracking-wide shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all hover:from-accent-hover hover:to-[#e6c52e] hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:opacity-50"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    );
  }

  // Drawer variant
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-ink-faint">
            Subtotal ({count} {count === 1 ? "item" : "items"})
          </span>
          <span className="font-bold whitespace-nowrap">{formatINR(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-ink-faint">Shipping</span>
          <span className={unlocked ? "font-bold text-success whitespace-nowrap" : "font-bold whitespace-nowrap"}>
            {unlocked ? "Free" : "—"}
          </span>
        </div>
      </div>

      <div className="border-t border-border pt-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-ink">Estimated total</span>
          <span className="text-sm font-black whitespace-nowrap">{formatINR(total)}</span>
        </div>
        <p className="mt-1 text-[10px] text-ink-faint">Taxes and shipping calculated at checkout</p>
      </div>

      <div className="space-y-2 pt-1">
        <Link
          href="/cart"
          onClick={closeCart}
          className="flex h-11 w-full items-center justify-center rounded-md bg-gradient-to-b from-accent to-[#c8e430] text-[11px] font-bold uppercase tracking-wide text-accent-foreground shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all hover:from-accent-hover hover:to-[#e6c52e] hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
        >
          View cart
        </Link>
        <Link
          href="/products"
          onClick={closeCart}
          className="flex h-10 w-full items-center justify-center rounded-md border border-border text-[11px] font-bold uppercase tracking-wide text-ink transition-colors hover:bg-canvas"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
