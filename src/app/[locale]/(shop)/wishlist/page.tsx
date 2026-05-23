"use client";

import HeroPages from "@/components/layout/hero/HeroPages";
import ProductList from "@/components/products/ProductList";
import { wishlistItemToProduct } from "@/lib/wishlist/wishlist";
import { useWishlistStore } from "@/store/wishlistStore";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const loading = useWishlistStore((s) => s.loading);
  const products = items.map(wishlistItemToProduct);

  return (
    <div>
      <HeroPages />
      <section className="container mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8 xl:px-16">


        {loading ? (
          <p className="text-neutral-600">Loading…</p>
        ) : products.length === 0 ? (
          <p className="bg-(--primary) p-4 text-center text-base text-white sm:text-lg">
            Your wishlist is empty.
          </p>
        ) : (
          <ProductList
            products={products}
            className="col-span-12 sm:col-span-6 xl:col-span-4"
          />
        )}
      </section>
    </div>
  );
}
