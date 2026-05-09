import { getTranslations} from "next-intl/server";
import HeroPages from "@/components/layout/hero/HeroPages";
import CategoryGrid from "@/components/categories/CategoryGrid";
export default async function CategoryPage() {

  const t = await getTranslations("categories");
  return (
    <div>
      <HeroPages />
      <div className="container mx-auto px-8 py-16 lg:px-6 xl:px-16">

     <CategoryGrid />
      </div>
    </div>
  );
}