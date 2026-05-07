"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import Image, { type StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useId, useState } from "react";
import SearchSideDrawer from "./drawers/SearchSideDrawer";
import CartSideDrawer from "./drawers/CartSideDrawer";
import {
  faBars,
  faChevronDown,
  faEnvelope,
  faLocationDot,
  faPhoneVolume,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faWhatsapp, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import type { HeaderItem } from "./types";
import { CiHeart, CiSearch, CiShop, CiUser } from "react-icons/ci";
import { drawerSocialOrder } from "./drawer-social";
import { telEgyptHref } from "@/lib/utils";

type AppLocale = (typeof routing.locales)[number];

type SiteContact = {
  email: string;
  phones: string[];
  address: string;
};

type MobileHeaderProps = {
  navItems: HeaderItem[];
  categoryItems: HeaderItem[];
  mainBarClass: string;
  iconButtonClass: string;
  logoSrc: StaticImageData;
  categoriesLabel: string;
  contact: SiteContact;
  social: Record<(typeof drawerSocialOrder)[number], string>;
};

const drawerSocialIcons = {
  facebook: faFacebookF,
  instagram: faInstagram,
  twitter: faXTwitter,
  whatsapp: faWhatsapp,
} as const;

export default function MobileHeader({
  navItems,
  categoryItems,
  mainBarClass,
  iconButtonClass,
  logoSrc,
  categoriesLabel,
  contact,
  social,
}: MobileHeaderProps) {
  const t = useTranslations("header");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const searchDrawerId = useId();
  const cartDrawerId = useId();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as AppLocale;
  const targetLocale: AppLocale = locale === "en" ? "ar" : "en";
  const targetLabel = targetLocale === "ar" ? "AR" : "EN";
  const switchLabel = targetLocale === "ar" ? t("mobile.switchToArabic") : t("mobile.switchToEnglish");
  const primaryPhoneHref = telEgyptHref(contact.phones[0] ?? "");
  const actionButtonClass =
    "flex h-11 w-11 items-center justify-center rounded-xl text-black/75 transition hover:bg-black/5 hover:text-black";

  const switchLocale = () => {
    router.replace(pathname, { locale: targetLocale });
  };

  const openSearch = () => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
    setIsSearchOpen(true);
  };

  const openCart = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setIsCartOpen(true);
  };

  const openHamburger = () => {
    setIsSearchOpen(false);
    setIsCartOpen(false);
    setIsMenuOpen(true);
  };

  return (
    <div
      className={`flex w-full items-center justify-between gap-3 border-b md:hidden ${mainBarClass}`}
    >
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
          onClick={openHamburger}
          className={`relative z-10 h-[70px] rounded-none border p-4 transition ${iconButtonClass}`}
        >
          <span className="sr-only">{t("mobile.openMenu")}</span>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 w-screen border-t border-black/10 bg-white/95 px-2 pb-2 pt-2 backdrop-blur md:hidden">
        <div className="mx-auto flex w-full items-center justify-around gap-1">
          <button type="button" aria-label={t("mobile.account")} className={actionButtonClass}>
            <CiUser
              size={25}
              className="cursor-pointer text-main transition-colors hover:text-black!"
              aria-hidden
            />
          </button>
          <button type="button" aria-label={t("mobile.wishlist")} className={`relative ${actionButtonClass}`}>
            <CiHeart
              size={25}
              className="cursor-pointer text-main transition-colors hover:text-black!"
              aria-hidden
            />
            <span className="absolute inset-e-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-main text-[9px] font-medium text-white">
              0
            </span>
          </button>
          <button
            type="button"
            aria-label={t("mobile.cart")}
            aria-expanded={isCartOpen}
            aria-controls={cartDrawerId}
            onClick={openCart}
            className={`relative ${actionButtonClass}`}
          >
            <CiShop
              size={25}
              className="cursor-pointer text-main transition-colors hover:text-black!"
              aria-hidden
            />
            <span className="absolute inset-e-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-main text-[9px] font-medium text-white">
              0
            </span>
          </button>
          <button
            type="button"
            aria-label={t("mobile.search")}
            aria-expanded={isSearchOpen}
            aria-controls={searchDrawerId}
            onClick={openSearch}
            className={`relative ${actionButtonClass}`}
          >
            <CiSearch
              size={25}
              className="cursor-pointer text-main transition-colors hover:text-black!"
              aria-hidden
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 transition duration-300 ${isMenuOpen ? "pointer-events-auto bg-black/45 opacity-100 backdrop-blur-[1px]" : "pointer-events-none bg-transparent opacity-0"
          }`}
        onClick={() => setIsMenuOpen(false)}
        role="presentation"
      >
        <div
          className={`ms-auto flex h-screen w-full max-w-sm flex-col bg-slate-50 text-black shadow-2xl transition-transform duration-300 ease-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-black/10 px-4 py-4">
            <Link href="/" className="navbar-brand w-full" onClick={() => setIsMenuOpen(false)}>
              <Image src={logoSrc} alt="logo" width={125} height={40} loading="lazy" />
            </Link>
            <button
              type="button"
              aria-label={t("mobile.closeMenu")}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md p-2 text-black/70 transition hover:bg-black/10 hover:text-black"
            >
              <FontAwesomeIcon icon={faXmark} className="text-lg" />
            </button>
          </div>

          <div className="overflow-y-auto px-4 py-4 pb-24">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-md px-2 py-2 text-lg font-medium text-black/80 transition hover:bg-black/5 hover:text-black"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <li>
                <details>
                  <summary className="flex cursor-pointer items-center justify-between rounded-none px-2 py-2 text-lg font-medium text-black/80 transition hover:bg-black/5 hover:text-black">
                    {categoriesLabel}
                    <FontAwesomeIcon icon={faChevronDown} className="text-xs" aria-hidden />
                  </summary>
                  <ul className="mt-1 flex flex-col">
                    {categoryItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block rounded-md px-5 py-2 text-base text-black/70 transition hover:bg-black/5 hover:text-black"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            </ul>

            <ul className="mt-6 rounded-none border border-black/10 bg-white p-4 shadow-sm">
              <li className="mb-3 border-b border-black/10 pb-3">
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faEnvelope} className="mt-1 text-main" aria-hidden />
                  <div className="text-base">
                    <strong className="block">{t("mobile.contactLabels.email")}</strong>
                    <a href={`mailto:${contact.email}`} className="text-black/70 hover:text-black">
                      {contact.email}
                    </a>
                  </div>
                </div>
              </li>
              <li className="mb-3 border-b border-black/10 pb-3">
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faPhoneVolume} className="mt-1 text-main" aria-hidden />
                  <div className="text-base">
                    <strong className="block">{t("mobile.contactLabels.phone")}</strong>
                    <a href={primaryPhoneHref} className="text-black/70 hover:text-black">
                      {contact.phones[0]}
                    </a>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faLocationDot} className="mt-1 text-main" aria-hidden />
                  <div className="text-base text-black/70">
                    <strong className="block text-black">{t("mobile.contactLabels.address")}</strong>
                    <span className="block">{contact.address}</span>
                  </div>
                </div>
              </li>
            </ul>

            <div className="mt-4 flex items-center gap-3 border-t border-black/10 pt-4">
              {drawerSocialOrder.map((key) => (
                <a
                  key={key}
                  href={social[key]}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-none border border-black/15 text-base font-semibold text-black/70 transition hover:bg-black/10 hover:text-black"
                  aria-label={key}
                >
                  <FontAwesomeIcon icon={drawerSocialIcons[key]} aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SearchSideDrawer id={searchDrawerId} isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartSideDrawer id={cartDrawerId} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
