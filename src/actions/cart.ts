"use server";

import { randomUUID } from "crypto";
import { auth } from "@/lib/nextAuth";
import { getSupabase } from "@/lib/supabase";
import type { CartItem } from "@/store/types";

export type CartToastKey =
  | "cartSignInRequired"
  | "cartSignInToUpdate"
  | "cartDbError"
  | "cartProductNotFound"
  | "cartSaveFailed"
  | "cartRemoveFailed";

export type CartResult =
  | { ok: true }
  | { ok: false; messageKey: CartToastKey };

async function getUserId() {
  const session = await auth();
  return session?.user?.id ?? null;
}

/** cart_items FK points at auth.users — mirror public.users row when missing. */
async function syncAuthUser(userId: string) {
  const supabase = getSupabase();
  const { data: authUser } = await supabase.auth.admin.getUserById(userId);
  if (authUser?.user) return;

  const { data: user } = await supabase
    .from("users")
    .select("email, name")
    .eq("id", userId)
    .maybeSingle();

  if (!user?.email) return;

  await supabase.auth.admin.createUser({
    id: userId,
    email: user.email,
    email_confirm: true,
    password: `${randomUUID()}Aa1!`,
    user_metadata: { name: user.name },
  });
}

function mapRow(row: {
  id: string;
  product_id: string;
  quantity: number;
  products: Record<string, unknown> | Record<string, unknown>[] | null;
}): CartItem {
  const p = (Array.isArray(row.products) ? row.products[0] : row.products) as
    | Record<string, unknown>
    | undefined;

  return {
    id: row.id,
    product_id: row.product_id,
    name: String(p?.name ?? ""),
    price_egp: Number(p?.price_egp ?? 0),
    image_url: (p?.image_url as string | null) ?? null,
    quantity: Number(row.quantity ?? 1),
  };
}

function mapCartError(error: { message: string; code?: string }): CartResult {
  if (error.message.includes("cart_items_user_id_fkey")) {
    return { ok: false, messageKey: "cartDbError" };
  }
  if (error.message.includes("cart_items_product_id_fkey")) {
    return { ok: false, messageKey: "cartProductNotFound" };
  }
  return { ok: false, messageKey: "cartSaveFailed" };
}

export async function loadCartAction(): Promise<CartItem[]> {
  const userId = await getUserId();
  if (!userId) return [];

  const { data, error } = await getSupabase()
    .from("cart_items")
    .select("id, product_id, quantity, products (name, price_egp, image_url)")
    .eq("user_id", userId);

  if (error) {
    console.error("loadCartAction:", error.message);
    return [];
  }

  return (data ?? []).map(mapRow);
}

export async function addCartItemAction(productId: string): Promise<CartResult> {
  const userId = await getUserId();
  if (!userId) return { ok: false, messageKey: "cartSignInRequired" };

  await syncAuthUser(userId);

  const supabase = getSupabase();
  const { data: row } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .maybeSingle();

  const { error } = row
    ? await supabase
        .from("cart_items")
        .update({ quantity: row.quantity + 1 })
        .eq("id", row.id)
    : await supabase.from("cart_items").insert({
        user_id: userId,
        product_id: productId,
        quantity: 1,
      });

  if (error) {
    console.error("addCartItemAction:", error.message);
    return mapCartError(error);
  }

  return { ok: true };
}

export async function decreaseCartItemAction(productId: string): Promise<CartResult> {
  const userId = await getUserId();
  if (!userId) return { ok: false, messageKey: "cartSignInToUpdate" };

  const supabase = getSupabase();
  const { data: row } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .maybeSingle();

  if (!row) return { ok: true };

  if (row.quantity <= 1) {
    return removeCartItemAction(productId);
  }

  const { error } = await supabase
    .from("cart_items")
    .update({ quantity: row.quantity - 1 })
    .eq("id", row.id);

  if (error) {
    console.error("decreaseCartItemAction:", error.message);
    return { ok: false, messageKey: "cartRemoveFailed" };
  }

  return { ok: true };
}

export async function removeCartItemAction(productId: string): Promise<CartResult> {
  const userId = await getUserId();
  if (!userId) return { ok: false, messageKey: "cartSignInToUpdate" };

  const { error } = await getSupabase()
    .from("cart_items")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) {
    console.error("removeCartItemAction:", error.message);
    return { ok: false, messageKey: "cartRemoveFailed" };
  }

  return { ok: true };
}
