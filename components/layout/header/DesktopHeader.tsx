import { Link } from "@/i18n/navigation";
import Image, { type StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHeart, faLayerGroup, faSearch, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

type HeaderItem = {
  href: string;
  label: string;
};

type DesktopHeaderProps = {
  promoText: string;
  navItems: HeaderItem[];
  categoryItems: HeaderItem[];
  mainBarClass: string;
  topBarClass: string;
  navLinkClass: string;
  categoryButtonClass: string;
  searchIconClass: string;
  searchInputClass: string;
  iconButtonClass: string;
  logoSrc: StaticImageData;
  categoriesLabel: string;
};

export default function DesktopHeader({
  promoText,
  navItems,
  categoryItems,
  mainBarClass,
  topBarClass,
  navLinkClass,
  categoryButtonClass,
  searchIconClass,
  searchInputClass,
  iconButtonClass,
  logoSrc,
  categoriesLabel,
}: DesktopHeaderProps) {
  return (
    <div className="hidden md:block">
      <div className={`border-b backdrop-blur ${topBarClass}`}>
        <div className=" w-full overflow-hidden px-6 py-3 text-xs">
          <div className="flex items-center justify-center gap-12 w-full whitespace-nowrap animate-[headerMarquee_18s_linear_infinite]">
            <p className="tracking-wide">{promoText}</p>
            <p className="tracking-wide" aria-hidden="true">
              {promoText}
            </p>
          </div>
        </div>
      </div>

      <div className={`mt-0 flex flex-wrap w-full items-center justify-between gap-3 border-b px-4 py-6 backdrop-blur md:gap-6 md:px-20 ${mainBarClass}`}>
        <div className="flex items-center gap-4">
          <Link href="/" className="shrink-0 text-lg font-bold tracking-wide">
            <Image src={logoSrc} alt="logo" width={160} height={52} loading="lazy" />
          </Link>

          <nav className="flex items-center gap-6">
            <div className="group relative">
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 rounded-0 border px-3 py-1.5 text-sm font-semibold text-main transition ${categoryButtonClass}`}
              >
                <FontAwesomeIcon icon={faLayerGroup} />
                {categoriesLabel}
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
              <div className="invisible absolute top-10 min-w-56 rounded-0 border border-white/10 bg-white/95 p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <nav className="flex flex-col">
                  {categoryItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-black/80 transition hover:bg-black/5"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium underline-offset-4 transition hover:underline ${navLinkClass}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <form className="hidden min-w-0 flex-1 lg:block">
            <label className="relative block">
              <span className={`pointer-events-none absolute inset-y-0 left-3 flex items-center ${searchIconClass}`}>
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                type="search"
                placeholder="Search for products"
                className={`w-80 rounded-0 border py-2 pl-10 pr-4 text-sm outline-none transition ${searchInputClass}`}
              />
            </label>
          </form>
          <button type="button" aria-label="Account" className={`h-10 w-10 rounded-0 border p-2 text-sm font-light transition ${iconButtonClass}`}>
            <FontAwesomeIcon icon={faUser} />
          </button>
          <button type="button" aria-label="Wishlist" className={`relative h-10 w-10 rounded-0 border p-2 text-sm font-light transition ${iconButtonClass}`}>
            <FontAwesomeIcon icon={faHeart} />
            <span className="absolute -right-1 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-main px-1.5 text-center text-[10px] font-medium text-white">0</span>
          </button>
          <button type="button" aria-label="Shopping cart" className={`relative h-10 w-10 rounded-0 border p-2 text-sm font-light transition ${iconButtonClass}`}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="absolute -right-1 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-main px-1.5 text-center text-[10px] font-medium text-white">0</span>
          </button>
          <button type="button" aria-label="Language" className={`relative h-10 w-10 rounded-0 border p-2 text-sm font-bold transition ${iconButtonClass}`}>
            <span className="text-main">AR</span>
          </button>
        </div>
      </div>
    </div>
  );
}
