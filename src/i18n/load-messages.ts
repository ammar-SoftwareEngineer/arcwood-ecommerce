import type { AbstractIntlMessages } from "next-intl";


const loaders = {
  en: {
    common: () => import("../../messages/en/common.json"),
    home: () => import("../../messages/en/home.json"),
    about: () => import("../../messages/en/about.json"),
    categories: () => import("../../messages/en/categories.json"),
  },
  ar: {
    common: () => import("../../messages/ar/common.json"),
    home: () => import("../../messages/ar/home.json"),
    about: () => import("../../messages/ar/about.json"),
    categories: () => import("../../messages/ar/categories.json"),
  },
} as const;

type AppLocale = keyof typeof loaders;
type ModuleName = keyof (typeof loaders)["en"];

const loadOrder: ModuleName[] = ["common", "home", "about", "categories"];


export async function loadMessages(
  locale: string
): Promise<AbstractIntlMessages> {
  const lng: AppLocale = locale === "ar" ? "ar" : "en";
  const bundle = loaders[lng];
  const merged: Record<string, unknown> = {};

  const results = await Promise.all(
    loadOrder.map(async (name) => {
      const { default: data } = await bundle[name]();
      return { name, data };
    })
  );

  for (const { name, data } of results) {
    if (name === "common") {
      Object.assign(merged, data);
    } else {
      merged[name] = data;
    }
  }

  return merged as AbstractIntlMessages;
}