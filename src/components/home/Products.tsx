"use client";
import { motion } from "framer-motion";
import "@/styles/home/products.css";
import ButtonMore from "../ui/ButtonMore";
import HeaderSection from "../ui/HeaderSection";
import ProductGrid from "../products/ProductGrid";
import { useTranslations } from "next-intl";
import productMostViewed from "@/lib/data/arcwood-site-data.json";
export default function Products() {
  const t = useTranslations("home");
  const productMostViewedData = productMostViewed.mostViewedProducts;
  return (
    <section className="products-section py-12" >
      <div className="container mx-auto px-8  xl:px-16 py-12">
        <HeaderSection
          subtitle={t("products.subtitle")}
          title={t("products.title")}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProductGrid bestSeller={false} productMostViewedData={productMostViewedData} />
        </motion.div>
        <ButtonMore href="/products" text={t("cta.viewAllProducts")} />
      </div>
    </section>
  );
}