import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import navbarData from "@/lib/data/navbar.json";
import logo from "@/public/logo/logo1.png";
import "@/styles/layout/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHeart, faLanguage, faLayerGroup, faSearch, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

type HeaderVariant = "default" | "home";

type HeaderProps = {
  variant?: HeaderVariant;
};

export default async function Header({ variant = "default" }: HeaderProps) {
  const t = await getTranslations("header");
  const navItems = navbarData.navItems;
  const categoryItems = navbarData.categoryItems;
  const isHome = variant === "home";
  const promoText = "Only this week: 40% OFF on all sofas and couches";

  const headerPositionClass = isHome ? "static inset-x-0 top-0 text-white" : "fixed top-0 inset-x-0 text-black";
  const topBarClass = isHome
    ? "border-white/10 bg-black/65 text-white/75"
    : "border-black/10 bg-white/55 text-black/75";
  const mainBarClass = isHome
    ? "border-white/10 bg-black/35 text-white md:mt-2 md:rounded-xl"
    : "w-full border-black/10 bg-white/55 text-black";
  const navLinkClass = isHome ? "text-white/80 hover:text-white" : "text-black/80 hover:text-black";
  const categoryButtonClass = isHome
    ? "border-white/35 bg-white/10 text-white hover:bg-white/20"
    : "border-black/20 bg-black/5 text-black hover:bg-black/10";
  const searchIconClass = isHome ? "text-white/55" : "text-black/55";
  const searchInputClass = isHome
    ? "border-white/20 bg-black/35 text-white placeholder:text-white/55 focus:border-white/50"
    : "border-black/20 bg-white/35 text-black placeholder:text-black/55 focus:border-black/40";
  const iconButtonClass = isHome
    ? "border-white/25 text-white/90 hover:bg-white/10 hover:text-white"
    : "border-black/20 text-black/90 hover:bg-black/10 hover:text-black";

  return (
    <header className={`${headerPositionClass} z-30`}>
      <div className={`hidden border-b backdrop-blur md:block ${topBarClass}`}>
        {/* Promo marquee shown only on desktop. */}
        <div className="mx-auto w-full overflow-hidden px-6 py-3 text-xs">
          <div className="flex items-center justify-center gap-12 whitespace-nowrap animate-[headerMarquee_18s_linear_infinite]">
            <p className="tracking-wide">{promoText}</p>
            <p className="tracking-wide" aria-hidden="true">
              {promoText}
            </p>
          </div>
        </div>
      </div>

      <div className={` mt-0 flex w-full justify-between  items-center gap-3 border-b px-4 py-6 backdrop-blur md:gap-6 md:px-20 ${mainBarClass}`}>
        <div className="flex items-center gap-4">
          <Link href="/" className="shrink-0 text-lg font-bold tracking-wide">
            <Image src={logo} alt="logo" width={160} height={52} loading="lazy" />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {/* Highlighted categories trigger + dropdown for desktop. */}
            <div className="group relative">
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 rounded-0 border px-3 py-1.5 text-sm text-main font-semibold transition ${categoryButtonClass}`}
              >
                <FontAwesomeIcon icon={faLayerGroup} />
                {t("nav.categories")}
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
              <div className="invisible absolute top-10 min-w-56 rounded-0 border border-white/10 bg-white/95 p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <nav className="flex flex-col">
                  {categoryItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-black/80 transition hover:bg-white/10 hover:"
                    >

                      {t(item.labelKey)}
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
                {t(item.labelKey)}
              </Link>
            ))}


          </nav>
        </div>



        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <form className=" hidden min-w-0 flex-1 lg:block">
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
          <button
            type="button"
            aria-label="Account"
            className={`rounded-0 border p-2 w-10 h-10 transition font-light text-sm ${iconButtonClass}`}
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
          <button
            type="button"
            aria-label="Wishlist"
            className={`relative rounded-0 border p-2 w-10 h-10 transition font-light text-sm ${iconButtonClass}`}
          >
            <FontAwesomeIcon icon={faHeart} />
            <span className="absolute -right-1 -top-2 rounded-full bg-main px-1.5 w-5 h-5 text-center flex items-center justify-center  text-[10px] font-medium text-white">0</span>
          </button>
          <button
            type="button"
            aria-label="Shopping cart"
            className={`relative rounded-0 border p-2 w-10 h-10 transition font-light text-sm ${iconButtonClass}`}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="absolute -right-1 -top-2 rounded-full bg-main px-1.5 w-5 h-5 text-center flex items-center justify-center  text-[10px] font-medium text-white">0</span>
          </button>
          <button
            type="button"
            aria-label="Shopping cart"
            className={`relative rounded-0 border p-2 w-10 h-10 transition font-bold text-sm ${iconButtonClass}`}
          >
            <span className="text-main">AR</span>

          </button>


          {/* Mobile menu panel with search and nested category links. */}
          <details className="md:hidden">
            <summary className={`list-none rounded-0 border p-2 transition ${iconButtonClass}`}>
              <span className="sr-only">Open menu</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>
            <div className="absolute right-4 top-16 min-w-72 rounded-md border border-white/10 bg-black/95 p-3 shadow-lg">
              <form className="mb-2">
                <input
                  type="search"
                  placeholder="Search for products"
                  className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/55 outline-none transition focus:border-white/40"
                />
              </form>
              <nav className="flex flex-col">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    {t(item.labelKey)}
                  </Link>
                ))}
                <details className="mt-1">
                  <summary className="cursor-pointer rounded-md px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white">
                    {t("nav.categories")}
                  </summary>
                  <div className="mt-1 flex flex-col">
                    {categoryItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-md px-6 py-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
                      >
                        {t(item.labelKey)}
                      </Link>
                    ))}
                  </div>
                </details>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

