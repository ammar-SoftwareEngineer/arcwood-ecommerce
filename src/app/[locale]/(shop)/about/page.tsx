import HeroPages from "@/components/layout/hero/HeroPages";
import { getTranslations } from "next-intl/server";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title.about"),
    description: t("description.about"),
  };
}
export default function AboutPage() {
  
  return (
    <div>
      <HeroPages />

    </div>
  );
}