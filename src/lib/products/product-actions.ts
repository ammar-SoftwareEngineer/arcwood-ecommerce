import { toast } from "sonner";
import { getPathname } from "@/i18n/navigation";
import { addWishlistWithToast, removeWishlistWithToast } from "@/lib/wishlist/wishlist-toast";
import type { Product } from "@/lib/api/products";
import { productSlug, toWishlistPayload } from "@/lib/products/product";
import type { WishlistItem } from "@/store/types";

type ToastT = (key: string) => string;

export async function shareProduct(product: Product, locale: string, toastT: ToastT) {
  const href = `/products/${productSlug(product.name)}` as const;
  const url = `${window.location.origin}${getPathname({ locale, href })}`;

  try {
    if (typeof navigator.share === "function") {
      await navigator.share({ title: product.name, text: product.name, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    toast.success(toastT("linkCopied"));
  } catch (err) {
    if (err instanceof Error && err.name !== "AbortError") {
      toast.error(toastT("shareFailed"));
    }
  }
}

export async function toggleProductWishlist(
  product: Product,
  inWishlist: boolean,
  addItem: (item: Omit<WishlistItem, "id">) => Promise<{ ok: boolean; messageKey?: string }>,
  removeItem: (productId: string) => Promise<{ ok: boolean; messageKey?: string }>,
  toastT: ToastT,
) {
  if (inWishlist) {
    await removeWishlistWithToast(removeItem, toastT, product.id);
    return;
  }
  await addWishlistWithToast(addItem, toastT, toWishlistPayload(product));
}
