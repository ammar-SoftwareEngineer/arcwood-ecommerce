import { getSupabase } from "@/lib/supabase";
export type Product = {
  id: string;
  name: string;
  category: string | null;
  price_egp: number;
  image_url: string | null;
  is_new: boolean;
  is_best_seller: boolean;
  created_at: string;
};

export type GetProductsOptions = {
  bestSeller?: boolean;
  limit?: number;
};

export async function getProducts(
  options?: GetProductsOptions,
): Promise<Product[]> {
  const supabase = getSupabase();

  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (options?.bestSeller) {
    query = query.eq("is_best_seller", true);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error.message);
    throw new Error("Could not load products");
  }

  return (data ?? []) as Product[];
}