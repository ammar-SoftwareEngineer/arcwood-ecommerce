"use client";

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import loaderAnimation from "@public/loading/loading.json";
import { useEffect, useRef } from "react";

const loaderSpeed = 1;

export type HexagonLoaderProps = {
  /**
   * الافتراضي `true` لـ Suspense (`loading.tsx`). التنقل من العميل يمرّر `active` من `NavigationRouteLoader`.
   */
  active?: boolean;
};

export default function HexagonLoader({ active = true }: HexagonLoaderProps) {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    if (active) {
      lottieRef.current?.setSpeed(loaderSpeed);
    }
  }, [active]);

  return (
    <div
      className={`fixed inset-0 z-9999 flex items-center justify-center bg-(--background) transition-opacity duration-600 ease-in-out ${
        active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-busy={active}
      aria-hidden={!active}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={loaderAnimation}
        loop
        autoplay
        onDOMLoaded={() => {
          lottieRef.current?.setSpeed(loaderSpeed);
        }}
        className="h-[250px] w-[250px]"
        aria-hidden
      />
    </div>
  );
}
