const ITEM_COUNT = 4;

export default function WishlistSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-4 sm:gap-6 animate-pulse">
      {Array.from({ length: ITEM_COUNT }).map((_, i) => (
        <div key={i} className="col-span-12 sm:col-span-6 xl:col-span-3">
          <div className="aspect-square bg-neutral-200" />
          <div className="mt-3 h-4 w-2/3 bg-neutral-200" />
          <div className="mt-2 h-4 w-1/3 bg-neutral-200" />
        </div>
      ))}
    </div>
  );
}
