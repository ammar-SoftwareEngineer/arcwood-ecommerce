/**
 * Shared product helpers for links and cart/wishlist optimistic UI payloads.
 */
import type { Product } from "@/lib/api/products";
import type { CartItem, WishlistItem } from "@/store/types";

/** URL slug until PDP loads by id — matches current /products/[slug] routes. */
export function productSlug(name: string) {
  return name.toLowerCase().replace(/ /g, "-");
}

/** Snapshot sent to cart store before server action runs. */
export function toCartPayload(product: Product): Omit<CartItem, "id" | "quantity"> {
  return {
    product_id: product.id,
    name: product.name,
    price_egp: product.price_egp,
    image_url: product.image_url,
  };
}

/** Re-use line item fields when +/- quantity in cart drawer. */
export function toCartPayloadFromItem(item: CartItem): Omit<CartItem, "id" | "quantity"> {
  return {
    product_id: item.product_id,
    name: item.name,
    price_egp: item.price_egp,
    image_url: item.image_url,
  };
}

/** Snapshot for wishlist store optimistic UI (server only needs product_id). */
export function toWishlistPayload(product: Product): Omit<WishlistItem, "id"> {
  return {
    product_id: product.id,
    name: product.name,
    price_egp: product.price_egp,
    image_url: product.image_url,
    category: product.category,
    category_id: product.category_id,
    is_new: product.is_new,
    is_best_seller: product.is_best_seller,
    created_at: product.created_at,
  };
}
