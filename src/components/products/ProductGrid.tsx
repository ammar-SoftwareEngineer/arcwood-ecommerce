

type ProductGridProps = {
  items: { id: string; title: string }[];
};

export default function ProductGrid({ items }: ProductGridProps) {
  return (
    <section className="grid grid-cols-12 gap-7 justify-items-center">

    </section>
  );
}
