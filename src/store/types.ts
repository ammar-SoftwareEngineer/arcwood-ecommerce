export type CartItem = {
    id: string;
    product_id: string;
    name: string;
    price_egp: number;
    image_url: string | null;
    quantity: number;
  };
  
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