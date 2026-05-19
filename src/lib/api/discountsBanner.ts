import { getSupabase } from "@/lib/supabase";

export type DiscountsBanner = {
  id: string;
  subtitle: string | null;
  subtitle_ar: string | null;
  title: string | null;
  title_ar: string | null;
  description: string | null;
  description_ar: string | null;
  cta_label: string | null;
  cta_label_ar: string | null;
  image_alt: string | null;
  image_alt_ar: string | null;
  ends_at: string;
  days_label: string;
  hours_label: string;
  minutes_label: string;
  seconds_label: string;
  days_label_ar: string;
  hours_label_ar: string;
  minutes_label_ar: string;
  seconds_label_ar: string;
  image: string;
  cta_href: string;
};

export async function getDiscountsBanner(): Promise<DiscountsBanner | null> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("discounts_banner")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("getDiscountsBanner:", error.message);
    throw new Error("Could not load discounts banner");
  }

  return data as DiscountsBanner | null;
}
