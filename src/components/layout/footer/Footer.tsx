import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import siteData from "@/lib/data/arcwood-site-data.json";

export default async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  const quickLinkHref: Record<string, string> = {
    "About Us": "/about",
    Trending: "/products",
    "Contact Us": "/contact",
  };



  const serviceHref: Record<string, string> = {
    "Privacy Policy": "/privacy-policy",
    "Refund and return policy": "/refund-return-policy",
  };

  const quickLinks = siteData.navigation.quickLinks.map((label) => ({
    label,
    href: quickLinkHref[label] ?? `/${slugify(label)}`,
  }));



  const categories = siteData.mainCategories.map((category) => ({
    label: category.name,
    href: `/products?category=${slugify(category.name)}`,
  }));

  const customerServices = siteData.navigation.customerServices.map((label) => ({
    label,
    href: serviceHref[label] ?? `/${slugify(label)}`,
  }));

  return (
    <footer className="mt-auto border-t px-4 py-10 text-sm">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 text-base font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

         

          <div>
            <h3 className="mb-3 text-base font-semibold">Categories</h3>
            <ul className="space-y-2">
              {categories.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-base font-semibold">Customer Services</h3>
            <ul className="space-y-2">
              {customerServices.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-4 text-center text-neutral-600">
          {t("copyright", { year })}
        </div>
      </div>
    </footer>
  );
}
