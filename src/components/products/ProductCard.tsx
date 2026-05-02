import Image from "next/image";
import products from "@/lib/data/arcwood-site-data.json";

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

export default function ProductCard({ item }: { item: MostViewedProduct }) {
  const src = publicImagePath(item.image);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative mb-3 flex aspect-square w-full shrink-0 items-center justify-center bg-neutral-50">
        {src ? (
          <Image
            src={src}
            alt={item.imageAlt ?? item.name}
            width={280}
            height={280}
            className="max-h-[200px] w-auto max-w-[90%] object-contain"
          />
        ) : (
          <span className="px-3 text-center text-sm text-neutral-400">
            {item.name}
          </span>
        )}
      </div>
      <h3 className="line-clamp-2 text-base font-semibold leading-snug text-neutral-900">
        {item.name}
      </h3>
      <p className="text-main mt-auto font-medium tabular-nums">
        {item.priceEGP.toLocaleString()} EGP
      </p>
    </article>
  );
}
