import legalData from "@/lib/data/legal.json";

export type LegalPageKey =
  | "privacyPolicy"
  | "refundReturn"
  | "shippingDelivery"
  | "termsConditions";

export type LegalSection = {
  title?: string;
  paragraphs: string[];
};

export type LegalPageData = {
  lastUpdated?: string;
  sections: LegalSection[];
};

type LegalLocaleBundle = Record<LegalPageKey, LegalPageData>;

const pages = legalData as Record<"en" | "ar", LegalLocaleBundle>;

export async function getLegalPage(
  key: LegalPageKey,
  locale: string,
): Promise<LegalPageData> {
  const lng: "en" | "ar" = locale === "ar" ? "ar" : "en";
  const page = pages[lng]?.[key];

  if (!page) {
    throw new Error(`Legal page not found: ${key} (${lng})`);
  }

  return page;
}
