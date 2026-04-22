import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { products } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";

export const revalidate = 300;

const PAGE_SIZE = 2;

type ProductsPageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    sort?: "price_asc" | "price_desc";
  }>;
};

export const metadata: Metadata = {
  title: "Products",
  description: "Browse products with filtering and pagination.",
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const page = Math.max(Number(params.page ?? "1"), 1);
  const category = params.category?.trim();
  const sort = params.sort;

  const filtered = category
    ? products.filter((product) => product.categorySlug === category)
    : products;

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price_desc") return b.price - a.price;
    if (sort === "price_asc") return a.price - b.price;
    return a.title.localeCompare(b.title);
  });

  const totalPages = Math.max(Math.ceil(sorted.length / PAGE_SIZE), 1);
  const safePage = Math.min(page, totalPages);
  const paged = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Products</h1>

      <form className="flex flex-wrap gap-3 items-end">
        <label className="text-sm">
          Category
          <select name="category" defaultValue={category ?? ""} className="ml-2 border rounded px-2 py-1">
            <option value="">All</option>
            <option value="flooring">Flooring</option>
            <option value="doors">Doors</option>
            <option value="panels">Panels</option>
          </select>
        </label>
        <label className="text-sm">
          Sort
          <select name="sort" defaultValue={sort ?? ""} className="ml-2 border rounded px-2 py-1">
            <option value="">A-Z</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </label>
        <button type="submit" className="border rounded px-3 py-1 text-sm">
          Apply
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        {paged.map((product) => (
          <article key={product.id} className="border rounded-lg p-4 space-y-2">
            <h2 className="font-medium">{product.title}</h2>
            <p className="text-sm text-neutral-600">{product.description}</p>
            <p className="font-semibold">{formatPrice(product.price, product.currency)}</p>
            <Link href={`/products/${product.slug}`} className="text-sm underline">
              View details
            </Link>
          </article>
        ))}
      </div>

      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, index) => {
          const nextPage = index + 1;
          const query = new URLSearchParams();
          if (category) query.set("category", category);
          if (sort) query.set("sort", sort);
          query.set("page", String(nextPage));

          return (
            <Link
              key={nextPage}
              href={`/products?${query.toString()}`}
              className={`border rounded px-3 py-1 text-sm ${safePage === nextPage ? "bg-black text-white" : ""}`}
            >
              {nextPage}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
