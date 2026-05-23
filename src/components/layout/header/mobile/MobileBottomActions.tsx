"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { CiHeart, CiSearch, CiShop, CiUser } from "react-icons/ci";
import { useWishlistStore } from "@/store/wishlistStore";
import { cartItemCount, useCartStore } from "@/store/cartStore";

const actionButtonClass =
  "flex h-11 w-11 items-center justify-center rounded-xl text-black/75 transition hover:bg-black/5 hover:text-black";

const iconClass = "cursor-pointer text-main transition-colors hover:text-black!";

const badgeClassName =
  "absolute inset-e-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-main text-[9px] font-medium text-white";

type MobileBottomActionsProps = {
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isUserOpen: boolean;
  cartDrawerId: string;
  searchDrawerId: string;
  userDrawerId: string;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenUser: () => void;
};

export default function MobileBottomActions({
  isCartOpen,
  isSearchOpen,
  isUserOpen,
  cartDrawerId,
  searchDrawerId,
  userDrawerId,
  onOpenCart,
  onOpenSearch,
  onOpenUser,
}: MobileBottomActionsProps) {
  const t = useTranslations("header");
  const router = useRouter();
  const { status } = useSession();
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const cartCount = useCartStore((s) => cartItemCount(s.items));

  const handleAccount = () => {
    if (status === "authenticated") {
      onOpenUser();
      return;
    }
    router.push("/login");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 w-screen border-t border-black/10 bg-white/95 px-2 pb-2 pt-2 backdrop-blur md:hidden">
      <div className="mx-auto flex w-full items-center justify-around gap-1">
        <button
          type="button"
          aria-label={t("mobile.account")}
          aria-expanded={status === "authenticated" ? isUserOpen : undefined}
          aria-controls={status === "authenticated" ? userDrawerId : undefined}
          className={actionButtonClass}
          onClick={handleAccount}
        >
          <CiUser size={25} className={iconClass} aria-hidden />
        </button>

        <button
          type="button"
          aria-label={t("mobile.wishlist")}
          className={`relative ${actionButtonClass}`}
          onClick={() => router.push("/wishlist")}
        >
          <CiHeart size={25} className={iconClass} aria-hidden />
          {wishlistCount > 0 ? <span className={badgeClassName}>{wishlistCount}</span> : null}
        </button>

        <button
          type="button"
          aria-label={t("mobile.cart")}
          aria-expanded={isCartOpen}
          aria-controls={cartDrawerId}
          onClick={onOpenCart}
          className={`relative ${actionButtonClass}`}
        >
          <CiShop size={25} className={iconClass} aria-hidden />
          {cartCount > 0 ? <span className={badgeClassName}>{cartCount}</span> : null}
        </button>

        <button
          type="button"
          aria-label={t("mobile.search")}
          aria-expanded={isSearchOpen}
          aria-controls={searchDrawerId}
          onClick={onOpenSearch}
          className={`relative ${actionButtonClass}`}
        >
          <CiSearch size={25} className={iconClass} aria-hidden />
        </button>
      </div>
    </div>
  );
}
