"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import HeaderSideDrawer from "./HeaderSideDrawer";
import CartQuantityStepper from "@/components/cart/CartQuantityStepper";
import { useCartActions } from "@/components/cart/useCartActions";
import { cartItemCount, useCartStore } from "@/store/cartStore";
import { toCartPayloadFromItem } from "@/lib/product";
import type { CartItem } from "@/store/types";
import { CiTrash } from "react-icons/ci";

type CartSideDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  title?: string;
  emptyMessage?: string;
  continueLabel?: string;
  continueHref?: string;
};

function CartDrawerLine({ item }: { item: CartItem }) {
  const t = useTranslations("products");
  const cart = useCartActions(item.product_id, toCartPayloadFromItem(item));

  return (
    <li>
      <div className="flex items-center gap-3 border border-black/10 p-3">
        <div className="relative h-24 w-24 shrink-0 bg-neutral-100">
          {item.image_url ? (
            <Image src={item.image_url} alt={item.name} fill className="object-cover" sizes="100px" />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-end">
            <button
              type="button"
              aria-label={t("removeFromCart")}
              onClick={() => void cart.remove()}
              className="cursor-pointer text-black/60 transition hover:text-(--primary)"
            >
              <CiTrash size={25} aria-hidden />
            </button>
          </div>
          <p className="truncate text-base font-medium text-black/90">{item.name}</p>
          <div className="flex items-center justify-between gap-2">
            <p className="text-base text-black/60 tabular-nums">
              {(item.price_egp * item.quantity).toLocaleString()} EGP
            </p>
            <CartQuantityStepper
              quantity={item.quantity}
              groupLabel={t("addToCart")}
              decreaseLabel={t("decreaseQuantity")}
              increaseLabel={t("increaseQuantity")}
              onDecrease={() => void cart.decrease()}
              onIncrease={() => void cart.add()}
            />
          </div>
        </div>
      </div>
    </li>
  );
}

export default function CartSideDrawer({
  isOpen,
  onClose,
  id,
  title = "Cart",
  emptyMessage = "Your cart is empty",
  continueLabel = "Continue shopping",
  continueHref = "/products",
}: CartSideDrawerProps) {
  const items = useCartStore((s) => s.items);
  const itemCount = cartItemCount(items);
  const subtotal = items.reduce((acc, item) => acc + item.price_egp * item.quantity, 0);

  return (
    <HeaderSideDrawer isOpen={isOpen} onClose={onClose} id={id} title={title} closeLabel="Close cart">
      <div className="flex flex-1 flex-col">
        {itemCount > 0 ? (
          <div className="flex h-full flex-col">
            <ul className="flex flex-1 flex-col ">
              {items.map((item) => (
                <CartDrawerLine key={item.id} item={item} />
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3 p-4">
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-black">Subtotal</p>
                <p className="text-lg font-medium text-black/70">{subtotal.toLocaleString()} EGP</p>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="cta-outline text-center justify-center rounded-0 border border-main bg-main px-5 py-2.5 text-base font-medium text-white transition hover:bg-main/90"
                >
                  View Cart
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="cta justify-center rounded-0 border border-main bg-main px-5 py-2.5 text-base font-medium text-white transition hover:bg-main/90"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center">
            <p className="text-base text-black/70">{emptyMessage}</p>
            <Link
              href={continueHref}
              onClick={onClose}
              className="inline-flex rounded-0 border border-main bg-main px-5 py-2.5 text-base font-medium text-white transition hover:bg-main/90"
            >
              {continueLabel}
            </Link>
          </div>
        )}
      </div>
    </HeaderSideDrawer>
  );
}
