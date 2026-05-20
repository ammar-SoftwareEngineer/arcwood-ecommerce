"use client";

import Image from "next/image";

import { motion } from "framer-motion";
type Props = {
  primarySrc: string | null;
  secondarySrc: string | null;
  primaryAlt: string;
  secondaryAlt: string;
};

export default function WhyOverlappingImages({
  primarySrc,
  secondarySrc,
  primaryAlt,
  secondaryAlt,
}: Props) {
  return (
    <div className="relative md:h-screen h-[550px]">
      {/* One relative root: secondary is absolute so it overlaps the primary */}
      <div className="relative w-full h-full">
        {primarySrc ? (
          <motion.div  initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }} className="relative aspect-3/4 w-[85%] overflow-hidden rounded-0">
            <Image
              src={primarySrc || ""}
              alt={primaryAlt || ""}
            loading="lazy"

              className="object-contain w-full h-full"
              priority={false}
              width={500}
              height={500}
            />
          </motion.div>
        ) : null}

        {secondarySrc ? (
          <motion.div initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }} className="absolute  xl:bottom-24 lg:bottom-50 md:bottom-24 bottom-10 inset-e-0 md:w-[68%] overflow-hidden rounded-0 border-4 border-white bg-neutral-100 shadow-lg ">
            <div className="relative md:h-[320px] w-full">
              <Image
                src={secondarySrc || ""}
                alt={secondaryAlt || ""}
                loading="lazy"
                className="md:object-cover object-contain h-full w-full"
               width={500}
               height={500}
              />
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
