"use client";
import { motion } from "framer-motion";

export default function HeaderSection({ subtitle, title }: { subtitle: string, title: string }) {
    return <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className={"header"}
    >
        <p className={"subtitle"}>{subtitle}</p>
        <h2 className={"title"}>{title}</h2>
        <div className={"divider"}>
            <span className={"line"} />
            <span className={"dot"} />
            <span className={"lineReverse"} />
        </div>
    </motion.div>
        ;
}