import { Link } from "@/i18n/navigation";
import type { HeaderItem } from "../headerTypes";

type DesktopMainNavLinksProps = {
  items: HeaderItem[];
  linkClass: string;
};

export default function DesktopMainNavLinks({ items, linkClass }: DesktopMainNavLinksProps) {
  return (
    <>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-base font-medium underline-offset-4 transition hover:underline cursor-pointer hover:text-main! ${linkClass}`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
