"use client";

import { useRouter } from "@/i18n/navigation";
import {
  clearFiltersPath,
  emptyFilterFormValues,
  filterValuesToQuery,
  productsPath,
  queryToFormValues,
  toQueryString,
  type FilterFormValues,
  type ProductQuery,
} from "@/lib/products/product-query";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CiFilter } from "react-icons/ci";

const inputClass =
  "w-full border border-black/15 px-3 py-2 text-base outline-none focus:border-(--primary)";

type Props = {
  q: ProductQuery;
  show: "mobile" | "desktop";
};

/** Product filters — sidebar on desktop, dropdown on mobile */
export default function ProductFilters({ q, show }: Props) {
  const t = useTranslations("products.filters");
  const router = useRouter();
  const queryKey = toQueryString(q);

  const { register, handleSubmit, reset } = useForm<FilterFormValues>({
    defaultValues: queryToFormValues(q),
  });

  // Sync form when URL filters change
  useEffect(() => {
    reset(queryToFormValues(q));
  }, [queryKey, q, reset]);

  const form = (
    <form
      onSubmit={handleSubmit((values) =>
        router.push(productsPath(filterValuesToQuery(values, q)))
      )}
      className="flex w-full flex-col gap-4"
    >
      <div>
        <label className="mb-1 block text-base">{t("search")}</label>
        <input
          type="search"
          placeholder={t("searchPlaceholder")}
          className={inputClass}
          {...register("search")}
        />
      </div>

      <div>
        <label className="mb-1 block text-base">{t("material")}</label>
        <input type="text" placeholder={t("material")} className={inputClass} {...register("material")} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="mb-1 block text-base">{t("minPrice")}</label>
          <input type="text" className={inputClass} {...register("minPrice")} />
        </div>
        <div>
          <label className="mb-1 block text-base">{t("maxPrice")}</label>
          <input type="text" className={inputClass} {...register("maxPrice")} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-base">
        <input type="checkbox" {...register("isNew")} />
        {t("isNew")}
      </label>

      <label className="flex items-center gap-2 text-base">
        <input type="checkbox" {...register("bestSeller")} />
        {t("bestSeller")}
      </label>

      <button type="submit" className="cta cursor-pointer px-4 py-2.5 text-base font-medium text-white">
        {t("apply")}
      </button>

      <button
        type="button"
        onClick={() => {
          reset(emptyFilterFormValues());
          router.push(clearFiltersPath(q));
        }}
        className="cursor-pointer text-center text-base text-neutral-600 underline"
      >
        {t("clear")}
      </button>
    </form>
  );

  if (show === "mobile") {
    return (
      <div className="relative min-w-0 flex-1 lg:hidden">
        <details className="group h-full w-full rounded-0 border border-black/10 bg-white">
          <summary className="cta flex h-11 min-h-11 w-full cursor-pointer list-none items-center justify-center gap-2 px-3 text-base font-medium [&::-webkit-details-marker]:hidden">
            <CiFilter className="mr-2 inline-block" size={20} />
            {t("open")}
          </summary>
          <div className="absolute inset-x-0 top-full z-20 mt-2 w-[90vw] border border-black/10 bg-white p-4 shadow-md">
            {form}
          </div>
        </details>
      </div>
    );
  }

  return (
    <aside className="w-full shrink-0">
      <div className="border border-black/10 bg-white p-4 lg:sticky lg:top-28">
        <h2 className="mb-4 flex items-center gap-2 border-b border-black/10 pb-2 text-xl font-semibold">
          <CiFilter className="mr-2 inline-block" size={20} />
          {t("title")}
        </h2>
        {form}
      </div>
    </aside>
  );
}
