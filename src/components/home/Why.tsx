"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import siteData from "@/lib/data/site.json";
import ButtonMore from "../ui/ButtonMore";
import WhyFeatures from "../why/WhyFeatures";
import WhyOverlappingImages from "../why/WhyOverlappingImages";
import { publicImagePath } from "@/lib/publicImagePath";
import HeaderSection from "../ui/HeaderSection";

const why = siteData.whyChooseUs;

export default function Why() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const subtitle = isAr ? why.subtitleAr : why.subtitle;
  const title = isAr ? why.titleAr : why.title;
  const description = isAr ? why.descriptionAr : why.description;
  const ctaLabel = isAr ? why.ctaLabelAr : why.ctaLabel;
  const primaryAlt = isAr ? why.primaryImageAltAr : why.primaryImageAlt;
  const secondaryAlt = isAr ? why.secondaryImageAltAr : why.secondaryImageAlt;

  // LTR: images slide in from the left, copy from the right. RTL mirrors so motion matches column sides.
  const slideImagesX = isAr ? 56 : -56;
  const slideCopyX = isAr ? -56 : 56;

  return (
    <section className="why-section ">
      <div className="container mx-auto px-8  lg:px-6 xl:px-16">
        <div className="grid gap-8 grid-cols-12 lg:items-center xl:gap-12">
          <motion.div
            className="xl:col-span-6 lg:col-span-7 col-span-12"
            initial={{ opacity: 0, x: slideImagesX }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <WhyOverlappingImages
              primarySrc={publicImagePath(why.primaryImage)}
              secondarySrc={publicImagePath(why.secondaryImage)}
              primaryAlt={primaryAlt}
              secondaryAlt={secondaryAlt}
            />
          </motion.div>

          <motion.div
            className="flex flex-col gap-2 xl:col-span-6 lg:col-span-5 col-span-12"
            initial={{ opacity: 0, x: slideCopyX }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeaderSection className="about-header " subtitle={subtitle} title={title} />
            <p className=" text-neutral-600 mb-5 text-lg mt-6">{description}</p>
            <WhyFeatures features={why.features} isAr={isAr} />
            <div className="flex justify-start pt-2 [&_button]:mx-0 [&_button]:mt-4">
              <ButtonMore href={why.ctaHref} text={ctaLabel} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
