"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { CiUser, CiShop, CiHeart } from "react-icons/ci";
import { logoutAction } from "@/actions/login";
import { useSession } from "next-auth/react";
import { routing } from "@/i18n/routing";
import { useWishlistStore } from "@/store/wishlistStore";
import { cartItemCount } from "@/lib/cart/utils";
import { useCartStore } from "@/store/cartStore";
import DesktopUser from "./DesktopUser";

const iconClass = "text-main cursor-pointer transition-colors hover:text-black!";

const badgeClassName =
  "absolute end-1 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-main px-1.5 text-center text-[10px] font-medium text-white";

type AppLocale = (typeof routing.locales)[number];

type DesktopHeaderActionsProps = {
  isCartOpen: boolean;
  cartDrawerId: string;
  onOpenCart: () => void;
};

export default function DesktopHeaderActions({
  isCartOpen,
  cartDrawerId,
  onOpenCart,
}: DesktopHeaderActionsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as AppLocale;
  const t = useTranslations("header.userMenu");
  const { status } = useSession();


  const targetLocale: AppLocale = locale === "en" ? "ar" : "en";
  const targetLabel = targetLocale === "ar" ? "AR" : "EN";
  const switchLabel = targetLocale === "ar" ? "العربية" : "English";
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const cartCount = useCartStore((s) => cartItemCount(s.items));

  const userMenuItems = [
    { href: "/account", label: t("account") },
    { href: "/orders", label: t("orders") },
  ];

  const switchLocale = () => {
    router.replace(pathname, { locale: targetLocale });
  };

  const handleLogout = () => {
    void logoutAction(`/${locale}`);
  };

  return (
    <div className="flex items-center">
      {status === "authenticated" ? (
        <DesktopUser
          items={userMenuItems}
          logoutLabel={t("logout")}
          onLogout={handleLogout}
          iconClass={iconClass}
        />
      ) : (
        <button
          type="button"
          aria-label="Account"
          className="relative flex h-10 w-10 items-center justify-center rounded-0 text-sm transition"
          onClick={() => router.push("/login")}
        >
          <CiUser size={25} className={iconClass} />
        </button>
      )}

      <button
        type="button"
        aria-label="Wishlist"
        className="relative flex h-10 w-10 items-center justify-center rounded-0 text-sm transition"
        onClick={() => router.push("/wishlist")}
      >
        <CiHeart size={25} className={iconClass} />
        {wishlistCount > 0 ? (
          <span className={badgeClassName}>{wishlistCount}</span>
        ) : null}
      </button>

      <button
        type="button"
        aria-label="Shopping cart"
        aria-expanded={isCartOpen}
        aria-controls={cartDrawerId}
        onClick={onOpenCart}
        className="relative flex h-10 w-10 items-center justify-center rounded-0 text-sm transition"
      >
        <CiShop size={25} className={iconClass} />
        {cartCount > 0 ? <span className={badgeClassName}>{cartCount}</span> : null}
      </button>

      <button
        type="button"
        onClick={switchLocale}
        className="relative inline-flex h-[70px] w-16 cursor-pointer items-center justify-center rounded-0 border-0 bg-main text-lg font-semibold text-white transition-colors hover:bg-white! hover:text-black! ltr:ml-3 rtl:mr-3 rtl:text-base"
        aria-label={switchLabel}
        title={switchLabel}
      >
        {targetLabel}
      </button>
    </div>
  );
}
