/** Line in cart drawer / store — synced from Supabase cart_items + products join. */
export type CartItem = {
  id: string;
  product_id: string;
  name: string;
  price_egp: number;
  image_url: string | null;
  quantity: number;
};

/** Saved product row — extra fields optional until join returns them. */
export type WishlistItem = {
  id: string;
  product_id: string;
  name: string;
  price_egp: number;
  image_url: string | null;
  category?: string | null;
  category_id?: string | null;
  is_new?: boolean;
  is_best_seller?: boolean;
  created_at?: string;
};
