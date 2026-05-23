import HeroPages from "@/components/layout/hero/HeroPages";
import { getLegalPage } from "@/lib/api/legal";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title.termsConditions"),
    description: t("description.termsConditions"),
  };
}

export default async function TermsConditionsPage() {
  const locale = await getLocale();
  const data = await getLegalPage("termsConditions", locale);

  return (
    <div>
      <HeroPages />
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-8 lg:px-6 xl:px-16">
        <div className="max-w-4xl space-y-8 mx-auto shadow-lg p-8 border border-black/10">
            {data.lastUpdated ? (
              <p className="text-sm text-black/50">{data.lastUpdated}</p>
            ) : null}
            {data.sections.map((block) => (
              <div key={block.title ?? block.paragraphs[0]}>
                {block.title ? (
                  <h2 className="mb-3 text-lg font-semibold text-main">{block.title}</h2>
                ) : null}
                {block.paragraphs.map((text) => (
                  <p key={text} className="mb-4 leading-relaxed text-black/80 last:mb-0">
                    {text}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
