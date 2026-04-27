import { create } from "zustand";

type CartState = {
  items: number;
  increment: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: 0,
  increment: () => set((state) => ({ items: state.items + 1 })),
}));
