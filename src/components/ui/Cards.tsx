"use client"

import { Link } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

import Image from "next/image";
import { useLocale } from "next-intl";
type CardParams = {
    title: string;
    image: string;
    description: string;
    href: string;
    imageAlt?: string;
    readmore?: string;
};


function publicImagePath(src: string | null): string | null {
    if (!src) return null;
    if (src.startsWith("/")) return src;
    const tail = src
        .replace(/^(?:\.\.\/)+public\//, "")
        .replace(/^\.\//, "")
        .replace(/^public\//, "");
    return `/${tail}`;
}
export default function Cards({ params }: { params: CardParams }) {
    const {
        title,
        image,
        description,
        href,
        imageAlt,
        readmore,
    } = params;
    const src = publicImagePath(image);
    const locale = useLocale();
    return (
        <motion.article
            // Basic entrance + hover animation for better UX.
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}

            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden rounded-0  bg-white group transition-all duration-400 hover:shadow-md hover:translate-y-[-10px] "
        >
            {/* Dynamic media content so card can be reused anywhere. */}
            <Link href={href}>
                {src ? (
                    <div className="relative h-[380px] w-full overflow-hidden">
                        <Image
                            src={src}
                            alt={imageAlt ?? title}
                            fill
                            loading="lazy"
                            className="object-cover transition duration-300 group-hover:scale-[1.03]"

                        />
                    </div>
                ) : (
                    <span className="px-3 text-center text-sm text-neutral-400 ">
                        {title}
                    </span>
                )}
                <div className="space-y-3 p-5">
                    <div> <h3 className="text-xl font-semibold text-(--primary)">{title}</h3>
                        <p className="line-clamp-3 text-sm leading-6 text-gray-600">{description}</p>
                    </div>
                    {/* Keep this as text to avoid nested anchor/link hydration issues. */}
                    <div className="flex items-center text-base font-medium text-(--primary) transition-colors hover:text-blue-400">
                        <div className="flex items-center my-0">
                            <p className="my-0"> {readmore}</p>
                            <p className="ms-1 my-0" aria-hidden>
                                <Link href={href}>
                                    {locale === "ar" ? <IoIosArrowRoundBack size={20} className=" cursor-pointer transition-colors  " /> : <IoIosArrowRoundForward size={20} className=" cursor-pointer transition-colors  " />}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    )
}