"use client";

import CategoryGrid from "@/components/categories/CategoryGrid";
import { motion } from "framer-motion";
import "@/styles/home/CategoriesSection.module.css";
import ButtonMore from "../ui/ButtonMore";
export default function Cartegories() {
  return (
    <section className="categories-section py-12 ">
      <div className="container mx-auto lg:px-20 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className={"header"}
        >

          <p className={"subtitle"}>Explore Our Collection</p>
          <h2 className={"title"}>Shop by Category</h2>
          <div className={"divider"}>
            <span className={"line"} />
            <span className={"dot"} />
            <span className={"lineReverse"} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <CategoryGrid />
        </motion.div>
        <ButtonMore href="/categories" text="View All Categories" />
      </div>
    </section>
  );
}
