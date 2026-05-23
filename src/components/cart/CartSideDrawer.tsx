/**
 * Header cart drawer — quick preview from desktop/mobile header.
 * Uses `CartLineItem` with `showPrice` (price under name, not in columns).
 */
"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import HeaderSideDrawer from "@/components/layout/header/drawers/HeaderSideDrawer";
import { useCartStore } from "@/store/cartStore";
import { formatEgp, cartItemCount, cartSubtotal } from "./lib/utils";
import CartLineItem from "./CartLineItem";

type Props = { isOpen: boolean; onClose: () => void; id: string };

export default function CartSideDrawer({ isOpen, onClose, id }: Props) {
  const t = useTranslations("products.cart");
  const items = useCartStore((s) => s.items);
  const count = cartItemCount(items);
  const subtotal = cartSubtotal(items);

  return (
    <HeaderSideDrawer isOpen={isOpen} onClose={onClose} id={id} title={t("title")} closeLabel={t("close")}>
      <div className="flex flex-1 flex-col">
        {count > 0 ? (
          <>
            <ul className="flex flex-1 flex-col gap-3">
              {items.map((item) => (
                <CartLineItem key={item.product_id} item={item} variant="drawer" showPrice />
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3 border-t border-black/10 p-4">
              <div className="flex justify-between">
                <span className="text-lg font-medium">{t("subtotal")}</span>
                <span className="text-lg tabular-nums text-black/70">{formatEgp(subtotal)}</span>
              </div>
              <Link href="/cart" onClick={onClose} className="text-center cta-outline py-2.5 font-medium text-white">
                {t("viewCart")}
              </Link>
              <Link href="/checkout" onClick={onClose} className="text-center cta py-2.5 font-medium text-white">
                {t("checkout")}
              </Link>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center">
            <p className="text-black/70">{t("empty")}</p>
            <Link href="/products" onClick={onClose} className="bg-main px-5 py-2.5 font-medium text-white hover:bg-main/90">
              {t("continueShopping")}
            </Link>
          </div>
        )}
      </div>
    </HeaderSideDrawer>
  );
}
