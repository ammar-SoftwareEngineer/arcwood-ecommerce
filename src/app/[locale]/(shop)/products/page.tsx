import HeroPages from "@/components/layout/hero/HeroPages";
import ProductList from "@/components/products/ProductList";
import Pagination from "@/components/ui/Pagination";
import { getProducts } from "@/lib/api/products";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  searchParams: {
    page?: string;
    category?: string;
    material?: string;
    minPrice?: string;
    maxPrice?: string;
    isNew?: string;
    bestSeller?: string;
  };
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
    const resolved = searchParams ? await searchParams : {};
    const page = Number(resolved.page) || 1
    const { products, totalPages } = await getProducts({
      page,
      category: resolved.category,
      material: resolved.material,
      minPrice: resolved.minPrice ? Number(resolved.minPrice) : undefined,
      maxPrice: resolved.maxPrice ? Number(resolved.maxPrice) : undefined,
      isNew: resolved.isNew === "true",
      bestSeller: resolved.bestSeller === "true",
    });

  if (page > totalPages && totalPages > 0) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <HeroPages />
      <div className="container mx-auto px-8 py-12 md:py-20 lg:px-6 xl:px-16">
        {products.length === 0 ? (
          <p className="text-center text-lg text-neutral-600">{t("empty")}</p>
        ) : (

          <ProductList products={products} />
        )}

        <Pagination
          basePath="/products"
          activePage={page}
          totalPages={totalPages}
          labelsNamespace="home.products.pagination"
          className="mt-12"
        />
      </div>
    </section>
  );
}
