"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import ProductList from "@/components/products/ProductList";
import ProductPurchaseBar from "@/components/products/ProductPurchaseBar";
import type { Product } from "@/lib/api/products";
import {
  getProductDescription,
  getProductShortDescription,
  getProductSpecs,
} from "@/lib/products/product-details";
import ProductDetailsGallery from "./ProductDetailsGallery";
import ProductDetailsTrustCards from "./ProductDetailsTrustCards";
import "@/styles/home/products.css";

const TABS = ["specifications", "description", "reviews"] as const;
type TabId = (typeof TABS)[number];

export default function ProductDetails({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const isAr = useLocale() === "ar";
  const t = useTranslations("products.details");
  const [tab, setTab] = useState<TabId>("specifications");

  const summary = getProductShortDescription(product, isAr);
  const description = getProductDescription(product, isAr);
  const specs = getProductSpecs(product, t, isAr);

  return (
    <div className="space-y-8 sm:space-y-10 lg:space-y-12">
      <div className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
        <div className="col-span-12 lg:col-span-6">
          <ProductDetailsGallery product={product} />
        </div>

        <div className="col-span-12 lg:col-span-6">
          <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
            <div className="space-y-2 border-b border-black/10 pb-4">
              {product.category && (
                <span className="inline-block bg-(--primary) px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-white">
                  {product.category}
                </span>
              )}
              <h1 className="text-xl font-semibold leading-snug text-neutral-900 sm:text-2xl lg:text-3xl">
                {product.name}
              </h1>
            </div>

            <div className="border border-black/10 bg-neutral-50 px-4 py-3 sm:px-5 sm:py-4">
              <p className="text-main text-2xl font-semibold tabular-nums sm:text-3xl">
                {product.price_egp.toLocaleString()}{" "}
                <span className="text-lg font-medium sm:text-xl">EGP</span>
              </p>
            </div>

            {summary && (
              <p className="text-sm leading-relaxed text-black/75 sm:text-base">{summary}</p>
            )}

            <ProductDetailsTrustCards product={product} />

            <ProductPurchaseBar product={product} />
          </div>
        </div>
      </div>

      <section className="overflow-hidden border border-black/10 bg-white shadow-sm">
        <div
          className="flex overflow-x-auto border-b border-black/10 bg-neutral-50/80 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
        >
          {TABS.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`shrink-0 border-b-2 px-4 py-3.5 text-xs font-semibold uppercase tracking-wide transition sm:px-6 sm:text-sm ${
                tab === id
                  ? "border-main bg-white text-main"
                  : "border-transparent text-black/50 hover:text-black/70"
              }`}
            >
              {t(`tabs.${id}`)}
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          {tab === "specifications" && (
            <ul className="divide-y divide-black/5">
              {specs.map((row) => (
                <li
                  key={row.label}
                  className="flex flex-col gap-1 py-3 text-sm first:pt-0 last:pb-0 sm:flex-row sm:gap-6 sm:py-3.5"
                >
                  <span className="shrink-0 font-semibold text-neutral-700 sm:w-40 md:w-44">
                    {row.label}
                  </span>
                  <span className="min-w-0 flex-1 text-neutral-900">{row.value || "—"}</span>
                </li>
              ))}
            </ul>
          )}

          {tab === "description" &&
            (description ? (
              <p className="text-sm leading-relaxed text-black/80 sm:text-base">{description}</p>
            ) : (
              <p className="text-sm text-black/50 sm:text-base">{t("descriptionEmpty")}</p>
            ))}

          {tab === "reviews" && (
            <div className="space-y-4 text-sm sm:text-base">
              <p className="text-3xl font-semibold text-main sm:text-4xl">0</p>
              <p className="text-black/50">{t("reviews.noReviewsYet")}</p>
              <p className="rounded-sm border border-black/10 bg-neutral-50 p-4 text-black/70">
                <strong className="text-neutral-900">{t("reviews.noteLabel")}: </strong>
                {t("reviews.bookingNote")}
              </p>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-black/10 pt-10 sm:pt-12 lg:pt-16">
          <h2 className="text-center text-2xl font-semibold text-main sm:text-3xl">{t("related")}</h2>
          <div className="mt-6 sm:mt-8 lg:mt-10">
            <ProductList products={related} className="col-span-12 sm:col-span-6 lg:col-span-3" />
          </div>
        </section>
      )}
    </div>
  );
}

export function ProductDetailsSkeleton() {
  const bone = "animate-pulse rounded-sm bg-neutral-100";
  return (
    <div className="space-y-8 sm:space-y-10" role="status" aria-busy="true">
      <div className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
        <div className={`${bone} col-span-12 aspect-square w-full lg:col-span-6`} />
        <div className="col-span-12 flex flex-col gap-4 lg:col-span-6">
          <div className={`${bone} h-6 w-24`} />
          <div className={`${bone} h-9 w-4/5`} />
          <div className={`${bone} h-14 w-40`} />
          <div className={`${bone} h-16 w-full`} />
          <div className="grid grid-cols-12 gap-3">
            <div className={`${bone} col-span-12 h-28 sm:col-span-6`} />
            <div className={`${bone} col-span-12 h-28 sm:col-span-6`} />
          </div>
          <div className={`${bone} h-12 w-full`} />
        </div>
      </div>
      <div className={`${bone} h-64 w-full`} />
    </div>
  );
}
