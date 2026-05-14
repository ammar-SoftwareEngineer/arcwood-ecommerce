import HeaderSection from "../ui/HeaderSection";
import ButtonMore from "../ui/ButtonMore";
import Cards from "../ui/Cards";
import { getLocale, getTranslations } from "next-intl/server";
import { listBlogs } from "@/lib/api/blogs";

export default async function Blogs() {
  const t = await getTranslations("home");
  const locale = await getLocale();
  const isAr = locale === "ar";
  const { data } = listBlogs(1, 3);

  return (
    <section className="blogs-section py-12">
      <div className="container mx-auto px-8 py-12 lg:px-6 xl:px-16">
        <HeaderSection subtitle={t("blogs.subtitle")} title={t("blogs.title")} />
        <div className="grid grid-cols-12 gap-6">
          {data.map((blog) => (
            <div key={blog.id} className="col-span-12 md:col-span-4">
              <Cards
                params={{
                  title: isAr ? blog.titleAr : blog.title,
                  description: isAr ? blog.descriptionAr : blog.description,
                  image: blog.image,
                  imageAlt: isAr ? blog.imageAltAr : blog.imageAlt,
                  href: blog.href,
                  readmore: isAr ? blog.readmoreAr : blog.readmore,
                }}
              />
            </div>
          ))}
        </div>
        <ButtonMore href="/blogs" text={t("cta.viewAllBlogs")} />
      </div>
    </section>
  );
}
