// lib/api/categories.ts
import { getSupabase } from "@/lib/supabase";

export type Category = {
  id: string;
  name: string;
  name_ar: string;
  image_url: string | null;
  product_count: number;
};

export async function getCategories(): Promise<Category[]> {
  const supabase = getSupabase();

  const { data, error } = await supabase.from("categories").select(`*`);

  if (error) {
    console.error(error.message);
    throw new Error("Could not load categories");
  }

  return (data ?? []);
}
