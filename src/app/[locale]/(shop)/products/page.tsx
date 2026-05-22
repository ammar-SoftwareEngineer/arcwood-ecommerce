import HeroPages from "@/components/layout/hero/HeroPages";
import ProductFilters from "@/components/products/ProductFilters";
import ProductList from "@/components/products/ProductList";
import SortSelect from "@/components/products/SortSelect";
import Pagination from "@/components/ui/Pagination";
import { getProducts } from "@/lib/api/products";
import { getSort, toQueryString } from "@/lib/product-query";
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
    <section className="space-y-6">
      <HeroPages />
      <div className="container mx-auto px-8 py-12 md:py-20 lg:px-6 xl:px-16">
        <div className="grid grid-cols-12 gap-16">
          <div className="col-span-12 lg:col-span-3">
            <ProductFilters q={q} />
          </div>

          <div className="col-span-12 lg:col-span-9">
            <div className="mb-6 flex justify-between items-center">
              <SortSelect sort={getSort(q)} query={query} />
            </div>

            {products.length === 0 ? (
              <p className="bg-(--primary) p-4 text-center text-lg text-white">{t("empty")}</p>
            ) : (
              <ProductList
                products={products}
                className="col-span-12 sm:col-span-6 lg:col-span-4"
              />
            )}

            <Pagination
              basePath="/products"
              activePage={page}
              totalPages={totalPages}
              filterQuery={query}
              labelsNamespace="home.products.pagination"
              className="mt-12"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
