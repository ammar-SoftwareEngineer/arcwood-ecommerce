"use client";
import { motion } from "framer-motion";
// import "@/styles/home/ProductsSection.module.css";
import ButtonMore from "../ui/ButtonMore";
import ProductGrid from "../products/ProductGrid";
export default function Products() {
  return (
    <section className="products-section py-12">
      <div className="container mx-auto lg:px-20 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className={"header"}
        >
          <p className={"subtitle"}>New Arrivals</p>
          <h2 className={"title"}>Our Products</h2>
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
          transition={{ duration: 0.5, delay: 0.2 }}
        >
            <ProductGrid items={[]} />
        </motion.div>
        <ButtonMore href="/products" text="View All Products" />
      </div>
    </section>
  );
}