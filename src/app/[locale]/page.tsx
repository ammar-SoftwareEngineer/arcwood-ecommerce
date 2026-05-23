import BestSeller from "@/components/home/BestSeller";
import Discounts from "@/components/home/Discounts";
import HeroSection from "@/components/home/HeroSection";
import Products from "@/components/home/Products";
import Blogs from "@/components/home/Blogs";
import Why from "@/components/home/Why";
import Categories from "@/components/home/Categories";

export default async function Home() {


  return (
    <div>
      <HeroSection />
      <Categories />
      <Products />
      <Why />
      <BestSeller />
      <Discounts />
      <Blogs />
    </div>
  );
}
