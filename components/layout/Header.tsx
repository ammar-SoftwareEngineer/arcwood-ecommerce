import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function Header() {
  const t = await getTranslations("header");

  return (
    <header className="border-b px-4 py-3 flex items-center gap-6">
      <span className="font-semibold">{t("brand")}</span>
      <nav>
        <Link href="/" className="text-sm underline-offset-4 hover:underline">
          {t("nav.home")}
        </Link>
      </nav>
    </header>
  );
}
