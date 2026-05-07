export function formatPrice(value: number, currency = "EGP") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

/** URL slug from Latin category / label text (queries stay ASCII). */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function telEgyptHref(phone: string) {
  const digits = phone.replace(/\s+/g, "");
  const body = digits.startsWith("0") ? digits.slice(1) : digits;
  return `tel:+20${body}`;
}

export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
