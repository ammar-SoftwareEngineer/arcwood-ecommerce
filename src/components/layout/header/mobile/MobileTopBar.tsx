"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import Image, { type StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

type AppLocale = (typeof routing.locales)[number];

type MobileTopBarProps = {
  mainBarClass: string;
  iconButtonClass: string;
  logoSrc: StaticImageData;
  isMenuOpen: boolean;
  onOpenMenu: () => void;
};

export default function MobileTopBar({
  mainBarClass,
  iconButtonClass,
  logoSrc,
  isMenuOpen,
  onOpenMenu,
}: MobileTopBarProps) {
  const t = useTranslations("header");
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as AppLocale;
  const targetLocale: AppLocale = locale === "en" ? "ar" : "en";
  const targetLabel = targetLocale === "ar" ? "AR" : "EN";
  const switchLabel = targetLocale === "ar" ? t("mobile.switchToArabic") : t("mobile.switchToEnglish");

  const switchLocale = () => {
    router.replace(pathname, { locale: targetLocale });
  };

  return (
    <div className={`flex w-full items-center justify-between gap-3 border-b md:hidden ${mainBarClass}`}>
      <Link href="/" className="shrink-0 px-4 text-lg font-bold tracking-wide">
        <Image src={logoSrc} alt="logo" width={160} height={52} loading="lazy" />
      </Link>

      <div className="flex items-center ltr:ml-auto">
        <button
          type="button"
          onClick={switchLocale}
          className="relative inline-flex h-[70px] w-16 cursor-pointer items-center justify-center rounded-none border-none bg-main text-lg font-semibold text-white transition-colors hover:bg-white! hover:text-black! ltr:ml-3 rtl:mr-3 rtl:text-base"
          aria-label={switchLabel}
          title={switchLabel}
        >
          {targetLabel}
        </button>

        <button
          type="button"
          aria-label={t("mobile.openMenu")}
          aria-expanded={isMenuOpen}
          onClick={onOpenMenu}
          className={`relative z-10 h-[70px] rounded-none border p-4 transition ${iconButtonClass}`}
        >
          <span className="sr-only">{t("mobile.openMenu")}</span>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </div>
  );
}
