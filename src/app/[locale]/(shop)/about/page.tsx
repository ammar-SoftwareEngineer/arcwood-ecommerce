import AboutSectionRow from "@/components/about/AboutSectionRow";
import WhyUs from "@/components/about/WhyUs";
import HeroPages from "@/components/layout/hero/HeroPages";
import { getAboutSections } from "@/lib/api/about";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title.about"),
    description: t("description.about"),
  };
}

export default async function AboutPage() {
  const sections = await getAboutSections();
  console.log("sections", sections);
  const locale = await getLocale();
  const isAr = locale === "ar";

  return (
    <div>
      <HeroPages />
      <section className="py-12 md:py-20">
        <div className="container mx-auto space-y-24 px-8 md:space-y-20 lg:px-6 xl:px-16">
          {sections?.map((section, index) => (
            <AboutSectionRow
              key={section.id}
              sectionAbout={section}
              isAr={isAr}
              reverse={index % 2 === 1}
            />
          ))}
          <WhyUs />
        </div>
      </section>
    </div>
  );
}
