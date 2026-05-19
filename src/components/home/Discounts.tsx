import DiscountCountdown from "@/components/discounts/DiscountCountdown";
import ButtonMore from "@/components/ui/ButtonMore";
import HeaderSection from "@/components/ui/HeaderSection";
import { getDiscountsBanner } from "@/lib/api/discountsBanner";
import { log } from "console";
import { getLocale } from "next-intl/server";
import Image from "next/image";

export default async function Discounts() {
  const banner = await getDiscountsBanner();

  if (!banner) return null;

  const locale = await getLocale();
  const isAr = locale === "ar";

  const subtitle = isAr ? banner.subtitle_ar : banner.subtitle;
  const title = isAr ? banner.title_ar : banner.title;
  const description = isAr ? banner.description_ar : banner.description;
  const ctaLabel = isAr ? banner.cta_label_ar : banner.cta_label;
  const imageAlt = isAr ? banner.image_alt_ar : banner.image_alt;

  const countdownLabels = {
    days: isAr ? banner.days_label_ar : banner.days_label,
    hours: isAr ? banner.hours_label_ar : banner.hours_label,
    minutes: isAr ? banner.minutes_label_ar : banner.minutes_label,
    seconds: isAr ? banner.seconds_label_ar : banner.seconds_label,
  };

  return (
    <section className="discounts-banner overflow-hidden bg-neutral-100">
      <div className="grid grid-cols-12 items-center">
        <div className="col-span-12 flex h-[80vh] flex-col justify-center gap-6 px-8 md:px-24 lg:col-span-5 xl:col-span-6">
          <HeaderSection
            subtitle={subtitle ?? ""}
            title={title ?? ""}
            className="discounts-header"
          />
          {description ? (
            <p className="mb-3 text-lg leading-relaxed text-neutral-600 md:text-base">
              {description}
            </p>
          ) : null}
          <DiscountCountdown endsAt={banner.ends_at} labels={countdownLabels} />
          <div className="flex justify-start pt-2 [&_button]:mx-0 [&_button]:mt-4">
            <ButtonMore href={banner.cta_href} text={ctaLabel ?? ""} />
          </div>
        </div>

        <div className="relative col-span-12 h-full min-h-[380px] w-full lg:col-span-7 xl:col-span-6">
          <Image
            src={banner.image}
            alt={imageAlt ?? ""}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
