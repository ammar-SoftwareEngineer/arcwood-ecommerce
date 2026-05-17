"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { CiUser, CiShop, CiHeart } from "react-icons/ci";
import { routing } from "@/i18n/routing";

const iconClass = "text-main cursor-pointer transition-colors hover:text-black!";

const badgeClassName =
  "absolute end-1 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-main px-1.5 text-center text-[10px] font-medium text-white";

type AppLocale = (typeof routing.locales)[number];

type DesktopHeaderActionsProps = {
  isCartOpen: boolean;
  cartDrawerId: string;
  onOpenCart: () => void;
};

export default function DesktopHeaderActions({ isCartOpen, cartDrawerId, onOpenCart }: DesktopHeaderActionsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as AppLocale;
  const targetLocale: AppLocale = locale === "en" ? "ar" : "en";
  const targetLabel = targetLocale === "ar" ? "AR" : "EN";
  const switchLabel = targetLocale === "ar" ? "العربية" : "English";

  const switchLocale = () => {
    router.replace(pathname, { locale: targetLocale });
  };

  return (
    <div className="flex items-center gap-1">
      <button type="button" aria-label="Account" className="relative h-10 w-10 rounded-0 text-sm items-center justify-center transition"
      onClick={() => {
        router.push("/login");
      }}
      >
        <CiUser size={25} className={iconClass} />
      </button>
      <button type="button" aria-label="Wishlist" className="relative h-10 w-10 rounded-0 text-sm items-center justify-center transition">
        <CiHeart size={25} className={iconClass} />
        <span className={badgeClassName}>0</span>
      </button>
      <button
        type="button"
        aria-label="Shopping cart"
        aria-expanded={isCartOpen}
        aria-controls={cartDrawerId}
        onClick={onOpenCart}
        className="relative h-10 w-10 rounded-0 text-sm items-center justify-center transition"
      >
        <CiShop size={25} className={iconClass} />
        <span className={badgeClassName}>0</span>
      </button>
      <button
        type="button"
        onClick={switchLocale}
        className="relative inline-flex h-[70px] rtl:mr-3 ltr:ml-3  w-16 cursor-pointer items-center justify-center  rounded-0 border-0 bg-main text-lg rtl:text-base  font-semibold text-white hover:text-black!  transition-colors  hover:bg-white!"
        aria-label={switchLabel}
        title={switchLabel}
      >
        {targetLabel}
      </button>
    </div>
  );
}
