
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

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { slug } = await params;
//   const query = await rtkStore.dispatch(productsApi.endpoints.getProductBySlug.initiate(slug));
//   const product = query.data;

//   if (!product) {
//     return {
//       title: "Product not found",
//       robots: { index: false, follow: false },
//     };
//   }

//   return {
//     title: product.title,
//     description: product.description,
//   };
// }

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;

  return (
<>
{slug}
</>
  );
}
