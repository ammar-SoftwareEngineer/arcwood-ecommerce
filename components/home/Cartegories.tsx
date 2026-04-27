import CategoryGrid from "@/components/categories/CategoryGrid";

export default function Cartegories() {

  return (
    <section className="categories-section py-12 ">
      <div className="container mx-auto lg:px-20 py-12">
        <div className="header-section mb-10 px-6 lg:px-0">
          <h2 className="text-4xl font-bold text-main">Categories</h2>
          <p className="mt-3 text-gray-500">
            Browse our main product categories
          </p>
        </div>
        <CategoryGrid />
      </div>
    </section>
  )
}
