export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  currency: "EGP";
  image: string;
  categorySlug: string;
  inStock: boolean;
  updatedAt: string;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
};
