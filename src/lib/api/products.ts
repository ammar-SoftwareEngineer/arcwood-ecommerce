import { getSupabase } from "@/lib/supabase";


export const SORT_OPTIONS = [
  { value: "newest", label: "Newest", label_ar: "الأحدث", column: "created_at", ascending: false },
  { value: "price_asc", label: "Price: Low to High", label_ar: "السعر: من الأقل", column: "price_egp", ascending: true },
  { value: "price_desc", label: "Price: High to Low", label_ar: "السعر: من الأعلى", column: "price_egp", ascending: false },
] as const;

export type SortValue = typeof SORT_OPTIONS[number]["value"];

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
    sort?: SortValue;
  };

  export async function getProducts(
    options?: GetProductsOptions,
  ): Promise<{ products: Product[]; totalPages: number; totalCount: number; limit: number }> {
    const supabase = getSupabase();
    const selectedSort = SORT_OPTIONS.find(s => s.value === options?.sort) ?? SORT_OPTIONS[0];
    const limit = options?.limit ?? 9;
    const page = options?.page ?? 1;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("products")
      .select("*", { count: "exact" })
      .order(selectedSort.column, { ascending: selectedSort.ascending })
      .range(from, to);

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