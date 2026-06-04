"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/store/cartStore";
import {
  cartDiscountAmount,
  cartTotal,
} from "@/lib/cart/coupon";
import {
  cartItemCount,
  cartSubtotal,
  formatEgp,
  lineTotal,
} from "@/lib/cart/utils";

export default function CheckoutSummary() {
  const t = useTranslations("checkout.summary");
  const tCart = useTranslations("products.cart");
  const tCoupon = useTranslations("products.cart.coupon");
  const items = useCartStore((s) => s.items);
  const coupon = useCartStore((s) => s.coupon);

  const subtotal = cartSubtotal(items);
  const discount = cartDiscountAmount(subtotal, coupon);
  const total = cartTotal(subtotal, coupon);
  const itemCount = cartItemCount(items);

  if (items.length === 0) {
    return (
      <aside className="border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-4 text-xl font-semibold text-neutral-900">{t("title")}</h2>
        <p className="text-black/70">{t("empty")}</p>
        <Link
          href="/cart"
          className="mt-4 inline-block border border-main bg-main px-5 py-2.5 font-medium text-white hover:bg-main/90"
        >
          {t("backToCart")}
        </Link>
      </aside>
    );
  }

  return (
    <aside className="border border-neutral-200 bg-neutral-50 p-6 shadow-sm lg:sticky lg:top-28 lg:self-start md:p-8">
      <h2 className="mb-4 text-xl font-semibold text-neutral-900">{t("title")}</h2>
      <p className="text-sm text-black/60">{tCart("items", { count: itemCount })}</p>

      <ul className="mt-4 max-h-72 space-y-4 overflow-y-auto border-b border-black/10 pb-4">
        {items.map((item) => (
          <li key={item.product_id} className="flex gap-3">
            {item.image_url ? (
              <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-white">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-white text-[10px] text-neutral-400">
                {item.name}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-medium text-neutral-900">{item.name}</p>
              <p className="text-xs text-black/50">
                {item.quantity} × {formatEgp(item.price_egp)}
              </p>
              <p className="text-sm font-medium tabular-nums text-main">
                {formatEgp(lineTotal(item))}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {coupon ? (
        <p className="mt-4 text-sm text-black/80">
          {tCoupon("applied", {
            code: coupon.code,
            percent: coupon.discountPercent,
          })}
        </p>
      ) : null}

      <dl className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <dt className="text-black/70">{tCart("subtotal")}</dt>
          <dd className="tabular-nums">{formatEgp(subtotal)}</dd>
        </div>
        {discount > 0 ? (
          <div className="flex justify-between text-sm text-main">
            <dt>{tCart("discount")}</dt>
            <dd className="tabular-nums">− {formatEgp(discount)}</dd>
          </div>
        ) : null}
        <div className="flex justify-between border-t border-black/10 pt-3 text-lg font-semibold">
          <dt>{tCart("total")}</dt>
          <dd className="tabular-nums">{formatEgp(total)}</dd>
        </div>
      </dl>
    </aside>
  );
}
