import { useState, type MouseEvent } from "react";
import Image from "next/image";
import { HiOutlineEye } from "react-icons/hi2";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import products from "@/lib/data/arcwood-site-data.json";
import { CiShop } from "react-icons/ci";
import { Link } from "@/i18n/navigation";
import Badge from "../ui/Badge";

export type MostViewedProduct =
  (typeof products.mostViewedProducts)[number];
export type BestSellerProduct =
  (typeof products.bestSellerProducts)[number];

function publicImagePath(src: string | null): string | null {
  if (!src) return null;
  if (src.startsWith("/")) return src;
  const tail = src
    .replace(/^(?:\.\.\/)+public\//, "")
    .replace(/^\.\//, "")
    .replace(/^public\//, "");
  return `/${tail}`;
}

const iconBtn =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-0 bg-white text-neutral-800 shadow-md transition hover:bg-(--primary) hover:text-white";

const cartBtn =
  "inline-flex h-10 shrink-0 items-center gap-2 rounded-0 bg-white px-3 text-sm font-medium text-neutral-800 shadow-md transition hover:bg-(--primary) hover:text-white";

/** Wishlist beside title — compact icon button */
const wishlistBtn =
  "inline-flex h-9 w-9  shrink-0 items-center justify-center rounded-0 cursor-pointer transition  ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-2";

const wishlistIdle =
  " bg-white text-(--primary) hover:bg-(--primary) hover:text-white ";
const wishlistActive =
  "bg-white text-(--primary)  hover:text-(--primary)  ";

export default function ProductCard({ item }: { item: MostViewedProduct | BestSellerProduct }) {
  const [wishlisted, setWishlisted] = useState(false);
  const src = publicImagePath(item.image);
  // Card is wrapped with Link, so action buttons must block navigation.

  return (
    <section className="relative group flex h-full flex-col overflow-hidden rounded-0 bg-white transition-shadow hover:shadow-md cursor-pointer">
      <Link href={`/products/${item.name}`}>
      {item.new ? (
        <div className="absolute top-2 left-0 z-10 ">
          <Badge label="New" />

        </div>
      ) : null}
      <div className="relative  flex aspect-square w-full items-center justify-center overflow-hidden bg-neutral-50">

        {src ? (
          <Image
            src={src}
            alt={item.imageAlt ?? item.name}
            fill
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          />
        ) : (
          <span className="px-3 text-center text-sm text-neutral-400 ">
            {item.name}
          </span>
        )}


        <div
          className="pointer-events-none absolute inset-0 z-10 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"
          aria-hidden
        />
        <div className="pointer-events-none absolute  bottom-3 z-20 flex px-4">
          <div className="flex translate-y-3 gap-2 opacity-0 transition-all justify-center duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">

            <button
              type="button"
              className={`${iconBtn} cursor-pointer `}
              aria-label="Quick view"

            >
              <HiOutlineEye size={22} className="h-5 w-5 transition duration-300 ease-out hover:scale-110" />
            </button>
            <button
              type="button"
              className={`${cartBtn} cursor-pointer w-full flex items-center justify-center`}
              aria-label="Add to cart"

            >
              <CiShop size={22} className=" transition duration-300 ease-out hover:scale-110" aria-hidden />
              <span className="text-base">Add to cart</span>
            </button>
            <button
              type="button"
              className={`${wishlistBtn} ${wishlisted ? wishlistActive : wishlistIdle}`}
              aria-pressed={wishlisted}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              onClick={(e) => {

                setWishlisted((e) => !e);
              }}
            >
              {wishlisted ? (
                <IoIosHeart size={25} className=" transition duration-300 ease-out hover:scale-110" aria-hidden />
              ) : (
                <IoIosHeartEmpty size={25} className=" transition duration-300 ease-out hover:scale-110" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 pt-5 border border-(--primary) border-t-0">

        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
              {item.category}
            </p>
            <h3 className="line-clamp-1  flex-1 text-lg font-semibold leading-snug text-neutral-900">
              {item.name}
            </h3></div>

        </div>
        <div className="flex items-center gap-2">
          <p className="text-main mt-auto font-medium tabular-nums  ">

            {item.priceEGP.toLocaleString()} EGP
          </p>
          <p className="text-neutral-500 text-sm line-through">
            {item.priceEGP.toLocaleString()} EGP
          </p>
        </div>
      </div>
      </Link>
    </section>
  );
}
