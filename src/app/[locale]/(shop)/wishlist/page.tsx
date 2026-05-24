import { Suspense } from "react";
import dynamic from "next/dynamic";
import HeroPages from "@/components/layout/hero/HeroPages";
import WishlistSkeleton from "@/components/wishlist/WishlistSkeleton";

const WishlistContent = dynamic(() => import("@/components/wishlist/WishlistContent"));

export default function WishlistPage() {
  return (
    <div>
      <HeroPages />
      <section className="container mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8 xl:px-16">
        <Suspense fallback={<WishlistSkeleton />}>
          <WishlistContent />
        </Suspense>
      </section>
    </div>
  );
}
