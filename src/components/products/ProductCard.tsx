import { useState } from "react";
import Image from "next/image";
import { HiOutlineEye } from "react-icons/hi2";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import products from "@/lib/data/arcwood-site-data.json";
import { CiShop } from "react-icons/ci";

export type MostViewedProduct =
  (typeof products.mostViewedProducts)[number];

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
  " text-(--primary) hover:bg-white hover:text-(--primary) hover:scale-110";
const wishlistActive =
  "bg-white text-(--primary)  hover:text-(--primary) hover:scale-110";

export default function ProductCard({ item }: { item: MostViewedProduct }) {
  const [wishlisted, setWishlisted] = useState(false);
  const src = publicImagePath(item.image);

  return (
    <section className="group flex h-full flex-col overflow-hidden rounded-0 bg-white transition-shadow hover:shadow-md cursor-pointer">
      <div className="relative mb-3 flex aspect-square w-full items-center justify-center overflow-hidden bg-neutral-50">

        {src ? (
          <Image
            src={src}
            alt={item.imageAlt ?? item.name}
            width={380}
            height={380}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
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
        <div className="pointer-events-none absolute inset-s-4 bottom-3 z-20 flex ">
          <div className="flex translate-y-3 gap-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">

            <button
              type="button"
              className={`${iconBtn} cursor-pointer `}
              aria-label="Quick view"
            >
              <HiOutlineEye size={22} className="h-5 w-5 transition duration-300 ease-out hover:scale-110" />
            </button>
            <button
              type="button"
              className={`${cartBtn} cursor-pointer `}
              aria-label="Add to cart"
            >
              <CiShop size={22} className=" transition duration-300 ease-out hover:scale-110" aria-hidden />
              <span>Add to cart</span>
            </button>

          </div>
        </div>
      </div>
      <div className="p-4 ">

        <div className="mb-3 flex items-start justify-between gap-3">
          <div>     <p className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
            {item.category}
          </p>
            <h3 className="line-clamp-2 min-w-0 flex-1 text-lg font-semibold leading-snug text-neutral-900">
              {item.name}
            </h3></div>
          <button
            type="button"
            className={`${wishlistBtn} ${wishlisted ? wishlistActive : wishlistIdle}`}
            aria-pressed={wishlisted}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setWishlisted((w) => !w);
            }}
          >
            {wishlisted ? (
              <IoIosHeart size={25} aria-hidden />
            ) : (
              <IoIosHeartEmpty size={25} aria-hidden />
            )}
          </button>
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
    </section>
  );
}
