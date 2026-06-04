import BlogList from "@/components/blogs/BlogList";
import HeroPages from "@/components/layout/hero/HeroPages";
import { getBlogBySlug, listRelatedBlogs } from "@/lib/api/blogs";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return {};

  const isAr = locale === "ar";
  return {
    title: isAr ? blog.titleAr : blog.title,
    description: isAr ? blog.descriptionAr : blog.description,
  };
}

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const locale = await getLocale();
  const isAr = locale === "ar";
  const title = isAr ? blog.titleAr : blog.title;
  const html = isAr ? blog.contentAr || blog.content : blog.content;
  const description = isAr ? blog.descriptionAr : blog.description;
  const readmore = isAr ? "اقرأ المزيد" : "Read more";

  const related = await listRelatedBlogs(blog.id);
  const relatedLabel = isAr ? "مقالات أخري" : "More articles";

  const publishedLabel = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString(isAr ? "ar-EG" : "en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div>
      <HeroPages title={title} />
      <section className="blogs-section py-12 md:py-20">
        <div className="container mx-auto space-y-16 px-8 lg:px-6 xl:px-16">
          <article className="  space-y-8">
            {blog.image ? (
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
                <Image
                  src={blog.image}
                  alt={isAr ? blog.imageAltAr : blog.imageAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>
            ) : null}

            <header className="space-y-2">
              {blog.category ? (
                <p className="text-sm font-medium uppercase tracking-wide text-main">
                  {blog.category}
                </p>
              ) : null}
              <h2 className="text-2xl font-semibold text-main md:text-3xl">{title}</h2>
              <p className="text-sm text-black/50">
                {blog.author}
                {publishedLabel ? ` · ${publishedLabel}` : null}
              </p>
            </header>

            {html ? (
              <div
                className="max-w-none space-y-4 leading-relaxed text-black/80 [&_a]:text-main [&_h2]:mt-6 [&_h2]:text-main [&_h3]:text-main [&_li]:mb-1 [&_ol]:list-decimal [&_ol]:ps-6 [&_p]:mb-4 [&_strong]:text-black/90 [&_ul]:list-disc [&_ul]:ps-6"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <p className="leading-relaxed text-black/80">{description}</p>
            )}
          </article>

          {related.length > 0 ? (
            <section className="border-t border-black/10 pt-16">
              <h2 className="text-center text-3xl font-semibold text-main">
                {relatedLabel}
              </h2>
              <div className="mt-10">
                <BlogList posts={related} isAr={isAr} readmore={readmore} />
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </div>
  );
}
