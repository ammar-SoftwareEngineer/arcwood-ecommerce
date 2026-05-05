"use client";

import { useEffect, useState } from "react";

export type DiscountCountdownLabels = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

function parseRemaining(endsAt: string, now: number) {
  const end = new Date(endsAt).getTime();
  if (Number.isNaN(end)) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const diff = Math.max(0, end - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

type Props = {
  endsAt: string;
  labels: DiscountCountdownLabels;
};

export default function DiscountCountdown({ endsAt, labels }: Props) {
  // Avoid hydration mismatch: server and first client paint use the same placeholder;
  // real time updates only run after mount in the browser.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds } =
    now === null
      ? { days: 0, hours: 0, minutes: 0, seconds: 0 }
      : parseRemaining(endsAt, now);

  const units: { value: number; label: string; pad: number }[] = [
    { value: days, label: labels.days, pad: days >= 100 ? 3 : 2 },
    { value: hours, label: labels.hours, pad: 2 },
    { value: minutes, label: labels.minutes, pad: 2 },
    { value: seconds, label: labels.seconds, pad: 2 },
  ];

  return (
    <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8" role="timer" aria-live="polite">
      {units.map((u, idx) => (
        <div key={`${u.label}-${idx}`} className="flex flex-col items-center gap-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm sm:h-18 sm:w-18">
            <span className="text-base font-bold tracking-tight text-neutral-900 tabular-nums sm:text-lg">
              {String(u.value).padStart(u.pad, "0")}
            </span>
          </div>
          <span className="text-xs font-medium text-neutral-600 sm:text-sm">{u.label}</span>
        </div>
      ))}
    </div>
  );
}
