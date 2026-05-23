"use client";

import { useEffect } from "react";
import { useWishlistStore } from "@/store/wishlistStore";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const loadWishlist = useWishlistStore((s) => s.loadWishlist);

  useEffect(() => {
    void loadWishlist();
  }, [loadWishlist]);

  return <>{children}</>;
}
