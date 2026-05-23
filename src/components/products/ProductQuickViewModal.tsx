"use client";

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
import { productSlug, toCartPayload } from "@/lib/product";
import { Link, getPathname } from "@/i18n/navigation";
import CartQuantityStepper from "@/components/cart/CartQuantityStepper";
import { useCartActions } from "@/components/cart/useCartActions";

type ProductQuickViewModalProps = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  inWishlist: boolean;
  onToggleWishlist: () => void | Promise<void>;
};

export default function ProductQuickViewModal({
  product, isOpen, onClose, inWishlist, onToggleWishlist,
}: ProductQuickViewModalProps) {
  const t = useTranslations("products");
  const toastT = useTranslations("toast");
  const locale = useLocale();
  const titleId = useId();
  const productHref = `/products/${productSlug(product.name)}` as const;
  const cart = useCartActions(product.id, toCartPayload(product));
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  async function onShare() {
    const url = `${window.location.origin}${getPathname({ locale, href: productHref })}`;
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title: product.name, text: product.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success(toastT("linkCopied"));
      }
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") toast.error(toastT("shareFailed"));
    }
  }

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[2200] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        role="dialog" aria-modal="true" aria-labelledby={titleId}
        className="relative flex max-h-[min(90dvh,720px)] w-full max-w-3xl flex-col overflow-hidden rounded-0 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-black/10 px-4 py-3">
          <h2 id={titleId} className="text-lg font-semibold text-black/90">{t("quickView.title")}</h2>
          <button type="button" onClick={onClose} aria-label={t("quickView.close")}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-0 border border-black/15 text-black/70 transition hover:bg-black/5">
            <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="grid gap-6 p-4 md:grid-cols-2 md:p-6">

            {/* Image */}
            <div className="relative aspect-square bg-neutral-50">
              {product.image_url
                ? <Image src={product.image_url} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
                : <span className="flex h-full items-center justify-center px-4 text-sm text-neutral-400">{product.name}</span>
              }
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {product.is_new && <span className="quick-view-badge inline-flex bg-(--primary) px-2 py-1 text-xs font-medium uppercase text-white">{t("new")}</span>}
                {product.is_best_seller && <span className="quick-view-badge inline-flex bg-(--primary) px-2 py-1 text-xs font-medium uppercase text-white">{t("quickView.bestSeller")}</span>}
              </div>

              {product.category && (
                <p className="w-fit bg-(--primary) px-2 py-1 text-sm font-medium uppercase tracking-wide text-white">{product.category}</p>
              )}

              <h3 className="text-xl font-semibold text-neutral-900">{product.name}</h3>
              <p className="text-main text-xl font-medium tabular-nums">{product.price_egp.toLocaleString()} EGP</p>
              <Link href={productHref} onClick={onClose} className="text-sm font-medium text-main underline-offset-2 hover:underline">
                {t("quickView.viewDetails")}
              </Link>

              {/* Actions */}
              <div className="mt-auto  flex flex-col gap-3 pt-2">

                <div className="flex items-center flex-col gap-3 sm:flex-row">
                  {cart.qty > 0 ? (
                    <div className="flex-1 w-full">
                      <CartQuantityStepper

                        quantity={cart.qty}
                        groupLabel={t("addToCart")}
                        decreaseLabel={t("decreaseQuantity")}
                        increaseLabel={t("increaseQuantity")}
                        onDecrease={() => void cart.decrease()}
                        onIncrease={() => void cart.add()}
                        className="w-full justify-center gap-3 py-1.5 px-2"
                      />
                    </div>
                  ) : (
                    <button type="button" onClick={() => void cart.add()}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-0 border border-main bg-main px-4 py-2.5 text-base font-medium text-white transition hover:bg-main/90 cursor-pointer">
                      <CiShop size={22} aria-hidden /> {t("addToCart")}
                    </button>
                  )}

                  <button type="button" aria-pressed={inWishlist} onClick={() => void onToggleWishlist()}
                    className={`inline-flex   text-nowrap items-center justify-center gap-2 rounded-0 border border-main bg-white px-4 py-2.5 text-base font-medium text-main transition hover:bg-main/5 cursor-pointer ${inWishlist ? "border-(--primary) bg-(--primary)/5" : ""}`}>
                    {inWishlist ? <IoIosHeart size={22} className="text-(--primary)" aria-hidden /> : <IoIosHeartEmpty size={22} aria-hidden />}

                  </button>

                  <button type="button" onClick={() => void onShare()}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-0 border border-main bg-white px-4 py-2.5 text-base font-medium text-main transition hover:bg-main/5 cursor-pointer">
                    <CiShare2 size={22} aria-hidden /> {t("quickView.share")}
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