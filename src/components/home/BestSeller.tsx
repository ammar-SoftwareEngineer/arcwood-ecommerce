import ButtonMore from "../ui/ButtonMore";
import ProductGrid from "../products/ProductGrid";
import HeaderSection from "../ui/HeaderSection";
import { getProducts } from "@/lib/api/products";
import { getTranslations } from "next-intl/server";

export default async function BestSeller() {
  const t = await getTranslations("home");
  const { products } = await getProducts({ bestSeller: true, limit: 8 });

  if (products.length === 0) return null;

  return (
    <section className="best-seller-section py-12 bg-gray-100">
      <div className="container mx-auto px-8 xl:px-16 py-12">
        <HeaderSection
          subtitle={t("bestSeller.subtitle")}
          title={t("bestSeller.title")}
        />
        <ProductGrid products={products}  />
        <ButtonMore href="/products" text={t("cta.viewAllProducts")} />
      </div>
    </section>
  );
}
