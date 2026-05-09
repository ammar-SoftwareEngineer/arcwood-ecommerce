"use client";

export type PaginationLabels = {
  nav: string;
  summary: (page: number, totalPages: number) => string;
  previous: string;
  next: string;
  page: (n: number) => string;
};

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  labels: PaginationLabels;
  busy?: boolean;
  className?: string;
};

const baseBtn =
  "min-w-9 h-9 rounded border border-black/15 bg-white px-2 text-sm tabular-nums transition hover:bg-black/5 disabled:opacity-40";
const activeBtn =
  "border-(--primary) bg-[color-mix(in_srgb,var(--primary)_12%,white)] font-medium text-neutral-900";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  labels,
  busy = false,
  className = "",
}: PaginationProps) {
  if (totalPages < 2) return null;

  const nums = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label={labels.nav}
      aria-busy={busy}
      className={`flex flex-col items-center gap-4 border-t border-black/10 pt-8 ${className}`.trim()}
    >
      <p className="text-sm tabular-nums text-neutral-600">
        {labels.summary(page, totalPages)}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <button
          type="button"
          className={`${baseBtn} px-3`}
          disabled={busy || page < 2}
          onClick={() => onPageChange(page - 1)}
          aria-label={labels.previous}
        >
          ‹
        </button>

        {nums.map((n) => (
          <button
            key={n}
            type="button"
            className={`${baseBtn} ${n === page ? activeBtn : ""}`}
            disabled={busy}
            onClick={() => onPageChange(n)}
            aria-label={labels.page(n)}
            aria-current={n === page ? "page" : undefined}
          >
            {n}
          </button>
        ))}

        <button
          type="button"
          className={`${baseBtn} px-3`}
          disabled={busy || page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label={labels.next}
        >
          ›
        </button>
      </div>
    </nav>
  );
}
