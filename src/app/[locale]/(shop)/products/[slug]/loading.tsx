import { ProductDetailsSkeleton } from "@/components/products/details";
import HeroPages from "@/components/layout/hero/HeroPages";

export default function ProductDetailsLoading() {
  return (
    <div>
      <HeroPages />
      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <ProductDetailsSkeleton />
        </div>
      </section>
    </div>
  );
}
