import logo from "../../../public/logo/logo1.webp";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import { Barlow_Condensed, Cormorant_Garamond ,Cairo} from "next/font/google";
import { notFound } from "next/navigation";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import "@/styles/globals.css";


const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  weight: [ "300", "400", "500", "600", "700", "800", "900"],
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  weight: [ "300", "400", "500", "600", "700"],
});

const cairo = Cairo({
  subsets: ["latin"],
  variable: "--font-cairo",
  weight: [ "300", "400", "500", "600", "700", "800", "900"],
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
      className={`${barlowCondensed.variable} ${cormorantGaramond.variable} ${cairo.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href={logo.src} />
      </head>
      <body className="min-h-full ">
        <NextIntlClientProvider messages={messages}>

          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}