import PaginationButton from "@/components/ui/PaginationButton";
import { getTranslations } from "next-intl/server";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

type PaginationProps = {
  activePage: number;
  totalPages: number;
  basePath: string;
  className?: string;
  pageParam?: string;
};

function getPages(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

function pageHref(basePath: string, page: number, pageParam: string) {
  return page <= 1 ? basePath : `${basePath}?${pageParam}=${page}`;
}

export default async function Pagination({
  activePage,
  totalPages,
  basePath,
  className = "",
  pageParam = "page",
}: PaginationProps) {
  const t = await getTranslations("home.blogs.pagination");

  if (totalPages < 2) return null;

  const pages = getPages(activePage, totalPages);
  const previousPage = activePage - 1;
  const nextPage = activePage + 1;

  return (
    <nav aria-label={t("navAria")} className={`flex flex-col items-center gap-4 border-t border-black/10 pt-8 ${className}`}>
      <p className="text-sm tabular-nums text-neutral-600">
        {t("summary", { page: activePage, total: totalPages })}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <PaginationButton
          href={pageHref(basePath, previousPage, pageParam)}
          label={t("previous")}
          isDisabled={previousPage < 1}
        >
          <IoIosArrowRoundBack size={20} />
        </PaginationButton>

        {pages.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="inline-flex h-9 min-w-9 items-center justify-center text-sm text-neutral-400"
              aria-hidden
            >
              ...
            </span>
          ) : (
            <PaginationButton
              key={page}
              href={pageHref(basePath, page, pageParam)}
              label={t("goToPage", { n: page })}
              isActive={page === activePage}
            >
              {page}
            </PaginationButton>
          )
        )}

        <PaginationButton
          href={pageHref(basePath, nextPage, pageParam)}
          label={t("next")}
          isDisabled={nextPage > totalPages}
          className="cursor-pointer"
        >
          <IoIosArrowRoundForward size={20} />
        </PaginationButton>
      </div>
    </nav>
  );
}