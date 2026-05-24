import { SORT_OPTIONS } from "@/lib/api/products";

export type ProductQuery = Record<string, string | undefined>;

/** Filter form field values */
export type FilterFormValues = {
  search: string;
  material: string;
  minPrice: string;
  maxPrice: string;
  isNew: boolean;
  bestSeller: boolean;
};

const textFilters = ["material", "minPrice", "maxPrice", "search"] as const;

/** Converts a query object to a search string (excludes page) */
export function toQueryString(q: ProductQuery) {
  const params = new URLSearchParams();

  if (q.category) params.set("category", q.category);
  if (q.material) params.set("material", q.material);
  if (q.minPrice) params.set("minPrice", q.minPrice);
  if (q.maxPrice) params.set("maxPrice", q.maxPrice);
  if (q.search) params.set("search", q.search);
  if (q.isNew === "true") params.set("isNew", "true");
  if (q.bestSeller === "true") params.set("bestSeller", "true");

  if (q.sort && SORT_OPTIONS.some((option) => option.value === q.sort)) {
    params.set("sort", q.sort);
  }

  return params.toString();
}

/** Returns the active sort value or the default */
export function getSort(q: ProductQuery) {
  const found = SORT_OPTIONS.find((option) => option.value === q.sort);
  return found?.value ?? SORT_OPTIONS[0].value;
}

/** Builds the products page path with active filters only */
export function productsPath(q: ProductQuery) {
  const queryString = toQueryString(q);
  return queryString ? `/products?${queryString}` : "/products";
}

/** Clears filters but keeps the category when present */
export function clearFiltersPath(q: ProductQuery) {
  return productsPath({ category: q.category });
}

/** Maps URL query params to react-hook-form default values */
export function queryToFormValues(q: ProductQuery): FilterFormValues {
  return {
    search: q.search ?? "",
    material: q.material ?? "",
    minPrice: q.minPrice ?? "",
    maxPrice: q.maxPrice ?? "",
    isNew: q.isNew === "true",
    bestSeller: q.bestSeller === "true",
  };
}

/** Empty form values used when clearing filters */
export function emptyFilterFormValues(): FilterFormValues {
  return {
    search: "",
    material: "",
    minPrice: "",
    maxPrice: "",
    isNew: false,
    bestSeller: false,
  };
}

/** Maps form values to URL query — empty fields are omitted */
export function filterValuesToQuery(values: FilterFormValues, current: ProductQuery): ProductQuery {
  const next: ProductQuery = {};

  for (const key of textFilters) {
    const value = values[key].trim();
    if (value) next[key] = value;
  }

  if (values.isNew) next.isNew = "true";
  if (values.bestSeller) next.bestSeller = "true";
  if (current.category) next.category = current.category;
  if (current.sort) next.sort = current.sort;

  return next;
}
