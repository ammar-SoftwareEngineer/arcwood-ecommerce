/**
 * Cart display and aggregation helpers (pure functions, no React).
 */
import type { CartItem } from "@/store/types";

/** Format a number as Egyptian pounds for UI. */
export function formatEgp(amount: number) {
  return `${amount.toLocaleString()} EGP`;
}

/** Single line: unit price × quantity. */
export function lineTotal(item: CartItem) {
  return item.price_egp * item.quantity;
}

/** Total units across all lines (header badge uses this, not distinct SKU count). */
export function cartItemCount(items: CartItem[]) {
  return items.reduce((n, item) => n + item.quantity, 0);
}

/** Sum of all line totals before coupon/discount. */
export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price_egp * item.quantity, 0);
}
