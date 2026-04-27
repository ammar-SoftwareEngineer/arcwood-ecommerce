import { getTranslations } from "next-intl/server";
import navbarData from "@/lib/data/navbar.json";
import logo from "@public/logo/logo1.png";
import "@/styles/layout/Header.css";
import DesktopHeader from "./desktop/DesktopHeader";
import MobileHeader from "./MobileHeader";

type HeaderVariant = "default" | "home";

type HeaderProps = {
  variant?: HeaderVariant;
};

export default async function Header({ variant = "default" }: HeaderProps) {
  const t = await getTranslations("header");
  const navItems = navbarData.navItems.map((item) => ({
    href: item.href,
    label: t(item.labelKey),
  }));
  const categoryItems = navbarData.categoryItems.map((item) => ({
    href: item.href,
    label: t(item.labelKey),
  }));
  const isHome = variant === "home";
  const promoText = "Discounts of up to 20% on products";

  const headerPositionClass = isHome ? "relative inset-x-0 top-0 text-white" : "fixed inset-x-0 top-0 text-black";
  const topBarClass = isHome
    ? "border-white/10 bg-black/65 text-white/75"
    : "border-black/10 bg-white/55 text-black/75";
  const mainBarClass = isHome
    ? "border-white/10 bg-black/35 text-white md:mt-2 md:rounded-xl"
    : "w-full border-black/10 bg-white/55 text-black";
  const navLinkClass = isHome ? "text-white/80 hover:text-white" : "text-black/80 hover:text-main!";
  const categoryButtonClass = isHome
    ? "border-white/35 bg-white/10 text-white hover:bg-white/20"
    : "border-black/20 bg-black/5 text-black hover:bg-black/10";
  const searchIconClass = isHome ? "text-white/55" : "text-black/55";
  const iconButtonClass = isHome
    ? "border-white/25 text-white/90 hover:bg-white/10 hover:text-white"
    : "border-black/20 text-black/90 hover:bg-black/10 hover:text-black";
  // Keep mobile UI intentionally independent from desktop variants.
  const mobileBarClass = "border-black/10 bg-white/95 text-black shadow-sm";
  const mobileIconButtonClass = "border-black/15 text-black/85 hover:bg-black/10 hover:text-black";

  return (
    <header className={`${headerPositionClass} z-10`}>
      <DesktopHeader
        promoText={promoText}
        navItems={navItems}
        categoryItems={categoryItems}
        categoriesLabel={t("nav.categories")}
        mainBarClass={mainBarClass}
        topBarClass={topBarClass}
        navLinkClass={navLinkClass}
        categoryButtonClass={categoryButtonClass}
        searchIconClass={searchIconClass}
        iconButtonClass={iconButtonClass}
        logoSrc={logo}
      />
      <MobileHeader
        navItems={navItems}
        categoryItems={categoryItems}
        categoriesLabel={t("nav.categories")}
        mainBarClass={mobileBarClass}
        iconButtonClass={mobileIconButtonClass}
        logoSrc={logo}
      />
    </header>
  );
}

