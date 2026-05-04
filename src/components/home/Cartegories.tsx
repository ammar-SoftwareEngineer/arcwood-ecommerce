"use client";

import CategoryGrid from "@/components/categories/CategoryGrid";
import { motion } from "framer-motion";
import "@/styles/home/CategoriesSection.module.css";
import ButtonMore from "../ui/ButtonMore";
import HeaderSection from "../ui/HeaderSection";
import { useTranslations } from "next-intl";
export default function Cartegories() {
  const t = useTranslations("home");
  return (
    <section className="categories-section py-12 ">
      <div className="container mx-auto px-8 lg:px-16 py-12">
        <HeaderSection
          subtitle={t("categories.subtitle")}
          title={t("categories.title")}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <CategoryGrid />
        </motion.div>
        <ButtonMore href="/categories" text={t("cta.viewAllCategories")} />
      </div>
    </section>
  );
}
