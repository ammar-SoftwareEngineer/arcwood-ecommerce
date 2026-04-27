"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import { products } from "@/lib/catalog";

export default function WishlistPage() {
  const ids = useWishlistStore((state) => state.ids);
  const toggle = useWishlistStore((state) => state.toggle);
  const items = products.filter((product) => ids.includes(product.id));

  return (
    <section className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Wishlist</h1>
      <div className="flex gap-2">
        {products.map((product) => (
          <button key={product.id} onClick={() => toggle(product.id)} className="border rounded px-2 py-1 text-sm">
            {ids.includes(product.id) ? `Remove ${product.title}` : `Save ${product.title}`}
          </button>
        ))}
      </div>
      <ul className="list-disc pl-6">
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </section>
  );
}
