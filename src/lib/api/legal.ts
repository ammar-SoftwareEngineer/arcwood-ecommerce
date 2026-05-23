import legal from "@/lib/data/legal.json";

export type LegalSection = { title?: string; paragraphs: string[] };

export type LegalPage = {
  lastUpdated?: string;
  sections: LegalSection[];
};

export type LegalPageKey = "privacyPolicy" | "refundReturn" | "shippingDelivery" | "termsConditions";

/** Static legal content — replace with Supabase/API when ready. */
export async function getLegalPage(key: LegalPageKey, locale: string): Promise<LegalPage> {
  const lang = locale === "ar" ? "ar" : "en";
  return legal[lang][key];
}
