"use client";

import { Link } from "@/i18n/navigation";
import Image, { type StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useId, useState } from "react";
import SearchSideDrawer from "./menus/SearchSideDrawer";
import CartSideDrawer from "./menus/CartSideDrawer";
import {
  faBars,
  faChevronDown,
  faEnvelope,
  faHeart,
  faLocationDot,
  faPhoneVolume,
  faSearch,
  faShoppingCart,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faWhatsapp, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import type { HeaderItem } from "./headerTypes";

type MobileHeaderProps = {
  navItems: HeaderItem[];
  categoryItems: HeaderItem[];
  mainBarClass: string;
  iconButtonClass: string;
  logoSrc: StaticImageData;
  categoriesLabel: string;
};

export default function MobileHeader({
  navItems,
  categoryItems,
  mainBarClass,
  iconButtonClass,
  logoSrc,
  categoriesLabel,
}: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const searchDrawerId = useId();
  const cartDrawerId = useId();
  const actionButtonClass = "flex h-11 w-11 items-center justify-center rounded-xl text-black/75 transition hover:bg-black/5 hover:text-black";

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
    <div className={`flex w-full items-center justify-between gap-3 border-b px-4 py-4 md:hidden ${mainBarClass}`}>
      <Link href="/" className="shrink-0 text-lg font-bold tracking-wide">
        <Image src={logoSrc} alt="logo" width={160} height={52} loading="lazy" />
      </Link>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          aria-label="Language"
          className={`relative h-10 min-w-10 rounded-0 border px-2 text-sm font-bold transition ${iconButtonClass}`}
        >
          <span className="text-main">AR</span>
        </button>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          onClick={openHamburger}
          className={`relative z-10 rounded-0 border p-2 transition ${iconButtonClass}`}
        >
          <span className="sr-only">Open menu</span>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 z-999 w-screen border-t border-black/10 bg-white/95 px-2 pb-2 pt-2 backdrop-blur md:hidden"
      >
        <div className="mx-auto flex w-full items-center justify-around gap-1">
          <button type="button" aria-label="Account" className={actionButtonClass}>
            <FontAwesomeIcon icon={faUser} />
          </button>
          <button type="button" aria-label="Wishlist" className={`relative ${actionButtonClass}`}>
            <FontAwesomeIcon icon={faHeart} />
            <span className="absolute top-1 inset-e-1 flex h-4 w-4 items-center justify-center rounded-full bg-main text-[9px] font-medium text-white">
              0
            </span>
          </button>
          <button
            type="button"
            aria-label="Shopping cart"
            aria-expanded={isCartOpen}
            aria-controls={cartDrawerId}
            onClick={openCart}
            className={`relative ${actionButtonClass}`}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="absolute top-1 inset-e-1 flex h-4 w-4 items-center justify-center rounded-full bg-main text-[9px] font-medium text-white">
              0
            </span>
          </button>
          <button
            type="button"
            aria-label="Search"
            aria-expanded={isSearchOpen}
            aria-controls={searchDrawerId}
            onClick={openSearch}
            className={`relative ${actionButtonClass}`}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50! transition duration-300 ${
          isMenuOpen ? "pointer-events-auto bg-black/45 backdrop-blur-[1px] opacity-100" : "pointer-events-none bg-black/0 opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`ml-auto flex h-screen w-full max-w-sm flex-col bg-slate-50 text-black shadow-2xl transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-black/10 px-4 py-4 ">
            <Link href="/" className="navbar-brand w-full" onClick={() => setIsMenuOpen(false)}>
              <Image src={logoSrc} alt="logo" width={125} height={40} loading="lazy" />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md p-2 text-black/70 transition hover:bg-black/10 hover:text-black "
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
                    className="block rounded-md px-2 py-2 text-sm font-medium text-black/80 transition hover:bg-black/5 hover:text-black"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <li>
                <details>
                  <summary className="flex cursor-pointer items-center justify-between rounded-0 px-2 py-2 text-sm font-medium text-black/80 transition hover:bg-black/5 hover:text-black">
                    {categoriesLabel}
                    <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                  </summary>
                  <ul className="mt-1 flex flex-col">
                    {categoryItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block rounded-md px-5 py-2 text-sm text-black/70 transition hover:bg-black/5 hover:text-black"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            </ul>

            <ul className="mt-6 rounded-0 border border-black/10 bg-white p-4 shadow-sm">
              <li className="mb-3 border-b border-black/10 pb-3">
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faEnvelope} className="mt-1 text-main" />
                  <div className="text-sm">
                    <strong className="block">Email</strong>
                    <a href="mailto:info@arcwood-eg.com" className="text-black/70 hover:text-black">
                      info@arcwood-eg.com
                    </a>
                  </div>
                </div>
              </li>
              <li className="mb-3 border-b border-black/10 pb-3">
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faPhoneVolume} className="mt-1 text-main" />
                  <div className="text-sm">
                    <strong className="block">Phone</strong>
                    <a href="tel:+201234567890" className="text-black/70 hover:text-black">
                      +20 123 456 7890
                    </a>
                  </div>
                </div>
              </li>
             
              <li>
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faLocationDot} className="mt-1 text-main" />
                  <div className="text-sm text-black/70">
                    <strong className="block text-black">Address</strong>
                    <span className="block">22 Dr. Abdel Hakim Al-Rifai Street, off Abbas Al-Akkad - Nasr City</span>
                  </div>
                </div>
              </li>
            </ul>

            <div className="mt-4 flex items-center  gap-3 border-t border-black/10 pt-4">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-0  border border-black/15 text-xs font-semibold text-black/70 transition hover:bg-black/10 hover:text-black">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-0 border border-black/15 text-xs font-semibold text-black/70 transition hover:bg-black/10 hover:text-black">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-0   border border-black/15 text-xs font-semibold text-black/70 transition hover:bg-black/10 hover:text-black">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-0 border border-black/15 text-xs font-semibold text-black/70 transition hover:bg-black/10 hover:text-black">
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <SearchSideDrawer
        id={searchDrawerId}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <CartSideDrawer id={cartDrawerId} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
