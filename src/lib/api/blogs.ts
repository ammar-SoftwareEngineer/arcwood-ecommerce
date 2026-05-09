import posts from "@/lib/data/blogs.json";

export type BlogItem = {
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

export type BlogsListMeta = {
  page: number;
  perPage: number;
  total: number;
  pages: number;
};

export type BlogsListResponse = {
  data: BlogItem[];
  meta: BlogsListMeta;
};

const all = posts as BlogItem[];

export function listBlogs(pageIn: number, perPageIn: number): BlogsListResponse {
  const perPage = Math.min(50, Math.max(1, perPageIn));
  const total = all.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const page = Math.min(Math.max(1, pageIn), pages);
  const start = (page - 1) * perPage;
  const data = all.slice(start, start + perPage);
  return {
    data,
    meta: { page, perPage, total, pages },
  };
}
