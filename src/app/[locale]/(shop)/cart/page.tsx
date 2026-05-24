import { Suspense } from "react";
import dynamic from "next/dynamic";
import HeroPages from "@/components/layout/hero/HeroPages";
import CartSkeleton from "@/components/cart/CartSkeleton";

const CartTable = dynamic(() => import("@/components/cart/CartTable"));

export default function CartPage() {
  return (
    <section>
      <HeroPages />
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Suspense fallback={<CartSkeleton />}>
          <CartTable />
        </Suspense>
      </div>
    </section>
  );
}
