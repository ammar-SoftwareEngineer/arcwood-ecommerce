import HexagonLoader from "@/components/ui/HexagonLoader";

export default function Loading() {
  return (
    <div className="relative min-h-screen w-full" aria-busy="true" aria-live="polite">
 
      <HexagonLoader />
    </div>
  );
}
