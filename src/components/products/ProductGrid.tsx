

type ProductGridProps = {
  items: { id: string; title: string }[];
};

export default function ProductGrid({ items }: ProductGridProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">

    </section>
  );
}
