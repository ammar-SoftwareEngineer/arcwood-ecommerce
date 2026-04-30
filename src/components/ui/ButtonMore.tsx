"use client"
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
export default function ButtonMore({ href, text }: { href: string, text: string }) {
  return (
    <motion.button
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: 0.2 }}
  
          whileTap={{ scale: 0.98 }}
          className={"cta block mx-auto mt-16"}
        >
          <Link href={href}>
          {text}
          </Link>
        </motion.button>
  );
}