"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import "@/styles/home/CategoriesSection.module.css";
import { Category } from "@/lib/api/categories";

export type CardCategory = {
  id: string;
  name: string;
  name_ar: string;
  product_count: number;
  image: string | null;
  imageAlt: string;
};




export default function CategoryCard({ category,variant,index }: { category: Category,variant: "grid" | "slider",index: number }) {

const t = useTranslations("categories");

  const locale = useLocale() as "en" | "ar";

  return (
    <motion.div
      className={
        variant === "grid"
          ? "col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
          : "flex w-full justify-center"
      }
    >
      <Link href={`/products?category=${encodeURIComponent(category.name)}`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          className="hex hex-outer relative h-[350px] w-[300px]"
        >
          <div className="hex-content">
            <Image
              src={category.image_url || ""}
              alt={category.name || ""}
              fill
              sizes="250px"
              className="object-cover"
              priority={index < 4}
            />
          </div>
          <div className="innerBorder pointer-events-none absolute inset-0" />

          <motion.div className="badge absolute  rtl:inset-auto ltr:inset-0 flex h-full w-full flex-col justify-center py-3 text-white">
            <p className="mx-auto flex items-center gap-2 w-fit bg-(--primary) px-3 py-1 text-lg font-medium">
              {category.product_count} 
              <span className="text-base">{t("products")}</span>
            </p>
            <div className="badgeDivider my-1 h-px bg-white/40" />
            {locale === "ar" ? (
              <p className="badgeName text-center text-lg font-bold">
                {category.name_ar}
              </p>
            ) : (
              <p className="badgeName text-center text-xl font-bold">
                {category.name}
              </p>
            )}
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
