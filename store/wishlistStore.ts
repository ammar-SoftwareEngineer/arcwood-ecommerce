import { create } from "zustand";

type WishlistState = {
  ids: string[];
  toggle: (id: string) => void;
};

export const useWishlistStore = create<WishlistState>((set) => ({
  ids: [],
  toggle: (id) =>
    set((state) => ({
      ids: state.ids.includes(id)
        ? state.ids.filter((itemId) => itemId !== id)
        : [...state.ids, id],
    })),
}));
