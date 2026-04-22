import { create } from "zustand";

type UiState = {
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  isCartOpen: false,
  setCartOpen: (open) => set({ isCartOpen: open }),
}));
