import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { products } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";
import HeroPages from "@/components/layout/hero/HeroPages";
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
  

  return (
    <section className=" space-y-6">
          <HeroPages />
      <h1 className="text-2xl font-semibold">Products</h1>

  
    </section>
  );
}
