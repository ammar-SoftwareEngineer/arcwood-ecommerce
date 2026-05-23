"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image, { type StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import type { HeaderItem, SiteContact } from "../types";
import { drawerSocialOrder } from "../drawer-social";
import MobileNavLinks from "./MobileNavLinks";
import MobileCategoryMenu from "./MobileCategoryMenu";
import MobileMenuContact from "./MobileMenuContact";

type MobileMenuDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  logoSrc: StaticImageData;
  navItems: HeaderItem[];
  categoryItems: HeaderItem[];
  categoriesLabel: string;
  contact: SiteContact;
  social: Record<(typeof drawerSocialOrder)[number], string>;
};

export default function MobileMenuDrawer({
  isOpen,
  onClose,
  logoSrc,
  navItems,
  categoryItems,
  categoriesLabel,
  contact,
  social,
}: MobileMenuDrawerProps) {
  const t = useTranslations("header");

  return (
    <div
      className={`fixed inset-0 z-50 transition duration-300 md:hidden ${
        isOpen
          ? "pointer-events-auto bg-black/45 opacity-100 backdrop-blur-[1px]"
          : "pointer-events-none bg-transparent opacity-0"
      }`}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`ms-auto flex h-screen w-full max-w-sm flex-col bg-slate-50 text-black shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-4 py-4">
          <Link href="/" className="navbar-brand w-full" onClick={onClose}>
            <Image src={logoSrc} alt="logo" width={125} height={40} loading="lazy" />
          </Link>
          <button
            type="button"
            aria-label={t("mobile.closeMenu")}
            onClick={onClose}
            className="rounded-md p-2 text-black/70 transition hover:bg-black/10 hover:text-black"
          >
            <FontAwesomeIcon icon={faXmark} className="text-lg" />
          </button>
        </div>

        <div className="overflow-y-auto px-4 py-4 pb-24">
          <ul className="flex flex-col gap-2">
            <MobileNavLinks items={navItems} onNavigate={onClose} />
            <MobileCategoryMenu items={categoryItems} label={categoriesLabel} onNavigate={onClose} />
          </ul>

          <MobileMenuContact contact={contact} social={social} />
        </div>
      </div>
    </div>
  );
}
