import ProductDetails from "@/components/products/details";
import HeroPages from "@/components/layout/hero/HeroPages";
import { getProductBySlug, getRelatedProducts } from "@/lib/api/products";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const isAr = locale === "ar";
  const description = isAr
    ? product.description_ar?.trim() || product.short_description_ar?.trim()
    : product.description?.trim() || product.short_description?.trim();

  return {
    title: product.name,
    description: description || product.name,
  };
}

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product, 12);

  return (
    <div>
      <HeroPages title={product.name} />
      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <ProductDetails product={product} related={related} />
        </div>
      </section>
    </div>
  );
}
