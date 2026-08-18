"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  qty: number;
}

interface CartState {
  items: Record<string, CartItem>;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
}

const maxQty = 99;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: {},

      addItem: (item, qty = 1) =>
        set((state) => {
          const existing = state.items[item.productId];
          const nextQty = Math.min((existing?.qty ?? 0) + qty, maxQty);
          return {
            items: {
              ...state.items,
              [item.productId]: { ...item, qty: nextQty },
            },
          };
        }),

      removeItem: (productId) =>
        set((state) => {
          const items = { ...state.items };
          delete items[productId];
          return { items };
        }),

      setQty: (productId, qty) =>
        set((state) => {
          const existing = state.items[productId];
          if (!existing) return state;
          const clamped = Math.max(1, Math.min(qty, maxQty));
          return {
            items: { ...state.items, [productId]: { ...existing, qty: clamped } },
          };
        }),

      clear: () => set({ items: {} }),
    }),
    { name: "slekco-cart" },
  ),
);

/** Derived selectors used by client components. */
export const selectCount = (state: CartState): number =>
  Object.values(state.items).reduce((sum, item) => sum + item.qty, 0);

export const selectSubtotal = (state: CartState): number =>
  Object.values(state.items).reduce((sum, item) => sum + item.price * item.qty, 0);