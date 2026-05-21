
import CategoryGrid from "@/components/categories/CategoryGrid";
import { getCategories} from "@/lib/api/categories";
import "@/styles/home/CategoriesSection.module.css";
import ButtonMore from "../ui/ButtonMore";
import HeaderSection from "../ui/HeaderSection";

import { getTranslations } from "next-intl/server";



export default async function Cartegories() {
  const categories = await getCategories();
  const t = await getTranslations("home");
  return (
    <section className="categories-section py-12 ">
      <div className="container mx-auto px-8  xl:px-16 py-12">
        <HeaderSection
          subtitle={t("categories.subtitle")}
          title={t("categories.title")}
        />
   
          <CategoryGrid categories={categories} />
      
        <ButtonMore href="/categories" text={t("cta.viewAllCategories")} />
      </div>
    </section>
  );
}
