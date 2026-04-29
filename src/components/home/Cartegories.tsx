"use client";

import CategoryGrid from "@/components/categories/CategoryGrid";
import { motion } from "framer-motion";
import "@/styles/home/CategoriesSection.module.css";
import { Link } from "@/i18n/navigation";
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
          <div className={"hexIcon"} />
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
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: 0.2 }}
  
          whileTap={{ scale: 0.98 }}
          className={"cta mx-auto mt-16"}
        >
          <Link href="/categories">
          View All Categories
          </Link>
        </motion.button>
      </div>
    </section>
  );
}
