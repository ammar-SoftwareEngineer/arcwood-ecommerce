/**
 * Client wishlist state (Zustand) — same optimistic pattern as cartStore.
 */
import { create } from "zustand";
import {
  addWishlistItemAction,
  loadWishlistAction,
  removeWishlistItemAction,
  type WishlistResult,
} from "@/actions/wishlist";
import type { WishlistItem } from "./types";

type WishlistStore = {
  items: WishlistItem[];
  loading: boolean;
  loadWishlist: () => Promise<void>;
  addItem: (item: Omit<WishlistItem, "id">) => Promise<WishlistResult>;
  removeItem: (productId: string) => Promise<WishlistResult>;
  isInWishlist: (productId: string) => boolean;
};

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  loading: false,

  loadWishlist: async () => {
    set({ loading: true });
    const items = await loadWishlistAction();
    set({ items, loading: false });
  },

  addItem: async (item) => {
    if (get().isInWishlist(item.product_id)) return { ok: true };

    const previous = get().items;
    set({
      items: [...previous, { ...item, id: `temp-${item.product_id}` }],
    }); // optimistic until server confirms

    const result = await addWishlistItemAction(item.product_id);

    if (!result.ok) {
      set({ items: previous });
      return result;
    }

    set({ items: await loadWishlistAction() });

    return { ok: true };
  },

  removeItem: async (productId) => {
    const previous = get().items;
    set({ items: previous.filter((i) => i.product_id !== productId) });

    const result = await removeWishlistItemAction(productId);

    if (!result.ok) set({ items: previous });

    return result;
  },

  isInWishlist: (productId) => get().items.some((i) => i.product_id === productId),
}));
