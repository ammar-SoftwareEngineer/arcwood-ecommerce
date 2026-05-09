
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeroPages from "@/components/layout/hero/HeroPages";





export default async function ProductDetailsPage() {


  return (
<>
<HeroPages />
<h1>Product Details</h1>
</>
  );
}
