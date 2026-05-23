/**
 * Wishlist UI feedback — mirrors `lib/cart/cart-toast.ts` (store fn + Sonner, no hooks).
 */
import { toast } from "sonner";
import type { WishlistResult } from "@/actions/wishlist";
import type { WishlistItem } from "@/store/types";

export type WishlistPayload = Omit<WishlistItem, "id">;

type ToastT = (key: string) => string;

export async function addWishlistWithToast(
  addItem: (item: WishlistPayload) => Promise<WishlistResult>,
  toastT: ToastT,
  payload: WishlistPayload,
) {
  const result = await addItem(payload);
  if (result.ok) toast.success(toastT("wishlistAdded"));
  else toast.error(toastT(result.messageKey));
  return result;
}

export async function removeWishlistWithToast(
  removeItem: (productId: string) => Promise<WishlistResult>,
  toastT: ToastT,
  productId: string,
) {
  const result = await removeItem(productId);
  if (result.ok) toast.success(toastT("wishlistRemoved"));
  else toast.error(toastT(result.messageKey));
  return result;
}
