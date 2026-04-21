import type { AbstractIntlMessages } from "next-intl";

/**
 * Each key maps to `messages/{locale}/{name}.json`.
 * - `common`: root keys (site, header, footer, …)
 * - Other names: page namespaces, e.g. `getTranslations("home")`.
 */
const loaders = {
  en: {
    common: () => import("../messages/en/common.json"),
    home: () => import("../messages/en/home.json"),
    about: () => import("../messages/en/about.json"),
  },
  ar: {
    common: () => import("../messages/ar/common.json"),
    home: () => import("../messages/ar/home.json"),
    about: () => import("../messages/ar/about.json"),
  },
} as const;

type AppLocale = keyof typeof loaders;
type ModuleName = keyof (typeof loaders)["en"];

const loadOrder: ModuleName[] = ["common", "home", "about"];

export async function loadMessages(
  locale: string
): Promise<AbstractIntlMessages> {
  const lng: AppLocale = locale === "ar" ? "ar" : "en";
  const bundle = loaders[lng];
  const merged: Record<string, unknown> = {};

  for (const name of loadOrder) {
    const { default: data } = await bundle[name]();
    if (name === "common") {
      Object.assign(merged, data);
    } else {
      merged[name] = data;
    }
  }

  return merged as AbstractIntlMessages;
}
