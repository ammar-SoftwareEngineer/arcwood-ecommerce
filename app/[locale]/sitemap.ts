import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const publicPaths = ["/", "/login", "/register"];
const userPaths = ["/account", "/orders"];

function buildLocalizedUrl(locale: string, path: string) {
  return `${baseUrl}/${locale}${path === "/" ? "" : path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const allPaths = [...publicPaths, ...userPaths];

  return allPaths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: buildLocalizedUrl(locale, path),
      lastModified,
      changeFrequency: "daily" as const,
      priority: path === "/" ? 1 : 0.7,
    }))
  );
}
