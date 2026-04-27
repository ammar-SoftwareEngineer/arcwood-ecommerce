"use client";

import { useCallback, useId, useState } from "react";
import { Link } from "@/i18n/navigation";
import Image, { type StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import type { HeaderItem } from "../headerTypes";
import HeaderPromoBar from "../HeaderPromoBar";
import SearchSideDrawer from "../drawers/SearchSideDrawer";
import CartSideDrawer from "../drawers/CartSideDrawer";
import DesktopCategoryMenu from "./DesktopCategoryMenu";
import DesktopMainNavLinks from "./DesktopMainNavLinks";
import DesktopHeaderActions from "./DesktopHeaderActions";
import { CiSearch } from "react-icons/ci";

type DesktopHeaderProps = {
  promoText: string;
  navItems: HeaderItem[];
  categoryItems: HeaderItem[];
  mainBarClass: string;
  topBarClass: string;
  navLinkClass: string;
  categoryButtonClass: string;
  searchIconClass: string;
  iconButtonClass: string;
  logoSrc: StaticImageData;
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
  iconButtonClass,
  logoSrc,
  categoriesLabel,
  searchDrawerTitle,
  searchPlaceholder,
}: DesktopHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const searchDrawerId = useId();
  const cartDrawerId = useId();

  const closeSearch = useCallback(() => setIsSearchOpen(false), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const openSearch = useCallback(() => {
    setIsCartOpen(false);
    setIsSearchOpen(true);
  }, []);

  const openCart = useCallback(() => {
    setIsSearchOpen(false);
    setIsCartOpen(true);
  }, []);

  return (
    <div className="hidden md:block">
      <HeaderPromoBar text={promoText} topBarClass={topBarClass} />

      <div
        className={`py-0! my-0! flex w-full flex-wrap items-center justify-between gap-3 border-b px-4  backdrop-blur md:gap-6 md:px-20 ${mainBarClass}`}
      >
        <div className="flex  items-center gap-4">
          <Link href="/" className="shrink-0 text-lg font-bold tracking-wide">
            <Image src={logoSrc} alt="logo" width={160} height={52} loading="lazy" />
          </Link>

          <nav className="flex min-h-[52px] items-center gap-6" aria-label="Main">
            <DesktopCategoryMenu
              items={categoryItems}
              label={categoriesLabel}
              buttonClass={categoryButtonClass}
            />
            <DesktopMainNavLinks items={navItems} linkClass={navLinkClass} />
          </nav>
        </div>

        <div className=" flex items-center gap-2 ">
          <button
            type="button"
            aria-label="Open search"
            aria-expanded={isSearchOpen}
            aria-controls={searchDrawerId}
            onClick={openSearch}
            className={`relative z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center transition `}
          >
            <span className={searchIconClass}>
              <CiSearch size={25} className="text-main cursor-pointer  transition-colors hover:text-black!" />
            </span>
          </button>

          <DesktopHeaderActions isCartOpen={isCartOpen} cartDrawerId={cartDrawerId} onOpenCart={openCart} />
        </div>
      </div>

      <SearchSideDrawer
        id={searchDrawerId}
        isOpen={isSearchOpen}
        onClose={closeSearch}
        title={searchDrawerTitle}
        searchPlaceholder={searchPlaceholder}
      />
      <CartSideDrawer id={cartDrawerId} isOpen={isCartOpen} onClose={closeCart} />
    </div>
  );
}
