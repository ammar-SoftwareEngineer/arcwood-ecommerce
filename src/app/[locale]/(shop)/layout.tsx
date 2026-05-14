import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

type Props = {
  children: ReactNode;
};



export default function ShopLayout({ children }: Props) {
  return <main className="flex-1">{children}</main>;
}
