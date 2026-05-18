import HeroPages from "@/components/layout/hero/HeroPages";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title.resetPassword"),
    description: t("description.resetPassword"),
  };
}

export default function ResetPasswordPage() {
  return (
    <div>
      <HeroPages />
      <ResetPasswordForm />
    </div>
  );
}
