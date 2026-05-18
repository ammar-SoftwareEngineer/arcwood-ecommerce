import HeroPages from "@/components/layout/hero/HeroPages";
import ForgetPassword from "@/components/forms/ForgetPassword";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title.forgetPassword"),
    description: t("description.forgetPassword"),
  };
}

export default function ForgetPasswordPage() {
  return (
    <div>
      <HeroPages />
      <ForgetPassword />
    </div>
  );
}
