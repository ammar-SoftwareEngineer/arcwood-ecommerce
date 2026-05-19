import { getSupabase } from "@/lib/supabase";

export async function getWhyUs() {
  const supabase = getSupabase();

  const [section, features] = await Promise.all([
    supabase
      .from("why_us")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("why_us_features")
      .select("id, icon, title, title_ar")
      .order("sort_order"),
  ]);

  if (section.error || features.error) {
    console.error(section.error?.message ?? features.error?.message);
    throw new Error("Could not load why us section");
  }

  if (!section.data) return null;

  return { ...section.data, features: features.data ?? [] };
}
