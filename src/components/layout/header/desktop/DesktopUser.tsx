"use client";

import { Link } from "@/i18n/navigation";
import { CiUser } from "react-icons/ci";
import type { HeaderItem } from "../types";

type DesktopUserProps = {
  items: HeaderItem[];
  logoutLabel: string;
  onLogout: () => void;
  iconClass: string;
};

export default function DesktopUser({
  items,
  logoutLabel,
  onLogout,
  iconClass,
}: DesktopUserProps) {
  return (
    <div className="group relative">
      <button
        type="button"
        aria-label="Account"
        aria-haspopup="true"
        className="relative flex h-10 w-10 items-center justify-center rounded-0 text-sm transition"
      >
        <CiUser size={25} className={iconClass} />
      </button>

      <div className="invisible absolute top-full z-20 mt-1 min-w-56 rounded-0 border border-white/10 bg-white/95 p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <nav className="flex flex-col" aria-label="User menu">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-0 px-3 py-2 text-base font-medium text-black/80 transition hover:bg-black/5 hover:text-main! cursor-pointer"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-2 rounded-0 px-3 py-2 text-start text-base font-medium text-black/80 transition hover:bg-black/5 hover:text-main! cursor-pointer"
          >
            {logoutLabel}
          </button>
        </nav>
      </div>
    </div>
  );
}
