"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Product } from "@/lib/api/products";
import { getProductGallery } from "@/lib/products/product-details";

const THUMB_ON = "border-main ring-1 ring-main";
const THUMB_OFF = "border-black/10 hover:border-main/50";

export default function ProductDetailsGallery({ product }: { product: Product }) {
  const t = useTranslations("products");
  const tDetails = useTranslations("products.details");
  const tZoom = useTranslations("products.details.lightbox");

  const images = getProductGallery(product);
  const [index, setIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const mainSrc = images[index] ?? "";

  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomOpen(false);
      if (images.length < 2) return;
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [zoomOpen, images.length]);

  const step = (dir: -1 | 1) => setIndex((i) => (i + dir + images.length) % images.length);

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:gap-4">
        <div className="relative mx-auto aspect-square w-full  overflow-hidden bg-neutral-50 md:order-2 ">
          {product.is_new && (
            <span className="badge-products absolute inset-s-3 top-3 z-10">{t("new")}</span>
          )}
          {product.is_best_seller && (
            <span className="badge-products absolute inset-s-3 top-12 z-10">
              {t("quickView.bestSeller")}
            </span>
          )}
          {mainSrc ? (
            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              aria-label={tZoom("open")}
              className=" cursor-zoom-in w-full h-full"
            >
              <Image
                src={mainSrc}
                alt={product.name}
                fill
                priority
                className="object-cover w-full h-full "
              />
            </button>
          ) : (
            <span className="flex h-full items-center justify-center px-4 text-sm text-neutral-400">
              {product.name}
            </span>
          )}
        </div>

        {images.length > 0 && (
          <nav
            aria-label={tDetails("galleryThumbs")}
            className="pd-gallery-thumbs order-2 flex gap-2 overflow-x-auto pb-1 md:order-1 md:w-16 md:shrink-0 md:flex-col md:overflow-x-hidden md:overflow-y-auto md:pb-0 lg:w-20"
          >
            {images.map((url, i) => (
              <button
                key={`${url}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                aria-current={index === i ? "true" : undefined}
                className={`relative aspect-square h-16 w-16 shrink-0 overflow-hidden border bg-neutral-50 md:h-auto md:w-full ${
                  index === i ? THUMB_ON : THUMB_OFF
                }`}
              >
                <Image src={url} alt="" fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </nav>
        )}
      </div>

      {zoomOpen &&
        ready &&
        mainSrc &&
        createPortal(
          <div
            className="fixed inset-0 z-2300 flex items-center justify-center bg-black/85 p-3 sm:p-4"
            onClick={() => setZoomOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              className="absolute top-3 end-3 z-10 flex h-10 w-10 items-center justify-center text-3xl text-white hover:text-main sm:top-4 sm:end-4"
              aria-label={tZoom("close")}
            >
              ×
            </button>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute inset-s-2 top-1/2 z-10 -translate-y-1/2 px-2 text-3xl text-white sm:inset-s-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label={tZoom("prev")}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="absolute inset-e-2 top-1/2 z-10 -translate-y-1/2 px-2 text-3xl text-white sm:inset-e-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label={tZoom("next")}
                >
                  ›
                </button>
              </>
            )}
            <div
              className="relative h-[min(80dvh,720px)] w-full max-w-4xl px-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={mainSrc} alt={product.name} fill className="object-contain" sizes="100vw" priority />
            </div>
            {images.length > 1 && (
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-sm text-white/70 tabular-nums">
                {tZoom("counter", { current: index + 1, total: images.length })}
              </p>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
