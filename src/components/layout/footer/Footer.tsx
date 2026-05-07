import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import siteData from "@/lib/data/site.json";
import { slugify, telEgyptHref } from "@/lib/utils";
import { footerQuickLinks, footerSocialOrder } from "./footer-links";
import { FaCcAmex, FaCcMastercard, FaCcPaypal, FaCcVisa, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
import logo from "@public/logo/logo1.png";
import "@/styles/layout/Footer.css";

const footerSocialIcons = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
} as const;

export default async function Footer() {
  const t = await getTranslations("footer");
  const locale = await getLocale();
  const year = new Date().getFullYear();

  const brandLabel = locale === "ar" ? siteData.branding.nameAr : siteData.branding.name;
  const contact = siteData.contact;
  const social = siteData.social as Record<(typeof footerSocialOrder)[number], string>;

  const footerCategories = siteData.mainCategories.slice(0, 5).map((category) => ({
    href: `/products?category=${slugify(category.name)}`,
    label: locale === "ar" ? category.nameAr : category.name,
  }));

  return (
    <footer className="mt-auto flex items-center justify-center bg-gray-100 px-4 pb-8 pt-16 text-base text-black">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image src={logo} alt={t("logoAlt")} width={180} loading="lazy" />
            <p className="mt-4 max-w-md leading-7">{t("tagline", { brand: brandLabel })}</p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {footerSocialOrder.map((network) => {
                const Icon = footerSocialIcons[network];
                const href = social[network];
                return (
                  <a key={network} href={href} target="_blank" rel="noreferrer">
                    <span className="text-base text-(--primary) hover:text-neutral-700">
                      <Icon size={20} aria-hidden />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h5 className="mb-3 text-lg font-bold text-(--primary)">{t("sections.quickLinks")}</h5>
            <ul className="grid gap-3 text-base">
              {footerQuickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-neutral-950">
                    {t(`quickLinks.${item.messageKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h5 className="mb-3 text-lg font-bold text-(--primary)">{t("sections.categories")}</h5>
            <ul className="grid gap-3 text-base">
              {footerCategories.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-neutral-950">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h5 className="mb-3 text-lg font-bold text-(--primary)">{t("sections.contact")}</h5>
            <ul className="grid gap-4 text-base">
              <li className="flex gap-2">
                <CiLocationOn size={25} aria-hidden />
                {contact.address}
              </li>
              <li>
                <a href={telEgyptHref(contact.phones[0])} className="flex items-center gap-2">
                  <CiPhone size={25} aria-hidden />
                  {contact.phones[0]}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2">
                  <CiMail size={25} aria-hidden />
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-neutral-300" />

        <div className="flex flex-wrap items-center justify-center gap-3 text-center lg:justify-between">
          <p className="mb-0">
            <span>{t("copyright", { year, brand: brandLabel })}</span>
            <span className="mx-1">|</span>
            <span>{t("creditPrefix")} </span>
            <Link
              href="https://be-group.com"
              target="_blank"
              rel="noreferrer"
              className="inline font-semibold text-(--primary) hover:text-neutral-700"
            >
              {t("beGroup")}
            </Link>
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span>
              <FaCcVisa size={30} aria-hidden />
            </span>
            <span>
              <FaCcMastercard size={30} aria-hidden />
            </span>
            <span>
              <FaCcAmex size={30} aria-hidden />
            </span>
            <span>
              <FaCcPaypal size={30} aria-hidden />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
