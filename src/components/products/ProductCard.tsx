"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { HiOutlineEye } from "react-icons/hi2";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import type { Product } from "@/lib/api/products";
import { CiShop } from "react-icons/ci";
import { Link } from "@/i18n/navigation";
import Badge from "../ui/Badge";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useWishlistStore } from "@/store/wishlistStore";

const iconBtn =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-0 bg-white text-neutral-800 shadow-md transition hover:bg-(--primary) hover:text-white cursor-pointer";

const cartBtn =
  "inline-flex h-10 shrink-0 items-center gap-2 rounded-0 bg-white px-3 text-sm font-medium text-neutral-800 shadow-md transition hover:bg-(--primary) hover:text-white cursor-pointer";

const wishlistBtn =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-0 cursor-pointer transition ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-2";

const wishlistIdle =
  "bg-white text-(--primary) hover:bg-(--primary) hover:text-white";
const wishlistActive = "bg-white text-(--primary) hover:text-(--primary)";

const actions =
  "pointer-events-auto flex gap-2 opacity-100 transition-all duration-300 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100";

export default function ProductCard({ item }: { item: Product }) {
  const slug = item.name.toLowerCase().replace(/ /g, "-");
  const addItem = useWishlistStore((s) => s.addItem);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const inWishlist = useWishlistStore((s) => s.isInWishlist(item.id));

  const t = useTranslations("products");
  const toastT = useTranslations("toast");

  async function onWishlistClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      const result = await removeItem(item.id);
      if (result.ok) toast.success(toastT("wishlistRemoved"));
      else toast.error(toastT(result.messageKey));
      return;
    }

    const result = await addItem({
      product_id: item.id,
      name: item.name,
      price_egp: item.price_egp,
      image_url: item.image_url,
    });

    if (result.ok) toast.success(toastT("wishlistAdded"));
    else toast.error(toastT(result.messageKey));
  }

  return (
    <section className="group relative flex h-full flex-col overflow-hidden rounded-0 bg-white transition-shadow hover:shadow-md">
      <div className="relative aspect-square bg-neutral-50 overflow-hidden">
        <Link href={`/products/${slug}`} className="absolute inset-0 z-0">
          {item.is_new ? (
            <div className="absolute top-2 z-10">
              <Badge label={t("new")} />
            </div>
          ) : null}

          {item.image_url ? (
            <div className="overflow-hidden">
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            />
            </div>
          ) : (
            <span className="flex h-full items-center justify-center px-3 text-sm text-neutral-400">
              {item.name}
            </span>
          )}
        </Link>

        <div className="absolute inset-x-0 bottom-3 z-20 flex w-full justify-center px-4">
          <div className={actions}>
            <button type="button" className={iconBtn} aria-label="Quick view">
              <HiOutlineEye size={22} />
            </button>
            <button type="button"  className={cartBtn} aria-label="Add to cart">
              <CiShop size={22} aria-hidden />
              <span className="text-base">Add to cart</span>
            </button>
            <button
              type="button"
              className={`${wishlistBtn} ${inWishlist ? wishlistActive : wishlistIdle}`}
              aria-pressed={inWishlist}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              onClick={onWishlistClick}
            >
              {inWishlist ? (
                <IoIosHeart size={25} aria-hidden />
              ) : (
                <IoIosHeartEmpty size={25} aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>

      <Link
        href={`/products/${slug}`}
        className="flex flex-1 flex-col border border-(--primary) border-t-0"
      >
        <p className="mb-2 w-fit bg-(--primary) px-2 py-2 text-sm font-medium uppercase tracking-wide text-white">
          {item.category}
        </p>
        <div className="mt-3 flex flex-col gap-3 px-4 pb-4">
          <h3 className="line-clamp-1 text-lg font-semibold text-neutral-900">
            {item.name}
          </h3>
          <p className="text-main font-medium tabular-nums">
            {item.price_egp.toLocaleString()} EGP
          </p>
        </div>
      </Link>
    </section>
  );
}
