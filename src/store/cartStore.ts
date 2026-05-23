import { create } from "zustand";
import {
  addCartItemAction,
  decreaseCartItemAction,
  loadCartAction,
  removeCartItemAction,
  type CartResult,
} from "@/actions/cart";
import type { CartItem } from "./types";

type CartStore = {
  items: CartItem[];
  loading: boolean;
  loadCart: () => Promise<void>;
  addItem: (item: Omit<CartItem, "id" | "quantity">) => Promise<CartResult>;
  decreaseItem: (productId: string) => Promise<CartResult>;
  removeItem: (productId: string) => Promise<CartResult>;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  loading: false,

  loadCart: async () => {
    set({ loading: true });
    const items = await loadCartAction();
    set({ items, loading: false });
  },

  addItem: async (item) => {
    const previous = get().items;
    const existing = previous.find((i) => i.product_id === item.product_id);

    set({
      items: existing
        ? previous.map((i) =>
            i.product_id === item.product_id ? { ...i, quantity: i.quantity + 1 } : i
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
              i.product_id === productId ? { ...i, quantity: i.quantity - 1 } : i
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
    if (!result.ok) set({ items: previous });

    return result;
  },
}));

export function cartItemCount(items: CartItem[]) {
  return items.reduce((n, item) => n + item.quantity, 0);
}
