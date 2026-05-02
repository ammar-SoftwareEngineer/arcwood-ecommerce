"use client";
import { motion } from "framer-motion";
// import "@/styles/home/ProductsSection.module.css";
import ButtonMore from "../ui/ButtonMore";
import HeaderSection from "../ui/HeaderSection";
import ProductGrid from "../products/ProductGrid";
import { useTranslations } from "next-intl";
export default function Products() {
  const t = useTranslations("home");
  return (
    <section className="products-section py-12">
      <div className="container mx-auto lg:px-20 py-12">
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
          <ProductGrid />
        </motion.div>
        <ButtonMore href="/products" text={t("cta.viewAllProducts")} />
      </div>
    </section>
  );
}