import Cartegories from "@/components/home/Cartegories";
import HeroSection from "@/components/home/HeroSection";
import { setRequestLocale } from "next-intl/server";

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
    </div>
  );
}