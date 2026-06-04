import type { AbstractIntlMessages } from "next-intl";

const loaders = {
  en: {
    common: () => import("../../messages/en/common.json"),
    home: () => import("../../messages/en/home.json"),
    hero: () => import("../../messages/en/hero.json"),
    products: () => import("../../messages/en/products.json"),
    categories: () => import("../../messages/en/categories.json"),
    contact: () => import("../../messages/en/contact.json"),
    checkout: () => import("../../messages/en/checkout.json"),
    toast: () => import("../../messages/en/toast.json"),
  },
  ar: {
    common: () => import("../../messages/ar/common.json"),
    home: () => import("../../messages/ar/home.json"),
    hero: () => import("../../messages/ar/hero.json"),
    products: () => import("../../messages/ar/products.json"),
    categories: () => import("../../messages/ar/categories.json"),
    contact: () => import("../../messages/ar/contact.json"),
    checkout: () => import("../../messages/ar/checkout.json"),
    toast: () => import("../../messages/ar/toast.json"),
  },
} as const;

type AppLocale = keyof typeof loaders;
type ModuleName = keyof (typeof loaders)["en"];

const loadOrder: ModuleName[] = [
  "common",
  "home",
  "hero",
  "products",
  "categories",
  "contact",
  "checkout",
  "toast",
];

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
