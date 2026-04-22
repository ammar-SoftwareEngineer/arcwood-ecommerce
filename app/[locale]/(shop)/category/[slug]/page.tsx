import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { categories, getCategoryBySlug, products } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";

export const revalidate = 300;

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} Category`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const items = products.filter((product) => product.categorySlug === slug);

  return (
    <section className="p-6 space-y-5">
      <header>
        <h1 className="text-2xl font-semibold">{category.name}</h1>
        <p className="text-neutral-600">{category.description}</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="border rounded-lg p-4 space-y-2">
            <h2 className="font-medium">{item.title}</h2>
            <p className="text-sm text-neutral-600">{item.description}</p>
            <p className="font-semibold">{formatPrice(item.price, item.currency)}</p>
            <Link href={`/products/${item.slug}`} className="text-sm underline">
              View product
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
