"use client";

import HeroPages from "@/components/layout/hero/HeroPages";
import ProductList from "@/components/products/ProductList";
import HexagonLoader from "@/components/ui/HexagonLoader";
import { wishlistItemToProduct } from "@/lib/wishlist/wishlist";
import { useWishlistStore } from "@/store/wishlistStore";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const loading = useWishlistStore((s) => s.loading);
  const products = items.map(wishlistItemToProduct);
  if (loading) {
    return (
      <div className="flex min-h-[240px] items-center justify-center py-12">
        <HexagonLoader />
      </div>
    );
  }
  return (
    <div>
      <HeroPages />
      <section className="container mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8 xl:px-16">


        <ProductList
          products={products}
          className="col-span-12 sm:col-span-6 xl:col-span-3"
        />
      </section>
    </div>
  );
}
