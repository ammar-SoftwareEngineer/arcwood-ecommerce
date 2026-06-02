import { getSupabase } from "@/lib/supabase";

const supabase = getSupabase();

/** Maps stored `/blogs/...` paths to public detail URLs `/blog/...`. */
export function toBlogDetailPath(href: string): string {
  const path = href.startsWith("/") ? href : `/${href}`;
  return path.replace(/^\/blogs\//, "/blog/");
}

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

  const response = data as BlogsResponse;
  return {
    ...response,
    data: response.data.map((blog) => ({
      ...blog,
      href: toBlogDetailPath(blog.href),
    })),
  };
}

export async function getBlogBySlug(slug: string) {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .or(`href.eq./blog/${slug},href.eq./blogs/${slug}`)
    .maybeSingle();

  if (error) {
    console.error(error.message);
    throw new Error("Failed to fetch blog");
  }

  if (!data) return null;

  return {
    ...(data as Blog),
    href: toBlogDetailPath((data as Blog).href),
  };
}