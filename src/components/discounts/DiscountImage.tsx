"use client";
import { motion } from "framer-motion";
import Image from "next/image";
type Props = {
    src: string;
    alt: string;
}
export default function DiscountImage({ src, alt }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }} className="relative col-span-12 h-full min-h-[380px] w-full lg:col-span-7 ">
            <Image
                src={src ?? ""}
                alt={alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
                priority
            />
        </motion.div>

    );
}