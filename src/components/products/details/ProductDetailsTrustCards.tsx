"use client";

import { useTranslations } from "next-intl";
import { HiOutlineTruck } from "react-icons/hi2";
import { CiMoneyBill, CiCreditCard1 } from "react-icons/ci";
import { FaCcAmex, FaCcMastercard, FaCcPaypal, FaCcVisa } from "react-icons/fa";
import type { Product } from "@/lib/api/products";
import { getDeliveryEstimate } from "@/lib/products/product-details";

const CARD =
  "flex gap-3 border border-black/10 bg-white p-4 shadow-sm transition hover:border-main/30";

type Props = {
  product: Product;
};

export default function ProductDetailsTrustCards({ product }: Props) {
  const t = useTranslations("products.details");

  const delivery = getDeliveryEstimate(product, {
    productDays: t("delivery.productDays"),
    defaultRange: t("delivery.defaultRange"),
    defaultPeak: t("delivery.defaultPeak"),
  });

  const paymentMethods = [
    { id: "cod", label: t("payment.cod"), icon: CiMoneyBill },
    { id: "bank", label: t("payment.bank"), icon: CiCreditCard1 },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div className={CARD}>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-main/10 text-main">
          <HiOutlineTruck size={22} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-black/50">
            {t("delivery.title")}
          </p>
          <p className="mt-1 text-base font-semibold text-neutral-900">{delivery.main}</p>
          {delivery.note ? (
            <p className="mt-1 text-xs text-black/60">{delivery.note}</p>
          ) : null}
          <p className="mt-2 text-xs text-main">{t("delivery.coverage")}</p>
        </div>
      </div>

      <div className={CARD}>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-main/10 text-main">
          <CiCreditCard1 size={22} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-black/50">
            {t("payment.title")}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-neutral-800">
            <FaCcVisa size={28} aria-label="Visa" />
            <FaCcMastercard size={28} aria-label="Mastercard" />
            <FaCcAmex size={28} aria-label="American Express" />
            <FaCcPaypal size={28} aria-label="PayPal" />
          </div>
          <p className="mt-2 text-xs text-black/60">{t("payment.cards")}</p>
          <ul className="mt-2 space-y-1">
            {paymentMethods.map(({ id, label, icon: Icon }) => (
              <li key={id} className="flex items-center gap-2 text-sm text-neutral-800">
                <Icon size={16} className="shrink-0 text-main" aria-hidden />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
