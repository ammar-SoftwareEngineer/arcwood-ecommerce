import { Link } from "@/i18n/navigation";
import type { ProductQuery } from "@/lib/product-query";
import { getTranslations } from "next-intl/server";
import { CiFilter } from "react-icons/ci";

const input =
  "w-full border border-black/15 px-3 py-2 text-base outline-none focus:border-(--primary)";

type ProductFiltersProps = {
  q: ProductQuery;
  show: "mobile" | "desktop";
};

async function FilterForm({
  q,
  clearHref,
  t,
}: {
  q: ProductQuery;
  clearHref: string;
  t: Awaited<ReturnType<typeof getTranslations<"products.filters">>>;
}) {
  return (
    <form method="get" className="flex flex-col gap-4 w-full">
      {q.category ? <input type="hidden" name="category" value={q.category} /> : null}
      {q.sort ? <input type="hidden" name="sort" value={q.sort} /> : null}

      <div>
        <label className="mb-1 block text-base">{t("search")}</label>
        <input
          name="search"
          type="search"
          defaultValue={q.search ?? ""}
          placeholder={t("searchPlaceholder")}
          className={input}
        />
      </div>

      <div>
        <label className="mb-1 block text-base">{t("material")}</label>
        <input
          name="material"
          type="text"
          defaultValue={q.material ?? ""}
          placeholder={t("material")}
          className={input}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="mb-1 block text-base">{t("minPrice")}</label>
          <input name="minPrice" type="text" defaultValue={q.minPrice ?? ""} className={input} />
        </div>
        <div>
          <label className="mb-1 block text-base">{t("maxPrice")}</label>
          <input name="maxPrice" type="text" defaultValue={q.maxPrice ?? ""} className={input} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-base">
        <input type="checkbox" name="isNew" value="true" defaultChecked={q.isNew === "true"} />
        {t("isNew")}
      </label>

      <label className="flex items-center gap-2 text-base">
        <input
          type="checkbox"
          name="bestSeller"
          value="true"
          defaultChecked={q.bestSeller === "true"}
        />
        {t("bestSeller")}
      </label>

      <button type="submit" className="cta cursor-pointer px-4 py-2.5 text-base font-medium text-white">
        {t("apply")}
      </button>

      <Link href={clearHref} className="cursor-pointer text-center text-base text-neutral-600 underline">
        {t("clear")}
      </Link>
    </form>
  );
}

export default async function ProductFilters({ q, show }: ProductFiltersProps) {
  const t = await getTranslations("products.filters");
  const clearHref = q.category
    ? `/products?category=${encodeURIComponent(q.category)}`
    : "/products";

  const form = <FilterForm q={q} clearHref={clearHref} t={t} />;

  if (show === "mobile") {
    return (
      <div className="relative min-w-0 flex-1 lg:hidden">
        <details className="group h-full w-full rounded-0 border border-black/10 bg-white">
          <summary className="cta flex h-11 min-h-11 w-full cursor-pointer list-none items-center justify-center gap-2 px-3 text-base font-medium [&::-webkit-details-marker]:hidden">
            <CiFilter className="inline-block mr-2" size={20}/> {t("open")}
          </summary>
          <div className="absolute inset-x-0 top-full w-[90vw] z-20 mt-2 border border-black/10 bg-white p-4 shadow-md">
            {form}
          </div>
        </details>
      </div>
    );
  }

  return (
    <aside className="w-full shrink-0">
      <div className="border border-black/10 bg-white p-4 lg:sticky lg:top-28">
        <h2 className="mb-4 border-b border-black/10 pb-2 text-xl font-semibold flex items-center gap-2"> <CiFilter className="inline-block mr-2" size={20} /> {t("title")}</h2>
        {form}
      </div>
    </aside>
  );
}
