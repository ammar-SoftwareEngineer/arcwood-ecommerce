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
  listClassName = "grid grid-cols-12 gap-6",
  itemClassName = "col-span-6 flex items-center gap-3",
}: Props) {
  const Item = animated ? motion.li : "li";

  return (
    <ul className={listClassName}>
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
    </ul>
  );
}
