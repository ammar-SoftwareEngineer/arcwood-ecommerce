import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import { Rubik, Lora } from "next/font/google";
import { notFound } from "next/navigation";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import "@/styles/globals.css";



const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${rubik.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header variant="default" />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}