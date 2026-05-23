"use client";

/**
 * Loads cart + wishlist once after mount (logged-in user data from Server Actions).
 * Wrap app layout so header badges and cards share the same Zustand state.
 */
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
