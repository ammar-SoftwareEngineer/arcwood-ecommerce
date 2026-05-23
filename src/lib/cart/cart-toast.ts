/**
 * UI helpers for cart actions: call the Zustand store, then show Sonner toasts.
 * Keeps toast message keys in one place (no React hooks).
 */
import { toast } from "sonner";
import type { CartResult } from "@/actions/cart";
import type { CartItem } from "@/store/types";

/** Product snapshot stored in cart (no row id / quantity). */
export type CartPayload = Omit<CartItem, "id" | "quantity">;

type ToastT = (key: string) => string;

export async function addToCartWithToast(
  addItem: (item: CartPayload) => Promise<CartResult>,
  toastT: ToastT,
  payload: CartPayload,
  currentQty: number,
) {
  const result = await addItem(payload);
  if (!result.ok) {
    toast.error(toastT(result.messageKey));
  } else {
    // Same API for first add vs +1 — message differs for UX.
    toast.success(toastT(currentQty > 0 ? "cartIncreased" : "cartAdded"));
  }
  return result;
}

export async function decreaseCartWithToast(
  decreaseItem: (productId: string) => Promise<CartResult>,
  toastT: ToastT,
  productId: string,
) {
  const result = await decreaseItem(productId);
  if (result.ok) toast.success(toastT("cartDecreased"));
  else toast.error(toastT(result.messageKey));
  return result;
}

export async function removeFromCartWithToast(
  removeItem: (productId: string) => Promise<CartResult>,
  toastT: ToastT,
  productId: string,
) {
  const result = await removeItem(productId);
  if (result.ok) toast.success(toastT("cartRemoved"));
  else toast.error(toastT(result.messageKey));
  return result;
}
