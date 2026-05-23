import type { Product } from "@/lib/api/products";
import type { CartItem } from "@/store/types";

export function productSlug(name: string) {
  return name.toLowerCase().replace(/ /g, "-");
}

export function toCartPayload(product: Product): Omit<CartItem, "id" | "quantity"> {
  return {
    product_id: product.id,
    name: product.name,
    price_egp: product.price_egp,
    image_url: product.image_url,
  };
}

export function toCartPayloadFromItem(item: CartItem): Omit<CartItem, "id" | "quantity"> {
  return {
    product_id: item.product_id,
    name: item.name,
    price_egp: item.price_egp,
    image_url: item.image_url,
  };
}
