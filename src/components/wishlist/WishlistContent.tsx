"use client";

import ProductList from "@/components/products/ProductList";
import WishlistSkeleton from "@/components/wishlist/WishlistSkeleton";
import { wishlistItemToProduct } from "@/lib/wishlist/wishlist";
import { useWishlistStore } from "@/store/wishlistStore";

export default function WishlistContent() {
  const items = useWishlistStore((s) => s.items);
  const loading = useWishlistStore((s) => s.loading);
  const products = items.map(wishlistItemToProduct);

  if (loading) {
    return <WishlistSkeleton />;
  }

  return (
    <ProductList
      products={products}
      className="col-span-12 sm:col-span-6 xl:col-span-3"
    />
  );
}
