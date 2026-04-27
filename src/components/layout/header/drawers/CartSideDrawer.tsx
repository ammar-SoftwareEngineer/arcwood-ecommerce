"use client";

import { Link } from "@/i18n/navigation";
import HeaderSideDrawer from "./HeaderSideDrawer";

type CartSideDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  title?: string;
  emptyMessage?: string;
  continueLabel?: string;
  continueHref?: string;
  itemCount?: number;
};

export default function CartSideDrawer({
  isOpen,
  onClose,
  id,
  title = "Cart",
  emptyMessage = "Your cart is empty",
  continueLabel = "Continue shopping",
  continueHref = "/",
  itemCount = 0,
}: CartSideDrawerProps) {
  return (
    <HeaderSideDrawer isOpen={isOpen} onClose={onClose} id={id} title={title} closeLabel="Close cart">
      <div className="flex flex-1 flex-col p-4">
        {itemCount > 0 ? (
          <p className="text-sm text-black/70">Cart content will go here. ({itemCount} items)</p>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center">
            <p className="text-sm text-black/70">{emptyMessage}</p>
            <Link
              href={continueHref}
              onClick={onClose}
              className="inline-flex rounded-0 border border-main bg-main px-5 py-2.5 text-sm font-medium text-white transition hover:bg-main/90"
            >
              {continueLabel}
            </Link>
          </div>
        )}
      </div>
    </HeaderSideDrawer>
  );
}
