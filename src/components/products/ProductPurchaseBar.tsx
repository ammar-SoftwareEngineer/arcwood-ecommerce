"use client";

import { useLocale, useTranslations } from "next-intl";
import { CiShare2, CiShop } from "react-icons/ci";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import CartQuantityStepper from "@/components/cart/CartQuantityStepper";
import { addToCartWithToast, decreaseCartWithToast } from "@/components/cart";
import { shareProduct, toggleProductWishlist } from "@/lib/products/product-actions";
import type { Product } from "@/lib/api/products";
import { toCartPayload } from "@/lib/products/product";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

type Props = {
  product: Product;
  className?: string;
  stepperClassName?: string;
};

export default function ProductPurchaseBar({
  product,
  className = "flex w-full flex-col gap-3 border-t border-black/10 pt-5 sm:flex-row sm:flex-wrap sm:items-stretch sm:pt-6",
  stepperClassName = "md:w-fit h-full w-full justify-center gap-3 px-2 py-1.5",
}: Props) {
  const locale = useLocale();
  const t = useTranslations("products");
  const toastT = useTranslations("toast");
  const payload = toCartPayload(product);

  const addItem = useCartStore((s) => s.addItem);
  const decreaseItem = useCartStore((s) => s.decreaseItem);
  const qty = useCartStore((s) => s.items.find((i) => i.product_id === product.id)?.quantity ?? 0);
  const addWishlist = useWishlistStore((s) => s.addItem);
  const removeWishlist = useWishlistStore((s) => s.removeItem);
  const inWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  const btnMain =
    "inline-flex w-full min-h-11 items-center justify-center gap-2 border border-main bg-main px-4 py-3 text-sm font-medium text-white hover:bg-main/90 sm:flex-1 sm:text-base";
  const btnGhost =
    "inline-flex w-full min-h-11 items-center justify-center gap-2 border border-main bg-white px-4 py-3 text-sm font-medium text-main hover:bg-main/5 sm:w-auto sm:min-w-0 sm:text-base";

  return (
    <div className={className}>
      {qty > 0 ? (
        <CartQuantityStepper
          quantity={qty}
          groupLabel={t("quantity")}
          decreaseLabel={t("decreaseQuantity")}
          increaseLabel={t("increaseQuantity")}
          onDecrease={() => void decreaseCartWithToast(decreaseItem, toastT, product.id)}
          onIncrease={() => void addToCartWithToast(addItem, toastT, payload, qty)}
          className={stepperClassName}
        />
      ) : (
        <button type="button" className={btnMain} onClick={() => void addToCartWithToast(addItem, toastT, payload, qty)}>
          <CiShop size={22} aria-hidden />
          {t("addToCart")}
        </button>
      )}

      <button
        type="button"
        aria-pressed={inWishlist}
        className={`${btnGhost} sm:max-w-xs ${inWishlist ? "border-(--primary) bg-(--primary)/5" : ""}`}
        onClick={() => void toggleProductWishlist(product, inWishlist, addWishlist, removeWishlist, toastT)}
      >
        {inWishlist ? <IoIosHeart size={22} className="text-(--primary)" /> : <IoIosHeartEmpty size={22} />}
        {inWishlist ? t("quickView.removeFromWishlist") : t("quickView.addToWishlist")}
      </button>

      <button type="button" className={btnGhost} onClick={() => void shareProduct(product, locale, toastT)}>
        <CiShare2 size={22} aria-hidden />
        {t("quickView.share")}
      </button>
    </div>
  );
}
