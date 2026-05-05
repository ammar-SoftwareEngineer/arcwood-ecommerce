import type { ComponentType } from "react";
import {
  HiOutlineArrowPath,
  HiOutlineLifebuoy,
  HiOutlineShieldCheck,
  HiOutlineTruck,
} from "react-icons/hi2";
import siteData from "@/lib/data/arcwood-site-data.json";

type WhyFeature = (typeof siteData.whyChooseUs.features)[number];
export type featureIconKey = WhyFeature["icon"];

export const whyFeatureIcons: Record<
  featureIconKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean; size?: number }>
> = {
  support: HiOutlineLifebuoy,
  shield: HiOutlineShieldCheck,
  truck: HiOutlineTruck,
  return: HiOutlineArrowPath,
};
