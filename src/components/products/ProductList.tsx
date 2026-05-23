import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/lib/api/products";

type ProductListProps = {
  products: Product[];
  className?: string;
};

export default function ProductList({ products, className }: ProductListProps) {
  return (
    <div className="grid grid-cols-12 gap-4 sm:gap-6 z-0">
      {products.map((product) => (
        <div
          key={product.id}
          className={className}
        >
          <ProductCard item={product} />
        </div>
      ))}
    </div>
  );
}
