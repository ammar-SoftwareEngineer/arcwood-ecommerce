"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import siteData from "@/lib/data/site.json";
import ButtonMore from "../ui/ButtonMore";
import WhyFeatures from "../why/WhyFeatures";

import HeaderSection from "../ui/HeaderSection";
import { whyFeatureIcons } from "../why/whyFeatureIcons";

const why = siteData.whyChooseUs;
export default function WhyUs() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const subtitle = isAr ? why.subtitleAr : why.subtitle;
  const title = isAr ? why.titleAr : why.title;
  const description = isAr ? why.descriptionAr : why.description;
  const ctaLabel = isAr ? why.ctaLabelAr : why.ctaLabel;
  const primaryAlt = isAr ? why.primaryImageAltAr : why.primaryImageAlt;
  const secondaryAlt = isAr ? why.secondaryImageAltAr : why.secondaryImageAlt;
  return (
    <div>
      <div
        className="flex flex-col  justify-center items-center"

      >
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>

          <HeaderSection className="" subtitle={subtitle} title={title} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <ul className="grid gap-24 grid-cols-12 " >
            {why.features.map((feature, index) => {
              const Icon = whyFeatureIcons[feature.icon];
              const label = isAr ? feature.titleAr : feature.title;
              return (
                <li
                  key={`${feature.icon}-${index}`}
                  className="col-span-3 flex items-center gap-3"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center text-(--primary)" aria-hidden>
                    <Icon className="h-10 w-10" aria-hidden />
                  </span>
                  <span className="text-lg font-medium text-neutral-800">{label}</span>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}