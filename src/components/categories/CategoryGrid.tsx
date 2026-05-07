import siteData from "@/lib/data/site.json";
import CategoryCard, { type CardCategory } from "@/components/categories/CategoryCard"

export default function CategoryGrid() {
  const categories: CardCategory[] = siteData.mainCategories

  return (
    <section className="grid grid-cols-12 gap-7 justify-items-center">

      {categories.map((category, index) => (
        <CategoryCard
          key={category.name}
          category={category}
          index={index}
        />
      ))}
      
    </section>


  )
}
