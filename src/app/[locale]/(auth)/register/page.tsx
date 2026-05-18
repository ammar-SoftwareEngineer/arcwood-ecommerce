import HeroPages from "@/components/layout/hero/HeroPages";
import RegisterForm from "@/components/forms/RegisterForm";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title.register"),
    description: t("description.register"),
  };
}

export default function RegisterPage() {
  return (
    <div>
      <HeroPages />
      <RegisterForm />
    </div>
  );
}
