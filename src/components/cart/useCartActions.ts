"use client";

import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";
import type { CartItem } from "@/store/types";

type CartPayload = Omit<CartItem, "id" | "quantity">;

export function useCartActions(productId: string, payload: CartPayload) {
  const toastT = useTranslations("toast");
  const addItem = useCartStore((s) => s.addItem);
  const decreaseItem = useCartStore((s) => s.decreaseItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const qty = useCartStore((s) => s.items.find((i) => i.product_id === productId)?.quantity ?? 0);

  async function add() {
    const wasInCart = qty > 0;
    const result = await addItem(payload);
    if (!result.ok) toast.error(toastT(result.messageKey));
    else toast.success(toastT(wasInCart ? "cartIncreased" : "cartAdded"));
    return result;
  }

  async function decrease() {
    const result = await decreaseItem(productId);
    if (result.ok) toast.success(toastT("cartDecreased"));
    else toast.error(toastT(result.messageKey));
    return result;
  }

  async function remove() {
    const result = await removeItem(productId);
    if (result.ok) toast.success(toastT("cartRemoved"));
    else toast.error(toastT(result.messageKey));
    return result;
  }

  return { qty, add, decrease, remove };
}
