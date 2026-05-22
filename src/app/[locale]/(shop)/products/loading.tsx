import HeroPages from "@/components/layout/hero/HeroPages";
import ProductsGridSkeleton from "@/components/products/ProductsGridSkeleton";

export default function ProductsLoading() {
  return (
    <section className="space-y-6">
      <HeroPages />
      <div className="container mx-auto px-8 py-12 md:py-20 lg:px-6 xl:px-16">
        <div className="grid grid-cols-12 gap-16">
          <div className="col-span-12 lg:col-span-3">
            <div className="h-80 animate-pulse border border-black/10 bg-neutral-100" />
          </div>
          <div className="col-span-12 lg:col-span-9">
            <ProductsGridSkeleton />
          </div>
        </div>
      </div>
    </section>
  );
}
