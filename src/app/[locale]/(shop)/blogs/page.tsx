import HeroPages from "@/components/layout/hero/HeroPages";
import BlogList from "@/components/blogs/BlogList";
import Pagination from "@/components/ui/Pagination";
import { listBlogs } from "@/lib/api/blogs";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type BlogsPageProps = {
  searchParams?: {
    page?: string;
  };
};

export async function generateMetadata() {
  const locale = await getLocale();

  const t = await getTranslations({
    locale,
    namespace: "metadata",
  });

  return {
    title: t("title.blogs"),
    description: t("description.blogs"),
  };
}

export default async function BlogsPage({
  searchParams,
}: BlogsPageProps) {
  const page = Number(searchParams?.page) || 1;

  const { data, meta } = await listBlogs(page);

  if (page > meta.totalPages && meta.totalPages > 0) {
    notFound();
  }

  const locale = await getLocale();

  return (
    <div>
      <HeroPages />

      <div className="container mx-auto px-8 py-12 md:py-20 lg:px-6 xl:px-16">
        <BlogList posts={data} isAr={locale === "ar"} />

        <Pagination
          basePath="/blogs"
          activePage={page}
          totalPages={meta.totalPages}
        />
      </div>
    </div>
  );
}
