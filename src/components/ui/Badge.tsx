
import "@/styles/home/products.css";
type BadgeProps = {
  label: string;

};

export default function Badge({ label }: BadgeProps) {
  return <span className="badge-products">{label}</span>;
}
