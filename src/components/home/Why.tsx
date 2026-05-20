
import ButtonMore from "@/components/ui/ButtonMore";
import HeaderSection from "@/components/ui/HeaderSection";
import WhyFeatures from "@/components/why/WhyFeatures";
import WhyOverlappingImages from "@/components/why/WhyOverlappingImages";
import { getWhyUs } from "@/lib/api/why";
import { getLocale } from "next-intl/server";

export default async function Why() {
  const why = await getWhyUs();
  if (!why) return null;

  return (
    <section className="why-section">
      <div className="container mx-auto px-8 lg:px-6 xl:px-16 md:pb-0 pb-16">
        <div className="grid grid-cols-12 gap-8 lg:items-center xl:gap-12">
          <div className="col-span-12 lg:col-span-7 xl:col-span-6">
            <WhyOverlappingImages
              primarySrc={why.primary_image}
              secondarySrc={why.secondary_image}
              primaryAlt={why.primary_image_alt || ""}
              secondaryAlt={why.secondary_image_alt || ""}
            />
          </div>

          <div className="col-span-12 flex flex-col gap-2 lg:col-span-5 xl:col-span-6">
            <HeaderSection className="about-header" subtitle={why.subtitle || ""} title={why.title || ""} />
            <p className="mt-6 mb-5 text-lg text-neutral-600">{why.description}</p>
            <WhyFeatures features={why.features} />
            <div className="flex justify-start pt-2 [&_button]:mx-0 [&_button]:mt-4">
              <ButtonMore href={why.cta_href || ""} text={why.cta_label || ""} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
