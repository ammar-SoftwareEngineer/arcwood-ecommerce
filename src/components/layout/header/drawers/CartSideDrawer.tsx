"use client";

/**
 * Header cart drawer: line items, qty stepper, subtotal, links to cart/checkout.
 */
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import HeaderSideDrawer from "./HeaderSideDrawer";
import CartQuantityStepper from "@/components/cart/CartQuantityStepper";
import { cartItemCount, useCartStore } from "@/store/cartStore";
import { toCartPayloadFromItem } from "@/lib/product";
import {
  addToCartWithToast,
  decreaseCartWithToast,
  removeFromCartWithToast,
} from "@/lib/cart/cart-toast";
import type { CartItem } from "@/store/types";
import { CiTrash } from "react-icons/ci";

type CartSideDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
};

function CartDrawerLine({ item }: { item: CartItem }) {
  const t = useTranslations("products");
  const toastT = useTranslations("toast");
  const addItem = useCartStore((s) => s.addItem);
  const decreaseItem = useCartStore((s) => s.decreaseItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const payload = toCartPayloadFromItem(item);

  return (
    <li>
      <div className="flex items-stretch gap-3 border border-black/10 p-3">
        <div className="relative h-24 w-24 shrink-0 bg-neutral-100">
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-cover"
              sizes="100px"
            />
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-1">
          <p className="line-clamp-2 text-lg font-medium leading-snug text-black/90">{item.name}</p>
          <p className="text-base text-black/60 tabular-nums">
            {(item.price_egp * item.quantity).toLocaleString()} EGP
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end justify-between gap-2">
          <button
            type="button"
            aria-label={t("removeFromCart")}
            onClick={() => void removeFromCartWithToast(removeItem, toastT, item.product_id)}
            className="cursor-pointer text-black/60 transition hover:text-(--primary)"
          >
            <CiTrash size={25} aria-hidden />
          </button>
          <CartQuantityStepper
            quantity={item.quantity}
            groupLabel={t("quantity")}
            decreaseLabel={t("decreaseQuantity")}
            increaseLabel={t("increaseQuantity")}
            onDecrease={() => void decreaseCartWithToast(decreaseItem, toastT, item.product_id)}
            onIncrease={() => void addToCartWithToast(addItem, toastT, payload, item.quantity)}
          />
        </div>
      </div>
    </li>
  );
}

export default function CartSideDrawer({ isOpen, onClose, id }: CartSideDrawerProps) {
  const t = useTranslations("products.cart");
  const items = useCartStore((s) => s.items);
  const itemCount = cartItemCount(items);
  const subtotal = items.reduce((sum, item) => sum + item.price_egp * item.quantity, 0);

  return (
    <HeaderSideDrawer isOpen={isOpen} onClose={onClose} id={id} title={t("title")} closeLabel={t("close")}>
      <div className="flex flex-1 flex-col">
        {itemCount > 0 ? (
          <div className="flex h-full flex-col">
            <ul className="flex flex-1 flex-col">
              {items.map((item) => (
                <CartDrawerLine key={item.product_id} item={item} />
              ))}
            </ul>

            <div className="mt-4 flex flex-col gap-3 p-4">
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-black">{t("subtotal")}</p>
                <p className="text-lg font-medium text-black/70">{subtotal.toLocaleString()} EGP</p>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="cta-outline text-center justify-center rounded-0 border border-main bg-main px-5 py-2.5 text-base font-medium text-white transition hover:bg-main/90"
                >
                  {t("viewCart")}
                </Link>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="cta text-center justify-center rounded-0 border border-main bg-main px-5 py-2.5 text-base font-medium text-white transition hover:bg-main/90"
                >
                  {t("checkout")}
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center">
            <p className="text-base text-black/70">{t("empty")}</p>
            <Link
              href="/products"
              onClick={onClose}
              className="inline-flex rounded-0 border border-main bg-main px-5 py-2.5 text-base font-medium text-white transition hover:bg-main/90"
            >
              {t("continueShopping")}
            </Link>
          </div>
        )}
      </div>
    </HeaderSideDrawer>
  );
}
