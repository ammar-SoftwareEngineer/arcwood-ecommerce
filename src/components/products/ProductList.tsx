import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/lib/api/products";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-12 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
        >
          <ProductCard item={product} />
        </div>
      ))}
    </div>
  );
}
