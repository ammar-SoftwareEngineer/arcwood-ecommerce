"use client";

import { useEffect, useState, } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import navbarData from "@/lib/data/navbar.json";
import siteData from "@/lib/data/site.json";
import logo from "@public/logo/logo1.png";
import "@/styles/layout/Header.css";
import DesktopHeader from "./desktop/DesktopHeader";
import MobileHeader from "./MobileHeader";


export default function Header() {
  const t = useTranslations("header");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = navbarData.navItems.map((item) => ({
    href: item.href,
    label: t(item.labelKey),
  }));
  const categoryItems = navbarData.categoryItems.map((item) => ({
    href: item.href,
    label: t(item.labelKey),
  }));
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const pathSegments = normalizedPath.split("/").filter(Boolean);
  const isLocaleHome = pathSegments.length === 1 && ["en", "ar"].includes(pathSegments[0]);
  const isHomePath = normalizedPath === "/" || isLocaleHome;
  const isOverlayHeader = isHomePath && !isScrolled;
  const promoText = t("promoText");

  const headerPositionClass = isScrolled
    ? "fixed inset-x-0 top-0 text-black transition-colors duration-300"
    : isOverlayHeader
      ? "fixed inset-x-0 top-0 text-black transition-colors duration-300"
      : "relative inset-x-0 top-0 text-black transition-colors duration-300";
  const topBarClass = isScrolled
    ? " bg-white border-black/20 text-black transition-colors duration-300"
    : isOverlayHeader
      ? "border-white/10 bg-white/75 text-black transition-colors duration-300"
      : "border-white/10  bg-white/75 text-black/75 transition-colors duration-300";
  const mainBarClass = isScrolled
    ? "w-full border-black/20  bg-white text-black transition-colors duration-300"
    : isOverlayHeader
      ? "border-white/10 bg-white/75 text-black transition-colors duration-300"
      : "w-full border-white/10  bg-white/75 text-black transition-colors duration-300";
  const navLinkClass = isOverlayHeader ? "text-black hover:text-(--primary)" : "text-black hover:text-(--primary)";
  const categoryButtonClass = isOverlayHeader
    ? "border-white/35 bg-white/10 text-white hover:bg-white/20"
    : "border-black/20 bg-black/5 text-black hover:bg-black/10";
  const searchIconClass = isOverlayHeader ? "text-white/55" : "text-black/55";
  const iconButtonClass = isOverlayHeader
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
        logoSrc={logo.src}
      />
      <MobileHeader
        navItems={navItems}
        categoryItems={categoryItems}
        categoriesLabel={t("nav.categories")}
        mainBarClass={mobileBarClass}
        iconButtonClass={mobileIconButtonClass}
        logoSrc={logo}
        contact={siteData.contact}
        social={siteData.social}
      />
    </header>
  );
}

