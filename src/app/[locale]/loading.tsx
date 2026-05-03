import HexagonLoader from "@/components/ui/HexagonLoader";


export default function Loading() {

 
  return (
    <div
      className="flex h-screen w-full items-center justify-center "
      aria-busy="true"
    >
      <HexagonLoader  />
    </div>
  );
}
