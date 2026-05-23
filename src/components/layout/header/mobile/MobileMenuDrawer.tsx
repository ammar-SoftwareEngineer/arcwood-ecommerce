"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image, { type StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faEnvelope,
  faLocationDot,
  faPhoneVolume,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faWhatsapp, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { telEgyptHref } from "@/lib/utils";
import type { HeaderItem, SiteContact } from "../types";
import { drawerSocialOrder } from "../drawer-social";

const drawerSocialIcons = {
  facebook: faFacebookF,
  instagram: faInstagram,
  twitter: faXTwitter,
  whatsapp: faWhatsapp,
} as const;

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
  const primaryPhoneHref = telEgyptHref(contact.phones[0] ?? "");

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
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-0 px-2 py-2 text-lg font-medium text-black/80 transition hover:bg-black/5 hover:text-black"
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
                        onClick={onClose}
                        className="block rounded-0 px-5 py-2 text-base text-black/70 transition hover:bg-black/5 hover:text-black"
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
  );
}
