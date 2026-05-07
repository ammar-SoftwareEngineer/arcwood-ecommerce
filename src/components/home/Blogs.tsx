"use client";

import HeaderSection from "../ui/HeaderSection";
import { useLocale, useTranslations } from "next-intl";
import Cards from "../ui/Cards";
import blogs from "@/lib/data/site.json";
import ButtonMore from "../ui/ButtonMore";

export default function Blogs() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isAr = locale === "ar";
  const blogsData = blogs;

  return (
    <section className="blogs-section py-12">
      <div className="container mx-auto px-8 lg:px-6 xl:px-16 py-12">
        <HeaderSection subtitle={t("blogs.subtitle")} title={t("blogs.title")} />
        <div className="grid grid-cols-12 gap-6  ">
          {blogsData.blogs.map((blog) => (
            <div key={blog.href} className="col-span-12 md:col-span-4">
              <Cards
                title={isAr ? blog.titleAr : blog.title}
                description={isAr ? blog.descriptionAr : blog.description}
                image={blog.image}
                imageAlt={isAr ? blog.imageAltAr : blog.imageAlt}
                href={blog.href}
              />
            </div>
          ))}
        </div>
        <ButtonMore href="/blogs" text={t("cta.viewAllBlogs")} />

      </div>
    </section>
  );
}