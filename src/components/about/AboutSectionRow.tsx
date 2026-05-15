"use client";
import HeaderSection from "@/components/ui/HeaderSection";
import { publicImagePath } from "@/lib/publicImagePath";
import type { AboutSection } from "@/lib/api/about";
import Image from "next/image";
import { motion } from "framer-motion";
type AboutSectionRowProps = {
  section: AboutSection;
  isAr: boolean;
  reverse?: boolean;
};

export default function AboutSectionRow({
  section,
  isAr,
  reverse = false,
}: AboutSectionRowProps) {
  const imageSrc = publicImagePath(section.image);
  const badge = isAr ? section.badgeAr : section.badge;
  const title = isAr ? section.titleAr : section.title;
  const description = isAr ? section.descriptionAr : section.description;
  const imageAlt = isAr ? section.imageAltAr : section.imageAlt;

  return (
    <div
      className={`grid grid-cols-12 gap-8  items-center lg:gap-12   ${reverse ? "lg:[&>*:first-child]:order-2 bg-gray-100  " : ""
        }`}
    >
      <div className="col-span-12 lg:col-span-6  ">
        {reverse ? <div className="">
          <HeaderSection subtitle={badge} title={title} className="about-header px-4 pt-4" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >

            <p className="mt-10 text-base leading-7 text-neutral-600 md:text-lg px-8 " >
              {description}
            </p>
          </motion.div>
        </div> : 
        <>
          <HeaderSection subtitle={badge} title={title} className="about-header" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >

            <p className="mt-10 text-base leading-7 text-neutral-600 md:text-lg " >
              {description}
            </p>
          </motion.div>
        </>
        }

      </div>

      <div className="col-span-12 lg:col-span-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {imageSrc ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-0 shadow-md  ">
              <Image
                src={imageSrc}
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
