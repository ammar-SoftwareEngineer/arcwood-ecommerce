/**
 * Client cart state (Zustand).
 * Flow: optimistic UI update → Server Action → reload or rollback on error.
 */
import { create } from "zustand";
import {
  addCartItemAction,
  decreaseCartItemAction,
  loadCartAction,
  removeCartItemAction,
  type CartResult,
} from "@/actions/cart";
import type { CartItem } from "./types";
import type { CartCoupon, CouponResult } from "@/lib/cart/coupon";
import { validateCoupon } from "@/lib/cart/coupon";

type CartStore = {
  items: CartItem[];
  loading: boolean;
  coupon: CartCoupon | null;
  loadCart: () => Promise<void>;
  addItem: (item: Omit<CartItem, "id" | "quantity">) => Promise<CartResult>;
  decreaseItem: (productId: string) => Promise<CartResult>;
  removeItem: (productId: string) => Promise<CartResult>;
  applyCoupon: (code: string) => CouponResult;
  removeCoupon: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  loading: false,
  coupon: null,

  loadCart: async () => {
    set({ loading: true });
    const items = await loadCartAction();
    set({ items, loading: false });
  },

  addItem: async (item) => {
    const previous = get().items;
    const existing = previous.find((i) => i.product_id === item.product_id);

    // Optimistic: bump qty or append temp row until server confirms.
    set({
      items: existing
        ? previous.map((i) =>
            i.product_id === item.product_id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...previous, { ...item, id: `temp-${item.product_id}`, quantity: 1 }],
    });

    const result = await addCartItemAction(item.product_id);

    if (!result.ok) {
      set({ items: previous });
      return result;
    }

    set({ items: await loadCartAction() });
    return { ok: true };
  },

  decreaseItem: async (productId) => {
    const previous = get().items;
    const current = previous.find((i) => i.product_id === productId);
    if (!current) return { ok: true };

    set({
      items:
        current.quantity <= 1
          ? previous.filter((i) => i.product_id !== productId)
          : previous.map((i) =>
              i.product_id === productId ? { ...i, quantity: i.quantity - 1 } : i,
            ),
    });

    const result = await decreaseCartItemAction(productId);
    if (!result.ok) {
      set({ items: previous });
      return result;
    }

    set({ items: await loadCartAction() });
    return { ok: true };
  },

  removeItem: async (productId) => {
    const previous = get().items;
    set({ items: previous.filter((i) => i.product_id !== productId) });

    const result = await removeCartItemAction(productId);
    if (!result.ok) {
      set({ items: previous });
      return result;
    }

    return result;
  },

  applyCoupon: (code) => {
    const result = validateCoupon(code);
    if (result.ok) set({ coupon: result.coupon });
    return result;
  },

  /** Coupon is client-only for now — not persisted to Supabase until checkout. */
  removeCoupon: () => set({ coupon: null }),
}));
