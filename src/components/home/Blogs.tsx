import HeaderSection from "../ui/HeaderSection";
import { useTranslations } from "next-intl";

export default function Blogs() {
  const t = useTranslations("home");
  return (
    <section className="blogs-section py-12">
      <div className="container mx-auto px-8 lg:px-6 xl:px-16 py-12">
       <HeaderSection subtitle={t("blogs.subtitle")} title={t("blogs.title")} />
      </div>
    </section>
  );
}