import { getSupabase } from "@/lib/supabase";

export type AboutSection = {
  id: string;
  slug: string;
  badge: string;
  badge_ar: string;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  image: string | null;
  image_alt: string;
  image_alt_ar: string;
};

export async function getAboutSections(): Promise<AboutSection[]> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("about_sections")
    .select("*")

  if (error) {
    console.error("getAboutSections:", error.message);
    throw new Error("Could not load about sections");
  }

  return data ?? [];
}
