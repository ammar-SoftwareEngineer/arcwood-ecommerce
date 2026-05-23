/**
 * Full cart page UI: desktop table, mobile cards, order summary, and coupon.
 * Reads live state from `useCartStore`; line mutations live in `CartLineItem`.
 */
"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import HexagonLoader from "@/components/ui/HexagonLoader";
import { useCartStore } from "@/store/cartStore";
import { cartDiscountAmount, cartTotal, submitCartCouponForm } from "./lib/coupon";
import { formatEgp, cartItemCount, cartSubtotal } from "./lib/utils";
import CartLineItem from "./CartLineItem";

const th = "border-b border-black/10 px-4 py-3 text-start text-sm font-semibold uppercase tracking-wide text-black/70";

export default function CartTable() {
  const t = useTranslations("products.cart");
  const tCoupon = useTranslations("products.cart.coupon");
  const toastT = useTranslations("toast");
  const items = useCartStore((s) => s.items);
  const loading = useCartStore((s) => s.loading);
  const coupon = useCartStore((s) => s.coupon);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);
  const subtotal = cartSubtotal(items);
  const itemCount = cartItemCount(items);
  const discount = cartDiscountAmount(subtotal, coupon);
  const total = cartTotal(subtotal, coupon);

  if (loading) {
    return (
      <div className="flex min-h-[240px] items-center justify-center py-12">
        <HexagonLoader />
      </div>
    );
  }

  if (!items.length) {
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
    <div className="grid grid-cols-12 gap-4">
      {/* Desktop: product table */}
      <div className="col-span-12 md:col-span-8">
        <div className="mt-8 hidden overflow-x-auto md:block">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr>
                <th className={th}>{t("product")}</th>
                <th className={th}>{t("unitPrice")}</th>
                <th className={th}>{t("quantity")}</th>
                <th className={th}>{t("lineTotal")}</th>
                <th className={`${th} text-end`}>{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <CartLineItem key={item.product_id} item={item} variant="table" />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile: card list (same data, no table) */}
      <div className="col-span-12 md:col-span-4 md:hidden">
        <ul className="mt-8 flex flex-col gap-4">
          {items.map((item) => (
            <li key={item.product_id}>
              <CartLineItem item={item} variant="mobile" />
            </li>
          ))}
        </ul>
      </div>

      {/* Summary sidebar: coupon + totals + CTAs */}
      <div className="col-span-12 md:col-span-4">
        <aside className="mt-8 border border-black/10 bg-neutral-50 p-6 md:ml-auto md:max-w-md">
          <p className="text-sm text-black/60">{t("items", { count: itemCount })}</p>

          {coupon ? (
            <div className="mt-4 flex items-center justify-between gap-3 border border-main/30 bg-main/5 px-3 py-2">
              <p className="text-sm text-black/80">
                {tCoupon("applied", { code: coupon.code, percent: coupon.discountPercent })}
              </p>
              <button
                type="button"
                onClick={removeCoupon}
                className="cursor-pointer text-sm font-medium text-main hover:underline"
              >
                {tCoupon("remove")}
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitCartCouponForm(e.currentTarget, applyCoupon, toastT);
              }}
              className="mt-4 flex flex-col gap-2 sm:flex-row"
            >
              <input
                id="cart-coupon"
                name="code"
                placeholder={tCoupon("placeholder")}
                aria-label={tCoupon("label")}
                className="min-w-0 flex-1 border border-black/15 bg-white px-3 py-2.5 text-base outline-none focus:border-main"
              />
              <button
                type="submit"
                className="cursor-pointer border border-main bg-main px-5 py-2.5 font-medium text-white hover:bg-main/90"
              >
                {tCoupon("apply")}
              </button>
            </form>
          )}

          <dl className="mt-4 space-y-2 border-t border-black/10 pt-4">
            <div className="flex justify-between">
              <dt className="text-black/70">{t("subtotal")}</dt>
              <dd className="tabular-nums">{formatEgp(subtotal)}</dd>
            </div>
            {discount > 0 ? (
              <div className="flex justify-between text-main">
                <dt>{t("discount")}</dt>
                <dd className="tabular-nums">− {formatEgp(discount)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between border-t border-black/10 pt-3 text-lg font-semibold">
              <dt>{t("total")}</dt>
              <dd className="tabular-nums">{formatEgp(total)}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/checkout"
              className="text-center border border-main bg-main py-2.5 font-medium text-white hover:bg-main/90"
            >
              {t("checkout")}
            </Link>
            <Link
              href="/products"
              className="text-center border border-main bg-white py-2.5 font-medium text-main hover:bg-main/5"
            >
              {t("continueShopping")}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
