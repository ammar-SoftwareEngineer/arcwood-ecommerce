/**
 * Quantity control: [−] count [+].
 * At qty 1 the decrease button shows trash (same as remove semantics via parent handler).
 * Shared by product cards, quick view, cart table, and drawer.
 */
"use client";

import type { MouseEvent } from "react";
import { CiTrash } from "react-icons/ci";

type Props = {
  quantity: number;
  groupLabel: string;
  decreaseLabel: string;
  increaseLabel: string;
  onDecrease: (e: MouseEvent<HTMLButtonElement>) => void;
  onIncrease: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

const btn =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-0 text-lg font-medium text-neutral-800 transition hover:bg-(--primary) hover:text-white cursor-pointer";
const base =
  "inline-flex h-10 items-center gap-1 rounded-0 bg-white px-2 text-base font-medium text-neutral-800 shadow-md border border-(--primary)";

export default function CartQuantityStepper({
  quantity,
  groupLabel,
  decreaseLabel,
  increaseLabel,
  onDecrease,
  onIncrease,
  className,
}: Props) {
  return (
    <div className={`${base} ${className ?? ""}`} role="group" aria-label={groupLabel}>
      <button type="button" className={btn} aria-label={decreaseLabel} onClick={onDecrease}>
        {quantity > 1 ? "−" : <CiTrash size={16} aria-hidden />}
      </button>
      <span className="min-w-6 text-center tabular-nums">{quantity}</span>
      <button type="button" className={btn} aria-label={increaseLabel} onClick={onIncrease}>
        +
      </button>
    </div>
  );
}
