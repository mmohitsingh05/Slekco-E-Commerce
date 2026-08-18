"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { CrossSell } from "@/components/cart/CrossSell";
import { FreeShippingProgress } from "@/components/cart/FreeShippingProgress";
import { CloseIcon } from "@/components/ui/icons";
import { selectCount, selectSubtotal, useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import type { ProductListItem } from "@/lib/types";

export function CartDrawer({ crossSellPool = [] }: { crossSellPool?: ProductListItem[] }) {
  const isOpen = useUiStore((state) => state.isCartOpen);
  const closeCart = useUiStore((state) => state.closeCart);
  const count = useCartStore(selectCount);
  const subtotal = useCartStore(selectSubtotal);
  const items = useCartStore((state) => state.items);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemIds = Object.keys(items);

  const crossSell = useMemo(() => {
    const inCart = new Set(Object.keys(items));
    return crossSellPool.filter((product) => !inCart.has(product._id)).slice(0, 3);
  }, [crossSellPool, items]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 z-40 bg-ink/40"
          />
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            tabIndex={-1}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-canvas shadow-drawer outline-none"
          >
            <header className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-h3 font-semibold text-ink">
                Cart{count > 0 ? ` (${count})` : ""}
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-10 w-10 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-surface hover:text-ink"
              >
                <CloseIcon />
              </button>
            </header>

            {count === 0 ? (
              <div className="flex flex-1 items-start justify-center overflow-y-auto px-6">
                <EmptyCart />
              </div>
            ) : (
              <>
                <FreeShippingProgress subtotal={subtotal} />
                <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
                  {itemIds.map((productId) => (
                    <CartItem key={productId} productId={productId} />
                  ))}
                </ul>
                <CrossSell products={crossSell} />
                <footer className="px-6 py-4">
                  <CartSummary />
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}