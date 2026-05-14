import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";

type PaginationButtonProps = {
  href: string;
  label: string;
  isActive?: boolean;
  isDisabled?: boolean;
  className?: string;
  children: ReactNode;
};

const baseClassName =
  "inline-flex h-10 min-w-10 items-center justify-center rounded-0 border border-black/10  text-black px-3 text-sm font-medium tabular-nums text-neutral-700 shadow-sm transition hover:border-(--primary) hover:text-(--primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40";

const activeClassName =
  "border-(--primary) bg-(--primary) text-white shadow-md hover:text-white cursor-pointer";

export default function PaginationButton({
  href,
  label,
  isActive = false,
  isDisabled = false,
  className = "",
  children,
}: PaginationButtonProps) {
  const classes = `${baseClassName} ${isActive ? activeClassName : ""} ${
    isDisabled ? "pointer-events-none opacity-40" : ""
  } ${className}`.trim();

  if (isDisabled) {
    return (
      <span className={classes} aria-hidden>
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      scroll={false}
      className={classes}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
