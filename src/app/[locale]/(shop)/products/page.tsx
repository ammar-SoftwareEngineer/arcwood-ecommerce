import HeroPages from "@/components/layout/hero/HeroPages";
import { getTranslations } from "next-intl/server";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title.products"),
    description: t("description.products"),
  };
}
export default function ProductsPage() {
  return (
    <section className="space-y-6">
      <HeroPages />
      <h1 className="text-2xl font-semibold">Products</h1>
    </section>
  );
}
