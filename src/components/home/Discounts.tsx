"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale } from "next-intl";
import siteData from "@/lib/data/arcwood-site-data.json";
import { publicImagePath } from "@/lib/publicImagePath";
import ButtonMore from "../ui/ButtonMore";
import HeaderSection from "../ui/HeaderSection";
import DiscountCountdown from "../discounts/DiscountCountdown";
import { useTranslations } from "next-intl";

const banner = siteData.discountsBanner;

const motionEase = [0.22, 1, 0.36, 1] as const;

export default function Discounts() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isAr = locale === "ar";

  const description = isAr ? banner.descriptionAr : banner.description;
  const ctaLabel = isAr ? banner.ctaLabelAr : banner.ctaLabel;
  const imageAlt = isAr ? banner.imageAltAr : banner.imageAlt;

  const countdownLabels = {
    days: isAr ? banner.countdownLabels.daysAr : banner.countdownLabels.days,
    hours: isAr ? banner.countdownLabels.hoursAr : banner.countdownLabels.hours,
    minutes: isAr ? banner.countdownLabels.minutesAr : banner.countdownLabels.minutes,
    seconds: isAr ? banner.countdownLabels.secondsAr : banner.countdownLabels.seconds,
  };

  const src = publicImagePath(banner.image);
  if (!src) return null;

  // Copy first in DOM (start side on LTR); image second. Mirror slide X for RTL.
  const slideCopyX = isAr ? 48 : -48;
  const slideImageX = isAr ? -48 : 48;

  return (
    <section className="discounts-banner  overflow-hidden bg-neutral-100">

        <div className="grid grid-cols-12 items-center ">
          <motion.div
            className="col-span-12 flex flex-col justify-center gap-6 lg:col-span-5 xl:col-span-6 md:px-24 px-8 md:py-10 py-12"
            initial={{ opacity: 0, x: slideCopyX }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: motionEase }}
          >
            <HeaderSection subtitle={t("discounts.subtitle")} title={t("discounts.title")} className="discounts-header" />
            <p className="max-w-xl text-lg leading-relaxed text-neutral-600 md:text-base">
              {description}
            </p>
            <DiscountCountdown endsAt={banner.endsAt} labels={countdownLabels} />
            <div className="flex justify-start pt-2 [&_button]:mx-0 [&_button]:mt-4">
              <ButtonMore href={banner.ctaHref} text={ctaLabel} />
            </div>
          </motion.div>

          <motion.div
            className="relative col-span-12 min-h-[380px] w-full lg:col-span-7 xl:col-span-6 h-full"
            initial={{ opacity: 0, x: slideImageX }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.06, ease: motionEase }}
          >
            <Image
              src={src}
              alt={imageAlt}
              fill
              sizes="100%"
              className="h-full w-full object-cover"
              priority
            />
          </motion.div>
        </div>
 
    </section>
  );
}
