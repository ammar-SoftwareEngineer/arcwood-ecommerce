"use client";

import HeaderSection from "@/components/ui/HeaderSection";
import type { AboutSection } from "@/lib/api/about";
import Image from "next/image";
import { motion } from "framer-motion";



export default function AboutSectionRow({ sectionAbout ,reverse ,isAr}: { sectionAbout: AboutSection, reverse: boolean, isAr: boolean }) {
  const subtitle = isAr ? sectionAbout.badge_ar : sectionAbout.badge;
  const title = isAr ? sectionAbout.title_ar : sectionAbout.title;
  const description = isAr ? sectionAbout.description_ar : sectionAbout.description;
  const imageAlt = isAr ? sectionAbout.image_alt_ar : sectionAbout.image_alt;
  return (
    <div
      className={`grid grid-cols-12 items-center gap-8 lg:gap-12 ${
        reverse ? "lg:[&>*:first-child]:order-2 bg-gray-100" : ""
      }`}
    >
      <div className="col-span-12 lg:col-span-6">
        <HeaderSection
          subtitle={subtitle}
          title={title}
          className={reverse ? "about-header px-4 pt-4" : "about-header"}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p
            className={`mt-10 text-base leading-7 text-neutral-600 md:text-lg ${
              reverse ? "px-8" : ""
            }`}
          >
            {description}
          </p>
        </motion.div>
      </div>

      <div className="col-span-12 lg:col-span-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {sectionAbout.image ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-0 shadow-md">
              <Image
                src={sectionAbout.image ?? ""}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}
