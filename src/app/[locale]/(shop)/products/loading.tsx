import HeroPages from "@/components/layout/hero/HeroPages";
import ProductsGridSkeleton from "@/components/products/ProductsGridSkeleton";

export default function ProductsLoading() {
  return (
    <section className="space-y-6">
      <HeroPages />
      <div className="container mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8 xl:px-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="hidden lg:col-span-3 lg:block">
            <div className="h-80 animate-pulse border border-black/10 bg-neutral-100" />
          </div>
          <div className="lg:col-span-9">
            <ProductsGridSkeleton />
          </div>
        </div>
      </div>
    </section>
  );
}
