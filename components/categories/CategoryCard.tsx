import { useLocale } from "next-intl";
import Image from "next/image"
import Link from "next/link";

export type CardCategory = {
    name: string
    nameAr: string
    count: number
    image: string | null
    imageAlt: string
}

/** JSON stores repo-relative paths; public assets are served from `/`. */
function publicImagePath(src: string | null): string | null {
    if (!src) return null
    if (src.startsWith("/")) return src
    const tail = src.replace(/^\.\/public\//, "").replace(/^public\//, "")
    return `/${tail}`
}


type CategoryCardProps = {
    category: CardCategory
    index: number
}

export default function CategoryCard({ category, index }: CategoryCardProps) {
    const src = publicImagePath(category.image)
    const locale = useLocale() as "en" | "ar"

    return (
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3   ">
            <Link href={`/categories/${category.name}`}>
                <div className="hex hex-outer relative w-[250px] h-[300px]">
                    <div className="hex-content">
                        <Image
                            src={src || ""}
                            alt={category.imageAlt || ""}
                            fill
                            sizes="250px"
                            className="object-cover"
                            priority={index < 4}
                        />
                    </div>
                    <div className="innerBorder pointer-events-none absolute inset-0" />

                    <div className="badge absolute  rtl:inset-auto ltr:inset-0 w-full h-full py-3 text-white flex flex-col align-middle justify-center">
                        <p className="badgeCount text-base font-medium">
                            {category.count}
                        </p>
                        <div className="badgeDivider my-1 h-px bg-white/40" />
                        {locale === "ar" ? <p className="badgeName text-base font-bold text-center">{category.nameAr}</p> : <p className="badgeName text-base font-bold text-center">{category.name}</p>}
                    </div>
                </div>
            </Link>
        </div>
    )
}
