import HeroPages from "@/components/layout/hero/HeroPages";
import BlogList from "@/components/blogs/BlogList";
import BlogPagination from "@/components/blogs/BlogPagination";
import { listBlogs } from "@/lib/api/blogs";
import { getLocale } from "next-intl/server";

export const revalidate = 120;

const PER_PAGE = 2;

type BlogsPageProps = {
  searchParams: Promise<{ page?: string }>;
};

function parsePage(raw: string | undefined) {
  const n = parseInt(raw ?? "1", 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const sp = await searchParams;
  const urlPage = parsePage(sp.page);
  const locale = await getLocale();
  const result = listBlogs(urlPage, PER_PAGE);

  return (
    <div>
      <HeroPages />
      <div className="container mx-auto px-8 py-12 lg:px-6 xl:px-16">
        <BlogList posts={result.data} isAr={locale === "ar"} />
        <BlogPagination
          className="mt-10"
          activePage={result.meta.page}
          totalPages={result.meta.pages}
        />
      </div>
    </div>
  );
}
