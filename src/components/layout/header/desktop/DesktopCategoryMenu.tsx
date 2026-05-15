"use client";

import { Link } from "@/i18n/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import type { HeaderItem } from "../types";


type DesktopCategoryMenuProps = {
  items: HeaderItem[];
  label: string;
  buttonClass: string;
};

export default function DesktopCategoryMenu({ items, label, buttonClass }: DesktopCategoryMenuProps) {

  return (
    <div className="group relative">
      <div
        
        className={`flex  items-center gap-1.5 rounded-0  w-40 h-[70px] justify-center  text-lg rtl:text-base font-medium text-white bg-main cursor-pointer transition-all ${buttonClass}`}
      >
        <FontAwesomeIcon icon={faLayerGroup} className="h-3.5 w-3.5" />
        {label}
       
      </div>
      <div className="invisible absolute top-[65px] z-20 min-w-56 rounded-0 border border-white/10 bg-white/95 p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <nav className="flex flex-col" aria-label={label}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-0 px-3 py-2 text-base font-medium text-black/80 transition hover:bg-black/5 cursor-pointer hover:text-main!"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
