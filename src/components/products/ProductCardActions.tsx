"use client";

import type { MouseEvent } from "react";
import { HiOutlineEye } from "react-icons/hi2";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { CiShop } from "react-icons/ci";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import type { Product } from "@/lib/api/products";
import { toCartPayload } from "@/lib/product";
import CartQuantityStepper from "@/components/cart/CartQuantityStepper";
import { useCartActions } from "@/components/cart/useCartActions";
import { useWishlistStore } from "@/store/wishlistStore";

const iconBtn =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-0 bg-white text-neutral-800 shadow-md transition hover:bg-(--primary) hover:text-white cursor-pointer";

const cartBtn =
  "inline-flex h-10 shrink-0 items-center gap-2 rounded-0 bg-white px-3 text-sm font-medium text-neutral-800 shadow-md transition hover:bg-(--primary) hover:text-white cursor-pointer";

const wishlistBtn =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-0 cursor-pointer transition ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-2";

const wishlistIdle =
  "bg-white text-(--primary) hover:bg-(--primary) hover:text-white";
const wishlistActive = "bg-white text-(--primary) hover:text-(--primary)";

const bar =
  "pointer-events-auto flex gap-2 opacity-100 transition-all duration-300 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100";

function stopClick(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
}

type ProductCardActionsProps = {
  product: Product;
};

export default function ProductCardActions({ product }: ProductCardActionsProps) {
  const t = useTranslations("products");
  const toastT = useTranslations("toast");
  const cart = useCartActions(product.id, toCartPayload(product));
  const addWishlist = useWishlistStore((s) => s.addItem);
  const removeWishlist = useWishlistStore((s) => s.removeItem);
  const inWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  async function toggleWishlist(e: MouseEvent<HTMLButtonElement>) {
    stopClick(e);

    if (inWishlist) {
      const result = await removeWishlist(product.id);
      if (result.ok) toast.success(toastT("wishlistRemoved"));
      else toast.error(toastT(result.messageKey));
      return;
    }

    const result = await addWishlist(toCartPayload(product));
    if (result.ok) toast.success(toastT("wishlistAdded"));
    else toast.error(toastT(result.messageKey));
  }

  return (
    <div className={bar}>
      <button type="button" className={iconBtn} aria-label="Quick view">
        <HiOutlineEye size={22} />
      </button>

      {cart.qty > 0 ? (
        <CartQuantityStepper
          quantity={cart.qty}
          groupLabel={t("addToCart")}
          decreaseLabel={t("decreaseQuantity")}
          increaseLabel={t("increaseQuantity")}
          onDecrease={(e) => {
            stopClick(e);
            void cart.decrease();
          }}
          onIncrease={(e) => {
            stopClick(e);
            void cart.add();
          }}
        />
      ) : (
        <button
          type="button"
          className={cartBtn}
          aria-label={t("addToCart")}
          onClick={(e) => {
            stopClick(e);
            void cart.add();
          }}
        >
          <CiShop size={22} aria-hidden />
          <span className="text-base">{t("addToCart")}</span>
        </button>
      )}

      <button
        type="button"
        className={`${wishlistBtn} ${inWishlist ? wishlistActive : wishlistIdle}`}
        aria-pressed={inWishlist}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        onClick={toggleWishlist}
      >
        {inWishlist ? <IoIosHeart size={25} aria-hidden /> : <IoIosHeartEmpty size={25} aria-hidden />}
      </button>
    </div>
  );
}
