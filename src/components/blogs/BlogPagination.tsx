import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

const baseBtn =
  "inline-flex min-w-9 h-9 items-center justify-center rounded border border-black/15 bg-white px-2 text-sm tabular-nums transition hover:bg-black/5";
const activeBtn =
  "border-(--primary) bg-[color-mix(in_srgb,var(--primary)_12%,white)] font-medium text-neutral-900";
const disabledBtn = "pointer-events-none opacity-40";

function hrefForBlogPage(n: number) {
  return n <= 1 ? "/blogs" : `/blogs?page=${n}`;
}

type BlogPaginationProps = {
  activePage: number;
  totalPages: number;
  className?: string;
};

export default async function BlogPagination({
  activePage,
  totalPages,
  className = "",
}: BlogPaginationProps) {
  if (totalPages < 2) return null;

  const t = await getTranslations("home.blogs.pagination");
  const nums = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label={t("navAria")}
      className={`flex flex-col items-center gap-4 border-t border-black/10 pt-8 ${className}`.trim()}
    >
      <p className="text-sm tabular-nums text-neutral-600">
        {t("summary", { page: activePage, total: totalPages })}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {activePage < 2 ? (
          <span className={`${baseBtn} px-3 ${disabledBtn}`} aria-hidden>
            ‹
          </span>
        ) : (
          <Link
            href={hrefForBlogPage(activePage - 1)}
            scroll={false}
            className={`${baseBtn} px-3`}
            aria-label={t("previous")}
          >
            ‹
          </Link>
        )}

        {nums.map((n) => (
          <Link
            key={n}
            href={hrefForBlogPage(n)}
            scroll={false}
            className={`${baseBtn} ${n === activePage ? activeBtn : ""}`}
            aria-label={t("goToPage", { n })}
            aria-current={n === activePage ? "page" : undefined}
          >
            {n}
          </Link>
        ))}

        {activePage >= totalPages ? (
          <span className={`${baseBtn} px-3 ${disabledBtn}`} aria-hidden>
            ›
          </span>
        ) : (
          <Link
            href={hrefForBlogPage(activePage + 1)}
            scroll={false}
            className={`${baseBtn} px-3`}
            aria-label={t("next")}
          >
            ›
          </Link>
        )}
      </div>
    </nav>
  );
}
