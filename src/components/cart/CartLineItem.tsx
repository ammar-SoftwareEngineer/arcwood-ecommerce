/**
 * Shared cart line — one component for table, mobile card, and header drawer.
 *
 * Layout differences:
 * - table: price in columns, not under the product name
 * - mobile: stacked card with price breakdown
 * - drawer: price under name (`showPrice`)
 *
 * Mutations use `useCartStore.getState()` + toast helpers (no extra hook layer).
 */
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CiFileOn, CiTrash } from "react-icons/ci";
import { toCartPayloadFromItem, productSlug } from "@/lib/products/product";
import { useCartStore } from "@/store/cartStore";
import type { CartItem } from "@/store/types";
import { addToCartWithToast, decreaseCartWithToast, removeFromCartWithToast } from "./lib/toast";
import { formatEgp, lineTotal } from "./lib/utils";
import CartQuantityStepper from "./CartQuantityStepper";
import { BsBoxArrowUpRight } from "react-icons/bs";


type Props = {
  item: CartItem;
  /** Show unit price under the name — drawer only; table uses dedicated columns. */
  showPrice?: boolean;
  variant: "table" | "mobile" | "drawer";
};

const td = "border-b border-black/10 px-4 py-4 align-middle";
const imageSizes = { sm: "h-20 w-20", md: "h-24 w-24" } as const;

export default function CartLineItem({ item, showPrice = false, variant }: Props) {
  const t = useTranslations("products");
  const tCart = useTranslations("products.cart");
  const toastT = useTranslations("toast");
  const href = `/products/${productSlug(item.name)}` as const;

  const onIncrease = () => {
    const { addItem } = useCartStore.getState();
    void addToCartWithToast(addItem, toastT, toCartPayloadFromItem(item), item.quantity);
  };

  const onDecrease = () => {
    const { decreaseItem } = useCartStore.getState();
    void decreaseCartWithToast(decreaseItem, toastT, item.product_id);
  };

  const onRemove = () => {
    const { removeItem } = useCartStore.getState();
    void removeFromCartWithToast(removeItem, toastT, item.product_id);
  };

  const product = (
    <Link href={href} className="flex min-w-0 items-center gap-4 transition hover:opacity-90">
      <div className={`relative shrink-0 bg-neutral-100 ${imageSizes[variant === "table" ? "md" : "sm"]}`}>
        {item.image_url ? (
          <Image src={item.image_url} alt={item.name} fill className="object-cover" sizes="96px" />
        ) : null}
      </div>
      <div className="flex flex-col items-start justify-between">
        <span className="line-clamp-2 text-base font-medium leading-snug text-black/90 md:text-lg">{item.name}</span>
        {showPrice ? (
          <p className="mt-4 tabular-nums text-black/60">
            {formatEgp(item.price_egp)}
            {item.quantity > 1 ? (
              <span className="text-sm text-black/60 rtl:me-2 ltr:ms-1">x {item.quantity}</span>
            ) : null}
          </p>
        ) : null}
      </div>
    </Link>
  );

  const stepper = (
    <CartQuantityStepper
      quantity={item.quantity}
      groupLabel={t("quantity")}
      decreaseLabel={t("decreaseQuantity")}
      increaseLabel={t("increaseQuantity")}
      onDecrease={onDecrease}
      onIncrease={onIncrease}
    />
  );

  const removeBtn = (
    <button
      type="button"
      aria-label={t("removeFromCart")}
      onClick={onRemove}
      className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center text-black/60 transition hover:text-(--primary)"
    >
      <CiTrash size={22} aria-hidden />
    </button>
  );

  const viewProductBtn = (
    <Link
      href={href}
      aria-label={tCart("viewProduct")}
      className="inline-flex text-main underline-offset-2 hover:underline"
    >
      <BsBoxArrowUpRight size={18} aria-hidden />
    </Link>
  );

  if (variant === "drawer") {
    return (
      <li className="border border-black/10 p-3">
        <div className="flex items-start justify-between gap-3">
          {product}
          <div className="flex shrink-0 flex-col items-end gap-2">
            {removeBtn}
            {stepper}
          </div>
        </div>
      </li>
    );
  }

  if (variant === "mobile") {
    return (
      <article className="flex flex-col gap-4 border border-black/10 p-4">
        {product}
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <dt className="text-black/60">{tCart("unitPrice")}</dt>
          <dd className="text-end tabular-nums">{formatEgp(item.price_egp)}</dd>
          <dt className="text-black/60">{tCart("lineTotal")}</dt>
          <dd className="text-end tabular-nums font-medium">{formatEgp(lineTotal(item))}</dd>
        </dl>
        <div className="flex items-center justify-between gap-2">
          {stepper}
          <div className="flex items-center gap-2">
            {viewProductBtn}
            {removeBtn}
          </div>
        </div>
      </article>
    );
  }

  return (
    <tr className="text-black/90">
      <td className={td}>{product}</td>
      <td className={`${td} tabular-nums`}>{formatEgp(item.price_egp)}</td>
      <td className={td}>{stepper}</td>
      <td className={`${td} tabular-nums font-medium`}>{formatEgp(lineTotal(item))}</td>
      <td className={`${td} text-center`}>
        <div className="flex items-center gap-3">
          {viewProductBtn}
          {removeBtn}
        </div>
      </td>
    </tr>
  );
}
