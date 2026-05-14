import posts from "@/lib/data/blogs.json";

export type BlogItem = {
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
};

const blogs = posts as {
  data: BlogItem[];
  meta: {
    perPage: number;
    maxPerPage: number;
  };
};

export function listBlogs(
  page = 1,
  perPage = blogs.meta.perPage
) {
  // Validate perPage value
  perPage = Math.max(
    1,
    Math.min(perPage, blogs.meta.maxPerPage)
  );

  // Total number of blogs
  const total = blogs.data.length;

  // Total number of pages
  const pages = Math.ceil(total / perPage);

  // Validate current page
  page = Math.max(1, Math.min(page, pages));

  // Starting index
  const start = (page - 1) * perPage;

  // Get blogs for current page
  const data = blogs.data.slice(
    start,
    start + perPage
  );

  // Return paginated data
  return {
    data,

    meta: {
      page,
      perPage,
      total,
      pages,
    },
  };
}