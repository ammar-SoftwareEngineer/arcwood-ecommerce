import BestSeller from "@/components/home/BestSeller";
import Cartegories from "@/components/home/Cartegories";
import Discounts from "@/components/home/Discounts";
import HeroSection from "@/components/home/HeroSection";
import Products from "@/components/home/Products";
import Blogs from "@/components/home/Blogs";
import Why from "@/components/home/Why";
import { getWhyUs } from "@/lib/api/why";

export default async function Home() {
  const why = await getWhyUs();

  return (
    <div>
      <HeroSection />
      <Cartegories />
      <Products />
      {why ? <Why why={why} /> : null}
      <BestSeller />
      <Discounts />
      <Blogs />
    </div>
  );
}
