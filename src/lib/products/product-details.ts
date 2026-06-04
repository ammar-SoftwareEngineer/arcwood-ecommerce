import type { Product } from "@/lib/api/products";

export type ProductSpecRow = {
  label: string;
  value: string;
};

/** Main image + gallery (unique, main first). */
export function getProductGallery(product: Product): string[] {
  const urls = new Set<string>();

  const main = product.image_url?.trim();
  if (main) urls.add(main);

  for (const url of product.gallery_images ?? []) {
    const trimmed = url?.trim();
    if (trimmed) urls.add(trimmed);
  }

  return [...urls];
}

export function getProductShortDescription(product: Product, isAr: boolean): string {
  const short = isAr
    ? product.short_description_ar?.trim() || product.short_description?.trim()
    : product.short_description?.trim() || product.short_description_ar?.trim();

  if (short) return short;

  const full = isAr
    ? product.description_ar?.trim() || product.description?.trim()
    : product.description?.trim() || product.description_ar?.trim();

  if (!full) return "";
  return full.length > 160 ? `${full.slice(0, 160)}…` : full;
}

export function getProductDescription(product: Product, isAr: boolean): string {
  return isAr
    ? product.description_ar?.trim() || product.description?.trim() || ""
    : product.description?.trim() || product.description_ar?.trim() || "";
}

export function buildProductSpecs(
  product: Product,
  labels: Record<string, string>,
  isAr: boolean,
): ProductSpecRow[] {
  const yes = isAr ? "نعم" : "Yes";
  const no = isAr ? "لا" : "No";
  const months = isAr ? "شهر" : "month";

  const rows: ProductSpecRow[] = [
    { label: labels.name, value: product.name },
    { label: labels.brand, value: product.brand?.trim() || "Arcwood" },
  ];

  if (product.code) rows.push({ label: labels.code, value: product.code });
  if (product.barcode) rows.push({ label: labels.barcode, value: product.barcode });
  if (product.material) rows.push({ label: labels.material, value: product.material });

  if (product.warranty_months != null) {
    rows.push({
      label: labels.warranty,
      value: `${product.warranty_months} ${months}`,
    });
  }

  if (product.after_sale_service != null) {
    rows.push({
      label: labels.afterSale,
      value: product.after_sale_service ? yes : no,
    });
  }

  if (product.price_excludes_vat != null) {
    rows.push({
      label: labels.vatExcluded,
      value: product.price_excludes_vat ? yes : no,
    });
  }

  if (product.price_excludes_transport != null) {
    rows.push({
      label: labels.transportExcluded,
      value: product.price_excludes_transport ? yes : no,
    });
  }

  if (product.supply_days != null) {
    rows.push({
      label: labels.supplyDuration,
      value: isAr
        ? `${product.supply_days} أيام بعد استلام أمر التوريد`
        : `${product.supply_days} days after receiving the supply order`,
    });
  }

  return rows;
}

/** Spec rows with labels from `products.details` translations. */
/** Delivery estimate shown on product page (uses `supply_days` when set). */
export function getDeliveryEstimate(
  product: Product,
  labels: { productDays: string; defaultRange: string; defaultPeak: string },
): { main: string; note?: string } {
  if (product.supply_days != null && product.supply_days > 0) {
    return { main: labels.productDays.replace("{days}", String(product.supply_days)) };
  }
  return { main: labels.defaultRange, note: labels.defaultPeak };
}

export function getProductSpecs(
  product: Product,
  t: (key: string) => string,
  isAr: boolean,
): ProductSpecRow[] {
  return buildProductSpecs(
    product,
    {
      name: t("specs.name"),
      brand: t("specs.brand"),
      code: t("specs.code"),
      barcode: t("specs.barcode"),
      material: t("specs.material"),
      warranty: t("specs.warranty"),
      afterSale: t("specs.afterSale"),
      vatExcluded: t("specs.vatExcluded"),
      transportExcluded: t("specs.transportExcluded"),
      supplyDuration: t("specs.supplyDuration"),
    },
    isAr,
  );
}

export function parseGalleryImages(raw: unknown): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof raw === "string") {
    const text = raw.trim();
    if (!text) return [];
    try {
      const parsed = JSON.parse(text) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      return text.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
}
