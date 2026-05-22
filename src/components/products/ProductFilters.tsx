"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";

import { useTranslations } from "next-intl";
import { useTransition } from "react";

type Filters = {
  category?: string;
  search?: string;
  material?: string;
  minPrice?: string;
  maxPrice?: string;
  isNew?: string;
  bestSeller?: string;
};

const input =
  "w-full border border-black/15 px-3 py-2 text-base outline-none focus:border-(--primary)";


export default function ProductFilters({ filters }: { filters: Filters }) {
  const t = useTranslations("products.filters");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const clearHref = filters.category
    ? `/products?category=${encodeURIComponent(filters.category)}`
    : "/products";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams();
    const fd = new FormData(e.currentTarget);

    fd.forEach((value, key) => {
      if (value) params.set(key, String(value));
    });

    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `${pathname}?${qs}` : pathname);
    });
  }

  return (
    <aside className="w-full shrink-0">
      <div className="border border-black/10 bg-white p-4 lg:sticky lg:top-28">
        <h2 className="mb-4 border-b border-black/10 pb-2 font-semibold text-xl">{t("title")}</h2>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {filters.category ? (
            <input type="hidden" name="category" value={filters.category} />
          ) : null}

          <div>
            <label className="mb-1 block text-base">{t("search")}</label>
            <input
              name="search"
              type="search"
              defaultValue={filters.search ?? ""}
              placeholder={t("searchPlaceholder")}
              className={input}
            />
          </div>

          {/* <div>
            <label htmlFor="material" className="mb-1 block text-base">
              {t("material")}
            </label>
            <select
              id="material"
              name="material"
              defaultValue={filters.material ?? ""}
              className={input}
            >
              <option value="">{t("allMaterials")}</option>
              {MATERIALS.map((item) => (
                <option key={item.value} value={item.value}>
                  {t(item.labelKey)}
                </option>
              ))}
            </select>
          </div> */}

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-base">{t("minPrice")}</label>
              <input
                name="minPrice"
                type="text"
                defaultValue={filters.minPrice ?? ""}
                className={input}
              />
            </div>
            <div>
              <label className="mb-1 block text-base">{t("maxPrice")}</label>
              <input
                name="maxPrice"
                type="text"
                defaultValue={filters.maxPrice ?? ""}
                className={input}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-base">
            <input
              type="checkbox"
              name="isNew"
              value="true"
              defaultChecked={filters.isNew === "true"}
            />
            {t("isNew")}
          </label>

          <label className="flex items-center gap-2 text-base">
            <input
              type="checkbox"
              name="bestSeller"
              value="true"
              defaultChecked={filters.bestSeller === "true"}
            />
            {t("bestSeller")}
          </label>

          <button
            type="submit"
            disabled={isPending}
            className="cta px-4 mt-4  text-base font-medium text-white cursor-pointer disabled:opacity-60"
          >
            {isPending ? t("loading") : t("apply")}
          </button>

          <Link
            href={clearHref}
            className="text-center text-base text-neutral-600 underline cursor-pointer"
          >
            {t("clear")}
          </Link>
          
        </form>
      </div>
    </aside>
  );
}
