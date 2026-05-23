"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import type { StaticImageData } from "next/image";
import SearchSideDrawer from "../drawers/SearchSideDrawer";
import { CartSideDrawer } from "@/components/cart";
import UserSideDrawer from "../drawers/UserSideDrawer";
import type { HeaderItem, SiteContact } from "../types";
import { drawerSocialOrder } from "../drawer-social";
import MobileTopBar from "./MobileTopBar";
import MobileBottomActions from "./MobileBottomActions";
import MobileMenuDrawer from "./MobileMenuDrawer";

type MobileDrawer = "menu" | "search" | "cart" | "user";

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
  const [activeDrawer, setActiveDrawer] = useState<MobileDrawer | null>(null);
  const searchDrawerId = useId();
  const cartDrawerId = useId();
  const userDrawerId = useId();

  const userMenuItems = [
    { href: "/account", label: tUser("account") },
    { href: "/orders", label: tUser("orders") },
  ];

  const open = (drawer: MobileDrawer) => () => setActiveDrawer(drawer);
  const close = () => setActiveDrawer(null);

  return (
    <>
      <MobileTopBar
        mainBarClass={mainBarClass}
        iconButtonClass={iconButtonClass}
        logoSrc={logoSrc}
        isMenuOpen={activeDrawer === "menu"}
        onOpenMenu={open("menu")}
      />

      <MobileBottomActions
        isCartOpen={activeDrawer === "cart"}
        isSearchOpen={activeDrawer === "search"}
        isUserOpen={activeDrawer === "user"}
        cartDrawerId={cartDrawerId}
        searchDrawerId={searchDrawerId}
        userDrawerId={userDrawerId}
        onOpenCart={open("cart")}
        onOpenSearch={open("search")}
        onOpenUser={open("user")}
      />

      <MobileMenuDrawer
        isOpen={activeDrawer === "menu"}
        onClose={close}
        logoSrc={logoSrc}
        navItems={navItems}
        categoryItems={categoryItems}
        categoriesLabel={categoriesLabel}
        contact={contact}
        social={social}
      />

      <SearchSideDrawer id={searchDrawerId} isOpen={activeDrawer === "search"} onClose={close} />
      <CartSideDrawer id={cartDrawerId} isOpen={activeDrawer === "cart"} onClose={close} />
      <UserSideDrawer
        id={userDrawerId}
        isOpen={activeDrawer === "user"}
        onClose={close}
        title={t("mobile.account")}
        items={userMenuItems}
        logoutLabel={tUser("logout")}
      />
    </>
  );
}
