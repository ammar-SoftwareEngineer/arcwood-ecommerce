"use client";

import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { signOut } from "next-auth/react";
import { routing } from "@/i18n/routing";
import HeaderSideDrawer from "./HeaderSideDrawer";
import type { HeaderItem } from "../types";

type AppLocale = (typeof routing.locales)[number];

type UserSideDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  title: string;
  items: HeaderItem[];
  logoutLabel: string;
};

export default function UserSideDrawer({
  isOpen,
  onClose,
  id,
  title,
  items,
  logoutLabel,
}: UserSideDrawerProps) {
  const locale = useLocale() as AppLocale;

  const handleLogout = () => {
    onClose();
    void signOut({ callbackUrl: `/${locale}` });
  };

  return (
    <HeaderSideDrawer isOpen={isOpen} onClose={onClose} id={id} title={title} closeLabel="Close account menu">
      <nav className="flex flex-col p-2" aria-label="User menu">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="flex items-center gap-2 rounded-0 px-3 py-3 text-base font-medium text-black/80 transition hover:bg-black/5 hover:text-main"
          >
            {item.label}
          </Link>
        ))}
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-0 px-3 py-3 text-start text-base font-medium text-black/80 transition hover:bg-black/5 hover:text-main"
        >
          {logoutLabel}
        </button>
      </nav>
    </HeaderSideDrawer>
  );
}
