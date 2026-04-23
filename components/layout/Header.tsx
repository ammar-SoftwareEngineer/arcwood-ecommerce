import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import navbarData from "@/lib/navbar.json";
import logo from "@/public/logo/logo1.webp";
export default async function Header() {
  const t = await getTranslations("header");
  const navItems = navbarData.navItems;
  const categoryItems = navbarData.categoryItems;

  return (
    <header className=" ">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:gap-6">
        <Link href="/" className="text-lg font-bold tracking-wide">
          <Image src={logo} alt="logo" width={150} height={150} loading="lazy" />
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-700 underline-offset-4 transition hover:text-black hover:underline"
            >
              {t(item.labelKey)}
            </Link>
          ))}
          <div className="group relative">
            <button
              type="button"
              className="text-sm font-medium text-neutral-700 underline-offset-4 transition hover:text-black hover:underline cursor-pointer"
            >
              {t("nav.categories")}
            </button>
            <div className="invisible absolute top-8 min-w-52 rounded-md border bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <nav className="flex flex-col">
                {categoryItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm text-neutral-700 transition hover:bg-neutral-100 hover:text-black"
                  >
                    {t(item.labelKey)}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </nav>

        <form className="ml-auto hidden min-w-0 flex-1 md:block">
          <input
            type="search"
            placeholder="Search products..."
            className="w-full rounded-md border px-3 py-2 text-sm outline-none ring-black transition focus:ring-1"
          />
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <button
            type="button"
            aria-label="Account"
            className="rounded-md border p-2 transition hover:bg-neutral-100"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 19c1.5-2.9 4.1-4.5 7-4.5s5.5 1.6 7 4.5" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Shopping cart"
            className="relative rounded-md border p-2 transition hover:bg-neutral-100"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="20" r="1.3" />
              <circle cx="17" cy="20" r="1.3" />
              <path d="M3 4h2l2.4 10.2a1.5 1.5 0 0 0 1.5 1.2h8.8a1.5 1.5 0 0 0 1.4-1l2-6.2H7.2" />
            </svg>
            <span className="absolute -right-1 -top-1 rounded-full bg-black px-1.5 text-[10px] text-white">0</span>
          </button>

          <details className="md:hidden">
            <summary className="list-none rounded-md border p-2 transition hover:bg-neutral-100">
              <span className="sr-only">Open menu</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>
            <div className="absolute right-4 top-16 min-w-52 rounded-md border bg-white p-2 shadow-lg">
              <form className="mb-2">
                <input
                  type="search"
                  placeholder="Search products..."
                  className="w-full rounded-md border px-3 py-2 text-sm outline-none ring-black transition focus:ring-1"
                />
              </form>
              <nav className="flex flex-col">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm text-neutral-700 transition hover:bg-neutral-100 hover:text-black"
                  >
                    {item.labelKey}
                  </Link>
                ))}
                <details className="mt-1">
                  <summary className="cursor-pointer rounded-md px-3 py-2 text-sm text-neutral-700 transition hover:bg-neutral-100 hover:text-black">
                    {t("nav.categories")}
                  </summary>
                  <div className="mt-1 flex flex-col">
                    {categoryItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-md px-6 py-2 text-sm text-neutral-700 transition hover:bg-neutral-100 hover:text-black"
                      >
                        {item.labelKey}
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
