
import type { Metadata } from "next";
import { notFound } from "next/navigation";
// import { productsApi } from "@/store/api/productsApi";
// import { rtkStore } from "@/store/rtkStore";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const result = await fetch("https://dummyjson.com/products?limit=20", {
    next: { revalidate },
  });
  const data = (await result.json()) as { products?: Array<{ id: number }> };
  return (data.products ?? []).map((product) => ({ slug: String(product.id) }));
}


export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;

  return (
<>
{slug}
</>
  );
}
