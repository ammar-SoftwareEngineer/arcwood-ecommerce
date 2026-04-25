import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import navbarData from "@/lib/navbar.json";
import logo from "@/public/logo/logo1.webp";

type HeaderVariant = "default" | "home";

type HeaderProps = {
  variant?: HeaderVariant;
};

export default async function Header({ variant = "default" }: HeaderProps) {
  const t = await getTranslations("header");
  const navItems = navbarData.navItems;
  const categoryItems = navbarData.categoryItems;
  const isHome = variant === "home";

  return (
    <header className={`${isHome ? "absolute inset-x-0 top-0 text-white" : "fixed top-0 inset-0  text-black"} z-30`}>
      <div
        className={`hidden border-b backdrop-blur md:block ${
          isHome ? "border-white/10 bg-black/65 text-white/75" : "border-black/10 bg-white/65 text-black/75"
        }`}
      >
        <div className="mx-auto flex w items-center justify-between px-6 py-2 text-xs">
          <p className="tracking-wide">Only this week: 40% OFF on all sofas and couches</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className={`${isHome ? "hover:text-white" : "hover:text-black"} transition`}>
              About Us
            </Link>
            <Link href="/blog" className={`${isHome ? "hover:text-white" : "hover:text-black"} transition`}>
              Blog
            </Link>
            <Link href="/contact" className={`${isHome ? "hover:text-white" : "hover:text-black"} transition`}>
              Contact
            </Link>
            <span className={`h-3 w-px ${isHome ? "bg-white/30" : "bg-black/20"}`} />
            <button type="button" className={`${isHome ? "hover:text-white" : "hover:text-black"} transition`}>
              English
            </button>
            <button type="button" className={`${isHome ? "hover:text-white" : "hover:text-black"} transition`}>
              $ USD
            </button>
          </div>
        </div>
      </div>

      <div
        className={`mx-auto mt-0 flex max-w-7xl items-center gap-3 border-b px-4 py-4 backdrop-blur md:gap-6 md:px-6 ${
          isHome
            ? "border-white/10 bg-black/35 text-white md:mt-2 md:rounded-xl"
            : "w-full border-black/10 bg-white/65 text-black"
        }`}
      >
        <Link href="/" className="shrink-0 text-lg font-bold tracking-wide">
          <Image src={logo} alt="logo" width={160} height={52} loading="lazy" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium underline-offset-4 transition hover:underline ${
                isHome ? "text-white/80 hover:text-white" : "text-black/80 hover:text-black"
              }`}
            >
              {t(item.labelKey)}
            </Link>
          ))}
          <div className="group relative">
            <button
              type="button"
              className={`cursor-pointer text-sm font-medium underline-offset-4 transition hover:underline ${
                isHome ? "text-white/80 hover:text-white" : "text-black/80 hover:text-black"
              }`}
            >
              {t("nav.categories")}
            </button>
            <div className="invisible absolute top-8 min-w-56 rounded-md border border-white/10 bg-black/95 p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <nav className="flex flex-col">
                {categoryItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    {t(item.labelKey)}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </nav>

        <form className="ml-auto hidden min-w-0 flex-1 md:block">
          <label className="relative block">
            <span className={`pointer-events-none absolute inset-y-0 left-3 flex items-center ${isHome ? "text-white/55" : "text-black/55"}`}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Search for products"
              className={`w-full rounded-full border py-2 pl-10 pr-4 text-sm outline-none transition ${
                isHome
                  ? "border-white/20 bg-black/35 text-white placeholder:text-white/55 focus:border-white/50"
                  : "border-black/20 bg-white/35 text-black placeholder:text-black/55 focus:border-black/40"
              }`}
            />
          </label>
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <button
            type="button"
            aria-label="Account"
            className={`rounded-full border p-2 transition ${
              isHome
                ? "border-white/25 text-white/90 hover:bg-white/10 hover:text-white"
                : "border-black/20 text-black/90 hover:bg-black/10 hover:text-black"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 19c1.5-2.9 4.1-4.5 7-4.5s5.5 1.6 7 4.5" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Shopping cart"
            className={`relative rounded-full border p-2 transition ${
              isHome
                ? "border-white/25 text-white/90 hover:bg-white/10 hover:text-white"
                : "border-black/20 text-black/90 hover:bg-black/10 hover:text-black"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="20" r="1.3" />
              <circle cx="17" cy="20" r="1.3" />
              <path d="M3 4h2l2.4 10.2a1.5 1.5 0 0 0 1.5 1.2h8.8a1.5 1.5 0 0 0 1.4-1l2-6.2H7.2" />
            </svg>
            <span className="absolute -right-1 -top-1 rounded-full bg-emerald-500 px-1.5 text-[10px] font-medium text-black">0</span>
          </button>

          <details className="md:hidden">
            <summary
              className={`list-none rounded-full border p-2 transition ${
                isHome
                  ? "border-white/25 text-white hover:bg-white/10"
                  : "border-black/20 text-black hover:bg-black/10"
              }`}
            >
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
