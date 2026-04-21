import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t px-4 py-3 text-sm text-neutral-600">
      {t("copyright", { year })}
    </footer>
  );
}
