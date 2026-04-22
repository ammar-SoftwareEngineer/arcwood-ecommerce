type ProductCardProps = {
  title: string;
};

export default function ProductCard({ title }: ProductCardProps) {
  return <article className="border rounded-md p-3">{title}</article>;
}
