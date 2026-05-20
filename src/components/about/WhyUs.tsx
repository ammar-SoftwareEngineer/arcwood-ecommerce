"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import HeaderSection from "@/components/ui/HeaderSection";
import WhyFeatures from "@/components/why/WhyFeatures";
import type { WhyUsData } from "@/lib/api/why";

type WhyUsProps = {
  why: WhyUsData | null;
};

export default function WhyUs({ why }: WhyUsProps) {
  console.log(why);
  const locale = useLocale();
  const isAr = locale === "ar";

  if (!why) return null;

  const subtitle = isAr ? why.subtitle_ar : why.subtitle;
  const title = isAr ? why.title_ar : why.title;

  const features = why.features.map((feature) => ({
    id: feature.id,
    icon: feature.icon,
    title: isAr ? feature.title_ar : feature.title,
  }));

  return (
    <div className="pt-8">
      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeaderSection subtitle={subtitle ?? ""} title={title ?? ""} />
        </motion.div>

        <WhyFeatures
          features={features}
          animated
          listClassName="grid grid-cols-12 gap-24"
          itemClassName="col-span-3 flex items-center gap-3"
        />
      </div>
    </div>
  );
}
