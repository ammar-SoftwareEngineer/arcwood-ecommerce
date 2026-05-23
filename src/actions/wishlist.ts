/**
 * Server Actions: wishlist_items in Supabase (signed-in user).
 */
"use server";

import { auth } from "@/lib/nextAuth";
import { getSupabase } from "@/lib/supabase";
import type { WishlistItem } from "@/store/types";

export type WishlistToastKey =
  | "wishlistSignInRequired"
  | "wishlistSignInToUpdate"
  | "wishlistDbError"
  | "wishlistProductNotFound"
  | "wishlistSaveFailed"
  | "wishlistRemoveFailed";

export type WishlistResult =
  | { ok: true }
  | { ok: false; messageKey: WishlistToastKey };

async function getUserId() {
  const session = await auth();
  return session?.user?.id ?? null;
}

function mapRow(row: {
  id: string;
  product_id: string;
  products: Record<string, unknown> | Record<string, unknown>[] | null;
}): WishlistItem {
  const p = (Array.isArray(row.products) ? row.products[0] : row.products) as
    | Record<string, unknown>
    | undefined;

  return {
    id: row.id,
    product_id: row.product_id,
    name: String(p?.name ?? ""),
    price_egp: Number(p?.price_egp ?? 0),
    image_url: (p?.image_url as string | null) ?? null,
    category: (p?.category as string | null) ?? null,
    category_id: (p?.category_id as string | null) ?? null,
    is_new: Boolean(p?.is_new),
    is_best_seller: Boolean(p?.is_best_seller),
    created_at: String(p?.created_at ?? ""),
  };
}

export async function loadWishlistAction(): Promise<WishlistItem[]> {
  const userId = await getUserId();
  if (!userId) return [];

  const { data, error } = await getSupabase()
    .from("wishlist_items")
    .select(
      "id, product_id, products (name, price_egp, image_url, category, category_id, is_new, is_best_seller, created_at)"
    )
    .eq("user_id", userId);

  if (error) {
    console.error("loadWishlistAction:", error.message);
    return [];
  }

  return (data ?? []).map(mapRow);
}

export async function addWishlistItemAction(
  item: Omit<WishlistItem, "id">
): Promise<WishlistResult> {
  const userId = await getUserId();
  if (!userId) return { ok: false, messageKey: "wishlistSignInRequired" };

  const { error } = await getSupabase().from("wishlist_items").insert({
    user_id: userId,
    product_id: item.product_id,
  });

  if (error) {
    console.error("addWishlistItemAction:", error.message);
    if (error.message.includes("wishlist_items_user_id_fkey")) {
      return { ok: false, messageKey: "wishlistDbError" };
    }
    if (error.message.includes("wishlist_items_product_id_fkey")) {
      return { ok: false, messageKey: "wishlistProductNotFound" };
    }
    // Already in wishlist (unique user_id + product_id).
    if (error.code === "23505") return { ok: true };
    return { ok: false, messageKey: "wishlistSaveFailed" };
  }

  return { ok: true };
}

export async function removeWishlistItemAction(
  productId: string
): Promise<WishlistResult> {
  const userId = await getUserId();
  if (!userId) return { ok: false, messageKey: "wishlistSignInToUpdate" };

  const { error } = await getSupabase()
    .from("wishlist_items")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) {
    console.error("removeWishlistItemAction:", error.message);
    return { ok: false, messageKey: "wishlistRemoveFailed" };
  }

  return { ok: true };
}
