"use client";
import { motion } from "framer-motion";
import ButtonMore from "../ui/ButtonMore";
import ProductGrid from "../products/ProductGrid";
import HeaderSection from "../ui/HeaderSection";
import { useTranslations } from "next-intl";
import productBestSeller from "@/lib/data/arcwood-site-data.json";
export default function BestSeller() {
  const t = useTranslations("home");
  const productData = productBestSeller.bestSellerProducts;
  return (
    <section className="best-seller-section py-12" >
    <div className="container mx-auto px-8  xl:px-16 py-12">
      <HeaderSection
        subtitle={t("bestSeller.subtitle")}
        title={t("bestSeller.title")}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ProductGrid bestSeller={true} productBestSellerData={productData} />
      </motion.div>
      <ButtonMore href="/products" text={t("cta.viewAllProducts")} />
    </div>
  </section>
  );
}