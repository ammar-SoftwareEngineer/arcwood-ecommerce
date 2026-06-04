import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import HeroPages from "@/components/layout/hero/HeroPages";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title.checkout"),
    description: t("description.checkout"),
    robots: { index: false, follow: false },
  };
}

function CheckoutSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-8 lg:gap-12">
      <div className="col-span-12 h-96 animate-pulse bg-neutral-100 lg:col-span-7" />
      <div className="col-span-12 h-64 animate-pulse bg-neutral-100 lg:col-span-5" />
    </div>
  );
}

export default async function CheckoutPage() {
  return (
    <div>
      <HeroPages />
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-8 lg:px-6 xl:px-16">
          <Suspense fallback={<CheckoutSkeleton />}>
            <div className="grid grid-cols-12 gap-8 lg:gap-12">
              <div className="col-span-12 lg:col-span-7">
                <CheckoutForm />
              </div>
              <div className="col-span-12 lg:col-span-5">
                <CheckoutSummary />
              </div>
            </div>
          </Suspense>
        </div>
      </section>
    </div>
  );
}
