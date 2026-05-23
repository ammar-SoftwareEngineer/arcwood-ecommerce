import { SORT_OPTIONS } from "@/lib/api/products";

export type ProductQuery = Record<string, string | undefined>;

/** نص الـ query للروابط (بدون page) */
export function toQueryString(q: ProductQuery) {
  const params = new URLSearchParams();
  if (q.category) params.set("category", q.category);
  if (q.material) params.set("material", q.material);
  if (q.minPrice) params.set("minPrice", q.minPrice);
  if (q.maxPrice) params.set("maxPrice", q.maxPrice);
  if (q.search) params.set("search", q.search);
  if (q.isNew === "true") params.set("isNew", "true");
  if (q.bestSeller === "true") params.set("bestSeller", "true");
  if (q.sort && SORT_OPTIONS.some((o) => o.value === q.sort)) {
    params.set("sort", q.sort);
  }
  return params.toString();
}

export function getSort(q: ProductQuery) {
  const found = SORT_OPTIONS.find((o) => o.value === q.sort);
  return found?.value ?? SORT_OPTIONS[0].value;
}
