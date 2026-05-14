import HeroPages from "@/components/layout/hero/HeroPages";
import BlogList from "@/components/blogs/BlogList";
import Pagination from "@/components/ui/Pagination";
import { listBlogs } from "@/lib/api/blogs";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type BlogsPageProps = {

  searchParams: Promise<{ page?: string }>;
};

import { getTranslations } from "next-intl/server";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title.blogs"),
    description: t("description.blogs"),
  };
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const page = Number((await searchParams).page ?? 1) || 1;
  const activePage = Math.max(1, page);
  const { data, meta } = await listBlogs(activePage);
  const locale = await getLocale();

  if (activePage > meta.pages) notFound();

  return (
    <div>
      <HeroPages />
      <div className="container mx-auto px-8 py-12 lg:px-6 xl:px-16">
        <BlogList posts={data} isAr={locale === "ar"} />
        <Pagination
          basePath="/blogs"
          activePage={activePage}
          totalPages={meta.pages}
        />
      </div>
    </div>
  );
}