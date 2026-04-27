import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { products } from "@/lib/catalog";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata: Metadata = {
  title: "Search",
  description: "Search products by keyword.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();

  const results = query
    ? products.filter((product) => {
        const haystack = `${product.title} ${product.description}`.toLowerCase();
        return haystack.includes(query);
      })
    : [];

  return (
    <section className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Search</h1>
      <form>
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search products..."
          className="border rounded px-3 py-2 w-full max-w-md"
        />
      </form>
      {query ? <p className="text-sm text-neutral-600">{results.length} result(s) found.</p> : null}
      <div className="space-y-3">
        {results.map((product) => (
          <article key={product.id} className="border rounded p-3">
            <h2 className="font-medium">{product.title}</h2>
            <Link href={`/products/${product.slug}`} className="text-sm underline">
              Open product
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
