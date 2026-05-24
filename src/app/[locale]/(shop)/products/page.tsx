import HeroPages from "@/components/layout/hero/HeroPages";
import ProductFilters from "@/components/products/ProductFilters";
import ProductList from "@/components/products/ProductList";
import SortSelect from "@/components/products/SortSelect";
import Pagination from "@/components/ui/Pagination";
import { getProducts } from "@/lib/api/products";
import { getSort, toQueryString } from "@/lib/products/product-query";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title.products"),
    description: t("description.products"),
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const t = await getTranslations("home.products");
  const q = (await searchParams) ?? {};
  const page = Number(q.page) || 1;
  const query = toQueryString(q);

  const { products, totalPages } = await getProducts({
    page,
    category: q.category,
    material: q.material,
    minPrice: q.minPrice ? Number(q.minPrice) : undefined,
    maxPrice: q.maxPrice ? Number(q.maxPrice) : undefined,
    isNew: q.isNew === "true",
    bestSeller: q.bestSeller === "true",
    search: q.search,
    sort: getSort(q),
  });

  if (page > totalPages && totalPages > 0) {
    notFound();
  }

  return (
    <section className="space-y-6 bg-gray-100">
      <HeroPages />
      <div className="container mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8 xl:px-16">
        <div className="grid grid-cols-12 gap-6  lg:gap-10 w-full">
          <div className="hidden xl:col-span-3 md:col-span-4 col-span-12 lg:block">
            <ProductFilters q={q} show="desktop" />
          </div>

          <div className=" xl:col-span-9 lg:col-span-8 col-span-12">
            <div className="mb-6 flex  flex-row items-stretch gap-3 lg:justify-between">
              <ProductFilters q={q} show="mobile" />
              <SortSelect sort={getSort(q)} query={query} />
            </div>

            {products.length === 0 ? (
              <p className="bg-(--primary) p-4 text-center text-base text-white sm:text-lg">
                {t("empty")}
              </p>
            ) : (
              <ProductList
                products={products}
                className="col-span-12 sm:col-span-6 xl:col-span-4"
              />
            )}

            <Pagination
              basePath="/products"
              activePage={page}
              totalPages={totalPages}
              filterQuery={query}
              labelsNamespace="home.products.pagination"
              className="mt-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
