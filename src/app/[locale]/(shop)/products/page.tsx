import HeroPages from "@/components/layout/hero/HeroPages";
import ProductList from "@/components/products/ProductList";
import Pagination from "@/components/ui/Pagination";
import { getProducts } from "@/lib/api/products";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type ProductsPageProps = {
  searchParams?: Promise<{ page?: string }>;
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

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolved = searchParams ? await searchParams : {};
  const page = Number(resolved.page) || 1;
  const t = await getTranslations("home.products");

  const products = await getProducts({ limit: 8 });

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
          totalPages={  products.length /6}
          labelsNamespace="home.products.pagination"
          className="mt-12"
        />
      </div>
    </section>
  );
}
