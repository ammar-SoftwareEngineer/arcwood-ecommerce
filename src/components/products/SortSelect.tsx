"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { SORT_OPTIONS } from "@/lib/api/products";
import { useLocale } from "next-intl";

type Props = {
  sort: string;
  query: string;
};

export default function SortSelect({ sort, query }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <select
      value={sort}
      onChange={(e) => {
        const p = new URLSearchParams(query);
        p.set("sort", e.target.value);
        p.delete("page");
        router.push(`${pathname}?${p}`);
      }}
      className="border border-black/15 px-3 py-2 text-base outline-none focus:border-(--primary)"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {locale === "ar" ? opt.label_ar : opt.label}
        </option>
      ))}
    </select>
  );
}
