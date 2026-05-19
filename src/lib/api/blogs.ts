import { getSupabase } from "@/lib/supabase";

const supabase = getSupabase();

export type Blog = {
  id: number;
  href: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  imageAlt: string;
  imageAltAr: string;
  readmore: string;
  readmoreAr: string;
  created_at?: string;
};

type BlogsResponse = {
  data: Blog[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
};

export async function listBlogs(
  page = 1,
  perPage?: number
): Promise<BlogsResponse> {
  const { data, error } = await supabase.rpc(
    "get_blogs_paginated",
    {
      page_number: page,
      per_page: perPage ?? null,
    }
  );

  if (error) {
    console.error(error.message);
    throw new Error("Failed to fetch blogs");
  }

  return data;
}

export async function getBlogBySlug(slug: string) {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("href", `/blogs/${slug}`)
    .maybeSingle();

  if (error) {
    console.error(error.message);
    throw new Error("Failed to fetch blog");
  }

  return data as Blog | null;
}