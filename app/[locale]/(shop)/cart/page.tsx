"use client";

import { useCartStore } from "@/store/cartStore";
import { Link } from "@/i18n/navigation";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const increment = useCartStore((state) => state.increment);

  return (
    <section className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Cart review</h1>
      <p>You currently have {items} item(s) in your cart.</p>
      <div className="flex gap-3">
        <button onClick={increment} className="border rounded px-3 py-2">
          Add mock item
        </button>
        <Link href="/checkout" className="border rounded px-3 py-2">
          Proceed to checkout
        </Link>
      </div>
    </section>
  );
}
