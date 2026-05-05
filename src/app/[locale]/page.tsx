
import BestSeller from "@/components/home/BestSeller";
import Cartegories from "@/components/home/Cartegories";
import Discounts from "@/components/home/Discounts";
import HeroSection from "@/components/home/HeroSection";  
import Products from "@/components/home/Products";
import { setRequestLocale } from "next-intl/server";
import Blogs from "@/components/home/Blogs";
import Why from "@/components/home/Why";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <HeroSection />
      <Cartegories />
      <Products />
      <Why />
      <BestSeller />
      <Discounts />
      <Blogs />
    </div>
  );
}