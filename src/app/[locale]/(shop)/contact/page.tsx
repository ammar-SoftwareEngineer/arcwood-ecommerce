import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import HeroPages from "@/components/layout/hero/HeroPages";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title.contact"),
    description: t("description.contact"),
  };
}

export default function ContactPage() {
  return (
    <div>
      <HeroPages />
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-8 lg:px-6 xl:px-16">
          <div className="grid grid-cols-12 overflow-hidden gap-8 lg:gap-12">
            <div className="col-span-12 lg:col-span-6 ">
              <ContactInfo />
            </div>
            <div className="col-span-12 lg:col-span-6 ">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
