"use client";

/**
 * Quick view dialog: product summary + cart / wishlist / share.
 * Rendered with createPortal(document.body) so it appears above swiper/cards (z-index + no overflow clip).
 * Cart/wishlist handlers come from ProductCardActions — single source of truth for store state.
 */
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { CiShop, CiShare2 } from "react-icons/ci";
import { toast } from "sonner";
import type { Product } from "@/lib/api/products";
import { productSlug } from "@/lib/product";
import { Link, getPathname } from "@/i18n/navigation";
import CartQuantityStepper from "@/components/cart/CartQuantityStepper";

type ProductQuickViewModalProps = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  inWishlist: boolean;
  onToggleWishlist: () => void | Promise<void>;
  cartQty: number;
  onAddToCart: () => void | Promise<void>;
  onDecreaseCart: () => void | Promise<void>;
};

const primaryBtn =
  "inline-flex flex-1 items-center justify-center gap-2 rounded-0 border border-main bg-main px-4 py-2.5 text-base font-medium text-white transition hover:bg-main/90 cursor-pointer";

const outlineBtn =
  "inline-flex items-center justify-center gap-2 rounded-0 border border-main bg-white px-4 py-2.5 text-base font-medium text-main transition hover:bg-main/5 cursor-pointer";

export default function ProductQuickViewModal({
  product,
  isOpen,
  onClose,
  inWishlist,
  onToggleWishlist,
  cartQty,
  onAddToCart,
  onDecreaseCart,
}: ProductQuickViewModalProps) {
  const t = useTranslations("products");
  const toastT = useTranslations("toast");
  const locale = useLocale();
  const titleId = useId();
  const productHref = `/products/${productSlug(product.name)}` as const;

  // Portal targets document.body — only after mount (no SSR mismatch).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [isOpen, onClose]);

  async function onShare() {
    const url = `${window.location.origin}${getPathname({ locale, href: productHref })}`;

    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title: product.name, text: product.name, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success(toastT("linkCopied"));
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        toast.error(toastT("shareFailed"));
      }
    }
  }

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[2200] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[min(90dvh,720px)] w-full max-w-3xl flex-col overflow-hidden rounded-0 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-black/10 px-4 py-3">
          <h2 id={titleId} className="text-lg font-semibold text-black/90">
            {t("quickView.title")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("quickView.close")}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-0 border border-black/15 text-black/70 transition hover:bg-black/5"
          >
            <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="grid gap-6 p-4 md:grid-cols-2 md:p-6">
            <div className="relative aspect-square bg-neutral-50">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              ) : (
                <span className="flex h-full items-center justify-center px-4 text-sm text-neutral-400">
                  {product.name}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {product.is_new ? (
                  <span className="quick-view-badge text-xs font-medium uppercase text-white">
                    {t("new")}
                  </span>
                ) : null}
                {product.is_best_seller ? (
                  <span className="quick-view-badge text-xs font-medium uppercase text-white">
                    {t("quickView.bestSeller")}
                  </span>
                ) : null}
              </div>

              {product.category ? (
                <p className="w-fit bg-(--primary) px-2 py-1 text-sm font-medium uppercase tracking-wide text-white">
                  {product.category}
                </p>
              ) : null}

              <h3 className="text-xl font-semibold text-neutral-900">{product.name}</h3>
              <p className="text-main text-xl font-medium tabular-nums">
                {product.price_egp.toLocaleString()} EGP
              </p>

              <Link
                href={productHref}
                onClick={onClose}
                className="text-sm font-medium text-main underline-offset-2 hover:underline"
              >
                {t("quickView.viewDetails")}
              </Link>

              <div className="mt-auto flex flex-col gap-3 pt-2">
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex w-full items-center gap-3">
                    {cartQty > 0 ? (
                      <CartQuantityStepper
                        quantity={cartQty}
                        groupLabel={t("addToCart")}
                        decreaseLabel={t("decreaseQuantity")}
                        increaseLabel={t("increaseQuantity")}
                        onDecrease={() => void onDecreaseCart()}
                        onIncrease={() => void onAddToCart()}
                        className="w-full flex-1 justify-center gap-3 px-2 py-1.5"
                      />
                    ) : (
                      <button type="button" className={primaryBtn} onClick={() => void onAddToCart()}>
                        <CiShop size={22} aria-hidden />
                        {t("addToCart")}
                      </button>
                    )}

                    <button
                      type="button"
                      aria-pressed={inWishlist}
                      aria-label={
                        inWishlist ? t("quickView.removeFromWishlist") : t("quickView.addToWishlist")
                      }
                      onClick={() => void onToggleWishlist()}
                      className={`${outlineBtn} shrink-0 md:w-fit ${inWishlist ? "border-(--primary) bg-(--primary)/5" : ""}`}
                    >
                      {inWishlist ? (
                        <IoIosHeart size={22} className="text-(--primary)" aria-hidden />
                      ) : (
                        <IoIosHeartEmpty size={22} aria-hidden />
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => void onShare()}
                    className={`${outlineBtn} w-full md:w-fit`}
                  >
                    <CiShare2 size={22} aria-hidden />
                    {t("quickView.share")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
