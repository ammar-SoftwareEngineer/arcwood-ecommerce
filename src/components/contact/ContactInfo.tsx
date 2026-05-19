import HeaderSection from "@/components/ui/HeaderSection";
import siteData from "@/lib/data/site.json";
import { telEgyptHref } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";

export default async function ContactInfo() {
  const t = await getTranslations("contact");
  const contact = siteData.contact;
  const mapsQuery = encodeURIComponent(contact.address);

  return (
    <div>
      <HeaderSection subtitle={t("title")} title={t("title")} className="mb-6 about-header" />
      <p className="mb-8 max-w-lg leading-relaxed text-neutral-600">{t("description")}</p>

      <ul className="grid gap-4 text-base">
        <li>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
            target="_blank"
            rel="noreferrer"
            className="flex gap-3 transition hover:text-(--primary)"
          >
            <CiLocationOn size={24} className="shrink-0 text-(--primary)" aria-hidden />
            <span>{contact.address}</span>
          </a>
        </li>
        <li>
          <a
            href={telEgyptHref(contact.phones[0])}
            className="flex gap-3 transition hover:text-(--primary)"
          >
            <CiPhone size={24} className="shrink-0 text-(--primary)" aria-hidden />
            <span>{contact.phones[0]}</span>
          </a>
        </li>
        <li>
          <a
            href={`mailto:${contact.email}`}
            className="flex gap-3 transition hover:text-(--primary)"
          >
            <CiMail size={24} className="shrink-0 text-(--primary)" aria-hidden />
            <span>{contact.email}</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
