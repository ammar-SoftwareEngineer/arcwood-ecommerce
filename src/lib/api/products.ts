import { getSupabase } from "@/lib/supabase";
import { productSlug } from "@/lib/products/product";
import { parseGalleryImages } from "@/lib/products/product-details";


export const SORT_OPTIONS = [
  { value: "newest", label: "Newest", label_ar: "الأحدث", column: "created_at", ascending: false },
  { value: "price_asc", label: "Price: Low to High", label_ar: "السعر: من الأقل", column: "price_egp", ascending: true },
  { value: "price_desc", label: "Price: High to Low", label_ar: "السعر: من الأعلى", column: "price_egp", ascending: false },
] as const;

export type SortValue = typeof SORT_OPTIONS[number]["value"];

export type Product = {
  id: string;
  name: string;
  slug?: string | null;
  category: string | null;
  category_id: string | null;
  price_egp: number;
  image_url: string | null;
  description?: string | null;
  description_ar?: string | null;
  material?: string | null;
  short_description?: string | null;
  short_description_ar?: string | null;
  gallery_images?: string[] | null;
  code?: string | null;
  barcode?: string | null;
  brand?: string | null;
  warranty_months?: number | null;
  after_sale_service?: boolean | null;
  price_excludes_vat?: boolean | null;
  price_excludes_transport?: boolean | null;
  supply_days?: number | null;
  is_new: boolean;
  is_best_seller: boolean;
  created_at: string;
};

function mapProduct(row: Product & { gallery_images?: unknown }): Product {
  const gallery = parseGalleryImages(row.gallery_images);
  return {
    ...row,
    gallery_images: gallery.length > 0 ? gallery : null,
  };
}

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
      products: ((data ?? []) as Product[]).map(mapProduct),
      totalPages: Math.ceil((count ?? 0) / limit),
      totalCount: count ?? 0,
      limit,
    };
  }

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabase();

  const { data: byColumn, error: slugError } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (slugError && !slugError.message.includes("slug")) {
    console.error("getProductBySlug:", slugError.message);
    throw new Error("Could not load product");
  }

  if (byColumn) return mapProduct(byColumn as Product);

  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("getProductBySlug:", error.message);
    throw new Error("Could not load product");
  }

  const match = (data as Product[]).find((p) => productSlug(p.name) === slug);
  return match ? mapProduct(match) : null;
}

export async function getRelatedProducts(
  product: Product,
  limit = 12,
): Promise<Product[]> {
  const supabase = getSupabase();

  let query = supabase
    .from("products")
    .select("*")
    .neq("id", product.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (product.category) {
    query = query.eq("category", product.category);
  } else if (product.category_id) {
    query = query.eq("category_id", product.category_id);
  }

  const { data, error } = await query;

  if (error) {
    console.error("getRelatedProducts:", error.message);
    return [];
  }

  return ((data ?? []) as Product[]).map(mapProduct);
}