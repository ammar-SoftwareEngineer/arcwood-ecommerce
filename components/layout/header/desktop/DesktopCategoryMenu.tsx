"use client";

import { Link } from "@/i18n/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import type { HeaderItem } from "../headerTypes";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

type AppLocale = (typeof routing.locales)[number];

type DesktopCategoryMenuProps = {
  items: HeaderItem[];
  label: string;
  buttonClass: string;
};

export default function DesktopCategoryMenu({ items, label, buttonClass }: DesktopCategoryMenuProps) {
  const locale = useLocale() as AppLocale;
  return (
    <div className="group relative">
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 rounded-0  px-3 py-3 text-sm font-semibold text-white bg-main  transition ${buttonClass}`}
      >
        <FontAwesomeIcon icon={faLayerGroup} className="h-3.5 w-3.5" />
        {label}
        {locale === "en" ? <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" /> : <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" />}
      </button>
      <div className="invisible absolute top-12 z-20 min-w-56 rounded-0 border border-white/10 bg-white/95 p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <nav className="flex flex-col" aria-label={label}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-0 px-3 py-2 text-sm font-medium text-black/80 transition hover:bg-black/5 cursor-pointer hover:text-main!"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
