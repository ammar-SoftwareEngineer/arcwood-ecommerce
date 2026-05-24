"use client";

import { motion } from "framer-motion";
import { whyFeatureIcons } from "./whyFeatureIcons";

type Feature = { id: number; icon: string; title: string };

type Props = {
  features: Feature[];
  animated?: boolean;
  listClassName?: string;
  itemClassName?: string;
};

export default function WhyFeatures({
  features,
  animated = false,
  listClassName,
  itemClassName ,
}: Props) {
  const Item = animated ? motion.li : "li";

  return (
    <motion.ul initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }} className={listClassName}>
      {features.map((feature) => {
        const Icon = whyFeatureIcons[feature.icon as keyof typeof whyFeatureIcons];
        if (!Icon) return null;

        return (
          <Item
            key={feature.id}
            className={itemClassName}
            {...(animated
              ? {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.2 },
                  transition: { duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
                }
              : {})}
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center text-(--primary)"
              aria-hidden
            >
              <Icon className="h-10 w-10" aria-hidden />
            </span>
            <span className="text-lg font-medium text-neutral-800">{feature.title}</span>
          </Item>
        ); 
      })}
    </motion.ul>
  );
}
