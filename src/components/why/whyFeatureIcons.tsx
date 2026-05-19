import type { ComponentType } from "react";
import {
  HiOutlineArrowPath,
  HiOutlineLifebuoy,
  HiOutlineShieldCheck,
  HiOutlineTruck,
} from "react-icons/hi2";
export type FeatureIconKey = "support" | "shield" | "truck" | "return";

export const whyFeatureIcons: Record<
  FeatureIconKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean; size?: number }>
> = {
  support: HiOutlineLifebuoy,
  shield: HiOutlineShieldCheck,
  truck: HiOutlineTruck,
  return: HiOutlineArrowPath,
};
