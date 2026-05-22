export default function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="col-span-12 sm:col-span-6 lg:col-span-4 animate-pulse">
          <div className="aspect-square bg-neutral-200" />
          <div className="mt-3 h-4 w-2/3 bg-neutral-200" />
          <div className="mt-2 h-4 w-1/3 bg-neutral-200" />
        </div>
      ))}
    </div>
  );
}
