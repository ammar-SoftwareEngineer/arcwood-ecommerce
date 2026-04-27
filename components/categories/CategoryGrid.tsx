import siteData from "@/lib/data/arcwood-site-data.json"
import CategoryCard, { type CardCategory } from "@/components/categories/CategoryCard"

export default function CategoryGrid() {
  const categories: CardCategory[] = siteData.mainCategories

  return (
    <div className="grid grid-cols-12 gap-7 justify-items-center">
     
        {categories.map((category, index) => (
        <CategoryCard
          key={category.name}
          category={category}
          index={index}
        />
      ))}
        </div>
     
  
  )
}
