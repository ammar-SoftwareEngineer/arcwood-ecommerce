import CategoryGrid from "@/components/categories/CategoryGrid";

export default function Cartegories() {

  return (
    <section className="categories-section py-12 ">
      <div className="container mx-auto lg:px-20 py-12">
        <div className="header-section mb-16 px-6 lg:px-0">
          <h2 className="text-5xl font-bold ">Categories</h2>
        
        </div>
        <CategoryGrid />
      </div>
    </section>
  )
}
