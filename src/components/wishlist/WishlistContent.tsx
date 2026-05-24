"use client";

import ProductList from "@/components/products/ProductList";
import WishlistSkeleton from "@/components/wishlist/WishlistSkeleton";
import { Link } from "@/i18n/navigation";
import { wishlistItemToProduct } from "@/lib/wishlist/wishlist";
import { useWishlistStore } from "@/store/wishlistStore";
import { useTranslations } from "next-intl";

export default function WishlistContent() {
  const t = useTranslations("products.wishlist");
  const items = useWishlistStore((s) => s.items);
  const loading = useWishlistStore((s) => s.loading);
  const products = items.map(wishlistItemToProduct);

  if (loading) {
    return <WishlistSkeleton />;
  }
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-lg text-black/70">{t("empty")}</p>
        <Link href="/products" className="border border-main bg-main px-6 py-2.5 font-medium text-white hover:bg-main/90">
          {t("continueShopping")}
        </Link>
      </div>
    );
  }
  return (
    <ProductList
      products={products}
      className="col-span-12 sm:col-span-6 xl:col-span-3"
    />
  );
}
