import Image from "next/image";

import type { Product } from "@/lib/api/products";
import { productSlug } from "@/lib/product";
import { Link } from "@/i18n/navigation";
import Badge from "../ui/Badge";
import ProductCardActions from "./ProductCardActions";
import { useTranslations } from "next-intl";

type ProductCardProps = {
  item: Product;
};

/**
 * Product tile (Server Component): image + link + footer.
 * Cart/wishlist/quick-view live in ProductCardActions (client) because they use Zustand.
 */
export default function ProductCard({ item }: ProductCardProps) {
  const t = useTranslations("products");
  const slug = productSlug(item.name);

  return (
    <section className="group relative z-0 flex h-full flex-col overflow-hidden rounded-0 bg-white transition-shadow hover:shadow-md">
      <div className="relative z-0 aspect-square overflow-hidden bg-neutral-50">
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

        {/* Actions sit above the link; z-20 so clicks hit buttons, not navigation. */}
        <div className="absolute inset-x-0 bottom-3 z-20 flex w-full justify-center px-4">
          <ProductCardActions product={item} />
        </div>
      </div>

      <Link
        href={`/products/${slug}`}
        className="flex flex-1 flex-col border border-(--primary) border-t-0"
      >
        {item.category ? (
          <p className="mb-2 w-fit bg-(--primary) px-2 py-2 text-sm font-medium uppercase tracking-wide text-white">
            {item.category}
          </p>
        ) : null}
        <div className="mt-3 flex flex-col gap-3 px-4 pb-4">
          <h3 className="line-clamp-1 text-lg font-semibold text-neutral-900">{item.name}</h3>
          <p className="text-main font-medium tabular-nums">{item.price_egp.toLocaleString()} EGP</p>
        </div>
      </Link>
    </section>
  );
}
