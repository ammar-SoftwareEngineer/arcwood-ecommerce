"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import "@/styles/layout/HeroPages.css";

const LOCALES = new Set(["en", "ar"]);

const formatSegment = (s: string) =>
    s.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

type HeroPagesProps = {
    title?: string;
};

export default function HeroPages({ title }: HeroPagesProps) {
    const pathname = usePathname();
    const t = useTranslations("hero");

    const { pageTitle, breadcrumbs } = useMemo(() => {
        const rawParts = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
        const locale = LOCALES.has(rawParts[0]) ? rawParts[0] : undefined;
        const segments = rawParts.filter((s) => !LOCALES.has(s));
        const prefix = locale ? `/${locale}` : "";

        const getLabel = (seg: string) =>
            t.has(seg) ? t(seg) : formatSegment(seg);

        const breadcrumbs = [
            { label: t("home"), href: prefix || "/" },
            ...segments.map((seg, i) => ({
                // لو آخر segment وعندنا title من API → استخدمه في الـ breadcrumb
                label: i === segments.length - 1 && title?.trim() ? title.trim() : getLabel(seg),
                href: `${prefix}/${segments.slice(0, i + 1).join("/")}`,
            })),
        ];

        const pageTitle =
            title?.trim() ||
            (segments.at(-1) ? getLabel(segments.at(-1)!) : t("home"));

        return { pageTitle, breadcrumbs };
    }, [pathname, title, t]);

    return (
        <section className="relative h-[40vh] hero-pages-section">
            <div className="absolute inset-0 bg-black/40 flex items-center">
                <div className="container mx-auto px-6 md:px-20 space-y-4">

                    {/* Breadcrumb */}
                    <nav aria-label="breadcrumb">

                    </nav>
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="flex items-center gap-2 text-lg text-white/80 border border-white/80 w-fit px-3 py-1.5">
                            {breadcrumbs.map((item, i) => (
                                <li key={`${item.href}-${i}`} className="flex items-center gap-2">
                                    {i > 0 && <span aria-hidden>/ </span>}
                                    <Link
                                        href={item.href}
                                        className={
                                            i === breadcrumbs.length - 1
                                                ? "text-white font-medium pointer-events-none"
                                                : "hover:text-white transition-colors"
                                        }
                                        aria-current={i === breadcrumbs.length - 1 ? "page" : undefined}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </nav>
                    {/* Page Title */}
                    <h1 className="text-white text-4xl md:text-6xl font-semibold uppercase tracking-wide">
                        {pageTitle}
                    </h1>

                </div>
            </div>
        </section>
    );
}