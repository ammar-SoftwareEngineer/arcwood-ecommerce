import Image from "next/image";
import {
  HiArrowsRightLeft,
  HiOutlineEye,
  HiOutlineHeart,

} from "react-icons/hi2";
import { IoIosGitCompare } from "react-icons/io";

import products from "@/lib/data/arcwood-site-data.json";
import { CiHeart, CiShop } from "react-icons/ci";

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

export default function ProductCard({ item }: { item: MostViewedProduct }) {
  const src = publicImagePath(item.image);

  return (
    <section className="group flex h-full flex-col overflow-hidden rounded-0 bg-white transition-shadow hover:shadow-md cursor-pointer">
      <div className="relative mb-3 flex aspect-square w-full items-center justify-center overflow-hidden bg-neutral-50">
        {src ? (
          <Image
            src={src}
            alt={item.imageAlt ?? item.name}
            width={380}
            height={500}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <span className="px-3 text-center text-sm text-neutral-400 ">
            {item.name}
          </span>
        )}

        <button
          type="button"
          className="absolute top-0 inset-e-0 z-20 inline-flex h-9 w-9 items-center justify-center rounded-0 cursor-pointer bg-white/95 text-neutral-800 shadow-md ring-1 ring-black/5 transition hover:bg-(--primary) hover:text-white"
          aria-label="Add to wishlist"
        >
          <CiHeart size={25} />
        </button>

        <div
          className="pointer-events-none absolute inset-0 z-10 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center px-2">
          <div className="flex translate-y-3 gap-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              className={`${iconBtn} cursor-pointer`}
              aria-label="Quick view"

            >
              <HiOutlineEye className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              className={`${iconBtn} cursor-pointer`}
              aria-label="Compare"
            >
              <IoIosGitCompare className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              className={`${iconBtn} cursor-pointer`}
              aria-label="Add to cart"
            >
              <CiShop size={25} className="h-5 w-5" />
            </button>

          </div>
        </div>
      </div>
      <div className="p-4 border-t border-t-stone-300">
        <h3 className="line-clamp-1 text-lg font-semibold leading-snug text-neutral-900 pb-3">
          {item.name}
        </h3>
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
