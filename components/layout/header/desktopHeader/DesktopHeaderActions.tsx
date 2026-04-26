import { CiUser, CiShop, CiHeart } from "react-icons/ci";

const iconClass = "text-main cursor-pointer transition-colors hover:text-black!";

const badgeClassName =
  "absolute end-1 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-main px-1.5 text-center text-[10px] font-medium text-white";

type DesktopHeaderActionsProps = {
  languageLabel: string;
  isCartOpen: boolean;
  cartDrawerId: string;
  onOpenCart: () => void;
};

export default function DesktopHeaderActions({
  languageLabel,
  isCartOpen,
  cartDrawerId,
  onOpenCart,
}: DesktopHeaderActionsProps) {
  return (
    <div className="flex items-center gap-1">
      <button type="button" aria-label="Account" className="relative h-10 w-10 rounded-0 text-sm">
        <CiUser size={25} className={iconClass} />
      </button>
      <button
        type="button"
        aria-label="Shopping cart"
        aria-expanded={isCartOpen}
        aria-controls={cartDrawerId}
        onClick={onOpenCart}
        className="relative h-10 w-10 rounded-0 text-sm"
      >
        <CiShop size={25} className={iconClass} />
        <span className={badgeClassName}>0</span>
      </button>
      <button type="button" aria-label="Wishlist" className="relative h-10 w-10 rounded-0 text-sm">
        <CiHeart size={25} className={iconClass} />
        <span className={badgeClassName}>0</span>
      </button>
      <button type="button" aria-label="Language" className="relative h-10 w-10 rounded-0 text-lg font-bold">
        <span className="text-main cursor-pointer transition-colors hover:text-black!">{languageLabel}</span>
      </button>
    </div>
  );
}
