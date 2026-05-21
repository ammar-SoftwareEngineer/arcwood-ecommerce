import "@/styles/home/products.css";
import ButtonMore from "../ui/ButtonMore";
import HeaderSection from "../ui/HeaderSection";
import ProductGrid from "../products/ProductGrid";
import { getProducts } from "@/lib/api/products";
import { getTranslations } from "next-intl/server";

export default async function Products() {
  const t = await getTranslations("home");
  const products = await getProducts({ limit: 8 });

  return (
    <section className="products-section py-12">
      <div className="container mx-auto px-8 xl:px-16 py-12">
        <HeaderSection
          subtitle={t("products.subtitle")}
          title={t("products.title")}
        />
        <div>
          <ProductGrid products={products} />
        </div>
        <ButtonMore href="/products" text={t("cta.viewAllProducts")} />
      </div>
    </section>
  );
}