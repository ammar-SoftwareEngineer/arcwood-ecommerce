
import type { ReactNode } from "react";


type Props = {
  children: ReactNode;
};



export default function ShopLayout({ children }: Props) {
  return <main className="flex-1">{children}</main>;
}
