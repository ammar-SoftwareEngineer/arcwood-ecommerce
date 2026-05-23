import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faWhatsapp, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { useTranslations } from "next-intl";
import { telEgyptHref } from "@/lib/utils";
import { drawerSocialOrder } from "../drawer-social";
import type { SiteContact } from "../types";

const drawerSocialIcons = {
  facebook: faFacebookF,
  instagram: faInstagram,
  twitter: faXTwitter,
  whatsapp: faWhatsapp,
} as const;

type MobileMenuContactProps = {
  contact: SiteContact;
  social: Record<(typeof drawerSocialOrder)[number], string>;
};

export default function MobileMenuContact({ contact, social }: MobileMenuContactProps) {
  const t = useTranslations("header");
  const primaryPhoneHref = telEgyptHref(contact.phones[0] ?? "");

  return (
    <>
      <ul className="mt-6 rounded-none border border-black/10 bg-white p-4 shadow-sm">
        <li className="mb-3 border-b border-black/10 pb-3">
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faEnvelope} className="mt-1 text-main" aria-hidden />
            <div className="text-base">
              <strong className="block">{t("mobile.contactLabels.email")}</strong>
              <a href={`mailto:${contact.email}`} className="text-black/70 hover:text-black">
                {contact.email}
              </a>
            </div>
          </div>
        </li>
        <li className="mb-3 border-b border-black/10 pb-3">
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faPhoneVolume} className="mt-1 text-main" aria-hidden />
            <div className="text-base">
              <strong className="block">{t("mobile.contactLabels.phone")}</strong>
              <a href={primaryPhoneHref} className="text-black/70 hover:text-black">
                {contact.phones[0]}
              </a>
            </div>
          </div>
        </li>
        <li>
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faLocationDot} className="mt-1 text-main" aria-hidden />
            <div className="text-base text-black/70">
              <strong className="block text-black">{t("mobile.contactLabels.address")}</strong>
              <span className="block">{contact.address}</span>
            </div>
          </div>
        </li>
      </ul>

      <div className="mt-4 flex items-center gap-3 border-t border-black/10 pt-4">
        {drawerSocialOrder.map((key) => (
          <a
            key={key}
            href={social[key]}
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-none border border-black/15 text-base font-semibold text-black/70 transition hover:bg-black/10 hover:text-black"
            aria-label={key}
          >
            <FontAwesomeIcon icon={drawerSocialIcons[key]} aria-hidden />
          </a>
        ))}
      </div>
    </>
  );
}
