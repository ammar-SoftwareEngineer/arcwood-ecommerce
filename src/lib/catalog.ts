import type { Category, Product } from "@/types";

export const categories: Category[] = [
  { slug: "flooring", name: "Flooring", description: "Premium floor collections" },
  { slug: "doors", name: "Doors", description: "Interior and exterior doors" },
  { slug: "panels", name: "Panels", description: "Decorative wall and ceiling panels" },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "premium-oak-flooring",
    title: "Premium Oak Flooring",
    description: "Natural oak planks with durable finish for modern interiors.",
    price: 85,
    currency: "EGP",
    image: "/next.svg",
    categorySlug: "flooring",
    inStock: true,
    updatedAt: "2026-04-20T00:00:00.000Z",
  },
  {
    id: "p2",
    slug: "luxury-walnut-flooring",
    title: "Luxury Walnut Flooring",
    description: "Elegant dark walnut tone with high moisture resistance.",
    price: 99,
    currency: "EGP",
    image: "/vercel.svg",
    categorySlug: "flooring",
    inStock: true,
    updatedAt: "2026-04-18T00:00:00.000Z",
  },
  {
    id: "p3",
    slug: "laminated-interior-door",
    title: "Laminated Interior Door",
    description: "Scratch-resistant laminated finish with soft-close hinges.",
    price: 240,
    currency: "EGP",
    image: "/window.svg",
    categorySlug: "doors",
    inStock: true,
    updatedAt: "2026-04-19T00:00:00.000Z",
  },
  {
    id: "p4",
    slug: "acoustic-wall-panel",
    title: "Acoustic Wall Panel",
    description: "Noise-absorbing panel designed for offices and studios.",
    price: 60,
    currency: "EGP",
    image: "/globe.svg",
    categorySlug: "panels",
    inStock: false,
    updatedAt: "2026-04-16T00:00:00.000Z",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
