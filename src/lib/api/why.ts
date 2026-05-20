import { getSupabase } from "@/lib/supabase";

export type WhyUsFeature = {
  id: number;
  icon: string;
  title: string;
  title_ar: string;
  sort_order?: number;
};

export type WhyUsData = {
  id: string;
  subtitle: string | null;
  subtitle_ar: string | null;
  title: string | null;
  title_ar: string | null;
  description: string | null;
  description_ar: string | null;
  primary_image: string | null;
  secondary_image: string | null;
  primary_image_alt: string | null;
  primary_image_alt_ar: string | null;
  secondary_image_alt: string | null;
  secondary_image_alt_ar: string | null;
  cta_href: string | null;
  cta_label: string | null;
  cta_label_ar: string | null;
  features: WhyUsFeature[];
};

export async function getWhyUs(): Promise<WhyUsData | null> {
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
      .select("id, icon, title, title_ar, sort_order")
      .order("sort_order"),
  ]);

  if (section.error || features.error) {
    console.error(section.error?.message ?? features.error?.message);
    throw new Error("Could not load why us section");
  }

  if (!section.data) return null;

  return {
    ...(section.data as Omit<WhyUsData, "features">),
    features: (features.data ?? []) as WhyUsFeature[],
  };
}
