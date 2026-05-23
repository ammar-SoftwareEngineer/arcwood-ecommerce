import { Link } from "@/i18n/navigation";
import type { HeaderItem } from "../types";

type MobileNavLinksProps = {
  items: HeaderItem[];
  onNavigate: () => void;
};

export default function MobileNavLinks({ items, onNavigate }: MobileNavLinksProps) {
  return (
    <>
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            onClick={onNavigate}
            className="block rounded-md px-2 py-2 text-lg font-medium text-black/80 transition hover:bg-black/5 hover:text-black"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </>
  );
}
