"use client";

/** Loads cart + wishlist from Server Actions once on mount (shared Zustand for header/cards/drawer). */
import { useEffect } from "react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const loadWishlist = useWishlistStore((s) => s.loadWishlist);
  const loadCart = useCartStore((s) => s.loadCart);

  useEffect(() => {
    void loadWishlist();
    void loadCart();
  }, [loadWishlist, loadCart]);

  return <>{children}</>;
}
