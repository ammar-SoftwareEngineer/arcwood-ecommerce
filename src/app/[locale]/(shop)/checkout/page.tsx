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
    <section className="p-6 space-y-4">
      <HeroPages />
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <CheckoutForm />
    </section>
  );
}

