import CheckoutForm from "@/components/forms/CheckoutForm";
import type { Metadata } from "next";
import HeroPages from "@/components/layout/hero/HeroPages";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <section className="">
      <HeroPages />
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <CheckoutForm />
      </div>
   
    </section>
  );
}

