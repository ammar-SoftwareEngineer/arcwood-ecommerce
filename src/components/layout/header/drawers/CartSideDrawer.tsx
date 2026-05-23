"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import HeaderSideDrawer from "./HeaderSideDrawer";
import { cartItemCount, useCartStore } from "@/store/cartStore";
import type { CartItem } from "@/store/types";
import { CiSquareRemove, CiTrash } from "react-icons/ci";

const cartStepperBtn =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-0 text-lg font-medium text-neutral-800 transition hover:bg-(--primary) hover:text-white cursor-pointer";

const cartStepper =
  "inline-flex h-10 shrink-0 items-center gap-1 rounded-0 bg-white px-2 text-sm font-medium text-neutral-800 shadow-md";

type CartSideDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  title?: string;
  emptyMessage?: string;
  continueLabel?: string;
  continueHref?: string;
};

export default function CartSideDrawer({
  isOpen,
  onClose,
  id,
  title = "Cart",
  emptyMessage = "Your cart is empty",
  continueLabel = "Continue shopping",
  continueHref = "/products",
}: CartSideDrawerProps) {
  const toastT = useTranslations("toast");
  const t = useTranslations("products");
  const items = useCartStore((s) => s.items);
  console.log(items);
  const addItem = useCartStore((s) => s.addItem);
  const decreaseItem = useCartStore((s) => s.decreaseItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const itemCount = cartItemCount(items);
  const subtotal = items.reduce((acc, item) => acc + item.price_egp * item.quantity, 0);

  async function onIncrease(item: CartItem) {
    const result = await addItem({
      product_id: item.product_id,
      name: item.name,
      price_egp: item.price_egp,
      image_url: item.image_url,
    });
    if (!result.ok) toast.error(toastT(result.messageKey));
    else toast.success(toastT("cartIncreased"));
  }

  async function onDecrease(item: CartItem) {
    const result = await decreaseItem(item.product_id);
    if (result.ok) toast.success(toastT("cartDecreased"));
    else toast.error(toastT(result.messageKey));
  }

  async function onRemove(productId: string) {
    const result = await removeItem(productId);
    if (result.ok) toast.success(toastT("cartRemoved"));
    else toast.error(toastT(result.messageKey));
  }

  return (
    <HeaderSideDrawer isOpen={isOpen} onClose={onClose} id={id} title={title} closeLabel="Close cart">
      <div className="flex flex-1 flex-col">
        {itemCount > 0 ? (
          <div className="flex flex-col h-full">
            <ul className="flex flex-col gap-3 flex-1">
              {items.map((item) => (
                <li
                  key={item.id}
                  className=" "
                >
                  <div className="flex items-center gap-3 p-3  border border-black/10">
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
                    <div className="min-w-0 flex-1">
                      <div className=" flex justify-end items-start">

                        <button
                          type="button"
                          aria-label={t("removeFromCart")}
                          onClick={() => void onRemove(item.product_id)}
                          className=" cursor-pointer text-black/60 transition hover:text-(--primary)"
                        >
                          <CiTrash size={25} aria-hidden />
                        </button>
                      </div>
                      <p className="truncate text-base font-medium text-black/90">{item.name}</p>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-base text-black/60 tabular-nums">
                          {item.price_egp * item.quantity} EGP
                        </p>
                        <div className={cartStepper} role="group" aria-label={t("addToCart")}>
                          <button
                            type="button"
                            className={cartStepperBtn}
                            aria-label={t("decreaseQuantity")}
                            onClick={() => void onDecrease(item)}
                          >
                            −
                          </button>
                          <span className="min-w-6 text-center text-base tabular-nums">{item.quantity}</span>
                          <button
                            type="button"
                            className={cartStepperBtn}
                            aria-label={t("increaseQuantity")}
                            onClick={() => void onIncrease(item)}
                          >
                            +
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>

                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 mt-4 p-4">
              <div className="flex justify-between items-center">
                <p className="text-lg text-black font-medium">Subtotal</p>
                <p className="text-lg text-black/70 font-medium">{subtotal.toLocaleString()} EGP</p>
              </div>
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  href={"/cart"}
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
