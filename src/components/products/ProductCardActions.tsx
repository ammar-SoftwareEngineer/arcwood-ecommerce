"use client";

/**
 * Hover actions on product card: quick view, cart, wishlist.
 * Owns cart/wishlist state and passes handlers into ProductQuickViewModal (no duplicate stores there).
 */
import { useState, type MouseEvent } from "react";
import { HiOutlineEye } from "react-icons/hi2";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { CiShop } from "react-icons/ci";
import { useTranslations } from "next-intl";
import type { Product } from "@/lib/api/products";
import { toCartPayload, toWishlistPayload } from "@/lib/product";
import { addToCartWithToast, decreaseCartWithToast } from "@/lib/cart/cart-toast";
import { addWishlistWithToast, removeWishlistWithToast } from "@/lib/wishlist/wishlist-toast";
import CartQuantityStepper from "@/components/cart/CartQuantityStepper";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import ProductQuickViewModal from "./ProductQuickViewModal";

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

/** Card is wrapped in <Link>; stop navigation when clicking action buttons. */
function stopCardNavigation(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
}

type ProductCardActionsProps = {
  product: Product;
};

export default function ProductCardActions({ product }: ProductCardActionsProps) {
  const t = useTranslations("products");
  const toastT = useTranslations("toast");
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const cartPayload = toCartPayload(product);
  const addItem = useCartStore((s) => s.addItem);
  const decreaseItem = useCartStore((s) => s.decreaseItem);
  const cartQty = useCartStore((s) => s.items.find((i) => i.product_id === product.id)?.quantity ?? 0);

  const addWishlist = useWishlistStore((s) => s.addItem);
  const removeWishlist = useWishlistStore((s) => s.removeItem);
  const inWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  async function addToCart() {
    await addToCartWithToast(addItem, toastT, cartPayload, cartQty);
  }

  async function decreaseCart() {
    await decreaseCartWithToast(decreaseItem, toastT, product.id);
  }

  async function toggleWishlist() {
    if (inWishlist) {
      await removeWishlistWithToast(removeWishlist, toastT, product.id);
      return;
    }
    await addWishlistWithToast(addWishlist, toastT, toWishlistPayload(product));
  }

  return (
    <>
      <div className={bar}>
        <button
          type="button"
          className={iconBtn}
          aria-label={t("quickView.title")}
          onClick={(e) => {
            stopCardNavigation(e);
            setQuickViewOpen(true);
          }}
        >
          <HiOutlineEye size={22} />
        </button>

        {cartQty > 0 ? (
          <CartQuantityStepper
            quantity={cartQty}
            groupLabel={t("quantity")}
            decreaseLabel={t("decreaseQuantity")}
            increaseLabel={t("increaseQuantity")}
            onDecrease={(e) => {
              stopCardNavigation(e);
              void decreaseCart();
            }}
            onIncrease={(e) => {
              stopCardNavigation(e);
              void addToCart();
            }}
          />
        ) : (
          <button
            type="button"
            className={cartBtn}
            aria-label={t("addToCart")}
            onClick={(e) => {
              stopCardNavigation(e);
              void addToCart();
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
          aria-label={inWishlist ? t("quickView.removeFromWishlist") : t("quickView.addToWishlist")}
          onClick={(e) => {
            stopCardNavigation(e);
            void toggleWishlist();
          }}
        >
          {inWishlist ? (
            <IoIosHeart size={25} aria-hidden />
          ) : (
            <IoIosHeartEmpty size={25} aria-hidden />
          )}
        </button>
      </div>

      <ProductQuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
        inWishlist={inWishlist}
        onToggleWishlist={toggleWishlist}
        cartQty={cartQty}
        onAddToCart={addToCart}
        onDecreaseCart={decreaseCart}
      />
    </>
  );
}
