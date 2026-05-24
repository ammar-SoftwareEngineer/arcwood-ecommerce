const ROW_COUNT = 3;

export default function CartSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-4 animate-pulse">
      <div className="col-span-12 space-y-4 md:col-span-8">
        {Array.from({ length: ROW_COUNT }).map((_, i) => (
          <div key={i} className="h-24 bg-neutral-200" />
        ))}
      </div>
      <aside className="col-span-12 h-72 bg-neutral-100 md:col-span-4" />
    </div>
  );
}
