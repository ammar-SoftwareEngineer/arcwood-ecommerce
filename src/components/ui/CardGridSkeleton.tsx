type CardGridSkeletonProps = {
  count?: number;
  className?: string;
};

export default function CardGridSkeleton({ count = 3, className = "" }: CardGridSkeletonProps) {
  return (
    <div className={`grid grid-cols-12 gap-6 ${className}`.trim()}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="col-span-12 h-64 animate-pulse rounded-xl bg-neutral-200/80 md:col-span-4"
        />
      ))}
    </div>
  );
}
