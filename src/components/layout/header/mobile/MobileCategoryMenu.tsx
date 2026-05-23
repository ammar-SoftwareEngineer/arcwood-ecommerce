import { Link } from "@/i18n/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import type { HeaderItem } from "../types";

type MobileCategoryMenuProps = {
  items: HeaderItem[];
  label: string;
  onNavigate: () => void;
};

export default function MobileCategoryMenu({
  items,
  label,
  onNavigate,
}: MobileCategoryMenuProps) {
  return (
    <li>
      <details>
        <summary className="flex cursor-pointer items-center justify-between rounded-none px-2 py-2 text-lg font-medium text-black/80 transition hover:bg-black/5 hover:text-black">
          {label}
          <FontAwesomeIcon icon={faChevronDown} className="text-xs" aria-hidden />
        </summary>
        <ul className="mt-1 flex flex-col">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="block rounded-md px-5 py-2 text-base text-black/70 transition hover:bg-black/5 hover:text-black"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
}
