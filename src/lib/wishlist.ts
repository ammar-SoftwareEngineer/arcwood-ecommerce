import type { Product } from "@/lib/api/products";
import type { WishlistItem } from "@/store/types";

export function wishlistItemToProduct(item: WishlistItem): Product {
  return {
    id: item.product_id,
    name: item.name,
    category: item.category ?? null,
    category_id: item.category_id ?? null,
    price_egp: item.price_egp,
    image_url: item.image_url,
    is_new: item.is_new ?? false,
    is_best_seller: item.is_best_seller ?? false,
    created_at: item.created_at ?? "",
  };
}
