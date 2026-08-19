"use client";

import { useEffect, useCallback, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore, selectCount } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { CloseIcon } from "@/components/ui/icons";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { FreeShippingProgress } from "@/components/cart/FreeShippingProgress";
import { CartItem } from "@/components/cart/CartItem";
import { CrossSell } from "@/components/cart/CrossSell";
import { CartSummary } from "@/components/cart/CartSummary";
import { selectSubtotal } from "@/store/cart-store";
import type { ProductListItem } from "@/lib/types";

export function CartDrawer({ crossSellPool = [] }: { crossSellPool?: ProductListItem[] }) {
  const isOpen = useUiStore((s) => s.isCartOpen);
  const closeCart = useUiStore((s) => s.closeCart);
  const count = useCartStore(selectCount);
  const subtotal = useCartStore(selectSubtotal);
  const items = useCartStore((s) => s.items);
  const panelRef = useRef<HTMLDivElement>(null);

  const recommended = useMemo(() => {
    const inCart = new Set(Object.keys(items));
    return crossSellPool.filter((product) => !inCart.has(product._id)).slice(0, 3);
  }, [crossSellPool, items]);

  const onClose = useCallback(() => {
    closeCart();
  }, [closeCart]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  const isEmpty = count === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
            onClick={onClose}
          />

          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            tabIndex={-1}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-canvas shadow-drawer focus:outline-none"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          >
            {/* Sticky header */}
            <header className="flex items-center justify-between px-6 py-4">
              <h2
                id="cart-drawer-title"
                className="text-2xl font-black uppercase tracking-tight text-ink"
              >
                Cart{count > 0 && ` (${count})`}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-md text-ink transition-colors hover:bg-canvas hover:text-ink-faint"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </header>

            {/* Scrollable middle section */}
            {!isEmpty ? (
              <div className="flex-1 overflow-y-auto overscroll-contain">
                {/* Shipping bar — at top of scroll area */}
                <div className="border-y border-border px-6 py-3">
                  <FreeShippingProgress subtotal={subtotal} />
                </div>

                {/* YOUR CART section */}
                <section className="px-6 pt-5 pb-1">
                  <h3 className="pb-2 text-[11px] font-bold uppercase tracking-wide text-ink-faint">
                    Your cart
                  </h3>
                  <ul className="divide-y divide-border">
                    {Object.keys(items).map((id) => (
                      <CartItem key={id} productId={id} compact />
                    ))}
                  </ul>
                </section>

                {/* YOU MAY ALSO LIKE section */}
                {recommended.length > 0 && (
                  <section className="border-t border-border">
                    <CrossSell products={recommended} />
                  </section>
                )}
              </div>
            ) : (
              /* Empty state */
              <div className="flex flex-1 items-center justify-center px-6">
                <EmptyCart />
              </div>
            )}

            {/* Sticky footer summary */}
            {!isEmpty && (
              <footer className="border-t border-border px-6 py-4">
                <CartSummary variant="drawer" />
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
