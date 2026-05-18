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

type ResetPasswordPageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token } = await searchParams;

  return (
    <div>
      <HeroPages />
      <ResetPasswordForm token={token ?? null} />
    </div>
  );
}
