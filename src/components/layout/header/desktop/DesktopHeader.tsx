"use client";

import { useId, useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import type { HeaderItem } from "../types";
import HeaderPromoBar from "../HeaderPromoBar";
import SearchSideDrawer from "../drawers/SearchSideDrawer";
import CartSideDrawer from "../drawers/CartSideDrawer";
import DesktopCategoryMenu from "./DesktopCategoryMenu";
import DesktopHeaderActions from "./DesktopHeaderActions";

type DesktopDrawer = "search" | "cart";

type DesktopHeaderProps = {
  promoText: string;
  navItems: HeaderItem[];
  categoryItems: HeaderItem[];
  mainBarClass: string;
  topBarClass: string;
  navLinkClass: string;
  categoryButtonClass: string;
  searchIconClass: string;
  logoSrc: string;
  categoriesLabel: string;
  searchDrawerTitle?: string;
  searchPlaceholder?: string;
};

export default function DesktopHeader({
  promoText,
  navItems,
  categoryItems,
  mainBarClass,
  topBarClass,
  navLinkClass,
  categoryButtonClass,
  searchIconClass,
  logoSrc,
  categoriesLabel,
  searchDrawerTitle,
  searchPlaceholder,
}: DesktopHeaderProps) {
  const [activeDrawer, setActiveDrawer] = useState<DesktopDrawer | null>(null);
  const searchDrawerId = useId();
  const cartDrawerId = useId();

  const open = (drawer: DesktopDrawer) => () => setActiveDrawer(drawer);
  const close = () => setActiveDrawer(null);

  return (
    <div className="hidden md:block">
      <HeaderPromoBar promoText={promoText} topBarClass={topBarClass} />

      <div
        className={`py-0! my-0! flex w-full items-center justify-between gap-3 border-b px-4 md:gap-6 lg:px-20 2xl:px-40 ${mainBarClass}`}
      >
        <div className="flex items-center gap-4">
          <Link href="/" className="shrink-0 text-lg font-bold tracking-wide">
            <Image src={logoSrc} alt="logo" className="object-contain" width={160} height={52} loading="lazy" />
          </Link>

          <nav className="flex min-h-[52px] items-center gap-6" aria-label="Main">
            <DesktopCategoryMenu
              items={categoryItems}
              label={categoriesLabel}
              buttonClass={categoryButtonClass}
            />
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`cursor-pointer text-lg font-medium text-nowrap underline-offset-4 transition hover:text-main! hover:underline rtl:text-base ${navLinkClass}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Open search"
            aria-expanded={activeDrawer === "search"}
            aria-controls={searchDrawerId}
            onClick={open("search")}
            className="relative z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center transition"
          >
            <span className={searchIconClass}>
              <CiSearch size={25} className="cursor-pointer text-main transition-colors hover:text-black!" />
            </span>
          </button>

          <DesktopHeaderActions
            isCartOpen={activeDrawer === "cart"}
            cartDrawerId={cartDrawerId}
            onOpenCart={open("cart")}
          />
        </div>
      </div>

      <SearchSideDrawer
        id={searchDrawerId}
        isOpen={activeDrawer === "search"}
        onClose={close}
        title={searchDrawerTitle}
        searchPlaceholder={searchPlaceholder}
      />
      <CartSideDrawer id={cartDrawerId} isOpen={activeDrawer === "cart"} onClose={close} />
    </div>
  );
}
