import HeaderSection from "../ui/HeaderSection";
import { useTranslations } from "next-intl";
import Cards from "../ui/Cards";
import blogs from "@/lib/data/arcwood-site-data.json";
import ButtonMore from "../ui/ButtonMore";
export default function Blogs() {
  const t = useTranslations("home");
  const blogsData = blogs;
  return (
    <section className="blogs-section py-12">
      <div className="container mx-auto px-8 lg:px-6 xl:px-16 py-12">
        <HeaderSection subtitle={t("blogs.subtitle")} title={t("blogs.title")} />
        <div className="grid grid-cols-12 gap-6  ">
          {blogsData.blogs.map((blog,index) => (
            <div key={index} className="md:col-span-4 col-span-12">
              <Cards  title={blog.title} image={blog.image} description={blog.description} href={blog.href} />
            </div>
          ))}
        </div>
        <ButtonMore href="/blogs" text={t("cta.viewAllBlogs")} />

      </div>
    </section>
  );
}