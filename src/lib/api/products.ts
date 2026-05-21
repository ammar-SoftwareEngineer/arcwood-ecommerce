import { getSupabase } from "@/lib/supabase";

export type Product = {
  id: string;
  name: string;
  category: string | null;
  category_id: string | null;
  price_egp: number;
  image_url: string | null;
  is_new: boolean;
  is_best_seller: boolean;
  created_at: string;
};

export type GetProductsOptions = {
    page?: number;
    limit?: number;
    category?: string;
    material?: string;
    minPrice?: number;
    maxPrice?: number;
    isNew?: boolean;
    bestSeller?: boolean;
    search?: string;
  };

  export async function getProducts(
    options?: GetProductsOptions,
  ): Promise<{ products: Product[]; totalPages: number; totalCount: number; limit: number }> {
    const supabase = getSupabase();
  
    const limit = options?.limit ?? 12;
    const page = options?.page ?? 1;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("products")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    // فلتر الكاتيجوري
    if (options?.category) {
      query = query.eq("category", options.category);
    }
    
  
    // فلتر الخامة
    if (options?.material) {
      query = query.eq("material", options.material);
    }
  
    // فلتر السعر
    if (options?.minPrice !== undefined) {
      query = query.gte("price_egp", options.minPrice);
    }
    if (options?.maxPrice !== undefined) {
      query = query.lte("price_egp", options.maxPrice);
    }
  
    // فلتر New
    if (options?.isNew) {
      query = query.eq("is_new", true);
    }
  
    // فلتر Best Seller
    if (options?.bestSeller) {
      query = query.eq("is_best_seller", true);
    }
  
    // Search
    if (options?.search) {
      query = query.ilike("name", `%${options.search}%`);
    }
  
    const { data, count, error } = await query;
  
    if (error) {
      console.error(error.message);
      throw new Error("Could not load products");
    }
  
    return {
      products: (data ?? []) as Product[],
      totalPages: Math.ceil((count ?? 0) / limit),
      totalCount: count ?? 0,
      limit,
    };
  }