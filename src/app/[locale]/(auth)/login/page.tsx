import HeroPages from "@/components/layout/hero/HeroPages";
import LoginForm from "@/components/forms/LoginForm";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title.login"),
    description: t("description.login"),
  };
}

export default function LoginPage() {
  return (
    <div>
      <HeroPages />
      <LoginForm />
    </div>
  );
}
