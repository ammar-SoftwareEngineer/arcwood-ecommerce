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
    <div className="h-full">
      <HeaderSection subtitle={t("title")} title={t("title")} className="mb-6 about-header" />
      

      <ul className="grid gap-4 text-base mt-6">
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
      <div className=" mt-6 h-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.4252597810378!2d31.3413904!3d30.0533425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f7a265d6957%3A0xc56711bad71c220b!2sArc%20Wood%20Office%20furniture!5e0!3m2!1sen!2seg!4v1779245404659!5m2!1sen!2seg"
          title="Arc Wood location on Google Maps"
          className="h-full w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
