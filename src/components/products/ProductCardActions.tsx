"use client";

import { useEffect, useId, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { HiOutlineEye } from "react-icons/hi2";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { CiShop } from "react-icons/ci";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import type { Product } from "@/lib/api/products";
import { productSlug, toCartPayload } from "@/lib/products/product";
import { toggleProductWishlist } from "@/lib/products/product-actions";
import { addToCartWithToast, decreaseCartWithToast } from "@/components/cart";
import CartQuantityStepper from "@/components/cart/CartQuantityStepper";
import ProductPurchaseBar from "@/components/products/ProductPurchaseBar";
import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

function stopLink(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
}

/** نافذة المعاينة السريعة — تُستخدم من بطاقة المنتج فقط */
function ProductQuickView({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("products");
  const titleId = useId();
  const href = `/products/${productSlug(product.name)}` as const;
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !ready) return null;

  return createPortal(
    <div className="fixed inset-0 z-2200 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-[min(90dvh,720px)] w-full max-w-3xl flex-col overflow-hidden bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
          <h2 id={titleId} className="text-lg font-semibold">
            {t("quickView.title")}
          </h2>
          <button type="button" onClick={onClose} aria-label={t("quickView.close")} className="h-9 w-9 border border-black/15">
            <FontAwesomeIcon icon={faXmark} className="mx-auto h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 md:p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative aspect-square bg-neutral-50">
              {product.image_url ? (
                <Image src={product.image_url} alt={product.name} fill className="object-cover" sizes="400px" />
              ) : (
                <span className="flex h-full items-center justify-center text-sm text-neutral-400">{product.name}</span>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {product.is_new && (
                <span className="quick-view-badge w-fit text-xs font-medium uppercase text-white">{t("new")}</span>
              )}
              {product.category && (
                <p className="w-fit bg-(--primary) px-2 py-1 text-sm font-medium uppercase text-white">{product.category}</p>
              )}
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-main text-xl font-medium tabular-nums">{product.price_egp.toLocaleString()} EGP</p>
              <Link href={href} onClick={onClose} className="text-sm font-medium text-main hover:underline">
                {t("quickView.viewDetails")}
              </Link>
              <ProductPurchaseBar
                product={product}
                className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row sm:items-center"
                stepperClassName="w-full flex-1 justify-center gap-3 px-2 py-1.5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** أزرار البطاقة: معاينة + سلة + مفضلة */
export default function ProductCardActions({ product }: { product: Product }) {
  const t = useTranslations("products");
  const toastT = useTranslations("toast");
  const [quickOpen, setQuickOpen] = useState(false);

  const cartPayload = toCartPayload(product);
  const addItem = useCartStore((s) => s.addItem);
  const decreaseItem = useCartStore((s) => s.decreaseItem);
  const cartQty = useCartStore((s) => s.items.find((i) => i.product_id === product.id)?.quantity ?? 0);
  const addWishlist = useWishlistStore((s) => s.addItem);
  const removeWishlist = useWishlistStore((s) => s.removeItem);
  const inWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  return (
    <>
      <div className="pointer-events-auto flex gap-2 opacity-100 transition-all duration-300 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center bg-white shadow-md hover:bg-(--primary) hover:text-white"
          aria-label={t("quickView.title")}
          onClick={(e) => {
            stopLink(e);
            setQuickOpen(true);
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
              stopLink(e);
              void decreaseCartWithToast(decreaseItem, toastT, product.id);
            }}
            onIncrease={(e) => {
              stopLink(e);
              void addToCartWithToast(addItem, toastT, cartPayload, cartQty);
            }}
          />
        ) : (
          <button
            type="button"
            className="inline-flex h-10 items-center bg-white px-3 shadow-md hover:bg-(--primary) hover:text-white"
            aria-label={t("addToCart")}
            onClick={(e) => {
              stopLink(e);
              void addToCartWithToast(addItem, toastT, cartPayload, cartQty);
            }}
          >
            <CiShop size={22} />
          </button>
        )}

        <button
          type="button"
          className={`inline-flex h-9 w-9 items-center justify-center ${
            inWishlist ? "bg-white text-(--primary)" : "bg-white text-(--primary) hover:bg-(--primary) hover:text-white"
          }`}
          aria-pressed={inWishlist}
          onClick={(e) => {
            stopLink(e);
            void toggleProductWishlist(product, inWishlist, addWishlist, removeWishlist, toastT);
          }}
        >
          {inWishlist ? <IoIosHeart size={25} /> : <IoIosHeartEmpty size={25} />}
        </button>
      </div>

      <ProductQuickView product={product} open={quickOpen} onClose={() => setQuickOpen(false)} />
    </>
  );
}
