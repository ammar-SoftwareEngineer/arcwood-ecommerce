"use client";

import { useCallback, useId, useState } from "react";
import { useTranslations } from "next-intl";
import type { StaticImageData } from "next/image";
import SearchSideDrawer from "../drawers/SearchSideDrawer";
import CartSideDrawer from "../drawers/CartSideDrawer";
import UserSideDrawer from "../drawers/UserSideDrawer";
import type { HeaderItem, SiteContact } from "../types";
import { drawerSocialOrder } from "../drawer-social";
import MobileTopBar from "./MobileTopBar";
import MobileBottomActions from "./MobileBottomActions";
import MobileMenuDrawer from "./MobileMenuDrawer";

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
  const tUser = useTranslations("header.userMenu");
  const t = useTranslations("header");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const searchDrawerId = useId();
  const cartDrawerId = useId();
  const userDrawerId = useId();

  const userMenuItems = [
    { href: "/account", label: tUser("account") },
    { href: "/orders", label: tUser("orders") },
  ];

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const closeUser = useCallback(() => setIsUserOpen(false), []);

  const openSearch = useCallback(() => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
    setIsUserOpen(false);
    setIsSearchOpen(true);
  }, []);

  const openCart = useCallback(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setIsUserOpen(false);
    setIsCartOpen(true);
  }, []);

  const openMenu = useCallback(() => {
    setIsSearchOpen(false);
    setIsCartOpen(false);
    setIsUserOpen(false);
    setIsMenuOpen(true);
  }, []);

  const openUser = useCallback(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setIsCartOpen(false);
    setIsUserOpen(true);
  }, []);

  return (
    <>
      <MobileTopBar
        mainBarClass={mainBarClass}
        iconButtonClass={iconButtonClass}
        logoSrc={logoSrc}
        isMenuOpen={isMenuOpen}
        onOpenMenu={openMenu}
      />

      <MobileBottomActions
        isCartOpen={isCartOpen}
        isSearchOpen={isSearchOpen}
        isUserOpen={isUserOpen}
        cartDrawerId={cartDrawerId}
        searchDrawerId={searchDrawerId}
        userDrawerId={userDrawerId}
        onOpenCart={openCart}
        onOpenSearch={openSearch}
        onOpenUser={openUser}
      />

      <MobileMenuDrawer
        isOpen={isMenuOpen}
        onClose={closeMenu}
        logoSrc={logoSrc}
        navItems={navItems}
        categoryItems={categoryItems}
        categoriesLabel={categoriesLabel}
        contact={contact}
        social={social}
      />

      <SearchSideDrawer id={searchDrawerId} isOpen={isSearchOpen} onClose={closeSearch} />
      <CartSideDrawer id={cartDrawerId} isOpen={isCartOpen} onClose={closeCart} />
      <UserSideDrawer
        id={userDrawerId}
        isOpen={isUserOpen}
        onClose={closeUser}
        title={t("mobile.account")}
        items={userMenuItems}
        logoutLabel={tUser("logout")}
      />
    </>
  );
}
