import { getSupabase } from "@/lib/supabase";

const supabase = getSupabase();
const DEFAULT_PER_PAGE = 12;

export type BlogPostRow = {
  id: number;
  slug: string;
  title_en: string | null;
  title_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  content_en: string | null;
  content_ar: string | null;
  cover_image: string | null;
  author: string | null;
  category: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

/** Shape used by Cards, BlogList, and blog pages */
export type Blog = {
  id: number;
  slug: string;
  href: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  content: string;
  contentAr: string;
  image: string;
  imageAlt: string;
  imageAltAr: string;
  author: string;
  category: string;
  publishedAt: string | null;
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

function blogHref(slug: string): string {
  return `/blogs/${slug}`;
}

function mapBlogPost(row: BlogPostRow): Blog {
  const title = row.title_en?.trim() || row.slug;
  const titleAr = row.title_ar?.trim() || title;

  return {
    id: row.id,
    slug: row.slug,
    href: blogHref(row.slug),
    title,
    titleAr,
    description: row.description_en?.trim() || "",
    descriptionAr: row.description_ar?.trim() || "",
    content: row.content_en?.trim() || "",
    contentAr: row.content_ar?.trim() || "",
    image: row.cover_image?.trim() || "",
    imageAlt: title,
    imageAltAr: titleAr,
    author: row.author?.trim() || "Arcwood",
    category: row.category?.trim() || "",
    publishedAt: row.published_at,
  };
}

export async function listBlogs(
  page = 1,
  perPage = DEFAULT_PER_PAGE
): Promise<BlogsResponse> {
  const pageSize = Math.max(perPage, 1);
  const currentPage = Math.max(page, 1);
  const from = (currentPage - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact" })
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("listBlogs:", error.message);
    throw new Error("Failed to fetch blogs");
  }

  const total = count ?? 0;
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);

  return {
    data: (data as BlogPostRow[]).map(mapBlogPost),
    meta: {
      page: currentPage,
      perPage: pageSize,
      total,
      totalPages,
    },
  };
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error("getBlogBySlug:", error.message);
    throw new Error("Failed to fetch blog");
  }

  if (!data) return null;

  return mapBlogPost(data as BlogPostRow);
}

export async function listRelatedBlogs(
  excludeId: number,
  limit = 12
): Promise<Blog[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .neq("id", excludeId)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("listRelatedBlogs:", error.message);
    throw new Error("Failed to fetch related blogs");
  }

  return (data as BlogPostRow[]).map(mapBlogPost);
}
