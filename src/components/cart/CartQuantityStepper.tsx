"use client";

import type { MouseEvent } from "react";

type CartQuantityStepperProps = {
  quantity: number;
  groupLabel: string;
  decreaseLabel: string;
  increaseLabel: string;
  onDecrease: (e: MouseEvent<HTMLButtonElement>) => void;
  onIncrease: (e: MouseEvent<HTMLButtonElement>) => void;
};

const stepperBtn =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-0 text-lg font-medium text-neutral-800 transition hover:bg-(--primary) hover:text-white cursor-pointer";

const stepper =
  "inline-flex h-10 shrink-0 items-center gap-1 rounded-0 bg-white px-2 text-sm font-medium text-neutral-800 shadow-md";

export default function CartQuantityStepper({
  quantity,
  groupLabel,
  decreaseLabel,
  increaseLabel,
  onDecrease,
  onIncrease,
}: CartQuantityStepperProps) {
  return (
    <div className={stepper} role="group" aria-label={groupLabel}>
      <button type="button" className={stepperBtn} aria-label={decreaseLabel} onClick={onDecrease}>
        −
      </button>
      <span className="min-w-6 text-center text-base tabular-nums">{quantity}</span>
      <button type="button" className={stepperBtn} aria-label={increaseLabel} onClick={onIncrease}>
        +
      </button>
    </div>
  );
}
