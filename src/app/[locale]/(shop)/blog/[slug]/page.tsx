import HeroPages from "@/components/layout/hero/HeroPages";
import { getBlogBySlug } from "@/lib/api/blogs";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type BlogDetailsPageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: BlogDetailsPageProps) {
  const { slug, locale } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {};
  }

  const isAr = locale === "ar";

  return {
    title: isAr ? blog.titleAr : blog.title,
    description: isAr ? blog.descriptionAr : blog.description,
  };
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const locale = await getLocale();
  const tHero = await getTranslations("hero");
  const isAr = locale === "ar";

  return (
    <div>
      <HeroPages title={isAr ? blog.titleAr : blog.title} />
      <section className="blogs-section py-12 md:py-20">
        <div className="container mx-auto px-8 lg:px-6 xl:px-16">
          <article className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-semibold text-main">
              {isAr ? blog.titleAr : blog.title}
            </h2>
            <p className="leading-relaxed text-black/80">
              {isAr ? blog.descriptionAr : blog.description}
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
