import HexagonLoader from "@/components/ui/HexagonLoader";
import { getLocale } from "next-intl/server";

export default async function Loading() {
  const locale = await getLocale();
 
  return (
    <div
      className="flex h-screen w-full items-center justify-center "
      aria-busy="true"
    >
      <HexagonLoader  />
    </div>
  );
}
