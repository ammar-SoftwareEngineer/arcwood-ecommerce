import HeroPages from "@/components/layout/hero/HeroPages";
import { getTranslations } from "next-intl/server";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title.contact"),
    description: t("description.contact"),
  };
}
export default function ContactPage() {
  return (
    <div>
      <HeroPages />
      <h1>Contact</h1>
    </div>
  );
}